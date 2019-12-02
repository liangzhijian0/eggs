//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._nScaleBase = 0;
        _this.stars = new Array();
        _this.starIndex = 0;
        _this.texts = [["白色", "橙色", "粉红", "粉蓝"], ["春天", "夏天", "秋天", "冬天"], ["大海", "森林", "草原", "雪山"]];
        _this.answers = new Array();
        _this.starTextTopArray = [
            "你还记得我们第一次相识是什么时候吗？",
            "你在大学的第一个生日，我送了你一只Shirley和一大袋零食",
            "你的20岁生日，我觉得很重要",
            "我一直想送一双轮滑鞋给你，教你轮滑，一起携手滑翔",
            "你还记得在大四你生日的前一个晚上吗？",
            "现在想起来，觉得挺庆幸的",
            "2018年你的生日，我没有出现",
            "你说你喜欢去旅游",
            "你说最近的周末都过得很充实",
            "你说你很喜欢猫咪",
            "如果可以的话，我能承包你以后的生日吗？"
        ];
        _this.starTextTop = new egret.TextField();
        _this.starTextBelowArray = [
            "是2014年9月14日入学在课室的第一天。或许那天只是我注意到你，你还不知道我是谁",
            "重要的是那天晚上我骑着单车把你从广大载回宿舍，我在你心中的分数大大提高",
            "所以让你吃上了4个生日蛋糕，要比上一年的三个蛋糕多一个",
            "最后在2016年12月4日送了你一双高帮鞋子来代替轮滑鞋",
            "我喉咙痛发烧了，你陪我在医院打点滴差不多到凌晨。还好第二天康复了跟你在中心湖吃了个小蛋糕",
            "大学四年关于你的生日，我都有份参与",
            "很抱歉，那时是我做得不够好",
            "我第一次搭飞机，第一次出国都是跟你在一起的。接下来我会带你去更多的地方",
            "我们尝试做之前没做过的事情，相信不会被异地打败的",
            "现在我们有了多多儿子，我也会好好疼他的",
            "我会尽量给你惊喜，仪式感还是要有的"
        ];
        _this.starTextBelow = new egret.TextField();
        _this.nices = new Array();
        _this.isShowComplete = false;
        _this.sound = new egret.Sound();
        return _this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        this.runGame();
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [4 /*yield*/, RES.getResAsync("description_json")];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        RES.loadGroup("cake", 0);
                        return [4 /*yield*/, this.loadTheme()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 3:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        RES.loadGroup("star", 0);
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadTheme = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            var theme = new eui.Theme("resource/default.thm.json", _this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                resolve();
            }, _this);
        });
    };
    // private systemLeaf:particle.ParticleSystem;
    /**
     * 创建场景界面
     * Create scene interface
     */
    Main.prototype.createGameScene = function () {
        this.sound = RES.getRes("Beautiful Life_mp3");
        this.soundChannel = this.sound.play();
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.startMusic, this);
        this.bg = this.createBitmapByName("bg_jpg");
        this.addChild(this.bg);
        this.bg.x = this.stage.stageWidth / 2 - this.bg.width / 2 - 50;
        this.bg.y = this.stage.$stageHeight / 2 - this.bg.height / 2 - 200;
        this.bg.scaleX = this.bg.scaleY = 1;
        this.showStartText();
    };
    Main.prototype.startMusic = function () {
        var position = this.soundChannel.position ? this.soundChannel.position : 0;
        if (this.soundChannel) {
            this.soundChannel.stop();
        }
        this.soundChannel = this.sound.play(position);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.startMusic, this);
    };
    Main.prototype.showStartText = function () {
        var _this = this;
        var textfield = new egret.TextField();
        textfield.text = "其实我是一个能看穿事物的魔术师，我可以看穿一切，不信的话，你试试？";
        textfield.width = 400;
        textfield.alpha = 0;
        textfield.x = 50;
        textfield.y = 350;
        this.addChild(textfield);
        var tw = egret.Tween.get(textfield);
        tw.to({ "alpha": 1 }, 1500);
        tw.wait(4000);
        tw.call(function () {
            var tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 0 }, 1000);
            tw.wait(1000);
            tw.call(_this.showChoice, _this);
        }, this);
    };
    Main.prototype.showChoice = function () {
        var _this = this;
        var textfield = new egret.TextField();
        textfield.text = "以下请选出一个你最舒适的选项";
        textfield.width = 450;
        textfield.x = 80;
        textfield.y = 250;
        this.addChild(textfield);
        var buttons = new Array();
        var _loop_1 = function (i) {
            var button = new eui.Button();
            button.width = 200;
            button.height = 80;
            button.x = 50;
            button.y = 350 + i * 100;
            buttons.push(button);
            this_1.addChild(button);
            button.$addListener(egret.TouchEvent.TOUCH_END, function () {
                _this.answers.push(button.label);
                changeProblem();
            }, this_1);
        };
        var this_1 = this;
        for (var i = 0; i < this.texts[0].length; i++) {
            _loop_1(i);
        }
        var count = 0;
        var changeProblem = function () {
            if (count < _this.texts.length) {
                for (var j = 0; j < _this.texts[count].length; j++) {
                    buttons[j].label = _this.texts[count][j];
                    var tw = egret.Tween.get(buttons[j]);
                    tw.to({ "x": 200 }, 500);
                    tw.to({ "x": 100 }, 300);
                }
            }
            else if (count == _this.texts.length) {
                for (var j = 0; j < _this.texts[count - 1].length; j++) {
                    buttons[j].label = _this.texts[count - 1][j];
                    buttons[j].removeEventListener(egret.TouchEvent.TOUCH_END, function () { }, _this);
                    var tw_1 = egret.Tween.get(buttons[j]);
                    tw_1.to({ "alpha": 0 }, 500);
                }
                var tw = egret.Tween.get(textfield);
                tw.to({ "alpha": 0 }, 500);
                tw.call(_this.showCake, _this);
            }
            count++;
        };
        changeProblem();
    };
    Main.prototype.showCake = function () {
        var _this = this;
        var cake = this.createBitmapByName("cake_png");
        this.addChild(cake);
        cake.x = 500;
        cake.y = 500;
        cake.scaleX = cake.scaleY = 0.3;
        var tw = egret.Tween.get(cake);
        tw.to({ "x": 0 }, 1000);
        tw.call(function () {
            var textfield = new egret.TextField();
            textfield.text = "今天是你的生日，特意为你准备了一个小蛋糕，来吹个蜡烛叭";
            textfield.alpha = 0;
            textfield.width = 420;
            textfield.x = 100;
            textfield.y = 200;
            _this.addChild(textfield);
            var tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 1000);
            tw.wait(1000);
            tw.call(function () {
                _this.showTip();
                /*** 本示例关键代码段开始 ***/
                var texture = RES.getRes("ballParticle_png");
                var config = RES.getRes("ballParticle_json");
                _this.system = new particle.GravityParticleSystem(texture, config);
                _this.addChild(_this.system);
                _this.system.start();
                _this.system.x = _this.stage.stageWidth / 2;
                _this.system.y = _this.stage.$stageHeight / 2 - 70;
                _this.system.emitterX = 0;
                _this.system.emitterY = 0;
                _this.system.scaleX = _this.system.scaleY = 1.5;
                /*** 本示例关键代码段结束 ***/
                _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.blowTheCandle, _this);
            }, _this);
        }, this);
    };
    Main.prototype.showTip = function () {
        var tip = this.createBitmapByName("finger_png");
        tip.x = 480;
        tip.y = 400;
        tip.alpha = 0;
        tip.scaleX = tip.scaleY = 0.3;
        this.addChild(tip);
        var tw = egret.Tween.get(tip);
        tw.to({ "alpha": 0.5 }, 1000);
        tw.wait(1000);
        tw.to({ "alpha": 0 }, 1000);
    };
    Main.prototype.blowTheCandle = function () {
        var _this = this;
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.blowTheCandle, this);
        var monkey = this.createBitmapByName("monkey_png");
        this.addChild(monkey);
        monkey.x = -200;
        monkey.y = 350;
        monkey.scaleX = monkey.scaleY = 0.2;
        var tw = egret.Tween.get(monkey);
        tw.to({ "x": 0 }, 2000);
        //创建一个计时器对象
        var timer = new egret.Timer(3000, 1);
        //注册事件侦听器
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.stopFire, this);
        //开始计时
        timer.start();
        tw.wait(3000);
        tw.to({ "alpha": 0 }, 2000);
        timer = new egret.Timer(8000, 1);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function () {
            var bg = _this.createBitmapByName("bg10_jpg");
            _this.addChild(bg);
            bg.x = _this.stage.stageWidth / 2 - bg.width / 2 - 50;
            bg.y = _this.stage.$stageHeight / 2 - bg.height / 2 - 200;
            bg.scaleX = bg.scaleY = 1;
            bg.alpha = 0;
            _this.changeStage(_this.bg, bg);
        }, this);
        //开始计时
        timer.start();
    };
    Main.prototype.stopFire = function () {
        // let qi = this.createBitmapByName("qi_png");
        // this.addChild(qi);
        // qi.x = 100;
        // qi.y = 400;
        // qi.scaleX = qi.scaleY = 0.1;
        var qi = this.createBitmapByName("cloud_png");
        this.addChild(qi);
        qi.x = 0;
        qi.y = 350;
        this.system.stop();
        var tw = egret.Tween.get(qi);
        tw.to({ "alpha": 0 }, 2000);
    };
    Main.prototype.changeStage = function (bg1, bg2) {
        var _this = this;
        var tw1 = egret.Tween.get(bg1);
        tw1.to({ "alpha": 0 }, 2000);
        var tw2 = egret.Tween.get(bg2);
        tw2.to({ "alpha": 1 }, 2000);
        var timer = new egret.Timer(3000, 1);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function () {
            _this.startStar();
        }, this);
        timer.start();
    };
    Main.prototype.startStar = function () {
        var _this = this;
        this._rectScope = new egret.Rectangle(0, 300, 600, 300);
        for (var i = 0; i < Main.NUM; ++i) {
            var star = this.createBitmapByName("star_png");
            this.addChild(star);
            /// 给一个随机的初始位置
            star.x = this._rectScope.x + this._rectScope.width * Math.random();
            star.y = this._rectScope.y + this._rectScope.height * Math.random();
            star.scaleX = star.scaleY = Main.SCALE_BASE;
            this.stars.push(star);
            this.addChild(star);
        }
        // 产生动画
        this.stage.addEventListener(egret.Event.ENTER_FRAME, function (evt) {
            var scale = Main.SCALE_BASE + Math.abs(Math.sin(_this._nScaleBase += 0.03)) * Main.SCALE_RANGE;
            _this.stars[_this.starIndex].scaleX = _this.stars[_this.starIndex].scaleY = scale;
        }, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hidePicture, this);
        this.showTip();
    };
    Main.prototype.hidePicture = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hidePicture, this);
        if (this.starIndex > 0) {
            var index = this.isShowComplete ? this.starIndex : this.starIndex - 1;
            var tw = egret.Tween.get(this.nices[index]);
            tw.to({ "x": this.stars[index].x, "y": this.stars[index].y, "scaleX": 0, "scaleY": 0 }, 2000);
            var starTextTopTw = egret.Tween.get(this.starTextTop);
            starTextTopTw.to({ "alpha": 0 }, 2000);
            var starTextBelowTw = egret.Tween.get(this.starTextBelow);
            starTextBelowTw.to({ "alpha": 0 }, 2000);
            if (this.isShowComplete) {
                starTextBelowTw.call(this.showText, this);
            }
            else {
                starTextBelowTw.call(this.showPicture, this);
            }
        }
        else {
            this.addChild(this.starTextTop);
            this.addChild(this.starTextBelow);
            this.showPicture();
        }
    };
    Main.prototype.showPicture = function () {
        var _this = this;
        this.starTextTop.text = this.starTextTopArray[this.starIndex];
        this.starTextTop.width = 430;
        this.starTextTop.alpha = 0;
        this.starTextTop.x = 90;
        this.starTextTop.y = 200;
        var starTextTopTw = egret.Tween.get(this.starTextTop);
        starTextTopTw.to({ "alpha": 1 }, 1000);
        var change = function () {
            var nice = _this.createBitmapByName("material" + _this.starIndex + "_jpg");
            _this.addChild(nice);
            nice.x = _this.stars[_this.starIndex].x;
            nice.y = _this.stars[_this.starIndex].y;
            nice.width = nice.height = 0;
            _this.nices.push(nice);
            var tw = egret.Tween.get(nice);
            tw.to({ "x": 80, "y": 300, "width": 480, "height": 360 }, 2000);
            _this.starTextBelow.text = _this.starTextBelowArray[_this.starIndex];
            _this.starTextBelow.width = 430;
            _this.starTextBelow.alpha = 0;
            _this.starTextBelow.x = 90;
            _this.starTextBelow.y = 750;
            var starTextBelowTw = egret.Tween.get(_this.starTextBelow);
            starTextBelowTw.to({ "alpha": 1 }, 2000);
            _this.stars[_this.starIndex].scaleX = _this.stars[_this.starIndex].scaleY = Main.SCALE_BASE;
            if (_this.starIndex < Main.NUM - 1) {
                _this.starIndex++;
            }
            else {
                _this.isShowComplete = true;
            }
            var timer = new egret.Timer(2000, 1);
            timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function () {
                _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.hidePicture, _this);
            }, _this);
            timer.start();
        };
        starTextTopTw.call(change, this);
    };
    Main.prototype.showText = function () {
        var _this = this;
        var index = this.starIndex - 1;
        var tw = egret.Tween.get(this.nices[index]);
        tw.to({ "x": this.stars[index].x, "y": this.stars[index].y, "scaleX": 0, "scaleY": 0 }, 2000);
        this.removeChild(this.starTextTop);
        this.removeChild(this.starTextBelow);
        var textfields = new Array();
        var textArr = [
            [{ text: "我猜你还喜欢我", style: {} }],
            [{ text: "的作品", style: {} }],
            [{ text: "生日快乐！林小蚊", style: { "size": 50, "strokeColor": 0x6699cc, "stroke": 2 } }],
            [{ text: "支付宝吱口令红包输入(你在王者荣耀的名字)即可收获生日红包", style: {} }]
        ];
        textArr.unshift([
            { text: "\u6211\u731C,\u90A3\u4E48\u591A\u989C\u8272\u4E2D\uFF0C\u4F60\u5BF9" + this.answers[0] + "\u60C5\u6709\u72EC\u949F\u3002\u5728\u4E00\u5E74\u4E4B\u4E2D\uFF0C" + this.answers[1] + "\u662F\u4F60\u6700\u9700\u8981\u966A\u4F34\u7684\u5B63\u8282\u3002\u5982\u679C\u6709\u673A\u4F1A\uFF0C\u6211\u76F8\u4FE1\u4F60\u4E00\u5B9A\u5F88\u60F3\u53BB" + this.answers[2] + "\u770B\u770B\u3002\u6211\u662F\u4E0D\u662F\u731C\u7684\u5F88\u51C6?\u8FD8\u6709......", style: {} }
        ]);
        var waitTimeArr = [5000, 4000, 1000, 1000, 1000];
        var yArr = [0, 250, 350, 450, 550];
        var count = -1;
        for (var i = 0; i < textArr.length; i++) {
            var textfield = new egret.TextField();
            textfield.textFlow = textArr[i];
            textfield.width = 420;
            textfield.alpha = 0;
            textfield.x = 50;
            textfield.y = 50 + yArr[i];
            textfields.push(textfield);
            this.addChild(textfield);
        }
        var change = function () {
            count++;
            if (count < textArr.length) {
                var tw_2 = egret.Tween.get(textfields[count]);
                if (count == 0) {
                    tw_2.wait(1000);
                }
                tw_2.to({ "alpha": 1 }, 1500);
                if (count == 0) {
                    tw_2.wait(3000);
                    tw_2.call(function (change) {
                        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                            console.log(count);
                            if (count < textArr.length - 1) {
                                var tw_3 = egret.Tween.get(textfields[++count]);
                                tw_3.to({ "alpha": 1 }, 1500);
                            }
                        }, _this);
                    }, _this);
                }
                tw_2.wait(waitTimeArr[count]);
                tw_2.call(change, _this);
            }
        };
        change();
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    Main.SCALE_BASE = .5;
    Main.SCALE_RANGE = .5;
    Main.NUM = 11; // 星星数量
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map