#include <stdio.h>

// Funções com a mesma assinatura: int func(int, int)
int somar(int a, int b) { return a + b; }
int subtrair(int a, int b) { return a - b; }
int multiplicar(int a, int b) { return a * b; }

// Função que recebe um ponteiro de função como argumento
void executarOperacao(int x, int y, int (*operacao)(int, int), const char* nomeOp) {
    int resultado = operacao(x, y); // Executa a função passada por parâmetro
    printf("Operacao (%s) com %d e %d = %d\n", nomeOp, x, y, resultado);
}

int main() {
    int a = 12, b = 4;

    // Array de ponteiros para funções (Tabela de Operações)
    int (*operacoes[])(int, int) = { somar, subtrair, multiplicar };
    const char* nomes[] = { "Soma", "Subtracao", "Multiplicacao" };

    for (int i = 0; i < 3; i++) {
        executarOperacao(a, b, operacoes[i], nomes[i]);
    }

    return 0;
}