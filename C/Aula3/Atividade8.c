#include <stdio.h>
#include <stdlib.h>

// Definição do nó da lista
typedef struct No {
    int valor;
    struct No* proximo;
} No;

// Função para inserir no início da lista
void inserirInicio(No** cabeca, int valor) {
    No* novoNo = (No*) malloc(sizeof(No));
    if (novoNo == NULL) {
        printf("Erro de alocação de memória!\n");
        return;
    }
    novoNo->valor = valor;
    novoNo->proximo = *cabeca; // O novo nó aponta para a antiga cabeça
    *cabeca = novoNo;         // A cabeça passa a ser o novo nó
}

// Imprime a lista
void exibirLista(No* cabeca) {
    No* atual = cabeca;
    printf("Lista: ");
    while (atual != NULL) {
        printf("[%d] -> ", atual->valor);
        atual = atual->proximo;
    }
    printf("NULL\n");
}

// Libera toda a memória alocada dinamicamente
void liberarLista(No** cabeca) {
    No* atual = *cabeca;
    No* proximoNo;
    while (atual != NULL) {
        proximoNo = atual->proximo;
        free(atual);
        atual = proximoNo;
    }
    *cabeca = NULL;
}

int main() {
    No* lista = NULL; // Lista inicialmente vazia

    inserirInicio(&lista, 30);
    inserirInicio(&lista, 20);
    inserirInicio(&lista, 10);

    exibirLista(lista);

    liberarLista(&lista); // Sempre limpe a heap após usar
    return 0;
}