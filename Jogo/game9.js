const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// ========================================================
// 1. ASSETS (Imagens)
// ========================================================
const assets = {
    player: new Image(), chica: new Image(), bonnie: new Image(),
    freddy: new Image(), endo: new Image(), pizza: new Image(),
    taser: new Image(), moeda: new Image(), bateriaItem: new Image(),
    lanternaHUD: new Image(), moedaHUD: new Image()
};

// ========================================================
// 2. CONFIGURAÇÕES
// ========================================================
const CONFIG = {
    vidaMaximaChica: 20,       
    vidaMaximaFreddy: 50,      
    velocidadeFreddyNormal: 7.5, 
    velocidadeFreddyLento: 2.0,  
    velocidadeFreddyVagar: 1.5,  
    tempoDesacelerado: 90,     
    tempoTontoFreddy: 120,     
    bateriaConsumo: 0.15,     
    raioLuz: 200,             
    anguloLanterna: 0.8,      
    maxSalas: 8,
    raioPercepcaoFreddy: 250 // Distância (em pixels) que o Freddy te nota sozinho
};

// ========================================================
// 3. ESTADOS DO JOGO (Variáveis Dinâmicas)
// ========================================================
const player = { 
    x: 475, y: 800, w: 50, h: 50, speed: 5, 
    moedas: 0, bateria: 100, hasTaser: false 
};

const progresso = { salaAtual: 1, vitoria: false };
const teclas = {};
const mouse = { x: 0, y: 0 }; 
let inimigos = [];
let moedasNoChao = [];
let bateriasNoChao = []; 
let pizzas = [];
let ondasChoque = [];
let lanternaAtiva = false; 

// Bosses
const chica = { 
    x: 450, y: 200, w: 100, h: 100, 
    vida: CONFIG.vidaMaximaChica, vivo: true, ultimoTiro: 0,
    direcaoX: undefined, direcaoY: undefined 
};
const bonnie = { x: 450, y: 200, w: 100, h: 100, vivo: true, atordoado: false, timerAtordoado: 0, cliques: 0, ultimoAtaque: 0 };

const freddy = { 
    x: 450, y: 100, w: 100, h: 100, vivo: true,
    vida: CONFIG.vidaMaximaFreddy,
    timerLento: 0,
    timerTonto: 0,
    perseguindo: false, 
    direcaoVagarX: 1,
    direcaoVagarY: 1,
    timerMudarDirecao: 0
};

// Objetos/Obstáculos da Sala 8
const obstaculosFreddy = [
    { x: 200, y: 300, w: 150, h: 80 },
    { x: 650, y: 300, w: 150, h: 80 },
    { x: 425, y: 500, w: 150, h: 80 },
    { x: 150, y: 650, w: 120, h: 120 },
    { x: 730, y: 650, w: 120, h: 120 }
];

// ========================================================
// 4. LÓGICA DE SPAWN E SALAS
// ========================================================
function carregarSala(numero, vindoDeOnde = "baixo") {
    inimigos = []; moedasNoChao = []; bateriasNoChao = []; pizzas = []; ondasChoque = [];
    
    if (vindoDeOnde === "baixo") player.y = 850; 
    else if (vindoDeOnde === "cima") player.y = 70;  

    if (numero === 8) {
        if (player.bateria < 45) {
            player.bateria = 75; 
        }
    }

    if ([2, 4, 5, 7].includes(numero)) {
        for(let i = 0; i < 3; i++) {
            inimigos.push({
                x: Math.random() * 800 + 100, y: Math.random() * 500 + 100,
                w: 60, h: 60, vivo: true, tipo: Math.floor(Math.random() * 3) + 1 
            });
        }
    }
}

// ========================================================
// 5. FUNÇÕES DE VERIFICAÇÃO DO CONE DE LUZ E VISÃO
// ========================================================
function noConeDeLuz(alvo) {
    if (player.bateria <= 0) return false;
    let centroPlayerX = player.x + player.w / 2;
    let centroPlayerY = player.y + player.h / 2;
    let centroAlvoX = alvo.x + alvo.w / 2;
    let centroAlvoY = alvo.y + alvo.h / 2;

    let dist = Math.hypot(centroAlvoX - centroPlayerX, centroAlvoY - centroPlayerY);
    if (dist > CONFIG.raioLuz) return false; 

    let anguloMouse = Math.atan2(mouse.y - centroPlayerY, mouse.x - centroPlayerX);
    let anguloAlvo = Math.atan2(centroAlvoY - centroPlayerY, centroAlvoX - centroPlayerX);

    let difAngulo = anguloAlvo - anguloMouse;
    while (difAngulo < -Math.PI) difAngulo += Math.PI * 2;
    while (difAngulo > Math.PI) difAngulo -= Math.PI * 2;

    return Math.abs(difAngulo) < CONFIG.anguloLanterna / 2;
}

