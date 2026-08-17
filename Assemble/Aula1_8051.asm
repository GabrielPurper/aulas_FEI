ORG 0000h ; 000000000000000b

; Tem 4 bits em hexadecimal

; CLR É um clear 

CLR P1.7 ; É um LED azul 7: 1100 0010 1001 0111 se n tiver h é decimal
CLR P1.6 ; Este é um LED 

MOV A, R0 ; Está colocando acumulador no R0
Add A, 10h ; Está 

MOV 50h, #20h ; Está colocando no endereço 50 o endereço 20 

DEC A ; Descartar o acumulador

INC R2