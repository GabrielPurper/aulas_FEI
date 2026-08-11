#include <stdio.h>

int main() {
    double soma = 0.0;
    double nota = 0.0;
    
    int quantidade = 0; // Contador (começa em 0 e vai somando de 1 em 1)
    int limite = 5;     // Quantidade total desejada

    while (quantidade < limite) {
        printf("Digite a nota %d: ", quantidade + 1);
        scanf("%lf", &nota); // %lf é usado para ler valores do tipo double

        soma += nota;     // Acumula o valor digitado (soma = soma + nota)
        quantidade++;     // Incrementa o contador em 1 (quantidade = quantidade + 1)

        printf("   -> Notas registradas ate agora: %d\n", quantidade);
    }

    double media = soma / quantidade;

    printf("Total de notas registradas: %d\n", quantidade);
    printf("Soma total acumulada:      %.2f\n", soma);
    printf("Media final:               %.2f\n", media);

    return 0;
}