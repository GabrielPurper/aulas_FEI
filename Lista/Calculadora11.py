t = [11,7,2,4]

def valor(t:list)-> int:
    valor = t[0]

    for i in range(0,len(t)):
        if t[i] < valor:
            valor = t[i]
        
    return valor

valor(t)

print(t)
print(valor(t))

