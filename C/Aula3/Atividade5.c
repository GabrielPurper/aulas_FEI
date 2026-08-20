#include <stdio.h>
#include <limits.h>

#define N 4 // Número de cidades

int grafo[N][N] = {
    {0, 10, 15, 20},
    {10, 0, 35, 25},
    {15, 35, 0, 30},
    {20, 25, 30, 0}
};

int visitados[N];
int menorCusto = INT_MAX;

void tsp(int cidadeAtual, int cont, int custoAtual, int cidadeInicial) {
    // Se visitou todas as cidades e há caminho de volta para a inicial
    if (cont == N && grafo[cidadeAtual][cidadeInicial] > 0) {
        int custoTotal = custoAtual + grafo[cidadeAtual][cidadeInicial];
        if (custoTotal < menorCusto) {
            menorCusto = custoTotal;
        }
        return;
    }

    for (int i = 0; i < N; i++) {
        if (!visitados[i] && grafo[cidadeAtual][i] > 0) {
            visitados[i] = 1;
            
            // Poda (Pruning): Se o custo atual já passou do menor custo achado, cancela
            if (custoAtual + grafo[cidadeAtual][i] < menorCusto) {
                tsp(i, cont + 1, custoAtual + grafo[cidadeAtual][i], cidadeInicial);
            }
            
            visitados[i] = 0; // Backtracking
        }
    }
}

int main() {
    visitados[0] = 1; // Começa na cidade 0
    tsp(0, 1, 0, 0);

    printf("Menor custo para visitar todas as cidades: %d\n", menorCusto);

    return 0;
}