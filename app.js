//Inicializando variables
let tarjetasDestapadas = 0;
let aciertos = 0;
let primerResultado = null;
let segundoResultado = null;
let tarjeta1 = null;
let tarjeta2 = null;
let movimientos = 0;
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
const card = document.querySelectorAll('.card');
const start = document.querySelector('.start');
numeros = numeros.sort(() => {return Math.random()-0.5});
console.log(numeros);

//Eventos

document.addEventListener('DOMContentLoaded', () =>{
  iniciarApp();
})
start.addEventListener('click', () => {
  cronometro();
})

//Funciones

function desbloquearCards() {
  for (let i = 0; i < card.length; i++) {
    card[i].disabled = false;
  }
}

function iniciarApp() {
  for (let i = 0; i < card.length; i++) {
    card[i].disabled = true;
  }
}

function destapar(id) {
  tarjetasDestapadas++;
  if (tarjetasDestapadas == 1) {
    //Mostrar El primer numero
    tarjeta1 = document.getElementById(id);
    primerResultado = numeros[id];
    tarjeta1.innerHTML= primerResultado;

    //Deshabilitar el primer boton
    tarjeta1.disabled = true;
  }else if (tarjetasDestapadas == 2) {
    //Mostrar Segundo numero

    tarjeta2 = document.getElementById(id);
    segundoResultado = numeros[id];
    tarjeta2.innerHTML=segundoResultado;

    //Deshabilitar el segundo boton
    tarjeta2.disabled = true;
    movimientos++;
    contador_estadisticas.innerHTML= movimientos;

    if (primerResultado == segundoResultado) {
      tarjetasDestapadas = 0;

      //Incrementar aciertos
      aciertos++;
      contador_aciertos.innerHTML = aciertos;
      finDelJuego();
    }
    else{
      setTimeout(() => {
        tarjeta1.innerHTML='';
        tarjeta1.disabled = false;
        tarjeta2.innerHTML='';
        tarjeta2.disabled = false;
        tarjetasDestapadas = 0;
      }, 300);
    }
  }
}

function cronometro() {
  desbloquearCards();
  let time = 60;
  start.disabled = true;
  start.classList.add('disabled');
  const Contador = setInterval(() => {
    time--;
    contador_cronometro.innerHTML= time;
    if (time == 0) {
      clearInterval(Contador);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Oops...',
        text: 'Se te ha acabado el tiempo!',
        showConfirmButton: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
            location.reload();
        }
      })
      
    }
  }, 1000);
}

function finDelJuego() {
  setTimeout(() => {
    if (aciertos == 8) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '¡Felicidades, Has acabado el juego!',
        showConfirmButton: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
            location.reload();
        }
      })
    }
  }, 500);
  
}