import { Document, model, Schema } from "mongoose";

export interface ItemType {
  _id: String;
  customer: String;
  style: String;
  type: String;
  model?: String;
  item_code?: String;
  color?: String;
  size?: String;
  params?: String;
  unit: String;
}

const ItemSchema: Schema = new Schema(
  {
    customer: { type: String, required: true, uppercase: true, trim: true },
    style: { type: String, required: true, uppercase: true, trim: true },
    type: { type: String, required: true, uppercase: true, trim: true },
    model: { type: String, uppercase: true, trim: true },
    item_code: { type: String, uppercase: true, trim: true },
    color: { type: String, uppercase: true, trim: true },
    size: { type: String, uppercase: true, trim: true },
    params: { type: String, uppercase: true, trim: true },
    unit: { type: String, required: true, uppercase: true, trim: true },
  },
  { timestamps: false }
);

export const ItemModel = model<ItemType & Document>("Item", ItemSchema);
