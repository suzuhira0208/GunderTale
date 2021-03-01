enchant();
window.onload = function(){
  var game = new Game(320, 320);
  game.fps = 20;
  game.preload('sound/ed.mp3', './img/student.png', './img/op1.png', './img/op2.png', './img/op3.png', './img/4gokan.png','sound/se3.wav','sound/bgm08.wav','./img/chara1.png', './img/chara2.png', './img/gundertale.png', './img/gameover.png', './img/ganchan.png');
  game.onload = function(){

var EndingLabel = Class.create(Label, {
  initialize:function(x, y){
    enchant.Label.call(this, "");
    this.x = x;
    this.y = y;
      this.textAlign = 'center';
    this.font = "20px sans-serif";
    this.color = "rgb(255, 255, 255)";
  }
});

//EDシーン
var edscene = new Scene();

//BGMのクラス
    var Bgm = enchant.Class.create({
        initialize: function(){
            this.data = null;
            this.isPlay = false;//プレイの状態フラグ
        },
        //BGM用音楽ファイルのセット
        set: function(data){
            this.data = data;
        },
        //再生(再生のみに使う)
        play: function(){
            this.data.play();
            this.isPlay = true;
            if(this.data.src != undefined){//srcプロパティを持っている場合(スマホの場合)
                this.data.src.loop = true;
            }
        },
        //ループ再生(必ずループ内に記述すること) PCでのループ再生で使う
        loop: function(){
            if(this.isPlay == true && this.data.src == undefined){//再生中でsrcプロパティを持っていない場合(PC)
                this.data.play();
            }
        },
        //再生停止(曲を入れ替える前は,必ずstop()させる)
        stop: function(){
            if(this.data != null){
                this.data.stop();
                this.isPlay = false;
            }
        },
        //一時停止
        pause: function(){
            this.data.pause();
        }
    });

var edbgm = new Bgm();
edbgm.set(game.assets['sound/ed.mp3']);
edbgm.play();
game.onenterframe = function(){
  edbgm.loop();
};

game.pushScene(edscene);
//edscene.backgroundColor = '#000000';
var label = ["【Player】", "", "【Boss】", "", "【Enemy】", "", "", "", "【Producer】", "山下 拓真", "玉川　皓規", "齊藤　涼平", "北川　真拓"];
var labelY = [0, 30, 200, 180, 430, 460, 460, 460, 700, 730, 760, 790, 820 ];
var dispY = 0;
var aryObj = new Array(label.length);
for(var i = 0; i < aryObj.length; i++){
  if(i == 1){
    aryObj[i] = new Sprite(32, 48);
    aryObj[i].image = game.assets['./img/student.png'];
    aryObj[i].x = 135;
    aryObj[i].frame = [0,0,1,1,2,2];
    aryObj[i].addEventListener(Event.ENTER_FRAME, function(){
      this.y -= 2;
    });
 }else if(i == 3){
    aryObj[i] = new Sprite(181, 181);
    aryObj[i].image = game.assets['./img/ganchan.png'];
    aryObj[i].x = 60;
    aryObj[i].scale(0.5, 0.5);
    aryObj[i].addEventListener(Event.ENTER_FRAME, function(){
      this.y -= 2;
    });
  }else if(i == 5){
    aryObj[i] = new Sprite(32, 32);
    aryObj[i].image = game.assets['./img/chara2.png'];
    aryObj[i].x = 100;
    aryObj[i].frame = [3,3,4,4,5,5];
    aryObj[i].addEventListener(Event.ENTER_FRAME, function(){
      this.y -= 2;
    });
  }else if(i == 6){
    aryObj[i] = new Sprite(32, 32);
    aryObj[i].image = game.assets['./img/chara2.png'];
    aryObj[i].x = 135;
    aryObj[i].frame = [57,57,58,58,59,59];
    aryObj[i].addEventListener(Event.ENTER_FRAME, function(){
      this.y -= 2;
    });
  }else if(i == 7){
    aryObj[i] = new Sprite(32, 32);
    aryObj[i].image = game.assets['./img/chara2.png'];
    aryObj[i].x = 170;
    aryObj[i].frame = [51,51,52,52,53,53];
    aryObj[i].addEventListener(Event.ENTER_FRAME, function(){
      this.y -= 2;
    });
  }else{
    aryObj[i] = new EndingLabel(0, dispY);
    aryObj[i].text = label[i];
    aryObj[i].addEventListener(Event.ENTER_FRAME, function(){
      this.y -= 2;
    });
  }
  aryObj[i].y = labelY[i] + 350;
  edscene.addChild(aryObj[i]);

  var lastLabel = new EndingLabel(0, 130);
  lastLabel.font = "14px sans-serif";
  lastLabel.text = "The End";

  edscene.addEventListener(Event.ENTER_FRAME, function(){
    if(aryObj[aryObj.length-1].y < -50){
      edscene.addChild(lastLabel);
    }
  });
}
lastLabel.ontouchstart = function(){
  window.location.href = "./title.html";
};
}
  game.start();
}
