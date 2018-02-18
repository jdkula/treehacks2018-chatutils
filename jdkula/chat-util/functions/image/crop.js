'use strict';
const lib = require('lib');
const jimp = require('jimp');

/**
 * Gives basic image status info.
 * @param {string} image A base64-encoded image to process
 * @param {integer} x1 The x-coord of the top-left corner of the crop
 * @param {integer} y1 The y-coord of the top-left corner of the crop
 * @param {integer} x2 The x-coord of the bottom-right corner of the crop
 * @param {integer} y2 The y-coord of the bottom-right corner of hte crop
 * @param {string} shape One of: "square", "oval"
 * @returns {string} A base64-encoded resultant image.
 */
module.exports = async (image, x1, y1, x2, y2, shape = "square", context) => {

    let imageBuffer = Buffer.from(image, 'base64');
    let imageProcessor = await jimp.read(imageBuffer);
    imageProcessor.crop(x1, y1, x2 - x1, y2 - y1);
    if(shape === "oval") {
        const width = imageProcessor.bitmap.width;
        const height = imageProcessor.bitmap.height;
        imageProcessor.scan(0, 0, width, height, (x, y, index) => {
            if(isInCircle(x, y, width, height)) {
                if(imageProcessor.bitmap !== undefined) {
                    imageProcessor.bitmap.data[index] = 0; // Red
                    imageProcessor.bitmap.data[index + 1] = 0; // Green
                    imageProcessor.bitmap.data[index + 2] = 0; // Blue
                    imageProcessor.bitmap.data[index + 3] = 255; // Alpha
                }
            }
        });
    }
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