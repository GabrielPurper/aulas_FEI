// ========================================================
// CONFIGURAÇÃO INICIAL DO CANVAS (Área de Desenho do Jogo)
// ========================================================
// Obtém o elemento HTML <canvas> através do ID para vincular o script à tela de pintura gráfica
const canvas = document.getElementById('gameCanvas');
// Define o contexto de renderização como 2D, que fornece os métodos de desenho (retângulos, imagens, texto)
const ctx = canvas.getContext('2d');

// ========================================================
// 1. ASSETS (Dicionário de Objetos de Imagem para os Sprites)
// ========================================================
// Cria instâncias vazias de objetos Image. O navegador carregará os arquivos atribuídos a elas posteriormente
const assets = {
    player: new Image(),       // Sprite do personagem principal (jogador)
    chica: new Image(),        // Sprite do Boss Chica
    bonnie: new Image(),       // Sprite do Boss Bonnie
    freddy: new Image(),       // Sprite do Boss Final Freddy
    endo: new Image(),         // Sprite dos inimigos comuns (Endoesqueletos)
    pizza: new Image(),        // Sprite dos projéteis da Chica e das pizzas de perks
    taser: new Image(),        // Sprite do item Taser coletável na Sala 6
    moeda: new Image(),        // Sprite das moedas derrubadas pelos inimigos no chão
    batteryItem: new Image(),  // Sprite das baterias que recarregam a lanterna
    lanternaHUD: new Image(),  // Sprite do ícone de lanterna no painel inferior (HUD)
    moedaHUD: new Image(),     // Sprite do ícone de moeda no painel inferior (HUD)

    // Objetos para carregar as imagens das suas salas PNG
    sala1: new Image(),
    sala2: new Image(),
    sala3: new Image(), // Sala do Boss Chica
    sala4: new Image(),
    sala5: new Image(),
    sala6: new Image(),
    sala7: new Image()
};

// --- ADICIONE ESTA FUNÇÃO LOGO ABAIXO DO SEU DICIONÁRIO ---
function iniciarCarregamentoImagens() {
    // Vincula cada objeto de imagem ao seu respectivo arquivo PNG na pasta "sprites"
    assets.player.src       = 'sprites/player_baixo_0.png'; // Sprite inicial parado
    assets.chica.src        = 'sprites/chica.png';
    assets.bonnie.src       = 'sprites/bonnie.png';
    assets.freddy.src       = 'sprites/freddy.png';
    assets.endo.src         = 'sprites/endo.png';
    assets.pizza.src        = 'sprites/pizza_tiro.png';
    assets.taser.src        = 'sprites/taser.png';
    assets.moeda.src        = 'sprites/moeda.png';
    assets.batteryItem.src  = 'sprites/bateria.png';
    assets.lanternaHUD.src  = 'sprites/hud_lanterna.png';
    assets.moedaHUD.src     = 'sprites/hud_moeda.png';

    assets.sala1.src = '../c/salaInicialSafe.jpg';
    assets.sala2.src = '../c/salaAntesChica.jpg';
    assets.sala3.src = '../c/batalhaChica.jpg';
    assets.sala4.src = '../c/salaAntesBonnie.jpg';
    assets.sala5.src = '../c/batalhaBonnie.jpg';
    assets.sala6.src = '../c/salaAntesFreddy.jpg';
    assets.sala7.src = '../c/batalhaFreddy.jpg';
}

// Executa o carregamento das imagens
iniciarCarregamentoImagens();

// ========================================================
// 2. CONFIGURAÇÕES GERAIS E EQUILÍBRIO (Balancing do Jogo)
// ========================================================
// Objeto estático contendo variáveis globais de calibração de dificuldade, danos, vidas e velocidades
const CONFIG = {
    vidaMaximaChica: 25,          // Quantidade de cliques de lanterna necessários para derrotar a Chica (25)
    vidaMaximaFreddy: 90,         // Vida em pontos decimais do Boss Freddy (reduzida continuamente sob a luz)
    vidaMaximaBonnie: 30,         // Quantidade de cliques na tecla 'Q' com o Taser para derrotar o Bonnie (30)
    velocidadeFreddyNormal: 7.5,  // Velocidade de perseguição padrão do Freddy quando está no escuro
    velocidadeFreddyLento: 2.0,   // Velocidade reduzida do Freddy quando o jogador foca a lanterna nele
    velocidadeFreddyVagar: 1.5,   // Velocidade com que Freddy anda aleatoriamente (caso fosse usado um modo ocioso)
    tempoDesacelerado: 90,        // Duração (em frames) do efeito de lentidão
    tempoTontoFreddy: 120,        // Duração (em frames) do estado atordoado do Freddy
    bateriaConsumo: 0.15,         // Taxa de descarga por frame da bateria da lanterna quando ligada
    raioLuzNormal: 200,           // Alcance máximo em pixels do círculo/cone de iluminação da lanterna
    anguloLanternaNormal: 0.8,    // Abertura angular em radianos do feixe de luz da lanterna (~45 graus)
    maxSalas: 8,                  // Número total de salas necessárias para vencer e escapar do jogo
    raioPercepcaoFreddy: 450      // Distância em pixels que ativa o comportamento de caça do Freddy
};

// ========================================================
// 3. ESTADOS DINÂMICOS DO JOGO (Variáveis de Controle de Entidades)
// ========================================================
// Objeto que gerencia as coordenadas, dimensões, velocidades e perks do jogador
const player = { 
    x: 475, y: 800,               // Posição inicial centralizada na parte inferior da Sala 1
    w: 50, h: 50,                 // Largura e altura do quadrado de colisão do jogador (50x50 pixels)
    speedNormal: 5,               // Velocidade padrão de movimentação por frame
    speed: 5,                     // Velocidade dinâmica atual (afetada por bônus/lentidão)
    moedas: 0,                    // Contador de moedas coletadas para compras na loja
    battery: 100,                 // Porcentagem atual da carga da bateria (0 a 100)
    hasTaser: false,              // Flag booleana que indica se o jogador coletou o Taser da Sala 6
    
    // Flags de inventário: indica se o item comprado na loja está guardado para ser ativado na próxima sala com perigo
    hasPerkLanterna: false,
    hasPerkVelocidade: false,
    hasPerkEscudo: false,

    // Timers de duração ativa (em frames) dos efeitos dos perks comprados
    timerPerkLanterna: 0,
    timerPerkVelocidade: 0,
    timerPerkEscudo: 0,

    // Perks permanentes de Bosses obtidos após derrotar Chica ou Bonnie (mantidos até a morte)
    temPerkChica: false,
    temPerkBonnie: false 
};

// Gerencia o progresso das fases, fluxo de vitória e o estado alternativo de interface da loja da sala 4
const progresso = { salaAtual: 1, vitoria: false, lojaAtiva: false };
// Dicionário mapeando as teclas pressionadas (true) ou soltas (false) para movimentação fluida
const teclas = {};               
// Armazena as coordenadas X e Y em tempo real do cursor do mouse dentro do Canvas
const mouse = { x: 0, y: 0 };    

// Controla o loop de execução gráfica: falso interrompe a atualização da tela
let jogando = true; 

// Arrays dinâmicos que armazenam as entidades geradas dinamicamente na sala atual
let inimigos = [];                // Lista de objetos contendo os Endoesqueletos ativos
let moedasNoChao = [];            // Lista de moedas dropadas disponíveis para coleta
let bateriasNoChao = [];          // Lista de pilhas/baterias dropadas disponíveis para coleta
let pizzas = [];                  // Lista contendo os projéteis de pizza disparados pela Chica
let ondasChoque = [];             // Lista de expansões circulares do ataque em área do Bonnie na fase final
let pulsosCone = [];              // Lista de disparos direcionais em cone do Bonnie
let lanternaAtiva = false;        // Estado booleano da iluminação do jogador (Ligada/Desligada)

// Armazenamento de posições físicas dos drops deixados pelos chefes derrotados
let itemPerkChicaNoChao = null;   // Armazena {x, y, w, h} do item da Chica após sua morte
let itemPerkBonnieNoChao = null;  // Armazena {x, y, w, h} do item do Bonnie após sua morte
let pizzasEspeciaisNoChao = [];   // Armazena itens consumíveis gerados pelo poder da Chica em novas salas

// Registro permanente de derrotas dos chefes para evitar que eles respawnem ao reentrar nas salas
const estadoSalas = {
    chicaDerrotada: false,
    bonnieDerrotado: false,
    freddyDerrotado: false
};

// Tabela de preços do mercado negro da Sala 4 (Acessada via corredor esquerdo)
const PRECOS_LOJA = {
    velocidade: 13,               // Preço em moedas do energético de velocidade
    lanterna: 20,                 // Preço em moedas da superlente de lanterna
    escudo: 25                    // Preço em moedas do gerador de escudo invulnerável
};

// Definição geométrica dos botões clicáveis e textos explicativos de cada item da loja
const itensLoja = [
    { x: 180, y: 400, w: 100, h: 65, tipo: "lanterna", preco: PRECOS_LOJA.lanterna, texto: "Super Lanterna (20s)" },
    { x: 450, y: 400, w: 100, h: 65, tipo: "velocidade", preco: PRECOS_LOJA.velocidade, texto: "Velocidade (5s)" },
    { x: 720, y: 400, w: 100, h: 65, tipo: "escudo", preco: PRECOS_LOJA.escudo, texto: "Escudo Protetor (4s)" }
];

// Estado estruturado do Boss Chica (Sala 3)
const chica = { 
    x: 450, y: 200, w: 100, h: 100,     // Posição e caixa de colisão
    vida: CONFIG.vidaMaximaChica,       // Registrador de integridade atual
    vivo: true,                         // Estado de atividade
    ultimoTiro: 0,                      // Timestamp MS do último projétil disparado
    direcaoX: undefined,                // Vetor de movimento horizontal flutuante
    direcaoY: undefined                 // Vetor de movimento vertical flutuante
};

