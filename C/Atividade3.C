

// <iostream>: Biblioteca padrão de Entrada/Saída do C++.
// Fornece fluxos de dados como std::cout (impressão na tela), std::cin (leitura do teclado) e std::endl (quebra de linha e flush do buffer).
#include <iostream>

// <cstdio>: Biblioteca padrão de Entrada/Saída herdada do C (equivalente ao <stdio.h>).
// Fornece funções de I/O formatado como printf() e scanf(), além de suporte direto para sequências de escape.
#include <cstdio>

// <string>: Biblioteca de manipulação de textos do C++.
// Define a classe std::string para trabalhar com sequências de caracteres de tamanho dinâmico.
#include <string>

using namespace std; // Evita ter que repetir 'std::' antes de funções e objetos padrão.

int main() {

  
    short pequenoNum = 32000;                       // 2 bytes: Inteiro curto (-32.768 a 32.767)
    int numeroInteiro = 1000000;                    // 4 bytes: Inteiro padrão (-2.147.483.648 a 2.147.483.647)
    long long numeroGrande = 9000000000000000000LL; // 8 bytes: Inteiro de grande capacidade
    float altura = 1.75f;                           // 4 bytes: Ponto flutuante de precisão simples (~6-7 dígitos)
    double piPrecisao = 3.141592653589793;          // 8 bytes: Ponto flutuante de dupla precisão (~15-17 dígitos)
    char inicial = 'G';                             // 1 byte:  Caractere único ou inteiro pequeno (ASCII)
    string mensagem = "C++ Completo";               // Objeto de texto (cadeia de caracteres)


   
    short shortComSinal = -15000;                 // signed short (com sinal)
    int inteiroComSinal = -42;                    // signed int (com sinal)
    unsigned short shortSemSinal = 65000U;        // unsigned short (sem sinal)
    unsigned int inteiroSemSinal = 4000000000U;   // unsigned int (sem sinal)
    signed long valorLongComSinal = -2147483640L; // signed long (com sinal)
    unsigned long valorLongSemSinal = 4294967290UL;// unsigned long (sem sinal)
    unsigned int valorOctalHexa = 255;            // Número decimal 255 para exibição em Octal e Hexadecimal


  
    // \0 : Null (Terminador nulo de string). Indica o fim da cadeia de caracteres em C.
    char textoComNull[] = {'O', 'l', 'a', '\0', 'M', 'u', 'n', 'd', 'o', '\0'};


    
    
    cout << "          1. DEMONSTRAÇÃO DE TIPOS COM COUT             \n";
    cout << "short:   " << pequenoNum << " \t\t[Tamanho: " << sizeof(pequenoNum) << " bytes]\n";
    cout << "int:     " << numeroInteiro << " \t[Tamanho: " << sizeof(numeroInteiro) << " bytes]\n";
    cout << "long:    " << numeroGrande << " \t[Tamanho: " << sizeof(numeroGrande) << " bytes]\n";
    cout << "float:   " << altura << "f \t\t[Tamanho: " << sizeof(altura) << " bytes]\n";
    cout << "double:  " << piPrecisao << " \t[Tamanho: " << sizeof(piPrecisao) << " bytes]\n";
    cout << "char:    '" << inicial << "' \t\t[Tamanho: " << sizeof(inicial) << " byte]\n";
    cout << "string:  \"" << mensagem << "\"\n\n";

    printf("       2. FORMATADORES DE SAÍDA VIA PRINTF (CSTDIO)      \n");
    
    // %d ou %i -> Imprime inteiros com sinal (signed short / signed int)
    printf("signed short / int  (%%d ou %%i) : %d | %i\n", shortComSinal, inteiroComSinal);
    
    // %u -> Imprime inteiros sem sinal (unsigned short / unsigned int)
    printf("unsigned short / int (%%u)       : %u | %u\n", shortSemSinal, inteiroSemSinal);
    
    // %ld -> Imprime inteiros longos com sinal (signed long)
    printf("signed long        (%%ld)      : %ld\n", valorLongComSinal);
    
    // %lu -> Imprime inteiros longos sem sinal (unsigned long)
    printf("unsigned long      (%%lu)      : %lu\n", valorLongSemSinal);
    
    // %o -> Imprime valor em base Octal (base 8)
    printf("unsigned octal     (%%o)       : %o  (Decimal equivalente: %u)\n", valorOctalHexa, valorOctalHexa);
    
    // %x -> Imprime valor em base Hexadecimal (base 16)
    printf("unsigned hexa      (%%x)       : %x  (Decimal equivalente: %u)\n\n", valorOctalHexa, valorOctalHexa);

    printf("       3. DEMONSTRAÇÃO DE CARACTERES DE ESCAPE          \n");
    
    // \n : Quebra de linha (Move o cursor para a linha de baixo)
    printf("Exemplo \\n : Primeira Linha\nSegunda Linha\n\n");

    // \t : Tabulação horizontal (Cria um espaçamento de coluna/TAB)
    printf("Exemplo \\t : Coluna1\tColuna2\tColuna3\n\n");

    // \b : Backspace (Recua o cursor 1 caractere para trás no fluxo)
    printf("Exemplo \\b : AB\bC  (Note que o 'B' foi apagado pelo 'C')\n\n");

    // \r : Retorno de carro (Move o cursor para o início da mesma linha)
    printf("Texto Antigo\rExemplo \\r : Texto Novo sobrescreveu o antigo\n\n");

    // \f : Nova linha / Avanço de página (Form Feed em impressoras/terminais)
    printf("Exemplo \\f : Pagina 1\fPagina 2 (Form Feed executado)\n\n");

    // \0 : Null (Byte zero / Terminador Nulo: interrompe a leitura da string)
    printf("Exemplo \\0 : %s (A leitura para no \\0, ignorando 'Mundo')\n", textoComNull);

    return 0;
}