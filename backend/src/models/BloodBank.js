import mongoose from "mongoose";

const bloodBankSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Blood bank name is required"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

const BloodBank = mongoose.model("BloodBank", bloodBankSchema);

export default BloodBank;
