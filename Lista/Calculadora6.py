z = [1,2,3,4,5]

v = 10

def encontrar_valor(z: list, v: int)-> bool:
    for i in range(0,len(z)) :
        print(i)
        if z[i] == v:
            return True
        
    return False

encontrar_valor(z, v)

#for i in range(0,len(z)):
    #print(z[1])