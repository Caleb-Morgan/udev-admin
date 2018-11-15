import { createGlobalStyle } from 'styled-components';

export const Iconfont = createGlobalStyle`
@font-face {font-family: "iconfont";
  src: url('./iconfont.eot?t=1541909662734'); /* IE9*/
  src: url('./iconfont.eot?t=1541909662734#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff;charset=utf-8;base64,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') format('woff'),
  url('./iconfont.ttf?t=1541909662734') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
  url('./iconfont.svg?t=1541909662734#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family:"iconfont" !important;
  font-size:20px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-appdownload:before { content: "\e60f"; }

.icon-search:before { content: "\e616"; }

.icon-Aa:before { content: "\e636"; }

.icon-penleather:before { content: "\e600"; }

.icon-zhinanzhenfaxiandaohangdizhiweizhi:before { content: "\e786"; }
`


