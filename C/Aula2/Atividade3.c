#include <stdio.h>

int main(){
    
    float num[2], soma;

    printf("Digite 2 numeros:\n");
    scanf("%f","%f",&num[0],&num[1]);
    
    soma = num[0] + num[1];
    
    printf("Resultado eh:%.2f\n", soma);
}