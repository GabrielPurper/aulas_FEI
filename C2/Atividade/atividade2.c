#include <stdio.h>

int main(){

int x;
scanf("%d", &x);
// evite de fazer isso...
int sinal = (x > 0) ? 1 : (x < 0) ? -1 : 0 ;
    if (sinal == 1)
        printf("x eh positivo");
    else if (sinal == -1)
        printf("x eh negativo");
    else
        printf("x eh igual a zero");

    switch (x)
    {
    case 1:
    printf("X é igual a %d", x);
        break;
    
    default:
    printf("X não é %d",x);
    }
}