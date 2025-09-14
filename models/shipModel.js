import mongoose from "mongoose";

const shipSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Ship name is required"],
      minlength: [2, "Ship name must be at least 2 characters long"],
    },
    type: {
      type: String,
      required: [true, "Ship type is required"],
      enum: ["cargo", "passenger", "military", "fishing", "other"],
      default: "cargo",
    },
    capacity: {
      type: Number,
      required: [true, "Ship capacity is required"],
      min: [1, "Capacity must be at least 1"],
    },
    port: {
      type: String,
      required: [true, "Port is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "maintenance"],
      default: "active",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Update the updatedAt field before saving
shipSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Update the updatedAt field before updating
shipSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

export default mongoose.model("Ship", shipSchema);
