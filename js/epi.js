enchant();
window.onload = function() {
    var game = new Game(320, 320);
    game.fps = 20;
    game.preload('sound/button01b.mp3');
    game.onload = function(){
      //メッセージウィンドウ
        var Textframeepi = Class.create(Sprite, {
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

                  var epi = new Scene();
                  game.pushScene(epi);
                  var waku = new Textframeepi(20, 230, 290, 55);
                  epi.backgroundColor = "#000000";

                  var text = "こうして　学生は　無事　4号館　を%脱出　することに　成功した。";
                  novel(text, epi);
                  epi.addEventListener('touchstart', function(){
                    var epise = new Bgm();
                    epise.set(game.assets['sound/button01b.mp3']);
                    epise.play();
                    var episedelay = function(){
                      window.location.href = "./ed.html"
                    };
                    setTimeout(episedelay,400);
                  });


    }
    game.start();
  }
