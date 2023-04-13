const mongoose = require("mongoose");

const govfraudulentMobileNumbersSchema = new mongoose.Schema(
    {
        mobile_number: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const govfraudulentMobileNumbersModel = mongoose.model(
    "gov_fraudulent_mobile_numbers",
    govfraudulentMobileNumbersSchema
);

module.exports = govfraudulentMobileNumbersModel;

/*
module.exports = govfraudulentMobileNumbersModel; exports a single value, govfraudulentMobileNumbersModel, as the default export of a module. This means that when another module imports this module, they will receive the value of govfraudulentMobileNumbersModel as the result of the import.

module.exports = { govfraudulentMobileNumbersModel }; exports an object containing a property named govfraudulentMobileNumbersModel. This means that when another module imports this module, they will receive an object containing a property named govfraudulentMobileNumbersModel, and the value of govfraudulentMobileNumbersModel will be the value of the property.

So the main difference between the two is the way the value is exported. The first one exports a single value as the default export, while the second one exports an object containing the value as a property.

When a module exports a single value as the default export using module.exports = govfraudulentMobileNumbersModel;, it can be imported in another module using, const govfraudulentMobileNumbersModel = require('./module-path');
. The imported value will be the default export of the module.

On the other hand, when a module exports an object containing a property named govfraudulentMobileNumbersModel using module.exports = { govfraudulentMobileNumbersModel };, it can be imported in another module using const { govfraudulentMobileNumbersModel } = require('./module-path'). In this case, the value of govfraudulentMobileNumbersModel will be extracted from the object that is returned by the require() function call.
*/
