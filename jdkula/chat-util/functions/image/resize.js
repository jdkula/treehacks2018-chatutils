'use strict';
const lib = require('lib');
const jimp = require('jimp');

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
    return await getBase64(imageProcessor);

};

/**
 * Gets the base64 of an image as a Promise.
 * @param {Jimp.Jimp} jp
 * @returns {Promise<string>}
 */
async function getBase64(jp) {
    return await new Promise((resolve, reject) => {
        jp.getBase64(jp.getMIME(), (err, str) => {
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