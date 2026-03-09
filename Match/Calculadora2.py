Sul = 1
Norte = 2
Leste = 3
Oeste = 4
Nordeste = 5, 6 
Sudeste = 7, 8, 9


print("TODOS OS PRODUTOS SÃO RELACIONADOS COM SUA LOCALIDADE POR FAVOR SELECIONAR DE ACORDO COM SUA LOALIDADE ADEQUADA")

Produto = int(input("Digite de 1 a 30 o seu produto:"))

#10 and 20 
#20 até 30


match Produto:
    case 1:
        print("Seu produto é Sul")
        print("Seu preço é 20 reais")
    case 2:
        print("Seu produto é Norte")
        print("Seu preço é 30 reais")
    case 3:
        print("Seu produto é Leste")
        print("Seu preço é 40 reais")
    case 4:
        print("Seu produto é Oeste")
        print("Seu preço é 70 reais")
    case 5 | 6:
        print("Seu produto é Nordeste")
        print("Seu preço é 50 reais")
    case 7 | 8 | 9:
        print("Seu produto é Sudeste")
        print("Seu preço é 20 reais")
    case 10 | 20:
        print("Seu produto é Centro-Oeste")
    case 25 | 35:
        print("Seu produto é Nordeste")
        print("Seu produto é 30 reais")
    case _:
        print("Produto Importado")

