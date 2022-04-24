var canvas = document.getElementById('game');
var context = canvas.getContext("2d"); 

class Mundo {
    constructor(width,height,ctx,cv){
        this._w = width;
        this._w = height;
        this._ctx = ctx;
        this._cv = cv;
    }

    
    render = function(obj,x,y,w,h){
        this._ctx.clearRect(0, 0, 800, 600);
         
        this._ctx.drawImage(obj,x,y,w,h);

    }

}


class Personagem {
    constructor(x,y,w,h,imagem){
        this._x = x;
        this._y = y;
        this._w = w;
        this._h = h;
        this._imagem = imagem;
    }
}

var mundo = new Mundo(800,600,context,canvas);

var dino = new Image();
dino.src = "./static/img/dino.png"

var p = new Personagem(10,10,50,50,dino);
x = 0;
var loop = function(){
    p._x+=1;
    mundo.render(dino,x,10,50,50);
    mundo.render(p._imagem, p._x,p._y,p._w,p._h);
}


setInterval(loop, 1000/30);



