#include <stdio.h>
#include <math.h>

void main(){

  float vetor[5];

  int limite = 0;
  float soma = 0;

    for (int i=0;i<5; i++) {
        printf("Digite a nota: ");
        scanf("%f",&vetor[i]);
    }

    for (int i=0;i<5; i++) {
        soma = soma + vetor[i];
    }

    float media = soma / 5.0;

    printf("Sua media foi: %.2f", media);
}