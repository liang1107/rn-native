'use strict';
import {Dimensions, PixelRatio, Platform, Alert} from 'react-native';
//测试
// const BASE_URL = 'http://gaas.easy.echosite.cn/openserviceApp/';
//线上接口
const BASE_URL = 'http://gaas.bestwond.com/openserviceApp/';
// const BASE_URL = "http://192.168.0.11:8089/app/"
var saomiao = '未扫描';
var urlSaoMiao = null;
var version = 'v1.1';
var uiWidth = 1080;
var uiHeight = 1920;
var pixel = 1 / PixelRatio.get();
var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;
var pixelRatio = PixelRatio.get();
var fontScale = PixelRatio.getFontScale();
var scale = Math.min(
  Dimensions.get('window').height / uiHeight,
  Dimensions.get('window').width / uiWidth,
);

var utils = {
  /*宽度适配，例如我的设计稿某个样式宽度是50pt，那么使用就是：utils.yWidth(50)*/
  yWidth(value) {
    let getValue = (Dimensions.get('window').width * value) / uiWidth;
    if (getValue <= 1 && getValue > 0) {
      getValue = 1;
    }
    return getValue;
  },
  /*高度适配，例如我的设计稿某个样式高度是50pt，那么使用就是：utils.yHeight(50)*/
  yHeight(value) {
    let getValue = (Dimensions.get('window').height * value) / uiHeight;
    if (getValue <= 1 && getValue > 0) {
      getValue = 1;
    }
    return getValue;
  },
  /*字体大小适配，例如我的设计稿字体大小是17pt，那么使用就是：utils.yFont(17)*/
  yFont(value) {
    if (Platform.OS === 'android') {
      value = Math.round(((value * scale + 0.5) * pixelRatio) / fontScale);
      return value / pixelRatio;
    } else {
      let deviceWidth = screenWidth;
      let deviceHeight = screenHeight;
      let deviceRatio = pixelRatio;
      let fontSize = value;
      // console.log('deviceScreen_'+deviceRatio+'_'+deviceWidth+'_'+deviceHeight);
      if (deviceRatio === 2) {
        // iphone 5s and older Androids
        if (deviceWidth < 360) {
          return fontSize * 0.95;
        }
        // iphone 5
        if (deviceHeight < 667) {
          return fontSize;
        }
        // iphone 6-6s
        if (deviceHeight <= 735) {
          return fontSize * 1.15;
        }
        // older phablets
        return fontSize * 1.25;
      }
      if (deviceRatio === 3) {
        // catch larger devices
        // ie iphone 6s plus / 7 plus / mi note 等等 原1.27
        //x
        if (deviceHeight == 812) {
          return fontSize * 1.2;
        } else {
          //p
          return fontSize * 1.21;
        }
      }
    }
  },
  /**
   *  method 请求接口名
   *  params 请求参数数据对象
   */
  getV() {
    return version;
  },
  getURL() {
    return BASE_URL;
  },
  seturlSaoMiao(url) {
    urlSaoMiao = url;
  },
  geturlSaoMiao() {
    return urlSaoMiao;
  },
  getboxsize(size) {
    switch (size) {
      case 'S': {
        return '小箱';
        break;
      }
      case 'L': {
        return '大箱';
        break;
      }
      case 'M': {
        return '中箱';
        break;
      }
      case 'XL': {
        return '超大箱';
        break;
      }
      case 'XS': {
        return '超小箱';
        break;
      }
    }
  },
  getSaoMiao() {
    return saomiao;
  },
  setSaoMiao(res) {
    saomiao = res;
  },
  clearSaoMiao() {
    saomiao = '未扫描';
  },
  saomiao(url) {
    // saomiao=url
    console.log(url);
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'POST', //定义请求方式，POST、GET、PUT等
        headers: {
          Accept: 'application/json, text/plain, */*', // 提交参数的数据方式,这里以json的形式
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json()) //数据解析的方式，json解析
        .then(responseJson => {
          var code = responseJson.code; //返回直接映射完的数据，可以直接使用
          if (code == 200) {
            saomiao = responseJson;
            // alert("绑定成功")
            console.log('扫描结果', saomiao);
            if (responseJson.data.deviceLine == 0) {
              saomiao = '未扫描';
              // Alert.alert("设备不在线")
            }
            if (responseJson.data.deviceStatus == 1) {
              saomiao = '未扫描';
              // Alert.alert("服务已到期")
            }
            resolve(responseJson);
          } else {
            Alert.alert(responseJson.msg);
          }

          // alert(JSON.stringify(responseJson))
        })
        .catch(error => {
          Alert.alert('请求错误', error);
          console.error(error);
        });
    });
  },
  xhrurl(url) {
    // Alert.alert('请求URL',url)
    console.log(url);
    return new Promise((resolve, reject) => {
      fetch(url, {method: 'POST'})
        .then(response => {
          return response.json();
        })
        .then(function(myJson) {
          // Alert.alert('数据',JSON.stringify(myJson))
          var code = myJson.code;
          console.log(myJson, code, '状态吗');
          switch (code) {
            case 200: {
              // console.log(myJson.data,"222222222222222222222")
              resolve(myJson.data);
              break;
            }
            case 2: {
              // alert("11111111111111")
              resolve('今天没有重发次数了');
              break;
            }
            case 1: {
              resolve('没有查到记录');
              break;
            }
            case -1: {
              Alert.alert('错误', '服务器异常，请稍后重试');
              break;
            }
            case -2: {
              Alert.alert('错误', '系统查询数据为空!');
              break;
            }
            case -3: {
              Alert.alert('错误', '参数缺失！');
              break;
            }
            default: {
              Alert.alert('错误', myJson.msg);
            }
          }
          // resolve(myJson)
        })
        .catch(error => {
          Alert.alert('请求错误', '网络请求问题');
        });
    });
  },
  xhr(url, params) {
    console.log('请求', url, '123', params);
    if (params) {
    } else {
      var params = {};
    }
    //    console.log(params)
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'POST', //定义请求方式，POST、GET、PUT等
        headers: {
          Accept: 'application/json, text/plain, */*', // 提交参数的数据方式,这里以json的形式
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params), //提交的参数
      })
        .then(response => response.json()) //数据解析的方式，json解析
        .then(responseJson => {
          var code = responseJson.code; //返回直接映射完的数据，可以直接使用
          resolve(responseJson);
          // alert(JSON.stringify(responseJson))
        })
        .catch(error => {
          Alert.alert('请求错误', '网络请求问题');
          console.error(error);
        });
    });
  },
  //时间戳转换1.formatDateTime("时间戳","yyyy-MM-dd")
  //2.formatDateTime("时间戳","yyyyMMdd")
  formatDateTime(time, format) {
    var t = new Date(time);
    var tf = function(i) {
      return (i < 10 ? '0' : '') + i;
    };
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
      switch (a) {
        case 'yyyy':
          return tf(t.getFullYear());
          break;
        case 'MM':
          return tf(t.getMonth() + 1);
          break;
        case 'mm':
          return tf(t.getMinutes());
          break;
        case 'dd':
          return tf(t.getDate());
          break;
        case 'HH':
          return tf(t.getHours());
          break;
        case 'ss':
          return tf(t.getSeconds());
          break;
      }
    });
  },
};

module.exports = utils;

// module.exports = xhr
