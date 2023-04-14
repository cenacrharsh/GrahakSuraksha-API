const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

module.exports.fraudTypeEnums = {
    phone_call: 1,
    message: 2,
    payment: 3,
};

const userReportsSchema = new mongoose.Schema(
    {
        user_id: {
            type: ObjectId,
            ref: "users",
            required: true,
        },
        fraud_type: {
            type: Number,
            required: true,
        },
        reported_entity: {
            type: String,
            required: true,
        },
        supporting_document: {
            data: Buffer,
            contentType: String,
        },
        description: {
            type: String,
            required: true,
        },
        isVerified: {
            type: Boolean,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const userReportsModel = mongoose.model("user_reports", userReportsSchema);

module.exports.model = userReportsModel;

/*
const imageBuffer = Buffer.from(base64EncodedString, "base64");

const report = new userReportsModel({
  user_id: "someUserId",
  fraud_type: 1,
  reported_entity: "someEntity",
  image: imageBuffer
});

await report.save();

const report = await userReportsModel.findById(reportId);

const base64EncodedString = report.image.toString("base64");

* contentType: 'image/png'

*/
