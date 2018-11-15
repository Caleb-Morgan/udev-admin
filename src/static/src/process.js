  /* 验证uid */
  var initUKey = function(){
    if (typeof window.DetectBrowser !== 'function'){
      return {'code': 1, 'msg': '无法检测到 UKey 客户端', 'status': false};
    }
  
    var browser = window.DetectBrowser();
    if (browser == 'Unknown') {
      return {'code': 1, 'msg': '不支持该浏览器， 如果您在使用傲游或类似浏览器，请使用谷歌浏览器或者火狐浏览器', 'status': false};
    }
  
    return {'code': 0};
  }
  
 var getUKeyClient = function(){
    var result = initUKey();
    if (result['code'] === 0) {
      return window;
    }else{
      return {'status': false, 'msg': result['msg']};
    }
  }
  
var showClientError = function(client){
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
  
var get_guid = function(){
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
  var getUrlParam = function (name) {
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
  var split = function(){
    return Promise.resolve({});
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
      return new Promise(function(resolve,reject){
        var get_guid = get_guid();
        if(get_guid){
          return resolve({guid: get_guid.guid});
        }else{
          return reject(get_guid)
        }
          /* if(find === 0 && guid){
            
          }else{
            return reject({status:false,msg: '获取不到U盾ID(是否安装U盾驱动/插入U盾)'})
          } */
          
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
        resolve({})
      }
    })
  }

  //根据获取到的数据，若code为10且msg不为对象则跳转到绑定页面，若msg为对象则声称登录二维码，code为0时登录成功进入下一步
  var setCode = function(res){
    var msg = res.msg;
    if (res.code === 10) {
      return new Promise(function(){
        new WxLogin({
          id:"login-qrcode", 
          appid: msg.appid, 
          scope: "snsapi_login", 
          redirect_uri: encodeURIComponent(msg.redirect),
          state: msg.callback,
          style: "",
          href: ""
        });
      })
    }else if(res.code === 0){
      return new Promise(function(resolve,reject){
        resolve({'login_first':true});
      })
    }
  }

  //登录成功后跳转
  var LoginSuccess = function(res, defaultUrl) {
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
  var catchError = function(error) {
      alert(error.msg || '未知错误');
  }

  window.processArray = function(config){
  	var processArray = [];//登录流程集
  	if(config.bg_img){
      $('body').css({"background":'url('+get_static_url(config.bg_img)+') no-repeat 100% 100%',"background-size":'100% 100%'});
    }
    if(config.title_img){
      $('.logo').css('background','url('+get_static_url(config.title_img)+') no-repeat center center')
    }
    var process = config.process;
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
    