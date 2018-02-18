'use strict';
const lib = require('lib');
const { WebClient } = require('@slack/client');
const intoStream = require('into-stream');
const request = require('request-promise-native');
const streamBuffers = require('stream-buffers');

const token = process.env.SLACK_API_KEY;
//const web = new WebClient(token);

/**
 * Go-between betwixt Slack and Chat-Util.
 * @returns {any}
 */
module.exports = async (context) => {
    return token
};