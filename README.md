# [undefined-service-api](https://reactjs.org/) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/main/LICENSE) [![npm version](https://img.shields.io/npm/v/react.svg?style=flat)](https://www.npmjs.com/package/react) 

undefined-service-api is a JavaScript library for building user interfaces.

#install
### `Using npm:`
```
 npm install undefined-service-api -save
```
### `In Node.js:`
```
 const service = require("undefined-service-api");
```
### `In Node.js:`
```
 const service = require("undefined-service-api");
```
### `In .env:`
```
 ENC_KEY='string'
 IV = 'string'
```
### `Usage:`
```
  //retrun boolean
  service.isNullOrEmpty(obj)
  //retrun string
  service.EncodeKey(string)
  //retrun string
  service.DecodeKey(string)
  //retrun {status : true,...obj}
  service.resultSucceed(obj)
  //retrun {status : false,...obj}
  service.resultFailed(obj)
  
```
# Support
Tested in Chrome 74-75, Firefox 66-67, IE 11, Edge 18, Safari 11-12, & Node.js 8-12.
Automated browser & CI test runs are available.
