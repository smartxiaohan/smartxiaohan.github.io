require=function e(t,a,r){function n(o,c){if(!a[o]){if(!t[o]){var s="function"==typeof require&&require;if(!c&&s)return s(o,!0);if(i)return i(o,!0);var d=new Error("Cannot find module '"+o+"'");throw d.code="MODULE_NOT_FOUND",d}var l=a[o]={exports:{}};t[o][0].call(l.exports,function(e){var a=t[o][1][e];return n(a||e)},l,l.exports,e,t,a,r)}return a[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)n(r[o]);return n}({HelloWorld:[function(e,t,a){"use strict";cc._RF.push(t,"280c3rsZJJKnZ9RqbALVwtK","HelloWorld"),cc.Class({extends:cc.Component,properties:{label:{default:null,type:cc.Label},text:"Hello, World!"},onLoad:function(){this.label.string=this.text},update:function(e){}}),cc._RF.pop()},{}],common:[function(e,t,a){"use strict";cc._RF.push(t,"53ea9w3wPNPK6P4EmlOXamq","common"),t.exports={username:null,uid:-1,chairno:-1,avator:"",sex:0,totalchairs:2,socket:null,tablenum:-1,tablehost:-1,tablestatus:-1,tableplayers:[],dwstatus:0,chigangGrps:[],curplayerchairno:-1,CMD_ID_LOGIN:1e3,CMD_ID_CREATE_FKROOM:1001,CMD_ID_JOIN_FKROOM:1002,CMD_ID_READY:1003,CMD_ID_TABLEINFO:1004,CMD_ID_LOGIN_BY_WEIBO:1005,CMD_ID_GAME_WIN:1006,CMD_ID_OUTCARD:2e3,CMD_ID_CATCHCARD:2001,CMD_ID_GUOCARD:2002,CMD_ID_CHICARD:2003,CMD_ID_PENGCARD:2004,CMD_ID_GANGCARD:2005,CMD_ID_HUCARD:2006,STATUS_FREE:0,STATUS_HASONE_NO_PLAY:1,STATUS_PLAY:2,ACT_GUO:1,ACT_CHI:2,ACT_PENG:4,ACT_MINGGANG:8,ACT_BUGANG:16,ACT_ANGANG:32,ACT_TING:64,ACT_HUA:128,ACT_HU:256,MY_DRAWINDEX:1,WAITING_STATUS_TS_PLAYING:1,WAITING_STATUS_TS_WAITING_CATCH:2,WAITING_STATUS_TS_WAITING_OUT:4,WAITING_STATUS_TS_WAITING_QIANG_MINGGANG:8,WAITING_STATUS_TS_WAITING_QIANG_ANGANG:16,WAITING_STATUS_TS_WAITING_QIANG_BUGANG:32},cc._RF.pop()},{}],game:[function(e,t,a){"use strict";cc._RF.push(t,"f41ea2AMJtCVYG62ZQijnNE","game");var r=e("./common.js"),n=e("net");cc.Class({extends:cc.Component,properties:{label_tablenum:{default:null,type:cc.Label},node_selfhandcard:{default:null,type:cc.Node}},onLoad:function(){r.tablenum&&""!=r.tablenum&&(this.label_tablenum.string="房号 "+r.tablenum),this.initView(),this.freshPlayers();var e=this;r.socket&&(r.socket.onmessage=function(t){e.onmessage(t,e)}),e.showBtnsByPGCHFlags(e.getMyPlayer().dwPGCHFlags),cc.game.on(cc.game.EVENT_HIDE,function(){console.log("游戏进入后台")},this),cc.game.on(cc.game.EVENT_SHOW,function(){console.log("重新返回游戏"),this.onReqTableInfo()},this)},initView:function(){for(var e=1;e<=4;e++){var t=this.node.getChildByName("player"+e.toString());t&&(t.active=!1)}for(e=1;e<=4;e++)this.initHandCard(e);for(e=1;e<=4;e++)this.initCastOffCard2(e),this.initCPGCard2(e);var a=this.node.getChildByName("node_opt");a&&(a.active=!1);var r=this.node.getChildByName("result_layer");r&&(r.active=!1)},initCastOffCard2:function(e){var t=this.node.getChildByName("card_layer");if(t){var a=t.getChildByName("castoff"+e.toString()+"_2");if(a)for(var r=1;r<=54;r++){var n=a.getChildByName("node"+r.toString());n&&(n.active=!1)}}},initCPGCard2:function(e){var t=this.node.getChildByName("card_layer");if(t){var a=t.getChildByName("cpg"+e.toString()+"_2");if(a)for(var r=1;r<=4;r++){var n=a.getChildByName("node"+r.toString());if(n){n.active=!1;for(var i=1;i<=4;i++){var o=n.getChildByName("node_"+i.toString());o&&(o.active=!1)}}}}},initHandCard:function(e){var t=this.node.getChildByName("card_layer");if(t){var a=t.getChildByName("hand"+e.toString());if(a)for(var r=1;r<=14;r++){var n=a.getChildByName("node"+r.toString());n&&(n.active=!1)}}},onmessage:function(e,t){var a=e.data,n=JSON.parse(a),i=JSON.parse(n.data);n.cmd_id==r.CMD_ID_JOIN_FKROOM?t.onNotifyJoinRoom(i):n.cmd_id==r.CMD_ID_READY?t.onNotifyPlayerStart(i):n.cmd_id==r.CMD_ID_TABLEINFO?t.onNotifyTableinfo(i):n.cmd_id==r.CMD_ID_OUTCARD?t.onNotifyOutCard(i):n.cmd_id==r.CMD_ID_CATCHCARD?t.onNotifyCatchCard(i):n.cmd_id==r.CMD_ID_PENGCARD?t.onNotifyPengCard(i):n.cmd_id==r.CMD_ID_GAME_WIN&&t.onNotifyGameWin(i)},onNotifyGameWin:function(e){var t=this.node.getChildByName("result_layer");if(t){t.active=!0;for(var a=0;a<4;a++){(r=t.getChildByName("result_player_layer"+(a+1))).active=!1}for(a=0;a<e.playernum;a++){var r,n=e.players[a].name,i=e.players[a].scorediff,o=(e.players[a].handcards,e.players[a].cpgcards,e.players[a].gaintxt);e.players[a].uhu;(r=t.getChildByName("result_player_layer"+(a+1))).active=!0,r.getChildByName("name").getComponent(cc.Label).string=n,r.getChildByName("score").getComponent(cc.Label).string=i,r.getChildByName("gains").getComponent(cc.Label).string=o}}},onNotifyPengCard:function(e){var t=e.chairno,a=e.srcchair,n=e.grp;r.dwstatus=e.dwstatus,e.curplayer&&e.curplayer>=0&&(r.curplayerchairno=e.curplayer),this.onPlayerPengCard(t,a,n)},onPlayerPengCard:function(e,t,a){var n=this.node.getChildByName("card_layer"),i=this.getDrawIndexByChairNO(e);if(n&&i>0){var o=n.getChildByName("cpg"+i.toString()+"_2");if(o){var c=this.getPlayerByChairNO(e),s={};s.grp=a,s.actid=r.ACT_PENG,s.uSrcChair=t,c.cpgcards.push(s);var d=c.cpgcards.length,l=o.getChildByName("node"+d.toString());if(l){l.active=!0;for(var h=[],u=0;u<a.cardids.length;u++)a.cardids[u]>0&&h.push(a.cardids[u]);h.push(a.baseid);for(var f=1;f<=3;f++){var g=l.getChildByName("node_"+f.toString());if(g){g.active=!0;var C=g.getChildByName("sp_flower");if(C){var y=C.getComponent(cc.Sprite),m=this.getFlowerTexture(h[f-1]),_=new cc.SpriteFrame(m);y.spriteFrame=_}}}}}var p=[];for(u=0;u<a.cardids.length;u++)a.cardids[u]>0&&p.length<2&&p.push(a.cardids[u]);if(i==r.MY_DRAWINDEX){var N=this.getMyPlayer();N&&N.handcards&&(N.handcards.remove(p[0]),N.handcards.remove(p[1]),this.freshSelfHandCards(N.handcards))}else{(c=this.getPlayerByChairNO(e))&&(c.handcards.remove(p[0]),c.handcards.remove(p[1]),this.freshOtherHandCards(c.handcards,e))}}},onNotifyCatchCard:function(e){var t=e.cardid,a=e.chairno;this.onPlayerCatchCard(a,t)},onNotifyOutCard:function(e){var t=e.cardid,a=e.chairno,n=-1,i=-1;e.catchCardid&&(n=e.catchCardid),e.dwStatus&&(r.dwstatus=e.dwStatus),e.catchCardChairNO>=0?(i=e.catchCardChairNO,r.curplayerchairno=i):r.curplayerchairno=this.getNextChairNO(a);var o=e.dwPGCHFlags;this.onPlayerOutCard(a,t),n>0&&this.onPlayerCatchCard(i,n),o>0&&(this.showBtnsByPGCHFlags(o),r.chigangGrps=e.chigangGrps)},IS_BIT_SET:function(e,t){return t==(t&e)},onReqTableInfo:function(){(e={}).chairno=r.chairno,e.tablenum=r.tablenum;var e={cmd_id:r.CMD_ID_TABLEINFO,data:JSON.stringify(e)},t=JSON.stringify(e);n.check(),r.socket&&null!=r.socket&&r.socket.send(t)},onBtnGuo:function(){this.node.getChildByName("node_opt").active=!1;var e={};e.chairno=r.chairno,e.tablenum=r.tablenum;var t={cmd_id:r.CMD_ID_GUOCARD,data:JSON.stringify(e)},a=JSON.stringify(t);n.check(),r.socket&&null!=r.socket&&r.socket.send(a)},onBtnHu:function(){this.node.getChildByName("node_opt").active=!1;var e={};e.chairno=r.chairno,e.tablenum=r.tablenum;var t={cmd_id:r.CMD_ID_HUCARD,data:JSON.stringify(e)},a=JSON.stringify(t);n.check(),r.socket&&null!=r.socket&&r.socket.send(a)},onBtnChi:function(){if(this.node.getChildByName("node_opt").active=!1,r.chigangGrps.length>1)console.log("choose chi");else{var e={};e.chairno=r.chairno,e.tablenum=r.tablenum,e.grp=r.chigangGrps[0];var t={cmd_id:r.CMD_ID_CHICARD,data:JSON.stringify(e)},a=JSON.stringify(t);n.check(),r.socket&&null!=r.socket&&r.socket.send(a)}},onBtnPeng:function(){this.node.getChildByName("node_opt").active=!1;var e={};e.chairno=r.chairno,e.tablenum=r.tablenum;var t={cmd_id:r.CMD_ID_PENGCARD,data:JSON.stringify(e)},a=JSON.stringify(t);n.check(),r.socket&&null!=r.socket&&r.socket.send(a)},showBtnsByPGCHFlags:function(e){for(var t=!1,a=[r.ACT_CHI,r.ACT_PENG,r.ACT_ANGANG,r.ACT_MINGGANG,r.ACT_BUGANG,r.ACT_HU],n=[],i=0;i<a.length;i++)this.IS_BIT_SET(e,a[i])&&(t=!0,n.push(a[i]));if(1==t){n.push(r.ACT_GUO);var o=this.node.getChildByName("node_opt"),c=o.getChildByName("btn_guo"),s=o.getChildByName("btn_chi"),d=o.getChildByName("btn_peng"),l=o.getChildByName("btn_gang"),h=o.getChildByName("btn_hu");c.on("click",this.onBtnGuo,this),d.on("click",this.onBtnPeng,this),h.on("click",this.onBtnHu,this),s.on("click",this.onBtnChi,this),o.active=!0,c.active=!0,s.active=!1,d.active=!1,l.active=!1,h.active=!1;for(var u=1,f=c.getPosition().x,g=c.getPosition().y,C=0;C<n.length;C++)n[C]==r.ACT_CHI?(s.active=!0,s.setPosition(f-138*u,g),u++):n[C]==r.ACT_PENG?(d.active=!0,d.setPosition(f-138*u,g),u++):n[C]==r.ACT_ANGANG||n[C]==r.ACT_MINGGANG||n[C]==r.ACT_BUGANG?(l.active=!0,l.setPosition(f-138*u,g),u++):n[C]==r.ACT_HU&&(h.active=!0,h.setPosition(f-138*u,g),u++)}},freshCastOffCards:function(e,t){if(2==r.totalchairs){var a=this.node.getChildByName("card_layer");if(a){var n=a.getChildByName("castoff"+e.toString()+"_2");if(n)for(var i=0;i<=t.length;i++){var o=n.getChildByName("node"+(i+1).toString()),c=t[i];if(o&&c>0){o.active=!0;var s=o.getChildByName("node_castoff");if(s){var d=s.getChildByName("sp_flower");if(d){var l=d.getComponent(cc.Sprite),h=this.getFlowerTexture(c),u=new cc.SpriteFrame(h);l.spriteFrame=u}}}}}}},freshCPGCards:function(e,t){var a=this.node.getChildByName("card_layer");if(a&&e>0){var r=a.getChildByName("cpg"+e.toString()+"_2");if(r)for(var n=0;n<t.length;n++){var i=n+1,o=r.getChildByName("node"+i.toString());if(o){o.active=!0;for(var c=[],s=0;s<t[n].group.cardids.length;s++)t[n].group.cardids[s]>0&&c.push(t[n].group.cardids[s]);c.push(t[n].group.baseid);for(var d=1;d<=4;d++){var l=o.getChildByName("node_"+d.toString());if(l&&c[d-1]>0){l.active=!0;var h=l.getChildByName("sp_flower");if(h){var u=h.getComponent(cc.Sprite),f=this.getFlowerTexture(c[d-1]),g=new cc.SpriteFrame(f);u.spriteFrame=g}}}}}}},freshSelfHandCards:function(e){this.initHandCard(r.MY_DRAWINDEX);var t=this,a=e.sort(function(e,a){return t.getCardResIndex(a)-t.getCardResIndex(e)});if(a&&a.length>0){var n=2;r.curplayerchairno==r.chairno&&this.IS_BIT_SET(r.dwstatus,r.WAITING_STATUS_TS_WAITING_OUT)&&(n=1);for(var i=1;i<=a.length;i++){var o=n+i-1,c=this.node_selfhandcard.getChildByName("node"+o.toString()),s=a[i-1];if(c&&s>0){c.active=!0;var d=c.getChildByName("node_handcard1");if(d){d.cardid=s;var l=d.getChildByName("flower"),h=d.getChildByName("joker"),u=d.getChildByName("mask");if(l){var f=l.getComponent(cc.Sprite),g=this.getFlowerTexture(s),C=new cc.SpriteFrame(g);f.spriteFrame=C}h&&u&&(h.active=!1,u.active=!1)}}}}},freshOtherHandCards:function(e,t){this.initHandCard(this.getDrawIndexByChairNO(t));var a=this.getDrawIndexByChairNO(t);if(e&&e.length>0){var n=this.node.getChildByName("card_layer");if(n){var i=n.getChildByName("hand"+a.toString());if(i){var o=2;r.curplayerchairno==t&&(o=1);for(var c=1;c<=e.length;c++){var s=o+c-1,d=i.getChildByName("node"+s.toString());d&&(d.active=!0)}}}}},getMyPlayer:function(){for(var e=0;e<r.tableplayers.length;e++){var t=r.tableplayers[e];if(t.chairno==r.chairno)return t}return null},getPlayerByChairNO:function(e){for(var t=0;t<r.tableplayers.length;t++){var a=r.tableplayers[t];if(a.chairno==e)return a}return null},onPlayerOutCard:function(e,t){var a=this.getDrawIndexByChairNO(e);if(1==a){var n=this.getMyPlayer();n&&n.handcards&&(n.handcards.remove(t),this.freshSelfHandCards(n.handcards))}else if(a>=2&&a<=4){var i;if((i=this.getPlayerByChairNO(e))&&i.handcards&&i.handcards.remove(t),s=this.node.getChildByName("card_layer")){var o=s.getChildByName("hand"+a.toString());if(o){var c=o.getChildByName("node1");c&&(c.active=!1)}}}if(i=this.getPlayerByChairNO(e)){i.outcards.push(t);var s,d=i.outcards.length;if((s=this.node.getChildByName("card_layer"))&&2==r.totalchairs){var l=s.getChildByName("castoff"+a.toString()+"_2");if(l){var h=l.getChildByName("node"+d.toString());if(h&&t>0){h.active=!0;var u=h.getChildByName("node_castoff");if(u){var f=u.getChildByName("sp_flower");if(f){var g=f.getComponent(cc.Sprite),C=this.getFlowerTexture(t),y=new cc.SpriteFrame(C);g.spriteFrame=y}}}}}}},onPlayerCatchCard:function(e,t){var a=this.getDrawIndexByChairNO(e);if(1==a){var r=this.getMyPlayer();if(r&&r.handcards&&r.handcards.push(t),h=this.node.getChildByName("card_layer"))if(u=h.getChildByName("hand"+a.toString()))if(f=u.getChildByName("node1")){f.active=!0;var n=f.getChildByName("node_handcard1");if(n){n.cardid=t;var i=n.getChildByName("flower"),o=n.getChildByName("joker"),c=n.getChildByName("mask");if(i){var s=i.getComponent(cc.Sprite),d=this.getFlowerTexture(t),l=new cc.SpriteFrame(d);s.spriteFrame=l}o&&c&&(o.active=!1,c.active=!1)}}}else if(a>=2&&a<=4){var h,u,f,g=this.getPlayerByChairNO(e);if(g&&g.handcards&&g.handcards.push(t),h=this.node.getChildByName("card_layer"))if(u=h.getChildByName("hand"+a.toString()))(f=u.getChildByName("node1"))&&(f.active=!0)}},onNotifyJoinRoom:function(e){r.tableplayers=e.players,e.curplayer&&(r.curplayerchairno=e.curplayer),this.freshPlayers()},onNotifyTableinfo:function(e){r.tableplayers=e.players,e.curplayer>=0&&(r.curplayerchairno=e.curplayer),e.status>=0&&(r.tablestatus=e.status),e.dwstatus>=0&&(r.dwstatus=e.dwstatus),this.freshPlayers(),this.showBtnsByPGCHFlags(this.getMyPlayer().dwPGCHFlags)},onNotifyPlayerStart:function(e){var t=e.chairno;if(t==r.chairno){var a=this.node.getChildByName("node_start");if(a){var n=a.getChildByName("button");n&&(n.active=!1)}}var i=this.getDrawIndexByChairNO(t);if(i>=1&&i<=4){var o=this.node.getChildByName("player"+i.toString());if(o){var c=o.getChildByName("text_ready");c&&(c.active=!0)}}},update:function(e){},onBtnStart:function(){var e={};e.uid=r.uid,e.tablenum=r.tablenum;var t={cmd_id:r.CMD_ID_READY,data:JSON.stringify(e)},a=JSON.stringify(t);n.check(),r.socket&&null!=r.socket&&r.socket.send(a)},onBtnQuit:function(){cc.director.loadScene("hall")},onClickCard:function(e){var t=(e=e).target.parent,a=t.parent.parent;if(a)for(var i=0;i<a.childrenCount;i++){var o=a.children[i];t!=o.getChildByName("node_handcard1")&&(o.getChildByName("node_handcard1").y=0)}if(0==t.y)t.y=15;else if(t.y=0,n.check(),t.cardid&&null!=r.socket&&r.socket){var c={};c.chairno=r.chairno,c.tablenum=r.tablenum,c.cardid=t.cardid;var s={cmd_id:r.CMD_ID_OUTCARD,data:JSON.stringify(c)},d=JSON.stringify(s);r.socket.send(d)}},onClickBg:function(e){var t=this.node.getChildByName("card_layer");if(t){var a=t.getChildByName("hand1");if(a)for(var r=0;r<a.childrenCount;r++){a.children[r].getChildByName("node_handcard1").y=0}}},getNextChairNO:function(e){var t=r.totalchairs;return(e-1+t)%t},getNextDrawIndex:function(e){var t=r.totalchairs,a=(e-1+t)%t;return 0==a&&(a=t),2==t?a=1==e?3:1:3==t&&(a=1==e?4:2==e?1:2),a},getDrawIndexByChairNO:function(e){for(var t=1,a=r.chairno,n=1;n<=r.totalchairs&&a!=e;n++)t=this.getNextDrawIndex(t),a=this.getNextChairNO(a);return t},getFlowerTexture:function(e){var t="resources/card/flower/"+this.getCardResIndex(e).toString()+".png";return cc.url.raw(t)},calculateCardShape:function(e){return 0<e&&36>=e?1:36<e&&72>=e?2:72<e&&108>=e?3:108<e&&124>=e?4:124<e&&136>=e?5:136<e&&140>=e?6:140<e&&144>=e?7:144<e&&152>=e?8:0},calculateCardValue:function(e){return 0<e&&108>=e?(e-1)%9+1:108<e&&124>=e?(e-108-1)%4+1:124<e&&136>=e?(e-124-1)%3+1:136<e&&140>=e?e-136:140<e&&144>=e?e-140:144<e&&152>=e?e-144:0},getCardResIndex:function(e){var t=this.calculateCardShape(e),a=this.calculateCardValue(e),r=-1;return 1==t?r=a-1:2==t?r=8+a:3==t?r=17+a:4==t?r=26+a:5==t?r=30+a:6==t?r=33+a:7==t?r=37+a:8==t&&(r=41+a),r>46&&(r=46),r},freshPlayers:function(){for(var e=0;e<r.tableplayers.length;e++){var t=r.tableplayers[e],a=this.getDrawIndexByChairNO(t.chairno);if(t.chairno==r.chairno){var n=this.node.getChildByName("node_start");if(n){var i=n.getChildByName("button");i&&(1==t.ready||r.tablestatus==r.STATUS_PLAY?i.active=!1:i.active=!0)}this.freshSelfHandCards(t.handcards)}else this.freshOtherHandCards(t.handcards,t.chairno);var o=this.node.getChildByName("player"+a.toString());if(o){o.active=!0;var c=o.getChildByName("label_username");c&&(c.getComponent(cc.Label).string=t.username);var s=o.getChildByName("sprite");if(s&&t.avator&&""!=t.avator){var d="http://host805095635.s481.pppf.com.cn/CrossOrigin.php?url="+t.avator;cc.loader.load({url:d,type:"png"},function(e,t){var a=new cc.SpriteFrame;a.setTexture(t),s.spriteFrame=a})}var l=o.getChildByName("text_ready");l&&(1==t.ready?l.active=!0:l.active=!1)}this.freshCastOffCards(a,t.outcards),this.freshCPGCards(a,t.cpgcards)}}}),cc._RF.pop()},{"./common.js":"common",net:"net"}],hall:[function(e,t,a){"use strict";cc._RF.push(t,"952c7SYy4xH9L4FYuC69pza","hall");var r=e("./common.js"),n=e("net");cc.Class({extends:cc.Component,properties:{label:{default:null,type:cc.Label},headicon:{default:null,type:cc.Sprite},editbox_tablenum:{default:null,type:cc.EditBox},text:""},onLoad:function(){r.username&&""!=r.username&&(this.label.string=r.username);var e=this;if(r.socket&&(r.socket.onmessage=function(t){e.onmessage(t,e)}),r.avator&&""!=r.avator){var t="http://host805095635.s481.pppf.com.cn/CrossOrigin.php?url="+r.avator;cc.loader.load({url:t,type:"png"},function(t,a){var r=new cc.SpriteFrame;r.setTexture(a),e.headicon.spriteFrame=r})}},onmessage:function(e,t){var a=e.data,n=JSON.parse(a),i=JSON.parse(n.data);n.cmd_id==r.CMD_ID_CREATE_FKROOM&&t.onNotifyCreateRoom(i),n.cmd_id==r.CMD_ID_JOIN_FKROOM&&t.onNotifyJoinRoom(i),n.cmd_id==r.CMD_ID_TABLEINFO&&t.noNotifyTableInfo(i)},noNotifyTableInfo:function(e){e.banker>=0&&(r.banker=e.banker),e.curplayer>=0&&(r.curplayerchairno=e.curplayer),e.host>=0&&(r.tablehost=e.host),e.tablenum>=0&&(r.tablenum=e.tablenum),e.status>=0&&(r.tablestatus=e.status),e.dwstatus>=0&&(r.dwstatus=e.dwstatus),r.tableplayers=e.players;for(var t=0;t<r.tableplayers.length;t++){var a=r.tableplayers[t];a&&a.uid==r.uid&&(r.chairno=a.chairno)}cc.director.loadScene("game")},update:function(e){},onClickCreateRoom:function(){var e={uid:r.uid,username:r.username},t={cmd_id:r.CMD_ID_CREATE_FKROOM,data:JSON.stringify(e)},a=JSON.stringify(t);n.check(),r.socket&&null!=r.socket&&r.socket.send(a)},onClickJoinRoom:function(){var e=this.editbox_tablenum.string,t={uid:r.uid,username:r.username,tablenum:e},a={cmd_id:r.CMD_ID_JOIN_FKROOM,data:JSON.stringify(t)},i=JSON.stringify(a),o=this;n.check(),r.socket&&null!=r.socket&&(r.socket.onmessage=function(e){o.onmessage(e,o)},r.socket.send(i))},onNotifyCreateRoom:function(e){r.tablenum=e.tablenum,r.tablehost=e.host,r.tablestatus=e.status,r.tableplayers=e.players;for(var t=0;t<r.tableplayers.length;t++){var a=r.tableplayers[t];a&&a.uid==r.uid&&(r.chairno=a.chairno)}cc.director.loadScene("game")},onNotifyJoinRoom:function(e){r.tablenum=e.tablenum,r.tablehost=e.host,r.tablestatus=e.status,r.tableplayers=e.players,e.curplayer>=0&&(r.curplayerchairno=e.curplayer);for(var t=0;t<r.tableplayers.length;t++){var a=r.tableplayers[t];a&&a.uid==r.uid&&(r.chairno=a.chairno)}cc.director.loadScene("game")}}),cc._RF.pop()},{"./common.js":"common",net:"net"}],login:[function(e,t,a){"use strict";cc._RF.push(t,"27d52HPf1hMLI90JVqnpUZf","login");var r=e("common"),n=(e("hall"),e("net"));cc.Class({extends:cc.Component,properties:{label:{default:null,type:cc.Label},nameInput:{default:null,type:cc.EditBox},testSp:{default:null,type:cc.Sprite},text:"Hello!"},onLoad:function(){var e=this;n.connect(),r.socket&&(r.socket.onmessage=function(e){var t=e.data,a=JSON.parse(t),n=JSON.parse(a.data);a.cmd_id==r.CMD_ID_LOGIN&&null!=n.name&&""!=n.name&&(r.username=n.name,r.uid=n.uid,r.avator=n.avator,r.sex=n.sex,cc.director.loadScene("hall"))}),cc.director.setDisplayStats(!1),cc.loader.loadResDir("card",function(t,a){e.onLoadComplete(e,a)}),Array.prototype.shuffle||(Array.prototype.shuffle=function(){for(var e,t,a=this.length;a;e=parseInt(Math.random()*a),t=this[--a],this[a]=this[e],this[e]=t);return this}),Array.prototype.indexOf||(Array.prototype.indexOf=function(e){for(var t=0;t<this.length;t++)if(this[t]==e)return t;return-1}),Array.prototype.remove||(Array.prototype.remove=function(e){var t=this.indexOf(e);t>-1&&this.splice(t,1)})},onLoadComplete:function(e,t){console.log("load res complete");var a=this.GetQueryString("weiboid");if(a&&""!=a){var i={weiboid:a,password:123456},o={cmd_id:r.CMD_ID_LOGIN_BY_WEIBO,data:JSON.stringify(i)},c=JSON.stringify(o);n.check(),r.socket&&r.socket.send(c)}},update:function(e){},setCookie:function(e,t,a){var r=new Date;r.setDate(r.getDate()+a),document.cookie=e+"="+escape(t)+(null==a?"":";expires="+r.toGMTString())},getCookie:function(e){if(document.cookie.length>0){var t=document.cookie.indexOf(e+"=");if(-1!=t){t=t+e.length+1;var a=document.cookie.indexOf(";",t);return-1==a&&(a=document.cookie.length),unescape(document.cookie.substring(t,a))}}return""},GetQueryString:function(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),a=window.location.search.substr(1).match(t);return null!=a?unescape(a[2]):null},onClickLoginWeibo:function(){var e=this.getCookie("weiboid");if(e&&""!=e){var t={weiboid:e,password:123456},a={cmd_id:r.CMD_ID_LOGIN_BY_WEIBO,data:JSON.stringify(t)},i=JSON.stringify(a);n.check(),r.socket&&r.socket.send(i)}else cc.sys.openURL("https://api.weibo.com/oauth2/authorize?client_id=1662975332&response_type=code&redirect_uri=http://54.199.213.84")},onClickLogin:function(){var e={name:this.nameInput.string,password:123456},t={cmd_id:r.CMD_ID_LOGIN,data:JSON.stringify(e)},a=JSON.stringify(t);n.check(),r.socket&&r.socket.send(a)}}),cc._RF.pop()},{common:"common",hall:"hall",net:"net"}],net:[function(e,t,a){"use strict";cc._RF.push(t,"68bbaYsGjVNTYj5ltOWN+Ew","net");var r=e("./common.js"),n={connect:function(){var e=new WebSocket("ws://192.168.17.108:8001");r.socket=e,e.onopen=function(e){console.log("Send Text WS was opened.")},e.onmessage=function(e){console.log("response text msg: "+e.data)},e.onerror=function(e){console.log("Send Text fired an error")},e.onclose=function(e){console.log("WebSocket instance closed.")}},check:function(){null==r.socket&&n.connect()}};t.exports=n,cc._RF.pop()},{"./common.js":"common"}]},{},["HelloWorld","common","game","hall","login","net"]);