// Estado estruturado do Boss Bonnie (Sala 6)
const bonnie = { 
    x: 450, y: 200, w: 100, h: 100,     // Posição inicial no topo-centro da arena
    vivo: true,                         // Estado de atividade
    atordoado: false,                   // Flag que impede movimentação durante recarga de energia dele
    timerAtordoado: 0,                  // Duração restante do atordoamento em frames
    cliques: 0,                         // Contador de danos recebidos via Taser
    ultimoAtaque: 0                     // Timestamp MS do último disparo em cone realizado
};

// Mapeamento dos 4 blocos de pilares indestrutíveis dispostos simetricamente na Sala 6 do Bonnie
const obstaculosBonnie = [
    { x: 250, y: 350, w: 100, h: 100 }, { x: 650, y: 350, w: 100, h: 100 }, // Pilares superiores
    { x: 250, y: 600, w: 100, h: 100 }, { x: 650, y: 600, w: 100, h: 100 }  // Pilares inferiores
];

// Estado estruturado do Boss Final Freddy Fazbear (Sala 8)
const freddy = { 
    x: 450, y: 100, w: 100, h: 100,     // Caixa física inicial próxima ao topo da sala
    vivo: true,                         // Estado de atividade
    vida: CONFIG.vidaMaximaFreddy,      // HP decrescente sob exposição direta de fótons (luz)
    timerLento: 0,                      // Frame-timer de redução de velocidade
    timerTonto: 0,                      // Frame-timer de perda de alvo
    perseguindo: false,                 // Indica se ele detectou e está caçando o jogador
    direcaoVagarX: 1,                   // Vetores para movimentação de patrulha ociosa
    direcaoVagarY: 1, 
    timerMudarDirecao: 0, 
    paradoModoFlash: false,             // Flag para paralisia momentânea caso receba um piscar abrupto
    timerEstadoParado: 0 
};

// Matriz vazia reservada para possíveis colisores físicos adicionais na arena final do Freddy
const obstaculosFreddy = []; 

// Função que verifica a entrada em uma sala perigosa e retira os itens comprados da mochila, iniciando os temporizadores
function checarEAtivarPerks(numeroSala) {
    // Define quais salas possuem ameaças de endos ou chefes pendentes
    const salaTemInimigos = [2, 5, 7].includes(numeroSala) || (numeroSala === 4 && !progresso.lojaAtiva);
    const salaTemBoss = ([3].includes(numeroSala) && !estadoSalas.chicaDerrotada) || 
                         ([6].includes(numeroSala) && !estadoSalas.bonnieDerrotado) || 
                         ([8].includes(numeroSala) && !estadoSalas.freddyDerrotado);

    // Se a sala apresentar hostilidade iminente, ativa os consumíveis automaticamente
    if (salaTemInimigos || salaTemBoss) {
        // Ativa Super Lanterna por 1200 frames (20 segundos a 60 FPS)
        if (player.hasPerkLanterna && player.timerPerkLanterna <= 0) {
            player.timerPerkLanterna = 1200; 
            player.hasPerkLanterna = false; // Consome o item do inventário
        }
        // Ativa Velocidade Aumentada por 300 frames (5 segundos)
        if (player.hasPerkVelocidade && player.timerPerkVelocidade <= 0) {
            player.timerPerkVelocidade = 300; 
            player.hasPerkVelocidade = false; // Consome o item do inventário
        }
        // Ativa Escudo de Invulnerabilidade por 240 frames (4 segundos)
        if (player.hasPerkEscudo && player.timerPerkEscudo <= 0) {
            player.timerPerkEscudo = 240; 
            player.hasPerkEscudo = false; // Consome o item do inventário
        }
    }
}

// ========================================================
// 4. RESET DE SALAS + CONTROLE DE SPAWN SEGURO (ADAPTATIVO)
// ========================================================
function carregarSala(numero, vindoDeOnde = "baixo") {
    // Reinicializa arrays temporários para liberar memória
    inimigos = []; moedasNoChao = []; bateriasNoChao = []; pizzas = []; ondasChoque = []; pulsosCone = [];
    pizzasEspeciaisNoChao = []; 
    freddy.perseguiningo = false; freddy.timerTonto = 0; freddy.paradoModoFlash = false; freddy.timerEstadoParado = 0;

    // Sincroniza estados dos chefes
    if (estadoSalas.chicaDerrotada) chica.vivo = false;
    if (estadoSalas.bonnieDerrotado) bonnie.vivo = false;
    if (estadoSalas.freddyDerrotado) freddy.vivo = false;

    // --- CÁLCULO DE ESCALA DINÂMICA DA SALA ATUAL ---
    let imgSala = assets[`sala${numero}`];
    
    // Valores padrão de segurança (caso a imagem não tenha carregado ainda)
    let largSalaEfetiva = imgSala && imgSala.width ? imgSala.width : 1000;
    let altSalaEfetiva = imgSala && imgSala.height ? imgSala.height : 920;

    // Determina o ponto geométrico adaptativo do jogador baseado na proporção da imagem real
    if (vindoDeOnde === "baixo") { 
        player.x = largSalaEfetiva * 0.475; 
        player.y = altSalaEfetiva * 0.869; 
    } else if (vindoDeOnde === "cima") { 
        player.x = largSalaEfetiva * 0.475; 
        player.y = altSalaEfetiva * 0.086; 
    } else if (vindoDeOnde === "esquerda") { 
        player.x = largSalaEfetiva * 0.850; 
        player.y = altSalaEfetiva * 0.461; 
    } else if (vindoDeOnde === "direita") { 
        player.x = largSalaEfetiva * 0.100; 
        player.y = altSalaEfetiva * 0.461; 
    }

    // Mecânicas de rebalanceamento imediato ao adentrar as salas dos chefes
    if (numero === 3 && chica.vivo) { player.battery = 100; itemPerkChicaNoChao = null; } 
    if (numero === 6 && bonnie.vivo) { bonnie.ultimoAtaque = Date.now() + 1500; bonnie.atordoado = false; bonnie.timerAtordoado = 0; itemPerkBonnieNoChao = null; } 
    if (numero === 8 && player.battery < 45) { player.battery = 75; } 

    // Identifica se a sala atual requer spawn de robôs genéricos (Endoesqueletos)
    const salaComInimigosAtivos = [2, 4, 5, 7].includes(numero) && !progresso.lojaAtiva;

    if (salaComInimigosAtivos && inimigos.length === 0) {
        let quantidadeInimigos = (numero === 4) ? 6 : 3; 
        
        for(let i = 0; i < quantidadeInimigos; i++) {
            let tipoSorteado = Math.floor(Math.random() * 5) + 1; 
            let posicaoValida = false;
            let tentativaX, tentativaY;
            let tentativasMaximas = 50; 

            while(!posicaoValida && tentativesMaximas > 0) {
                // Spawna os inimigos respeitando proporcionalmente as bordas internas da imagem da sala
                tentativaX = Math.random() * (largSalaEfetiva * 0.8) + (largSalaEfetiva * 0.1); 
                tentativaY = Math.random() * (altSalaEfetiva * 0.54) + (altSalaEfetiva * 0.1); 
                tentativasMaximas--;

                // Impede o monstro de nascer em cima do jogador (Distância proporcional)
                let distPlayer = Math.hypot(tentativaX - player.x, tentativaY - player.y);
                if (distPlayer < 200) continue;

                // Impede o monstro de nascer colado a um companheiro de equipe
                let muitoPertoDeOutro = false;
                for(let outro of inimigos) {
                    if (Math.hypot(tentativaX - outro.x, tentativaY - outro.y) < 75) {
                        muitoPertoDeOutro = true;
                        break;
                    }
                }
                
                if(!muitoPertoDeOutro) {
                    posicaoValida = true; 
                }
            }

            // Adiciona o Endoesqueleto na posição adaptada calculada
            inimigos.push({
                x: tentativaX, y: tentativaY,
                w: 60, h: 60, vivo: true, jaDropou: false, tipo: tipoSorteado 
            });
        }
    }

    // Se o jogador possui a insígnia da Chica, gera fatias de pizza adaptativas no chão
    if (player.temPerkChica && (salaComInimigosAtivos || [3, 6, 8].includes(numero))) {
        let qtdPizzas = Math.floor(Math.random() * 2) + 1; 
        for(let p = 0; p < qtdPizzas; p++) {
            pizzasEspeciaisNoChao.push({
                x: Math.random() * (largSalaEfetiva * 0.75) + (largSalaEfetiva * 0.1),
                y: Math.random() * (altSalaEfetiva * 0.65) + (altSalaEfetiva * 0.16),
                w: 35,
                h: 35,
                tipo: Math.random() < 0.5 ? "velocidade" : "escudo" 
            });
        }
    }

    // Executa a ativação de perks de inventário
    checarEAtivarPerks(numero);
}

