# Importamos a biblioteca 'os' para lidar com arquivos (verificar se existem no Windows)
import os

# --- 1. BANCO DE DADOS (Dicionários Aninhados) ---

# Estrutura: Chave (Nome) -> Valor (Dicionário com detalhes)

# Dicionário específico para Séries

Series_FEItv = { 
    # Coloquei o valor como nome para ser mais fácil de identificar o nome do que um código
    "Naruto": {"genero": "Anime", "ano": 2002, "duracao": "220 eps", "criador": "Masashi Kishimoto"},
    "Breaking Bad": {"genero": "Drama", "ano": 2008, "duracao": "5 temp", "criador": "Vince Gilligan"},
    "One Piece": {"genero": "Anime", "ano": 1999, "duracao": "1000+ eps", "criador": "Eiichiro Oda"},
    "The Last of Us": {"genero": "Ficção/Ação", "ano": 2023, "duracao": "1 temp", "criador": "Craig Mazin"},
    "Arcane": {"genero": "Animação/Gamer", "ano": 2021, "duracao": "1 temp", "criador": "Christian Linke"},
    "The Office": {"genero": "Comédia", "ano": 2005, "duracao": "9 temp", "criador": "Greg Daniels"},
    "Stranger Things": {"genero": "Ficção/Suspense", "ano": 2016, "duracao": "4 temp", "criador": "Duffer Brothers"},
    "The Mandalorian": {"genero": "Ficção", "ano": 2019, "duracao": "3 temp", "criador": "Jon Favreau"},
    "Cyberpunk Edgerunners": {"genero": "Anime/Gamer", "ano": 2022, "duracao": "10 eps", "criador": "Rafal Jaki"},
    "Attack on Titan": {"genero": "Anime", "ano": 2013, "duracao": "4 temp", "criador": "Hajime Isayama"},
    "The Boys": {"genero": "Ação/Heróis", "ano": 2019, "duracao": "3 temp", "criador": "Eric Kripke"},
    "Round 6": {"genero": "Drama/Suspense", "ano": 2021, "duracao": "1 temp", "criador": "Hwang Dong-hyuk"},
    "Vikings": {"genero": "Histórico/Ação", "ano": 2013, "duracao": "6 temp", "criador": "Michael Hirst"},
    "Cobra Kai": {"genero": "Ação/Comédia", "ano": 2018, "duracao": "5 temp", "criador": "Josh Heald"},
    "Peaky Blinders": {"genero": "Drama/Crime", "ano": 2013, "duracao": "6 temp", "criador": "Steven Knight"},
    "The Witcher": {"genero": "Fantasia", "ano": 2019, "duracao": "3 temp", "criador": "Lauren Schmidt"},
    "Better Call Saul": {"genero": "Drama", "ano": 2015, "duracao": "6 temp", "criador": "Peter Gould"}
}

# Dicionário específico para Videos da FEI

Videos_FEItv = { 
    "Python para Iniciantes": {"genero": "Educação", "ano": 2024, "duracao": "45 min", "criador": "FEI Edu"},
    "Lógica de Programação": {"genero": "Educação", "ano": 2023, "duracao": "60 min", "criador": "Curso Programação"},
    "Como otimizar seu Windows": {"genero": "Tech", "ano": 2024, "duracao": "15 min", "criador": "Hardware Master"},
    "Hardware: Como montar um PC": {"genero": "Tech", "ano": 2022, "duracao": "30 min", "criador": "Tech Lab"},
    "Inteligência Artificial: O Futuro": {"genero": "Tech", "ano": 2024, "duracao": "20 min", "criador": "AI News"},
    "Melhores Gols do Cristiano Ronaldo": {"genero": "Esporte", "ano": 2023, "duracao": "10 min", "criador": "FIFA Canal"},
    "Resumo da Rodada: São Paulo FC": {"genero": "Esporte", "ano": 2024, "duracao": "12 min", "criador": "SPFC TV"},
    "Dicas de Minecraft: Redstone": {"genero": "Gamer", "ano": 2023, "duracao": "25 min", "criador": "Gamer Pro"},
    "Review: Lenovo Yoga Slim 7": {"genero": "Tech", "ano": 2023, "duracao": "18 min", "criador": "Review Tech"},
    "Formula 1: Melhores Momentos": {"genero": "Esporte", "ano": 2024, "duracao": "15 min", "criador": "F1 Oficial"},
    "Javascript em 10 minutos": {"genero": "Educação", "ano": 2023, "duracao": "10 min", "criador": "Dev Quick"},
    "C++ para Jogos": {"genero": "Educação", "ano": 2022, "duracao": "55 min", "criador": "Game Dev School"},
    "Como reduzir o uso de RAM": {"genero": "Tech", "ano": 2024, "duracao": "12 min", "criador": "Optimization Lab"},
    "História do Desenvolvimento de Jogos": {"genero": "Documentário", "ano": 2021, "duracao": "120 min", "criador": "Discovery Tech"},
    "Setup Gamer Minimalista": {"genero": "Tech", "ano": 2024, "duracao": "8 min", "criador": "Setup Tours"},
    "Aulas de Japonês: Básico": {"genero": "Educação", "ano": 2024, "duracao": "20 min", "criador": "Language Lab"},
    "Artigo Purper":{"genero": "Documentário", "ano":2026, "duracao": "20 min", "criador": "Language Lab"}
}

