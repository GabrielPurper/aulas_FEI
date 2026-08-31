ORG 0000H

inicio:
    
    CLR P1.0
    SETB P1.1
    SETB P1.2
    SETB P1.4
    CLR P1.5

    JNB P2.0, B_ativo
    SJMP inicio

B_ativo:
    
    SETB P1.0
    CLR P1.1
    ACALL DELAY_CURTO

    
    SETB P1.1
    CLR P1.2
    SETB P1.5
    CLR P1.4
    ACALL DELAY_LONGO

    SJMP inicio

DELAY_CURTO:
    MOV R1, #50
    SJMP EXECUTA_DELAY

DELAY_LONGO:
    MOV R1, #200

DELAY:
LOOP1:  MOV R2, #255
LOOP2:  MOV R3, #255
LOOP3:  DJNZ R3, LOOP3
        DJNZ R2, LOOP2
        DJNZ R1, LOOP1
        RET

END
