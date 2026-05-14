// Trocar 
let player = {
    // trocar 
    x: 50,
    y: 50,
    // Trocar velocidade 
    speed: 5, // Velocidade normal
    baseSpeed: 3
};

let energetico = {
    // Proporção 
    
    ativo: true
};

// Distância mínima para "pegar" o item (5 pixels como solicitado)
const DISTANCIADROP = 5;

function verificarProximidade() {
    if (!energetico.ativo) return;

    // Calcula a diferença entre as posições
    let dx = player.x - energetico.x;
    let dy = player.y - energetico.y;
    
    // Teorema de Pitágoras para achar a distância real
    let distancia = Math.sqrt(dx * dx + dy * dy);

    // Se a distância for menor ou igual a 5px
    if (distancia <= DISTANCIADROP) {
        coletarEnergético();
    }
}


// Evento dentro do movimento
verificarProximidade();

function aplicarEnergético() {
    energetico.ativo = false;
    // 1. Aumenta a velocidade (ex: dobro)
    player.speed = player.baseSpeed * 2;
    console.log("Velocidade aumentada!");

    // 2. Define um tempo para o efeito acabar (ex: 3 segundos)
    setTimeout(() => {
        player.speed = energetico.baseSpeed;
        console.log("O efeito do energético acabou.");
    }, 3000); 
}