#include <stdio.h>

int main() {
    int ano;

    printf("Digite um ano: ");
    scanf("%d", &ano); // Ele pega o & memoria o ano

    // Lógica com operadores relacionais e lógicos
    if ((ano % 4 == 0 && ano % 100 != 0) || (ano % 400 == 0)) { // Aqui ele ta falando se o resto for igual a 0 e também o ano for resto de 100 diferente de 0 ou ano for resto de igual a 400 
        printf("O ano %d é bissexto.\n", ano); // Vai falar que é ano bissexto 
    } else {
        printf("O ano %d não é bissexto.\n", ano); // se não vai falar que não é ano bissexto 
    }

    return 0;
}