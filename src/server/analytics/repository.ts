import BaseRepository from '@/server/base/BaseRepository';
import { letterDownloads, pageVisits } from '@/db/schema';
import { db } from '@/db';
import { eq, sql } from 'drizzle-orm';

export class PageVisitsRepository extends BaseRepository<typeof pageVisits, 'id'> {
  constructor() {
    super(pageVisits, 'id');
  }

  async findByStudentId(studentId: string) {
    return db.query.pageVisits.findFirst({
      where: eq(pageVisits.studentId, studentId),
    });
  }

  async incrementVisit(studentId: string) {
    const existingVisit = await this.findByStudentId(studentId);

    if (existingVisit) {
      return db
        .update(pageVisits)
        .set({
          visitCount: existingVisit.visitCount + 1,
          lastVisitedAt: sql`(unixepoch())`,
        })
        .where(eq(pageVisits.id, existingVisit.id))
        .returning();
    } else {
      return this.create({
        studentId,
        visitCount: 1,
        lastVisitedAt: new Date(),
        createdAt: new Date(),
      });
    }
  }
}

export class LetterDownloadsRepository extends BaseRepository<typeof letterDownloads, 'id'> {
  constructor() {
    super(letterDownloads, 'id');
  }

  async findByStudentId(studentId: string) {
    return db.query.letterDownloads.findFirst({
      where: eq(letterDownloads.studentId, studentId),
    });
  }

  async incrementDownload(studentId: string) {
    const existingDownload = await this.findByStudentId(studentId);

    if (existingDownload) {
      return db
        .update(letterDownloads)
        .set({
          downloadCount: existingDownload.downloadCount + 1,
          lastDownloadedAt: sql`(unixepoch())`,
        })
        .where(eq(letterDownloads.id, existingDownload.id))
        .returning();
    } else {
      return this.create({
        studentId,
        downloadCount: 1,
        lastDownloadedAt: new Date(),
        createdAt: new Date(),
      });
    }
  }
}

export const pageVisitsRepository = new PageVisitsRepository();
export const letterDownloadsRepository = new LetterDownloadsRepository();
