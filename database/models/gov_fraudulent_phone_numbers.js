const mongoose = require("mongoose");

const govFradulentPhoneNumberSchema = new mongoose.Schema(
  {
    phone_number: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const govFradulentPhoneNumbersModel = mongoose.model(
  "gov_fradulent_phone_numbers",
  govFradulentPhoneNumberSchema
);

module.exports = govFradulentPhoneNumbersModel;
