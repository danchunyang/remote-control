window.__require=function o(e,t,n){function c(a,r){if(!t[a]){if(!e[a]){var h=a.split("/");if(h=h[h.length-1],!e[h]){var s="function"==typeof __require&&__require;if(!r&&s)return s(h,!0);if(i)return i(h,!0);throw new Error("Cannot find module '"+a+"'")}}var l=t[a]={exports:{}};e[a][0].call(l.exports,function(o){return c(e[a][1][o]||o)},l,l.exports,o,e,t,n)}return t[a].exports}for(var i="function"==typeof __require&&__require,a=0;a<n.length;a++)c(n[a]);return c}({block:[function(o,e,t){"use strict";cc._RF.push(e,"98670EmxSZFVa7ghj+SDBph","block"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){this.canTouch=!0,this.arrChildren=this.node.children},init:function(o,e,t){this.score=0,this.isPZ=!1,this.canTouch=!1,this.blockType=e,this.pos_dianParent=this.arrChildren[e].getChildByName("dian").getPosition();var n=cc.v2(o.x-this.pos_dianParent.x,o.y-this.pos_dianParent.y);this.node.setPosition(cc.v2(n.x,n.y+100));var c=cc.moveTo(.2,cc.v2(n.x,n.y-10)),i=cc.moveTo(.05,cc.v2(n.x,n.y+10)),a=cc.moveTo(.05,cc.v2(n.x,n.y-3)),r=cc.moveTo(.03,cc.v2(n.x,n.y)),h=cc.callFunc(function(){game.moveDir()},this),s=cc.sequence(c,i,a,r,h);t<3?(this.canTouch=!0,this.node.setPosition(n),1==t&&(this.score=1)):this.node.runAction(s),this.pos_dianWorld=o,this.setBlock()},playAnima:function(){var o=this.arrChildren[this.blockType].getChildByName("block").getComponent(cc.Animation);o&&o.play()},setBlock:function(){for(var o=this.node.children,e=0;e<o.length;e++)e==this.blockType?o[e].active=!0:o[e].active=!1},setDianPos:function(){this.canTouch=!0;var o=this.node.getPosition();this.pos_dianWorld=cc.v2(o.x+this.pos_dianParent.x,o.y+this.pos_dianParent.y)},touchBegin:function(o){this.node.scaleY=this.node.scaleY-o/6,this.node.scaleY<=.8&&(this.node.scaleY=.8),game.hero.scaleY=this.node.scaleY,game.hero.scaleX=game.hero.scaleX+o/10,game.hero.scaleX>=1.2&&(game.hero.scaleX=1.2),this.node.scaleY>.8&&(game.hero.y=game.hero.y-o/8*this.arrChildren[this.blockType].getChildByName("block").height)},touchEnd:function(){game.hero.scaleX=1,game.hero.scaleY=1;var o=1-this.node.scaleY,e=cc.scaleTo(o/5,1+o/2),t=cc.scaleTo(o/8,1-o/5),n=cc.scaleTo(o/10,1),c=cc.sequence(e,t,n);this.node.runAction(c)},update:function(o){}}),cc._RF.pop()},{}],game:[function(o,e,t){"use strict";cc._RF.push(e,"ffa3eJw2X5De59jMPVMkwxh","game"),cc.Class({extends:cc.Component,properties:{bg:cc.Node,nodeReady:cc.Node,nodePlay:cc.Node,nodePHB:cc.Node,nodeOver:cc.Node,itemParent:cc.Node,pre_item:cc.Prefab,pre_block:cc.Prefab,hero:cc.Node,hero_2:cc.Node,lab_score:cc.Label,lab_currScoreOver:cc.Label,lab_bestScoreOver:cc.Label,phOver:cc.Node,spa_touXiang:cc.SpriteAtlas,tx_score:cc.Label,tx_guangQuan:cc.Node,pre_dian:cc.Prefab,audio_score_1:cc.AudioClip,audio_score_2:cc.AudioClip,audio_fall:cc.AudioClip,audio_touch_1:cc.AudioClip,audio_touch_2:cc.AudioClip},onLoad:function(){window.game=this,this.nodeReady.active=!0,this.nodePlay.active=!1,this.nodePHB.active=!1,this.nodeOver.active=!1,this.nodeReady.zIndex=9,this.nodeOver.zIndex=9,this.nodePHB.zIndex=10,this.setInfor(),this.setTouch(),this.gameType=0,this.blockPool=new cc.NodePool,this.dianPool=new cc.NodePool,this.hero.active=!1,this.tx_score.node.opacity=0,this.tx_guangQuan.opacity=0,this.tx_guangQuan.zIndex=3,cc.director.getCollisionManager().enabled=!0,this.bg.color=new cc.Color(this.arrColorBg[0].r,this.arrColorBg[0].b,this.arrColorBg[0].g),this.setReady()},addScore:function(o){this.callBackGetScore&&this.unschedule(this.callBackGetScore);var e=o;if(2==o?(this.doubleScore=2*this.doubleScore,e=this.doubleScore,cc.audioEngine.play(this.audio_score_2,!1,1)):1==o&&(this.doubleScore=1,cc.audioEngine.play(this.audio_score_1,!1,1)),1==o||2==o){Math.random()<.1&&this.setRandomBgColor();for(var t=5+Math.floor(7*Math.random()),n=0;n<t;n++)this.createDian(this.hero.getPosition(),"end")}this.tx_score.string="+"+e,this.tx_score.node.opacity=255,this.tx_score.node.setPosition(cc.v2(this.hero.x,this.hero.y+100));var c=cc.moveBy(1,cc.v2(0,100)),i=cc.fadeOut(1),a=cc.spawn(c,i);if(this.tx_score.node.runAction(a),this.currScore+=e,this.lab_score.string=this.currScore,2==o){this.tx_guangQuan.setPosition(cc.v2(this.hero.x,this.hero.y+20)),this.tx_guangQuan.opacity=255,this.tx_guangQuan.scale=1;var r=cc.scaleTo(.5,5,2),h=cc.fadeOut(.5),s=cc.spawn(r,h);this.tx_guangQuan.runAction(s)}},txBlock:function(){for(var o=this,e=this.node.children,t=0,n=function(n){(i=e[n].getComponent("block"))&&2==++t&&i.blockType>18&&(o.callBackGetScore=function(){1==this.gameType&&(19==e[n].getComponent("block").blockType?this.addScore(5):20==e[n].getComponent("block").blockType?this.addScore(8):21==e[n].getComponent("block").blockType&&this.addScore(10),e[n].getComponent("block").playAnima())},o.scheduleOnce(o.callBackGetScore,3))},c=e.length-1;c>=0;c--){var i;n(c)}},createBlock:function(o,e,t){var n=null;(n=this.blockPool.size()>0?this.blockPool.get():cc.instantiate(this.pre_block)).parent=this.node,n.zIndex=2,n.getComponent("block").init(o,e,t)},onBlockKilled:function(o){this.blockPool.put(o)},createDian:function(o,e){var t=null;(t=this.dianPool.size()>0?this.dianPool.get():cc.instantiate(this.pre_dian)).parent=this.node,"start"==e?(t.zIndex=2,t.getComponent("txDian").init_1(o)):"end"==e&&(t.zIndex=3,t.getComponent("txDian").init_2(o))},cleanAllTXDian:function(){for(var o=this.node.children,e=o.length-1;e>=0;e--){o[e].getComponent("txDian")&&this.onDianKilled(o[e])}},onDianKilled:function(o){this.dianPool.put(o)},pdDir:function(){for(var o=[],e=this.node.children,t=e.length-1;t>=0;t--){var n=e[t].getComponent("block");n&&o.push(n.pos_dianWorld)}var c=o[0].sub(o[1]).normalize(),i=290+160*Math.random();10*Math.random()<5&&(c.x=-1*c.x);var a=cc.v2(o[0].x+c.x*i,o[0].y+c.y*i),r=Math.floor(22*Math.random());this.createBlock(a,r,3)},moveDir:function(){for(var o=this,e=[],t=this.node.children,n=t.length-1;n>=0;n--){(h=t[n].getComponent("block"))&&e.push(h.pos_dianWorld)}for(var c=cc.v2((e[0].x-e[1].x)/2,(e[0].y-e[1].y)/2),i=cc.v2(0-(e[1].x+c.x),-150-(e[1].y+c.y)),a=function(e){(h=t[e].getComponent("block"))&&(h.canTouch=!1,d=cc.moveBy(.5,cc.v2(i.x,i.y)),s=cc.callFunc(function(){t[e].getComponent("block").setDianPos()},o),l=cc.sequence(d,s),t[e].runAction(l))},r=t.length-1;r>=0;r--){var h,s,l;a(r)}var d=cc.moveBy(.5,cc.v2(i.x,i.y));this.hero.runAction(d);var u=cc.moveBy(.5,cc.v2(i.x,i.y));this.tx_score.node.runAction(u),this.txBlock(),cc.log(t.length)},canTouch:function(){for(var o=this.node.children,e=o.length-1;e>=0;e--){var t=o[e].getComponent("block");if(t&&0==t.canTouch)return!1}return!0},cleanBlock:function(){for(var o=this.node.children,e=o.length-1;e>=0;e--){var t=o[e].getComponent("block");t&&t.pos_dianWorld.y<-900&&this.onBlockKilled(o[e])}},setTouch:function(){this.node.on("touchstart",function(o){if(1==this.gameType&&0!=this.canTouch()&&0!=this.hero.getComponent("hero").canTouch){this.isTouchStart=!0,this.isGetScore=-1,this.hero.rotation=0,this.hero_2.active=!1,this.isTouchBegin=!0,this.timeTouch=0,this.audioTouch_1=cc.audioEngine.play(this.audio_touch_1,!1,1),this.callBackTouch_2=function(){this.audioTouch_2=cc.audioEngine.play(this.audio_touch_2,!0,1)},this.scheduleOnce(this.callBackTouch_2,cc.audioEngine.getDuration(this.audioTouch_1));for(var e=3+Math.floor(7*Math.random()),t=0;t<e;t++)this.createDian(this.hero.getPosition(),"start");this.callBacktxDian=function(){for(var o=3+Math.floor(7*Math.random()),e=0;e<o;e++)this.createDian(this.hero.getPosition(),"start")},this.schedule(this.callBacktxDian,.5),cc.log("touchstart")}},this),this.node.on("touchmove",function(o){1==this.gameType&&cc.log("touchmove")},this),this.node.on("touchend",function(o){if(0!=this.isTouchStart&&1==this.gameType&&0!=this.canTouch()&&0!=this.hero.getComponent("hero").canTouch){this.isTouchStart=!1,this.isTouchBegin=!1,cc.audioEngine.stop(this.audioTouch_1),cc.audioEngine.stop(this.audioTouch_2),this.callBackTouch_2&&this.unschedule(this.callBackTouch_2),this.cleanAllTXDian(),this.unschedule(this.callBacktxDian);for(var e=cc.v2(0,0),t=0,n=this.node.children,c=n.length-1;c>=0;c--){var i=n[c].getComponent("block");i&&(2==++t?i.touchEnd():1==t&&(e=i.pos_dianWorld))}var a=this.hero.getPosition(),r=e.sub(a).normalize(),h=8*this.timeTouch,s=cc.v2(a.x+r.x*h,a.y+r.y*h+this.hero.height/2),l=cc.callFunc(function(){this.hero.getComponent("hero").canTouch=!1,this.hero.anchorY=.5,this.hero.y=this.hero.y+this.hero.height/2}.bind(this)),d=cc.jumpTo(.4,s,200,1),u=cc.rotateBy(.4,360),m=cc.rotateBy(.4,-360),g=cc.callFunc(function(){this.hero.anchorY=0,this.hero.y=this.hero.y-this.hero.height/2,this.hero_2.active=!0,this.scheduleOnce(function(){if(-1==this.isGetScore){this.hero_2.active=!1,cc.log("\u8e29\u7a7a\u6b7b\u4ea1"),this.gameType=2;for(var o=this.node.children,e=[],t=o.length-1;t>=0;t--){o[t].getComponent("block")&&e.push(t)}var n=o[e[0]].getComponent("block").pos_dianWorld,c=o[e[1]].getComponent("block").pos_dianWorld,i=this.hero.getPosition();i.x>n.x&&i.x>c.x?o[e[0]].zIndex=5:i.x<n.x&&i.x<c.x?o[e[0]].zIndex=5:o[e[1]].zIndex=5;var a=cc.moveBy(.5,cc.v2(0,-75)),r=cc.callFunc(function(){this.gameOver()}.bind(this));this.hero.runAction(cc.sequence(a,r))}else 0==this.isGetScore&&cc.log("\u6ed1\u5230\u6b7b\u4ea1");this.pdCreateBlock(),this.hero.getComponent("hero").canTouch=!0},.1)}.bind(this));if(r.x>0){var p=cc.spawn(d,u),v=cc.sequence(l,p,g);this.hero.runAction(v)}else{var f=cc.spawn(d,m);v=cc.sequence(l,f,g);this.hero.runAction(v)}cc.log("touchend")}},this)},gameOver:function(){cc.audioEngine.play(this.audio_fall,!1,1),this.lab_currScoreOver.string=this.currScore,null==(e=cc.sys.localStorage.getItem("bestScore"))?(e=this.currScore,cc.sys.localStorage.setItem("bestScore",e)):e<this.currScore&&(e=this.currScore,cc.sys.localStorage.setItem("bestScore",e)),this.lab_bestScoreOver.string="History highest\uff1a"+e,this.nodeOver.active=!0;for(var o=0;o<this.arr_infor.length;o++)if("me"==this.arr_infor[o].name){var e=cc.sys.localStorage.getItem("bestScore");this.arr_infor[o].score=e}this.setPhOver()},pdCreateBlock:function(){for(var o=this.node.children,e=o.length-1;e>=0;e--){var t=o[e].getComponent("block");if(t)return void(t.isPZ&&(this.cleanBlock(),this.pdDir()))}},compare:function(o){return function(e,t){var n=e[o];return t[o]-n}},addItem:function(o){this.itemParent.removeAllChildren();for(var e=0;e<this.arr_infor.length;e++)if("me"==this.arr_infor[e].name){var t=cc.sys.localStorage.getItem("bestScore");null==t?(t=0,cc.sys.localStorage.setItem("bestScore",t)):t=cc.sys.localStorage.getItem("bestScore"),this.arr_infor[e].score=t}this.arr_infor.sort(this.compare("score")),cc.log(this.arr_infor);var n=(i=cc.instantiate(this.pre_item)).height;this.itemParent.height=n*o;for(var c=0;c<o;c++){var i;(i=cc.instantiate(this.pre_item)).parent=this.itemParent;var a=i.getComponent("item");if(a){var r=this.arr_infor[c].name,h=this.arr_infor[c].score,s=this.arr_infor[c].touXiang;a.init(c+1,r,h,s)}i.y=-48-c*n}},setPhOver:function(){var o=0;this.arr_infor.sort(this.compare("score"));for(var e=0;e<this.arr_infor.length;e++)if("me"==this.arr_infor[e].name){o=e+1;var t=cc.sys.localStorage.getItem("bestScore");this.phOver.getChildByName("node_1").getChildByName("label_mingci").getComponent(cc.Label).string=o,this.phOver.getChildByName("node_1").getChildByName("label_score").getComponent(cc.Label).string=t;break}var n=o-1;this.phOver.getChildByName("node_2").getChildByName("label_mingci").getComponent(cc.Label).string=n,this.phOver.getChildByName("node_2").getChildByName("label_score").getComponent(cc.Label).string=this.arr_infor[n-1].score,this.phOver.getChildByName("node_2").getChildByName("label_name").getComponent(cc.Label).string=this.arr_infor[n-1].name,this.phOver.getChildByName("node_2").getChildByName("sp_tx").getComponent(cc.Sprite).spriteFrame=this.spa_touXiang.getSpriteFrame("tou_"+this.arr_infor[n-1].touXiang);var c=o+1;this.phOver.getChildByName("node_3").getChildByName("label_mingci").getComponent(cc.Label).string=c,this.phOver.getChildByName("node_3").getChildByName("label_score").getComponent(cc.Label).string=this.arr_infor[c-1].score,this.phOver.getChildByName("node_3").getChildByName("label_name").getComponent(cc.Label).string=this.arr_infor[c-1].name,this.phOver.getChildByName("node_3").getChildByName("sp_tx").getComponent(cc.Sprite).spriteFrame=this.spa_touXiang.getSpriteFrame("tou_"+this.arr_infor[c-1].touXiang)},clickBtn:function(o,e){"play"==e?(cc.log("\u70b9\u51fb\u4e86\u5f00\u59cb\u6309\u94ae"),this.cleanAllblock(),this.unschedule(this.callBackHeroJump),this.doubleScore=1,this.isTouchStart=!1,this.currScore=0,this.lab_score.string=this.currScore,this.gameType=1,this.nodePlay.active=!0,this.nodeReady.active=!1,this.hero.active=!0,this.hero.zIndex=4,this.setHeroAct(cc.v2(-140,-140)),this.createBlock(cc.v2(-140,-140),0,1),this.createBlock(cc.v2(110,32),1,2)):"phb"==e?(cc.log("\u70b9\u51fb\u4e86\u6392\u884c\u699c\u6309\u94ae"),this.addItem(50),this.nodePHB.active=!0):"closePhb"==e?(cc.log("\u70b9\u51fb\u4e86\u6392\u884c\u699c\u5173\u95ed\u6309\u94ae"),this.nodePHB.active=!1):"btnRePlay"==e?(this.cleanAllblock(),this.doubleScore=1,this.nodeOver.active=!1,this.currScore=0,this.lab_score.string=this.currScore,this.gameType=1,this.hero.zIndex=4,this.hero.rotation=0,this.setHeroAct(cc.v2(-140,-140)),this.createBlock(cc.v2(-140,-140),0,1),this.createBlock(cc.v2(110,32),1,2)):"btnphbOver"==e&&(this.addItem(50),this.nodePHB.active=!0)},setHeroAct:function(o){this.hero.stopAllActions(),this.hero.scale=1,this.hero.rotation=0,this.hero.anchorY=0,this.hero.setPosition(cc.v2(o.x,o.y+200));var e=cc.callFunc(function(){this.hero.getComponent("hero").canTouch=!1}.bind(this)),t=cc.moveTo(.2,cc.v2(o.x,o.y-10)),n=cc.moveTo(.08,cc.v2(o.x,o.y+50)),c=cc.moveTo(.07,cc.v2(o.x,o.y-5)),i=cc.moveTo(.06,cc.v2(o.x,o.y+10)),a=cc.moveTo(.03,cc.v2(o.x,o.y)),r=cc.callFunc(function(){this.hero.getComponent("hero").canTouch=!0}.bind(this)),h=cc.sequence(e,t,n,c,i,a,r);this.hero.runAction(h)},cleanAllblock:function(){for(var o=this.node.children,e=o.length-1;e>=0;e--){o[e].getComponent("block")&&(o[e].stopAllActions(),this.onBlockKilled(o[e]))}},update:function(o){if(this.isTouchBegin){this.timeTouch++,this.timeTouch>=400&&(this.timeTouch=400);for(var e=0,t=this.node.children,n=t.length-1;n>=0;n--){var c=t[n].getComponent("block");c&&2==++e&&c.touchBegin(o)}}},setRandomBgColor:function(){var o=Math.floor(6*Math.random()),e=cc.tintTo(.1,this.arrColorBg[o].r,this.arrColorBg[o].g,this.arrColorBg[o].b);this.bg.runAction(e)},setReady:function(){this.hero.active=!0,this.hero_2.active=!1,this.hero.zIndex=4,this.setHeroAct(cc.v2(-140,-140)),this.createBlock(cc.v2(-140,-140),0,1),this.createBlock(cc.v2(110,32),1,2),this.callBackHeroJump=function(){this.herojunmReady()},this.schedule(this.callBackHeroJump,3)},herojunmReady:function(){for(var o=cc.v2(0,0),e=this.node.children,t=e.length-1;t>=0;t--){var n=e[t].getComponent("block");if(n){o=n.pos_dianWorld;break}}var c=this.hero.getPosition(),i=o.sub(c).normalize(),a=cc.v2(o.x,o.y+this.hero.height/2),r=cc.callFunc(function(){this.hero.anchorY=.5,this.hero.y=this.hero.y+this.hero.height/2}.bind(this)),h=cc.jumpTo(.4,a,200,1),s=cc.rotateBy(.4,360),l=cc.rotateBy(.4,-360),d=cc.callFunc(function(){this.hero.anchorY=0,this.hero.y=this.hero.y-this.hero.height/2,this.cleanBlock(),this.pdDir()}.bind(this));if(i.x>0){var u=cc.spawn(h,s),m=cc.sequence(r,u,d);this.hero.runAction(m)}else{var g=cc.spawn(h,l);m=cc.sequence(r,g,d);this.hero.runAction(m)}},setInfor:function(){this.arrColorBg=[{r:191,g:192,b:201},{r:244,g:220,b:216},{r:198,g:224,b:211},{r:242,g:215,b:171},{r:165,g:191,b:216},{r:231,g:219,b:222}],this.arr_infor=[{name:"Lcx",touXiang:0,score:1003},{name:"Keke",touXiang:1,score:1002},{name:"me",touXiang:2,score:1001},{name:"Ydc",touXiang:3,score:Math.round(1e3*Math.random())},{name:"Msq",touXiang:4,score:Math.round(1e3*Math.random())},{name:"Dbx",touXiang:5,score:Math.round(1e3*Math.random())},{name:"Zzh",touXiang:6,score:Math.round(1e3*Math.random())},{name:"Zqq",touXiang:7,score:Math.round(1e3*Math.random())},{name:"Qcz",touXiang:8,score:Math.round(1e3*Math.random())},{name:"Cyy",touXiang:9,score:Math.round(1e3*Math.random())},{name:"Lmy",touXiang:10,score:Math.round(1e3*Math.random())},{name:"Qrt",touXiang:11,score:Math.round(1e3*Math.random())},{name:"Yyc",touXiang:12,score:Math.round(1e3*Math.random())},{name:"Cjm",touXiang:13,score:Math.round(1e3*Math.random())},{name:"Zbm",touXiang:14,score:Math.round(1e3*Math.random())},{name:"Yxy",touXiang:15,score:Math.round(1e3*Math.random())},{name:"Ydc",touXiang:16,score:Math.round(1e3*Math.random())},{name:"Fsq",touXiang:17,score:Math.round(1e3*Math.random())},{name:"Zyw",touXiang:18,score:Math.round(1e3*Math.random())},{name:"Jzh",touXiang:19,score:Math.round(1e3*Math.random())},{name:"Woo",touXiang:20,score:Math.round(500*Math.random())},{name:"Seon",touXiang:21,score:Math.round(500*Math.random())},{name:"Xh55",touXiang:22,score:Math.round(500*Math.random())},{name:"Limo",touXiang:23,score:0},{name:"Anna",touXiang:24,score:Math.round(500*Math.random())},{name:"Anlin",touXiang:25,score:Math.round(500*Math.random())},{name:"Space",touXiang:26,score:Math.round(500*Math.random())},{name:"Luckin",touXiang:27,score:Math.round(500*Math.random())},{name:"Christmas",touXiang:28,score:Math.round(500*Math.random())},{name:"Aroundtrip",touXiang:29,score:Math.round(500*Math.random())},{name:"Uroom",touXiang:30,score:Math.round(500*Math.random())},{name:"Dessert",touXiang:31,score:Math.round(500*Math.random())},{name:"Xcustom",touXiang:32,score:Math.round(500*Math.random())},{name:"Sola",touXiang:33,score:Math.round(500*Math.random())},{name:"Youthea",touXiang:34,score:Math.round(500*Math.random())},{name:"Metoo",touXiang:35,score:Math.round(500*Math.random())},{name:"Carmen",touXiang:36,score:Math.round(500*Math.random())},{name:"Zero",touXiang:37,score:Math.round(100*Math.random())},{name:"Rtin",touXiang:38,score:Math.round(110*Math.random())},{name:"Daygo",touXiang:39,score:Math.round(100*Math.random())},{name:"Mxkg",touXiang:40,score:Math.round(100*Math.random())},{name:"Mini",touXiang:41,score:Math.round(100*Math.random())},{name:"Myfashion",touXiang:42,score:Math.round(100*Math.random())},{name:"Leona",touXiang:43,score:Math.round(100*Math.random())},{name:"Elly",touXiang:44,score:Math.round(100*Math.random())},{name:"Liag",touXiang:45,score:Math.round(100*Math.random())},{name:"Lamb",touXiang:46,score:Math.round(100*Math.random())},{name:"Kixdream",touXiang:47,score:Math.round(100*Math.random())},{name:"Lopping",touXiang:48,score:Math.round(100*Math.random())},{name:"Grover",touXiang:49,score:Math.round(10*Math.random())}]}}),cc._RF.pop()},{}],hero_2:[function(o,e,t){"use strict";cc._RF.push(e,"44effWo3htPV7NbML6JkmMv","hero_2"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){},onCollisionEnter:function(o,e){var t=o.node.parent.getComponent("block");if(t&&(0==t.score&&(10==o.tag&&1e3==e.tag?(t.score=2,t.isPZ=!0,game.addScore(2),cc.log("\u5f97\u4e24\u5206")):11==o.tag&&1e3==e.tag&&(t.score=1,t.isPZ=!0,game.addScore(1),cc.log("\u5f97yi\u5206"))),-1==game.isGetScore))if(10==o.tag&&1e3==e.tag)game.isGetScore=2,cc.log("2222222222222222");else if(11==o.tag&&1e3==e.tag)game.isGetScore=1,cc.log("1111111111111111");else if(11==o.tag&&1001==e.tag){game.isGetScore=0;var n=t.pos_dianWorld,c=game.hero.getPosition();if(n.sub(c).x>0){game.gameType=2;var i=cc.rotateTo(.5,30),a=cc.callFunc(function(){game.gameOver()}.bind(this));game.hero.runAction(cc.sequence(i,a))}else{game.gameType=2;i=cc.rotateTo(.5,-30),a=cc.callFunc(function(){game.gameOver()}.bind(this));game.hero.runAction(cc.sequence(i,a))}cc.log(n),cc.log(c),cc.log("hero\u6ed1\u5230")}}}),cc._RF.pop()},{}],hero:[function(o,e,t){"use strict";cc._RF.push(e,"aa85eNaaNtOGpF1ACK/Kg77","hero"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){this.canTouch=!0}}),cc._RF.pop()},{}],item:[function(o,e,t){"use strict";cc._RF.push(e,"56978FN/VVK06Z/ZFIHcua5","item"),cc.Class({extends:cc.Component,properties:{lab_num:cc.Label,lab_name:cc.Label,lab_score:cc.Label,sp_touxinag:cc.Sprite,spf_bg:cc.SpriteFrame,spa_touXiang:cc.SpriteAtlas},onLoad:function(){},init:function(o,e,t,n){this.lab_num.string=o,this.lab_name.string=e,this.lab_score.string=t,o%2==0&&(this.node.getComponent(cc.Sprite).spriteFrame=this.spf_bg),this.sp_touxinag.spriteFrame=this.spa_touXiang.getSpriteFrame("tou_"+n)},update:function(o){}}),cc._RF.pop()},{}],txDian:[function(o,e,t){"use strict";cc._RF.push(e,"3c9ecJr6O1Mdq/5MNZBbfqy","txDian"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){},init_1:function(o){this.node.stopAllActions();var e=Math.floor(256*Math.random()),t=Math.floor(256*Math.random()),n=Math.floor(256*Math.random());Math.random()<.6&&(e=255,t=255,n=255),this.node.color=new cc.Color(e,t,n);var c=o.x-150,i=o.y-50,a=cc.v2(c+300*Math.random(),i+250*Math.random());this.node.setPosition(a),this.node.scale=.5+.5*Math.random();var r=cc.moveTo(.3+100*Math.random()*.005,o),h=cc.callFunc(function(){game.onDianKilled(this.node)}.bind(this)),s=cc.sequence(r,h);this.node.runAction(s)},init_2:function(o){this.node.stopAllActions();var e=Math.floor(256*Math.random()),t=Math.floor(256*Math.random()),n=Math.floor(256*Math.random());Math.random()<.6&&(e=255,t=255,n=255),this.node.color=new cc.Color(e,t,n);var c=o.x-120,i=cc.v2(c+240*Math.random(),o.y+150*Math.random());this.node.setPosition(o),this.node.scale=.3+.3*Math.random();var a=cc.moveTo(.3+100*Math.random()*.002,i),r=cc.callFunc(function(){game.onDianKilled(this.node)}.bind(this)),h=cc.sequence(a,r);this.node.runAction(h)},update:function(o){}}),cc._RF.pop()},{}]},{},["block","game","hero","hero_2","item","txDian"]);