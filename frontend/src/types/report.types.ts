// src/types/report.types.ts

export interface User {
  _id: string;
  name: string;
  email: string;
}

export enum LostItemCategory {
  Electronics = 'Electronics',
  DocumentsAndIds = 'Documents & IDs',
  BagsAndBackpacks = 'Bags & Backpacks',
  Clothing = 'Clothing',
  Keys = 'Keys',
  WalletsAndMoney = 'Wallets & Money',
  JewelryAndAccessories = 'Jewelry & Accessories',
  BooksAndSchoolItems = 'Books & School Items',
  Other = 'Other',
}

export interface Report {
  _id: string;
  type: 'LOST' | 'FOUND';
  title: string;
  description: string;
  category: LostItemCategory;
  location: string;
  date: string;
  imagePath?: string;
  color?: string;
  brand?: string;
  status: 'OPEN' | 'RESOLVED';
  reporter: User | string; // Accommodates populated User object or raw ID string
  createdAt: string;
  updatedAt: string;
}

// Derived type for creating or editing reports
// Automatically excludes system-managed properties (_id, reporter, timestamps)
export type ReportFormData = Omit<Report, '_id' | 'reporter' | 'createdAt' | 'updatedAt'> & {
  status?: 'OPEN' | 'RESOLVED';
};

// Search and filter parameters (for Home page or filter widgets)
export interface ReportFilterParams {
  type?: 'LOST' | 'FOUND';
  category?: LostItemCategory;
  status?: 'OPEN' | 'RESOLVED';
  search?: string;
}