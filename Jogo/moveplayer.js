// Esta função será chamada pelo game.js dentro do loop principal
function movimentarPlayer(p, t) {
    /**
     * p = objeto player enviado pelo game.js
     * t = objeto de teclas (ex: teclas['w'])
     */

    // Movimento para Cima
    if (t['w'] || t['arrowup']) {
        if (p.y > 0) p.y -= p.speed;
    }

    // Movimento para Baixo
    if (t['s'] || t['arrowdown']) {
        if (p.y < 1000 - p.h) p.y += p.speed; // 1000 é a altura do canvas
    }

    // Movimento para Esquerda
    if (t['a'] || t['arrowleft']) {
        if (p.x > 0) p.x -= p.speed;
    }

    // Movimento para Direita
    if (t['d'] || t['arrowright']) {
        if (p.x < 1000 - p.w) p.x += p.speed; // 1000 é a largura do canvas
    }
}