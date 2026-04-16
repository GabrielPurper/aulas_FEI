l = [("Fulano",75),("João",5.5),("André", 6.5), ("Carlos", 9.5), ("Washington", 8.5)]

def escolha(l: list) -> None:
    numero = int(input("Digite um valor de 0 a 4 para escolher o filme:"))
    if numero == 0:
        print(l[0])
        l = l[0]
    elif numero == 1:
        print(l[1])
        l = l[1]
    elif numero == 2:
        print(l[2])
        l = l[2]
    elif numero == 3:
        print(l[3])
        l = l[3]
    elif numero == 4:
        print(l[4])
        l = l[4]
    else:
        print("Tente Novamente")
    return l 

escolha(l)
