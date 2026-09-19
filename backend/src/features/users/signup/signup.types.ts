import { z } from "zod";
import { signupSchema } from "./signup.schema";
import { UserRole } from "../domain/user";
export type SignupInput = z.infer<typeof signupSchema>["body"];

export interface SignupResult {
  user: {
    id: string;
    email: string;
    name: string;
    phone?: string;
    isVerified: boolean;
    role: UserRole;
    avatar?: string;
  };
}
