import mongoose from "mongoose";

const bloodRequestSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true, trim: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    bags: { type: Number, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    place: { type: String, required: true },
    isFulfilled: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const BloodRequest = mongoose.model("BloodRequest", bloodRequestSchema);
export default BloodRequest;