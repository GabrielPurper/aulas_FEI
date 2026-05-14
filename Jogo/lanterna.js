// Configuração única da lanterna
const statusLanterna = {
    energia: 100,
    estaLigada: false,
    consumo: 0.2, // Ajuste para gastar mais rápido ou mais devagar
    sprite: spriteLanterna // Certifique-se que o sprite já foi criado
};

function alterarLanterna() {
    // Se tiver energia, ele inverte o estado (liga se estiver desligada e vice-versa)
    if (statusLanterna.energia > 0) {
        statusLanterna.estaLigada = !statusLanterna.estaLigada;
        
        // Atualiza o Sprite visualmente
        statusLanterna.sprite.visible = statusLanterna.estaLigada;
        
        console.log(statusLanterna.estaLigada ? "Lanterna Ligada" : "Lanterna Desligada");
    } else {
        console.log("A lanterna está sem bateria!");
        statusLanterna.estaLigada = false;

        // Para ficar invisible a lanterna
        statusLanterna.sprite.visible = false;
    }
}

function lanternabateria() {
    // Só gasta se estiver ligada
    if (statusLanterna.estaLigada) {
        statusLanterna.energia -= statusLanterna.consumo;

        // Se a energia chegar a 0, desliga tudo
        if (statusLanterna.energia <= 0) {
            statusLanterna.energia = 0;
            statusLanterna.estaLigada = false;
            // Para ficar invisible a lanterna
            statusLanterna.sprite.visible = false;
            console.log("A bateria acabou totalmente!");
        }

        // Dica: Faz a lanterna piscar quando a bateria estiver abaixo de 15%
        if (statusLanterna.energia < 15 && statusLanterna.energia > 0) {
            statusLanterna.sprite.alpha = Math.random() > 0.5 ? 1 : 0.2;
        } else {
            statusLanterna.sprite.alpha = 1;
        }
    }
}

function update() {
    lanternabateria(); // Chama a bateria o tempo todo
    requestAnimationFrame(update);
}

update(); // Inicia o loop



