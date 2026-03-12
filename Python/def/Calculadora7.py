def area(base, altura):
    x = (base * altura / 2 )
    return x 

b = int(input("Digite a base do triangulo:"))
a = int(input("Digite a altura do triangulo:"))

while (b > 0 and a > 0):
    triangulo = area(b , a)
    b = int(input("Digite a base do triangulo:"))
    a = int(input("Digite a altura do triangulo:"))
triangulo = area(b, a)
print(triangulo)