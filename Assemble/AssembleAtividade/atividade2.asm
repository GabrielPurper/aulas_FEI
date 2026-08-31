ORG 0000H

inicio:
    CLR P1.0        
    SETB P1.1      
    SETB P1.2       
    
    SETB P1.4       
    CLR P1.5        

    
    JNB P2.0, B_ativo
    LJMP inicio

B_ativo:
    
    SETB P1.0       
    CLR P1.1        
    NOP
    NOP
    NOP

    
    SETB P1.1       
    CLR P1.2        
    
    SETB P1.5       
    CLR P1.4       
    NOP
    NOP
    NOP
    NOP
    NOP

    LJMP inicio     

END