export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface Report {
  _id: string;
  title: string;
  description: string;
  category: string;
  status: 'LOST' | 'FOUND';
  location: string;
  date: string;
  reporter?: User | string;
  createdAt: string;
  updatedAt: string;
}

export interface ReportFormData {
  title: string;
  description: string;
  category: string;
  status: 'LOST' | 'FOUND';
  location: string;
}