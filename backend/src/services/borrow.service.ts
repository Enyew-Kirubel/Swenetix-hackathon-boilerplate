import Borrowing from "../models/Borrowing";
import Book from "../models/Book";
import { User } from "../models/User";
import { id } from "zod/v4/locales";

interface CreateBorrowingData {
  userId: string;
  bookId: string;
}

export const createBorrowing = async (
  data: CreateBorrowingData
) => {
  const { userId, bookId } = data;

  // Check if user exists
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  // Check if book exists
  const book = await Book.findById(bookId);

  if (!book) {
    throw new Error("Book not found");
  }

  // Check user's active borrowings
  const activeBorrowings = await Borrowing.countDocuments({
    userId,
    status: "BORROWED",
  });

  // Maximum 3 active books
  if (activeBorrowings >= 3) {
    throw new Error(
      "User has reached the maximum limit of 3 books"
    );
  }

  // Calculate borrowing and due dates
  const borrowedAt = new Date();

  const dueDate = new Date(borrowedAt);
  dueDate.setDate(dueDate.getDate() + 14);

  // Create borrowing record
  const borrowing = await Borrowing.create({
    id,
    userId,
    bookId,
    borrowedAt,
    dueDate,
    status: "BORROWED",
  });

  return borrowing;
};

export const returnBorrowing = async (
  borrowingId: string
) => {
  const borrowing = await Borrowing.findById(borrowingId);

  if (!borrowing) {
    throw new Error("Borrowing record not found");
  }

  if (borrowing.status === "RETURNED") {
    throw new Error("This book has already been returned");
  }

  borrowing.returnDate = new Date();
  borrowing.status = "RETURNED";

  await borrowing.save();

  return borrowing;
};