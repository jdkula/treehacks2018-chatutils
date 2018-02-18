'use strict';
const lib = require('lib');
const jimp = require('jimp');
const imageUtil = require('../../helper/image_util');


/**
 * Gives basic image status info.
 * @param {string} image A base64-encoded image to process
 * @param {integer} width The new desired width
 * @param {integer} height The new desired height
 * @returns {string} A base64-encoded resultant image.
 */
module.exports = async (image, width, height, context) => {

    let imageBuffer = Buffer.from(image, 'base64');
    let imageProcessor = await jimp.read(imageBuffer);
    imageProcessor.resize(width, height);
    return await imageUtil.getBase64(imageProcessor);
};