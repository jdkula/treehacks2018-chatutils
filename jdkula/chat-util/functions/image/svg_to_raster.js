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

/**
 * Gets the base64 of an image as a Promise.
 * @param {Jimp.Jimp} jp
 * @param {string} mime The target MIME type.
 * @returns {Promise<string>}
 */
async function getBase64(jp, mime) {
    return await new Promise((resolve, reject) => {
        jp.getBase64(mime, (err, str) => {
            if (err) {
                reject();
            } else {
                resolve(str);
            }
        })
    });
}

/**
 * Determines if a specific x,y is in the circle of width,height=w,h
 * @param {int} x
 * @param {int} y
 * @param {int} w The width of the elipsoid
 * @param {int} h The height of the elipsoid
 * @returns {boolean} true if the given x,y is in the elipsoid, false otherwise.
 */
function isInCircle(x, y, w, h) {
    return (x-w/2)**2/(w/2)**2 + (y-h/2)**2/(h/2)**2 > 1;
}