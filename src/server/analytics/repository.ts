import { db } from '@/db';
import { letterDownloads, pageVisits } from '@/db/schema';
import BaseRepository from '@/server/base/BaseRepository';
import { count, desc, eq, sql } from 'drizzle-orm';

export class PageVisitsRepository extends BaseRepository<
  typeof pageVisits,
  'id'
> {
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

  async getTotalVisits() {
    const result = await db
      .select({ total: sql<number>`sum(${pageVisits.visitCount})` })
      .from(pageVisits);
    return result[0]?.total || 0;
  }

  async getUniqueVisitors() {
    const result = await db
      .select({ count: sql<number>`count(distinct ${pageVisits.studentId})` })
      .from(pageVisits);
    return result[0]?.count || 0;
  }

  async getDailyVisits(days: number = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    const startTimestamp = Math.floor(startDate.getTime() / 1000);

    const result = await db
      .select({
        date: sql<string>`date(${pageVisits.lastVisitedAt}, 'unixepoch')`,
        count: count(),
      })
      .from(pageVisits)
      .where(sql`${pageVisits.lastVisitedAt} >= ${startTimestamp}`)
      .groupBy(sql`date(${pageVisits.lastVisitedAt}, 'unixepoch')`)
      .orderBy(sql`date(${pageVisits.lastVisitedAt}, 'unixepoch')`);

    return result;
  }

  async getTopVisitors(limit: number = 10) {
    return db
      .select({
        studentId: pageVisits.studentId,
        visits: pageVisits.visitCount,
      })
      .from(pageVisits)
      .orderBy(desc(pageVisits.visitCount))
      .limit(limit);
  }
}

export class LetterDownloadsRepository extends BaseRepository<
  typeof letterDownloads,
  'id'
> {
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

  async getTotalDownloads() {
    const result = await db
      .select({ total: sql<number>`sum(${letterDownloads.downloadCount})` })
      .from(letterDownloads);
    return result[0]?.total || 0;
  }

  async getUniqueDownloaders() {
    const result = await db
      .select({ count: sql<number>`count(distinct ${letterDownloads.studentId})` })
      .from(letterDownloads);
    return result[0]?.count || 0;
  }

  async getDailyDownloads(days: number = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    const startTimestamp = Math.floor(startDate.getTime() / 1000);

    const result = await db
      .select({
        date: sql<string>`date(${letterDownloads.lastDownloadedAt}, 'unixepoch')`,
        count: count(),
      })
      .from(letterDownloads)
      .where(sql`${letterDownloads.lastDownloadedAt} >= ${startTimestamp}`)
      .groupBy(sql`date(${letterDownloads.lastDownloadedAt}, 'unixepoch')`)
      .orderBy(sql`date(${letterDownloads.lastDownloadedAt}, 'unixepoch')`);

    return result;
  }

  async getTopDownloaders(limit: number = 10) {
    return db
      .select({
        studentId: letterDownloads.studentId,
        downloads: letterDownloads.downloadCount,
      })
      .from(letterDownloads)
      .orderBy(desc(letterDownloads.downloadCount))
      .limit(limit);
  }
}

export const pageVisitsRepository = new PageVisitsRepository();
export const letterDownloadsRepository = new LetterDownloadsRepository();
