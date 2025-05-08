import { letterDownloads, pageVisits } from '@/db/schema';
import { pageVisitsRepository, letterDownloadsRepository } from './repository';
import withAuth from '@/server/base/withAuth';
import { QueryOptions } from '../base/BaseRepository';

type PageVisit = typeof pageVisits.$inferInsert;
type LetterDownload = typeof letterDownloads.$inferInsert;

class AnalyticsService {
  constructor(
    private readonly pageVisitsRepo = pageVisitsRepository,
    private readonly letterDownloadsRepo = letterDownloadsRepository
  ) {}

  // Page Visits
  async getPageVisit(id: string) {
    return withAuth(async () => this.pageVisitsRepo.findById(id), []);
  }

  async getPageVisitByStudentId(studentId: string) {
    return withAuth(async () => this.pageVisitsRepo.findByStudentId(studentId), []);
  }

  async getAllPageVisits(params: QueryOptions<typeof pageVisits>) {
    return withAuth(async () => this.pageVisitsRepo.query(params), []);
  }

  async incrementPageVisit(studentId: string) {
    return withAuth(async () => this.pageVisitsRepo.incrementVisit(studentId), []);
  }

  async createPageVisit(data: PageVisit) {
    return withAuth(async () => this.pageVisitsRepo.create(data), []);
  }

  async updatePageVisit(id: string, data: Partial<PageVisit>) {
    return withAuth(async () => this.pageVisitsRepo.update(id, data), []);
  }

  async deletePageVisit(id: string) {
    return withAuth(async () => this.pageVisitsRepo.delete(id), []);
  }

  // Letter Downloads
  async getLetterDownload(id: string) {
    return withAuth(async () => this.letterDownloadsRepo.findById(id), []);
  }

  async getLetterDownloadByStudentId(studentId: string) {
    return withAuth(async () => this.letterDownloadsRepo.findByStudentId(studentId), []);
  }

  async getAllLetterDownloads(params: QueryOptions<typeof letterDownloads>) {
    return withAuth(async () => this.letterDownloadsRepo.query(params), []);
  }

  async incrementLetterDownload(studentId: string) {
    return withAuth(async () => this.letterDownloadsRepo.incrementDownload(studentId), []);
  }

  async createLetterDownload(data: LetterDownload) {
    return withAuth(async () => this.letterDownloadsRepo.create(data), []);
  }

  async updateLetterDownload(id: string, data: Partial<LetterDownload>) {
    return withAuth(async () => this.letterDownloadsRepo.update(id, data), []);
  }

  async deleteLetterDownload(id: string) {
    return withAuth(async () => this.letterDownloadsRepo.delete(id), []);
  }
}

export const analyticsService = new AnalyticsService();
