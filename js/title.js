enchant();
window.onload = function() {
    var game = new Game(320, 320);
    game.fps = 20;
    game.preload('./img/chara1.png','./img/chara2.png', 'sound/button01b.mp3',
                 './img/gundertale.png','./img/ganchan.png',
                 'sound/GUNDERTALE.mp3', './img/op1.png', './img/op2.png', './img/op3.png', './img/4gokan.png');

    game.onload = function() {


    //メッセージウィンドウ
      var Textframeop = Class.create(Sprite, {
        initialize:function(x,y,z,u){
          Sprite.call(this, 300, 60);
          this.x = x;
          this.y = y;

          var textframesurface = new Surface(300, 60);
          textframesurface.context.strokeStyle = "rgb(255, 255, 255)"//外枠の色
          textframesurface.context.strokeRect(0, 0, z, u);//枠のみの矩形

          //textframesurface.context.fillStyle = "rgb(0, 0, 0)"//塗りつぶしの色
          //textframesurface.context.fillRect(1, 1, z-2, u-2);
          this.image = textframesurface;
          game.currentScene.addChild(this);

        }
      });

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

//文字を１文字ずつ表示する関数
          var novel = function(text,main_scene){
          			var zisuu = text.length;
              	//ラベルを作る
          			var novel_on = new Label();
          			novel_on.x = 25;
          			novel_on.y = 235;
          			novel_on.width = 250;
          			novel_on.height = 160;
          			novel_on.color = '#ffffff';
          			novel_on.font = "15px sans-serif";
          			//一時停止用シーン
          			var pause_scene_at = new Scene();//＠
          			var pause_scene_and = new Scene();//＆
          			var pause_scene_end = new Scene();//＄
          			//フレームに併せて一文字ずつ表示していく
          			var str = 0;
          			novel_on.addEventListener('enterframe',function(){
          				//記号取得用
          				var key = text.substring(str,str+1);
          				//フレームにあわせて一文字ずつ表示していく
          				novel_on.text = text.substring(0,str);
          		 	  //各記号で動作を制御
          				if(key == "@"){//クリック待ち
          					//@を取り除く
          					text = text.replace( "@" , "" );
          					zisuu = text.length;
          					//フレームを止める
          					game.pushScene(pause_scene_at);
          					//クリックでフレーム再開
          					pause_scene_at.addEventListener('touchend',function(){
          						//ポーズシーンを排除・再動作
          						game.popScene(pause_scene_at);
          						game.pushScene(main_scene);
          					});
                    }else if(key == "%"){//改行+クリック待ち
                    // %を改行に置き換え
          					text = text.replace( "%" , "<br/>" );
                              str += 5;
          					zisuu = text.length;

          				  }else if(key == "&"){//改ページ

          					//&を取り除く
          					text = text.replace( "&" , "" );
          					zisuu = text.length;

          					//フレームを止める
          					game.pushScene(pause_scene_and);

          					//クリックでフレーム再開
          					pause_scene_and.addEventListener('touchend',function(){

          						//ポーズシーンを排除・再動作
          						game.popScene(pause_scene_and);
          						game.pushScene(main_scene);

          						//残っているテキストを抽出
          						text = text.slice(str,zisuu);

          						//フレーム進行をリセット
          						str = 0;
          					});

          				   }else if(key == "$"){//文章終わり
          						//フェードアウト
          						novel_on.tl.delay(20).fadeOut(20).then(function(){
          							//削除
          							main_scene.removeChild(novel_on);
          						});
          				}else{//通常の表示
          					str++;
          				}
          			});
          			//表示
          			main_scene.addChild(novel_on);
          };

    //タイトルシーン
        var title = new Scene();
        game.rootScene.backgroundColor = "000000";
        var startImage = new Sprite(262,24);
        startImage.image = game.assets['./img/gundertale.png'];
        startImage.x = 27;
        startImage.y = 136;
        game.rootScene.addChild(startImage);

        var bgm = new Bgm();
        bgm.set(game.assets['sound/GUNDERTALE.mp3']);
        bgm.play();
        game.onenterframe = function(){
            bgm.loop();
        };

        var start = new Label('touch to start');
        start.textAlign = 'center';
        start.color = '#ffffff';
        start.x = 0;
        start.y = 196;
        start.font = '14px sans-serif';
        game.rootScene.addChild(start);
        start.addEventListener(Event.ENTER_FRAME, function(){
            start.opacity = (new Date()).getMilliseconds() > 500 ? 1 : 0;
        });

        //OPシーン
          //1ページ目
              var op1 = new Scene();
              op1.backgroundColor = "#000000";
              var chara1 = new Sprite(300,300);
              chara1.image = game.assets['./img/op1.png'];
              chara1.scale(0.5,0.5);
              //chara1.x = 0;
              chara1.y = -20;
              op1.addChild(chara1);

              var text1 = "昔々 地球 には%学生 と 教授 という%２つ の 種族 が いました。";
              novel(text1, op1);

              //仮のStatus呼び出し
              op1.addEventListener('enterframe', function(){
                if(game.input.up){
                  game.pushScene(Status(100, 1, 0, 0, 0));
                }
              });

          //2ページ目
              var op2 = new Scene();
              op2.backgroundColor = '#000000';
              var chara2 = new Sprite(300,290);
              chara2.image = game.assets['./img/op2.png'];
              chara2.scale(0.5,0.5);
              chara2.x = 0;
              chara2.y = -20;
              op2.addChild(chara2);

              var text2 = "ところが ある時%2つ の 種族 の 間 に%戦争 が おきました。";
              novel(text2, op2);

          //3ページ目
              var op3 = new Scene();
              op3.backgroundColor = '#000000';
              var chara3 = new Sprite(180,180);
              chara3.image = game.assets['./img/op3.png'];
              //chara3.scale(5,5);
              chara3.x = 70;
              chara3.y = 30;
              op3.addChild(chara3);

              var text3 = "そして 長い 戦いの末%学生 が 勝利 しました。";
              novel(text3, op3);

          //4ページ目
              var op4 = new Scene();
              op4.backgroundColor = '#000000';

              var text4 = "それから さらに 長い 時が 流れ・・・・・・。";
              novel(text4, op4);

          //5ページ目
              var op5 = new Scene();
              op5.backgroundColor = '#000000';
              var chara5 = new Sprite(180,180);
              chara5.image = game.assets['./img/4gokan.png'];
              //chara5.scale(5,5);
              chara5.x = 70;
              chara5.y = 30;
              op5.addChild(chara5);

              var text5 = "4号館%        20XX年";
              novel(text5, op5);

          //6ページ目
              var op6 = new Scene();
              op6.backgroundColor = '#000000';
              var chara6 = new Sprite(180, 180);
              chara6.image = game.assets['./img/4gokan.png'];
            //  chara5.scale(5,5);
              chara6.x = 70;
              chara6.y = 30;
              op6.addChild(chara6);

              var text6 = "それは 「入った者は 2度と 出られない」%と 言われる 伝説の 建物 でした。$";
              novel(text6, op6);

              chara6.tl.delay(60).fadeOut(20).then(function(){
                window.location.href = "./map.html";
                //削除
                op6.removeChild(chara6);
              });


    //タイトルシーンをタッチした時の処理
        game.rootScene.addEventListener('touchstart', function() {
            var titlese = new Bgm();
            titlese.set(game.assets['sound/button01b.mp3'].clone());
            titlese.play();
            game.replaceScene(op1);
            var waku = new Textframeop(20, 230, 290, 55);

        });


        op1.addEventListener('touchstart', function(){
            var titlese = new Bgm();
            titlese.set(game.assets['sound/button01b.mp3'].clone());
            titlese.play();
            game.replaceScene(op2);
            var waku = new Textframeop(20, 230, 290, 55);
        });

        op2.addEventListener('touchstart', function(){
            var titlese = new Bgm();
            titlese.set(game.assets['sound/button01b.mp3'].clone());
            titlese.play();
            game.replaceScene(op3);
            var waku = new Textframeop(20, 230, 290, 55);
        });

        op3.addEventListener('touchstart', function(){
            var titlese = new Bgm();
            titlese.set(game.assets['sound/button01b.mp3'].clone());
            titlese.play();
            game.replaceScene(op4);
            var waku = new Textframeop(20, 230, 290, 55);
        });

        op4.addEventListener('touchstart', function(){
            var titlese = new Bgm();
            titlese.set(game.assets['sound/button01b.mp3'].clone());
            titlese.play();
            game.replaceScene(op5);
            var waku = new Textframeop(20, 230, 290, 55);
        });

        op5.addEventListener('touchstart', function(){
            var titlese = new Bgm();
            titlese.set(game.assets['sound/button01b.mp3'].clone());
            titlese.play();
            game.replaceScene(op6);
            var waku = new Textframeop(20, 230, 290, 55);
        });

      }
    game.start();
}
