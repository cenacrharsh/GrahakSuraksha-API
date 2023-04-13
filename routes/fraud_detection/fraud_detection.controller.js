const govFradulentPhoneNumbersModel = require("../../database/models/gov_fraudulent_phone_numbers");

async function fraudDetectionHandler(req, res) {
    try {
        console.log("req body", req.body);
        const phone_number = req.body.phone_number;

        const fraudulentPhoneNumber =
            await govFradulentPhoneNumbersModel.findOne({
                phone_number: phone_number,
            });

        console.log("fraudulentPhoneNumber: ", fraudulentPhoneNumber);

        if (fraudulentPhoneNumber) {
            console.log("IFFFF");
            return res.status(200).json({
                message: "Government Fraud Listed",
                fraudulentPhoneNumber: fraudulentPhoneNumber,
            });
        } else {
            console.log("ELsee");
            return res.status(200).json({
                message: "Not Government Fraud Listed",
            });
        }
    } catch (err) {
        console.log("err occurred while finding fraud numbers ", err);
        return res.status(400).json({
            message: "err occurred",
            err: err,
        });
    }
}

module.exports = {
    fraudDetectionHandler,
};
