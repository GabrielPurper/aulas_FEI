#include <stdio.h>

int main(){
    int v[2];
    for (int i = 0; i < 2; i++){
        printf("Digite um número %d: ", i + 1);
        scanf("%d", &v[i]);
    }
    if (v[0]<v[1]){
        printf("O número maior é o %d", v[1]);
    }
    else if (v[1]<v[0]){
        printf("O número maior é o %d", v[0]);
    }
    else if (v[0]==v[1]){
        printf("Os números são idênticos");
        printf("Os numeros se combinam");
    }
}