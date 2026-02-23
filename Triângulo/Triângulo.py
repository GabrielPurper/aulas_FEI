A = int(input("Digite o A:"))
B = int(input("Digite o B:"))
C = int(input("Digite o C:"))

#se é triangulo 
    #se é equilátero
    #senão se é isoceles
    #senão se é escaleno
#senão não é triangulo

Triangulo = A ** 2 + B ** 2 + C ** 2

if( A + B > C and B + C > A and A + C > B ): 
    print("Triangulo")
if(A == B and A == C and B == C ):  
    print("Equilátero")
elif (A == B and A!= B and B!= C) or (A == C and A!=B and C!= B) or (B== C and B!=A and C!=A):
        print("Isóceles")
elif (A!= B and B!= C and A!= C):
        print("Escaleno")
else:
        print("Não é triangulo")


#if( A + B > C and B + C > A and A + C > B ) and (A == B and A == C and B == C ):
   # print("Equilatero")
#if( A + B > C and B + C > A and A + C > B ) and 