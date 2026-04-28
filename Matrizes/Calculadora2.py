matriz1 = [[1,2,3], [4,5,6], [7,8,9]]
matriz2 = [[9,8,7],[6,5,4],[3,2,1]]

matriz_soma = [[0,0,0] for _ in range(3)]
    

def soma_matriz(m1, m2):
    linhas = len(m1[0])
    colunas = len(m2[0])
    matriz_resultado = [[0]* colunas for _ in range(linhas)]

    for i in range(0, linhas):
        print(matriz1[i])
        for j in range(0,colunas):
            matriz_soma[i][j] = matriz1[i][j] + matriz2[i][j]
            print(matriz1[i][j])
    return matriz_resultado


print(matriz_soma)