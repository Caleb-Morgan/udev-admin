var LoginSuccess, catchError, get_guid, initUKey, showClientError, appid, redirect, callback, getUrlParam, login_type ;
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
__webpack_require__(2);
__webpack_require__(3);
module.exports = __webpack_require__(4);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

(function(self) {
  'use strict';

  // if __disableNativeFetch is set to true, the it will always polyfill fetch
  // with Ajax.
  if (!self.__disableNativeFetch && self.fetch) {
    return
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)

    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var list = this.map[name]
    if (!list) {
      list = []
      this.map[name] = list
    }
    list.push(value)
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    var values = this.map[normalizeName(name)]
    return values ? values[0] : null
  }

  Headers.prototype.getAll = function(name) {
    return this.map[normalizeName(name)] || []
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = [normalizeValue(value)]
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    Object.getOwnPropertyNames(this.map).forEach(function(name) {
      this.map[name].forEach(function(value) {
        callback.call(thisArg, value, name, this)
      }, this)
    }, this)
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    reader.readAsArrayBuffer(blob)
    return fileReaderReady(reader)
  }

  function readBlobAsText(blob, options) {
    var reader = new FileReader()
    var contentType = options.headers.map['content-type'] ? options.headers.map['content-type'].toString() : ''
    var regex = /charset\=[0-9a-zA-Z\-\_]*;?/
    var _charset = blob.type.match(regex) || contentType.match(regex)
    var args = [blob]

    if(_charset) {
      args.push(_charset[0].replace(/^charset\=/, '').replace(/;$/, ''))
    }

    reader.readAsText.apply(reader, args)
    return fileReaderReady(reader)
  }

  var support = {
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob();
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  function Body() {
    this.bodyUsed = false


    this._initBody = function(body, options) {
      this._bodyInit = body
      if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
        this._options = options
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (!body) {
        this._bodyText = ''
      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
        // Only support ArrayBuffers for POST method.
        // Receiving ArrayBuffers happens via Blobs, instead.
      } else {
        throw new Error('unsupported BodyInit type')
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        return this.blob().then(readBlobAsArrayBuffer)
      }

      this.text = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return readBlobAsText(this._bodyBlob, this._options)
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as text')
        } else {
          return Promise.resolve(this._bodyText)
        }
      }
    } else {
      this.text = function() {
        var rejected = consumed(this)
        return rejected ? rejected : Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body
    if (Request.prototype.isPrototypeOf(input)) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = input
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body, options)
  }

  Request.prototype.clone = function() {
    return new Request(this)
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function headers(xhr) {
    var head = new Headers()
    var pairs = xhr.getAllResponseHeaders().trim().split('\n')
    pairs.forEach(function(header) {
      var split = header.trim().split(':')
      var key = split.shift().trim()
      var value = split.join(':').trim()
      head.append(key, value)
    })
    return head
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this._initBody(bodyInit, options)
    this.type = 'default'
    this.status = options.status
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = options.statusText
    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
    this.url = options.url || ''
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers;
  self.Request = Request;
  self.Response = Response;

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request
      if (Request.prototype.isPrototypeOf(input) && !init) {
        request = input
      } else {
        request = new Request(input, init)
      }

      var xhr = new XMLHttpRequest()

      function responseURL() {
        if ('responseURL' in xhr) {
          return xhr.responseURL
        }

        // Avoid security warnings on getResponseHeader when not allowed by CORS
        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
          return xhr.getResponseHeader('X-Request-URL')
        }

        return;
      }

      var __onLoadHandled = false;

      function onload() {
        if (xhr.readyState !== 4) {
          return
        }
        var status = (xhr.status === 1223) ? 204 : xhr.status
        if (status < 100 || status > 599) {
          if (__onLoadHandled) { return; } else { __onLoadHandled = true; }
          reject(new TypeError('Network request failed'))
          return
        }
        var options = {
          status: status,
          statusText: xhr.statusText,
          headers: headers(xhr),
          url: responseURL()
        }
        var body = 'response' in xhr ? xhr.response : xhr.responseText;

        if (__onLoadHandled) { return; } else { __onLoadHandled = true; }
        resolve(new Response(body, options))
      }
      xhr.onreadystatechange = onload;
      xhr.onload = onload;
      xhr.onerror = function() {
        if (__onLoadHandled) { return; } else { __onLoadHandled = true; }
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      // `withCredentials` should be setted after calling `.open` in IE10
      // http://stackoverflow.com/a/19667959/1219343
      try {
        if (request.credentials === 'include') {
          if ('withCredentials' in xhr) {
            xhr.withCredentials = true;
          } else {
            console && console.warn && console.warn('withCredentials is not supported, you can ignore this warning');
          }
        }
      } catch (e) {
        console && console.warn && console.warn('set withCredentials error:' + e);
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true

  // Support CommonJS
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = self.fetch;
  }
})(typeof self !== 'undefined' ? self : this);


/***/ }),
/* 2 */
/***/ (function(module, exports) {

if (navigator && navigator.userAgent) {
  // 检测浏览器版本，并设置 window.__disableNativeFetch 来决定是否开启 fetch
  var userAgent = navigator.userAgent || "";
  var appVersion = navigator.appVersion || "";
  var vendor = navigator.vendor || "";

  var ua = (userAgent + ' ' + appVersion + ' ' + vendor).toLowerCase();

  var match = /(chrome)[ \/]([\w.]+)/.exec(ua)
        || /(webkit)[ \/]([\w.]+)/.exec(ua)
        || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua)
        || /(msie) ([\w.]+)/.exec(ua)
        || /(trident)(?:.*? rv:([\w.]+)|)/.exec(ua)
        || ua.indexOf("compatible") < 0
        && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];

  var engine = match[0];
  var mainVersion = match[2].split('.')[0];

  // chrome 内核版本大于 46， firefox 版本大于39 才开启 fetch
  if (engine.indexOf('chrome') === 0 && mainVersion >= 46) {
    window.__disableNativeFetch = false;
  } else if (engine.indexOf('mozilla') === 0 && mainVersion >= 39) {
    window.__disableNativeFetch = false;
  } else {
    window.__disableNativeFetch = true;
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/* global jQuery */

/** 前端登录方法，支持执行登录链
 *
 * 后台登录器需要传递什么参数，登录方法就需要传什么参数
 *
 * 1, 每个登录方法的返回值就是下一个登录方法的参数
 * 2, 第一个登录方法无参数
 * 3, 每个登录方法都返回一个promise对象，resolve 传递的参数就是发送给后端的参数
 * 4, 最后一个登录完成，不需要显示返回任何东西
 * 5, 当一个登录方法调用了 reject，登录对象会记住登录进度，
 *    下次调用 login.start 会从上次失败的登录方法开始
 * 6, 后端返回的数据中，status 为 false，回自动调用 catchErrorWithLogin，同时判定这个登录方法失败
 *
 * Example:
 *
 *  // 登录方法1: 传统登录
 *  var passwordLogin = function() {
 *    // get username and password
 *    return Promise.resolve({username, password});
 *  }
 *
 *  // 登录方法2: u盾登录
 *  var ukeyLogin = function() {
 *    // get ukey
 *    return Promise.resolve({key, ukey});
 *  }
 *
 *  // 登录方法3: 登录后跳转
 *  var successLogin = function(result) {
 *    window.location = result.url;
 *  }
 *
 *  // 统一处理错误
 *  var catchErrorWithLogin = function(args){
 *    alert(args.msg || 'unknow');
 *  }
 *
 *  // 指定登录顺序：先执行登录方法1，在执行登录方法2
 *  var login = Login([
 *    passwordLogin,
 *    ukeyLogin,
 *    successLogin
 *  ], catchErrorWithLogin);
 *
 *  $('form').on('submit', function(event){
 *    event.preventDefault();
 *    login.start();
 *  })
 */
window.Login = function(chains, successHandler, errorHandler, greed) {
    var current = 0;
    var lastResult = undefined;
    var url = location.pathname;
    var datalist = {};

    var setSession = function(session) {
        localStorage.setItem('login_sid', session.login_session_id);
        sessionStorage.setItem(session.login_session_id, JSON.stringify(session));
    };
    var getSession = function() {
        var sessionID = localStorage.getItem('login_sid');
        var session = sessionStorage.getItem(sessionID);
        return session ? JSON.parse(session) : undefined;
    };
    var clearSession = function() {
        var sessionID = localStorage.getItem('login_sid');
        localStorage.removeItem('login_sid');
        sessionStorage.removeItem(sessionID);
    };
    
    function entries(obj) {
        var arr = [];
        for (var key in obj) {
                arr.push([key, obj[key]]); 
        }
        return arr;
    }
    var toParams = function(data){
        var ls = entries(data).map(function(x){return x[0]+"="+x[1]}).join('&')
        return ls;
    };
    var post = function(url, data) {
        var session = getSession();
        // FIXME
        debugger
        if (session){
            data['login_session_id'] = session.login_session_id;
        }
        return fetch(url, {
            method: 'POST',
            body: toParams(data),
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).then(function(x){return x.json()});
    };
    var start = function(){
        var chain = chains[current];
        var p = new Object();
        if(chain){
            p = chain(lastResult);
        }
        if(current<chains.length){
            if(typeof(p) !== 'object' || typeof(p.then) !== 'function'){
                errorHandler({"msg":"登录类配置出错了"});
            }else{
              debugger
                p.then(function(data) {
                    if(greed){
                        return Promise.all(chains.map(function(x){return x()})).then(function(datalist) {
                            datalist = datalist.reduce(function(acc, value){return Object.assign(acc, value)}, data);
                            datalist['greed'] = true;
                            current = chains.length - 1;
                            return post(url, datalist);
                        })
                    }else{
                      debugger
                      if(data.type && data.type == 'weixin'){
                        return {'status':true, 'type': 'weixin'};
                      }else{
                        return post(url, data);
                      }
                        
                    }
                }).then(function(result) {
                    if (result.status || result.code === 10) {
                        current += 1;
                        lastResult = result;
                        if(result.type !== 'weixin')
                        setSession(result);
                        start();
                    }else{
                        throw result;
                    }
                }).catch(function(args) {
                    console.error(args);
                    errorHandler(args);
                });
            }
        }else{
            successHandler(lastResult)
        }
    };

    clearSession();
    return {start:start};
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

  /* 验证uid */
  initUKey = function(){
    if (typeof window.DetectBrowser !== 'function'){
      return {'code': 1, 'msg': '无法检测到 UKey 客户端', 'status': false};
    }
  
    var browser = window.DetectBrowser();
    if (browser == 'Unknown') {
      return {'code': 1, 'msg': '不支持该浏览器， 如果您在使用傲游或类似浏览器，请使用谷歌浏览器或者火狐浏览器', 'status': false};
    }
  
    return {'code': 0};
  }
  
 getUKeyClient = function(){
    var result = initUKey();
    if (result['code'] === 0) {
      return window;
    }else{
      return {'status': false, 'msg': result['msg']};
    }
  }
  
showClientError = function(client){
    var error = client.IA100_GetLastError();
    if (typeof error === 'number' && error < 0 || error === '') {
      return {'status': false, 'msg': '无法检测到U盾客户端'};
    }else if (error == 66){
      return {'status': false, 'msg': 'ERROR: 66，U盾没有初始化，请联系管理员初始化!'};
    }else if (error == 18){
      return {'status': false, 'msg': 'ERROR: 18，没有检测到U盾'};
    }else if (error == 14){
      return {'status': false, 'msg': 'ERROR: 14，没有检测到U盾'};
    }else{
      return {'status': false, 'msg': 'ERROR: ' + error};
    }
  }
  
get_guid = function(){
    var client = getUKeyClient();
  
    if (client.IA100_Find() !== 0){
      return showClientError(client);
    }
  
    var username = 'barefoot', password = 'barefoot';
    if (client.IA100_OPEN(username, password) !== 0) {
      return showClientError(client);
    }
  
    var guid = client.IA100_GetGUID();
    if (guid === -3 || guid === '') {
      return showClientError(client);
    }
  
    return {'status': true, 'guid': guid};
  }
  /* uid end */
  //获取url携带参数
 getUrlParam = function (name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]); return null;
    }

  //拼接url
  var get_static_url = function(url) {
    return '/static/' + url;
  }
  /* 帐号密码登录 */
  // code 微信登录所需的code
  // username, password 是 login_default 需要的参数
  var password  = function(){
    return new Promise(function(resolve, reject){
      $(".login-password").addClass('login-step').siblings().removeClass("login-step");
      $("#submit").on('click',function(e){
        e.preventDefault();
        var code = $.trim(getUrlParam('code'));
        var username = $(".username").val();
        var password = $(".password").val();
        var data = {username:username, password:password};
        if(code){
          data["code"] = code;
        }
        if (!username || !password){
          return reject({status: false, msg: '用户名或者密码输入错误'});
        }else{
          return resolve(data);
        }
      })
    });
  };
  //给后台发送信息，请求当前用户的多系统信息
  var split = function(res){
    debugger
    return new Promise(function(resolve, reject){
      return resolve({});
    })
  }; 
  //得到多系统信息，默认登录第一个
  var showSplit = function(res) {
      var systems = res.msg;
      return new Promise(function(resolve, reject){
        $(".login-split").addClass('login-step').siblings().removeClass("login-step");

        $("tbody").html(systems.map(function(item){
          return '<tr><td>'+item.alias+'</td></tr>';
        }).join(''))

        $("tbody").find('tr').on('click', function(event){
          var system = systems[$(this).index()];
          if (systems.length) {
            return resolve({extra: system.extra, other: JSON.stringify({})});
          }else{
            return reject({status: false, msg: '当前用户没有在用户中心正确配置'})
          }
        });
        
      });
  };
  //验证U盾ID
  var ukey = function () {
    debugger
      return new Promise(function(resolve,reject){
        var msg = get_guid();
        if(msg.status){
          return resolve({guid: msg.guid});
        }else{
          return reject(msg)
        }
          
      })
  };
  //微信登录，获取相关参数
  var weixin = function(){
    return new Promise(function(resolve,reject){
      $(".login-qrcode").addClass("login-step").siblings().removeClass("login-step");
      var code = getUrlParam('code');   
      if(code && code != " "){
        resolve({'code':code});
      }else{
        new WxLogin({
          id:"login-qrcode", 
          appid: appid, 
          scope: "snsapi_login", 
          redirect_uri: encodeURIComponent(redirect),
          state: callback,
          style: "",
          href: ""
        });
      }
    })
  }

  //根据获取到的数据，若code为10且msg不为对象则跳转到绑定页面，若msg为对象则声称登录二维码，code为0时登录成功进入下一步
  var setCode = function(res){
    var msg = res.msg;
    var code = getUrlParam('code');
    if(res.code === 10 && code){
      return new Promise(function(resolve,reject){
        alert('该用户未绑定账户，请绑定！')
        window.location = '/login1_relation_account' + '?code='+ code;
        //window.location = location.host + '/login1_relation_account' + '?code='+ code;
      })
    }else if(res.code === 0){
      debugger
      return new Promise(function(resolve,reject){
        resolve({'type':'weixin'});
      })
    }
  }

  //登录成功后跳转
  LoginSuccess = function(res, defaultUrl) {
    var url = res.msg;
    if (!url){
        window.location = defaultUrl;
    }else{
        window.location = url;
    }
      
  };
  /* //指定第一个系统
  const first = function(){
      return new Promise((resolve,reject)=>{
        const login_first = true;
          return resolve({login_first: login_first})
        })
  } */
  //出错处理
  catchError = function(error) {
      alert(error.msg || '未知错误');
      if(login_type !== 'weixin_ukey_split'){
        window.location=location.href
      }
  }

  window.processArray = function(config){
    var processArray = [];//登录流程集
    var process = config.process;
    login_type = config.login_type;
  	if(config.bg_img){
      $('body').css({"background":'url('+get_static_url(config.bg_img)+') no-repeat 100% 100%',"background-size":'100% 100%'});
    }
    if(config.title_img){
      $('.logo').css('background','url('+get_static_url(config.title_img)+') no-repeat center center')
    }
    if(login_type == 'weixin_ukey_split'){
      appid = process[0].appid;
      redirect = process[0].redirect_url;
      callback = process[0].callback_url;
    }
    var steps = {
      'default': [password],
      'weixin': [weixin, setCode],
      'ukey':[ukey],
      'split': [split, showSplit],
    }

    for(var i in process){
      var ps = process[i];
      processArray = processArray.concat(steps[ps.type]);
    }
    return processArray;
  }
    

/***/ })
/******/ ]);