'use strict';
const lib = require('lib');
const jimp = require('jimp');
const imageUtil = require('../../helper/image_util');


/**
 * Gives basic image status info.
 * @param {string} image A base64-encoded image to process
 * @param {number} deg The brightness change
 * @returns {string} A base64-encoded resultant image.
 */
module.exports = async (image, deg, context) => {
    let imageBuffer = Buffer.from(image, 'base64');
    let imageProcessor = await jimp.read(imageBuffer);
    imageProcessor.brightness(deg);
    return await imageUtil.getBase64(imageProcessor);
};