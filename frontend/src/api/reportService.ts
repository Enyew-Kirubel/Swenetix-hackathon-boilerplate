import axiosInstance from './axiosInstance';
import type { Report, ReportFormData } from '../types/report.types';

export const getAllReports = async (): Promise<Report[]> => {
  const res = await axiosInstance.get('/reports');
  return res.data;
};

export const getReportById = async (id: string): Promise<Report> => {
  const res = await axiosInstance.get(`/reports/${id}`);
  return res.data;
};

export const createReport = async (data: ReportFormData): Promise<Report> => {
  const res = await axiosInstance.post('/reports', data);
  return res.data;
};

export const updateReport = async (id: string, data: ReportFormData): Promise<Report> => {
  const res = await axiosInstance.put(`/reports/${id}`, data);
  return res.data;
};

export const deleteReport = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/reports/${id}`);
};