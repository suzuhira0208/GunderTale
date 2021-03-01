enchant();
window.onload = function () {
    var game = new Game(320, 320);
    game.fps = 30;
    // マップ用画像の読み込み
    game.preload('map0.png', 'chara1.png');

    game.onload = function () {
        var mapScene = new Scene();
        // game.rootScene.backgroundColor = "#000000"; // 16x16 pxのサイズでマップオブジェクトの用意
        var map = new Map(16, 16);
        map.image = game.assets['map0.png'];
        // 配列でマップデータを用意する
        var mapArray = [
            [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
            [4, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 2, 2, 2, 2, 2, 2, 2, 2, 4],
            [4, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 2, 2, 2, 2, 2, 2, 2, 2, 4],
            [4, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 2, 2, 2, 2, 2, 2, 2, 2, 4],
            [4, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 2, 2, 2, 4, 2, 2, 2, 2, 4],
            [4, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 2, 2, 2, 2, 2, 2, 2, 2, 4],
            [4, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 2, 2, 2, 2, 2, 2, 2, 2, 4],
            [4, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 2, 2, 2, 2, 2, 2, 2, 2, 4],
            [4, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 2, 2, 2, 2, 2, 2, 2, 2, 4],
            [4, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 2, 2, 2, 2, 2, 2, 2, 2, 4],
            [4, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 2, 2, 2, 2, 2, 2, 2, 2, 4],
            [4, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 2, 2, 2, 2, 2, 2, 2, 2, 4],
            [4, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 2, 2, 2, 2, 2, 2, 2, 2, 4],
            [4, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 2, 2, 2, 2, 2, 2, 2, 2, 4],
            [4, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 2, 2, 2, 2, 2, 2, 2, 2, 4],
            [4, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 2, 2, 2, 2, 2, 2, 2, 2, 4],
            [4, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 2, 2, 2, 2, 2, 2, 2, 2, 4],
            [4, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 2, 2, 2, 2, 2, 2, 2, 2, 4],
            [4, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 2, 2, 2, 2, 2, 2, 2, 2, 4],
            [4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4]
        ];

        map.collisionData = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];
        // マップデータをマップオブジェクトに渡す
        map.loadData(mapArray);
        // シーンにマップオブジェクトを渡してシーンに描画する
        game.pushScene(mapScene);
        mapScene.addChild(map);

        // var lbl = new Label("クリックした座標位置");
        // lbl.moveTo(10, 170);
        // mapScene.addChild(lbl);

        // var lbl2 = new Label("hitTest()");
        // lbl2.moveTo(10, 190);
        // mapScene.addChild(lbl2);

        // mapScene.ontouchstart = function(e){
        //     lbl.text = "クリックした座標位置 (" + parseInt(e.x) + ", " + parseInt(e.y) + ")";
        //     lbl2.text = "hitTest(" + map.hitTest(e.x, e.y) + ")";
        // }

        var player = new Chara(200, 160);
        player.onenterframe = function() {
            this.frame = 0;
            this.scaleY = 1;
        // 右と左のような真逆の方向は入力されないのでelseで高速化する
        if (game.input.up) {
          this.y -= 3;
          this.frame = 1;
          if(collisionCheck(map, this.collision)) {
              console.log(this.collision.x);
              this.y += 3;
          }
        }
        else if (game.input.down) {
          this.y += 3;
          this.frame = 1;
          if(collisionCheck(map, this)) {
          this.y -= 3;
          }

        }
        if (game.input.left) {
          this.x -= 3;
          this.graphic.scaleX = -1;
          if(collisionCheck(map, this)){
              this.x += 3;
          }

        }
        else if (game.input.right) {
          this.x += 3;
          this.graphic.scaleX = 1;
          if(collisionCheck(map, this)){
              this.x -= 3;
          }
        }
        }
        mapScene.addChild(player);
    };
    // game.start();
    game.debug();
    function collisionCheck(mapName, sprite) {
        if (mapName.hitTest(sprite.x , sprite.y)) {
            console.log("right + up:" + (sprite.x ));
            return true;
        } else if(mapName.hitTest(sprite.x + 32 , sprite.y )) {
            console.log("left + down:" + (sprite.x ));
            return true;
        } else if (mapName.hitTest(sprite.x , sprite.y + 32)) {
            console.log("right + down:" + (sprite.x ));
            return true;
        } else if (mapName.hitTest(sprite.x + 32 , sprite.y + 32)) {
            console.log("left + down:" + (sprite.x));
            return true;

        } else {
            return false;

    }
    };

    var Chara = Class.create(Group ,{
        initialize: function (x, y) {
            Group.call(this);
            this.graphic = new Sprite(32,32);
            this.collision = new Sprite(16, 16);
            this.graphic.image = game.assets["chara1.png"];
            this.addChild(this.graphic);
            this.addChild(this.collision);
            this.x = x;
            this.y = y;
            // game.currentScene.addChild(this);

        },
        onenterframe: function(e) {
            this.collision.x = this.x;
            this.collision.y = this.y;
        }


    });






};
