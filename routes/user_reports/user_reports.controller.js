const userReportsModelInstance = require("../../database/models/user_reports.model");
userReportsModel = userReportsModelInstance.model;
fraudTypeEnums = userReportsModelInstance.fraudTypeEnums;

async function userReportsHandler(req, res) {
    try {
        console.log("<---- Req Body ----->");
        console.log(req.body);

        const {
            user,
            fraud_type,
            reported_entity,
            supporting_document,
            description,
        } = req.body;

        if (!user) {
            return res.status(400).json({
                message: "Please send user",
            });
        }

        if (!fraud_type) {
            return res.status(400).json({
                message: "Please enter fraud_type",
            });
        }

        if (!reported_entity) {
            return res.status(400).json({
                message: "Please enter reported_entity",
            });
        }

        // if (!supporting_document) {
        //     return res.status(400).json({
        //         message: "Please enter supporting_document",
        //     });
        // }

        if (!description) {
            return res.status(400).json({
                message: "Please enter description",
            });
        }

        let fraud;
        if (fraud_type === "Mobile") {
            fraud = fraudTypeEnums.phone_call;
        } else if (fraud_type === "Message Header") {
            fraud = fraudTypeEnums.message;
        } else if (fraud_type === "UPI ID") {
            fraud = fraudTypeEnums.payment;
        }

        let imageBuffer;
        if (supporting_document) {
            imageBuffer = Buffer.from(supporting_document, "base64");
        }

        const report = await userReportsModel.create({
            user_id: user._id,
            fraud_type: fraud,
            reported_entity: reported_entity,
            supporting_document: {
                data: imageBuffer,
                contentType: "image/jpeg",
            },
            description: description,
            isVerified: false,
        });

        if (!report) {
            console.log(err);
            return res.status(500).json({
                message: "Error Occured While Creating Report in DB !!!",
            });
        }

        console.log("new report: ", report);
        return res.status(200).json({
            description: description,
        });
    } catch (err) {
        console.log("Error: ", err);
        return res.status(500).json({
            message: "Error Occured While Creating Report !!!",
        });
    }
}

async function getAllReportsHandler(req, res) {
    const allReports = await userReportsModel.find();
    console.log("allreports: ", allReports);
    if (!allReports) {
        return res.status(400).json({
            message: "Error occurred while fetching all reports",
        });
    }
    return res.status(200).json({
        reports: allReports,
    });
}

module.exports = {
    userReportsHandler,
    getAllReportsHandler,
};
