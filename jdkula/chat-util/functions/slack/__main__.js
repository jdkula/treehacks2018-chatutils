'use strict';
const lib = require('lib');
const { WebClient } = require('@slack/client');
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
            if (params.event.comment.comment.startsWith("/utils")) {
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
                        let commentVal = params.event.comment.comment;

                        if (commentVal.startsWith("/utils crop")){

                            //parsing the arguments
                            var x1 = 100; var y1 = 100; var x2 = 500; var y2 = 500; var shape = "square"
                            var args = commentVal.substring(commentVal.indexOf('p')+1).trim();
                            var ct = 0;
                            while (args !== "")
                            {
                                var currArg = "";
                                if (args.indexOf(' ') == -1) {currArg = args; args = "";}
                                if (args.indexOf(' ') >= 0) currArg = args.substring(0, args.indexOf(' '));
                                args = args.substring(args.indexOf(' ')+1);
                                args = args.trim();

                                if (ct===0) x1 = parseInt(currArg);
                                if (ct===1) y1 = parseInt(currArg);
                                if (ct===2) x2 = parseInt(currArg);
                                if (ct===3) y2 = parseInt(currArg);
                                if (ct==4) shape = currArg.trim();
                                ct++;
                            }


                            let b64cropped = await lib[`${context.service.identifier}.image.crop`](imageString, x1, y1, x2, y2, shape);
                            let processedFile = Buffer.from(b64cropped.substring(b64cropped.indexOf(',')+1), 'base64');
                            //return processedFile.toString('base64');
                            return await web.files.upload(fileInfo.file.name, {
                                    file: processedFile
                                }
                            );
                        }

                        if (commentVal.startsWith("/utils resize")){
                            if (commentVal.startsWith("/utils resize_percent")){
                                //parsing the arguments
                                var per = 50;
                                var args = commentVal.substring(commentVal.indexOf('nt')+2).trim();
                                var ct = 0;
                                while (args !== "")
                                {
                                    var currArg = "";
                                    if (args.indexOf(' ') == -1) {currArg = args; args = "";}
                                    if (args.indexOf(' ') >= 0) currArg = args.substring(0, args.indexOf(' '));
                                    args = args.substring(args.indexOf(' ')+1);
                                    args = args.trim();
                                    if (ct===0) per = parseInt(currArg);
                                    ct++;
                                }


                                let b64cropped = await lib[`${context.service.identifier}.image.resize_percent`](imageString, per);
                                //return b64cropped;
                                let processedFile = Buffer.from(b64cropped.substring(b64cropped.indexOf(',')+1), 'base64');
                                //return processedFile.toString('base64');
                                return await web.files.upload(fileInfo.file.name, {
                                        file: processedFile
                                    }
                                );
                            }else{
                                //parsing the arguments
                                var width = 100; var height = 100;
                                var args = commentVal.substring(commentVal.indexOf('ze')+2).trim();
                                var ct = 0;
                                while (args !== "")
                                {
                                    var currArg = "";
                                    if (args.indexOf(' ') == -1) {currArg = args; args = "";}
                                    if (args.indexOf(' ') >= 0) currArg = args.substring(0, args.indexOf(' '));
                                    args = args.substring(args.indexOf(' ')+1);
                                    args = args.trim();
                                    if (ct===0) width = parseInt(currArg);
                                    if (ct===1) height = parseInt(currArg);
                                    ct++;
                                }


                                let b64cropped = await lib[`${context.service.identifier}.image.resize`](imageString, width, height);
                                //return b64cropped;
                                let processedFile = Buffer.from(b64cropped.substring(b64cropped.indexOf(',')+1), 'base64');
                                //return processedFile.toString('base64');
                                return await web.files.upload(fileInfo.file.name, {
                                        file: processedFile
                                    }
                                );
                            }

                        }


                        if (commentVal.startsWith("/utils grey")){
                            let b64cropped = await lib[`${context.service.identifier}.image.greyscale`](imageString);
                            let processedFile = Buffer.from(b64cropped.substring(b64cropped.indexOf(',')+1), 'base64');
                            //return processedFile.toString('base64');
                            return await web.files.upload(fileInfo.file.name, {
                                    file: processedFile
                                }
                            );
                        }

                        if (commentVal.startsWith("/utils rotate")){

                            //parsing the arguments
                            var deg = 90;
                            var args = commentVal.substring(commentVal.indexOf('e')+1).trim();
                            var ct = 0;
                            while (args !== "")
                            {
                                var currArg = "";
                                if (args.indexOf(' ') == -1) {currArg = args; args = "";}
                                if (args.indexOf(' ') >= 0) currArg = args.substring(0, args.indexOf(' '));
                                args = args.substring(args.indexOf(' ')+1);
                                args = args.trim();

                                if (ct===0) deg = parseInt(currArg);
                                ct++;
                            }


                            let b64cropped = await lib[`${context.service.identifier}.image.rotate`](imageString, deg);
                            let processedFile = Buffer.from(b64cropped.substring(b64cropped.indexOf(',')+1), 'base64');
                            //return processedFile.toString('base64');
                            return await web.files.upload(fileInfo.file.name, {
                                    file: processedFile
                                }
                            );
                        }

                        if (commentVal.startsWith("/utils bright")){

                            //parsing the arguments
                            var deg = 0.5;
                            var args = commentVal.substring(commentVal.indexOf('ht')+2).trim();
                            var ct = 0;
                            while (args !== "")
                            {
                                var currArg = "";
                                if (args.indexOf(' ') == -1) {currArg = args; args = "";}
                                if (args.indexOf(' ') >= 0) currArg = args.substring(0, args.indexOf(' '));
                                args = args.substring(args.indexOf(' ')+1);
                                args = args.trim();

                                if (ct===0) deg = parseFloat(currArg);
                                ct++;
                            }


                            let b64cropped = await lib[`${context.service.identifier}.image.bright`](imageString, deg);
                            let processedFile = Buffer.from(b64cropped.substring(b64cropped.indexOf(',')+1), 'base64');
                            //return processedFile.toString('base64');
                            return await web.files.upload(fileInfo.file.name, {
                                    file: processedFile
                                }
                            );
                        }

                    }
                }
            }
        }
    }
};
