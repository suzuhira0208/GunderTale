enchant();
enchant.command = {};
game = enchant.Core.instance;

var muteki_flag;
//window.onload = function(){
//var game = new Game(320, 320);
//game.fps = 20;
//game.rootScene.backgroundColor = "rgb(0, 0, 0)";
//game.preload(['sound/button03b.mp3','sound/button02b.mp3','chara1.png']);

//game.onload = function(){

//command = new Commandpart();
//}
//game.start();
//game.debug();
//};
enchant.command = {
  assets: ['sound/button03b.mp3', 'sound/button02b.mp3', 'chara1.png','BGM/streetofrage.mp3','BGM/enemy1.mp3','BGM/enemy2.mp3','BGM/enemy3.mp3','BGM/ganchan.mp3']
}









/*枠のクラス*/
var Textframe = Class.create(Sprite, {
  initialize: function (x, y, z, u, r, g, b) {
    Sprite.call(this, 300, 300);
    this.x = x;
    this.y = y;

    var textframesurface = new Surface(300, 300);
    textframesurface.context.strokeStyle = "rgb(255, 255, 255)" //外枠の色
    textframesurface.context.strokeRect(0, 0, z, u); //枠のみの矩形

    textframesurface.context.fillStyle = "rgb(" + r + ", " + g + ", " + b + ")"; //コマンドも黒くするための塗りつぶしの色
    textframesurface.context.fillRect(1, 1, z - 2, u - 2);
    this.image = textframesurface;
    game.currentScene.addChild(this);

  }
});




var HPframe = Class.create(Sprite, {
  initialize: function (x, y, z, u, r, g, b) {
    Sprite.call(this, 35, 15);
    this.x = x;
    this.y = y;

    var textframesurface = new Surface(35, 15);
    textframesurface.context.strokeStyle = "rgb(255, 255, 255)" //外枠の色
    //textframesurface.context.strokeRect(0, 0, z, u);//枠のみの矩形

    textframesurface.context.fillStyle = "rgb(" + r + ", " + g + ", " + b + ")"; //コマンドも黒くするための塗りつぶしの色
    textframesurface.context.fillRect(1, 1, z, u);
    this.image = textframesurface;
    game.currentScene.addChild(this);

  }
});


/*敵のclass(Test) chara.jsではenemy*/
var Enemy1 = Class.create(Sprite, {
  initialize: function (x, y) {
    //game = enchant.Core.instance;
    Sprite.call(this, 32, 32);
    this.x = x;
    this.y = y;
    this.image = game.assets['./img/chara2.png'];
    this.frame = 4;
    game.currentScene.addChild(this);
    enemyhp = 100;
    enemymaxhp = enemyhp;
    enemyattack = 10;


  }
});

/*敵のclass(Test) chara.jsではenemy2*/
var Enemy2 = Class.create(Sprite, {
  initialize: function (x, y) {
    //game = enchant.Core.instance;
    Sprite.call(this, 32, 32);
    this.x = x;
    this.y = y;
    this.image = game.assets['./img/chara2.png'];
    this.frame = 58;
    game.currentScene.addChild(this);
    enemyhp = 200;
    enemymaxhp = enemyhp;
    enemyattack = 30;


  }
});

/*敵のclass(Test) enemy3*/
var Enemy3 = Class.create(Sprite, {
  initialize: function (x, y) {
    //game = enchant.Core.instance;
    Sprite.call(this, 32, 32);
    this.x = x;
    this.y = y;
    this.image = game.assets['./img/chara2.png'];
    this.frame = 52;
    game.currentScene.addChild(this);
    enemyhp = 300;
    enemymaxhp = enemyhp;
    enemyattack = 50;


  }
});



var Ganchan = Class.create(Sprite, {
  initialize: function (x, y) {
    //game = enchant.Core.instance;
    Sprite.call(this, 181, 181);
    this.scale(1.5, 1.5);
    this.x = x;
    this.y = y;
    this.image = game.assets['./img/ganchan.png'];
    game.currentScene.addChild(this);
    enemyhp = 300;
    enemymaxhp = enemyhp;
    enemyattack = 100;


  }
});







