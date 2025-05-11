'use server';

import { letterDownloads, pageVisits } from '@/db/schema';
import { analyticsService as service } from './service';
import { QueryOptions } from '../base/BaseRepository';

type PageVisit = typeof pageVisits.$inferInsert;
type LetterDownload = typeof letterDownloads.$inferInsert;

export async function getPageVisit(id: string) {
  return service.getPageVisit(id);
}

export async function getPageVisitByStudentId(studentId: string) {
  return service.getPageVisitByStudentId(studentId);
}

export async function getPageVisits(params: QueryOptions<typeof pageVisits>) {
  return service.getAllPageVisits(params);
}

export async function incrementPageVisit(studentId: string) {
  return service.incrementPageVisit(studentId);
}

export async function createPageVisit(data: PageVisit) {
  return service.createPageVisit(data);
}

export async function updatePageVisit(id: string, data: Partial<PageVisit>) {
  return service.updatePageVisit(id, data);
}

export async function deletePageVisit(id: string) {
  return service.deletePageVisit(id);
}

export async function getLetterDownload(id: string) {
  return service.getLetterDownload(id);
}

export async function getLetterDownloadByStudentId(studentId: string) {
  return service.getLetterDownloadByStudentId(studentId);
}

export async function getLetterDownloads(
  params: QueryOptions<typeof letterDownloads>,
) {
  return service.getAllLetterDownloads(params);
}

export async function incrementLetterDownload(studentId: string) {
  return service.incrementLetterDownload(studentId);
}

export async function createLetterDownload(data: LetterDownload) {
  return service.createLetterDownload(data);
}

export async function updateLetterDownload(
  id: string,
  data: Partial<LetterDownload>,
) {
  return service.updateLetterDownload(id, data);
}

export async function deleteLetterDownload(id: string) {
  return service.deleteLetterDownload(id);
}

// Analytics Dashboard Actions
export async function getTotalVisits() {
  return service.getTotalVisits();
}

export async function getDailyVisits(days: number = 30) {
  return service.getDailyVisits(days);
}

export async function getTopVisitors(limit: number = 10) {
  return service.getTopVisitors(limit);
}

export async function getTotalDownloads() {
  return service.getTotalDownloads();
}

export async function getDailyDownloads(days: number = 30) {
  return service.getDailyDownloads(days);
}

export async function getTopDownloaders(limit: number = 10) {
  return service.getTopDownloaders(limit);
}
