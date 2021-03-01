enchant();
enchant.battle = {};
game = enchant.Core.instance;
// var chara1;
var muteki_flag;
// window.onload = function () {
//   var game = new Game(320, 320);
//   game.fps = 30;
//   game.rootScene.backgroundColor = "#000";
// game.preload('chara1.png', 'effect0.png');
//   game.onload = function () {
//     shooting = new Shooting_part();

//   };
//   // game.start();
//   game.debug();
// };
enchant.battle = {
  assets: ['img/heart.png', 'sound/gameover.mp3','sound/jump10.mp3','sound/bomb.mp3','img/chara1.png', 'img/effect0.png', 'img/gameover.png']
}

enchant.battle.Shooting_part = Class.create({ //commandclassから実際に呼び出されるオブジェクト
  initialize: function () {
    game = enchant.Core.instance;
    // var scene = new Scene();

    // var shooting_scene = new Scene();
    // game.pushScene(shooting_scene);
    obj = new Array();
    //obj.wgrid = new Whitegrid(80, 80);
    obj.bgrid = new BlackGrid(80, 80);

    obj.chara1 = new Player(150, 200);
    obj.chara1.frame = 5;

    obj.bullet = new Array();

    // obj.enemy = new Enemy(150, 30);
    obj.invisibleEnemy = new Sprite(5, 5);
    obj.ganchanlaser = new Sprite(5, 5);
    // obj.ganchanlaser.backgroundColor = "rgb(255, 255, 255)";
    // obj.invisibleEnemy.backgroundColor = "rgb(255, 255, 255)";

    // game.currentScene.addChild(obj.enemy);
    game.currentScene.addChild(obj.invisibleEnemy);
    game.currentScene.addChild(obj.ganchanlaser);
    // obj.invisibleEnemy.backgroundColor = "#000";
    obj.invisibleEnemy.x = 170;
    obj.invisibleEnemy.y = 130;

    obj.ganchanlaser.x = 120;
    obj.ganchanlaser.y = 130;


    var count = 0;
    var move = 1;
    var timer = new Timer();
    var eraser = function () {
      if (timer.second >= 5) {
        // game.currentScene.removeChild(obj[1]);
        for (var erase in obj) {
          game.currentScene.removeChild(obj[erase]);
          console.log(erase);
        }
        game.currentScene.removeEventListener("enterframe", eraser);
        // game.popScene();
      }
    }
    game.currentScene.addEventListener("enterframe", eraser);
    //enemyidは1〜４の整数の予定　0は初期値
    if (enemyid == 1) { //左上の女
      obj.invisibleEnemy.addEventListener("enterframe", function () {
        count += 1;
        this.x += move;
        if (Math.abs(this.x - 160) > 30) {
          move = move * (-1);
        }
        if (count % 20 == 0 && timer.second <= 4) {
          // console.log(obj);
          obj.bullet = new HomingBullet(obj.invisibleEnemy.x, obj.invisibleEnemy.y, obj.chara1);

          // obj.bullet = new StraightBullet(obj.invisibleEnemy.x, obj.invisibleEnemy.y, 360*Math.random());
          // obj.bullet = new StraightBullet(obj.invisibleEnemy.x, obj.invisibleEnemy.y, 360*Math.random());

        }
      });

    } else if (enemyid == 2) { //下の部屋の爺さん
      var angle = 0.1;
      obj.invisibleEnemy.addEventListener("enterframe", function () {
        count += 1;
        angle += 0.2;
        this.x += move;
        this.y += move / 4;
        if (Math.abs(this.x - 160) > 30) {
          move = move * (-1);
        }
        if (count % 5 == 0 && timer.second <= 4) {
          // var angle = Math.random();
          obj.bullet = new StraightBullet(obj.invisibleEnemy.x, obj.invisibleEnemy.y, 230 + angle);
          // obj.bullet = new StraightBullet(obj.invisibleEnemy.x, obj.invisibleEnemy.y, 360*Math.random());
          // obj.bullet = new StraightBullet(obj.invisibleEnemy.x, obj.invisibleEnemy.y, 360*Math.random());

        }

        if (count % 5 == 3 && timer.second <= 4) {
          obj.bullet = new StraightBullet(obj.invisibleEnemy.x, obj.invisibleEnemy.y, 310 - angle); // console.log(obj);
          // obj.bullet = new HomingBullet(obj.invisibleEnemy.x, obj.invisibleEnemy.y, obj.chara1);

        }

        if (count % 30 == 0 && timer.second <= 4) {
          
          obj.bullet = new HomingBullet(obj.invisibleEnemy.x, obj.invisibleEnemy.y, obj.chara1);
        }
      });

    } else if (enemyid == 3) { //上の部屋の奴
      move = 2;
      obj.invisibleEnemy.addEventListener("enterframe", function () {
        count += 1;
        this.x += move;
        this.y += move / 2;
        if (Math.abs(this.x - 160) > 60) {
          move = move * (-1);
        }
        if (count % 30 == 0 && timer.second <= 4) {
          obj.bullet = new StraightBullet(obj.invisibleEnemy.x, obj.invisibleEnemy.y, 360 * Math.random());
          obj.bullet = new StraightBullet(obj.invisibleEnemy.x, obj.invisibleEnemy.y, 360 * Math.random());
          obj.bullet = new StraightBullet(obj.invisibleEnemy.x, obj.invisibleEnemy.y, 360 * Math.random());
          obj.bullet = new StraightBullet(obj.invisibleEnemy.x, obj.invisibleEnemy.y, 360 * Math.random());
          obj.bullet = new StraightBullet(obj.invisibleEnemy.x, obj.invisibleEnemy.y, 360 * Math.random());

        }
        if (count % 30 == 15 && timer.second <= 4) {
          obj.bullet = new HomingBullet(obj.invisibleEnemy.x, obj.invisibleEnemy.y, obj.chara1);
          obj.bullet = new HomingBullet(obj.invisibleEnemy.x + 20, obj.invisibleEnemy.y, obj.chara1);
          obj.bullet = new HomingBullet(obj.invisibleEnemy.x - 20, obj.invisibleEnemy.y, obj.chara1);
          // obj.bullet = new StraightBullet(obj.invisibleEnemy.x, obj.invisibleEnemy.y, 360*Math.random());

        }
      });
    } else if (enemyid == 4) { //ganchan がんちゃん
      if (Math.random() < 0.5) {
        obj.invisibleEnemy.addEventListener("enterframe", function () {
          count += 1;
          this.x += move;
          this.y += move/2;
          if (Math.abs(this.x - 150) > 60) {
            move = move * (-1);
          }
          if (count % 10 == 0 && timer.second <= 4) {
            obj.bullet = new StraightBullet(obj.invisibleEnemy.x, obj.invisibleEnemy.y, 360 * Math.random());
            obj.bullet = new StraightBullet(obj.invisibleEnemy.x, obj.invisibleEnemy.y, 360 * Math.random());
            obj.bullet = new StraightBullet(obj.invisibleEnemy.x, obj.invisibleEnemy.y, 360 * Math.random());
            obj.bullet = new StraightBullet(obj.invisibleEnemy.x, obj.invisibleEnemy.y, 360 * Math.random());
            obj.bullet = new StraightBullet(obj.invisibleEnemy.x, obj.invisibleEnemy.y, 360 * Math.random());
            obj.bullet = new StraightBullet(obj.invisibleEnemy.x, obj.invisibleEnemy.y, 360 * Math.random());
            obj.bullet = new StraightBullet(obj.invisibleEnemy.x, obj.invisibleEnemy.y, 360 * Math.random());
            obj.bullet = new StraightBullet(obj.invisibleEnemy.x, obj.invisibleEnemy.y, 360 * Math.random());
            // obj.bullet = new StraightBullet(obj.invisibleEnemy.x, obj.invisibleEnemy.y, 360*Math.random());

          }
          if (count % 10 == 5 && timer.second <= 4) {
            obj.bullet = new StraightBullet(obj.invisibleEnemy.x, obj.invisibleEnemy.y, 360 * Math.random());
            obj.bullet = new StraightBullet(obj.invisibleEnemy.x, obj.invisibleEnemy.y, 360 * Math.random());
            obj.bullet = new StraightBullet(obj.invisibleEnemy.x, obj.invisibleEnemy.y, 360 * Math.random());
            obj.bullet = new StraightBullet(obj.invisibleEnemy.x, obj.invisibleEnemy.y, 360 * Math.random());
            // obj.bullet = new StraightBullet(obj.invisibleEnemy.x, obj.invisibleEnemy.y, 360*Math.random());

          }

        });
      } else {
        obj.invisibleEnemy.addEventListener("enterframe", function () {
          count += 1;
          this.x += move;
          this.y += move/2;
          if (Math.abs(this.x - 170) > 40) {
            move = move * (-1);
          }
          if (count % 20 == 0 && timer.second <= 3.5) {
          obj.bullet = new HomingBullet(obj.invisibleEnemy.x + 30 * Math.random(), obj.invisibleEnemy.y + 30 * Math.random(), obj.chara1);
          obj.bullet = new HomingBullet(obj.invisibleEnemy.x + 30 * Math.random(), obj.invisibleEnemy.y + 30 * Math.random(), obj.chara1);
          obj.bullet = new HomingBullet(obj.invisibleEnemy.x + 30 * Math.random(), obj.invisibleEnemy.y + 30 * Math.random(), obj.chara1);

          }
          // if (count % 10 == 5 && timer.second <= 3.5) {
          // obj.bullet = new HomingBullet(obj.invisibleEnemy.x + 30 * Math.random(), obj.invisibleEnemy.y + 30 * Math.random(), obj.chara1);
          // obj.bullet = new HomingBullet(obj.invisibleEnemy.x + 30 * Math.random(), obj.invisibleEnemy.y + 30 * Math.random(), obj.chara1);
          // obj.bullet = new HomingBullet(obj.invisibleEnemy.x + 30 * Math.random(), obj.invisibleEnemy.y + 30 * Math.random(), obj.chara1);


          // }

        });
        obj.ganchanlaser.addEventListener("enterframe", function () {

          this.x -= move;
          this.y -= move / 2;
          if (Math.abs(this.x - 180) > 40) {
            // move = move * (-1);
          }
          if (count % 20 == 10 && timer.second <= 3.5) {
          obj.bullet = new HomingBullet(obj.ganchanlaser.x + 30 * Math.random(), obj.ganchanlaser.y + 60 * Math.random(), obj.chara1);
          obj.bullet = new HomingBullet(obj.ganchanlaser.x + 30 * Math.random(), obj.ganchanlaser.y + 60 * Math.random(), obj.chara1);
          obj.bullet = new HomingBullet(obj.ganchanlaser.x + 30 * Math.random(), obj.ganchanlaser.y + 60 * Math.random(), obj.chara1);

          }
          // if (count % 10 == 5 && timer.second <= 3.5) {
          // obj.bullet = new HomingBullet(obj.ganchanlaser.x + 30 * Math.random(), obj.ganchanlaser.y + 60 * Math.random(), obj.chara1);
          // obj.bullet = new HomingBullet(obj.ganchanlaser.x + 30 * Math.random(), obj.ganchanlaser.y + 60 * Math.random(), obj.chara1);
          // obj.bullet = new HomingBullet(obj.ganchanlaser.x + 30 * Math.random(), obj.ganchanlaser.y + 60 * Math.random(), obj.chara1);


          // }


        });
      }


    }
  }
});
//タイマーです　ご自由にお使いください
//this.secondに秒数を格納しています
enchant.battle.Timer = Class.create(Entity, {
  initialize: function () {
    Entity.call(this);
    game = enchant.Game.instance;
    this.startframe = game.frame;
    game.currentScene.addChild(this);
  },


  onenterframe: function () {
    this.second = (game.frame - this.startframe) / game.fps;
    // console.log(this.second);
  }
});

