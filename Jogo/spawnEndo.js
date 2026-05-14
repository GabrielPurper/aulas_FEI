


// Spawn de Endoesqueletos aleátorio
function gerarPosicaoAleatoria(margin = 50) {
    // A margem evita que o objeto apareça colado na borda da tela
    const x = Math.floor(Math.random() * (window.innerWidth - margin));
    const y = Math.floor(Math.random() * (window.innerHeight - margin));
    return { x, y };
}

function spawnSprite(tipo) {
    const sprite = document.createElement('div');
    sprite.className = tipo; // 'moeda' ou 'endoesqueleto'
    
    const pos = gerarPosicaoAleatoria();
    
    sprite.style.position = 'absolute';
    sprite.style.left = pos.x + 'px';
    sprite.style.top = pos.y + 'px';
    
    document.body.appendChild(sprite);
    return sprite;
}