//bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 22;
let raio = diametro/2;

//raquete do jogador
let xRaquete = 5;
let yRaquete = 150;
let larguraRaquete = 10;
let alturaRaquete = 90;
// oponente
let xOponente = 583;
let yOponente = 150;
let larguraOponente = 10;
let alturaOponente = 90;
let velocidadeYOponente;

let pontosJogador = 0;
let pontosOponente = 0;
let hit = false;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;
// sons do jogo
let raquetada;
let ponto;
let trilha;


function preload(){
  trilha = loadSound('trilha.mp3');
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound ("raquetada.mp3")
}

function setup() {
  createCanvas(600, 400);
  trilha.loop ();
}

function draw() {
  background(0);
  mostraBolinha ()
  movimentoBolinha ()
  verificarColisaoBorda ()
  mostraRaquete (xRaquete, yRaquete) 
  movimentoRaquete ()
  //verificarColisaoRaquete ()
  colisaoRaquete(xRaquete, yRaquete)
  mostraRaquete (xOponente, yOponente)
  colisaoRaquete(xOponente, yOponente)
  movimentoOponente ()
  imprimePlacar ()
  contaPontos ()
}


//funções bolinha

function mostraBolinha (){
   circle(xBolinha, yBolinha, diametro);
  
}


function movimentoBolinha (){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificarColisaoBorda (){
  if(xBolinha + raio > width ||
    xBolinha - raio < 0){
     velocidadeXBolinha *= -1;
     }
  if (yBolinha + raio > height ||
     yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
     }
}
// funções raquete jogador

function mostraRaquete (x,y){
  rect (x,y, larguraRaquete, alturaRaquete);
}

function movimentoRaquete (){
  if(keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if(keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}
function verificarColisaoRaquete (){
  if(xBolinha - raio < xRaquete + larguraRaquete){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}
function colisaoRaquete (x,y){
 hit=
   collideRectCircle(x, y, larguraRaquete, alturaRaquete, xBolinha, yBolinha, raio);
  if (hit){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }

}
//funções do oponente

function mostraOponente (){
  rect (xOponente,yOponente, larguraOponente, alturaOponente);
}

function colisaoOponenteBiblioteca (){
 hit=
   collideRectCircle(xOponente, yOponente, larguraOponente, alturaOponente, xBolinha, yBolinha, raio);
  if (hit){
    velocidadeXBolinha *= -1;
  }

}
function movimentoOponente (){
  velocidadeYOponente = (yBolinha - yOponente - larguraOponente ) /3.5 ;
  yOponente += velocidadeYOponente 
}

function imprimePlacar (){
 // stroke(255)
  textSize(16)
  textAlign(CENTER)
  fill(color(255, 140 ,0))
  rect(130, 10, 40,20)
  fill(255)
  text(pontosJogador, 150, 26)
  fill(color(255, 140 ,0))
  rect (430, 10, 40,20)
  fill(255)
  text(pontosOponente, 450, 26)
}
function contaPontos (){
  if(xBolinha > 590){
    pontosJogador += 1;
    ponto.play();
  }
  if (xBolinha < 10){
    pontosOponente += 1;
    ponto.play();
  }
}




