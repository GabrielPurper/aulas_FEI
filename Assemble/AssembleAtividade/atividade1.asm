ORG 0000H

INICIO:
    
    CLR P1.0        
    SETB P1.1       
    SETB P1.2       
    NOP
    NOP
    NOP
    NOP
    NOP

    SETB P1.0       
    CLR P1.1        
    NOP
    NOP

    
    SETB P1.1       
    CLR P1.2        
    NOP   
    NOP
    NOP
    NOP
    NOP

    SJMP INICIO     ; Repete o ciclo continuamente[cite: 2]