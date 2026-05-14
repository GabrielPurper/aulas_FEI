let bateria = {
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

verificarProximidade();

function aplicarBateria() {
    bateria.ativo = false;
    // 1. Aumenta a velocidade (ex: dobro)
    lanterna.speed += lanterna.baseSpeed();
    console.log("Bateria aumentada!");
}