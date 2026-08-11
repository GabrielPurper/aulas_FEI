#include <stdio.h>

int main() { 

    int data, vencimento;

    printf("Digite o ano atual: ");
    scanf("%d", &data);

    printf("Digite o ano de vencimento do produto: ");
    scanf("%d", &vencimento);

    if (data > vencimento) {
        printf("Produto foi vencido");
    } 
    else {
        printf("Dentro da validade");
    }

}