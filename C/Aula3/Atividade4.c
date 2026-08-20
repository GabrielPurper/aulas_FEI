#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int dado;
    struct Node *proximo;
} Node;

// Função para inserir um novo nó no início da lista
void inserirInicio(Node **cabeca, int valor) {
    Node *novoNo = (Node *)malloc(sizeof(Node));
    if (novoNo == NULL) return;

    novoNo->dado = valor;
    novoNo->proximo = *cabeca;
    *cabeca = novoNo;
}

// Imprime e libera os nós recursivamente/iterativamente
void exibirELiberar(Node *cabeca) {
    Node *atual = cabeca;
    printf("Lista: ");
    while (atual != NULL) {
        printf("[%d] -> ", atual->dado);
        Node *temp = atual;
        atual = atual->proximo;
        free(temp); // Limpa o nó após passar por ele
    }
    printf("NULL\n");
}

int main() {
    Node *lista = NULL;

    inserirInicio(&lista, 30);
    inserirInicio(&lista, 20);
    inserirInicio(&lista, 10);

    exibirELiberar(lista);

    return 0;
}