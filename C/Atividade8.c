#include <stdio.h>

void main() {
   
    double hora, minuto, segundo;
    double tempo, meia;

    printf("Digite a hora atual (0 a 23): ");
    scanf("%lf", &hora); // Double para %lf

    printf("Digite o minuto atual (0 a 59): ");
    scanf("%lf", &minuto);

    printf("Digite o segundo atual (0 a 59): ");
    scanf("%lf", &segundo);

    tempo = (hora * 3600.0) + (minuto * 60.0) + segundo;

    meia = 86400.0 - tempo;

    printf("Horario informado: %02.0f:%02.0f:%02.0f\n", hora, minuto, segundo);
    printf("Segundos passados desde 00:00:00 : %.2f s\n", tempo);
    printf("Segundos faltantes para meia-noite: %.2f s\n",meia);
   
}