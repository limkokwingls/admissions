import * as XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import { db } from '../db';
import { students } from '../db/schema/students';
import { programs } from '../db/schema/programs';
import { eq, sql } from 'drizzle-orm';
import 'dotenv/config';

if (!process.env.TURSO_DATABASE_URL) {
  console.error(
    'Error: TURSO_DATABASE_URL environment variable is not defined.',
  );
  console.error('Please make sure your .env file is properly configured.');
  process.exit(1);
}

interface StudentData {
  no: number;
  surname: string;
  names: string;
  phoneNumber: string;
  candidateNo: string;
  status: 'Admitted' | 'Wait Listed' | 'DQ';
  programId: number;
}

async function findProgramByName(
  programName: string,
): Promise<number | undefined> {
  const result = await db.query.programs.findFirst({
    where: sql`LOWER(${programs.name}) = LOWER(${programName.trim()})`,
  });
  return result?.id;
}

function extractSheetMetadata(data: any[]): {
  programName: string | null;
  status: 'Admitted' | 'Wait Listed' | 'DQ';
} {
  let institution: string | null = null;
  let programName: string | null = null;
  let selectionCriteria: string | null = null;
  let certificateInfo: string | null = null;
  let status: 'Admitted' | 'Wait Listed' | 'DQ' = 'Wait Listed';

  for (let i = 0; i < 15; i++) {
    const row: any = data[i] || {};

    if (
      row.A &&
      typeof row.A === 'string' &&
      row.A.includes('LIMKOKWING UNIVERSITY')
    ) {
      institution = row.A;
    }

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

    if (
      row.A &&
      typeof row.A === 'string' &&
      row.A.includes('SELECTION CRITERIA:')
    ) {
      selectionCriteria = row.A;
    }

    if (
      row.A &&
      typeof row.A === 'string' &&
      row.A.includes("With 'O' Grade")
    ) {
      certificateInfo = row.A;
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

  if (!programName) {
    for (let i = 0; i < 15; i++) {
      const row: any = data[i] || {};
      for (const [key, value] of Object.entries(row)) {
        if (value && typeof value === 'string' && !programName) {
          const programPatterns = [
            /BSC\s+IT/i,
            /DIPLOMA\s+IN\s+.+/i,
            /BACHELOR\s+OF\s+.+/i,
          ];

          for (const pattern of programPatterns) {
            if (pattern.test(value)) {
              programName = value.trim();
              break;
            }
          }
        }
      }
      if (programName) break;
    }
  }

  return { programName, status };
}

async function processWorksheet(
  sheetName: string,
  data: any[],
): Promise<StudentData[]> {
  const { programName, status } = extractSheetMetadata(data);

  if (!programName) {
    console.error(`Could not find program name in sheet: ${sheetName}`);
    return [];
  }

  console.log(`Found program: "${programName}" with status: ${status}`);

  const programId = await findProgramByName(programName);

  if (!programId) {
    console.error(
      `Program "${programName}" not found in database. Please create it first.`,
    );
    return [];
  }

  let headerRowIndex = -1;
  for (let i = 0; i < data.length; i++) {
    const row: any = data[i] || {};
    if (row.A === 'NO' && row.B === 'SURNAME' && row.C === 'OTHER NAMES') {
      headerRowIndex = i;
      break;
    }
  }

  if (headerRowIndex === -1) {
    console.error(`Could not find header row in sheet: ${sheetName}`);
    return [];
  }

  const headerRow: any = data[headerRowIndex];
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

  const studentsData: StudentData[] = [];
  for (let i = headerRowIndex + 1; i < data.length; i++) {
    const row: any = data[i];

    if (!row[columnIndices['NO']] || !row[columnIndices['SURNAME']]) {
      continue;
    }

    const studentData: StudentData = {
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
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 'A' });

      const studentsData = await processWorksheet(sheetName, data);

      if (studentsData.length > 0) {
        console.log(
          `Starting to import ${studentsData.length} students one by one...`,
        );

        for (let i = 0; i < studentsData.length; i++) {
          const student = studentsData[i];
          try {
            await db.insert(students).values(student);
            console.log(
              `Imported student ${i + 1}/${studentsData.length}: ${student.surname} ${student.names}`,
            );
          } catch (error) {
            console.error(
              `Error importing student ${i + 1}/${studentsData.length}: ${student.surname} ${student.names}:`,
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
    console.error('Error importing students:', error);
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
    console.error(`Error: File not found: ${resolvedPath}`);
    console.log('\nUsage: pnpm import-students <path-to-excel-file>');
    process.exit(1);
  }

  console.log('Starting student import process...');
  await importStudentsFromExcel(resolvedPath);
  console.log('Student import process completed.');
  process.exit(0);
}

main().catch((err) => {
  console.error('Unhandled error during import:', err);
  process.exit(1);
});
