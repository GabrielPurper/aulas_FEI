z = [1,2,3,4,5]
def inverte_valor(z: list)-> list:
    l = []
    for i in range(len(z)-1,-1,-1):
        l.append(z[i])
    return l

print(inverte_valor(z))