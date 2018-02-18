'use strict';
const lib = require('lib');
const { WebClient } = require('@slack/client');
const intoStream = require('into-stream');
const request = require('request-promise-native');
const base64 = require('base64-stream');
const streamToString = require('stream-to-string');


const token = process.env.SLACK_API_KEY;
const web = new WebClient(token);

/**
 * Go-between betwixt Slack and Chat-Util.
 * @bg params
 * @returns {any}
 */
module.exports = async (context) => {
    let params = context.params;
    if (params.event) {
        if (params.event.type === "file_comment_added") {
            if (params.event.comment.text.startsWith("/utils")) {
                let fileId = params.event.file_id;
                let fileInfo = await web.files.info(fileId);
                if (fileInfo !== undefined && fileInfo !== null && fileInfo.ok) {
                    if (fileInfo.file.mimetype === "image/png"
                        || fileInfo.file.mimetype === "image/jpg"
                        || fileInfo.file.mimetype === "image/jpeg"
                        || fileInfo.file.mimetype === "image/bmp") {
                        const options = {
                            uri: fileInfo.file.url_private_download,
                            auth: {
                                bearer: process.env.SLACK_API_KEY
                            }
                        };
                        let imageString = await streamToString(request(options).pipe(base64.encode()));
                        let processedFile = Buffer.from(
                            await lib[`${context.service.identifier}.image.crop`](imageString, 100, 100, 500, 500),
                            'base64'
                        );
                        await web.files.upload(fileInfo.file.name, {
                                file: processedFile
                            }
                        );
                    }
                }
            }
        }
    }
};
