
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
    router.route('/category/:categoryCode/typedesc/:typeDesc/subtypedesc/:subTypeDesc').get(getSubTypeCodeByCategoryCodeTypeAndSubType);
    router.route('/status').post(postStatusDescByStatusCode);
    router.route('/status/:statusCode').get(getStatusByStatusCode);
    router.route('/category/:categoryCode/types').get(getTypesByCategoryCode);
    router.route('/category/:categoryCode/type/:typeCode/subtypes').get(getSubTypesByCategoryCodeAndType);
    router.route('/tenants/:tenantCode').get(getTenantsByTenantCode);
    router.route('/priorities/:priorityCode').get(getPrioritiesByPriorityCode);
};

function getSubTypeCodeByCategoryCodeTypeAndSubType(req, res) {
    var response = new Response();
    var categoryCode = req.params.categoryCode;
    var typeDesc = req.params.typeDesc;
    var subTypeDesc = req.params.subTypeDesc;
    typeDesc = typeDesc.split(' ').join('_');
    typeDesc = typeDesc.toLowerCase();
    subTypeDesc = subTypeDesc.toLowerCase();
    masterService.getSubTypeCodeByCategoryCodeTypeAndSubType(categoryCode, typeDesc, subTypeDesc).then(function (result) {
        response.data = result;
        response.status.code = "200";
        response.status.message = "fetched the work subtype with category code :" + categoryCode + "successfully.";
        logger.info("fetched the work subtype with category code :" + categoryCode + " successfully.{{In Controller}}");
        res.status(200).json(response);
    }).catch(function (error) {
        logger.error("error while fetching work subtype with category code: " + categoryCode + " {{In Controller}}", error);
        response.status.code = "500";
        response.status.message = error;
        res.status(500).json(response);
    });
};

function postStatusDescByStatusCode(req, res) {
    var response = new Response();
    var workOrderStatusCodes = req.body;
    masterService.postStatusDescByStatusCode(workOrderStatusCodes).then(function (statusResponseArray) {
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

function getStatusByStatusCode(req, res) {
    var response = new Response();
    var statusCode = req.params.statusCode;
    masterService.getStatusByStatusCode(statusCode).then(function (statusResponseArray) {
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

function getTypesByCategoryCode(req, res) {
    var response = new Response();
    var categoryCode = req.params.categoryCode;
    masterService.getTypesByCategoryCode(categoryCode).then(function (statusResponseArray) {
        response.data = statusResponseArray;
        response.status.code = "200";
        response.status.message = "fetched the Types";
        logger.info("fetched the Types successfully.{{In Controller}}");
        res.status(200).json(response);
    }).catch(function (error) {
        logger.error("error while fetching the Types {{In Controller}}", error);
        response.status.code = "500";
        response.status.message = "Status data was not fetched successfully";
        res.status(500).json(response);
    });
};

function getSubTypesByCategoryCodeAndType(req, res) {
    var response = new Response();
    var categoryCode = req.params.categoryCode;
    var typeCode = req.params.typeCode;
    masterService.getSubTypesByCategoryCodeAndType(categoryCode, typeCode).then(function (statusResponseArray) {
        response.data = statusResponseArray;
        response.status.code = "200";
        response.status.message = "fetched the SubTypes";
        logger.info("fetched the Types successfully.{{In Controller}}");
        res.status(200).json(response);
    }).catch(function (error) {
        logger.error("error while fetching the SubTypes {{In Controller}}", error);
        response.status.code = "500";
        response.status.message = "Status data was not fetched successfully";
        res.status(500).json(response);
    });
};

function getTenantsByTenantCode(req, res) {
    var response = new Response();
    var tenantCode = req.params.tenantCode;
    masterService.getTenantsByTenantCode(tenantCode).then(function (statusResponseArray) {
        response.data = statusResponseArray;
        response.status.code = "200";
        response.status.message = "fetched the Tenants";
        logger.info("fetched the Tenants successfully.{{In Controller}}");
        res.status(200).json(response);
    }).catch(function (error) {
        logger.error("error while fetching the Tenants {{In Controller}}", error);
        response.status.code = "500";
        response.status.message = "Status data was not fetched successfully";
        res.status(500).json(response);
    });
};

function getPrioritiesByPriorityCode(req, res) {
    var response = new Response();
    var priorityCode = req.params.priorityCode;
    masterService.getPrioritiesByPriorityCode(priorityCode).then(function (statusResponseArray) {
        response.data = statusResponseArray;
        response.status.code = "200";
        response.status.message = "fetched the Priorities";
        logger.info("fetched the Priorities successfully.{{In Controller}}");
        res.status(200).json(response);
    }).catch(function (error) {
        logger.error("error while fetching the Priorities {{In Controller}}", error);
        response.status.code = "500";
        response.status.message = "Status data was not fetched successfully";
        res.status(500).json(response);
    });
};


module.exports.init = init;