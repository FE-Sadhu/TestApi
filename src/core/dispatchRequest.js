const handleConfig = require('./handleConfig.js')
const fetch = require('node-fetch');

/**
 * Function as name, a request way about Fetch API.
 * @param {String} url
 * @param {Object} config
 */
function dispatchRequest(url, config = {}) {
  const { correctUrl, init } = handleConfig(url, config)
  return fetch(correctUrl, init).then((response) => {
    return response.json()
  }).catch(e => e)
}

module.exports = dispatchRequest