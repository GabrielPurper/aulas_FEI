#include <stdio.h>

int main(){
    int idade;
    int status = 0;

    printf("Digite sua idade: %d", idade);
    scanf("%d", &idade);

    /*
    
    int main(){

    int idade;
    printf("Entre com a idade: ");
    scanf("%d",&idade);

    int maiorDeIdade = (idade >= 18) ? 1 : 0;
    if (maiorDeidade)
        printf("Maior de Idade\n");
    else 
        printf("Menor de idade\n");

    }
    
    */

    if (idade >= 18){
        status = 1;
    }
    else if (idade < 18){
        status = 0;
    }

    printf("O valor é %d", status);

}