// ========================================================
// 5. CÁLCULOS MATEMÁTICOS DE CONE DE LUZ E VISÃO
// ========================================================
// Algoritmo de Trigonometria e Geometria Analítica para determinar se um objeto está contido no feixe cônico iluminado
function noConeDeLuz(alvo) {
    if (player.battery <= 0) return false; // Sem energia, sem feixe de iluminação ativo
    let centroPlayerX = player.x + player.w / 2; let centroPlayerY = player.y + player.h / 2;
    let centroAlvoX = alvo.x + alvo.w / 2; let centroAlvoY = alvo.y + alvo.h / 2;

    // Captura as configurações iniciais padrões do arquivo de equilíbrio
    let raioLuzAtual = CONFIG.raioLuzNormal;
    let anguloAtual = CONFIG.anguloLanternaNormal;

    // Amplia o alcance se o bônus permanente do Bonnie estiver equipado (+20% de ganho óptico)
    if (player.temPerkBonnie) {
        raioLuzAtual *= 1.2;
        anguloAtual *= 1.2;
    }

    // Aplica o modificador superlativo de perk temporário comprado na loja
    if (player.timerPerkLanterna > 0) {
        raioLuzAtual = CONFIG.raioLuzNormal * 1.6;
        anguloAtual = CONFIG.anguloLanternaNormal * 1.5;
    }

    // Filtro 1: Distância Euclidiana Euclidiana Direta (Evita cálculos trigonométricos custosos se estiver longe)
    let dist = Math.hypot(centroAlvoX - centroPlayerX, centroAlvoY - centroPlayerY);
    if (dist > raioLuzAtual) return false; 

    // Filtro 2: Delta Angular do Arco Cônico
    let anguloMouse = Math.atan2(mouse.y - centroPlayerY, mouse.x - centroPlayerX); // Ângulo para onde o jogador aponta
    let anguloAlvo = Math.atan2(centroAlvoY - centroPlayerY, centroAlvoX - centroPlayerX);   // Ângulo em direção ao monstro
    let difAngulo = anguloAlvo - anguloMouse; // Diferença angular relativa
    
    // Normalização matemática do intervalo angular entre pi e -pi radianos (Evita problemas de inversão 360)
    while (difAngulo < -Math.PI) difAngulo += Math.PI * 2;
    while (difAngulo > Math.PI) difAngulo -= Math.PI * 2;
    // Retorna verdadeiro se o monstro estiver dentro da metade da abertura do leque para a esquerda ou direita
    return Math.abs(difAngulo) < anguloAtual / 2;
}

// Executa projeções lineares de teste (Raycasting) para checar se uma parede opaca bloqueia a visão direta entre duas entidades
function visaoBloqueadaPorObstaculo(p, entidade, listaObstaculos) {
    let pX = p.x + p.w / 2; let pY = p.y + p.h / 2;
    let eX = entidade.x + entidade.w / 2; let eY = entidade.y + entidade.h / 2;
    // Varre todos os colisores sólidos; se a linha reta cruzar o retângulo da parede, bloqueia a visão/ataque
    for (let obs of listaObstaculos) { if (linhaInterceptaRetangulo(pX, pY, eX, eY, obs)) return true; }
    return false; 
}

// Subfunção interna de interceptação: Verifica os limites limitadores de colisão AABB de retângulos em relação a um segmento de reta
function rInter(x1, y1, x2, y2, r) {
    let minX = Math.min(x1, x2), maxX = Math.max(x1, x2);
    let minY = Math.min(y1, y2), maxY = Math.max(y1, y2);
    // Descarta instantaneamente se a reta estiver totalmente fora da caixa envolvente do retângulo externo
    if (maxX < r.x || minX > r.x + r.w || maxY < r.y || minY > r.y + r.h) return false;
    // Compara a linha contra cada uma das 4 arestas físicas do bloco quadrado (Topo, Base, Esquerda, Direita)
    if (lInter(x1, y1, x2, y2, r.x, r.y, r.x + r.w, r.y)) return true;
    if (lInter(x1, y1, x2, y2, r.x, r.y + r.h, r.x + r.w, r.y + r.h)) return true;
    if (lInter(x1, y1, x2, y2, r.x, r.y, r.x, r.y + r.h)) return true;
    if (lInter(x1, y1, x2, y2, r.x + r.w, r.y, r.x + r.w, r.y + r.h)) return true;
    return false;
}

// Resolve o cruzamento vetorial puro de duas linhas no espaço bi-dimensional usando determinantes matriciais simples
function lInter(a1x, a1y, a2x, a2y, b1x, b1y, b2x, b2y) {
    let det = (a2x - a1x) * (b2y - b1y) - (b2x - b1x) * (a2y - a1y); if (det === 0) return false; // Linhas paralelas
    let u = ((b1x - a1x) * (b2y - b1y) - (b2x - b1x) * (b1y - a1y)) / det;
    let v = ((b1x - a1x) * (a2y - a1y) - (a2x - a1x) * (b1y - a1y)) / det;
    // Retorna verdadeiro se o ponto de interseção ocorrer dentro dos limites físicos de ambos os segmentos
    return (u >= 0 && u <= 1 && v >= 0 && v <= 1);
}

// Analisa se um par de coordenadas cartesianas pontual está contido em um leque de ataque emitido por terceiros (Uso: Ataques do Bonnie)
function pCone(px, py, cx, cy, ang, alc, ab) {
    let dx = px - cx; let dy = py - cy; let dist = Math.hypot(dx, dy); if (dist > alc) return false; // Fora do raio circular
    let angP = Math.atan2(dy, dx); let dif = angP - ang;
    while (dif < -Math.PI) dif += Math.PI * 2; while (dif > Math.PI) dif -= Math.PI * 2;
    return Math.abs(dif) < ab / 2; // Fora ou dentro da cobertura do ângulo de abertura
}

// Função de utilidade rápida para encontrar a distância em pixels entre os centros geométricos de dois objetos quaisquer
function distancia(obj1, obj2) { return Math.hypot((obj1.x + obj1.w / 2) - (obj2.x + obj2.w / 2), (obj1.y + obj1.h / 2) - (obj2.y + obj2.h / 2)); }
// Detecção clássica de colisão entre duas caixas retangulares (AABB Overlap) - Retorna booleano caso se sobreponham
function colisao(r1, r2) { return r1.x < r2.x + r2.w && r1.x + r1.w > r2.x && r1.y < r2.y + r2.h && r1.y + r1.h > r2.y; }

// ========================================================
// 6. MOTOR DE LÓGICA E PROCESSAMENTO (Sistemas de Game Update)
// ========================================================
// Valida a aplicação de dano ao jogador; anula o efeito se o escudo protetor estiver em execução
function processarDanoOuro() { if (player.timerPerkEscudo > 0) return; morrer(); }

// Gerencia a punição por morte: remove os perks de bosses temporários, para o loop e atualiza a janela para recomeçar
function morrer() { 
    player.temPerkChica = false; 
    player.temPerkBonnie = false;
    jogando = false; 
    location.reload(); // Reinicia a página web do jogo instantaneamente
}

