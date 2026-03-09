print("Ordem Descresente")

P = int(input("Digite um Número inteiro:"))
S = int(input("Digite um outro Número inteiro:"))
T = int(input("Digite um outro Número inteiro:"))

if (T >= S and S >= P):
    print(T, S, P)
elif (T >= P and P >= S):
    print(T, P, S)
elif(S >= T and T >= P):
    print(S, T, P)
elif(S >= P and P >= T):
    print(S, P, T)
elif(P >= S and S >= T):
    print(P, S, T)
else: 
    print(P, T, S)

