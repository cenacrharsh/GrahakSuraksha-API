const mongoose = require("mongoose");

const fraudUpiIdSchema = new mongoose.Schema(
    {
        upi_id: {
            type: String,
            required: true,
        },
        // verified: {
        //     type: Boolean,
        //     required: true,
        // },
        number_of_userReported: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const fraudUpiIdsModel = mongoose.model(
    "local_fraudulent_upi_ids",
    fraudUpiIdSchema
);

module.exports = fraudUpiIdsModel;