# Dicionário específico para Filmes 

Filmes_FEItv = { 
    "Interestelar": {"genero": "Ficção Científica", "ano": 2014, "duracao": "169 min", "diretor": "Christopher Nolan"},
    "Your Name": {"genero": "Anime", "ano": 2016, "duracao": "107 min", "diretor": "Makoto Shinkai"},
    "Orgulho e Preconceito": {"genero": "Romance", "ano": 2005, "duracao": "127 min", "diretor": "Joe Wright"},
    "Oppenheimer": {"genero": "Drama/História", "ano": 2023, "duracao": "180 min", "diretor": "Christopher Nolan"},
    "Batman: O Cavaleiro das Trevas": {"genero": "Ação", "ano": 2008, "duracao": "152 min", "diretor": "Christopher Nolan"},
    "Homem-Aranha: Através do Aranhaverso": {"genero": "Animação", "ano": 2023, "duracao": "140 min", "diretor": "Joaquim Dos Santos"},
    "Matrix": {"genero": "Ficção Científica", "ano": 1999, "duracao": "136 min", "diretor": "Lana Wachowski"},
    "O Senhor dos Anéis": {"genero": "Fantasia", "ano": 2001, "duracao": "178 min", "diretor": "Peter Jackson"},
    "Clube da Luta": {"genero": "Drama/Suspense", "ano": 1999, "duracao": "139 min", "diretor": "David Fincher"},
    "A Rede Social": {"genero": "Drama/Tech", "ano": 2010, "duracao": "120 min", "diretor": "David Fincher"},
    "O Lobo de Wall Street": {"genero": "Comédia/Crime", "ano": 2013, "duracao": "180 min", "diretor": "Martin Scorsese"},
    "Vingadores: Ultimato": {"genero": "Ação", "ano": 2019, "duracao": "181 min", "diretor": "Anthony Russo"},
    "Blade Runner 2049": {"genero": "Ficção Científica", "ano": 2017, "duracao": "164 min", "diretor": "Denis Villeneuve"},
    "Super Mario Bros: O Filme": {"genero": "Animação/Gamer", "ano": 2023, "duracao": "92 min", "diretor": "Aaron Horvath"},
    "Gran Turismo": {"genero": "Ação/Gamer", "ano": 2023, "duracao": "134 min", "diretor": "Neill Blomkamp"},
    "Jogador Número 1": {"genero": "Ficção/Gamer", "ano": 2018, "duracao": "140 min", "diretor": "Steven Spielberg"},
    "Inception (A Origem)": {"genero": "Ficção Científica", "ano": 2010, "duracao": "148 min", "diretor": "Christopher Nolan"}
}

# Dicionário Global (Catálogo) que agrupa os outros três dicionários

catalogo_FEItv = {
    "Filmes": Filmes_FEItv,
    "Séries": Series_FEItv,
    "Vídeos": Videos_FEItv
}
 
 #Função de cadastro