//枠の中に載ってるかを確認する関数　基本的に弾に使う用
enchant.battle.ongrid = function (target, mode = "bullet") {
  var stage = obj.bgrid;
  if (mode == "bullet") {
    if (target.intersect(stage) == false) {
      game.currentScene.removeChild(target);
    }
  } else {
    if (target.intersect(stage) == true) {
      return true;
    } else {
      return false;
    }

  }
};


// クラスの作成
enchant.battle.Test = Class.create(Sprite, {
  initialize: function (x, y) {
    game = enchant.Game.instance;
    Sprite.call(this, 32, 32);
    this.image = game.assets['img/chara1.png'];
    this.x = x;
    this.y = y;
    this.frame = 0;
    this.collision = new Sprite(16, 16);
    game.currentScene.addChild(this);
  }


});

enchant.battle.TestGroup = Class.create(Group, {
  initialize: function (x, y) {
    game = enchant.Game.instance;
    Group.call(this);
    this.graphic = new Sprite(32, 32);
    this.graphic.scale(0.5, 0.5);
    this.collision = new Sprite(16, 16);
    this.addChild(this.graphic);
    this.addChild(this.collision);
    this.graphic.image = game.assets['img/heart.png'];
    this.x = x;
    this.y = y;
    this.collision.x += this.graphic.width / 4;
    this.collision.y += this.graphic.height / 4;


    this.frame = 5;

    this.addChild(this.collision);
    game.currentScene.addChild(this);
  }


});


