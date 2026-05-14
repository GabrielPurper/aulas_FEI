// Bonnie 
function mascarabonnie(){

    // Feedback visual no Sprite do Bonnie ou do Jogador
    player.sprite.alpha = 0.5; // Deixa o player transparente (escondido)
    
    endoesqueletos.canSpawn = False
    console.log("Máscara ativada: Spawner de endoesqueletos pausado!");

    // Para fazer endoesqueletos pararem de aparecer por 3 segundos. 
    setTimeout(() => {
        endoesqueletos.canSpawn = True
        console.log("O efeito da Máscara do Bonnie está ativado")
    }, 3000); 
}