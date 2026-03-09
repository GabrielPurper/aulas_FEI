senha_correta = 1234  # senha salva

while True:
    senha = int(input("Digite a senha: "))
    
    # verifica se a senha está correta
    if senha == senha_correta:
        print("Acesso permitido")
        break
    else:
        print("Senha incorreta, tente novamente")