const hmacSHA256 = require('crypto-js/hmac-sha256')
const SHA256 = require("crypto-js/sha256");
const Base64 = require('crypto-js/enc-base64')
const fs = require('fs')

const APP_SECRET = 'V0LmoW0cd2cg38i1eIM0P5Z29GjES4PA'

const toString = Object.prototype.toString

/**
 * return hmac-sha256 digest, be added on Authorization which in before-login's apis.
 * @param {*} message 
 */
function getSign(message) {
  return Base64.stringify(hmacSHA256(JSON.stringify(message), APP_SECRET))
}

/**
 * 拿到环境中的值
 * @param {String} key 
 */
function getEnv(key) {
  return JSON.parse(fs.readFileSync('env.json', 'utf-8'))[key]
}

/**
 * 
 * @param {String} id 
 * @param {String} key 
 */
function getDigest(id, key) {
  const str = id + key
  console.log(typeof str)
  return SHA256(`${str}`).toString().toLowerCase()
}

/**
 * 判断是否为普通对象。（假如对于 formData 的话，toString 后会是 [object FormData]）
 * @param {*} val 
 */
function isPlainObject(val) {
  return toString.call(val) === '[object Object]'
}

/**
 * 判断是否为 Date 类型
 * @param {*} val 
 */
function isDate(val) {
  return toString.call(val) === '[object Date]'
}

module.exports = {
  getSign,
  isPlainObject,
  isDate,
  getEnv,
  getDigest
}