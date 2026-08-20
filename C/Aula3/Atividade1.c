#include <stdio.h>

int main() {
    int numero, invertido = 0, resto;

    printf("Digite um numero inteiro: ");
    scanf("%d", &numero);

    int temp = numero; // Guarda o valor original

    while (temp != 0) {     // Pega se o valor diferente de 0 e repete 
        resto = temp % 10;                // Pega o ultimo digito
        invertido = invertido * 10 + resto; // Empurra os digitos para a esquerda e soma
        temp /= 10;                       // Remove o ultimo digito
    }

    printf("Numero original: %d\n", numero); // pega o numero principal 
    printf("Numero invertido: %d\n", invertido); // pega o numero invertido

    return 0;
}