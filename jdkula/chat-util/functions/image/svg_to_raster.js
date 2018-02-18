'use strict';
const lib = require('lib');
const svg2png = require('svg2png');

/**
 * Gives basic image status info.
 * @param {string} svg A base64-encoded image to process
 * @param {string} target_type One of "png", "bmp", or "jpg"
 * @param {integer} quality Describing how uncompressed the image is: [0-100]
 * @returns {string} A base64-encoded resultant image.
 */
module.exports = async (svg, target_type, quality = 100, context) => {

    let svgBuffer = Buffer.from(svg, 'base64');
    let pngBuffer = await svg2png(svgBuffer);
    let pngBase64 = pngBuffer.toString('base64');
    return await lib[`${context.service.identifier}.image.convert`](pngBase64, target_type, quality)
};