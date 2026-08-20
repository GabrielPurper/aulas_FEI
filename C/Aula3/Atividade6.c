#include <stdio.h>

// Exibe a representação binária de um byte (8 bits)
void mostrarBinario(unsigned char num) {
    printf("%d em binario: ", num);
    for (int i = 7; i >= 0; i--) {
        int bit = (num >> i) & 1; // Desloca os bits e faz máscara AND
        printf("%d", bit);
    }
    printf("\n");
}

int main() {
    unsigned char registrador = 0b00000100; // Bit 2 ativo (valor 4)

    mostrarBinario(registrador);

    // Liga o Bit 0 (OU bit a bit com deslocamento)
    registrador |= (1 << 0);
    printf("Apos ligar Bit 0: ");
    mostrarBinario(registrador);

    // Inverte todos os bits (NOT bit a bit)
    registrador = ~registrador;
    printf("Apos inverter bits: ");
    mostrarBinario(registrador);

    return 0;
}