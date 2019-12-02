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

class Main extends eui.UILayer {

    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());


        this.runGame()
    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json")
    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            RES.loadGroup("cake", 0);
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
            RES.loadGroup("star", 0);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }

    private textfield: egret.TextField;
    private system:particle.ParticleSystem;
    private static SCALE_BASE:number = .5;
    private static SCALE_RANGE:number = .5;
    private _nScaleBase:number = 0; 
    private stars:Array<egret.Bitmap> = new Array<egret.Bitmap>();
    private static NUM:number = 11; // 星星数量
    private _rectScope:egret.Rectangle; /// 星星出现的范围（确保不出屏幕
    private starIndex:number = 0;
    private bg:egret.Bitmap;
    private texts = [["白色","橙色","粉红","粉蓝"],["春天","夏天","秋天","冬天"],["大海","森林","草原","雪山"]];
    private answers = new Array<String>();
    private starTextTopArray = [
        "你还记得我们第一次相识是什么时候吗？",
        "你在大学的第一个生日，我送了你一只Shirley和一大袋零食",
        "你的20岁生日，我觉得很重要",
        "我一直想送一双轮滑鞋给你，教你轮滑，一起携手滑翔",
        "你还记得在大四你生日的前一个晚上吗？",
        "现在想起来，觉得挺庆幸的",
        "2018年你的生日，我没有出现",
        "你说过喜欢去旅游",
        "你说最近的周末都过得很充实",
        "你说你很喜欢猫咪",
        "如果可以的话，我能承包你以后的生日吗？"
   ];
    private starTextTop: egret.TextField = new egret.TextField();
    private starTextBelowArray = [
        "是2014年9月14日入学的第一天。或许那天只是我注意到你，你还不知道我是谁",
        "重要的是那天晚上我骑着单车把你从广大载回宿舍，我在你心中的分数大大提高",
        "所以让你吃上了4个生日蛋糕，要比上一年的三个蛋糕多一个",
        "最后在2016年12月4日送了你一双高帮鞋子来代替轮滑鞋",
        "我喉咙痛发烧了，你陪我在医院打点滴差不多到凌晨。还好第二天康复了跟你在中心湖吃了个小蛋糕",
        "大学四年关于你的生日，我都有份参与",
        "很抱歉，那时是我做得不够好",
        "我的第一次搭飞机，第一次出国都是跟你在一起。接下来会带你去更多的地方",
        "我们尝试做之前没做过的事情，相信不会被异地打败的",
        "现在我们有了多多儿子，我也会好好疼他的",
        "我会尽量给你惊喜，仪式感还是要有的"
    ];
    private starTextBelow: egret.TextField = new egret.TextField();
    private nices = new Array<any>();
    private isShowComplete = false;
    private sound: egret.Sound = new egret.Sound();
    private soundChannel: egret.SoundChannel;

    // private systemLeaf:particle.ParticleSystem;
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected createGameScene(): void {
        this.sound = RES.getRes("Beautiful Life_mp3");
        this.soundChannel = this.sound.play();
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.startMusic,this)

        this.bg = this.createBitmapByName("bg_jpg");
        this.addChild(this.bg);
        this.bg.x = this.stage.stageWidth / 2 - this.bg.width / 2 - 50;
        this.bg.y = this.stage.$stageHeight / 2 - this.bg.height / 2 - 200;
        this.bg.scaleX = this.bg.scaleY = 1;
        this.showStartText();
    }

    private startMusic() {
        let position = this.soundChannel.position?this.soundChannel.position:0;
        if (this.soundChannel) {
            this.soundChannel.stop();
        }
        this.soundChannel = this.sound.play(position);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.startMusic,this)
    }

    private showStartText() {
        let textfield: egret.TextField = new egret.TextField();
        textfield.text = "其实我是一个能看穿事物的魔术师，我可以看穿一切，不信的话，你试试？";
        textfield.width = 400;
        textfield.alpha = 0;
        textfield.x = 50;
        textfield.y = 350;
        this.addChild(textfield);
        let tw = egret.Tween.get(textfield);
        tw.to({ "alpha": 1 }, 1500);
        tw.wait(4000);
        tw.call(()=>{
            let tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 0 }, 1000);
            tw.wait(1000);
            tw.call(this.showChoice,this)
        },this)
    }

    private showChoice() {
        let textfield: egret.TextField = new egret.TextField();
        textfield.text = "以下请选出一个你最舒适的选项";
        textfield.width = 450;
        textfield.x = 80;
        textfield.y = 250;
        this.addChild(textfield);
        let buttons = new Array<eui.Button>();
        for(let i = 0; i < this.texts[0].length; i++) {
            let button = new eui.Button();
            button.width = 200;
            button.height = 80;
            button.x = 50;
            button.y = 350 + i *100;
            buttons.push(button);
            this.addChild(button);
            button.$addListener(egret.TouchEvent.TOUCH_END,()=> {
                this.answers.push(button.label)
                changeProblem()
            },this)
        }
        let count = 0;
        let changeProblem = () => {
            if (count < this.texts.length) {
                for (let j = 0; j < this.texts[count].length; j++) {
                    buttons[j].label = this.texts[count][j];
                    let tw = egret.Tween.get(buttons[j]);
                    tw.to({ "x":  200}, 500);
                    tw.to({ "x": 100 }, 300);
                }
            } else if(count == this.texts.length) {
                for (let j = 0; j < this.texts[count-1].length; j++) {
                    buttons[j].label = this.texts[count-1][j];
                    buttons[j].removeEventListener(egret.TouchEvent.TOUCH_END,()=>{},this)
                    let tw = egret.Tween.get(buttons[j]);
                    tw.to({ "alpha":  0}, 500);
                }
                let tw = egret.Tween.get(textfield);
                tw.to({ "alpha":  0}, 500);
                tw.call(this.showCake,this);
            }
            count++
        }
        changeProblem()
        
    }

    private showCake() {
        let cake = this.createBitmapByName("cake_png");
        this.addChild(cake);
        cake.x = 500;
        cake.y = 500;
        cake.scaleX =cake.scaleY = 0.3;

        let tw = egret.Tween.get(cake);
        tw.to({ "x":  0}, 1000);
        tw.call(()=>{
            let textfield = new egret.TextField();
            textfield.text = "今天是你的生日，特意为你准备了一个小蛋糕，来吹个蜡烛叭";
            textfield.alpha = 0;
            textfield.width = 420;
            textfield.x = 100;
            textfield.y = 200;
            this.addChild(textfield);
            let tw = egret.Tween.get(textfield);
            tw.to({ "alpha":  1}, 1000);
            tw.wait(1000);
            tw.call(()=>{
                this.showTip();
                /*** 本示例关键代码段开始 ***/
                let texture = RES.getRes("ballParticle_png");
                let config = RES.getRes("ballParticle_json");
                this.system = new particle.GravityParticleSystem(texture, config);
                this.addChild(this.system);
                this.system.start();
                this.system.x = this.stage.stageWidth / 2;
                this.system.y = this.stage.$stageHeight / 2 - 70;
                this.system.emitterX = 0;
                this.system.emitterY = 0;
                this.system.scaleX = this.system.scaleY = 1.5;
                /*** 本示例关键代码段结束 ***/
                this.addEventListener(egret.TouchEvent.TOUCH_END,this.blowTheCandle,this);
            },this)
        },this)
        
        
    }

    private showTip() {
        let tip = this.createBitmapByName("finger_png");
        tip.x = 480;
        tip.y = 400;
        tip.alpha = 0;
        tip.scaleX = tip.scaleY = 0.3;
        this.addChild(tip);
        let tw = egret.Tween.get(tip);
        tw.to({ "alpha":  0.5}, 1000);
        tw.wait(1000);
        tw.to({ "alpha":  0}, 1000);
    }

    private blowTheCandle() {
        this.removeEventListener(egret.TouchEvent.TOUCH_END,this.blowTheCandle,this);
        let monkey = this.createBitmapByName("monkey_png");
        this.addChild(monkey);
        monkey.x = -200;
        monkey.y = 350;
        monkey.scaleX = monkey.scaleY = 0.2;
        let tw = egret.Tween.get(monkey);
        tw.to({ "x": 0 }, 2000);
        //创建一个计时器对象
        let timer:egret.Timer = new egret.Timer(3000,1);
        //注册事件侦听器
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.stopFire,this);
        //开始计时
        timer.start();
        tw.wait(3000);
        tw.to({ "alpha": 0 }, 2000);
        timer = new egret.Timer(8000,1);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, () => {
            let bg = this.createBitmapByName("bg10_jpg");
            this.addChild(bg);
            bg.x = this.stage.stageWidth / 2 - bg.width / 2 - 50;
            bg.y = this.stage.$stageHeight / 2 - bg.height / 2 - 200;
            bg.scaleX = bg.scaleY = 1;
            bg.alpha = 0;
            this.changeStage(this.bg, bg)
        },this);
        //开始计时
        timer.start();
    }
    private stopFire() {
        // let qi = this.createBitmapByName("qi_png");
        // this.addChild(qi);
        // qi.x = 100;
        // qi.y = 400;
        // qi.scaleX = qi.scaleY = 0.1;
        let qi = this.createBitmapByName("cloud_png");
        this.addChild(qi);
        qi.x = 0;
        qi.y = 350;
        this.system.stop();
        let tw = egret.Tween.get(qi);
        tw.to({ "alpha": 0 }, 2000);
    }

    private changeStage(bg1:egret.Bitmap,bg2:egret.Bitmap) {
        let tw1 = egret.Tween.get(bg1);
        tw1.to({ "alpha": 0 }, 2000);
        let tw2 = egret.Tween.get(bg2);
        tw2.to({ "alpha": 1 }, 2000);
        let timer:egret.Timer = new egret.Timer(3000,1);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,() => {
            this.startStar();
        },this);
        timer.start();
    }

    private startStar() {
        this._rectScope = new egret.Rectangle( 0, 300, 600, 300);

        for ( let i = 0; i < Main.NUM; ++i ) {
            let star:egret.Bitmap = this.createBitmapByName("star_png");
            this.addChild(star);

            /// 给一个随机的初始位置
            star.x = this._rectScope.x + this._rectScope.width * Math.random();
            star.y = this._rectScope.y + this._rectScope.height * Math.random();

            star.scaleX = star.scaleY = Main.SCALE_BASE;

            this.stars.push( star );
            this.addChild( star );
        }
        
        // 产生动画
        this.stage.addEventListener( egret.Event.ENTER_FRAME, ( evt:egret.Event )=>{
            let scale:number = Main.SCALE_BASE + Math.abs( Math.sin( this._nScaleBase += 0.03 )) * Main.SCALE_RANGE;
            this.stars[this.starIndex].scaleX = this.stars[this.starIndex].scaleY = scale;
        }, this );
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.hidePicture,this);
        this.showTip();
    }

    private hidePicture() {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.hidePicture,this);
        if (this.starIndex > 0) {
            let index = this.isShowComplete? this.starIndex : this.starIndex-1;
            let tw = egret.Tween.get(this.nices[index]);
            tw.to({ "x": this.stars[index].x, "y": this.stars[index].y, "scaleX": 0,"scaleY": 0 }, 2000);
            let starTextTopTw = egret.Tween.get(this.starTextTop);
            starTextTopTw.to({ "alpha": 0 }, 2000);
            let starTextBelowTw = egret.Tween.get(this.starTextBelow);
            starTextBelowTw.to({ "alpha": 0 }, 2000);
            if (this.isShowComplete) {
               starTextBelowTw.call(this.showText, this);
            } else {
               starTextBelowTw.call(this.showPicture, this);
            }
        } else {
            this.addChild(this.starTextTop)
            this.addChild(this.starTextBelow)
            this.showPicture();
        }
    }

    private showPicture() {
        this.starTextTop.text = this.starTextTopArray[this.starIndex];
        this.starTextTop.width = 430;
        this.starTextTop.alpha = 0;
        this.starTextTop.x = 90;
        this.starTextTop.y = 200;
        let starTextTopTw = egret.Tween.get(this.starTextTop);
        starTextTopTw.to({ "alpha": 1 }, 1000);
        let change = ()=>{
            let nice:egret.Bitmap = this.createBitmapByName("material"+this.starIndex+"_jpg");
            this.addChild(nice);
            nice.x = this.stars[this.starIndex].x;
            nice.y = this.stars[this.starIndex].y;
            nice.width = nice.height = 0;
            this.nices.push(nice);
            let tw = egret.Tween.get(nice);
            tw.to({"x": 80,"y": 300, "width": 480,"height": 360 }, 2000);

            this.starTextBelow.text = this.starTextBelowArray[this.starIndex];
            this.starTextBelow.width = 430;
            this.starTextBelow.alpha = 0;
            this.starTextBelow.x = 90;
            this.starTextBelow.y = 750;
            
            let starTextBelowTw = egret.Tween.get(this.starTextBelow);
            starTextBelowTw.to({ "alpha": 1 }, 2000);
            this.stars[this.starIndex].scaleX = this.stars[this.starIndex].scaleY = Main.SCALE_BASE;
            if (this.starIndex < Main.NUM - 1) {
                this.starIndex++;
            } else {
                this.isShowComplete = true;
            }
            
            let timer:egret.Timer = new egret.Timer(2000,1);
            timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,() => {
                this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.hidePicture,this)
            }, this);
            timer.start();
        }
        starTextTopTw.call(change,this)
    }

    private showText() {
        let index = this.starIndex-1;
        let tw = egret.Tween.get(this.nices[index]);
        tw.to({ "x": this.stars[index].x, "y": this.stars[index].y, "scaleX": 0,"scaleY": 0 }, 2000);
        this.removeChild(this.starTextTop)
        this.removeChild(this.starTextBelow)
        let textfields:Array<any> = new Array<egret.TextField>();
        let textArr = [
            <Array<egret.ITextElement>>[{text: "我猜你还喜欢我", style: {}}],
            <Array<egret.ITextElement>>[{text: "的作品", style: {}}],
            <Array<egret.ITextElement>>[{text: "生日快乐，鱼丸妹", style: {"size": 50, "strokeColor": 0x6699cc, "stroke": 2}}]
        ];
        textArr.unshift(<Array<egret.ITextElement>>[
            {text:`我猜,那么多颜色中，你对${this.answers[0]}情有独钟。在一年之中，${this.answers[1]}是你最需要陪伴的季节。如果有机会，我相信你一定很想去${this.answers[2]}看看。我是不是猜的很准?还有......`,style: {}}
        ]);
        let waitTimeArr:Array<any> = [5000,4000,1000,1000];
        let yArr:Array<any> = [0,250,350,450];
        let count = -1;
        for (let i = 0 ; i < textArr.length; i++) {
            let textfield: egret.TextField = new egret.TextField();
            textfield.textFlow = textArr[i];
            textfield.width = 420;
            textfield.alpha = 0;
            textfield.x = 50;
            textfield.y = 50 + yArr[i];
            textfields.push(textfield);
            this.addChild(textfield);
        }
        let change = () => {
            count++;
            if (count < textArr.length) {
                let tw = egret.Tween.get(textfields[count]);
                if (count == 0) {
                    tw.wait(1000);
                }
                tw.to({ "alpha": 1 }, 1500);
                if (count == 0) {
                    tw.wait(3000)
                    tw.call((change)=>{
                         this.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
                             console.log(count)
                            if (count < textArr.length-1) {
                                let tw = egret.Tween.get(textfields[++count]);
                                tw.to({ "alpha": 1 }, 1500);
                            }
                        },this)
                    }, this);
                }
                tw.wait(waitTimeArr[count]);
                tw.call(change, this);
            }
        };
        change();
        
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

}
