import { z } from "zod";
import { loginSchema } from "./login.schema";
export type LoginInput = z.infer<typeof loginSchema>["body"];
export interface LoginResult {
  accessToken: string;
  refreshToken?: string;
  user: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    role: string;
    isVerified: boolean;
  };
}
