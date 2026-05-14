
// Colisão de Morte do Player
function ColisaoMortal(playerSprite, endoSprite) {
    // 1. Verifica se os Sprites estão se tocando
    // (A lógica de colisão depende do seu motor, aqui vai um exemplo padrão)
    if (playerSprite.getBounds().intersects(endoSprite.getBounds())) {
        
        console.log("O Endoesqueleto pegou você!");
        
        // 1. Verifica se o player tem a habilidade de ressurreição da Pizza Dourada
        if (player.hasResurrection === true) {
            
            // Ativa a ressurreição
            player.hasResurrection = false; // Gasta o item
            
            // Teleporta o player ou dá um tempo de invencibilidade
            player.sprite.x = 50; 
            player.sprite.y = 50;
            
            console.log("A Pizza Dourada te salvou! Você ressuscitou.");
            
        } else {
            morrer();
        }
    }
}

// Morte do Player 
function morrer() {
    console.log("Game Over!");
    player.sprite.visible = false; // Esconde o sprite do jogador

    // Aqui você chama a sua tela de Game Over ou reinicia a fase
    window.location.reload(); 
}