'use strict';
const lib = require('lib');
const jimp = require('jimp');
const imageUtil = require('../../helper/image_util');

/**
 * Gives basic image status info.
 * @param {string} image A base64-encoded image to process
 * @param {integer} percent The percent to resize to
 * @returns {string} A base64-encoded resultant image.
 */
module.exports = async (image, percent, context) => {

    let imageBuffer = Buffer.from(image, 'base64');
    let imageProcessor = await jimp.read(imageBuffer);
    imageProcessor.resize(imageProcessor.bitmap.width * percent, imageProcessor.bitmap.height * percent);
    return await imageUtil.getBase64(imageProcessor);

};