def faz_cadastro():

    """ Função que pede dados e grava no arquivo txt """
    print("\n" + "-"*30)
    print("\n--- Cadastro do FEItv ---\n")
    # Recebe o que o usuário digita no teclado
    usuario_input = input("Digite seu nome de usuário: ")
    senha_input = input("Digite sua senha: ")
    print("\n" + "-"*30)

    # Abre (ou cria) o arquivo 'usuarios.txt' em modo 'a' (append/anexar)

    with open("usuarios.txt", "a") as arquivo_historico:

        # Escreve o usuário e senha separados por ponto e vírgula e pula linha (\n)

        arquivo_historico.write(f"{usuario_input};{senha_input}\n")
    
    # Mensagens de confirmação para o usuário se o login foi um sucesso

    print(f"Usuário {usuario_input} cadastrado com sucesso!")
    print(f"Sua Senha é {senha_input}")

# Função de Login 

def faz_login():

    """ Função que lê o arquivo e valida se o usuário pode entrar """

    print("\n" + "="*30)

    print("\n--- LOGIN ---\n")

    # Pede as credenciais para comparação
    user_input = input("Digite seu usuário: ")
    senha_input = input("Digite sua senha: ")

    print("\n" + "="*30)

    # Verifica se o arquivo existe usando a biblioteca os
    # Se a pasta NÂO existir, ele vai indicar erro e returnar FALSE  
    # Para o menu saber que o login falhou

    if not os.path.exists("usuarios.txt"):
        print("Erro: Nenhum usuário cadastrado no sistema ainda.")

        return False 

    # Abre o arquivo em modo 'r' (read/leitura)
    with open("usuarios.txt", "r") as arquivo_usuario:

        # Percorre o arquivo linha por linha
        for linhas in arquivo_usuario:

            # .strip() remove espaços vazios e .split(';') separa os dados em uma lista
            l = linhas.strip().split(";")
            
            # Se a linha tiver 2 itens (user e senha), faz a conferência
            if len(l) == 2:

                # Compara o que foi digitado com o que está salvo no arquivo
                if l[0] == user_input and l[1] == senha_input:
                    print(f"\n Login Bem Sucedido Bem-Vindo, {user_input}!")
                    return True # Retorna Verdadeiro para liberar o acesso
    
    # Se terminar o loop e não encontrar nada, avisa o erro
    print("Usuário ou senha estão incorretos.\n")
    return False

# Funções de Busca 

def carregar_dados(nome_arquivo):

    """ Função genérica para carregar qualquer arquivo.txt em uma lista """

    # Guardar o nome dos resultados
    lista_dados = []

    # Se o arquivo existe no PC (os.path.exists)
    if os.path.exists(nome_arquivo):
        # Abre para leitura
        with open(nome_arquivo, "r") as arquivo:

            for linha in arquivo:
                # Adiciona cada linha na lista removendo a quebra de linha
                lista_dados.append(linha.strip())

    # Retorna a lista pronta (ou vazia se o arquivo não existir)
    return lista_dados

import random # Precisamos dessa biblioteca para pegar itens aleatórios

def buscar_catalogo():

    print("\n" + "="*30)
    print("\nBUSCA DO FEItv\n")
    print("="*30)

    # --- BLOCO DE SUGESTÕES ---
    print("\n NÃO SABE O QUE ASSISTIR? CONFIRA NOSSAS SUGESTÕES NO FEItv:")
    
    sugestao_filme = random.choice(list(Filmes_FEItv.keys()))
    sugestao_serie = random.choice(list(Series_FEItv.keys()))
    sugestao_video = random.choice(list(Videos_FEItv.keys()))

    print("=" * 30)
    print(f"Assista filmes como: {sugestao_filme}")
    print(f"Maratone a série:    {sugestao_serie}")
    print(f"Pesquise por:        {sugestao_video}")
    print("=" * 30)

    busca = input("\n O que você quer assistir hoje? ").lower()
    
    encontrado = False
    resultados = [] # Lista para armazenar o que for encontrado

    # CAIXA 1: categoria
    for categoria, conteudo in catalogo_FEItv.items():
        # CAIXA 2: titulo e info
        for titulo, info in conteudo.items():

            genero = info['genero'].lower()
            ano = str(info['ano']) 
            duracao = info['duracao'].lower()
            
            autor = ""
            if 'diretor' in info:
                autor = info['diretor'].lower()
            elif 'criador' in info:
                autor = info['criador'].lower()

            if (busca in titulo.lower() or 
                busca in genero or 
                busca in ano or 
                busca in duracao or 
                busca in autor):

                # Mantive seu formato de print exatamente igual
                print(f"\n")
                print("="*30)
                print(f" > Categoria: {categoria}")
                print(f" > Título:  {titulo.upper()}")
                print(f" > Gênero:  {info['genero']}")
                print(f" > Ano:      {info['ano']}")
                print(f" > Duração: {info['duracao']}")

                autor_display = info.get('diretor') or info.get('criador') or "Não informado"
                print(f" > AUTOR:     {autor_display}")
                print("="*30)
                print(f"\n")

                # Apenas guarda o título e marca como encontrado
                resultados.append(titulo)
                encontrado = True

    # --- AJUSTE AQUI: A pergunta agora fica FORA dos loops for ---
    if encontrado:
        print(f"Foram encontrados {len(resultados)} itens.")
        
        # Pergunta qual o usuário quer favoritar entre os que apareceram
        quer_salvar = input("Digite o nome do filme/série/video que deseja favoritar ou 'N' para ignorar: ")
        
        if quer_salvar.lower() != 'n':
            # Verifica se o que ele digitou está na lista de resultados da busca
            sucesso = False
            for item in resultados:
                if quer_salvar.lower() == item.lower():
                    adicionar_favorito_menu(item)
                    sucesso = True
                    break
            
            if not sucesso:
                print("Esse título não apareceu na busca ou foi digitado incorretamente.")
    else:
        print("\nDesculpe, esse vídeo não está na nossa estante.\n")

