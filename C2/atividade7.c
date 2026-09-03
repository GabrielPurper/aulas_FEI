#include <stdio.h>

int main(){

    float x, y;
    char operador;

    printf("Digite os primeiro número: \n");
    scanf("%f", &x);

    printf("Digite os segundo número: \n");
    scanf("%f", &y);

    printf("Digite a operação (+,-,*,/)\n");
    scanf("%c", operador);

    switch (operador)
    {
    case '+':
        printf("Soma: %f\n", x+y);
        break;
    case '-':
        printf("Subtração: %f\n", x-y);
        break;
    case "*":
        printf("Multiplicação: %f\n", x*y);
        break;
    case "/":
            if (y != 0) {
                printf("Divisão: %.2f\n", x / y);
            } else {
                printf("Erro: Divisão por zero não existe.\n");
            }
        break;
    default:
        while (operador[0] == "")
    {
        printf("Operação inválida\n");
        continue;
    }
    }
}