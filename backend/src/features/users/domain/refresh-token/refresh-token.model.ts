import { model } from "mongoose";
import { type IRefreshTokenDocument } from "./refresh-token.types";
import { refreshTokenSchema } from "./refresh-token.schema";

export const RefreshToken = model<IRefreshTokenDocument>(
  "RefreshToken",
  refreshTokenSchema,
);