"""print("\n" + "="*30)
    print("\nBUSCA DO FEItv\n")
    print("="*30)

    # --- BLOCO DE SUGESTÕES ---
    print("\n NÃO SABE O QUE ASSISTIR? CONFIRA NOSSAS SUGESTÕES NO FEItv:")
    
    # Sorteio aleatório das chaves dos dicionários
    sugestao_filme = random.choice(list(Filmes_FEItv.keys()))
    sugestao_serie = random.choice(list(Series_FEItv.keys()))
    sugestao_video = random.choice(list(Videos_FEItv.keys()))

    print("=" * 30)
    print(f"Assista filmes como: {sugestao_filme}")
    print(f"Maratone a série:    {sugestao_serie}")
    print(f"Pesquise por:        {sugestao_video}")
    print("=" * 30)

    # Entrada do usuário tratada com .lower() para evitar erro de maiúsculas
    busca = input("\n O que você quer assistir hoje? ").lower()
   
    # Bandeira de controle: começa como False (ainda não achamos nada)
    encontrado = False

    resultados = []

    # CAIXA 1: categoria (Filmes, Séries, Vídeos)
    for categoria, conteudo in catalogo_FEItv.items():

        # CAIXA 2: titulo (Nome) e info (Dados técnicos)
        for titulo, info in conteudo.items():

            # --- PREPARAÇÃO DOS DADOS PARA BUSCA ---
            # Transformamos tudo em minúsculo e o ano em texto para a comparação funcionar
            genero = info['genero'].lower()
            ano = str(info['ano']) 
            duracao = info['duracao'].lower()
            
            # Verificamos se é Diretor (filmes) ou Criador (séries/vídeos)
            autor = ""
            if 'diretor' in info:
                autor = info['diretor'].lower()
            elif 'criador' in info:
                autor = info['criador'].lower()

            # --- A BUSCA ÚNICA E INTELIGENTE ---
            # Aqui verificamos se o que foi digitado está em QUALQUER um dos campos
            if (busca in titulo.lower() or 
                busca in genero or 
                busca in ano or 
                busca in duracao or 
                busca in autor):

                # Se achou, mostramos os detalhes formatados
                print(f"\n")
                print("="*30)
                print(f" > Categoria: {categoria}")
                print(f" > Título:  {titulo.upper()}")
                print(f" > Gênero:  {info['genero']}")
                print(f" > Ano:     {info['ano']}")
                print(f" > Duração: {info['duracao']}")

                # Tentamos pegar o Diretor. Se não existir, tentamos o Criador.
                # Se nenhum existir, ele escreve "Não informado"
                # get() é uma ferramenta de busca "educada" para dicionários
                autor = info.get('diretor') or info.get('criador') or "Não informado"
                print(f" > AUTOR:     {autor}")
                print("="*30)
                
                print(f"\n")

                resultados.append(titulo)

                if encontrado:
                    print(f"\nForam encontrados {len(resultados)} itens.")
        
                
                # Essa função vai perguntar (S/N) logo após mostrar o filme
                adicionar_favorito_menu(titulo)
                
                # Levantamos a bandeira: encontramos um resultado!
                encontrado = True

    
    # Verificação final: se percorreu tudo e a bandeira continuou False
    if not encontrado:
        print("\nDesculpe, esse vídeo não está na nossa estante.\n")"""

