'use strict';
const lib = require('lib');
const jimp = require('jimp');
const imageUtil = require('../../helper/image_util');

/**
 * Gives basic image status info.
 * @param {string} image A base64-encoded image to process
 * @param {string} target_type One of "png", "bmp", or "jpg"
 * @param {integer} quality Describing how uncompressed the image is: [0-100]
 * @returns {string} A base64-encoded resultant image.
 */
module.exports = async (image, target_type, quality = 100, context) => {

    let imageBuffer = Buffer.from(image, 'base64');
    let imageProcessor = await jimp.read(imageBuffer);
    imageProcessor.quality(quality);
    if(target_type === "bmp") {
        return await imageUtil.getBase64(imageProcessor, jimp.MIME_BMP);
    } else if(target_type === "jpg") {
        return await imageUtil.getBase64(imageProcessor, jimp.MIME_JPEG)
    } else {
        return await imageUtil.getBase64(imageProcessor);
    }
};