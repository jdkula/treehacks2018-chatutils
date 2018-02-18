const jimp = require('jimp');

/**
 * Gets the base64 of an image as a Promise.
 * @param {Jimp.Jimp} jp
 * @param {string} mime The output type.
 * @returns {Promise<string>}
 */
module.exports.getBase64 = async (jp, mime = jimp.MIME_PNG) => {
    return await new Promise((resolve, reject) => {
        jp.getBase64(mime, (err, str) => {
            if (err) {
                reject();
            } else {
                resolve(str);
            }
        })
    });
};

/**
 * Determines if a specific x,y is in the circle of width,height=w,h
 * @param {int} x
 * @param {int} y
 * @param {int} w The width of the elipsoid
 * @param {int} h The height of the elipsoid
 * @returns {boolean} true if the given x,y is in the elipsoid, false otherwise.
 */
module.exports.isInCircle = (x, y, w, h) => {
    return (x-w/2)**2/(w/2)**2 + (y-h/2)**2/(h/2)**2 > 1;
};