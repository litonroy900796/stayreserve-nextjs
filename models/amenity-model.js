// models/amenity-model.js
import mongoose, { Schema } from "mongoose";

const amenitySchema = new Schema({
  name: { required: true, type: String },
  price: { required: false, type: Number },
  instructions: { required: false, type: String },
  hours: { required: false, type: String },
});

export const amenityModel =
  mongoose.models.amenities ?? mongoose.model("amenities", amenitySchema);