// A grande engrenagem lógica executada a cada iteração do relógio do jogo (Movimento, IAs, Colisões, Disparos)
function atualizar() {
    if (!jogando || progresso.vitoria) return; // Trava o código caso o jogo tenha encerrado por derrota ou vitória
    const sala = progresso.salaAtual;

    // Regressão regressiva linear dos timers de duração ativa dos perks (Contagem regressiva por frame)
    if (player.timerPerkLanterna > 0) player.timerPerkLanterna--;
    if (player.timerPerkEscudo > 0) player.timerPerkEscudo--;
    if (player.timerPerkVelocidade > 0) { 
        player.timerPerkVelocidade--; 
        player.speed = player.speedNormal * 1.6; // Multiplica a velocidade de locomoção em +60%
    } else { 
        player.speed = player.speedNormal; // Restaura a velocidade comum de caminhada
    }

    // Coordenadas calculadas de passos teóricos para analisar colisão física futura do jogador
    let proxX = player.x; let proxY = player.y; 
    if (teclas['w'] || teclas['arrowup']) proxY -= player.speed;     // Anda para cima (Eixo Y negativo)
    if (teclas['s'] || teclas['arrowdown']) proxY += player.speed;    // Anda para baixo (Eixo Y positivo)
    if (teclas['a'] || teclas['arrowleft']) proxX -= player.speed;    // Anda para esquerda (Eixo X negativo)
    if (teclas['d'] || teclas['arrowright']) proxX += player.speed;   // Anda para direita (Eixo X positivo)

    // Avalia se ainda restam robôs agressivos que precisam ser abatidos para liberar as portas trancadas da sala ( Modificar O tempo)
    let temMortaisVivos = inimigos.some(e => e.vivo && e.tipo !== 4 && e.tipo !== 5);

    // Sistema de checagem do portal de avanço Norte (Ir para a próxima sala superior)
    if (proxY < 5 && proxX > 440 && proxX < 540) {
        // Mapeia todas as condições de trava obrigatória de portas por presença de monstros/chefes
        let bloqueadoAvanco = (sala === 2 && temMortaisVivos) || (sala === 3 && chica.vivo) || (sala === 4 && temMortaisVivos) || (sala === 6 && bonnie.vivo) || (sala === 8 && freddy.vivo);
        if (!bloqueadoAvanco) { 
            // Avança o contador de sala e carrega o novo nível posicionando o jogador na base
            if (sala < CONFIG.maxSalas) { progresso.salaAtual++; carregarSala(progresso.salaAtual, "baixo"); return; } 
            else { progresso.vitoria = true; return; } // Chegou ao fim do jogo após passar o portal da Sala 8
        } else { proxY = 5; } // Força barreira física invisível impedindo a saída da sala trancada
    }
    
    // Sistema de checagem do portal de recuo Sul (Voltar para a sala anterior inferior)
    if (proxY > 865 && proxX > 440 && proxX < 540 && sala > 1) {
        // Impede recuo caso esteja aprisionado em arenas com lutas ativas de chefes
        let bloqueadoVoltar = (sala === 3 && chica.vivo) || (sala === 6 && bonnie.vivo) || (sala === 8 && freddy.vivo);
        if (!bloqueadoVoltar) { progresso.salaAtual--; carregarSala(progresso.salaAtual, "cima"); return; } 
        else { proxY = 865; } // Retém o personagem na borda interna inferior
    }

    // Restrição geométrica de bordas sólidas do Canvas (Border clamp) para evitar que o player saia do mapa visível
    if (proxX < 0) proxX = 0; if (proxX > 1000 - player.w) proxX = 1000 - player.w;
    if (proxY < 0) proxY = 0; if (proxY > 920 - player.h) proxY = 920 - player.h; // Evita ultrapassar a barra de interface (HUD)

    // Processamento customizado de colisões físicas em eixos desacoplados (Sliding Collision System)
    if (sala === 6) {
        let colX = false; let colY = false;
        // Testa avanço no eixo X individualmente contra os pilares do Bonnie
        obstaculosBonnie.forEach(obs => { if (colisao({ x: proxX, y: player.y, w: player.w, h: player.h }, obs)) colX = true; }); if (!colX) player.x = proxX;
        // Testa avanço no eixo Y individualmente contra os pilares do Bonnie
        obstaculosBonnie.forEach(obs => { if (colisao({ x: player.x, y: proxY, w: player.w, h: player.h }, obs)) colY = true; }); if (!colY) player.y = proxY;
    } else if (progresso.lojaAtiva) {
        let colX = false; let colY = false;
        // Trata as bancadas de itens da loja como objetos sólidos inabaláveis para o jogador não andar por cima deles
        itensLoja.forEach(obs => { if (colisao({ x: proxX, y: player.y, w: player.w, h: player.h }, obs)) colX = true; }); if (!colX) player.x = proxX;
        itensLoja.forEach(obs => { if (colisao({ x: player.x, y: proxY, w: player.w, h: player.h }, obs)) colY = true; }); if (!colY) player.y = proxY;
    } else { 
        // Em salas livres de colasores customizados, aceita a posição teórica de movimentação diretamente
        player.x = proxX; player.y = proxY; 
    }

    // Gatilhos de portas laterais secretas que interligam a Sala 4 e o menu interativo da Loja
    if (sala === 4) {
        // Caminhou para a extrema esquerda: Entra no ambiente de compras
        if (!progresso.lojaAtiva && player.x < 15 && (player.y > 350 && player.y < 550)) { progresso.lojaAtiva = true; carregarSala(4, "esquerda"); }
        // Caminhou para a extrema direita dentro da loja: Retorna para o mapa de combate convencional
        else if (progresso.lojaAtiva && player.x > 980 - player.w && (player.y > 350 && player.y < 550)) { progresso.lojaAtiva = false; carregarSala(4, "direita"); }
    }

    // Se o jogador estiver dentro do menu da loja comercial, suspende todas as IAs e cálculos de perseguição de monstros
    if (progresso.lojaAtiva) return; 

    // Registra se a lanterna está incidindo diretamente sobre o corpo físico da Chica
    let mirandoNaChica = (sala === 3 && chica.vivo && lanternaAtiva && noConeDeLuz(chica));

    // Controle de drenagem de energia elétrica da bateria
    if (lanternaAtiva && player.battery > 0) {
        if (!mirandoNaChica) {
            // Se estiver encarando a Chica, o circuito elétrico consome 50% menos carga (Mecânica assistida de Boss)
            let consumoFinal = (sala === 3 && chica.vivo) ? CONFIG.bateriaConsumo / 2 : CONFIG.bateriaConsumo;
            player.battery -= consumoFinal; 
            if (player.battery <= 0) { player.battery = 0; lanternaAtiva = false; } // Desliga automaticamente por pane seca
        }
    } else { lanternaAtiva = false; } 

    // Loop de controle de comportamento de Inteligência Artificial para cada Endoesqueleto comum na sala
    for (let e of inimigos) {
        if (!e.vivo) continue; let dist = distancia(player, e); let mX = 0; let mY = 0;
        
        // TIPO 1: Caçador Padrão - Avança em linha reta e persegue o jogador obstinadamente com velocidade estável
        if (e.tipo === 1) { if (e.x < player.x) mX = 2.5; else mX = -2.5; if (e.y < player.y) mY = 2.5; else mY = -2.5; } 
        // TIPO 2: Espreitador Covarde - Só começa a se mexer e perseguir se o jogador se aproximar a menos de 350 pixels
        else if (e.tipo === 2) { if (dist < 350) { if (e.x < player.x) mX = 2; else mX = -2; if (e.y < player.y) mY = 2; else mY = -2; } } 
        // TIPO 3: Animatronic Reverso (Estilo Weeping Angel/Boo) - Anda se estiver no escuro, mas morre instantaneamente se for focado pela luz
        else if (e.tipo === 3) { 
            if (lanternaAtiva && noConeDeLuz(e)) { 
                if (!e.jaDropou) { e.vivo = false; e.jaDropou = true; moedasNoChao.push({ x: e.x + 10, y: e.y + 10, w: 25, h: 25 }); } 
                continue; 
            } else { if (e.x < player.x) mX = 1.5; else mX = -1.5; if (e.y < player.y) mY = 1.5; else mY = -1.5; } 
        } 
        // TIPO 4: Fotofóbico Fujão - Tenta se mover em sentido oposto (fuga) se a lanterna tocar seus circuitos, dificultando o abate por luz
        else if (e.tipo === 4) { if (lanternaAtiva && noConeDeLuz(e)) { if (e.x < player.x) mX = -3; else mX = 3; if (e.y < player.y) mY = 3; else mY = 3; } else { if (e.x < player.x) mX = 2; else mX = -2; if (e.y < player.y) mY = 2; else mY = -2; } } 
        // TIPO 5: Blindado Veloz - Anda extremamente rápido, porém fica completamente paralisado/congelado sob o foco direto da lanterna
        else if (e.tipo === 5) { if (lanternaAtiva && noConeDeLuz(e)) { mX = 0; mY = 0; } else { if (e.x < player.x) mX = 2.8; else mX = -2.8; if (e.y < player.y) mY = 2.8; else mY = -2.8; } }

        // Aplica o passo de movimento calculado da IA limitando às paredes gerais do mapa
        let tentX = e.x + mX; let tentY = e.y + mY; if (tentX > 0 && tentX < 1000 - e.w) e.x = tentX; if (tentY > 0 && tentY < 920 - e.h) e.y = tentY;
        // Verifica se o monstro alcançou fisicamente o corpo do jogador para computar ataque/morte
        if (e.vivo && dist < 40) { processarDanoOuro(); return; }
    }

    // Processador de queima e dissipação de inimigos comuns expostos à luz (Válido para tipos agressivos 1 e 2)
    if (lanternaAtiva && [2, 4, 5, 7, 8].includes(sala)) {
        for (let i = 0; i < inimigos.length; i++) {
            let e = inimigos[i];
            // Filtra se é um monstro destrutível convencionalmente pela luz
            if (e.vivo && e.tipo !== 3 && e.tipo !== 4 && e.tipo !== 5) { 
                if (noConeDeLuz(e) && !e.jaDropou) { 
                    e.jaDropou = true; e.vivo = false; // Executa o abate do inimigo   
                    
                    // Se estiver no Boss Final (Sala 8), cada lacaio morto gera garantidamente 1 moeda e 1 bateria
                    if (sala === 8) {
                        moedasNoChao.push({ x: e.x + 5, y: e.y + 5, w: 25, h: 25 });
                        bateriasNoChao.push({ x: e.x + 25, y: e.y + 25, w: 30, h: 30 });
                    } else {
                        // Nas salas comuns, gera uma quantidade aleatória de moedas (1 a 3) no local do óbito
                        let qtdMoedas = Math.floor(Math.random() * 3) + 1;
                        for(let m = 0; m < qtdMoedas; m++) { moedasNoChao.push({ x: e.x + Math.random()*30, y: e.y + Math.random()*30, w: 25, h: 25 }); }
                        // Chance probabilística de 40% de derrubar uma bateria (Ou 100% de chance assistida se o player estiver crítico)
                        if (Math.random() < 0.40 || player.battery < 50) { bateriasNoChao.push({ x: e.x + 15, y: e.y + 15, w: 30, h: 30 }); }
                    }
                }
            }
        }
    }

    // ========================================================
    // BOSS CHICA (SALA 3) - LÓGICA DE MOVIMENTO E PROJÉTEIS
    // ========================================================
    if (sala === 3) {
        if (chica.vivo) {
            // Inicializa vetores direcionais erráticos caso estejam vazios
            if (chica.direcaoX === undefined) { chica.direcaoX = (Math.random() * 2 - 1); chica.direcaoY = (Math.random() * 2 - 1); }
            // Sorteia mudanças súbitas e caóticas de rumo físico com taxa de 2% por frame
            if (Math.random() < 0.02) { chica.direcaoX = (Math.random() * 2 - 1); chica.direcaoY = (Math.random() * 2 - 1); }
            
            // Incrementa o passo de flutuação da Chica multiplicando pelo fator de velocidade 3
            chica.x += chica.direcaoX * 3; chica.y += chica.direcaoY * 3;
            // Efeito rebote elástico (Bouncing vectors) nas extremidades físicas para evitar que ela saia da tela
            if (chica.x <= 0 || chica.x + chica.w >= 1000) chica.direcaoX *= -1; if (chica.y <= 0 || chica.y + chica.h >= 920) chica.direcaoY *= -1;

            // Calcula dinamicamente o intervalo de recarga de tiros baseado na vida restante (Fica mais frenética com pouca vida)
            let intervaloDisparo = 120 + (chica.vida * 2); 
            if (Date.now() - chica.ultimoTiro > Math.max(40, intervaloDisparo)) { 
                // Dispara projéteis de pizza em direções angulares aleatórias expansivas a partir do seu centro
                pizzas.push({ x: chica.x + chica.w / 2, y: chica.y + chica.h / 2, vx: (Math.random() * 10) - 5, vy: (Math.random() * 10) - 5 }); chica.ultimoTiro = Date.now(); 
            }
            
            // Faz a atualização física de translação espacial para cada projétil de pizza ativo
            for (let i = pizzas.length - 1; i >= 0; i--) {
                let p = pizzas[i]; p.x += p.vx; p.y += p.vy; 
                // Se a pizza voadora interceptar o corpo do jogador, processa perda de vida
                if (colisao(player, { x: p.x, y: p.y, w: 40, h: 40 })) { processarDanoOuro(); return; }
                // Coleta de lixo/Otimização: Deleta projéteis que cruzaram as barreiras limítrofes do Canvas
                if (p.y > 1000 || p.y < 0 || p.x < 0 || p.x > 1000) pizzas.splice(i, 1);
            }
        } else {
            // Se o chefe já pereceu, monitora se o jogador caminhou sobre o item da insígnia de recompensa deixado no chão
            if (itemPerkChicaNoChao && colisao(player, itemPerkChicaNoChao)) {
                player.temPerkChica = true; // Ativa permanentemente o recurso passivo gerador de pizzas em salas futuras
                itemPerkChicaNoChao = null; // Remove o item do chão
            }
        }
    }

    // Gerenciador de colisão e consumo das fatias de pizza utilitárias geradas pelo poder passivo da Chica
    for (let i = pizzasEspeciaisNoChao.length - 1; i >= 0; i--) {
        let pEsp = pizzasEspeciaisNoChao[i];
        if (colisao(player, pEsp)) {
            // Ativa o respectivo contador de frames protetores/aceleradores baseados no tipo do drop coletado
            if (pEsp.tipo === "velocidade") { player.timerPerkVelocidade = 300; } 
            else if (pEsp.tipo === "escudo") { player.timerPerkEscudo = 240; }
            pizzasEspeciaisNoChao.splice(i, 1); // Remove do chão após o consumo bem-sucedido
        }
    }

    // ========================================================
    // BOSS BONNIE (SALA 6) - LÓGICA DE COBRANÇA E COLISÕES
    // ========================================================
    if (sala === 6) {
        if (bonnie.vivo) {
            // Fornece o item Taser para o jogador caso ele ande em cima do ponto de spawn inicial do item
            if (!player.hasTaser && colisao(player, {x:150, y:150, w:40, h:40})) player.hasTaser = true;
            // Colisão direta corpo a corpo do Bonnie contra o jogador causa morte instantânea
            if (colisao(player, bonnie)) { processarDanoOuro(); return; }

            // Define se o Bonnie entrou na sua última fase desesperadora de combate (Últimos 5 pontos de energia)
            let cliquesRestantes = CONFIG.vidaMaximaBonnie - bonnie.cliques;
            let modoFaseFinal = (cliquesRestantes <= 5);

            // Gerencia regressão de tempo de paralisia/atordoamento do Bonnie após ele errar investidas
            if (bonnie.atordoado) {
                bonnie.timerAtordoado--; 
                if (bonnie.timerAtordoado <= 0) bonnie.atordoado = false; // Acorda e volta a caçar
            }

            // CORREÇÃO SOLICITADA: Movimentação inteligente do Bonnie bloqueada por obstáculos sólidos
            if (!bonnie.atordoado && !modoFaseFinal) {
                let bVel = 3.2; // Velocidade física do passo de perseguição do Bonnie
                let dX = player.x - bonnie.x; 
                let dY = player.y - bonnie.y; 
                let distP = Math.hypot(dX, dY) || 1; // Hipotenusa de distância reta
                
                // Calcula as posições potenciais estimadas para o próximo frame
                let proxBonnieX = bonnie.x + (dX / distP) * bVel;
                let proxBonnieY = bonnie.y + (dY / distP) * bVel;

                let colBonnieX = false;
                let colBonnieY = false;

                // Loop de varredura: Checa se a projeção X ou Y do Bonnie invade o perímetro dos pilares azuis da sala 6
                obstaculosBonnie.forEach(obs => {
                    if (colisao({ x: proxBonnieX, y: bonnie.y, w: bonnie.w, h: bonnie.h }, obs)) {
                        colBonnieX = true; // Detectou colisão futura no alinhamento horizontal
                    }
                    if (colisao({ x: bonnie.x, y: proxBonnieY, w: bonnie.w, h: bonnie.h }, obs)) {
                        colBonnieY = true; // Detectou colisão futura no alinhamento vertical
                    }
                });

                // Só consolida a movimentação real no eixo caso ele esteja livre de colisores sólidos (Não atravessa paredes)
                if (!colBonnieX) bonnie.x = proxBonnieX;
                if (!colBonnieY) bonnie.y = proxBonnieY;
            }

            // Rotina de execução de contra-ataques mágicos baseados nas fases de integridade do Bonnie
            if (!bonnie.atordoado) {
                let bCentroX = bonnie.x + bonnie.w / 2; let bCentroY = bonnie.y + bonnie.h / 2;
                
                if (!modoFaseFinal) {
                    // FASES 1 a 3: Descarrega ataques direcionais cônicos de choque focados na última localização do player
                    let tempoEsperaBase = 3500 - (bonnie.cliques * 150); // Fica progressivamente mais rápido a cada choque tomado
                    if (tempoEsperaBase < 1200) tempoEsperaBase = 1200;

                    if (Date.now() - bonnie.ultimoAtaque > tempoEsperaBase) {
                        let pCentroX = player.x + player.w / 2; let pCentroY = player.y + player.h / 2;
                        // Cria e projeta um objeto de disparo cônico em leque na direção angular do jogador
                        pulsosCone.push({ x: bCentroX, y: bCentroY, angulo: Math.atan2(pCentroY - bCentroY, pCentroX - bCentroX), alcanceInterno: 0, alcanceMaximo: 340, abertura: 0.9, velocidade: 5.2 });
                        
                        // Entra em colapso/recarga pós-tiro (Fica vulnerável a cliques de taser por 4 segundos)
                        bonnie.atordoado = true;
                        bonnie.timerAtordoado = 240; 
                        bonnie.ultimoAtaque = Date.now();
                    }
                } else { 
                    // FASE FINAL (Últimos 5 cliques): Modifica o ataque para uma onda de choque circular titânica em 360° expandível
                    if (Date.now() - bonnie.ultimoAtaque > 4500) {
                        ondasChoque.push({ x: bCentroX, y: bCentroY, r: 0 }); // Instancia um círculo de choque com raio inicial zero
                        
                        bonnie.atordoado = true; 
                        bonnie.timerAtordoado = 240; 
                        bonnie.ultimoAtaque = Date.now();
                    }
                }
            }

            // Sistema de captura do Input de ataque 'Q' para descarregar o Taser contra o Bonnie
            if (teclas['q'] && player.hasTaser && distancia(player, bonnie) < 150) { 
                bonnie.cliques++;         // Registra o acerto com sucesso
                teclas['q'] = false;      // Reseta imediatamente a tecla para evitar cliques segurados infinitos
                bonnie.atordoado = false; // Interrompe o repouso dele forçando reações imediatas
                bonnie.timerAtordoado = 0;
                
                // Condição de óbito do Bonnie
                if (bonnie.cliques >= CONFIG.vidaMaximaBonnie) { 
                    bonnie.vivo = false; 
                    estadoSalas.bonnieDerrotado = true; 
                    // Instancia a caixa de colisão do item passivo da lanterna ampliada do Bonnie para coleta
                    itemPerkBonnieNoChao = { x: bonnie.x + 15, y: bonnie.y + 15, w: 70, h: 45 };
                } 
            }

            // Atualiza e testa danos gerados pelos projéteis lineares cônicos do Bonnie
            for (let i = pulsosCone.length - 1; i >= 0; i--) {
                let pulso = pulsosCone[i]; pulso.x += Math.cos(pulso.angulo) * pulso.velocidade; pulso.y += Math.sin(pulso.angulo) * pulso.velocidade;
                // Executa teste trigonométrico de contato; se bater no player, verifica se há uma parede cobrindo o jogador antes de aplicar dano
                if (pCone(player.x+25, player.y+25, pulso.x, pulso.y, pulso.angulo, pulso.alcanceMaximo, pulso.abertura)) { if (!visaoBloqueadaPorObstaculo(player, bonnie, obstaculosBonnie)) { processarDanoOuro(); return; } }
                if (pulso.x < -300 || pulso.x > 1300) pulsosCone.splice(i, 1);
            }
            
            // Atualiza e testa danos gerados pelas ondas de choque radiais circulares expandidas do Bonnie
            for (let i = ondasChoque.length - 1; i >= 0; i--) {
                let o = ondasChoque[i]; 
                o.r += 8.5; // Expande continuamente o raio geométrico da circunferência elétrica
                // Se a borda circular externa encostar no raio do hitbox do jogador, valida se o pilar bloqueou a passagem da eletricidade
                if (Math.hypot((player.x+25) - o.x, (player.y+25) - o.y) - 25 <= o.r) { if (!visaoBloqueadaPorObstaculo(player, bonnie, obstaculosBonnie)) { processarDanoOuro(); return; } }
                if (o.r > 750) ondasChoque.splice(i, 1); // Remove da memória ondas muito grandes fora da arena
            }
        } else {
            // Se o Bonnie está morto, checa se o jogador coletou o item da Lanterna Bonnie Ampliada deixado no chão
            if (itemPerkBonnieNoChao && colisao(player, itemPerkBonnieNoChao)) {
                player.temPerkBonnie = true; // Concede permanentemente +20% de abertura e alcance de luz em todas as salas
                itemPerkBonnieNoChao = null; // Coleta o objeto do chão
            }
        }
    }

    // ========================================================
    // BOSS FREDDY (SALA 8) - INTELIGÊNCIA ARTIFICIAL FINAL
    // ========================================================
    if (sala === 8 && freddy.vivo) {
        // Mecânica de invocação de lacaios: Freddy tem 1.5% de chance por frame de invocar novos minions (Endos 1 e 2)
        if (Math.random() < 0.015 && inimigos.filter(inimi => inimi.vivo).length < 6) {
            let spawnX, spawnY; let tentativaSpawnValida = false; let contagemTentativas = 20;
            while(!tentativaSpawnValida && contagemTentativas > 0) {
                spawnX = freddy.x + (Math.random() * 200 - 100); spawnY = freddy.y + (Math.random() * 200 - 100); contagemTentativas--;
                let distP = Math.hypot(spawnX - player.x, spawnY - player.y);
                let muitoPertoDeOutro = inimigos.some(o => o.vivo && Math.hypot(spawnX - o.x, spawnY - o.y) < 65);
                if (distP > 200 && !muitoPertoDeOutro) tentativaSpawnValida = true; // Posição de spawn aprovada
            }
            if(!tentativaSpawnValida) { spawnX = 100; spawnY = 450; } // Ponto padrão de contingência contra travamentos
            // Adiciona o lacaio invocado à matriz ativa de combate da sala 8
            inimigos.push({ x: spawnX, y: spawnY, w: 55, h: 55, vivo: true, jaDropou: false, tipo: Math.floor(Math.random() * 2) + 1 });
        }
        
        // Se a lanterna do jogador estiver focada diretamente no peito do Freddy, drena sua barra de vida continuamente
        if (lanternaAtiva && noConeDeLuz(freddy)) {
            freddy.vida -= 0.15; // Reduz a saúde decimal em tempo real
            if (freddy.vida <= 0) { freddy.vivo = false; estadoSalas.freddyDerrotado = true; } // Freddy é destruído por sobrecarga de luz
        }

        // Ajuste dinâmico de velocidade: Freddy corre a 7.5 no escuro, mas é desacelerado para 2.0 se encarar a lanterna diretamente
        let velocidadeAtual = CONFIG.velocidadeFreddyNormal; if (lanternaAtiva && noConeDeLuz(freddy)) { velocidadeAtual = CONFIG.velocidadeFreddyLento; }
        let velX = 0; let velY = 0;
        // Calcula os componentes vetoriais de aproximação direta para perseguir a localização do jogador
        if (freddy.x < player.x) velX = velocidadeAtual; else if (freddy.x > player.x) velX = -velocidadeAtual;
        if (freddy.y < player.y) velY = velocidadeAtual; else if (freddy.y > player.y) velY = -velocidadeAtual;

        // Tenta aplicar o avanço posicional na matriz bloqueando saídas além-fronteiras
        let proxFX = freddy.x + velX; let proxFY = freddy.y + velY;
        if (proxFX >= 0 && proxFX <= 1000 - freddy.w) freddy.x = proxFX;
        if (proxFY >= 0 && proxFY <= 920 - freddy.h) freddy.y = proxFY;

        // Se o Freddy Fazbear colidir diretamente com o jogador, é fim de jogo imediato
        if (freddy.vivo && colisao(player, freddy)) { processarDanoOuro(); return; }
    }

    // Coleta mecânica de itens utilitários deixados no chão pelas salas
    for (let i = moedasNoChao.length - 1; i >= 0; i--) { if (colisao(player, moedasNoChao[i])) { player.moedas++; moedasNoChao.splice(i, 1); } } // Soma moedas
    for (let i = bateriasNoChao.length - 1; i >= 0; i--) { if (colisao(player, bateriasNoChao[i])) { player.battery = Math.min(100, player.battery + 35); bateriasNoChao.splice(i, 1); } } // Restaura +35% de carga elétrica
}

