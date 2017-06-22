
/**
 * This file contains the controller methods related to manipulation of master documents.
 */

//Importing the master service.
var masterService = require("../services/master.service.js");
var logger = require("../../logger.js");

//Importing the response object
var Response = require("../response.js");
var Promise = require("bluebird");

//Creating the object to be exported.
function init(router) {
    router.route('/subtypes')
        .get(getSubTypeByCategoryCodeAndWorkType)
};


function getSubTypeByCategoryCodeAndWorkType(req, res) {
    var response = new Response();
    var categoryCode = req.query.categoryCode;
    var workType = req.query.workType;
    var workSubtype = req.query.workSubtype;
    workType = workType.split(' ').join('_');
    workType = workType.toLowerCase();
    workSubtype = workSubtype.toLowerCase();
    console.log("workType changed is -----------------", workType);
    masterService.getSubTypeByCategoryCodeAndWorkType(categoryCode, workType, workSubtype).then(function (result) {
        response.data.workSubtypeCode = result;
        response.status.code = "200";
        response.status.message = "fetched the work subtype with category code :" + categoryCode + "successfully.";
        logger.info("fetched the work subtype with category code :" + categoryCode + "successfully.{{In Controller}}");
        res.status(200).json(response);
    }).catch(function (error) {
        logger.error("error while fetching work subtype with category code: " + categoryCode + " {{In Controller}}", error);
        response.status.code = "500";
        response.status.message = "Work Subtype was not fetched successfully";
        res.status(500).json(response);
    });
}

module.exports.init = init;