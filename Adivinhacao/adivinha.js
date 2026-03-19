var numerosecreto =  Math.floor(Math.random() * 10);

console.log(numerosecreto);

function coleta() { 
    var numero = document.getElementById('text').value;

    if (numero == numerosecreto) { 
        document.getElementById("corpo").style.setProperty("background-color", "green");
    } 
    else { 
        document.getElementById("corpo").style.setProperty("background-color", "red");
    } 
} 

// Tem que colocar o <script src="Nome da pasta.js"> antes ou depois para chamar o javascript