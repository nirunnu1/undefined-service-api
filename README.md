# undefined-service-api
install
### `Using npm:`
```
 npm install undefined-service-web -save
```
### `In Node.js:`
```
 const service = require("undefined-service-api");
```
### `In Node.js:`
```
 const service = require("undefined-service-api");
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
