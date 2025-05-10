import { findProgramByName } from '@/server/programs/actions';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import * as XLSX from 'xlsx';
import { students } from '../db/schema';
import chalk from 'chalk';
import { confirm } from '@inquirer/prompts';
import StudentRepository from '@/server/students/repository';

type Student = typeof students.$inferInsert;
type ExcelRow = Record<string, string | number | null | undefined>;

function extractSheetMetadata(data: ExcelRow[]) {
  let programName: string | null = null;
  let status: Student['status'] = 'Wait Listed';

  for (let i = 0; i < 15; i++) {
    const row = data[i] || {};

    if (
      row.A &&
      typeof row.A === 'string' &&
      row.A.includes('COURSE/PROGRAMME NAME:')
    ) {
      const matches = row.A.match(/COURSE\/PROGRAMME NAME:\s*(.+)/);
      if (matches && matches[1]) {
        programName = matches[1].trim();
      }
    }

    if (row.A && typeof row.A === 'string' && row.A.includes('STATUS:')) {
      const statusText = row.A.replace('STATUS:', '').trim().toUpperCase();
      if (
        statusText.includes('WAIT LISTED') ||
        statusText.includes('WAITLISTED')
      ) {
        status = 'Wait Listed';
      } else if (statusText.includes('ADMITTED')) {
        status = 'Admitted';
      } else if (statusText.includes('DQ')) {
        status = 'DQ';
      }
    }
  }

  return { programName, status };
}

async function handleCreateOrUpdateStudent(data: Student, sheetName: string) {
  const repository = new StudentRepository();
  const existingStudent = await repository.findByUniqueIdentifiers(data);

  if (!existingStudent && !data.phoneNumber) {
    console.log(
      chalk.red(
        `No phone number provided for student: ${data.surname} ${data.names} in sheet: '${sheetName}'`,
        'Did you import the correct sheet?',
      ),
    );

    const shouldContinue = await confirm({
      message: 'Do you want to continue?',
      default: true,
    });

    if (!shouldContinue) {
      process.exit(1);
    }
  }

  if (existingStudent) {
    const updateData = {
      ...existingStudent,
      no: data.no,
      status: data.status,
    };
    return repository.update(existingStudent.id, updateData);
  } else {
    return repository.create(data);
  }
}

async function processWorksheet(
  sheetName: string,
  data: ExcelRow[],
): Promise<Student[]> {
  const { programName, status } = extractSheetMetadata(data);

  if (!programName) {
    throw new Error(`Could not find program name in sheet: ${sheetName}`);
  }

  if (!status) {
    throw new Error(`Could not find status in sheet: ${sheetName}`);
  }

  console.log(`Found program: "${programName}" with status: ${status}`);

  const programId = await findProgramByName(programName);

  if (!programId) {
    throw new Error(
      `Program "${programName}" not found in database. Please create it first.`,
    );
  }

  let headerRowIndex = -1;
  for (let i = 0; i < data.length; i++) {
    const row = data[i] || {};
    if (row.A === 'NO' && row.B === 'SURNAME' && row.C === 'OTHER NAMES') {
      headerRowIndex = i;
      break;
    }
  }

  if (headerRowIndex === -1) {
    console.error(
      chalk.red(`Could not find header row in sheet: ${sheetName}`),
    );
    return [];
  }

  const headerRow = data[headerRowIndex];
  const columnIndices: Record<string, string> = {};

  for (const [key, value] of Object.entries(headerRow)) {
    if (value === 'NO') columnIndices['NO'] = key;
    else if (value === 'SURNAME') columnIndices['SURNAME'] = key;
    else if (value === 'OTHER NAMES') columnIndices['OTHER NAMES'] = key;
    else if (value === 'EDUCATION/CONTACT #' || value === 'CONTACT #')
      columnIndices['CONTACT #'] = key;
    else if (value === 'CERTIFICATE #' || value === 'CANDIDATE #')
      columnIndices['CANDIDATE #'] = key;
  }

  console.log('Column indices found:', columnIndices);

  const studentsData: Student[] = [];
  for (let i = headerRowIndex + 1; i < data.length; i++) {
    const row = data[i];

    if (!row[columnIndices['NO']] || !row[columnIndices['SURNAME']]) {
      continue;
    }

    const studentData: Student = {
      no: Number(row[columnIndices['NO']]),
      surname: String(row[columnIndices['SURNAME']] || '').trim(),
      names: String(row[columnIndices['OTHER NAMES']] || '').trim(),
      phoneNumber: String(row[columnIndices['CONTACT #']] || '').trim(),
      candidateNo: String(row[columnIndices['CANDIDATE #']] || '').trim(),
      status,
      programId,
    };

    studentsData.push(studentData);
  }

  console.log(`Found ${studentsData.length} students in sheet: ${sheetName}`);
  return studentsData;
}

async function importStudentsFromExcel(filePath: string): Promise<void> {
  try {
    console.log(`Reading Excel file: ${filePath}`);
    const workbook = XLSX.readFile(filePath);

    for (const sheetName of workbook.SheetNames) {
      console.log(`Processing sheet: ${sheetName}`);
      const worksheet = workbook.Sheets[sheetName];
      const data: ExcelRow[] = XLSX.utils.sheet_to_json(worksheet, {
        header: 'A',
      });

      const studentsData = await processWorksheet(sheetName, data);

      if (studentsData.length > 0) {
        console.log(
          `Starting to import ${studentsData.length} students one by one...`,
        );

        for (let i = 0; i < studentsData.length; i++) {
          const student = studentsData[i];
          try {
            const result = await handleCreateOrUpdateStudent(
              student,
              sheetName,
            );
            const action = result.id !== student.id ? 'Updated' : 'Imported';
            console.log(
              `[${sheetName}] ${action} student ${i + 1}/${studentsData.length}: ${student.surname.trim()} ${student.names.trim()}`,
              sheetName
                .toLowerCase()
                .includes(student.status.replaceAll(' ', '').toLowerCase())
                ? chalk.green(student.status)
                : chalk.red(student.status),
            );
          } catch (error) {
            console.error(
              chalk.red(
                `[${sheetName}] Error importing student ${i + 1}/${studentsData.length}: ${student.surname.trim()} ${student.names.trim()} - Status: ${student.status}:`,
              ),
              error,
            );
          }
        }

        console.log(
          `Finished importing students for program ID: ${studentsData[0].programId}`,
        );
      }
    }

    console.log('Import completed');
  } catch (error) {
    console.error(chalk.red('Error importing students:'), error);
  }
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length < 1) {
    console.log('\nUsage: pnpm import-students <path-to-excel-file>');
    console.log('\nExample: pnpm import-students ./data/students.xlsx\n');
    process.exit(1);
  }

  const filePath = args[0];
  const resolvedPath = path.isAbsolute(filePath)
    ? filePath
    : path.resolve(process.cwd(), filePath);

  if (!fs.existsSync(resolvedPath)) {
    console.error(chalk.red(`Error: File not found: ${resolvedPath}`));
    console.log('\nUsage: pnpm import-students <path-to-excel-file>');
    process.exit(1);
  }

  console.log('Starting student import process...');
  await importStudentsFromExcel(resolvedPath);
  console.log('Student import process completed.');
  process.exit(0);
}

main().catch((err) => {
  console.error(chalk.red('Unhandled error during import:'), err);
  process.exit(1);
});
