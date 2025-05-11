import { letterDownloads, pageVisits } from '@/db/schema';
import { pageVisitsRepository, letterDownloadsRepository } from './repository';
import withAuth from '@/server/base/withAuth';
import { QueryOptions } from '../base/BaseRepository';

type PageVisit = typeof pageVisits.$inferInsert;
type LetterDownload = typeof letterDownloads.$inferInsert;

class AnalyticsService {
  constructor(
    private readonly pageVisitsRepo = pageVisitsRepository,
    private readonly letterDownloadsRepo = letterDownloadsRepository,
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
}

export const analyticsService = new AnalyticsService();
