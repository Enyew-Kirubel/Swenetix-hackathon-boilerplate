export enum LostItemCategory {
  Electronics = 'Electronics',
  DocumentsAndIds = 'Documents & IDs',
  BagsAndBackpacks = 'Bags & Backpacks',
  Clothing = 'Clothing',
  Keys = 'Keys',
  WalletsAndMoney = 'Wallets & Money',
  JewelryAndAccessories = 'Jewelry & Accessories',
  BooksAndSchoolItems = 'Books & School Items',
  Other = 'Other'
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
  reporter: string;
  createdAt: string;
  updatedAt: string;
}

export const MOCK_REPORTS: Report[] = [
  {
    _id: '66e1a4f1a23b4c001a111111',
    type: 'LOST',
    title: 'Space Gray MacBook Pro 14"',
    description: 'Left on the third-floor library desk near the quiet study pods. Has an ALX sticker on the lid.',
    category: LostItemCategory.Electronics,
    location: 'Central Library, 3rd Floor',
    date: '2026-09-15T14:30:00.000Z',
    imagePath: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
    color: 'Space Gray',
    brand: 'Apple',
    status: 'OPEN',
    reporter: '66e1a4f1a23b4c001a999001',
    createdAt: '2026-09-15T15:00:00.000Z',
    updatedAt: '2026-09-15T15:00:00.000Z'
  },
  {
    _id: '66e1a4f1a23b4c001a222222',
    type: 'FOUND',
    title: 'Brown Leather Bi-Fold Wallet',
    description: 'Found on the bench outside Building B cafeteria. Contains a national ID card and student badge.',
    category: LostItemCategory.WalletsAndMoney,
    location: 'Building B, Main Cafeteria Terrace',
    date: '2026-09-16T09:15:00.000Z',
    imagePath: 'https://images.unsplash.com/photo-1627123424574-724758594e93',
    color: 'Brown',
    brand: 'Fossil',
    status: 'OPEN',
    reporter: '66e1a4f1a23b4c001a999002',
    createdAt: '2026-09-16T10:00:00.000Z',
    updatedAt: '2026-09-16T10:00:00.000Z'
  },
  {
    _id: '66e1a4f1a23b4c001a333333',
    type: 'LOST',
    title: 'Black Matte ThinkPad Laptop Bag',
    description: 'Contains notebook, charger, and wired mouse. Forgotten under seat 14B in auditorium Hall 1.',
    category: LostItemCategory.BagsAndBackpacks,
    location: 'Campus Auditorium, Hall 1',
    date: '2026-09-17T11:45:00.000Z',
    imagePath: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62',
    color: 'Black',
    brand: 'Lenovo',
    status: 'OPEN',
    reporter: '66e1a4f1a23b4c001a999003',
    createdAt: '2026-09-17T12:10:00.000Z',
    updatedAt: '2026-09-17T12:10:00.000Z'
  },
  {
    _id: '66e1a4f1a23b4c001a444444',
    type: 'FOUND',
    title: 'Wireless Noise-Canceling Headphones',
    description: 'Discovered resting on a treadmill in the campus recreation center gym.',
    category: LostItemCategory.Electronics,
    location: 'Student Gym, Cardio Section',
    date: '2026-09-14T18:00:00.000Z',
    imagePath: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    color: 'Silver',
    brand: 'Sony',
    status: 'RESOLVED',
    reporter: '66e1a4f1a23b4c001a999001',
    createdAt: '2026-09-14T18:30:00.000Z',
    updatedAt: '2026-09-18T09:00:00.000Z'
  },
  {
    _id: '66e1a4f1a23b4c001a555555',
    type: 'LOST',
    title: 'Silver Mechanical Wristwatch',
    description: 'Stainless steel chain watch slipped off around the parking lot near the north gate entrance.',
    category: LostItemCategory.JewelryAndAccessories,
    location: 'North Gate Parking Lot',
    date: '2026-09-18T08:20:00.000Z',
    color: 'Silver',
    brand: 'Casio',
    status: 'OPEN',
    reporter: '66e1a4f1a23b4c001a999004',
    createdAt: '2026-09-18T08:50:00.000Z',
    updatedAt: '2026-09-18T08:50:00.000Z'
  },
  {
    _id: '66e1a4f1a23b4c001a666666',
    type: 'FOUND',
    title: 'Set of House & Car Keys on Red Lanyard',
    description: 'Three metal keys, one car key fob, attached to an embroidered red nylon lanyard.',
    category: LostItemCategory.Keys,
    location: 'Computer Lab 4, Desk 12',
    date: '2026-09-18T16:00:00.000Z',
    imagePath: 'https://images.unsplash.com/photo-1582139329536-e7284fece509',
    color: 'Red',
    status: 'OPEN',
    reporter: '66e1a4f1a23b4c001a999002',
    createdAt: '2026-09-18T16:45:00.000Z',
    updatedAt: '2026-09-18T16:45:00.000Z'
  }
];

// // src/dummy/mock.ts
// import type { User } from '../types/report.types';

// export const MOCK_USER: User = {
//   _id: 'user_101',
//   name: 'Alex Rivera',
//   email: 'alex.rivera@example.com',
// };