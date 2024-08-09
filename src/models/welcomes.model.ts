import { Document, model, Schema } from "mongoose";
// import WelcomeType from "../interfaces/user.interface";

interface WelcomeType {
  image: String;
  active: Boolean;
}

const WelcomeSchema: Schema = new Schema(
  {
    image: { type: String },
    active: { type: Boolean, default: true },
  },
  { timestamps: false }
);

export const WelcomeModel = model<WelcomeType & Document>("Welcome", WelcomeSchema);
