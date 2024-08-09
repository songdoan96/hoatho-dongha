import { Document, model, Schema } from "mongoose";
import UserType from "../interfaces/user.interface";

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, enum: ["PL", "HT", "KCS"], required: true },
  },
  { timestamps: false }
);

export const UserModel = model<UserType & Document>("User", UserSchema);
