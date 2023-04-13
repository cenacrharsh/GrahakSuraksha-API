const govfraudulentMobileNumbersModel = require("../../database/models/gov_fraudulent_mobile_numbers");
const localfraudulentPhoneNumbersModel = require("../../database/models/local_fraudulent_mobile_numbers");
const govfraudulentUpiIdsModel = require("../../database/models/gov_fraudulent_upi_ids");
const localfraudulentUpiIdsModel = require("../../database/models/local_fraudulent_upi_ids");

async function fraudDetectionHandler(req, res) {
    try {
        console.log("req body", req.body);
        const { mobile_number, upi_id } = req.body;

        if (mobile_number != "") {
            console.log("Entered Mobile Number Section");
            let fraudulentPhoneNumber;
            fraudulentPhoneNumber =
                await govfraudulentMobileNumbersModel.findOne({
                    mobile_number: mobile_number,
                });
            console.log("gov db: ", !!fraudulentPhoneNumber);
            if (fraudulentPhoneNumber !== null) {
                console.log("if section");
                return res.status(200).json({
                    is_gov_verified: true,
                    is_fraud: true,
                    number_of_userReported: 0,
                });
            } else {
                console.log("else section");
                let all = await localfraudulentPhoneNumbersModel.find({});
                console.log("all in local db: ", all);
                fraudulentPhoneNumber =
                    await localfraudulentPhoneNumbersModel.findOne({
                        mobile_number: mobile_number,
                    });
                console.log("local DB: ", fraudulentPhoneNumber);
                if (fraudulentPhoneNumber !== null) {
                    console.log("if section");
                    return res.status(200).json({
                        is_gov_verified: false,
                        isFraud: true,
                        number_of_userReported:
                            fraudulentPhoneNumber.number_of_userReported,
                    });
                } else {
                    console.log("else section");
                    return res.status(200).json({
                        is_gov_verified: false,
                        isFraud: false,
                        number_of_userReported: 0,
                    });
                }
            }
        } else if (upi_id != "") {
            console.log("Entered UPI Section");
            let fraudulentUpiId;
            fraudulentUpiId = await govfraudulentUpiIdsModel.findOne({
                upi_id: upi_id,
            });

            if (fraudulentUpiId !== null) {
                return res.status(200).json({
                    is_gov_verified: true,
                    is_fraud: true,
                    number_of_userReported: 0,
                });
            } else {
                fraudulentUpiId = await localfraudulentUpiIdsModel.findOne({
                    upi_id: upi_id,
                });

                if (fraudulentUpiId !== null) {
                    return res.status(200).json({
                        isVerified: false,
                        is_fraud: true,
                        number_of_userReported:
                            fraudulentUpiId.number_of_userReported,
                    });
                } else {
                    return res.status(200).json({
                        isVerified: false,
                        isFraud: false,
                        number_of_reports: 0,
                    });
                }
            }
        }
    } catch (err) {
        console.log("Error occurred while finding fraud numbers ", err);
        return res.status(500).json({
            message: "err occurred",
            err: err,
        });
    }
}

module.exports = {
    fraudDetectionHandler,
};
