# Pontos na Carteira
media = 4

grave = 5

gravissima = 7


#Preço a se Pagar 

#media = 130,16 

#grave = 195,23

#gravissima = 880,41

print("Bem-vindo ao DETRAN")

velocidade = float(input("Digite a Velocidade Percorrida:"))
via = float(input("Digite a velocidade da via:"))
CNH = int(input("Digite quantos pontos tem na sua Carteira:"))

MD = ((velocidade - via) / via) * 100

#if( velocidade >= via ** 0.2):
    #print("Acima de 20%")
#elif( velocidade >= via ** 0.5):
    #print("Acima de 20 a 50%")
#elif( velocidade > via ** 0.5):
    #print("Acima de 50%")
#else:
    #print("Não está acima de 20%")

if(MD <= via):
    print("Está no limite de velocidade")
else:
    MD = ((velocidade - via) / via) * 100

print("Velocidade acima do limite é de", MD, "%")

if (MD <= 20):
    print("Você vai ser mutado pela muta média!")
    print("Você vai pagar R$130,16")
elif (MD <= 50):
    print("Você vai ser mutado pela muta grave!")
    print("Você vai pagar R$195,23")
else:
    print("Você vai ser mutado pela muta gravissima e vai perder a CNH!")
    print("Você vai pagar R$880,41")

if (CNH >= media + grave + gravissima):
    print("Você perdeu o Direito de Dirigir")
else:
    print("Está tudo bem com a CNH")
