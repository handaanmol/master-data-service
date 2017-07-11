
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
        .get(getSubTypeByCategoryCodeAndWorkType);
    router.route('/status')
         .post(getStatusDescFromStatusCode);
    //router.route('/status/:statusCode').get(getStatusFromStatusCode);
    router.route('/status').get(getStatusFromStatusCode);
};


function getSubTypeByCategoryCodeAndWorkType(req, res) {
    var response = new Response();
    var categoryCode = req.query.categoryCode;
    var workType = req.query.workType;
    var workSubtype = req.query.workSubtype;
    workType = workType.split(' ').join('_');
    workType = workType.toLowerCase();
    workSubtype = workSubtype.toLowerCase();
    masterService.getSubTypeByCategoryCodeAndWorkType(categoryCode, workType, workSubtype).then(function (result) {
        response.data.workSubtypeCode = result;
        response.status.code = "200";
        response.status.message = "fetched the work subtype with category code :" + categoryCode + "successfully.";
        logger.info("fetched the work subtype with category code :" + categoryCode + " successfully.{{In Controller}}");
        res.status(200).json(response);
    }).catch(function (error) {
        logger.error("error while fetching work subtype with category code: " + categoryCode + " {{In Controller}}", error);
        response.status.code = "500";
        response.status.message = "Work Subtype was not fetched successfully";
        res.status(500).json(response);
    });
};

function getStatusDescFromStatusCode(req, res) {
    var response = new Response();
    var workOrderStatusCodes = req.body;
    masterService.getStatusDescFromStatusCode(workOrderStatusCodes).then(function (statusResponseArray) {
        response.data = statusResponseArray;
        response.status.code = "200";
        response.status.message = "fetched the work order status data for status codes :"+workOrderStatusCodes;
        logger.info("fetched the work order status data for status codes :"+workOrderStatusCodes + " successfully.{{In Controller}}");
        res.status(200).json(response);
    }).catch(function (error) {
        logger.error("error while fetching the work order status data for status codes :"+workOrderStatusCodes+ " {{In Controller}}", error);
        response.status.code = "500";
        response.status.message = "Work Subtype status data was not fetched successfully";
        res.status(500).json(response);
    });
};

function getStatusFromStatusCode(req, res) {
    var response = new Response();
    var statusCode = req.query.statusCode;
    //var statusCode = req.params.statusCode;
    masterService.getStatusFromStatusCode(statusCode).then(function (statusResponseArray) {
        response.data = statusResponseArray;
        response.status.code = "200";
        response.status.message = "fetched the status data for status codes :"+statusCode;
        logger.info("fetched the status data for status codes :"+statusCode + " successfully.{{In Controller}}");
        res.status(200).json(response);
    }).catch(function (error) {
        logger.error("error while fetching the status data for status codes :"+statusCode+ " {{In Controller}}", error);
        response.status.code = "500";
        response.status.message = "Status data was not fetched successfully";
        res.status(500).json(response);
    });
};


module.exports.init = init;