import { db } from '@/db';
import { programs, students } from '@/db/schema';
import BaseRepository, { QueryOptions } from '@/server/base/BaseRepository';
import { and, eq, or, sql, inArray, SQL } from 'drizzle-orm';

export default class StudentRepository extends BaseRepository<
  typeof students,
  'id'
> {
  constructor() {
    super(students, 'id');
  }

  override async findById(id: string) {
    return db.query.students.findFirst({
      where: eq(students.id, id),
      with: {
        program: {
          with: { faculty: true },
        },
        studentInfo: true,
      },
    });
  }

  async findByReference(reference: string) {
    return db.query.students.findFirst({
      where: eq(students.reference, reference),
      with: {
        program: {
          with: { faculty: true },
        },
        studentInfo: true,
      },
    });
  }

  async findByUniqueIdentifiers(student: typeof students.$inferInsert) {
    if (student.candidateNo) {
      const found = await db.query.students.findFirst({
        where: eq(students.candidateNo, student.candidateNo),
      });
      if (found) return found;
    }

    if (student.surname && student.names) {
      const found = await db.query.students.findFirst({
        where: and(
          eq(students.surname, student.surname),
          eq(students.names, student.names),
        ),
      });
      if (found) return found;
    }

    return null;
  }

  override async query(params: QueryOptions<typeof students>) {
    let filter = undefined;

    if (params.search) {
      const searchTerms = params.search.trim().split(/\s+/);

      const conditions = searchTerms.map((term) => {
        const containsNumber = /\d/.test(term);

        if (containsNumber) {
          const wildcardTerm = '%' + term + '%';

          return or(
            sql`${students.candidateNo} LIKE ${wildcardTerm}`,
            sql`${students.phoneNumber} LIKE ${wildcardTerm}`,
          );
        } else {
          const interleaved = term.split('').join('%');
          const wildcardTerm = '%' + term + '%';

          const substitutionPatterns = [
            wildcardTerm,
            '%' + interleaved + '%',
            ...this.generateVowelSubstitutions(term),
            ...this.generateConsonantSubstitutions(term),
          ];

          const fieldConditions = [
            ...substitutionPatterns.map(
              (pattern) =>
                sql`LOWER(${students.surname}) LIKE LOWER(${pattern})`,
            ),
            ...substitutionPatterns.map(
              (pattern) => sql`LOWER(${students.names}) LIKE LOWER(${pattern})`,
            ),
          ];

          return or(...fieldConditions);
        }
      });

      if (conditions.length > 0) {
        filter = conditions.length === 1 ? conditions[0] : and(...conditions);
      }
    }

    const criteria = this.buildQueryCriteria({
      ...params,
      filter,
    });

    const data = await db.query.students.findMany({
      ...criteria,
    });

    return this.createPaginatedResult(data, criteria);
  }

  /**
   * Generates patterns for common vowel substitutions
   * Helps match names where vowels might be mistyped
   */
  private generateVowelSubstitutions(term: string): string[] {
    const patterns: string[] = [];
    const vowelMap: Record<string, string[]> = {
      a: ['e', 'o'],
      e: ['a', 'i'],
      i: ['e', 'y'],
      o: ['a', 'u'],
      u: ['o'],
    };

    for (let i = 0; i < term.length; i++) {
      const char = term[i].toLowerCase();
      if (vowelMap[char]) {
        for (const substitute of vowelMap[char]) {
          const pattern =
            '%' +
            term.substring(0, i) +
            substitute +
            term.substring(i + 1) +
            '%';
          patterns.push(pattern);
        }
      }
    }

    return patterns;
  }

  /**
   * Generates patterns for common consonant substitutions
   * Helps match names where similar sounding consonants might be mistyped
   */
  private generateConsonantSubstitutions(term: string): string[] {
    const patterns: string[] = [];
    const consonantMap: Record<string, string[]> = {
      c: ['k', 's'],
      k: ['c', 'q'],
      ph: ['f'],
      f: ['ph'],
      th: ['t'],
      g: ['j'],
      j: ['g'],
      n: ['m'],
      m: ['n'],
    };

    for (let i = 0; i < term.length - 1; i++) {
      const twoChars = term.substring(i, i + 2).toLowerCase();
      if (consonantMap[twoChars]) {
        for (const substitute of consonantMap[twoChars]) {
          const pattern =
            '%' +
            term.substring(0, i) +
            substitute +
            term.substring(i + 2) +
            '%';
          patterns.push(pattern);
        }
      }
    }

    for (let i = 0; i < term.length; i++) {
      const char = term[i].toLowerCase();
      if (consonantMap[char]) {
        for (const substitute of consonantMap[char]) {
          const pattern =
            '%' +
            term.substring(0, i) +
            substitute +
            term.substring(i + 1) +
            '%';
          patterns.push(pattern);
        }
      }
    }

    return patterns;
  }

  async getAcceptedByFaculty(params: {
    facultyId?: number;
    programId?: number;
    page: number;
    size?: number;
  }) {
    const { facultyId, programId, page = 1, size = 20 } = params;
    const conditions: SQL[] = [];

    conditions.push(eq(students.accepted, true));

    if (programId) {
      conditions.push(eq(students.programId, programId));
    }

    if (facultyId) {
      const facultyPrograms = await db.query.programs.findMany({
        where: eq(programs.facultyId, facultyId),
        columns: { id: true },
      });

      const facultyProgramIds = facultyPrograms.map((p) => p.id);

      if (facultyProgramIds.length > 0) {
        conditions.push(inArray(students.programId, facultyProgramIds));
      } else {
        return this.createPaginatedResult([], {
          limit: size,
          where: and(...conditions),
        });
      }
    }

    const criteria = this.buildQueryCriteria({
      filter: and(...conditions),
      page,
      size,
    });

    const data = await db.query.students.findMany({
      ...criteria,
      with: {
        program: true,
      },
    });

    return this.createPaginatedResult(data, criteria);
  }
}

export const studentsRepository = new StudentRepository();
