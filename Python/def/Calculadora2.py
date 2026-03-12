# Função
def primo(n):
    i = 1
    divisores = 1 
    while i <= n:
        if ( i % n == 0):
            divisores += 1 # ou divisores = divisores + 1
        i = i + 1
    if divisores == 2:
        return True
    else:
        return False 
    
    