enchant.battle.Player = Class.create(enchant.battle.TestGroup, {

  onenterframe: function () {
    // 右と左のような真逆の方向は入力されないのでelseで高速化する
    if (game.input.up) {
      this.y -= 3;
      if (ongrid(this.collision, "chara") == false) {
        console.log("off");
        this.y += 6;
      }
    } else if (game.input.down) {
      this.y += 3;
      if (ongrid(this.collision, "chara") == false) {
        this.y -= 6;
      }
    }
    if (game.input.left) {
      this.x -= 3;
      if (ongrid(this.collision, "chara") == false) {
        this.x += 6;
      }
    } else if (game.input.right) {
      this.x += 3;
      if (ongrid(this.collision, "chara") == false) {
        this.x -= 6;
      }

    }

    if (hp <= 0) {
      clearInterval(hpframeinterval);
      var gameover_scene = new Scene();
      gameover_scene.backgroundColor = "#000000";
      game.pushScene(gameover_scene);


      var gameover = new Sprite(348, 165);
      gameover.image = game.assets['img/gameover.png'];
      backgroundmusic.change(game.assets['sound/gameover.mp3']);
      gameover.scaleX = 0.5;
      gameover.scaleY = 0.5;
      gameover.x = -20;
      gameover.y = 70;
      gameover_scene.addChild(gameover);
      gameover.tl.fadeIn(50);
      gameover.ontouchstart = function () {
        window.location.href = "./map.html";
      };
      //setTimeout(gameoverdelay, 3000);
    };
    //window.location.href = "./gameover.html"
  }
});