function visaoBloqueadaPorObstaculo(p, f) {
    let pX = p.x + p.w / 2; let pY = p.y + p.h / 2;
    let fX = f.x + f.w / 2; let fY = f.y + f.h / 2;
    for (let obs of obstaculosFreddy) {
        if (linhaInterceptaRetangulo(pX, pY, fX, fY, obs)) return true;
    }
    return false;
}

function linhaInterceptaRetangulo(x1, y1, x2, y2, r) {
    let minX = Math.min(x1, x2), maxX = Math.max(x1, x2);
    let minY = Math.min(y1, y2), maxY = Math.max(y1, y2);
    if (maxX < r.x || minX > r.x + r.w || maxY < r.y || minY > r.y + r.h) return false;
    if (linhaInterceptaLinha(x1, y1, x2, y2, r.x, r.y, r.x + r.w, r.y)) return true;
    if (linhaInterceptaLinha(x1, y1, x2, y2, r.x, r.y + r.h, r.x + r.w, r.y + r.h)) return true;
    if (linhaInterceptaLinha(x1, y1, x2, y2, r.x, r.y, r.x, r.y + r.h)) return true;
    if (linhaInterceptaLinha(x1, y1, x2, y2, r.x + r.w, r.y, r.x + r.w, r.y + r.h)) return true;
    return false;
}

function linhaInterceptaLinha(a1x, a1y, a2x, a2y, b1x, b1y, b2x, b2y) {
    let det = (a2x - a1x) * (b2y - b1y) - (b2x - b1x) * (a2y - a1y);
    if (det === 0) return false;
    let u = ((b1x - a1x) * (b2y - b1y) - (b2x - b1x) * (b1y - a1y)) / det;
    let v = ((b1x - a1x) * (a2y - a1y) - (a2x - a1x) * (b1y - a1y)) / det;
    return (u >= 0 && u <= 1 && v >= 0 && v <= 1);
}

