const buildURL = require('./buildURL.js')
const { isPlainObject } = require('../utils/utils.js')

/**
 * 序列化一个符合 Fetch 的 url 、init 对象
 * @param {String} url 
 * @param {Object} config 
 */
function handleConfig(url, config) {
  let {
    method = 'GET',
    headers,
    params,
    data
  } = config

  const correctUrl = params ? buildURL(url, params) : url
  data = data && isPlainObject(data) ? JSON.stringify(data) : data

  let init = Object.create(null)
  init.method = method
  init.headers = headers
  data && (init.body = data)

  return {
    correctUrl,
    init
  }
}

module.exports = handleConfig
