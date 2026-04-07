const canvas = document.getElementById('meuCanvas'); // Peguei o ID do Canvas chamado meuCanvas
const ctx = canvas.getContext('2d');

// 1. Função para desenhar quadrado
function desenhar_quadrado(x, y, tamanho, cor) {
    ctx.fillStyle = cor;
    ctx.fillRect(x, y, tamanho, tamanho);
}

// 2. Função para desenhar linha
function desenhar_linha(x1, y1, x2, y2, cor, espessura = 2) {
    ctx.beginPath();
    ctx.strokeStyle = cor;
    ctx.lineWidth = espessura;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

// 3. Função para desenhar arco (pode ser usado para círculos)
function desenhar_arco(x, y, raio, anguloInicial, anguloFinal, corPreenchimento) {
    ctx.beginPath();
    ctx.fillStyle = corPreenchimento;
    // Math.PI * 2 desenha um círculo completo
    ctx.arc(x, y, raio, anguloInicial, anguloFinal);
    ctx.stroke();
    ctx.fill(); // Pinta o interior do círculo
}

// 4. Função para escrever texto
function escrever(texto, x, y, cor, fonte = "20px Arial") {
    ctx.fillStyle = cor;
    ctx.font = fonte;
    ctx.fillText(texto, x, y);
}

// --- UTILIZAÇÃO DAS FUNÇÕES (Exemplo de Composição) ---

function desenharCenaExemplo() {

    desenhar_quadrado(100,150,100,"brown");

    desenhar_quadrado(150, 180, 30, "blue");

    desenhar_quadrado(0,220,80,"lightblue");

    desenhar_arco(35, 200, 50, 0, 2 * Math.PI, "lightblue");

    desenhar_quadrado(80,250,300,"gray");

    // Desenha uma linha vermelha cruzando o canvas
    desenhar_linha(150, 100, 200, 150, "green");

    desenhar_linha(150,100,100,150,"green");

    // Desenha um círculo (arco de 0 a 2π) verde
    desenhar_arco(200, 60, 50, 0, 2 * Math.PI, "yellow");
    
    

}

// Executa o desenho
desenharCenaExemplo();