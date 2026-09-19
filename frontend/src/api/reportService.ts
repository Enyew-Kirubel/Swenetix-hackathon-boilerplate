// import axiosInstance from './axiosInstance';
// import type { Report, ReportFormData } from '../types/report.types';

// export const getAllReports = async (): Promise<Report[]> => {
//   const res = await axiosInstance.get('/reports');
//   return res.data;
// };

// export const getReportById = async (id: string): Promise<Report> => {
//   const res = await axiosInstance.get(`/reports/${id}`);
//   return res.data;
// };

// export const createReport = async (data: ReportFormData): Promise<Report> => {
//   const res = await axiosInstance.post('/reports', data);
//   return res.data;
// };

// export const updateReport = async (id: string, data: ReportFormData): Promise<Report> => {
//   const res = await axiosInstance.put(`/reports/${id}`, data);
//   return res.data;
// };

// export const deleteReport = async (id: string): Promise<void> => {
//   await axiosInstance.delete(`/reports/${id}`);
// };



// src/api/reportService.ts
import axiosInstance from './axiosInstance';
import type { Report, ReportFormData } from '../types/report.types';
import { MOCK_REPORTS } from '../dummy/mock';

// 🟢 TOGGLE THIS FLAG:
// Set to 'true' to use mock data in-memory.
// Set to 'false' to route everything to the real backend.
const USE_MOCK = true;

// In-memory working copy so create, edit, and delete actually work during testing
let memoryReports: Report[] = [...MOCK_REPORTS];

// Helper to simulate network latency (300ms)
const sleep = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export const getAllReports = async (): Promise<Report[]> => {
  if (USE_MOCK) {
    await sleep();
    return [...memoryReports];
  }
  const res = await axiosInstance.get('/reports');
  return res.data;
};

export const getReportById = async (id: string): Promise<Report> => {
  if (USE_MOCK) {
    await sleep();
    const item = memoryReports.find((r) => r._id === id);
    if (!item) throw new Error('Report not found');
    return item;
  }
  const res = await axiosInstance.get(`/reports/${id}`);
  return res.data;
};

export const createReport = async (data: ReportFormData): Promise<Report> => {
  if (USE_MOCK) {
    await sleep();
    const newReport: Report = {
      ...data,
      _id: String(Date.now()),
      reporter: 'mock_user_1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    memoryReports.unshift(newReport);
    return newReport;
  }
  const res = await axiosInstance.post('/reports', data);
  return res.data;
};

export const updateReport = async (id: string, data: ReportFormData): Promise<Report> => {
  if (USE_MOCK) {
    await sleep();
    const index = memoryReports.findIndex((r) => r._id === id);
    if (index === -1) throw new Error('Report not found');
    memoryReports[index] = {
      ...memoryReports[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return memoryReports[index];
  }
  const res = await axiosInstance.put(`/reports/${id}`, data);
  return res.data;
};

export const deleteReport = async (id: string): Promise<void> => {
  if (USE_MOCK) {
    await sleep();
    memoryReports = memoryReports.filter((r) => r._id !== id);
    return;
  }
  await axiosInstance.delete(`/reports/${id}`);
};
