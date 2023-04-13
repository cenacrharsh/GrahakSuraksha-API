const mongoose = require("mongoose");

const govfraudulentUpiIdSchema = new mongoose.Schema(
    {
        upi_id: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const govfraudulentUpiIdsModel = mongoose.model(
    "gov_fraudulent_upi_ids",
    govfraudulentUpiIdSchema
);

module.exports = govfraudulentUpiIdsModel;
