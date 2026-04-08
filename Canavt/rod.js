var canvas = document.getElementById('meucan'); // Peguei o ID do Canvas chamado meuCanvas
// Colocar const = getContext("2d") para idenificar que é em 2d
var ctx = canvas.getContext('2d');

// Quadrado
ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'red';
ctx.moveTo(0,0);
ctx.lineTo(50,0);
ctx.lineTo(50,50);
ctx.lineTo(0,50);
ctx.fill();
ctx.closePath();

// Quadrado
ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'green';
ctx.moveTo(300,300);
ctx.lineTo(250,300);
ctx.lineTo(250,250);
ctx.lineTo(300,250);
ctx.fill();
ctx.closePath();


// Quadrado
ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'yellow';
ctx.moveTo(0,300);
ctx.lineTo(50,300);
ctx.lineTo(50,250);
ctx.lineTo(0,250);
ctx.fill();
ctx.closePath();

// Quadrado
ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'blue';
ctx.moveTo(300,0);
ctx.lineTo(300,50);
ctx.lineTo(250,50);
ctx.lineTo(250,0);
ctx.fill();
ctx.closePath();

//Linha 1 
ctx.beginPath();
ctx.lineWidth = 2;
ctx.strokeStyle = 'blue'
ctx.moveTo(0,300);
ctx.lineTo(300,0);
ctx.stroke();
ctx.closePath();

//Linha 2 

ctx.beginPath();
ctx.lineWidth = 2;
ctx.strokeStyle = 'red'
ctx.moveTo(0,0);
ctx.lineTo(300,300);
ctx.stroke();
ctx.closePath();

//Linha 3 

ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'green'
ctx.strokeStyle = 'green'
ctx.moveTo(0,150);
ctx.lineTo(300,150)
ctx.stroke();
ctx.closePath();


// Circuferência 1

ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'yellow';
ctx.strokeStyle = 'green';
ctx.arc(50,100,20,1*Math.PI,3*Math.PI);
ctx.fill();
ctx.stroke();
ctx.closePath();

// Circuferência 2

ctx.beginPath();
ctx.lineWidth = 2;
ctx.strokeStyle = 'green';
ctx.arc(150,150,30,2*Math.PI,1*Math.PI);
ctx.stroke();
ctx.closePath();

// Circuferência 3 

ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'yellow';
ctx.strokeStyle = 'green';
ctx.arc(250,100,20,1*Math.PI,3*Math.PI);
ctx.fill();
ctx.stroke();
ctx.closePath();

// texto
ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'blue';
ctx.strokeStyle = 'red';
ctx.font = "15px Arial"
ctx.textAlign = "center";
ctx.fillText("Desenvolvimento Web",150,60);
ctx.closePath();