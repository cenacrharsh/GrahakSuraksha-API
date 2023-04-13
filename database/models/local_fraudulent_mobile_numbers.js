const mongoose = require("mongoose");

const localFraudulentMobileNumbersSchema = new mongoose.Schema(
    {
        mobile_number: {
            type: String,
            required: true,
        },
        // verified: {
        //     type: Boolean,
        //     required: true,
        // },
        number_of_userReported: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const localFraudulentMobileNumbersModel = mongoose.model(
    "local_fraudulent_mobile_numbers",
    localFraudulentMobileNumbersSchema
);

module.exports = localFraudulentMobileNumbersModel;
