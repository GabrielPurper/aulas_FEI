def analisar_chuvas(matriz):
    # Variáveis para o desafio (mês mais chuvoso)
    maior_volume = -1
    mes_mais_chuvoso = 0

    # Percorremos a matriz mês a mês
    # enumerate nos ajuda a ter o número do mês (começando em 0)
    for i, semanas in enumerate(matriz):
        # Somamos os valores da lista (as 4 semanas do mês)
        soma_mes = sum(semanas)
        
        # O número do mês real é o índice + 1
        numero_mes = i + 1
        print(f"Total de chuva no mes {numero_mes} eh {soma_mes}mm")

        # Lógica do desafio: verificar se este mês é o maior até agora
        if soma_mes > maior_volume:
            maior_volume = soma_mes
            mes_mais_chuvoso = numero_mes

    print("-" * 30)
    print(f"Desafio: O mês mais chuvoso foi o mês {mes_mais_chuvoso} com {maior_volume}mm.")

# Matriz de entrada conforme a imagem
chuvas = [
    [120, 98, 110, 95],   # Janeiro (Mês 1)
    [80, 75, 90, 100],    # Fevereiro
    [150, 130, 125, 140], # Março
    [95, 100, 85, 90],    # Abril
    [60, 55, 70, 65],     # Maio
    [40, 35, 30, 45],     # Junho
    [25, 20, 18, 22],     # Julho
    [30, 28, 35, 40],     # Agosto
    [75, 80, 78, 82],     # Setembro
    [110, 120, 115, 105], # Outubro
    [140, 135, 150, 145], # Novembro
    [160, 170, 155, 165]  # Dezembro
]

# Chama a função
analisar_chuvas(chuvas)