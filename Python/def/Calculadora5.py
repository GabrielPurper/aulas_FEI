i = 1
divisores = 0

n = int(input("Digite um número:"))

while( i <= n):
    if( n % i == 0):
        divisores = divisores + 1
    i = i + 1
if(divisores == 2):
    print("Primo")
else:
    print("Não é primo")