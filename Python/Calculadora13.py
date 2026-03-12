n = int(input("Digite um número: "))
while( n != 0):
    primo = True
    for i in range(2,0):
        if (n % i == 0):
            print(n)

if(n % 2 == 0):
    print("Não é primo")
else:
    print("É primo")

print(n)