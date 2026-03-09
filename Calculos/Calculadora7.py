# [] representa uma sequência e coloca os números dentro da sequência 
numeros = []

for i in range(5):
    n = int(input("Digite um número: "))
    # O append(n) vai colocar em ordem crescente os números repetidos
    numeros.append(n)

print(numeros)