// ========================================================
// 7. MOTOR DE CONE DE ESCURIDÃO (Máscara de Sombra de Terror)
// ========================================================
// Aplica filtros de renderização compostos no Canvas para desenhar o ambiente escuro e recortar o feixe luminoso geométrico da lanterna
function desenharMascaradeLuz() {
    ctx.save(); // Salva as configurações normais padrão de pintura do Canvas
    ctx.fillStyle = "rgba(0, 0, 0, 0.96)"; // Camada preta com 96% de opacidade opaca (Efeito escuridão total)
    ctx.fillRect(0, 0, 1000, 1000);       // Cobre inteiramente o mapa de jogo
    
    if (lanternaAtiva && player.battery > 0) {
        // Altera o modo de composição de mistura gráfica para recortar/subtrair pixels da escuridão (Criando furos transparentes)
        ctx.globalCompositeOperation = 'destination-out';
        let centroX = player.x + player.w / 2; let centroY = player.y + player.h / 2;
        let anguloBase = Math.atan2(mouse.y - centroY, mouse.x - centroX); // Ângulo vetor em radianos em relação ao mouse
        
        let raioLuzAtual = CONFIG.raioLuzNormal;
        let anguloAtual = CONFIG.anguloLanternaNormal;

        // Aplica os amplificadores de feixes obtidos através de perks conquistados ou comprados
        if (player.temPerkBonnie) { raioLuzAtual *= 1.2; anguloAtual *= 1.2; }
        if (player.timerPerkLanterna > 0) { raioLuzAtual = CONFIG.raioLuzNormal * 1.6; anguloAtual = CONFIG.anguloLanternaNormal * 1.5; }

        // Calcula a posição trigonométrica do vértice esquerdo do cone de luz no espaço cartesiano
        let p2x = centroX + Math.cos(anguloBase - anguloAtual / 2) * raioLuzAtual;
        let p2y = centroY + Math.sin(anguloBase - anguloAtual / 2) * raioLuzAtual;
        // Calcula a posição trigonométrica do vértice direito do cone de luz no espaço cartesiano
        let p3x = centroX + Math.cos(anguloBase + anguloAtual / 2) * raioLuzAtual;
        let p3y = centroY + Math.sin(anguloBase + anguloAtual / 2) * raioLuzAtual;
        
        // Cria um gradiente radial de dissipação esfumaçada para simular desfoque realista de luz real nas pontas
        const gradiente = ctx.createRadialGradient(centroX, centroY, 0, centroX, centroY, raioLuzAtual);
        gradiente.addColorStop(0, 'rgba(0,0,0,1)');     // Centro 100% transparente (Recorte total da escuridão)
        gradiente.addColorStop(0.8, 'rgba(0,0,0,0.5)'); // Meio termo com penumbra suave
        gradiente.addColorStop(1, 'rgba(0,0,0,0)');     // Borda externa opaca (Transiciona de volta para as trevas)
        
        // Desenha e preenche o triângulo geométrico do leque óptico recortando a máscara preta
        ctx.fillStyle = gradiente; ctx.beginPath(); ctx.moveTo(centroX, centroY); ctx.lineTo(p2x, p2y); ctx.lineTo(p3x, p3y); ctx.closePath(); ctx.fill();
    }
    ctx.restore(); // Restaura a operação convencional de desenho geométrico sem afetar recortes nas próximas artes
}

