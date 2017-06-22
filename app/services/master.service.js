
/**
 * This service file contains the service layer methods for manipulating the master objects.
 */
var logger = require("../../logger.js");
var Promise = require('bluebird');
var _ = require('underscore');
var fs = require('fs');
var cleaningFile = require('../../cleaning.json')
var conferenceFile = require('../../conference.json')

//Creating the object which will finally be exported
var orderService = {
    getSubTypeByCategoryCodeAndWorkType: getSubTypeByCategoryCodeAndWorkType
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
        else if (categoryCode = "UDL1027076") {
            var conferenceTypes = conferenceFile;
            var availableSubtypes = conferenceTypes[workType]
            var neededSubType = _.findWhere(availableSubtypes, { subTypeDesc: workSubtype });
            logger.info("subtype fetched successfully for conference work type");
            resolve(neededSubType.subTypeCode);
        }
        else {
            logger.info("category code given by you doesnt match with anything in database");
            reject("category code given by you doesnt match with anything in database");
        }
    })
}

//Exporting allthe methods in an object
module.exports = orderService;