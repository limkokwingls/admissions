'use client';
import { useState } from 'react';
import * as XLSX from 'xlsx';
import { saveStudentList } from '@/lib/service';

interface Student {
  position: string;
  surname: string;
  names: string;
  candidateNum: string;
  subjects: {
    subject1: string;
    subject2: string;
    subject3: string;
    subject4: string;
    subject5: string;
  };
  credits: number;
}

interface Program {
  name: string;
  institution: string;
  totalCandidates: number;
  selectionCriteria: string;
  students: Student[];
}

export default function ImporterPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const extractProgramInfo = (sheet: XLSX.WorkSheet) => {
    // Find the program name cell (usually around row 7)
    const programNameCell = sheet['A7'];
    if (!programNameCell || !programNameCell.v) return null;

    const programNameText = programNameCell.v.toString();
    // Extract everything after "COURSE/PROGRAMME NAME: "
    const match = programNameText.match(/COURSE\/PROGRAMME NAME:\s*(.+)/);
    return match ? match[1].trim() : null;
  };

  const parseSheet = (sheet: XLSX.WorkSheet): Program | null => {
    const programName = extractProgramInfo(sheet);
    if (!programName) return null;

    // Convert the sheet to an array of rows
    const rows: any[] = [];
    const range = XLSX.utils.decode_range(sheet['!ref'] || 'A1');

    // Start from row 17 where the student data begins
    for (let R = 17; R <= range.e.r; R++) {
      const row: any = {};
      let isEmpty = true;

      // Check each cell in the row
      for (let C = 0; C <= range.e.c; C++) {
        const cellRef = XLSX.utils.encode_cell({ r: R, c: C });
        const cell = sheet[cellRef];
        if (cell && cell.v !== undefined) {
          isEmpty = false;
          // Map column indices to your header names
          const header = getHeaderForColumn(C);
          if (header) {
            row[header] = cell.v;
          }
        }
      }

      if (!isEmpty && row['NO']) {
        // Only add non-empty rows that have a student number
        rows.push(row);
      }
    }

    const students = rows.map((row) => ({
      position: String(row['NO'] || ''),
      surname: String(row['SURNAME'] || ''),
      names: String(row['OTHER NAMES'] || ''),
      candidateNum: String(row['CANDIDATE #'] || ''),
      subjects: {
        subject1: String(row['1'] || ''),
        subject2: String(row['2'] || ''),
        subject3: String(row['3'] || ''),
        subject4: String(row['4'] || ''),
        subject5: String(row['5'] || ''),
      },
      credits: Number(row['CREDITS']) || 0,
    }));

    return {
      name: programName,
      institution: 'LIMKOKWING UNIVERSITY OF CREATIVE TECHNOLOGY',
      totalCandidates: students.length,
      selectionCriteria:
        'a minimum of 5 passes which must include English Language, Mathematics, and any commercial subject',
      students,
    };
  };

  const getHeaderForColumn = (colIndex: number): string | null => {
    const headers: { [key: number]: string } = {
      0: 'NO',
      1: 'SURNAME',
      2: 'OTHER NAMES',
      3: 'CANDIDATE #',
      4: '1',
      5: '2',
      6: '3',
      7: '4',
      8: '5',
      9: 'CREDITS',
    };
    return headers[colIndex] || null;
  };

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });

        const parsedPrograms = workbook.SheetNames.map((sheetName) => {
          const sheet = workbook.Sheets[sheetName];
          const program = parseSheet(sheet);
          console.log(`Sheet ${sheetName}:`, program); // Debug log
          return program;
        }).filter((program): program is Program => program !== null);

        setPrograms(parsedPrograms);
        console.log('All parsed programs:', parsedPrograms);
      } catch (error) {
        console.error('Error parsing Excel file:', error);
      }
    };

    reader.onerror = (error) => {
      console.error('Error reading file:', error);
    };

    reader.readAsBinaryString(file);
  };

  const transformToStudentList = (programs: Program[]) => {
    return programs.flatMap((program) =>
      program.students.map((student) => ({
        ...student,
        program: program.name,
        institution: program.institution,
        status: 'admitted', // required by saveStudentList
        createdAt: new Date().toISOString(),
      }))
    );
  };

  const handleSave = async () => {
    if (!programs.length || isSaving) return;

    try {
      setIsSaving(true);
      const studentList = transformToStudentList(programs);
      await saveStudentList(studentList);
      alert('Data saved successfully!');
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Error saving data. Please check console for details.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className='p-4'>
      <input
        type='file'
        accept='.xlsx,.xls'
        onChange={(event) => handleFileSelect(event.target.files)}
        className='block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100'
      />

      {programs.length > 0 && (
        <div className='mt-4'>
          <h2 className='text-lg font-semibold mb-2'>Imported Programs:</h2>
          {programs.map((program, index) => (
            <div key={index} className='mb-4 p-4 border rounded'>
              <h3 className='font-semibold'>{program.name}</h3>
              <p>Total Students: {program.students.length}</p>
            </div>
          ))}

          <button
            onClick={handleSave}
            disabled={isSaving}
            className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400'
          >
            {isSaving ? 'Saving...' : 'Save to Database'}
          </button>
        </div>
      )}
    </div>
  );
}
