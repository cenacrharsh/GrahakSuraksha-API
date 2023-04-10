const mongoose = require("mongoose");

const fraudNumberSchema = new mongoose.Schema(
  {
    phone_number: {
      type: Number,
      required: true,
    },
    verified: {
      type: Boolean,
      required: true,
    },
    number_of_reports: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const fraudNumberModel = mongoose.model("fraud", fraudNumberSchema);

module.exports.model = fraudNumberModel;
