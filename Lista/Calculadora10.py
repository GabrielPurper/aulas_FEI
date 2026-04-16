notas = [6.5,3.2,7.5,8.3,5.4]


def valor(notas:list)-> float:
    menor_nota = notas[0]
    for i in range(0,len(notas)):
        if notas[i] < menor_nota:
            menor_nota = notas[i]
        if nota_tupla > maior_nota
        maior_nota = nova_tupla
        
    return menor_nota


def Troca(notas:list, i:int, j:int)-> None:
    notas = [6.5,3.2,7.5,8.3,5.4]
    # Jeito avançado
    aux = notas[i]
    notas[i] = notas[j]
    notas[j] = aux # Menor Indice 
    return aux

Troca(1, 0 ,2)

print(Troca(notas, i ,j))


def ordenar(notas:list) -> None:
    i = 0
    while i < len(notas):
        j = aux(notas[i:])
        ordenar(notas, j, i)

        i = i + 1
    return notas

valor(notas)

print(valor(notas))
print(ordenar(notas))