// ========================================================
// 6. MECÂNICAS DE COMBATE E IA
// ========================================================
function atualizar() {
    if (progresso.vitoria) return;
    const sala = progresso.salaAtual;

    // --- MOVIMENTO DO JOGADOR ---
    let proxX = player.x; let proxY = player.y;
    if (teclas['w'] || teclas['arrowup']) proxY -= player.speed;
    if (teclas['s'] || teclas['arrowdown']) proxY += player.speed;
    if (teclas['a'] || teclas['arrowleft']) proxX -= player.speed;
    if (teclas['d'] || teclas['arrowright']) proxX += player.speed;

    if (proxX < 0) proxX = 0;
    if (proxX > 1000 - player.w) proxX = 1000 - player.w;
    if (proxY < 0) proxY = 0;
    if (proxY > 1000 - player.h) proxY = 1000 - player.h;

    if (sala === 8) {
        let colidiuX = false; let colidiuY = false;
        obstaculosFreddy.forEach(obs => {
            if (colisao({ x: proxX, y: player.y, w: player.w, h: player.h }, obs)) colidiuX = true;
        });
        if (!colidiuX) player.x = proxX;
        obstaculosFreddy.forEach(obs => {
            if (colisao({ x: player.x, y: proxY, w: player.w, h: player.h }, obs)) colidiuY = true;
        });
        if (!colidiuY) player.y = proxY;
    } else {
        player.x = proxX; player.y = proxY;
    }

    // --- GESTÃO DA LANTERNA ---
    if (lanternaAtiva && player.bateria > 0) {
        player.bateria -= CONFIG.bateriaConsumo;
        if (player.bateria <= 0) { player.bateria = 0; lanternaAtiva = false; }
    } else { lanternaAtiva = false; }

    // --- LÓGICA DE CADA INIMIGO COMUM ---
    inimigos.forEach(e => {
        if (!e.vivo) return;
        let dist = distancia(player, e);
        if (e.tipo === 1) { 
            if (e.x < player.x) e.x += 2.5; else e.x -= 2.5;
            if (e.y < player.y) e.y += 2.5; else e.y -= 2.5;
        } else if (e.tipo === 2) { 
            if (dist < 350) {
                if (e.x < player.x) e.x += 2; else e.x -= 2;
                if (e.y < player.y) e.y += 2; else e.y -= 2;
            }
        } else if (e.tipo === 3) { 
            if (lanternaAtiva && noConeDeLuz(e)) { e.vivo = false; } 
            else {
                if (e.x < player.x) e.x += 1.5; else e.x -= 1.5;
                if (e.y < player.y) e.y += 1.5; else e.y -= 1.5;
            }
        }
        if (e.vivo && dist < 40) morrer();
    });

    // --- ATAQUE DA LANTERNA CONTÍNUA ---
    if (lanternaAtiva && [2, 4, 5, 7].includes(sala)) {
        inimigos.forEach(e => {
            if (e.vivo && e.tipo !== 3) { 
                if (noConeDeLuz(e)) { 
                    e.vivo = false;
                    let qtdMoedas = Math.floor(Math.random() * 3) + 1;
                    for(let i=0; i<qtdMoedas; i++) moedasNoChao.push({ x: e.x + Math.random()*40, y: e.y + Math.random()*40, w: 25, h: 25 });
                    if (Math.random() < 0.35) bateriasNoChao.push({ x: e.x + 10, y: e.y + 10, w: 55, h: 40 });
                }
            }
        });
    }

    // --- BOSS SALA 3: CHICA ---
    if (sala === 3 && chica.vivo) {
        if (chica.direcaoX === undefined) { chica.direcaoX = (Math.random() * 2 - 1); chica.direcaoY = (Math.random() * 2 - 1); }
        if (Math.random() < 0.02) { chica.direcaoX = (Math.random() * 2 - 1); chica.direcaoY = (Math.random() * 2 - 1); }
        chica.x += chica.direcaoX * 3; chica.y += chica.direcaoY * 3;

        if (chica.x <= 0) { chica.x = 0; chica.direcaoX *= -1; }
        if (chica.x + chica.w >= 1000) { chica.x = 1000 - chica.w; chica.direcaoX *= -1; }
        if (chica.y <= 0) { chica.y = 0; chica.direcaoY *= -1; }
        if (chica.y + chica.h >= 920) { chica.y = 920 - chica.h; chica.direcaoY *= -1; }

        let intervaloDisparo = 120 + (chica.vida * 10); 
        if (Date.now() - chica.ultimoTiro > Math.max(60, intervaloDisparo)) { 
            pizzas.push({ x: chica.x + chica.w / 2, y: chica.y + chica.h / 2, vx: (Math.random() * 10) - 5, vy: (Math.random() * 10) - 5 });
            chica.ultimoTiro = Date.now();
        }
        for (let i = pizzas.length - 1; i >= 0; i--) {
            let p = pizzas[i]; p.x += p.vx; p.y += p.vy;
            if (colisao(player, { x: p.x, y: p.y, w: 40, h: 40 })) morrer();
            if (p.y > 1000 || p.y < 0 || p.x < 0 || p.x > 1000) pizzas.splice(i, 1);
        }
    }

    // --- BOSS SALA 6: BONNIE ---
    if (sala === 6 && bonnie.vivo) {
        if (!player.hasTaser && colisao(player, {x:150, y:150, w:40, h:40})) player.hasTaser = true;
        if (!bonnie.atordoado) {
            if (bonnie.x < player.x) bonnie.x += 2; else bonnie.x -= 2;
            if (bonnie.y < player.y) bonnie.y += 2; else bonnie.y -= 2;
            if (Date.now() - bonnie.ultimoAtaque > 4000) {
                ondasChoque.push({ boss: bonnie, r: 0 });
                bonnie.atordoado = true; 
                bonnie.timerAtordoado = 180; 
                bonnie.ultimoAtaque = Date.now();
            }
        } else {
            bonnie.timerAtordoado--;
            if (bonnie.timerAtordoado <= 0) bonnie.atordoado = false;
            if (teclas['q'] && player.hasTaser && distancia(player, bonnie) < 150) {
                bonnie.cliques++; teclas['q'] = false; if (bonnie.cliques > 12) bonnie.vivo = false; 
            }
        }
        
        ondasChoque.forEach((o, i) => {
            o.r += 6; 
            let centroBonnieX = o.boss.x + o.boss.w / 2;
            let centroBonnieY = o.boss.y + o.boss.h / 2;
            let centroPlayerX = player.x + player.w / 2; 
            let centroPlayerY = player.y + player.h / 2;
            
            if (Math.hypot(centroPlayerX - centroBonnieX, centroPlayerY - centroBonnieY) - player.w / 2 <= o.r) morrer();
            if (o.r > 320) ondasChoque.splice(i, 1);
        });
    }

    // --- BOSS SALA 8: FREDDY (IA DINÂMICA DE PERCEPÇÃO) ---
    if (sala === 8 && freddy.vivo) {
        let distAteJogador = distancia(player, freddy);

        // Se o jogador chegar muito perto (Raio de Percepção) e a visão não estiver bloqueada, o Freddy acorda sozinho!
        if (!freddy.perseguindo && freddy.timerTonto <= 0 && distAteJogador < CONFIG.raioPercepcaoFreddy) {
            if (!visaoBloqueadaPorObstaculo(player, freddy)) {
                freddy.perseguindo = true;
            }
        }

        if (freddy.timerTonto > 0) {
            freddy.timerTonto--;
            if (freddy.timerTonto <= 0) {
                freddy.perseguindo = false; // Ao acordar, ele para de perseguir temporariamente para evitar loops de colisão
            }
        } else {
            let velX = 0;
            let velY = 0;

            if (freddy.perseguindo) {
                let vel = freddy.timerLento > 0 ? CONFIG.velocidadeFreddyLento : CONFIG.velocidadeFreddyNormal;
                if (freddy.timerLento > 0) freddy.timerLento--;

                if (freddy.x < player.x) velX = vel; else if (freddy.x > player.x) velX = -vel;
                if (freddy.y < player.y) velY = vel; else if (freddy.y > player.y) velY = -vel;
            } else {
                // Modo Vagar / Rodear
                freddy.timerMudarDirecao--;
                if (freddy.timerMudarDirecao <= 0) {
                    let anguloAleatorio = Math.random() * Math.PI * 2;
                    freddy.direcaoVagarX = Math.cos(anguloAleatorio);
                    freddy.direcaoVagarY = Math.sin(anguloAleatorio);
                    freddy.timerMudarDirecao = Math.floor(Math.random() * 120) + 60; 
                }
                velX = freddy.direcaoVagarX * CONFIG.velocidadeFreddyVagar;
                velY = freddy.direcaoVagarY * CONFIG.velocidadeFreddyVagar;
            }

            let proxFX = freddy.x + velX;
            let proxFY = freddy.y + velY;
            let colidiuObstaculo = false;

            obstaculosFreddy.forEach(obs => {
                if (colisao({ x: proxFX, y: proxFY, w: freddy.w, h: freddy.h }, obs)) {
                    colidiuObstaculo = true;
                }
            });

            if (proxFX < 0 || proxFX > 1000 - freddy.w || proxFY < 0 || proxFY > 920 - freddy.h) {
                colidiuObstaculo = true;
            }

            if (freddy.perseguindo && colidiuObstaculo) {
                freddy.timerTonto = CONFIG.tempoTontoFreddy;
                freddy.vida -= 1; 
                if (freddy.vida <= 0) freddy.vivo = false;
            } else {
                if (!colidiuObstaculo) {
                    freddy.x = proxFX;
                    freddy.y = proxFY;
                } else if (!freddy.perseguindo) {
                    // Rebate suavemente nas caixas enquanto rodeia o mapa
                    freddy.direcaoVagarX *= -1;
                    freddy.direcaoVagarY *= -1;
                }
            }
        }

        if (freddy.vivo && colisao(player, freddy)) morrer();
    }

    // --- LÓGICA DA PORTA DE SAÍDA ---
    if (player.y < 10) {
        let bloqueado = false;
        if (sala === 2 && inimigos.some(e => e.vivo)) bloqueado = true; 
        if (sala === 3 && chica.vivo) bloqueado = true;                
        if (sala === 6 && bonnie.vivo) bloqueado = true;               
        if (sala === 8 && freddy.vivo) bloqueado = true; 

        if (!bloqueado) {
            if (sala < CONFIG.maxSalas) { progresso.salaAtual++; carregarSala(progresso.salaAtual, "baixo"); } 
            else { progresso.vitoria = true; }
        } else { player.y = 10; } 
    }

    // --- MECÂNICA DE VOLTAR DE SALA ---
    if (player.y > 900 && progresso.salaAtual > 1) {
        let bossBloqueando = false;
        if (sala === 3 && chica.vivo) bossBloqueando = true;
        if (sala === 6 && bonnie.vivo) bossBloqueando = true;
        if (sala === 8) bossBloqueando = true; 

        if (!bossBloqueando) { progresso.salaAtual--; carregarSala(progresso.salaAtual, "cima"); } 
        else { player.y = 900; }
    }

    // --- COLETAS ---
    moedasNoChao.forEach((m, i) => { if (colisao(player, m)) { player.moedas++; moedasNoChao.splice(i, 1); } });
    bateriasNoChao.forEach((b, i) => {
        if (colisao(player, b)) { player.bateria += 25; if (player.bateria > 100) player.bateria = 100; bateriasNoChao.splice(i, 1); }
    });
}

