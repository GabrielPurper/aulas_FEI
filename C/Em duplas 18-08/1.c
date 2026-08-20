#include <stdio.h>

int main() {
    int quant[6]; 
    float moeda[6];
    
    moeda[0]=1; 
    moeda[1]=0.5; 
    moeda[2]=0.25; 
    moeda[3]=0.1; 
    moeda[4]=0.05; 
    moeda[5]=0.01;

    for (int i=0; i<6; i++){
        printf("Digite a quantidade de moedas de U$%.2f: \n",moeda[i]);
        scanf("%d",&quant[i]);
    }
    
    float D;
    printf("Digite a cotação do dolar: \n");
    scanf("%f",&D);
    
    float R=(quant[0]+0.5*quant[1]+0.25*quant[2]+0.1*quant[3]+0.05*quant[4]+0.01*quant[5])*D;
    
    printf("A quantidade em dolar contida no cofre e de: U$ %.2f",R);

    return 0;
}