def adicionar_favorito_menu(titulo):
    # O .upper() garante que 's' ou 'S' funcionem igual
    opcao = input(f"\nDeseja favoritar '{titulo}'? (S/N): ").upper()

    if opcao == "S":
        # Chama a função que realmente escreve no arquivo .txt
        favoritos(titulo)

    elif opcao == "N":
        print(f"Você escolheu não adicionar '{titulo}' aos favoritos.")
    else: 
        print(f"Opção '{opcao}' é inválida! Use apenas S ou N.")

def favoritos(titulo_salvar):
    """ Esta função cria o arquivo favoritos.txt e anexa o nome do filme """
    # 'a' (append) adiciona ao final sem apagar o que já existe
    # encoding='utf-8' garante que acentos como 'ó' saiam certos no Windows
    with open("favoritos.txt", "a") as arquivo:
        arquivo.write(f"{titulo_salvar}\n")
    print(f"O Sistema: '{titulo_salvar}' foi guardado no HD com sucesso!")

def ver_favoritos():

    """ Lê o arquivo e exibe a lista de favoritos do usuário """
    print("\n" + "="*30)
    print("\n Menu de Favoritos\n")
    print("\n" + "="*30)
    
    if os.path.exists("favoritos.txt"):
        with open("favoritos.txt", "r") as arquivo:
            linhas = arquivo.readlines()
            
            if not linhas:
                print("Sua lista de favoritos está vazia!")
            else:
                # O enumerate coloca um número (1, 2, 3...) do lado do nome
                for i, linha in enumerate(linhas, 1):
                    print(f"{i}. {linha.strip()}")
    else:
        print("Você ainda não tem favoritos salvos.")
    print("="*30)

def resetar_favoritos():
    # Abrir com 'w' (write) limpa o arquivo completamente
    with open("favoritos.txt", "w", encoding='utf-8') as arquivo:
        arquivo.write("") 
    print("Sua lista de favoritos foi resetada com sucesso!")


# --- 4. MENUS DE NAVEGAÇÃO ---

def menu_principal():
    """ Menu inicial antes do login """
    # Loop infinito para o programa não fechar sozinho

    while True:

        print("\n" + "="*30)

        print("\nBEM-VINDO À FEItv")

        print("\n" + "="*30)

        print("\n" + "-"*30 + "\n")

        print("1. Criar Conta : (Cadastro)")
        print("2. Entrar : (Login)")
        print("3. Sair")

        print("\n" + "-"*30 + "\n")
        
        print("="*30)

        opcao = input("\nEscolha uma opção: ")

        # Lógica de escolha
        if opcao == "1":
            faz_cadastro() # Chama a função de gravar no txt
        elif opcao == "2":
            # Se a função retornar True, abre o segundo menu
            if faz_login():
                menu_logado() 
            else:
                print("Tente novamente.")
        elif opcao == "3":
            print("Encerrando FEItv...")
            print("Até logo!")
            break # Quebra o loop 'while' e finaliza o programa
        else:
            print("Opção inválida!")

def menu_logado():

    """ Menu interno que o usuário vê após logar """
    
    while True:
        print("\n" + "="*30)
        print("\n--- FEItv ---")
        print("1. Buscar Vídeos no Catálogo")
        print("2. Ver Meus Favoritos")
        print("3. Resetar Favoritos")
        print("4. Sair: (Logout)")
        print("\n" + "="*30)
        
        escolha = input("Opção: ")
        
        if escolha == "1":
            # Chama a função que faz a busca nos dicionários
            buscar_catalogo() 

        elif escolha == "2":
            # Placeholder (espaço reservado) para futura implementação
            print("Carregando seus favoritos...")
            ver_favoritos()

        elif escolha == "3":
            # Vai resetar tudo salvo
            print("Carregando o reset...")
            resetar_favoritos()


        elif escolha == "4":
            break # Sai do menu logado e volta para o menu principal

# --- 5. INÍCIO DO PROGRAMA ---

# Verifica se o script está sendo executado diretamente pelo Python e não fora 
# Inicia a primeira função do sistema
if __name__ == "__main__":
    menu_principal()