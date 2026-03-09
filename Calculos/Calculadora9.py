#def é uma função e criamos um parâmetro

def text():
    print("Olá tudo bem ?")
text()

# o parâmetro é o nome como text que está dentro da função texto 

def text(nome):
    print("Olá", nome)
text("Gabriel")

# Definimos o return para o calculo para terminar e enviar o resultado de volta

print("Sua nota foi:")

def calculo(a, b):
    calculo = a + b 
    # Retorna o valor ou seja aqui termina a função
    return calculo

resultado = calculo(3, 7)
print(resultado)

def dobro(n):
    return n * 2

total = dobro(5)

print(total)

def numeros():
    return [1, 2, 3, 4]

lista = numeros()

print(lista)