// Chica 
function pizzadourada(){
    console.log("Pizza Dourada ativado!");
    // Preciso da vida de do Objeto do Player
    // Ele vai rodar a cada 300ms (bem rápido para parecer um "shower" de itens)
    // Aqui vai ser como a pizza dá habilidades especiais como ressuscitação e dropa aleatoriamente pizzas especiais no mapa 
    
    // Adiciona o Sprite ao jogo/cena para ele ficar visível

    const pizzas = setInterval(() => {
        
        // Criar o novo Sprite já existente 
        let pizzaMenor = new Sprite('');
        
        // Define uma posição aleatória perto do jogador ou no mapa todo
        pizzaMenor.x = Math.random() * window.innerWidth;
        pizzaMenor.y = Math.random() * window.innerHeight;
        
        // Adiciona o Sprite ao jogo
        cena.addChild(pizzaMenor); 
        
        console.log("Novo sprite de pizza dropado!");
    }, 300);

    const dropEspecial = setInterval(() => {
        clearInterval(pizzas); // Para para a chuva de pizzas
        console.log("Uma pizza especial caiu no mapa!");
    }, 2000);
}

function pizzaMenor(){

    // Sorteia um número entre 1 e 3
    const sorteio = Math.floor(Math.random() * 2) + 1;

    if (sorteio === 1) {

        // HABILIDADE 1: Energético (Velocidade 2,5%)
        player.speed = player.baseSpeed * 1.025;
        console.log("Efeito: Pizza ativado! Velocidade aumentada.");
        
        setTimeout(() => {
            player.speed = player.baseSpeed;
            console.log("O efeito da pizza acabou.");
        }, 3000);

    } else {
        // HABILIDADE 2: Camuflagem (Invisibilidade para os Endos)
        player.sprite.alpha = 0.3; // Deixa o sprite transparente


        endoesqueletos.canSpawn = false; // Para o spawn por um momento
        console.log("Efeito: Pizza ativado! Você está difícil de ver.");

        setTimeout(() => {
            // Transparência do sprit
            player.sprite.alpha = 1.0;

            endoesqueletos.canSpawn = true;
            console.log("O efeito da pizza acabou.");
        }, 3000);

    } 
}
