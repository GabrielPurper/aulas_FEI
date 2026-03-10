S = 0
iu = 0

for i in range(0,6):
    n1 = int(input("Digite um número:")) # numero que a pessoa digita
    if(n1 > S): # se o que a pessoa digitou for o maior numero 
        S = n1 # S eh o maior numero
        iu = i
    print('N1: ' +str(n1))
print("O número maior é", S)
print("O range para identificar é", iu)
