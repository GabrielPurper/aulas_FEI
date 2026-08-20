#include <stdlib.h>
#include <stdio.h>

int main(){

    int colunas, linhas;

    // Aloca um array de ponteiros para as linhas
    int **matriz = (int **)malloc(linhas * sizeof(int *)); // o **
    if (matriz == NULL) return 1;

    // Aloca cada linha individualmente
    for (int i = 0; i < linhas; i++) {
        matriz[i] = (int *)malloc(colunas * sizeof(int));
        if (matriz[i] == NULL) return 1;
    }

    // Preenche e exibe a matriz usando aritmética de ponteiros
    for (int i = 0; i < linhas; i++) {
        for (int j = 0; j < colunas; j++) {
            *(*(matriz + i) + j) = (i + 1) * (j + 1); // Equivalente a matriz[i][j]
            printf("%2d ", matriz[i][j]);
        }
        printf("\n");
    }

    // Liberação obrigatória da memória (na ordem inversa)
    for (int i = 0; i < linhas; i++) {
        free(matriz[i]);
    }
    free(matriz);

    return 0;

}