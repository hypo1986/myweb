define("page/mobile/mobile.async",function(a){(function(){var t,e,n,i,o,r,p,d;a("page/mobile/mobile.async.less"),a("effect"),e=a("common"),i=a("music"),r=a("share"),n=a("db"),a("fingerprintDialog"),a("shareMask"),a("blessingList"),t=null,o=a("reportAbuse"),p=a("stat"),d=function(a){var t,e,n;t=[];for(e in a)n=a[e],n&&t.push(""+e+"="+(n||""));return t.join("&")},function(){var a,u,c,l,s,f,g,h,m,b,w,v,D,y,S,k,M,P,x,j;for(p.init(),a=$(".link"),a.one("tap",function(){var a,t,e;return a=$(this),t=a.attr("data-href")||a.attr("href"),e=a.attr("data-text")||a.text(),p.sendLinkTo(t,e)}),n.reportShare=n.registerMethod({url:"/app/forward",type:"put"}),n.reportViewCount=n.registerMethod({url:"/app/viewcount",type:"get",data:{appid:pageData.id},success:function(){}}),n.getMusic=n.registerMethod({type:"get"}),null!=pageData.id&&n.reportViewCount(),h=null!=(P=pageData.musiccfg)?P:{},h.mid?n.getMusic({url:"http://www.kuwo.cn/bd/search/getSongUrlByMid?mid="+h.mid+"&format=mp3&bdfrom=tuzhan&c=okbaq5ac55vz",dataType:"jsonp",success:function(a){var t,e;return t=null!=(e=a.data)?e.url:void 0,t&&(pageData.musicPath=t),i.init()}}):i.init(),u=window.location,y=u.search,y=y?y.substring(1):"",y=y.split("&"),b={},k=0,M=y.length;M>k;k++)g=y[k],g&&(g=g.split("="),g[0]&&(b[g[0]]=decodeURIComponent(g[1])));return window._hmt=window._hmt||[],e.loadScript("//hm.baidu.com/hm.js?9ad3eedcbfcad678357018dda8c8c602"),w=[],c=pageData.cnl||b.cnl,c&&w.push("cnl="+c),l=b.debug,l&&w.push("debug="+l),v=w.join("&"),v&&(v="?"+v),e.loadScript("http://webapi.amap.com/maps?v=1.3&key=e2cad13fd9a89339f9a07c7758c42623"),f={pfid:pageData.app_pfid||"55306108c51369f023cf59b2",appid:pageData.id,blext:!1},pageData.organizationid&&(f.pfid=pageData.organizationid,f.blext=!0),s=function(){},m=function(){var a;return window.adsenable===!0&&null!=(a=window.dataSDK)&&"function"==typeof a.pushView?a.pushView("UqAFqbzv","13c35185-af4b-4888-9168-b32e9f007bca"):void 0},e.loadScript("//sdk.fibodata.com/data/datasdk.min.js?"+d(f),m,s,{id:"fiboDataSDK"}),S="default",pageData.level>"2"&&(S="vip"),"3"===pageData.state&&(S="safe"),r.init({debug:"true"===b.debug,title:(pageData.name||"").replace("{{count}}",pageData.viewcount),link:location.origin+location.pathname+v+"#from=share",imgUrl:null!=(x=pageData.imgPath)?x:"http://file.rabbitpre.com/default.png",desc:pageData.desc,userLevel:S,appState:pageData.state,cnl:null!=(j=e.bom.query("cnl"))?j:null,onShare:function(a){var t,i;if(pageData.id)return n.reportShare({data:{appid:pageData.id,type:a,cnl:null!=(t=e.bom.query("cnl"))?t:null}}),null!=(i=window.dataSDK)&&"function"==typeof i.share?i.share(a):void 0},onCancel:function(){}}),t=$("#app-bottom"),t.on("tap",".link-report-abuse",function(){return o(function(){return t.find(".link-report-abuse").hide()})}),D=function(a){var t,e,n,i;e=a.data,i=a.origin;try{e=JSON.parse(e)}catch(o){return void(n=o)}return t=e.code,"PREV"===t?void("function"==typeof window.prevPage&&window.prevPage()):void("NEXT"===t&&"function"==typeof window.nextPage&&window.nextPage())},window.addEventListener("message",D,!1)}()}).call(this)});
;define('page/mobile/mobile.async.less', function(require, exports, module){function importStyle(css, id) {    var ele = document.createElement('style');    ele.id = id;    document.getElementsByTagName('head')[0].appendChild(ele);    if (ele.styleSheet) {        ele.styleSheet.cssText = css;    } else {        ele.appendChild(document.createTextNode(css));    }}; importStyle("", "page/mobile/mobile.async.less"); }); require("page/mobile/mobile.async.less")
;define("effect",function(e,n,t){(function(){var n,f,i,c;e.async("effect/effect.async"),n=e("zepto"),c=["rainy","fireworks","erase"],i=function(n,t){return-1===c.indexOf(n.effect.name)||n&&(n.style.height<1||n.style.width<1)?void 0:e.async("effect/"+n.effect.name,function(e){var f;return"erase"===n.effect.name&&(f=function(){return n.notAllowMoveToNext=!1}),e.init.call(null,n,t.firstElementChild,{onFinished:f})})},f=function(n,t){return-1!==c.indexOf(n.effect.name)?e.async("effect/"+n.effect.name,function(e){return e.destroy.call(null,n,t.firstElementChild)}):void 0},t.exports={init:i,destroy:f}}).call(this)});
;define("music",function(a,t,o){(function(){var t,i,s,u,n,p,l,e,c,d;p=a("common"),t=a("zepto"),s=null,i=null,n=t("#wrapper"),u=t(window),l=function(){var a,o;if(pageData.music&&(a="",0!==pageData.music_is_auto&&(a="autoplay = 'autoplay'"),s=t("<div id='music' class='music stopped'>		<audio id='music-audio'  class='audio' src='"+pageData.musicPath+"' loop "+a+" preload='auto' >		</audio>		<div class='control'><div class='control-after'></div></div>	</div>"),s.appendTo(n),i=s.find("audio"),i[0].load(),0!==pageData.music_is_auto&&(i.on("canplay",function(){return s.removeClass("stopped"),i[0].play()}),i[0].play()),s.on("tap",function(){return i[0][s.hasClass("stopped")?"play":"pause"](pageData.musicPath),s.toggleClass("stopped")}),0!==pageData.music_is_auto))return u.on("touchstart",o=function(){return i[0].play(),u.off("touchstart",o)})},e=function(){return i?i[0].play():void 0},d=function(){return i?i[0].stop():void 0},c=function(){return i?(s.addClass("stopped"),i[0].stop()):void 0},o.exports={init:l,stopSilently:d,playSilently:e,stop:c}}).call(this)});
;define("share",function(n,e,i){(function(){var e,o,t,r,a,c,l;e=n("zepto"),t=n("common"),o=n("async"),r=n("db"),a=function(n){return r.fetchWxShare=r.registerMethod({url:"/common/wxshare",type:"get"}),-1!==navigator.userAgent.toLowerCase().indexOf("micromessenger")?c(n):void 0},c=function(n){return o.parallel([function(e){return r.fetchWxShare({data:{pageUrl:location.href.replace(/#.*$/,""),shareUrl:n.link,userLevel:n.userLevel},complete:function(n){return e(n)}})},function(n){return t.loadScript("//res.wx.qq.com/open/js/jweixin-1.0.0.js",function(){return n()})}],function(i){var o,t,r;if(!i.errorCode)return o=null!=(r=n.debug)?r:!1,t={debug:o,appId:"wx06a877b61d74ea72",timestamp:parseInt("1429690618"),nonceStr:"kxpmsmqtdab2cso",signature:"81fe1716cc21be3647d13ffb8138ffbb340bd9de",jsApiList:["checkJsApi","onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","onMenuShareQZone"]},n.link=("undefined"!=typeof pageData&&null!==pageData?pageData.sharelimit:void 0)||i.shareUrl||n.link,delete i.shareUrl,window.wx.config(e.extend({},t,i)),window.wx.ready(function(){var i,o;return i=e("#music-audio"),null!=i[0]&&"autoplay"===i.attr("autoplay")&&null!=(o=i[0])&&o.play(),l(n)}),window.wx.error(function(n){return o===!0?alert(JSON.stringify(n)):void 0})})},l=function(n){return window.dataSDK&&window.dataSDK.dealUrl&&(n.link=window.dataSDK.dealUrl(n.link)),n.desc||(n.desc=n.title),window.wx.onMenuShareTimeline({title:n.title,link:n.link,imgUrl:n.imgUrl,success:function(){return"function"==typeof n.onShare?n.onShare("timeline"):void 0},cancel:function(){return"function"==typeof n.onCancel?n.onCancel("timeline"):void 0}}),window.wx.onMenuShareAppMessage({title:n.title,desc:n.desc,link:n.link,imgUrl:n.imgUrl,success:function(){return"function"==typeof n.onShare?n.onShare("friend"):void 0},cancel:function(){return"function"==typeof n.onCancel?n.onCancel("friend"):void 0}}),window.wx.onMenuShareQQ({title:n.title,desc:n.desc,link:n.link,imgUrl:n.imgUrl,success:function(){return"function"==typeof n.onShare?n.onShare("qq"):void 0},cancel:function(){return"function"==typeof n.onCancel?n.onCancel("qq"):void 0}}),window.wx.onMenuShareQZone({title:n.title,desc:n.desc,link:n.link,imgUrl:n.imgUrl,success:function(){return"function"==typeof n.onShare?n.onShare("qzone"):void 0},cancel:function(){return"function"==typeof n.onCancel?n.onCancel("qzone"):void 0}}),window.wx.onMenuShareWeibo({title:n.title,desc:n.desc,link:n.link,imgUrl:n.imgUrl,success:function(){return"function"==typeof n.onShare?n.onShare("weibo"):void 0},cancel:function(){return"function"==typeof n.onCancel?n.onCancel("weibo"):void 0}})},i.exports={init:a}}).call(this)});
;define("fingerprintDialog",function(n,t,o){(function(){var t,e,r,c={}.hasOwnProperty,i=function(n,t){function o(){this.constructor=n}for(var e in t)c.call(t,e)&&(n[e]=t[e]);return o.prototype=t.prototype,n.prototype=new o,n.__super__=t.prototype,n};t=n("zepto"),e=n("dialog"),r=function(o){function e(o){o=t.extend({className:"fingerprint",confirm:window.isPC?"确认":"快邀请好友一同参与",content:"<p class='pre-content'>"+o.cmp.message.front+"</p><p class='mid-content'>第"+o.viewcount+"位</p><p class='post-content'>"+o.cmp.message.end+"</p>",textAlign:"center",onConfirm:function(){return window.isPC?void 0:(n.async("shareMask",function(n){return n.show()}),!1)}},o),e.__super__.constructor.call(this,o)}return i(e,o),e}(e),o.exports=r}).call(this)});
;define("shareMask",function(n,e,s){(function(){var e,o,t,a,r,i;e=n("zepto"),n("shareMask/shareMask.async.less"),r=!1,o=null,a=function(){return r?void 0:(o=e('<div class="share-mask"></div>'),o.appendTo(document.body),o.on("tap",function(){return t()}),r=!0)},i=function(){return r||a(),o.show()},t=function(){return r||a(),o.hide()},s.exports={show:i,hide:t}}).call(this)});
;define("blessingList",function(n,t,e){(function(){var t,o,r,i,a,l,s,u,c,d,p,m,g,f,h,v,b,C,w,D,P,y,k,L,R,E,I,M,N,O,T,x,z,A,G,H,S,Y,j;t=n("zepto"),m=n("common"),w=n("blessingList/blessingList.tpl"),C=n("blessingList/blessingItem.tpl"),g=n("db"),L=!1,a=null,i=null,c=null,l=null,d=null,r=null,s=null,u=null,o=null,p=null,f=140,h=15,D=0,O=20,N=500,T=500,v={EMPTY:"暂无留言",LOADING:"正在加载",ERROR:"加载失败, 点击重试",END:"加载完毕"},E=!1,A=v.LOADING,g.postComment=g.registerMethod({url:"/comment",type:"post"}),g.getComments=g.registerMethod({url:"/comment/list/"+pageData.id,type:"get"}),M={},k=function(n){return M=n,L?void 0:(o=t(document.body),p=t(window),a=t(w(n.data)),a.appendTo(document.body),H(),i=a.find("#blessing-content"),c=a.find("#blessing-name"),d=a.find(".blessing-submit"),r=a.find(".btn-close"),s=a.find(".blessing-list"),u=a.find(".btn-load-more"),N=5*o.height(),T=o.height(),f=parseInt(i.attr("maxlength")),h=parseInt(c.attr("maxlength")),l=a.find(".blessing-form"),b(),P(),L=!0)},H=function(){var n;return window.isPC?(n=window.calPageSize(),a.css({width:Math.ceil(n.width)+"px",marginLeft:-n.width/2+"px"})):void 0},b=function(){var e,o;return i.on("input",function(){var n;return n=i.val().length,i[n>f?"addClass":"removeClass"]("error"),Y()}),c.on("input",function(){var n;return n=c.val().length,c[n>h?"addClass":"removeClass"]("error"),Y()}),r.on("click",function(){return y()}),o=!1,e=!1,l.on("submit",function(r){var a,u;return r.preventDefault(),o||e||!j(!0)?void 0:(o=!0,u="",(pageData.level||0)>=2&&(u=pageData.logoPath?"background: url('"+pageData.logoPath+"') no-repeat center center;background-size: contain;":"display: none;"),a=t(n("pageManagement/loading.tpl")({style:u})),a.appendTo(l),i.add(c).blur(),M.addComment&&M.addComment({content:m.str.trim(i.val())}),g.postComment({data:{appid:pageData.id,nickname:m.str.trim(c.val()),content:m.str.trim(i.val())},success:function(n){return I(),n=n.data,s.prepend(C({data:{items:[{content:n.content,nickname:n.nickname,createtime:n.createtime,updatetime:n.updatetime}]}},{C:m})),S(v.END),e=!0},error:function(){return alert("网络繁忙, 请稍后再试")},complete:function(){return a.remove(),o=!1}}))}),u.on("click",function(){return A===v.ERROR?P():void 0}),window.isPC?a.on("scroll",function(){return G()}):(p.on("scroll",function(){return G()}),p.on("touchend, touchmove",function(){return G()})),p.on("resize",function(){return H()})},Y=function(){var n;return n=j(),n?d.prop("disabled",!1):d.prop("disabled",!0)},j=function(n){var t,e,o;return t=m.str.trim(i.val()),e=m.str.trim(c.val()),o=!0,(!t||t.length>f)&&(n&&i.addClass("error"),o=!1),(!e||e.length>h)&&(n&&c.addClass("error"),o=!1),o},I=function(){var e,o,r;return r="",o="",(pageData.level||0)>=2&&(pageData.logoPath?r="background: url('"+pageData.logoPath+"') no-repeat center center;background-size: contain;":(r="display: none;",o="top: 30%;")),e=t(n("pageManagement/formSubmitSuccess.tpl")({message:"留言成功!",style:r,messagestyle:o})),e.appendTo(l)},R=!1,P=function(){return R?void 0:(R=!0,g.getComments({data:{page:D+1,pagesize:O},success:function(n){return s.append(C(n,{C:m})),D+=1,0===n.data.length&&1===D?void S(v.EMPTY):S(O!==n.data.items.length?v.END:v.LOADING)},error:function(){return S(v.ERROR)},complete:function(){return R=!1,G()}}))},S=function(n){return u.text(n),A=n},G=function(){return x()?P():void 0},x=function(){return E&&A===v.LOADING&&(window.isPC?a.scrollTop():o.scrollTop())+T>=(window.isPC?a.prop("scrollHeight"):a.height())-N},z=function(n){return k(n),a.show(),E=!0},y=function(){return a.hide(),E=!1,"function"==typeof M.onHide?M.onHide():void 0},e.exports={init:k,show:z}}).call(this)});
;define("reportAbuse",function(t,e,r){(function(){var e,o,n,p,i,s,u={}.hasOwnProperty,a=function(t,e){function r(){this.constructor=t}for(var o in e)u.call(e,o)&&(t[o]=e[o]);return r.prototype=e.prototype,t.prototype=new r,t.__super__=e.prototype,t};e=t("zepto"),p=t("dialog"),o=t("dialog/alert"),s=t("reportAbuse/reportAbuse.tpl"),t("reportAbuse/reportAbuse.async.less"),n=t("db"),n.reportAbuse=n.registerMethod({url:"/app/report",type:"post"}),i=function(t){function r(t){var p,i=this;return this===window?new r(t):(p=e.extend({},{title:"我遇到的问题",content:s(),className:"report-abuse",confirm:"确认",cancel:"取消",onConfirm:function(){return n.reportAbuse({data:{appid:pageData.id,reason:i.$dom.find("input:checked").parent().text()}}),o({title:"提交成功"}),"function"==typeof t?t():void 0}}),void r.__super__.constructor.call(this,p))}return a(r,t),r}(p),r.exports=i}).call(this)});
;define("stat",function(t,e,n){(function(){var e,i,s;e=t("zepto"),i=window.location,s={START_TIME:new Date,SERVER:"http://tongji.szzbmy.com/tj.gif",ORIGIN:""+i.protocol+"//"+i.host,PATHNAME:i.pathname,HREF:i.href,MAX_COUNT:1,queue:[],CLASS_INTO:"INTO",CLASS_DURATION:"DURATION",CLASS_RELOAD:"RELOAD",CLASS_CMP:"COMPONENT",CLASS_LINK_INTO:"LINK_TO",CLASS_REQUEST:"REQUEST",ACTION_INIT:"INIT",ACTION_CLICK:"CLICK",ACTION_UPD:"UPDATE",calQueryStr:function(t){var e,n,i;e=[];for(n in t)i=t[n],e.push(""+encodeURIComponent(n)+"="+encodeURIComponent(null!=i?i:""));return e.join("&")},init:function(t){return null==t&&(t={}),this.inited=!0,this.authid=t.authid},getUser:function(){},checkQueue:function(){var t,e;return e=this.queue,t=e.length,t<this.MAX_COUNT?void 0:this.post()},post:function(){var t,e,n,i,s,u,r,o;for(s=this.queue,this.queue=[],o=[],u=0,r=s.length;r>u;u++)e=s[u],t=e.ajax,delete e.ajax,i=this.calQueryStr(e),n=""+this.SERVER+"?"+i,o.push(this.request(n,t));return o},request:function(t,n){var i;return n!==!0?(i=new Image,i.onload=function(){return e(i).remove()},void(i.src=t)):e.ajax({url:t,async:!1,timeout:1e3})},send:function(t,e,n,i){var s,u,r,o,h,a,l,c;if(null==i&&(i={}),this.inited===!0&&t){h=new Date,u=this.ORIGIN,r=this.HREF,a=r.replace(u,""),l=i.user,delete i.user,s={authid:this.authid,host:u,url:a,time:h.toISOString(),"class":t,name:e,action:n,user:l||this.getUser()};for(o in i)c=i[o],s[o]=c;return this.queue.push(s),this.checkQueue()}},getOthersAgent:function(t){return""},getUserAgent:function(){var t,e;return e=window.navigator.userAgent,t=this.getOthersAgent(e),e+=" "+t},sendInto:function(){return this.send(this.CLASS_INTO,this.getUserAgent(),null,{width:window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,height:window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight,screen_width:window.screen.availWidth,screen_height:window.screen.availHeight})},sendReload:function(){var t,e;return e=this.START_TIME,t=new Date,this.send(this.CLASS_RELOAD,t.getTime()-e.getTime(),null,{ajax:!0})},sendRequest:function(t,e,n,i,s,u){var r;return null==n&&(n={}),null!=t?(r={params:JSON.stringify(n),duration:i,result:s,msg:u},this.send(this.CLASS_REQUEST,t,e,r)):void 0},sendLinkTo:function(t,e,n,i,s){var u,r,o,h;if(null==s&&(s={}),null!=t){u=this.ACTION_INIT,n||(n=this.PATHNAME),i||(i="_self"),(i="_self")&&(s.ajax=!0),o={desc:e,from:n,target:i};for(r in s)h=s[r],o[r]=h;return s=o,this.send(this.CLASS_LINK_INTO,t,u,s)}},sendComponent:function(t,e,n,i,s){var u,r,o;if(null==s&&(s={}),null!=t){null==i&&(i=this.ACTION_INIT),r={cmpclass:e,cmpvalue:n};for(u in s)o=s[u],r[u]=o;return s=r,this.send(this.CLASS_CMP,t,i,s)}}},n.exports=s}).call(this)});
;define("dialog",function(o,t,n){(function(){var t,i,e;t=o("zepto"),e=o("dialog/dialog.tpl"),o("dialog/dialog.async.less"),i=function(){function o(n){return null==n&&(n={}),this===window?new o(n):(this.opts=n,this.$dom=t(e(n)),this.$dom.appendTo(document.body),this.$dialog=this.$dom.find(".dialog"),this.refreshLocation(),void this.bindEvents())}return o.prototype.show=function(){return this.$dom.fadeIn()},o.prototype.hide=function(){var o=this;return this.$dom.fadeOut(function(){return o.destroy()})},o.prototype.refreshLocation=function(){return this.$dialog.css("marginTop",-this.$dialog.height()/2+"px")},o.prototype.bindEvents=function(){var o=this;return this.$dom.on("tap",function(){return o.hide()}),this.$dialog.on("tap",function(o){return o.stopPropagation()}),this.$dialog.on("tap",".btn-cancel",function(){var t,n;return t="function"==typeof(n=o.opts).onCancel?n.onCancel():void 0,t!==!1?o.hide():void 0}),this.$dialog.on("tap",".btn-confirm",function(){var t,n;return t="function"==typeof(n=o.opts).onConfirm?n.onConfirm():void 0,t!==!1?o.hide():void 0})},o.prototype.destroy=function(){return this.$dom.remove(),this.$dom=null,this.$dialog=null},o}(),n.exports=i}).call(this)});
;define('shareMask/shareMask.async.less', function(require, exports, module){function importStyle(css, id) {    var ele = document.createElement('style');    ele.id = id;    document.getElementsByTagName('head')[0].appendChild(ele);    if (ele.styleSheet) {        ele.styleSheet.cssText = css;    } else {        ele.appendChild(document.createTextNode(css));    }}; importStyle(".share-mask{display:none;background:url(http://oss.szzbmy.com/rp2/apps/static/widget/shareMask/share-mask_00d3bd4.png) rgba(0,0,0,.6) no-repeat;background-size:90% auto;background-position:center 2em;position:absolute;top:0;left:0;right:0;bottom:0;z-index:101}", "shareMask/shareMask.async.less"); }); require("shareMask/shareMask.async.less")
;define("blessingList/blessingList.tpl",function(s,e,n){n.exports=function(s){s=s||{};var e=[];return e.push('<div class="blessing-dialog"> <div class="banner clearfix"> <button class="btn-close"><i class="icon icon-close"></i></button> </div> <form class="blessing-form"> <textarea id="blessing-content" class="blessing-content" name="blessing-content" placeholder="',s.content,'" maxlength="140"></textarea>  <p class="restriction-desc">限140字</p> <input id="blessing-name" class="blessing-name border-bottom" name="blessing-name" placeholder="',s.sign,'" maxlength="15"/>  <input class="blessing-submit" type="submit" value="',s.text,'" disabled/> </form>  <ul class="blessing-list border-top"> <div class="list-desc">最近留言</div> </ul> <button class="btn-load-more">正在加载</button></div>'),e.join("")}});
;define("blessingList/blessingItem.tpl",function(s,t,e){e.exports=function(s,t){s=s||{};for(var e=[],a=0,n=s.data.items.length;n>a;a++){var i=s.data.items[a];e.push('<li class="item"> <p class="name">',t.C.str.xss(i.nickname)||"",'</p> <p class="date">',t.C.formatDate("yyyy/MM/dd hh:mm:ss",i.createtime),'</p> <p class="clear"></p> <p class="content">',t.C.str.xss(i.content)||"","</p></li>")}return e.join("")}});
;define("dialog/alert",function(t,o,n){(function(){var o,r,e,i={}.hasOwnProperty,c=function(t,o){function n(){this.constructor=t}for(var r in o)i.call(o,r)&&(t[r]=o[r]);return n.prototype=o.prototype,t.prototype=new n,t.__super__=o.prototype,t};o=t("zepto"),e=t("dialog"),r=function(t){function n(t){return this===window?new n(t):(t=o.extend({},t,{confirm:"确认"}),void n.__super__.constructor.call(this,t))}return c(n,t),n}(e),n.exports=r}).call(this)});
;define("reportAbuse/reportAbuse.tpl",function(e,l,a){a.exports=function(e){e=e||{};var l=[];return l.push('<ul class="reasons"> <li class="reason"> <label><input type="radio" name="reason" checked/>欺诈、谣言</label> </li> <li class="reason"> <label><input type="radio" name="reason"/>诱导分享、恶意营销、隐私收集</label> </li> <li class="reason"> <label><input type="radio" name="reason"/>色情、赌博、毒品</label> </li> <li class="reason"> <label><input type="radio" name="reason"/>抄袭、侵权</label> </li> <li class="reason"> <label><input type="radio" name="reason"/>其它原因</label> </li></ul>'),l.join("")}});
;define('reportAbuse/reportAbuse.async.less', function(require, exports, module){function importStyle(css, id) {    var ele = document.createElement('style');    ele.id = id;    document.getElementsByTagName('head')[0].appendChild(ele);    if (ele.styleSheet) {        ele.styleSheet.cssText = css;    } else {        ele.appendChild(document.createTextNode(css));    }}; importStyle(".dialog.report-abuse{width:14rem;margin-left:-7rem}.dialog.report-abuse .content{padding:.5rem 0}.dialog.report-abuse .content .reason{padding:0 .3rem;line-height:2rem}.dialog.report-abuse .content .reason input[type=radio]{background:transparent;margin-right:.75rem;margin-left:.5rem;border:1px solid #aaa;border-radius:.5rem;width:.9rem;height:.9rem;vertical-align:middle;background-clip:padding-box;-webkit-appearance:none;position:relative}.dialog.report-abuse .content .reason input[type=radio]:checked{border-color:#68b30f;background-color:#68b30f}.dialog.report-abuse .content .reason input[type=radio]:checked:before,.dialog.report-abuse .content .reason input[type=radio]:checked:after{display:block}.dialog.report-abuse .content .reason input[type=radio]:before,.dialog.report-abuse .content .reason input[type=radio]:after{content:\"\";position:absolute;display:none;top:50%;left:50%;height:.1rem;background:#fff}.dialog.report-abuse .content .reason input[type=radio]:before{width:33.3%;-webkit-transform:translate(-70%,-50%) rotate(45deg);-ms-transform:translate(-70%,-50%) rotate(45deg);transform:translate(-70%,-50%) rotate(45deg);-webkit-transform-origin:left top;-ms-transform-origin:left top;transform-origin:left top}.dialog.report-abuse .content .reason input[type=radio]:after{width:50%;-webkit-transform:translate(-30%,-50%) rotate(-45deg);-ms-transform:translate(-30%,-50%) rotate(-45deg);transform:translate(-30%,-50%) rotate(-45deg)}", "reportAbuse/reportAbuse.async.less"); }); require("reportAbuse/reportAbuse.async.less")
;define("dialog/dialog.tpl",function(t,n,c){c.exports=function(t){t=t||{};var n=[];return n.push("<div class='dialog-outer'> <div class='dialog ",t.className,"'> <h3 class='title'>",t.title,"</h3> <div class='content'> ",t.content," </div> <div class='actions ",t.confirm&&t.cancel?"double":"","'> "),t.cancel&&n.push('<button class="btn btn-left btn-cancel">',t.cancel,"</button>"),t.confirm&&n.push('<button class="btn btn-right btn-confirm">',t.confirm,"</button>"),n.push(" </div> </div></div>"),n.join("")}});
;define('dialog/dialog.async.less', function(require, exports, module){function importStyle(css, id) {    var ele = document.createElement('style');    ele.id = id;    document.getElementsByTagName('head')[0].appendChild(ele);    if (ele.styleSheet) {        ele.styleSheet.cssText = css;    } else {        ele.appendChild(document.createTextNode(css));    }}; importStyle(".dialog-outer{position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.6);z-index:1000}.dialog{position:absolute;top:45%;left:50%;width:10rem;margin-left:-5rem;background:#fff;border-radius:.5rem}.dialog .title{text-align:center;line-height:2rem;font-size:.9rem}.dialog .content{font-size:.6rem;line-height:1.2rem}.dialog .btn{background:#fff;font-size:.7rem;color:#0057af;display:inline-block;width:100%;border-bottom-left-radius:.5rem;border-bottom-right-radius:.5rem;border:0;height:2rem;border-top:1px solid #aaa}.dialog .actions.double .btn{width:50%}.dialog .actions.double .btn-left{border-bottom-right-radius:0;border-right:1px solid #aaa}.dialog .actions.double .btn-right{border-bottom-left-radius:0}", "dialog/dialog.async.less"); }); require("dialog/dialog.async.less")