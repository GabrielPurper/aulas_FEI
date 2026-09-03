#include <stdio.h>

int main(){

    int alunos[3], notas[3];
    float media;
    for (int i = 0; i < 3; i++){
        printf("Digite o nome do aluno %d: ", i + 1);
        scanf("%s", &alunos[i]);
    }
    for (int i = 0; i < 3; i++){
        printf("Digite a nota do aluno %d: ", i + 1);
        scanf("%d", &notas[i]);
    }

    media = (notas[0] + notas[1] + notas[2]) / 3.0;

      if (media >= 7.0){
            printf("Aluno %s foi aprovado", alunos[i]);
        }
        else if (media >= 5.0 && media < 7.0){
            printf("Aluno %s ficou em recuperação", alunos[i]);
        }
        else if (media >= 7.0){
            printf("Aluno %s foi reprovado", alunos[i]);
        }

    printf("A média das notas do aluno %s é: %.2f", alunos[0], media);
    
}