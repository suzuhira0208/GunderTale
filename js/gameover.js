//ゲームオーバーシーン

enchant();
window.onload = function(){
  var game = new Game(320, 320);
  game.fps = 20;
  game.rootScene.backgroundColor = "rgb(0, 0, 0)";
  game.preload('./img/gameover.png', 'sound/gameover.mp3');
  game.onload = function(){

    var gameover_scene = new Scene();
    game.pushScene(gameover_scene);
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
    var gobgm = new Bgm();
    gobgm.set(game.assets['sound/gameover.mp3']);
    gobgm.play();
    gameover_scene.backgroundColor = 'rgba(0, 0, 0, 1)';
    var gameover = new Sprite(348, 165);
    gameover.image = game.assets['./img/gameover.png'];
    gameover.scale(0.5, 0.7);
    gameover.x = -20;
    gameover.y = 70;
    gameover.tl.hide()
               .fadeIn(10)
               .fadeTo(0.8, 70);
    gameover_scene.addChild(gameover);

    //retryボタン
    var retry = new MutableText(180, 270);
    retry.text = 'RETRY';
    retry.tl.hide()
            .fadeIn(10)
            .fadeTo(0.8, 70);
    gameover_scene.addChild(retry);
    retry.ontouchstart = function(){
      //game.popScene(gameover_scene);
      window.location.href = "./title.html";
    };


  }
  game.start();
};
