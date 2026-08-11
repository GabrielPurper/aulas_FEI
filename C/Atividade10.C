#include <stdio.h>

void main() {
    int a, b, c;
    int aux; 

    printf("Digite o primeiro numero: ");
    scanf("%d", &a);

    printf("Digite o segundo numero: ");
    scanf("%d", &b);

    printf("Digite o terceiro numero: ");
    scanf("%d", &c);
   
    if (a > b) {
        aux = a;
        a = b;
        b = aux;
    }

    if (a > c) {
        aux = a;
        a = c;
        c = aux;
    }
    
    if (b > c) {
        aux = b;
        b = c;
        c = aux;
    }

    printf("Ordem crescente: %d, %d, %d\n", a, b, c);

}