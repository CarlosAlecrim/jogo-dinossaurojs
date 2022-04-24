
class Personagem{
    constructor(x,y,width,height,imagem,name){
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this.imagem = imagem;
        this._name = name; 
    }

    get X(){
        return this._x
    }
    set X(valor){
        this._x = valor;
    }

    get Y(){
        return this._y
    }
    set Y(valor){
        this._y = valor;
    }


    get Width(){
        return this._width;
    }
    set Width(valor){
        this._width = valor;
    }

    get Height(){
        return this._height
    }
    set Height(valor){
        this._height = valor;
    }


}


class Dino extends Personagem{
    constructor(x,y,width,height,imagem,name){
        super(x,y,width,height,imagem,name);
        this._vida = 3;
        this.altura = 40;
        this.velocidade = 0.5;
        this.spaco = 0;
        this.saltar = false;

    }

    receber_dano = function(){
        if(this._vida == 0){
            return  "Game Over";
        }
        this._vida = this._vida - 1;
    }

    jump = function(){
        if(this.saltar){
        console.log(this._y+" "+this.spaco);
        let aux = 550;
        this.spaco+=1;
        if(this.spaco>0 &&  (this.spaco <= (this.altura/2))){
            this.velocidade+=0.7;
            this._y = this._y-this.velocidade;

        }else if(this.spaco> (this.altura/2) && this.spaco<=this.altura){
            this.velocidade-=0.7;
            this._y = this._y  + this.velocidade;
            if(this.spaco==this.altura){
                this.spaco=0;
                this.velocidade=0;
                this._y = aux;
                this.saltar = false;

            }
        }

        }
        

        
    }
    
    
}

class Deserto extends Personagem{
    constructor(x,y,width,height,imagem,name){
        super(x,y,width,height,imagem,name);
    }

    scroll = function(){
        this._x-=2;
        if(this._x <= -800){
            this._x = 800;
        }
    }
}

class Cacto  extends Personagem{
    constructor(x,y,width,height,imagem,name){
        super(x,y,width,height,imagem,name);
    }

    move = function(){
        this._x-=7;
    }
}


class Mundo {

    constructor(width,height){
        this.width = width;
        this.height = height;
        this.game = document.querySelector('.game');
        this.cv = document.createElement("canvas");
        this.ctx = this.cv.getContext("2d");
    }

    criar_mundo = function(){
        this.cv.width = this.width ;
        this.cv.height = this.height;
        this.cv.style.backgroundColor= "#cccccc";

        this.game.appendChild(this.cv);
     }

    render = function(vetor){
        this.ctx.clearRect(0, 0, this.width, this.height);
        for(const element of vetor){
         
            this.ctx.drawImage(element.imagem,element.X,element.Y,element.Width,element.Height);
        }
        
    }

    colision = function (object1, object2){

        var r1 = object1.Width/2;
        var r2 = object2.Width/2;
        var pontoX1 = object1.X+r1;
        var pontoY1 = object1.Y+r1; 
        var pontoX2 = object2.X+r2;
        var pontoY2 = object2.Y+r2;
        var distancia = Math.sqrt( Math.pow( (pontoX1-pontoX2),2)+Math.pow( pontoY1-pontoY2,2));

        if ( distancia-(r1+r2)<0){
            alert("game over");
        }
    }

}

var m = new Mundo(800,600);

var dino = new Image();
dino.src = "./static/img/dino.png";
var dinossauro = new Dino(10,550,50,50,dino,"dino");

var background = new Image();
background.src = "./static/img/background.png";
var deserto = new Deserto(0,0,800,600,background,"deserto");
var deserto2 = new Deserto(800,0,800,600,background,"deserto");


var cactus = new Image();
cactus.src = "./static/img/cactus.png";
var cacto = new Cacto(720,550,50,50,cactus,"cacto");


var vetor = [];

vetor.push(deserto2);
vetor.push(deserto);

vetor.push(dinossauro);
vetor.push(cacto);

m.criar_mundo();

var control = 0;
var loop = function(){
    window.addEventListener('keydown', pressionaTecla, true);

    for(const element of vetor){
            
        if(element._name == "dino"){
            element.jump();
        }
        if(element._name =="deserto"){
            element.scroll();
        }

        if(element._name == "cacto"){
            element.move();   
        }
    }
    
    if(control > Math.round(650+Math.random()*300) ){
        control=0;
        vetor.push(new Cacto(Math.round(800+Math.random()*800),550,50,50,cactus,"cacto"));
    }
    control+=5;

    for(let i=0; i< vetor.length; i++){
        if(vetor[i]._name == "cacto" && vetor[i]._x < -1250 && (vetor.length >8)){
            vetor.splice(i,i);
            break;
        }
    }

    for( let i=0; i < vetor.length ;i++ ){
        if(vetor[i]._name == "cacto"){
            m.colision(vetor[2],vetor[i])
           
        }
        
    }

    m.render(vetor);

    
}

setInterval(loop,1000/30);

function pressionaTecla(e){
    if(e.keyCode == 32)
    {
        for(const element of vetor){
            if(element._name == "dino"){
                element.saltar = true;
            }
        
        }
    }

}




