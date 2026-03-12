def primo(x):
    primo = True
    for i in range(2, n):
        if v % i == 0:
            primo = False
    return primo

n = int(input("Digite um número"))
while(n != 0): 
    v = primo(x)
    primo = True
n = int(input("Digite um número"))

if v:
    return True
else:
    return False

