import os

def processar_texto(nome_arquivo):
    total_palavras = 0
    palavras_unicas = set()  # Conjunto para não repetir palavras

    if not os.path.exists(nome_arquivo):
        print(f"Erro: O arquivo {nome_arquivo} não foi encontrado.")
        return

    with open(nome_arquivo, "r", encoding="utf-8") as arquivo:
        for linha in arquivo:
            # 1. Coloque a linha em lower case
            linha = linha.lower()

            # 2. Substitua os caracteres de pontuação por uma string vazia
            pontuacoes = [".", ",", "!", "?", ";", ":"]
            for char in pontuacoes:
                linha = linha.replace(char, "")

            # 3. No método split não passe nenhum parâmetro (usa o espaço como padrão)
            palavras_da_linha = linha.split()

            # Contabilizando para o total
            total_palavras += len(palavras_da_linha)

            # Adicionando ao conjunto de palavras únicas
            for p in palavras_da_linha:
                palavras_unicas.add(p)

    # Resultados
    print(f"Total de palavras no documento: {total_palavras}")
    print("-" * 30)
    print(f"Total de palavras únicas: {len(palavras_unicas)}")
    print("\nVetor (Lista) de palavras únicas:")
    print(list(palavras_unicas))

# Execução
processar_texto("loren.txt")