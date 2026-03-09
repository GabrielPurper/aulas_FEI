maior = 0

for i in range(0,10):
    numero = int(input("Digite um número: "))
    if(numero > maior):
        maior = numero
print("O maior número é:", maior)