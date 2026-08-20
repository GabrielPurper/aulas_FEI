#include <stdio.h>

int main() {

    float produto1 = 25.00;
    float produto2 = 47.50;
    float produto3 = 68.25;

    float soma = produto1 + produto2 + produto3;

    printf("Produto 1\t=\t%.2f\n", produto1);
    printf("Produto 2\t=\t%.2f\n", produto2);
    printf("Produto 3\t=\t%.2f\n", produto3);
   
    printf("Total\t\t=\t%.2f\n", soma);
    
}