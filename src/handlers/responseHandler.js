'use strict';
const constant = require('../utils/constant');

let _sendResponse = (res, result) => {
    res.send(result)
}

let successHandler = (res, result) => {

    const response = {
        status: result.status,
        code: result.code,
        message: result.message,
        data: result.data
    }
    _sendResponse(res, response);
}

let errorHandler = (res, result) => {
    const response = {
        status: false,
        code: result.code,
        message: result.message || '',
        data: result.data || {}
    }
    _sendResponse(res, response);
}


let validationErrorHandler = (res, error) => {

    console.log('valdiation Error --->', error);

    const response = {
        status: false,
        code: constant.HTTP_CODE.badRequest,
        message: error.details ? error.details[0].message : 'There is some issue with validation.',
        data: {}
    }
    _sendResponse(res, response);
}

let requestResponse = (code, status, message, data) => {
    return { status, code, message, data }
}

module.exports = {
    successHandler,
    errorHandler,
    validationErrorHandler,
    requestResponse
    //loginHandler
};