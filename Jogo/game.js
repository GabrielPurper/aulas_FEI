// ========================================================
// 1. CONFIGURAÇÃO DO CANVAS
// ========================================================
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// ========================================================
// 2. CARREGAMENTO DOS SPRITES (IMAGENS)
// ========================================================

// Criamos os objetos de imagem que serão desenhados no canvas
const spriteCenario = new Image();
spriteCenario.src = 'sprites/cenario.png'; // O seu mapa de 1000x1000

const spritePlayer = new Image();
spritePlayer.src = 'sprites/player.png'; // Sprite do jogador

const spriteEndo = new Image();
spriteEndo.src = 'sprites/endo.png'; // Sprite do inimigo

// Chica 
const spriteChica = new Image();
spriteChica.src = 'sprites/endo.png'; // Sprite do inimigo

//Bonnie 
const spriteBonnie = new Image();
spriteBonnie.src = 'sprites/endo.png'; // Sprite do inimigo

//Freddy 
const spriteFreddy = new Image();
spriteFreddy.src = 'sprites/endo.png'; // Sprite do inimigo

const spriteMoeda = new Image();
spriteMoeda.src = 'sprites/moeda.png'; // Sprite do item/moeda

// ========================================================
// 3. ESTADOS GLOBAIS (DADOS DOS OBJETOS)
// ========================================================

// Dados do Jogador (Substitui as variáveis soltas dos ficheiros antigos)
const player = {
    x: 500,
    y: 500,
    w: 50,
    h: 50,
    baseSpeed: 5,   // Velocidade base para resets
    speed: 5,       // Velocidade atual (pode ser alterada por itens)
    alpha: 1.0,     // Opacidade (para a Máscara do Bonnie)
    hasResurrection: false // Habilidade da Pizza Dourada
};

// Dados do Endoesqueleto
const endo = {
    x: 100,
    y: 100,
    w: 60,
    h: 60,
    speed: 2,       // Velocidade de perseguição
    ativo: true,
    canSpawn: true  // Controla se ele pode mover-se/aparecer
};

// Dados da Moeda (Substitui as divs do dropEndo.js)
const moeda = {
    x: 200,
    y: 200,
    w: 30,
    h: 30,
    ativa: true
};

// Dados da Lanterna (Adaptado do lanterna.js)
const statusLanterna = {
    energia: 100,
    estaLigada: false,
    consumo: 0.1,
    alcance: 150
};

// Sistema de Teclado para movimento fluido
const teclas = {};
window.addEventListener('keydown', e => teclas[e.key.toLowerCase()] = true);
window.addEventListener('keyup', e => teclas[e.key.toLowerCase()] = false);

// ========================================================
// 4. FUNÇÕES DE LÓGICA (CONSOLIDADO)
// ========================================================

/**
 * Lógica de Movimento do Player (Adaptado do moveplayer.js)
 * Move o jogador e respeita os limites do canvas de 1000px
 */
function logicaMovimentoPlayer() {
    if ((teclas['w'] || teclas['arrowup']) && player.y > 0) player.y -= player.speed;
    if ((teclas['s'] || teclas['arrowdown']) && player.y < 1000 - player.h) player.y += player.speed;
    if ((teclas['a'] || teclas['arrowleft']) && player.x > 0) player.x -= player.speed;
    if ((teclas['d'] || teclas['arrowright']) && player.x < 1000 - player.w) player.x += player.speed;
}

/**
 * Lógica de Perseguição do Endo (Adaptado do moveEndo.js)
 * O inimigo segue as coordenadas X e Y do jogador
 */
function logicaPerseguicaoEndo() {
    if (!endo.ativo || !endo.canSpawn) return; // Pausa se a máscara estiver ativa

    if (endo.x < player.x) endo.x += endo.speed;
    else if (endo.x > player.x) endo.x -= endo.speed;

    if (endo.y < player.y) endo.y += endo.speed;
    else if (endo.y > player.y) endo.y -= endo.speed;
}

