'use strict';
const lib = require('lib');

/**
 * Go-between betwixt Slack and Chat-Util.
 * @param {string} token - token for url verification
 * @param {string} challenge -  for url verification challenge
 * @param {object} comment - comment on a file upload
 * @param {string} file_id - id of file
 * @param {object} file - file information
 * @param {string} type of request to Chat-Util
 * @returns {object}
 */
module.exports = (token = "", challenge = "", comment = {}, file_id = "", file = {}, type, context, callback) => {
    if (type === "url_verification")
    {
        callback(null, challenge, {"Content-type":"text/plain"});
    }
    else if (type === "file_comment_added")
    {
        let retValue = {"token":"xoxp-316350671809-317021348389-316881754164-ac9f5dea60a339cb66e70d9208b22911", "file":file_id};
        callback(null, JSON.stringify(retValue), {"Content-type":"application/json"});
    }
};