// ========================================================
// 8. LAÇO DE RENDERIZAÇÃO GRÁFICA PRINCIPAL (Game Render Loop)
// ========================================================
// Atualiza a tela gráfica limpando buffers, desenhando cenários, sprites nítidos e a interface do usuário (HUD)
function render() {
    if (!jogando) return; atualizar(); // Executa o ciclo lógico de física antes de pintar as posições novas atualizadas
    ctx.clearRect(0, 0, 1000, 1000); ctx.fillStyle = "#161616"; ctx.fillRect(0, 0, 1000, 1000); // Fundo cinza carvão escuro do cenário
    
    // CORREÇÃO ESSENCIAL ATRIBUÍDA: Desativa suavizações lineares forçando renderização com nitidez em Pixel-Art (Nearest Neighbor)
    ctx.imageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;

    // Renderiza a escuridão cega por cima de tudo antes de pintar as entidades visíveis no feixe vazado
    desenharMascaradeLuz(); const sala = progresso.salaAtual;

    // Fluxo estruturado de desenho do menu e botões da LOJA DE PERKS da sala 4
    if (progresso.lojaAtiva) {
        // Desenha o portal roxo de retorno ao mapa de lutas e seu rótulo textual indicador
        ctx.fillStyle = "purple"; ctx.fillRect(975, 350, 25, 200); ctx.fillStyle = "white"; ctx.font = "bold 16px Arial"; ctx.fillText("VOLTAR", 910, 450);
        
        // Varre e desenha cada um dos cards de produtos disponíveis para comércio
        itensLoja.forEach(item => {
            // Verifica se o jogador já possui aquele determinado perk estocado para uso imediato
            let jaTemItem = (item.tipo === "lanterna" && player.hasPerkLanterna) || (item.tipo === "velocidade" && player.hasPerkVelocidade) || (item.tipo === "escudo" && player.hasPerkEscudo);
            // Muda a cor do fundo: Verde se já comprou e guardou, roxo escuro se ainda estiver disponível para comércio
            ctx.fillStyle = jaTemItem ? "#1a3d24" : "#2e1c3d"; ctx.fillRect(item.x, item.y, item.w, item.h);
            ctx.strokeStyle = jaTemItem ? "#24ff5a" : "#a124ff"; ctx.lineWidth = 3; ctx.strokeRect(item.x, item.y, item.w, item.h);
            // Renderiza textos institucionais de nomes e preços em moedas douradas
            ctx.fillStyle = "white"; ctx.font = "bold 12px Arial"; ctx.fillText(item.texto, item.x - 15, item.y - 25);
            ctx.fillStyle = "gold"; ctx.fillText(item.preco + " Moedas", item.x + 15, item.y - 8);
            ctx.fillStyle = jaTemItem ? "lime" : "#9f9f9f"; ctx.font = "10px Arial"; ctx.fillText(jaTemItem ? "[Guardado]" : "[Clique]", item.x + (jaTemItem ? 20 : 30), item.y + 38);
        });
        ctx.fillStyle = "#a124ff"; ctx.font = "bold 32px Arial"; ctx.fillText("LOJA DE PERKS - SALA 4", 320, 150);
    } 
    else {
        // FLUXO DE RENDERIZAÇÃO PADRÃO DAS ARENAS DE MAPAS DO JOGO
        let temMortaisVivos = inimigos.some(e => e.vivo && e.tipo !== 4 && e.tipo !== 5);
        // Calcula se os requisitos de avanço foram cumpridos para definir se a porta de cima brilha em Vermelho (Trancada) ou Verde (Aberta)
        let portaAvancoTrancada = (sala === 2 && temMortaisVivos) || (sala === 3 && chica.vivo) || (sala === 4 && temMortaisVivos) || (sala === 6 && bonnie.vivo) || (sala === 8 && freddy.vivo);
        ctx.fillStyle = portaAvancoTrancada ? "red" : "lime"; ctx.fillRect(470, 0, 60, 20); // Retângulo indicador do portal norte

        // Se estiver na sala 4 convencional, desenha o portal roxo de acesso à esquerda para a Loja
        if (sala === 4) { ctx.fillStyle = "purple"; ctx.fillRect(0, 350, 25, 200); ctx.fillStyle = "white"; ctx.font = "bold 14px Arial"; ctx.fillText("LOJA", 30, 455); }
        // Tranca o portal sul se o chefe ativo da sala estiver vivo impedindo fugas covardes do jogador
        let portaVoltarTrancada = (sala === 3 && chica.vivo) || (sala === 6 && bonnie.vivo) || (sala === 8 && freddy.vivo);
        if (sala > 1) { ctx.fillStyle = portaVoltarTrancada ? "red" : "lime"; ctx.fillRect(470, 900, 60, 20); } // Retângulo indicador do portal sul

        // Desenha os coletáveis dispostos espalhados pelo chão através de sprites ou placeholders alternativos
        moedasNoChao.forEach(m => desenharSprite(assets.moeda, m.x, m.y, m.w, m.h, "gold", "$"));
        bateriasNoChao.forEach(b => desenharSprite(assets.bateriaItem, b.x, b.y, b.w, b.h, "#00ff66", "B"));
        
        // Desenha as fatias de pizzas especiais geradas no chão pelo perk conquistado da Chica
        pizzasEspeciaisNoChao.forEach(pEsp => {
            let corPizza = pEsp.tipo === "velocidade" ? "gold" : "blue";
            let txtPizza = pEsp.tipo === "velocidade" ? "P-VEL" : "P-ESC";
            desenharSprite(assets.pizza, pEsp.x, pEsp.y, pEsp.w, pEsp.h, corPizza, txtPizza);
        });

        // Varre e desenha cada um dos Endoesqueletos comuns que estejam vivos na sala atual
        inimigos.forEach(e => { 
            if(e.vivo) {
                let tagEndo = "ENDO 1"; let corEndo = "red";
                if (e.tipo === 2) { tagEndo = "ENDO 2"; corEndo = "darkred"; }
                else if (e.tipo === 3) { tagEndo = "ENDO 3"; corEndo = "yellow"; }
                else if (e.tipo === 4) { tagEndo = "ENDO 4"; corEndo = "magenta"; }
                else if (e.tipo === 5) { tagEndo = "ENDO 5"; corEndo = "cyan"; }
                desenharSprite(assets.endo, e.x, e.y, e.w, e.h, corEndo, tagEndo); 
            }
        });

        // SISTEMA GRÁFICO ESPECÍFICO DO BOSS CHICA (SALA 3)
        if (sala === 3) {
            if (chica.vivo) {
                desenharSprite(assets.chica, chica.x, chica.y, chica.w, chica.h, "yellow", "CHICA");
                pizzas.forEach(p => desenharSprite(assets.pizza, p.x, p.y, 40, 40, "orange", "PZ")); // Desenha as pizzas arremessadas por ela
                
                // Desenha a barra estrutural de vida (HP UI Bar) da Chica no topo da arena
                ctx.fillStyle = "#222"; ctx.fillRect(300, 40, 400, 15); // Fundo escuro da barra
                ctx.fillStyle = "yellow"; ctx.fillRect(300, 40, (Math.max(0, chica.vida) / CONFIG.vidaMaximaChica) * 400, 15); // Preenchimento proporcional
                ctx.fillStyle = "white"; ctx.font = "bold 12px Arial"; ctx.fillText(`CHICA FLASHES: ${chica.vida} / 25`, 430, 52);
            } else if (itemPerkChicaNoChao) {
                // Se morreu mas o item não foi coletado, renderiza o item de perk rosa flutuante no chão
                ctx.fillStyle = "#ff00aa"; ctx.fillRect(itemPerkChicaNoChao.x, itemPerkChicaNoChao.y, itemPerkChicaNoChao.w, itemPerkChicaNoChao.h);
                ctx.strokeStyle = "white"; ctx.lineWidth = 2; ctx.strokeRect(itemPerkChicaNoChao.x, itemPerkChicaNoChao.y, itemPerkChicaNoChao.w, itemPerkChicaNoChao.h);
                ctx.fillStyle = "white"; ctx.font = "bold 10px Arial"; ctx.fillText("PERK CHICA", itemPerkChicaNoChao.x + 2, itemPerkChicaNoChao.y + 22);
            }
        }
        
        // SISTEMA GRÁFICO ESPECÍFICO DO BOSS BONNIE (SALA 6)
        if (sala === 6) {
            // Desenha as caixas delimitadoras preenchidas de azul-marinho dos pilares indestrutíveis
            obstaculosBonnie.forEach(obs => { ctx.fillStyle = "#1c2e3d"; ctx.fillRect(obs.x, obs.y, obs.w, obs.h); ctx.strokeStyle = "#00ffff"; ctx.strokeRect(obs.x, obs.y, obs.w, obs.h); });
            
            if (bonnie.vivo) {
                // Desenha a arma Taser flutuante na coordenada 150x150 caso o jogador ainda não tenha pego
                if (!player.hasTaser) desenharSprite(assets.taser, 150, 150, 40, 40, "cyan", "TSR");
                
                let textoBonnie = "BONNIE"; let corBonnie = "blue";
                let cliquesRestantes = CONFIG.vidaMaximaBonnie - bonnie.cliques;
                // Altera as cores da interface e textos baseados nos estados de fúria final ou atordoamento do Bonnie
                if (cliquesRestantes <= 5) {
                    textoBonnie = bonnie.atordoado ? "FASE FINAL: EXAUSTO (USE TASER!)" : "FASE FINAL: GOLPE AMPLO EM ÁREA!";
                    corBonnie = bonnie.atordoado ? "#442255" : "#aa00ff";
                } else if (bonnie.atordoado) {
                    textoBonnie = "BONNIE ATORDOADO (USE TASER!)"; corBonnie = "gray";
                }
                
                // Renderiza o corpo gráfico principal do Bonnie
                desenharSprite(assets.bonnie, bonnie.x, bonnie.y, 100, 100, corBonnie, textoBonnie);
                // Renderiza visualmente a área vermelha translúcida indicadora dos leques de ataque cônicos disparados por ele
                pulsosCone.forEach(pulso => { ctx.save(); ctx.fillStyle = "rgba(255, 0, 0, 0.2)"; ctx.beginPath(); ctx.moveTo(pulso.x, pulso.y); ctx.arc(pulso.x, pulso.y, pulso.alcanceMaximo, pulso.angulo - pulso.abertura / 2, pulso.angulo + pulso.abertura / 2); ctx.closePath(); ctx.fill(); ctx.restore(); });
                // Renderiza as argolas roxas expansivas de ondas de choque da fase final
                ondasChoque.forEach(o => { ctx.strokeStyle = "rgba(230, 0, 255, 0.85)"; ctx.lineWidth = 7; ctx.beginPath(); ctx.arc(o.x, o.y, o.r, 0, Math.PI*2); ctx.stroke(); });
                
                // Desenha a barra roxa de progresso de cliques restantes para derrotar o Bonnie
                ctx.fillStyle = "#222"; ctx.fillRect(300, 40, 400, 15);
                ctx.fillStyle = "purple"; ctx.fillRect(300, 40, (Math.max(0, cliquesRestantes) / CONFIG.vidaMaximaBonnie) * 400, 15);
                ctx.fillStyle = "white"; ctx.font = "bold 12px Arial"; ctx.fillText(`BONNIE CHOQUES RESTANTES: ${cliquesRestantes} / ${CONFIG.vidaMaximaBonnie}`, 395, 52);
            } else if (itemPerkBonnieNoChao) {
                // Desenha a caixinha azul-clara do item de perk da lanterna deixada após a morte do Bonnie
                ctx.fillStyle = "#00aaff"; ctx.fillRect(itemPerkBonnieNoChao.x, itemPerkBonnieNoChao.y, itemPerkBonnieNoChao.w, itemPerkBonnieNoChao.h);
                ctx.strokeStyle = "white"; ctx.lineWidth = 2; ctx.strokeRect(itemPerkBonnieNoChao.x, itemPerkBonnieNoChao.y, itemPerkBonnieNoChao.w, itemPerkBonnieNoChao.h);
                ctx.fillStyle = "white"; ctx.font = "bold 10px Arial"; ctx.fillText("PERK BONNIE", itemPerkBonnieNoChao.x + 2, itemPerkBonnieNoChao.y + 22);
            }
        }
        
        // SISTEMA GRÁFICO ESPECÍFICO DO BOSS FINAL FREDDY (SALA 8)
        if (sala === 8 && freddy.vivo) {
            let txtF = "FREDDY (" + Math.ceil(freddy.vida) + " HP)"; if (lanternaAtiva && noConeDeLuz(freddy)) txtF = "FREDDY (FRACO!)";
            // Renderiza o corpo do Freddy alterando a tonalidade se ele estiver recebendo dano de fótons da luz
            desenharSprite(assets.freddy, freddy.x, freddy.y, 100, 100, (lanternaAtiva && noConeDeLuz(freddy)) ? "#8b5a2b" : "#5d3a1a", txtF);
            
            // Desenha a barra de vida marrom oficial do chefe final Freddy Fazbear no topo da interface
            ctx.fillStyle = "#222"; ctx.fillRect(300, 40, 400, 15);
            ctx.fillStyle = "#5d3a1a"; ctx.fillRect(300, 40, (Math.max(0, freddy.vida) / CONFIG.vidaMaximaFreddy) * 400, 15);
            ctx.fillStyle = "white"; ctx.font = "bold 12px Arial"; ctx.fillText(`FREDDY HP: ${Math.ceil(freddy.vida)} / ${CONFIG.vidaMaximaFreddy}`, 430, 52);
        }
    }

    // Desenha as auras e contornos coloridos em volta do jogador indicando perks de imunidade ou velocidade ativos
    if (player.timerPerkEscudo > 0) { ctx.strokeStyle = "cyan"; ctx.lineWidth = 5; ctx.strokeRect(player.x - 4, player.y - 4, player.w + 8, player.h + 8); } 
    else if (player.timerPerkVelocidade > 0) { ctx.strokeStyle = "gold"; ctx.lineWidth = 3; ctx.strokeRect(player.x - 2, player.y - 2, player.w + 4, player.h + 4); }
    // Renderiza o sprite ou cubo verde representativo do jogador principal
    desenharSprite(assets.player, player.x, player.y, 50, 50, "lime", "PLAYER");

    // ========================================================
    // HUD PANEL (Painel de Controle da Interface do Usuário)
    // ========================================================
    // Pinta a barra preta sólida de fundo na base inferior da tela (Região de Dados)
    ctx.fillStyle = "rgba(0,0,0,0.85)"; ctx.fillRect(0, 920, 1000, 80);
    
    // Desenha o display de moedas e seu contador numérico correspondente
    desenharSprite(assets.moedaHUD, 30, 940, 40, 40, "gold", "$"); ctx.fillStyle = "white"; ctx.font = "bold 24px Arial"; ctx.fillText(player.moedas, 85, 970);
    // Desenha o ícone representativo da lanterna
    desenharSprite(assets.lanternaHUD, 200, 940, 40, 40, "white", "L");
    // Desenha o invólucro cinza da barra de bateria e preenche proporcionalmente de verde (Seguro) ou vermelho (Crítico)
    ctx.fillStyle = "#444"; ctx.fillRect(250, 950, 150, 20); ctx.fillStyle = player.battery > 20 ? "lime" : "red"; ctx.fillRect(250, 950, player.battery * 1.5, 20); 
    
    // Imprime na tela os temporizadores em segundos restantes para o esgotamento dos perks ativos
    ctx.fillStyle = "cyan"; ctx.font = "12px Arial";
    if (player.timerPerkLanterna > 0) ctx.fillText("Lanterna+: " + Math.ceil(player.timerPerkLanterna/60) + "s", 420, 950); else if (player.hasPerkLanterna) ctx.fillText("Lanterna+ [Mochila]", 420, 950);
    if (player.timerPerkEscudo > 0) ctx.fillText("Escudo: " + Math.ceil(player.timerPerkEscudo/60) + "s", 420, 975); else if (player.hasPerkEscudo) ctx.fillText("Escudo [Mochila]", 420, 975);
    if (player.timerPerkVelocidade > 0) ctx.fillText("Velocidade+: " + Math.ceil(player.timerPerkVelocidade/60) + "s", 550, 950); else if (player.hasPerkVelocidade) ctx.fillText("Velocidade+ [Mochila]", 550, 950);
    
    // Renderiza indicadores textuais eternos caso as almas dos chefes Chica ou Bonnie tenham sido assimiladas pelo inventário
    if (player.temPerkChica) { ctx.fillStyle = "#ff00aa"; ctx.font = "bold 11px Arial"; ctx.fillText("✨ PIZZAS CHICA ATIVAS", 685, 948); }
    if (player.temPerkBonnie) { ctx.fillStyle = "#00aaff"; ctx.font = "bold 11px Arial"; ctx.fillText("🔦 LANTERNA BONNIE (+20%)", 685, 970); }

    // Informa o número da sala atual em que o jogador se encontra posicionado
    ctx.fillStyle = "white"; ctx.font = "bold 24px Arial"; ctx.fillText(progresso.lojaAtiva ? "LOJA" : "SALA: " + progresso.salaAtual + " / 8", 800, 970);
    // Imprime a mensagem monumental verde de vitória caso o portal final seja quebrado com sucesso
    if (progresso.vitoria) { ctx.fillStyle = "lime"; ctx.font = "bold 50px Arial"; ctx.fillText("VOCÊ ESCAPOU!", 320, 500); }

    // Vincula a execução contínua sincronizada ao monitor de atualização gráfica nativa do navegador (Garante 60 FPS estáveis)
    requestAnimationFrame(render);
}