// ========================================================
// 7. RENDERIZAÇÃO
// ========================================================
function desenharMascaradeLuz() {
    ctx.save(); ctx.fillStyle = "rgba(0, 0, 0, 0.96)"; ctx.fillRect(0, 0, 1000, 1000);
    if (lanternaAtiva && player.bateria > 0) {
        ctx.globalCompositeOperation = 'destination-out';
        let centroX = player.x + player.w / 2; let centroY = player.y + player.h / 2;
        let anguloBase = Math.atan2(mouse.y - centroY, mouse.x - centroX);
        let p2x = centroX + Math.cos(anguloBase - CONFIG.anguloLanterna / 2) * CONFIG.raioLuz;
        let p2y = centroY + Math.sin(anguloBase - CONFIG.anguloLanterna / 2) * CONFIG.raioLuz;
        let p3x = centroX + Math.cos(anguloBase + CONFIG.anguloLanterna / 2) * CONFIG.raioLuz;
        let p3y = centroY + Math.sin(anguloBase + CONFIG.anguloLanterna / 2) * CONFIG.raioLuz;
        const gradiente = ctx.createRadialGradient(centroX, centroY, 0, centroX, centroY, CONFIG.raioLuz);
        gradiente.addColorStop(0, 'rgba(0,0,0,1)'); gradiente.addColorStop(0.8, 'rgba(0,0,0,0.5)'); gradiente.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gradiente; ctx.beginPath(); ctx.moveTo(centroX, centroY); ctx.lineTo(p2x, p2y); ctx.lineTo(p3x, p3y); ctx.closePath(); ctx.fill();
    }
    ctx.restore(); 
}