enchant.battle.Bullet = Class.create(Sprite, {
  initialize: function (x, y) {
    game = enchant.Core.instance;
    Sprite.call(this, 10, 10);
    this.x = x;
    this.y = y;
    this.backgroundColor = "#fff";
    var firesound = game.assets['sound/jump10.mp3'];
    firesound.play();

    game.currentScene.addChild(this);
    // setTimeout(game.currentScene.removeChild(this), 10000);
  },
  onenterframe: function () {

    // this.y += 4;
  }

});

enchant.battle.StraightBullet = Class.create(enchant.battle.Bullet, {
  initialize: function (x, y, angle) {
    Bullet.call(this, x, y);
    this.rad = angle * (Math.PI / 180); //弧度法からラジアンへ変換
    this.xrate = Math.cos(this.rad);
    // console.log(this.xrate);
    this.yrate = -1 * Math.sin(this.rad); //y軸上向きから下向き座標系に変換
    this.speed = 3;
    // this.targetx = target.x - x;
    // this.targety = target.y - y;
    // this.targetc = Math.sqrt(Math.pow(this.targetx, 2) + Math.pow(this.targety, 2));
  },
  onenterframe: function (target) {
    // this.x += this.targetx * (1 / this.targetc) * 3;
    // this.y += this.targety * (1 / this.targetc) * 3;
    this.x += this.xrate * this.speed;
    this.y += this.yrate * this.speed;
    ongrid(this);
    if (this.intersect(obj.chara1.collision)) {
      // game.currentScene.removeChild(this);
      // game.currentScene.removeChild(chara1);
      // window.location.href = './ed.html';
      // chara1.x = -100000000000;
      // chara1.y = -100000000000;

      if (muteki_flag != 1) {
        var crash = new Crash;
        crash.moveTo(this.x, this.y);

        hp -= Math.max((enemyattack - resist), 0);
        console.log(hp);
        muteki_flag = 1;
        // console.log(muteki_flag)

        setTimeout(function () {
          muteki_flag = 0
        }, 1000);
        // setTimeout(function() {console.log(muteki_flag)},1100);
      }
    }


  }

});