// ========================================================
// 9. FUNÇÕES DE SUPORTE (Mecanismo Adaptativo de Desenho)
// ========================================================
// Renderiza a imagem do sprite fornecido no Canvas obedecendo estritamente largura e altura; caso a imagem falhe, pinta blocos sólidos coloridos com letras como fallback temporário
function desenharSprite(img, x, y, w, h, cor, txt) {
    // CERTIFICAÇÃO DE PONTEIRO DE REDIMENSIONAMENTO DE ENVELOPE GRÁFICO:
    // Retorna verdadeiro se o asset foi completamente carregado pela rede, evitando erros de canvas vazios
    if (img && img.complete && img.src !== "" && img.width > 0) { 
        ctx.drawImage(img, x, y, w, h); // Desenha a imagem esticando perfeitamente sobre as dimensões w e h informadas
    } 
    else { 
        // Fallback robusto: Desenha um quadrado colorido simples contendo texto para o jogo funcionar mesmo sem nenhuma imagem na pasta
        ctx.fillStyle = cor; ctx.fillRect(x, y, w, h); ctx.fillStyle = "black"; ctx.font = "bold 10px Arial"; ctx.fillText(txt, x + 4, y + h / 2); 
    }
}

// Redireciona a chamada estrutural de raycast da visão para a função interna geométrica correspondente
function linhaInterceptaRetangulo(x1, y1, x2, y2, r) { return rInter(x1, y1, x2, y2, r); }

