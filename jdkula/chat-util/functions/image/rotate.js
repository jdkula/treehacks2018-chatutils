'use strict';
const lib = require('lib');
const jimp = require('jimp');
const imageUtil = require('../../helper/image_util');


/**
 * Gives basic image status info.
 * @param {string} image A base64-encoded image to process
 * @param {integer} deg The rotation degree
 * @returns {string} A base64-encoded resultant image.
 */
module.exports = async (image, deg, context) => {
    let imageBuffer = Buffer.from(image, 'base64');
    let imageProcessor = await jimp.read(imageBuffer);
    imageProcessor.rotate(deg);
    return await imageUtil.getBase64(imageProcessor);
};