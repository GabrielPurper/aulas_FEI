def calcular_medias(lista_alunos):
    dicionario_medias = {}

    for aluno_tupla in lista_alunos:
        # Extraindo os dados da tupla para variáveis legíveis
        # aluno_tupla[0] é o nome, [1] [2] e [3] são as notas
        nome = aluno_tupla[0]
        n1 = aluno_tupla[1]
        n2 = aluno_tupla[2]
        n3 = aluno_tupla[3]

        # Calculando a média
        media = (n1 + n2 + n3) / 3
        
        # Adicionando ao dicionário (chave: nome, valor: média)
        # Usamos round(media, 2) para arredondar para 2 casas decimais
        dicionario_medias[nome] = round(media, 2)

    return dicionario_medias

# --- FORA DA FUNÇÃO ---

# Exemplo de entrada conforme a imagem
entrada = [
    ('Fulano', 5.4, 6.5, 7.1), 
    ('Ciclano', 9.2, 7.4, 8.1), 
    ('Beltrano', 5, 4.3, 5.6),
    ('Feiano', 9.4, 7.8, 9.7)
]

# Chama a função e guarda o resultado
resultado_final = calcular_medias(entrada)

# Imprime as médias dos alunos percorrendo o dicionário
for aluno, media in resultado_final.items():
    print(f"{aluno}: {media}")