function render() {
    ctx.clearRect(0, 0, 1000, 1000); ctx.fillStyle = "#161616"; ctx.fillRect(0, 0, 1000, 1000);
    desenharMascaradeLuz(); atualizar(); 

    const sala = progresso.salaAtual;
    let portaTrancada = false;
    if (sala === 2 && inimigos.some(e => e.vivo)) portaTrancada = true;
    if (sala === 3 && chica.vivo) portaTrancada = true;
    if (sala === 6 && bonnie.vivo) portaTrancada = true;
    if (sala === 8 && freddy.vivo) portaTrancada = true;

    ctx.fillStyle = portaTrancada ? "red" : "lime"; ctx.fillRect(470, 0, 60, 60); 

    moedasNoChao.forEach(m => desenharSprite(assets.moeda, m.x, m.y, m.w, m.h, "gold", "$"));
    bateriasNoChao.forEach(b => desenharSprite(assets.bateriaItem, b.x, b.y, b.w, b.h, "#00ff66", "Bateria"));
    inimigos.forEach(e => { if(e.vivo) desenharSprite(assets.endo, e.x, e.y, e.w, e.h, "red", "E" + e.tipo); });

    if (sala === 3 && chica.vivo) {
        desenharSprite(assets.chica, chica.x, chica.y, chica.w, chica.h, "yellow", "CHICA");
        pizzas.forEach(p => desenharSprite(assets.pizza, p.x, p.y, 40, 40, "orange", "PZ"));
    }
    if (sala === 6 && bonnie.vivo) {
        if (!player.hasTaser) desenharSprite(assets.taser, 150, 150, 40, 40, "cyan", "TSR");
        desenharSprite(assets.bonnie, bonnie.x, bonnie.y, 100, 100, bonnie.atordoado ? "#555" : "blue", "BONNIE");
        ondasChoque.forEach(o => {
            ctx.strokeStyle = "rgba(255, 255, 255, 0.8)"; ctx.lineWidth = 5;
            let centroB = o.boss.x + o.boss.w / 2;
            let centroY = o.boss.y + o.boss.h / 2;
            ctx.beginPath(); ctx.arc(centroB, centroY, o.r, 0, Math.PI*2); ctx.stroke();
        });
    }
    
    if (sala === 8) {
        obstaculosFreddy.forEach(obs => {
            ctx.fillStyle = "#333333"; ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
            ctx.strokeStyle = "#444444"; ctx.lineWidth = 3; ctx.strokeRect(obs.x, obs.y, obs.w, obs.h);
        });

        if (freddy.vivo) {
            let corFreddy = "#5d3a1a";
            let tagTexto = "FREDDY (RONDANDO)";

            if (freddy.timerTonto > 0) {
                corFreddy = (Math.floor(Date.now() / 100) % 2 === 0) ? "#d4af37" : "#555555";
                tagTexto = "TONTO!";
            } else if (freddy.perseguindo) {
                corFreddy = freddy.timerLento > 0 ? "#2b5270" : "#9e2a2b"; 
                tagTexto = freddy.timerLento > 0 ? "FUGIR (LENTO)" : "FUGIR!";
            }

            desenharSprite(assets.freddy, freddy.x, freddy.y, 100, 100, corFreddy, tagTexto);
        }
    }

    desenharSprite(assets.player, player.x, player.y, 50, 50, "lime", "PLAYER");

    // HUD
    ctx.fillStyle = "rgba(0,0,0,0.85)"; ctx.fillRect(0, 920, 1000, 80);
    desenharSprite(assets.moedaHUD, 30, 940, 40, 40, "gold", "$");
    ctx.fillStyle = "white"; ctx.font = "bold 24px Arial"; ctx.fillText(player.moedas, 85, 970);
    desenharSprite(assets.lanternaHUD, 200, 940, 40, 40, "white", "L");
    ctx.fillStyle = "#444"; ctx.fillRect(250, 950, 150, 20); 
    ctx.fillStyle = player.bateria > 20 ? "lime" : "red"; ctx.fillRect(250, 950, player.bateria * 1.5, 20); 
    ctx.fillStyle = "white"; ctx.fillText("SALA: " + progresso.salaAtual + " / 8", 800, 970);
    if (progresso.vitoria) { ctx.fillStyle = "lime"; ctx.font = "bold 50px Arial"; ctx.fillText("VOCÊ ESCAPOU!", 320, 500); }

    requestAnimationFrame(render);
}