/**
 * Lógica de Colisões e Proximidade (Adaptado do moeda.js e colisãoEndo.js)
 * Usa matemática para detetar toques entre sprites
 */
function verificarInteracoes() {
    // 1. Coleta de Moeda por proximidade (Raio de 40px)
    if (moeda.ativa) {
        let dx = (player.x + player.w/2) - (moeda.x + moeda.w/2);
        let dy = (player.y + player.h/2) - (moeda.y + moeda.h/2);
        let distancia = Math.sqrt(dx * dx + dy * dy);

        if (distancia < 40) {
            moeda.ativa = false;
            cartolafreddy(); // Aplica bónus ao coletar
        }
    }

    // 2. Colisão Mortal com o Endo
    let dxMorte = player.x - endo.x;
    let dyMorte = player.y - endo.y;
    let distMorte = Math.sqrt(dxMorte * dxMorte + dyMorte * dyMorte);

    if (distMorte < 30 && endo.ativo) {
        if (player.hasResurrection) {
            player.hasResurrection = false; // Usa a Pizza Dourada
            player.x = 50; player.y = 50; // Teleporta para início
        } else {
            morrer(); // Game Over
        }
    }
}

/**
 * Gerenciamento da Lanterna e Bateria (Adaptado do lanterna.js)
 */
function gerenciarLanterna() {
    if (teclas['f'] && statusLanterna.energia > 0) {
        statusLanterna.estaLigada = true;
        statusLanterna.energia -= statusLanterna.consumo; // Gasta bateria
    } else {
        statusLanterna.estaLigada = false;
    }

    // Se a luz atingir o Endo, ele dropa moeda (Adaptado do moeda.js)
    if (statusLanterna.estaLigada) {
        let dxLuz = player.x - endo.x;
        let dyLuz = player.y - endo.y;
        if (Math.sqrt(dxLuz * dxLuz + dyLuz * dyLuz) < statusLanterna.alcance) {
            endo.ativo = false; // Endo some
            moeda.x = endo.x; moeda.y = endo.y; moeda.ativa = true; // Drop
            setTimeout(() => { endo.ativo = true; }, 3000); // Reaparece depois
        }
    }
}

// ========================================================
// 5. LOOP DE RENDERIZAÇÃO (O CORAÇÃO DO JOGO)
// ========================================================

function gameLoop() {
    // 1. Limpa o canvas para o novo frame
    ctx.clearRect(0, 0, 1000, 1000);

    // 2. Processa a lógica
    logicaMovimentoPlayer();
    logicaPerseguicaoEndo();
    verificarInteracoes();
    gerenciarLanterna();

    // 3. Desenha os elementos (A ordem importa!)
    ctx.drawImage(spriteCenario, 0, 0, 1000, 1000); // Fundo

    if (moeda.ativa) ctx.drawImage(spriteMoeda, moeda.x, moeda.y, moeda.w, moeda.h);

    if (endo.ativo) ctx.drawImage(spriteEndo, endo.x, endo.y, endo.w, endo.h);

    // Efeito visual da Lanterna (Círculo de luz)
    if (statusLanterna.estaLigada) {
        ctx.beginPath();
        ctx.fillStyle = "rgba(255, 255, 0, 0.15)";
        ctx.arc(player.x + player.w/2, player.y + player.h/2, statusLanterna.alcance, 0, Math.PI*2);
        ctx.fill();
    }

    // Desenha o Player com opacidade variável
    ctx.globalAlpha = player.alpha;
    ctx.drawImage(spritePlayer, player.x, player.y, player.w, player.h);
    ctx.globalAlpha = 1.0;

    // Interface (HUD)
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Bateria: " + Math.floor(statusLanterna.energia) + "%", 20, 40);

    requestAnimationFrame(gameLoop);
}

// Funções auxiliares (Originalmente spawnEndo.js e colisãoEndo.js)
function morrer() { window.location.reload(); }
function gerarPosicaoAleatoria() { return { x: Math.random()*900, y: Math.random()*900 }; }

// Inicia o jogo
spriteCenario.onload = () => { gameLoop(); };