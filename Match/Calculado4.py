Dia = int(input("Digite o Dia que nasceu:"))
Mês = int(input("Digite o Mês que nasceu:"))
Ano = int(input("Digite o Ano que nasceu:"))

Idade = int(input("Digite sua Idade:"))

H = int(input("Digite o Dia de Hoje:"))
M = int(input("Digite o Mês de Hoje:"))
A = int(input("Digite o Ano de Hoje:"))


print("Dia que você nasceu foi:")
print(Dia,"/",Mês,"/",Ano)

print("Hoje é dia:")
print(H,"/",M,"/",A)

if(Idade > 16):
    print("Você pode votar, já tem 16 anos")
elif(Idade < 16):
    print("Você não tem idade para votar")

if(Idade > 18):
    print("Você pode dirigir")
elif(Idade < 18):
    print("Você não pode dirigir")

if(H < Dia and M < Mês and A < Ano):
    print("Você já fez aniversário")
elif()


#if(Dia <= H and Mês <= M and Ano <= A and Idade > 16):
    #print("Você tem idade suficiente para votar")
#elif(Dia <= H and Mês >= M and Ano <= A and Idade < 16):
    #print("Você não tem idade suficiente para votar")
#elif()
   #print("Você ainda não tem a idade para votar")
#elif()