// ========================================================
// 8. FUNÇÕES AUXILIARES BASE
// ========================================================
function desenharSprite(img, x, y, w, h, cor, txt) {
    if (img.complete && img.src !== "") {
        ctx.drawImage(img, x, y, w, h);
    } else {
        ctx.fillStyle = cor; ctx.fillRect(x, y, w, h);
        if (txt === "Bateria") {
            ctx.strokeStyle = "black"; ctx.lineWidth = 2; ctx.strokeRect(x, y, w, h);
            ctx.fillStyle = "black"; ctx.font = "bold 11px Arial"; ctx.fillText(txt, x + 6, y + h/2 + 4);
        } else {
            ctx.fillStyle = "white"; ctx.font = "bold 12px Arial"; ctx.fillText(txt, x + 5, y + h/2 + 5); 
        }
    }
}
function colisao(a, b) { return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y; }
function distancia(a, b) { return Math.hypot((a.x+a.w/2)-(b.x+b.w/2), (a.y+a.h/2)-(b.y+b.h/2)); }
function morrer() { window.location.reload(); }

// Eventos de Input
window.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect(); mouse.x = e.clientX - rect.left; mouse.y = e.clientY - rect.top;
});
window.addEventListener('mousedown', () => { 
    if(player.bateria > 0) {
        lanternaAtiva = true; 
        if (progresso.salaAtual === 3 && chica.vivo) {
            if (noConeDeLuz(chica)) { chica.vida -= 1; if (chica.vida <= 0) chica.vivo = false; }
        }
        if (progresso.salaAtual === 8 && freddy.vivo && freddy.timerTonto <= 0) {
            if (noConeDeLuz(freddy) && !visaoBloqueadaPorObstaculo(player, freddy)) {
                freddy.perseguindo = true;
                freddy.timerLento = CONFIG.tempoDesacelerado; 
            }
        }
    } 
});
window.addEventListener('mouseup', () => lanternaAtiva = false);
window.addEventListener('keydown', e => teclas[e.key.toLowerCase()] = true);
window.addEventListener('keyup', e => teclas[e.key.toLowerCase()] = false);

carregarSala(1);
render();