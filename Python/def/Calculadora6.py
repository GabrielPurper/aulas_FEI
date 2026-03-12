def fatorial(n: int) -> int:
    f = 1 
    for i in range(1, n+1):
        f *= i 
    return f

x = int(input("Digite um número:"))

while x != 0:
    resultado = fatorial(x)
    print(resultado)
    x = int(input("Digite um número:"))

