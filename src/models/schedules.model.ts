import { Document, model, Schema } from "mongoose";

interface ScheduleType {
  date: Date;
  content: String;
  done: boolean;
}

const ScheduleSchema: Schema = new Schema(
  {
    date: { type: Date },
    content: { type: String },
    done: { type: Boolean, default: false },
  },
  { timestamps: false }
);

export const ScheduleModel = model<ScheduleType & Document>("Schedule", ScheduleSchema);
