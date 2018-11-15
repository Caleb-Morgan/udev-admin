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
                p.then(function(data) {
                    if(greed){
                        return Promise.all(chains.map(function(x){return x()})).then(function(datalist) {
                            datalist = datalist.reduce(function(acc, value){return Object.assign(acc, value)}, data);
                            datalist['greed'] = true;
                            current = chains.length - 1;
                            return post(url, datalist);
                        })
                    }else{
                        return post(url, data);
                    }
                }).then(function(result) {
                    if (result.status || result.code === 10) {
                        current += 1;
                        lastResult = result;
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
