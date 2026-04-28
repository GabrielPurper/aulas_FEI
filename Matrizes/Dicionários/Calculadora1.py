arquivo = open("Arquivo.csv", "a+")
arquivo_documento = open("Arquivo.csv", "a+")

arquivo = open("Arquivo.csv", "r")

nome_busca = "Ciclano"
senha_busca = 6578


for usuario in arquivo,readlines():
    campos_usuario = usuario.split(",")
    nome_cadastrado = campos_usuario[0]
    senha_cadastrada = campos_usuario[1]
    if nome_busca == nome_cadastrado and senha_busca == senha_cadastrada:
        print("Login bem sucedido")
    

#split()
#trim() tira o espaço
#strip() 

arquivo.close()
arquivo_documento.close()

