notas = [6.5,3.2,7.5,8.3,5.4]

def valor(notas:list)-> float:
    menor_nota = notas[0]
    for i in range(0,len(notas)):
        if notas[i] < menor_nota:
            menor_nota = notas[i]
        
    return menor_nota

valor(notas)

print(valor(notas))
