ORG 0000h ; 000000000000000b

; Tem 4 bits em hexadecimal

; MOV É POSIÇÃO DE MEMÓRIA
; CLR É um clear 

;CLR P1.7 ; É um LED azul 7: 1100 0010 1001 0111 se n tiver h é decimal

; Movendo para o registrador o valor 10h
MOV R0,#10H ; Ele coloca o valor 10h no R0
MOV R0,10H ; Ele puxa o 10 da memoria que é 0

MOV R0,10H ;(1, A)
MOV A,R0

MOV A, R0 ; (2, A)
ADD A, R0

MOV R2, A ;(2, B)
ADD A, R3

MOV A, R5 ; (2, C)
ADD R5, #30H

MOV A,R1 ; (2, D)
SUBB R1, #1H

MOV R2, R1 ; (2, E)
ADD R1, #31H

MOV R2, @R0 ; (2 , F)
ADD @R0, @R1


;MOV A, R0 ; Está colocando acumulador no R0
; Mov A, #10h Bota o número 10 no acumulador

; Vai fazer a operação A = A + R0
; Add A, R0

; Add A, 10h ; Está armazenando na memória 

MOV 50h, #20h ; Está colocando no endereço 50 o endereço 20 (1 C)

DEC A ; Descartar o acumulador

INC R2 ; Decremente o acumulador

CLR A ; Deixar acumulador zerado 

MOV A, #00H

MOV 20H, #02

MOV 21H, #02
MOV 22H, #01
MOV 23H, #01
MOV 24H, #03
MOV 25H, #00
MOV 26H, #08
MOV 27H, #03
MOV 28H, #04

