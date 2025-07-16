import { db } from '../src/db';
import { students } from '../src/db/schema/students';
import { programs } from '../src/db/schema/programs';
import { faculties } from '../src/db/schema/programs';
import { eq } from 'drizzle-orm';

async function addReferenceColumn() {
  console.log('Starting reference column migration...');

  try {
    // Try to add the reference column to the students table
    console.log('Checking if reference column exists...');
    try {
      await db.run(`ALTER TABLE students ADD COLUMN reference TEXT`);
      console.log('Reference column added successfully.');
    } catch (error: any) {
      if (error.message.includes('duplicate column name')) {
        console.log(
          'Reference column already exists, skipping column creation.',
        );
      } else {
        throw error;
      }
    }

    // Try to create index for the reference column
    console.log('Creating index for reference column...');
    try {
      await db.run(`CREATE INDEX reference_idx ON students (reference)`);
      console.log('Index created successfully.');
    } catch (error: any) {
      if (error.message.includes('already exists')) {
        console.log('Index already exists, skipping index creation.');
      } else {
        throw error;
      }
    }

    // Fetch all students with their program and faculty information
    console.log('Fetching students data...');
    const studentsData = await db
      .select({
        id: students.id,
        no: students.no,
        status: students.status,
        programCode: programs.code,
        facultyCode: faculties.code,
      })
      .from(students)
      .innerJoin(programs, eq(students.programId, programs.id))
      .innerJoin(faculties, eq(programs.facultyId, faculties.id));

    console.log(`Found ${studentsData.length} students to update.`);

    // Update each student with their calculated reference
    let updatedCount = 0;
    for (const student of studentsData) {
      const statusCode = student.status === 'DQ' ? 'DQ' : student.status[0];
      const reference = `${student.facultyCode}/${student.programCode}/${statusCode}/${student.no}`;

      await db
        .update(students)
        .set({ reference })
        .where(eq(students.id, student.id));

      updatedCount++;
      if (updatedCount % 100 === 0) {
        console.log(
          `Updated ${updatedCount}/${studentsData.length} students...`,
        );
      }
    }

    console.log(
      `Successfully updated ${updatedCount} students with reference values.`,
    );
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

// Run the migration
addReferenceColumn().then(() => {
  console.log('Migration script finished.');
  process.exit(0);
});
