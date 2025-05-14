import { letterDownloads, pageVisits } from '@/db/schema';
import { pageVisitsRepository, letterDownloadsRepository, studentsAnalyticsRepository } from './repository';
import withAuth from '@/server/base/withAuth';
import { QueryOptions } from '../base/BaseRepository';
import { students } from '@/db/schema/students';
import { db } from '@/db';
import { inArray } from 'drizzle-orm';

type PageVisit = typeof pageVisits.$inferInsert;
type LetterDownload = typeof letterDownloads.$inferInsert;

class AnalyticsService {
  constructor(
    private readonly pageVisitsRepo = pageVisitsRepository,
    private readonly letterDownloadsRepo = letterDownloadsRepository,
    private readonly studentsAnalyticsRepo = studentsAnalyticsRepository,
  ) {}

  async getPageVisit(id: string) {
    return withAuth(async () => this.pageVisitsRepo.findById(id), ['registry']);
  }

  async getPageVisitByStudentId(studentId: string) {
    return withAuth(
      async () => this.pageVisitsRepo.findByStudentId(studentId),
      ['registry'],
    );
  }

  async getAllPageVisits(params: QueryOptions<typeof pageVisits>) {
    return withAuth(
      async () => this.pageVisitsRepo.query(params),
      ['registry'],
    );
  }

  async incrementPageVisit(studentId: string) {
    return withAuth(
      async () => this.pageVisitsRepo.incrementVisit(studentId),
      ['all'],
    );
  }

  async createPageVisit(data: PageVisit) {
    return withAuth(async () => this.pageVisitsRepo.create(data), ['all']);
  }

  async updatePageVisit(id: string, data: Partial<PageVisit>) {
    return withAuth(async () => this.pageVisitsRepo.update(id, data), ['all']);
  }

  async deletePageVisit(id: string) {
    return withAuth(async () => this.pageVisitsRepo.delete(id), []);
  }
  
  async getTotalVisits() {
    return withAuth(
      async () => this.pageVisitsRepo.getTotalVisits(),
      ['registry'],
    );
  }

  async getUniqueVisitors() {
    return withAuth(
      async () => this.pageVisitsRepo.getUniqueVisitors(),
      ['registry'],
    );
  }

  async getDailyVisits(days: number = 30) {
    return withAuth(
      async () => this.pageVisitsRepo.getDailyVisits(days),
      ['registry'],
    );
  }

  async getTopVisitors(limit: number = 10) {
    return withAuth(
      async () => {
        const topVisitors = await this.pageVisitsRepo.getTopVisitors(limit);
        
        // Fetch student names for the top visitors
        const studentIds = topVisitors.map(visitor => visitor.studentId);
        const studentsData = await db.query.students.findMany({
          where: inArray(students.id, studentIds),
          columns: {
            id: true,
            surname: true,
            names: true,
          },
        });
        
        // Map student names to visitors
        return topVisitors.map(visitor => {
          const student = studentsData.find(s => s.id === visitor.studentId);
          return {
            ...visitor,
            studentName: student ? `${student.surname} ${student.names}` : 'Unknown',
          };
        });
      },
      ['registry'],
    );
  }

  // Letter Downloads
  async getLetterDownload(id: string) {
    return withAuth(
      async () => this.letterDownloadsRepo.findById(id),
      ['registry'],
    );
  }

  async getLetterDownloadByStudentId(studentId: string) {
    return withAuth(
      async () => this.letterDownloadsRepo.findByStudentId(studentId),
      ['registry'],
    );
  }

  async getAllLetterDownloads(params: QueryOptions<typeof letterDownloads>) {
    return withAuth(
      async () => this.letterDownloadsRepo.query(params),
      ['registry'],
    );
  }

  async incrementLetterDownload(studentId: string) {
    return withAuth(
      async () => this.letterDownloadsRepo.incrementDownload(studentId),
      ['all'],
    );
  }

  async createLetterDownload(data: LetterDownload) {
    return withAuth(async () => this.letterDownloadsRepo.create(data), ['all']);
  }

  async updateLetterDownload(id: string, data: Partial<LetterDownload>) {
    return withAuth(
      async () => this.letterDownloadsRepo.update(id, data),
      ['all'],
    );
  }

  async deleteLetterDownload(id: string) {
    return withAuth(async () => this.letterDownloadsRepo.delete(id), []);
  }
  
  async getTotalDownloads() {
    return withAuth(
      async () => this.letterDownloadsRepo.getTotalDownloads(),
      ['registry'],
    );
  }

  async getUniqueDownloaders() {
    return withAuth(
      async () => this.letterDownloadsRepo.getUniqueDownloaders(),
      ['registry'],
    );
  }

  async getDailyDownloads(days: number = 30) {
    return withAuth(
      async () => this.letterDownloadsRepo.getDailyDownloads(days),
      ['registry'],
    );
  }

  async getTopDownloaders(limit: number = 10) {
    return withAuth(
      async () => {
        const topDownloaders = await this.letterDownloadsRepo.getTopDownloaders(limit);
        
        // Fetch student names for the top downloaders
        const studentIds = topDownloaders.map(downloader => downloader.studentId);
        const studentsData = await db.query.students.findMany({
          where: inArray(students.id, studentIds),
          columns: {
            id: true,
            surname: true,
            names: true,
          },
        });
        
        // Map student names to downloaders
        return topDownloaders.map(downloader => {
          const student = studentsData.find(s => s.id === downloader.studentId);
          return {
            ...downloader,
            studentName: student ? `${student.surname} ${student.names}` : 'Unknown',
          };
        });
      },
      ['registry'],
    );
  }

  async getTotalStudents() {
    return withAuth(
      async () => this.studentsAnalyticsRepo.getTotalStudents(),
      ['registry'],
    );
  }

  async getTotalAdmittedStudents() {
    return withAuth(
      async () => this.studentsAnalyticsRepo.getTotalAdmittedStudents(),
      ['registry'],
    );
  }
}

export const analyticsService = new AnalyticsService();