/* メインの記述のクラス */
var Commandpart = Class.create({
  initialize: function () {
    game = enchant.Core.instance;
    game.fps = 30;



    commandscene = new Scene();
    commandscene.backgroundColor = "rgb(0,0,0)"
    game.pushScene(commandscene);

    /*後で使うサウンドの宣言*/
    var sound03 = game.assets['sound/button03b.mp3'].clone();
    var sound02 = game.assets['sound/button02b.mp3'].clone();

    backgroundmusic.stop();
    backgroundmusic.set(game.assets['BGM/streetofrage.mp3']);
    backgroundmusic.play();
    game.onenterframe = function(){
      backgroundmusic.loop();
    };
    backgroundmusic.stop();

    if(enemyid == 1){
      backgroundmusic.change(game.assets['BGM/enemy1.mp3']);

  }else if(enemyid == 2){
       backgroundmusic.change(game.assets['BGM/enemy2.mp3']);

  }else if(enemyid == 3){

    backgroundmusic.change(game.assets['BGM/enemy3.mp3']);

  } else if(enemyid == 4){

    backgroundmusic.change(game.assets['BGM/ganchan.mp3']);

  }





    /*textフレームを表示 グローバル変数*/
    var textframe = new Textframe(10, 210, 300, 50);
    /*もしレベルが上がったら*/
    //nowlevel = nowlevel + 1;

    var nowlevel = new MutableText(15, 270);
    nowlevel.text = 'LV' + String(level);
    commandscene.addChild(nowlevel);





    /*敵の実装(enemyidによって変える)*/
    if (enemyid == 1) {
      enemy = new Enemy1(140, 40);
    } else if (enemyid == 2) {
      enemy = new Enemy2(140, 40)
    } else if (enemyid == 3) {
      enemy = new Enemy3(140, 40)
    } else if (enemyid == 4) {
      enemy = new Ganchan(75, -50)
    }


    /*自分のHPの文字を表示*/
    var hitpoint = new MutableText(115, 270);
    hitpoint.text = 'HP';
    commandscene.addChild(hitpoint);

    /*敵のHPを表示*/
    var enemyhptext = new MutableText(180, 50);
    enemyhptext.text = String(enemyhp);
    commandscene.addChild(enemyhptext);


    var enemymaxhptext = new MutableText(228, 50);

    if (enemymaxhp >= 1000) {
      enemymaxhptext.text = ' ' + '/' + String(enemymaxhp);
    } else {
      enemymaxhptext.text = '/' + String(enemymaxhp);
    }
    commandscene.addChild(enemymaxhptext);

    /*barがHPの最大値に合うように調整*/
    var barmath = 33 / maxhp; //33という値はバーの幅が33であるため、HPの最大値を合わせる

    //敵から攻撃を受けた時の処理,もし攻撃を受けたらというif分を用いる予定
    //if()
    //hp = hp - enemyattack;
    //Math.floor(Stirng(barmath * hp));
    var hpbaryellow = new Textframe(146, 269, 35, 15, 222, 220, 72); //黄色部分
    var hpbarred = new HPframe(146 + barmath * hp, 269, 33 - barmath * hp, 13, 255, 0, 0);　 //赤色部分
    hpframeinterval = setInterval(function () {
      hpbarred = new HPframe(146 + barmath * hp, 269, 33 - barmath * hp, 13, 255, 0, 0)
    }, 100);

    /*hpバーの実装 赤色部分と黄色部分*/

    /*現在のHPを数値で表示*/
    var nowhplabel = new MutableText(185, 269);
    nowhplabel.text = String(hp);
    commandscene.addChild(nowhplabel);

    setInterval(function () {
      nowhplabel.text = String(hp)
    }, 100);
    //setTimeout(function(){hp = 50}, 1000);

    /*最大のHPを数値で表示*/
    var hplabel = new MutableText(233, 269);
    hplabel.text = "/" + String(maxhp);
    commandscene.addChild(hplabel);

    //setInterval(function(){hplabel.text = "/" + String(maxhp)},100)





    /*FIGHT,ITEM,DOGEZAのフレーム*/
    var fightframe = new Textframe(10, 290, 85, 20);
    var itemframe = new Textframe(118, 290, 70, 20);
    var dogezaframe = new Textframe(210, 290, 100, 20);



    /*戦うコマンド*/
    var fight = new MutableText(15, 295);
    fight.text = 'FIGHT';
    commandscene.addChild(fight);


    /*アイテムコマンド*/
    var item = new MutableText(122, 295);
    item.text = "ITEM"
    commandscene.addChild(item);

    /*土下座コマンド*/
    var dogeza = new MutableText(215, 295);
    dogeza.text = "DOGEZA"
    commandscene.addChild(dogeza);




    /*アイテムを選択したあと*/
    item.ontouchstart = function () {
      sound03.play();

      itemscene = new Scene();
      //itemscene.backgroundColor = "rgb(0, 0, 0)"
      game.pushScene(itemscene);

      /*リターンで前のシーンに戻る*/
      //var modoruframe = new Textframe(10, 290, 100, 20);
      var modoru = new MutableText(160, 240);
      modoru.text = '*RETURN';
      itemscene.addChild(modoru);
      modoru.ontouchstart = function () {
        sound03.play();
        game.popScene(itemscene);
      }

      //var textframe2 = new Textframe(10, 210, 300, 50);
      /*アイテム　単位,レポート,過去問 */

      var credit = new MutableText(15, 220);
      credit.text = '*CREDIT' + String(credit_counter);
      itemscene.addChild(credit);

      /*単位を選択*/
      if (credit_counter > 0) {
        credit.ontouchstart = function () {
          credit_counter -= 1;
          sound02.play();
          creditscene = new Scene();
          //creditscene.backgroundColor = "rgb(0, 0, 0)"
          game.replaceScene(creditscene);
          //var textframe3 = new Textframe(10, 210, 300, 50);

          attack = attack + 5;
          var creditlabel = new Label("学力がついた！");
          creditlabel.color = 'rgb(255, 0, 0)';
          creditlabel.x = 105;
          creditlabel.y = 230;
          creditscene.addChild(creditlabel);


          creditscene.addEventListener('touchstart', function () {
            game.popScene(creditscene);
            textframe.opacity = 0;
            creditscene.removeChild(creditlabel);

            var creditframe = new Textframe(10, 210, 300, 50);
            //reportscene.addChild(reportframe);
            creditframe.tl.scaleTo(0.54, 3.2, 10);
            creditframe.tl.and();
            creditframe.tl.moveTo(10, 410, 10);
            creditframe.tl.removeFromScene();
            creditframedelay = function () {
              newcreditframe = new Textframe(80, 80, 160, 160);
              newcreditframe.opacity = 0.5;
              commandscene.addChild(newcreditframe);
            };
            setTimeout(creditframedelay, 400);



            var s = function () {
              // textframe.opacity = 0;

              Shooting_part();
            };
            // var opacity1 = function() {textframe.opacity = 1;}
            //
            // var timeout = [s, opacity1];
            // var timeout = [s];
            // timeout.forEach(function(a) { //sとopacity1にsetTimeout1600
            //   setTimeout(a,1600);
            // });
            //
            setTimeout(s, 1600);
            // setTimeout(opacity1,7000);


            var scenedelay = function () {
              textframe.opacity = 1;
              commandscene.removeChild(newcreditframe);

            };



            var framedelay = function () {
              newcreditframe.tl.scaleTo(1.875, 0.3125, 10);
              newcreditframe.tl.and();
              newcreditframe.tl.moveTo(140, 107, 10);

              setTimeout(scenedelay, 440)
            };
            setTimeout(framedelay, 7500)
          });


        }
      };

      var report = new MutableText(15, 240);
      report.text = '*REPORT' + String(report_counter);
      itemscene.addChild(report);

      /*レポートを選択 */
      if (report_counter > 0) {
        report.ontouchstart = function () {
          report_counter -= 1;
          sound02.play();
          reportscene = new Scene();
          //reportscene.backgroundColor = "rgb(0, 0, 0)"
          game.replaceScene(reportscene);
          //var textframe4 = new Textframe(10, 210, 300, 50);


          /*防御力が上がる処理*/
          resist = resist + 3;


          var reportlabel = new Label("評価が上がった！");
          reportlabel.color = 'rgb(0,0,255)';
          reportlabel.x = 105;
          reportlabel.y = 230;
          reportscene.addChild(reportlabel);


          reportscene.addEventListener('touchstart', function () {
            game.popScene(reportscene);
            textframe.opacity = 0;
            reportscene.removeChild(reportlabel);

            var reportframe = new Textframe(10, 210, 300, 50);
            //reportscene.addChild(reportframe);
            reportframe.tl.scaleTo(0.54, 3.2, 10);
            reportframe.tl.and();
            reportframe.tl.moveTo(10, 410, 10);
            reportframe.tl.removeFromScene();
            reportframedelay = function () {
              newreportframe = new Textframe(80, 80, 160, 160);
              newreportframe.opacity = 0.5;
              commandscene.addChild(newreportframe);
            };
            setTimeout(reportframedelay, 400);



            var s = function () {
              // textframe.opacity = 0;

              Shooting_part();
            };
            // var opacity1 = function() {textframe.opacity = 1;}
            //
            // var timeout = [s, opacity1];
            // var timeout = [s];
            // timeout.forEach(function(a) { //sとopacity1にsetTimeout1600
            //   setTimeout(a,1600);
            // });
            //
            setTimeout(s, 1600);
            // setTimeout(opacity1,7000);


            var scenedelay = function () {
              textframe.opacity = 1;
              commandscene.removeChild(newreportframe);

            };



            var framedelay = function () {
              newreportframe.tl.scaleTo(1.875, 0.3125, 10);
              newreportframe.tl.and();
              newreportframe.tl.moveTo(140, 107, 10);

              setTimeout(scenedelay, 440)
            };
            setTimeout(framedelay, 7500)
          });
        }
      };

      var oldtest = new MutableText(160, 220);
      oldtest.text = '*OLDTEST' + String(oldtest_counter);
      itemscene.addChild(oldtest);

      /*過去問を選択*/
      if (oldtest_counter > 0) {
        oldtest.ontouchstart = function () {
          nowhplabel.opacity = 0;
          sound02.play();
          oldtest_counter -= 1;
          oldtestscene = new Scene();
          //oldtestscene.backgroundColor = "rgb(0, 0, 0)"
          game.replaceScene(oldtestscene);
          //var textframe4 = new Textframe(10, 210, 300, 50);

          hp = maxhp;

          hpbaryellow = new HPframe(146, 269, 34, 13, 222, 220, 72);
          commandscene.addChild(hpbaryellow);
          var oldtesthplabel = new MutableText(185, 269);
          oldtesthplabel.text = String(hp);
          oldtestscene.addChild(oldtesthplabel);


          var oldtestlabel = new Label("自信がついた！");
          oldtestlabel.color = 'rgb(0,255,0)';
          oldtestlabel.x = 105;
          oldtestlabel.y = 230;
          oldtestscene.addChild(oldtestlabel);
          oldtestscene.addEventListener('touchstart', function () {
            game.popScene(oldtestscene);
            nowhplabel.opacity = 1;
            textframe.opacity = 0;
            oldtestscene.removeChild(oldtestlabel);

            var oldtestframe = new Textframe(10, 210, 300, 50);
            //oldtestscene.addChild(oldtestframe);
            oldtestframe.tl.scaleTo(0.54, 3.2, 10);
            oldtestframe.tl.and();
            oldtestframe.tl.moveTo(10, 410, 10);
            oldtestframe.tl.removeFromScene();
            oldtestframedelay = function () {
              newoldtestframe = new Textframe(80, 80, 160, 160);
              newoldtestframe.opacity = 0.5;
              commandscene.addChild(newoldtestframe);
            };
            setTimeout(oldtestframedelay, 400);



            var s = function () {
              // textframe.opacity = 0;

              Shooting_part();
            };
            // var opacity1 = function() {textframe.opacity = 1;}
            //
            // var timeout = [s, opacity1];
            // var timeout = [s];
            // timeout.forEach(function(a) { //sとopacity1にsetTimeout1600
            //   setTimeout(a,1600);
            // });
            //
            setTimeout(s, 1600);
            // setTimeout(opacity1,7000);


            var scenedelay = function () {
              textframe.opacity = 1;
              commandscene.removeChild(newoldtestframe);

            };



            var framedelay = function () {
              newoldtestframe.tl.scaleTo(1.875, 0.3125, 10);
              newoldtestframe.tl.and();
              newoldtestframe.tl.moveTo(140, 107, 10);

              setTimeout(scenedelay, 440)
            };
            setTimeout(framedelay, 7500)
          });
        }
      };
















    }


    /*fightを選択したあと*/
    fight.ontouchstart = function () {
      sound03.play();


      rodscene = new Scene();
      //rodscene.backgroundColor = "rgb(0, 0, 0)"
      textframe.opacity = 0;
      game.pushScene(rodscene);




      //barの外枠
      var fightframe = new Textframe(10, 210, 300, 50);
      fightframe.tl.scaleTo(0.54, 3.2, 10);
      fightframe.tl.and();
      fightframe.tl.moveTo(10, 410, 10);
      fightframe.tl.removeFromScene();
      rodframedelay = function () {
        rodframe = new Textframe(80, 80, 160, 160);
        rodframe.opacity = 0.5;
        commandscene.addChild(rodframe);
      };
      setTimeout(rodframedelay, 440);



      //X座標をダメージ量に変換する必要があるため適宜変更するための変数
      var hensuX = 320;
      var hensuY = 320;

      // 動く棒オブジェクトの作成
      var rod = new Sprite(hensuX / 2, hensuY / 2);
      rod.x = 0;
      rod.y = 80;
      // spriteオブジェクトの背景色の指定
      rod.backgroundColor = "rgba(0, 0, 0, 0)";

      // Surfaceオブジェクトの作成
      var surface = new Surface(hensuX / 2, hensuY / 2);

      // パスの描画の初期化
      surface.context.beginPath();
      // 描画開始位置の移動
      surface.context.moveTo(hensuX / 4, 0);
      // 指定座標まで直線を描画
      surface.context.lineTo(hensuX / 4, hensuY / 2);
      // 線の色を指定 (指定しないと黒)
      surface.context.strokeStyle = "rgba(255, 255, 255, 1)";
      // 描画を行う
      surface.context.stroke();

      //実際の棒
      rod.tl.moveTo(hensuX / 2, hensuY / 4, 5, enchant.Easing.QUAD_BOUNCEINOUT)
        .moveTo(0, hensuY / 4, 20, enchant.Easing.QUAD_EASEINOUT)
        .moveTo(hensuX / 2, hensuY / 4, 10, enchant.Easing.QUAD_EASEINOUT)
        .moveTo(0, hensuY / 4, 13, enchant.Easing.QUAD_ELASTICINOUT)
        .moveTo(hensuX / 2, hensuY / 4, 8, enchant.Easing.QUAD_EASEINOUT)
        .moveTo(0, hensuY / 4, 13, enchant.Easing.QUAD_EASEINOUT)
        .loop();




      //中心の棒オブジェクトの作成
      var centerrod = new Sprite(hensuX / 2, hensuY / 2);
      centerrod.x = hensuX / 4;
      centerrod.y = hensuY / 4;
      centerrod.backgroundColor = "rgba(0, 0, 0, 0.0)";
      //中心の棒のサーフェスの作成
      var centersurface = new Surface(hensuX / 2, hensuY / 2);

      centersurface.context.beginPath();
      centersurface.context.moveTo(hensuX / 4, 0);
      centersurface.context.lineTo(hensuX / 4, hensuY / 2);
      centersurface.context.strokeStyle = "rgba(255, 0, 0, 1)"
      centersurface.context.stroke();

      //スプライトにsurfaceを画像として挿入
      rod.image = surface;
      centerrod.image = centersurface;

      //シーンに表示
      var delayadd = function () {

        rodscene.addChild(rod);
        rodscene.addChild(centerrod);
      };
      setTimeout(delayadd, 600);


      //クリックした時の動作
      var test = new Scene();
      var magni;


      rodscene.addEventListener('touchstart', function () {
        sound03.play();
        game.pushScene(test);
        magni = rod.x;
        var bairitu;
        if (magni > hensuX / 4) {
          bairitu = (hensuX / 2 - magni) / 10;
        } else {
          bairitu = magni / 10;
        }



          var hitsound = game.assets['sound/bomb.mp3']

        // enemy.tl.moveTo(141,41,1)
        // .moveTo(132,38,1)
        // .moveTo(143,42,1)
        // .moveTo(134,40,1)
        // .moveTo(147,39,1)
        // .moveTo(132,41,1)
        // .moveTo(143,37,1)
        // .moveTo(132,43,1)
        // .moveTo(140,40,1);
        enemy.tl.moveBy(1, 1, 1)
          .moveBy(-9, -2, 1)
          .moveBy(11, 4, 1)
          .moveBy(-9, -2, 1)
          .moveBy(13, -1, 1)
          .moveBy(-15, 2, 1)
          .moveBy(11, -4, 1)
          .moveBy(-11, 6, 1)
          .moveBy(8, -3, 1);

          //document.write(bairitu);
          //rodscene.removeChild(rodframe);
          rodscene.removeChild(rod);
          rodscene.removeChild(centerrod);

          //相手にダメージを与えるシーン
        //var attack = 10; //今は適当に、後で変える
        enemyhp = enemyhp - (bairitu * attack);
        parseInt(enemyhp);
        setInterval(function () {
          enemyhptext.text = String(parseInt(enemyhp));
        }, 100);

        //敵のHPが０になったときの処理
        if((enemyhp <= 0) && (boss_counter == 3)){
          enemyhp = 0;
         game.popScene();
         game.popScene();
         hitsound.play();
         enemy.tl.fadeOut(200);
         var ganchanlabel = new Label("よく僕を倒すことができたね。");
         var ganchanlabel2 = new Label("君には秀をあげるよ。")
         ganchanlabel.color = "rgb(255,255,255)";
         ganchanlabel2.color = "rgb(255,255,255)";
         ganchanlabel.x = 80;
         ganchanlabel.y = 120;
         ganchanlabel2.x = 80;
         ganchanlabel2.y = 140;
         commandscene.addChild(ganchanlabel);
         commandscene.addChild(ganchanlabel2);

          //maxhp = 999;
          //hp = 999;
          //level = 99;
          //attack += 100;
          ganchandelay = function(){
            backgroundmusic.stop();

            window.location.href = "./epi.html"
          };
          setTimeout(ganchandelay,7000);

        }
        else if(enemyhp <= 0){

        enemyhp = 0;

        game.popScene();
        game.popScene();
        hitsound.play();
        enemy.tl.fadeOut(50);

        popscenedelay = function(){
          maxhp += 100;
          hp += 100;
          attack += 2;
          resist += 5;
          level += 1;
          boss_counter += 1;
        game.popScene();
        game.popScene();



        //mapのBGMをまた再生させる
        backgroundmusic.change(game.assets['BGM/streetofrage.mp3']);

        };
        setTimeout(popscenedelay,2000);
        clearInterval(hpframeinterval);
        commandscene.removeChild(hpbarred);

      }
        else{
          //
          // Shooting_part呼び出し 戦うシーンです
          var s = function () {
            // textframe.opacity = 0;
            game.popScene(test);
            game.popScene(rodscene);
            hitsound.play();
            Shooting_part();
          };
          // var opacity1 = function() {textframe.opacity = 1;}
          //
          // var timeout = [s, opacity1];
          // var timeout = [s];
          // timeout.forEach(function(a) { //sとopacity1にsetTimeout1600
          //   setTimeout(a,1600);
          // });
          //
          setTimeout(s, 1600);
          // setTimeout(opacity1,7000);

        }








        var scenedelay = function () {
          rodframe.tl.scaleTo(1.875, 0.3125, 10);
          rodframe.tl.and();
          rodframe.tl.moveTo(140, 107, 10);
          setTimeout(rodframedelay, 400);
        };

        var rodframedelay = function () {
          commandscene.removeChild(rodframe);
          textframe.opacity = 1;
        };
        setTimeout(scenedelay, 7500);


      });





    }
    /*DOGEZAを選択したあと*/
    dogeza.ontouchstart = function () {
      sound03.play();
      dogezascene = new Scene();
      game.pushScene(dogezascene);
      var random;
      random = Math.random();
      if (random <= 0.1) {
        var noescape = new Label("お許しが出た!");
        noescape.color = 'rgb(0,255,0)';
        noescape.x = 105;
        noescape.y = 230;
        dogezascene.addChild(noescape);
        dogezascene.addEventListener('touchstart', function () {

          backgroundmusic.change(game.assets['BGM/streetofrage.mp3']);
          boss_counter += 1;
          game.popScene(dogezascene);
          game.popScene();
          game.popScene();
          clearInterval(hpframeinterval);
        });


      } else {
        var escape = new Label("許してはくれない！");
        escape.color = 'rgb(255,0,0)';
        escape.x = 105;
        escape.y = 230;
        dogezascene.addChild(escape);
        dogezascene.addEventListener('touchstart', function () {
          game.popScene(dogezascene);

          nowhplabel.opacity = 1;
          textframe.opacity = 0;
          dogezascene.removeChild(escape);
          var dogezaframe = new Textframe(10, 210, 300, 50);
          //dogezascene.addChild(dogezaframe);
          dogezaframe.tl.scaleTo(0.54, 3.2, 10);
          dogezaframe.tl.and();
          dogezaframe.tl.moveTo(10, 410, 10);
          dogezaframe.tl.removeFromScene();
          dogezaframedelay = function () {
            newdogezaframe = new Textframe(80, 80, 160, 160);
            newdogezaframe.opacity = 0.5;
            commandscene.addChild(newdogezaframe);
          };
          setTimeout(dogezaframedelay, 400);



          var s = function () {
            // textframe.opacity = 0;

            Shooting_part();
          };
          // var opacity1 = function() {textframe.opacity = 1;}
          //
          // var timeout = [s, opacity1];
          // var timeout = [s];
          // timeout.forEach(function(a) { //sとopacity1にsetTimeout1600
          //   setTimeout(a,1600);
          // });
          //
          setTimeout(s, 1600);
          // setTimeout(opacity1,7000);


          var scenedelay = function () {
            textframe.opacity = 1;
            commandscene.removeChild(newdogezaframe);

          };



          var framedelay = function () {
            newdogezaframe.tl.scaleTo(1.875, 0.3125, 10);
            newdogezaframe.tl.and();
            newdogezaframe.tl.moveTo(140, 107, 10);

            setTimeout(scenedelay, 440)
          };
          setTimeout(framedelay, 7500)




        });
      };






    }
  }

});
