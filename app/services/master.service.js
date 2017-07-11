
/**
 * This service file contains the service layer methods for manipulating the master objects.
 */
var logger = require("../../logger.js");
var Promise = require('bluebird');
var _ = require('underscore');
var fs = require('fs');
var cleaningFile = require('../../cleaning.json')
var conferenceFile = require('../../conference.json')
var facultyServiceFile = require('../../faculty.json')
var statusCodesJson = require('../../status-codes.json')

//Creating the object which will finally be exported
var orderService = {
    getSubTypeByCategoryCodeAndWorkType: getSubTypeByCategoryCodeAndWorkType,
    getStatusDescFromStatusCode: getStatusDescFromStatusCode,
    getStatusFromStatusCode: getStatusFromStatusCode
};


function getSubTypeByCategoryCodeAndWorkType(categoryCode, workType, workSubtype) {
    return new Promise(function (resolve, reject) {
        if (categoryCode == "UDL1027114") {
            //cleaning code
            var cleaningTypes = cleaningFile;
            var availableSubtypes = cleaningTypes[workType]
            var neededSubType = _.findWhere(availableSubtypes, { subTypeDesc: workSubtype });
            logger.info("subtype fetched successfully for cleaning work type");
            resolve(neededSubType.subTypeCode);
        }
        else if (categoryCode == "UDL1027076") {
            var conferenceTypes = conferenceFile;
            var availableSubtypes = conferenceTypes[workType]
            var neededSubType = _.findWhere(availableSubtypes, { subTypeDesc: workSubtype });
            logger.info("subtype fetched successfully for conference work type");
            resolve(neededSubType.subTypeCode);
        }
        else if (categoryCode == "UDL1059121") {
            var facultyServiceTypes = facultyServiceFile;
            var availableSubtypes = facultyServiceTypes[workType]
            var neededSubType = _.findWhere(availableSubtypes, { subTypeDesc: workSubtype });
            logger.info("subtype fetched successfully for faculty service request work type");
            resolve(neededSubType.subTypeCode);
        }
        else {
            logger.info("category code given by you doesnt match with anything in database");
            reject("category code given by you doesnt match with anything in database");
        }
    })
}

function getStatusDescFromStatusCode(workOrderStatusCodes) {
    return new Promise(function (resolve, reject) {
        if (workOrderStatusCodes.length > 0) {
            var statusCodeTypes = statusCodesJson.codes;
            var statusResponseArray = [];
            for (var i = 0; i < workOrderStatusCodes.length; ++i) {
                var neededWorkOrderStatus = _.findWhere(statusCodeTypes, { code: workOrderStatusCodes[i] });
                statusResponseArray.push(neededWorkOrderStatus);
            }
            logger.info("work order status information fetched successfully from status-codes.json {{IN SERVICE}}");
            resolve(statusResponseArray);
        }
        else {
            logger.error("couldnt fetch work order status information from status-code json {{IN SERVICE}}");
            reject("couldnt fetch work order status information from status-code json {{IN SERVICE}}");
        }
    })
}

function getStatusFromStatusCode(statusCode) {
    return new Promise(function (resolve, reject) {
        if (statusCode.length > 0) {
            var statusCodeTypes = statusCodesJson.codes;
            var foundStatusDetails = _.findWhere(statusCodeTypes, { code: statusCode });
            logger.info("Status information fetched successfully from status-codes.json {{IN SERVICE}}");
            resolve(foundStatusDetails);
        }
        else {
            logger.error("couldnt fetch status information from status-code json {{IN SERVICE}}");
            reject("couldnt fetch status information from status-code json {{IN SERVICE}}");
        }
    })
}


//Exporting allthe methods in an object
module.exports = orderService;