// ========================================================
// 10. CONTROLES E INPUTS (Capturadores de Perifericos e Eventos)
// ========================================================
// Escuta o pressionamento mecânico de botões físicos do teclado salvando o estado no dicionário
window.addEventListener('keydown', e => { teclas[e.key.toLowerCase()] = true; });
// Escuta a soltura mecânica de botões físicos do teclado limpando o estado no dicionário
window.addEventListener('keyup', e => { teclas[e.key.toLowerCase()] = false; });
// Captura em tempo real as coordenadas geográficas X e Y do cursor do mouse relativas às bordas internas da tela do Canvas
canvas.addEventListener('mousemove', e => { const rect = canvas.getBoundingClientRect(); mouse.x = e.clientX - rect.left; mouse.y = e.clientY - rect.top; });

// Captura e gerencia cliques físicos executados nos botões do mouse
window.addEventListener('mousedown', e => {
    // Clique com o Botão Esquerdo (Mouse 1)
    if (e.button === 0) { 
        lanternaAtiva = !lanternaAtiva; // Inverte o estado elétrico da lanterna (Ligar / Desligar)

        // Mecânica especial de clique ofensivo exclusivo para ferir a Chica (Sala 3)
        if (lanternaAtiva && progresso.salaAtual === 3 && chica.vivo) {
            if (noConeDeLuz(chica)) {
                chica.vida -= 1; // Deduz 1 ponto do HP acumulado
                if (chica.vida <= 0) {
                    chica.vivo = false; estadoSalas.chicaDerrotada = true; 
                    // Instancia a insígnia de prêmio da Chica na coordenada exata onde ela pereceu
                    itemPerkChicaNoChao = { x: chica.x + 15, y: chica.y + 15, w: 70, h: 45 };
                    // Espalha um bônus comemorativo massivo de 5 moedas de ouro para recompensa do jogador
                    for(let m = 0; m < 5; m++) { moedasNoChao.push({ x: chica.x + Math.random()*60, y: chica.y + Math.random()*60, w: 25, h: 25 }); }
                }
            }
        }
    }
    
    // Processamento de cliques comerciais interativos para aquisição de itens dentro da interface da Loja
    if (progresso.lojaAtiva) {
        itensLoja.forEach(item => {
            // Analisa se as coordenadas do clique do cursor coincidem com a área física limitadora do botão do card
            if (mouse.x > item.x && mouse.x < item.x + item.w && mouse.y > item.y && mouse.y < item.y + item.h) {
                // Checa se o inventário está limpo daquele perk para evitar compras duplicadas desperdiçadas
                let jaTemItem = (item.tipo === "lanterna" && player.hasPerkLanterna) || (item.tipo === "velocidade" && player.hasPerkVelocidade) || (item.tipo === "escudo" && player.hasPerkEscudo);
                if (!jaTemItem && player.moedas >= item.preco) {
                    player.moedas -= item.preco; // Deduz o saldo de moedas do jogador
                    // Guarda o respectivo item comprado em segurança na mochila interna
                    if (item.tipo === "lanterna") player.hasPerkLanterna = true;
                    if (item.tipo === "velocidade") player.hasPerkVelocidade = true;
                    if (item.tipo === "escudo") player.hasPerkEscudo = true;
                }
            }
        });
    }
});

// ========================================================
// DISPARO DE INICIALIZAÇÃO AUTOMÁTICA DO JOGO
// ========================================================
// Inicia e engata o motor gráfico executando a primeira renderização oficial da tela
render();