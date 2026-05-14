

// Pega moeda por aproximação player 
function ColetaMoeda() {
    const moedas = document.querySelectorAll('.moeda');
    const playerRect = player.getBoundingClientRect();
    
    // Centro do player
    const pX = playerRect.left + playerRect.width / 2;
    const pY = playerRect.top + playerRect.height / 2;

    moedas.forEach(moeda => {
        const mRect = moeda.getBoundingClientRect();
        const mX = mRect.left + mRect.width / 2;
        const mY = mRect.top + mRect.height / 2;

        // Cálculo da distância (Pitágoras)
        const distancia = Math.sqrt(Math.pow(pX - mX, 2) + Math.pow(pY - mY, 2));

        if (distancia < 50) { // Raio de 50 pixels para coletar
            coletarMoeda(moeda);
        }
    });
}

function LuzEndo() {
    const lanterna = document.getElementById('lanterna'); // O facho de luz (div)
    const endo = document.getElementById('endoesqueleto');
    
    if (!lanterna || !endo) return;

    // Só checa se a lanterna estiver visível/ligada
    if (lanterna.style.display !== 'none') {
        const lRect = lanterna.getBoundingClientRect();
        const eRect = endo.getBoundingClientRect();

        const atingiu = !(
            lRect.top > eRect.bottom ||
            lRect.bottom < eRect.top ||
            lRect.left > eRect.right ||
            lRect.right < eRect.left
        );

        if (atingiu) {
            dropMoeda(eRect.left, eRect.top);
            // Opcional: mover o endoesqueleto para longe ou desativá-lo
            respawnEndo(endo); 
        }
    }
}


// Só para mover o player junto com a lanterna 
function gameLoop() {
    // 1. Move o player (se houver teclas pressionadas)
    // 2. Move a lanterna junto com o player
    
    // 3. Checa as interações
    verificarProximidadeMoeda();
    verificarLuzNoEndo();

    requestAnimationFrame(gameLoop);
}

gameLoop(); // Inicia o jogo