enchant.battle.HomingBullet = Class.create(enchant.battle.Bullet, {
  initialize: function (x, y, target) {
    Bullet.call(this, x, y);
    this.targetx = target.x - x;
    this.targety = target.y - y;
    this.targetc = Math.sqrt(Math.pow(this.targetx, 2) + Math.pow(this.targety, 2));

  },
  onenterframe: function (target) {
    this.x += this.targetx * (1 / this.targetc) * 3;
    this.y += this.targety * (1 / this.targetc) * 3;
    // this.x += this.targetx / 50;
    // this.y += this.targety / 50;
    ongrid(this);
    if (this.intersect(obj.chara1.collision)) {
      // game.currentScene.removeChild(this);
      // game.currentScene.removeChild(chara1);
      // window.location.href = './ed.html';
      // chara1.x = -100000000000;
      // chara1.y = -100000000000;
      if (muteki_flag != 1) {
        var crash = new Crash;
        crash.moveTo(this.x, this.y);

        hp -= Math.max((enemyattack - resist), 0);
        console.log(hp);
        muteki_flag = 1;
        // console.log(muteki_flag)

        setTimeout(function () {
          muteki_flag = 0
        }, 1000);
        // setTimeout(function() {console.log(muteki_flag)},1100);
      }
    }
  }
});

enchant.battle.Enemy = Class.create(enchant.battle.Test, {


  initialize: function (x, y) {
    game = enchant.Game.instance;
    Sprite.call(this, 32, 32);
    this.image = game.assets['img/chara1.png'];
    this.x = x;
    this.y = y;
    this.frame = 0;
    this.scale(2, 2);
    game.currentScene.addChild(this);
    console.log("enemy summond")
  },
  onenterframe: function () {


  }
});


enchant.battle.Whitegrid = Class.create(Sprite, {
  initialize: function (x, y) {
    Sprite.call(this, 160, 160);
    this.x = x;
    this.y = y;
    // this.backgroundColor = "#FFF";
    // 白い枠を消すためにコメントアウト
    game.currentScene.addChild(this);
  }
});

enchant.battle.BlackGrid = Class.create(Sprite, {
  initialize: function (x, y) {
    Sprite.call(this, 140, 140);
    this.x = x + 10;
    this.y = y + 10;
    //this.backgroundColor = "#000";
    game.currentScene.addChild(this);
  }
});

/*
 * 爆発クラス
 */
enchant.battle.Crash = Class.create(Sprite, {
  // 初期化処理
  initialize: function () {
    Sprite.call(this, 16, 16);
    this.image = game.assets['img/effect0.png'];
    this.frame = 0;
    this.scale(2);
    var bombsound = game.assets['sound/bomb.mp3'];
    bombsound.play();

    game.currentScene.addChild(this);
  },
  // 更新処理
  onenterframe: function () {
    this.frame += 1;

    // 削除処理
    if (this.frame > 32) {
      this.parentNode.removeChild(this);
    }
  },
});

enchant.battle.Bgm = enchant.Class.create({
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
         },

         change: function(data){
          this.stop();
          this.set(data);
          this.play();
          setInterval(this.loop(), 500);
         }

     });
