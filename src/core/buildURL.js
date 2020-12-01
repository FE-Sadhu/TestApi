const { isDate, isPlainObject } = require('../utils/utils.js')

/**
 * @param {String} val 
 */
function encode(val) {
  return encodeURIComponent(val) // 保留一些特殊字符
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

/**
 * 序列化参数后拼接符合规范的 URI
 * @param {String} url
 * @param {Object} params 
 */
function buildURL(url, params) {
  let serializedParams = ''
  const parts = []

  Object.keys(params).forEach((key) => {
    let val = params[key]

    if (val === null || typeof val === undefined) {
      return // just break this iterate
    }

    let tmp = [] // temporary array, for managing kinds of params with same way.
    if (Array.isArray(val)) {
      tmp = val
      key += '[]'
    } else {
      tmp = [val]
    }

    tmp.forEach((val) => {
      if (isDate(val)) {
        val = val.toISOString() // standard
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  serializedParams = parts.join('&')

  if (serializedParams) {
    const hashIdx = url.indexOf('#') // ignore hash
    if (hashIdx !== -1) {
      url = url.slice(0, hashIdx)
    }
    url += (url.indexOf('?') !== -1 ? '&' : '?') + serializedParams
  }

  return url
}

module.exports = buildURL
