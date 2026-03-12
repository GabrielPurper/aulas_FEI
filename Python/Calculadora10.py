n = int(input("Digite um número:"))
acumulador = 0
qtd_numeros = 0
while(n !=0):
    acumulador += n
    qtd_numeros += 1
    print(acumulador)
    n = int(input("Digite um número:"))
print(acumulador/qtd_numeros)


#while(True):
#   if(n == 0):
#   break