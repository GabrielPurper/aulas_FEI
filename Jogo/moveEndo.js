function moveEndo (){
    const endo = document.getElementById('endoesqueleto');

    // 1. Calcula a direção
    // posX e posY são as variáveis globais do seu Player
    if (endoX < posX) {
        endoX += velocidadeEndo;
    } else if (endoX > posX) {
        endoX -= velocidadeEndo;
    }

    if (endoY < posY) {
        endoY += velocidadeEndo;
    } else if (endoY > posY) {
        endoY -= velocidadeEndo;
    }


}