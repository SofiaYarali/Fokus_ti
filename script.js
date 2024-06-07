const html = document.querySelector('html');
const botonCorto = document.querySelector('.app__card-button--corto');
//crear variable para hacer el cambio de enfoque a corto o sea botón verde . para seleccionar clase
const botonEnfoque = document.querySelector('.app__card-button--enfoque');
const botonLargo = document.querySelector('.app__card-button--largo')
//para las imágenes que se cambien
const banner = document.querySelector('.app__image');
//para manipular el texto
const titulo = document.querySelector('.app__title');
const botones = document.querySelectorAll('.app__card-button');
const inputEnfoqueMusica = document.querySelector('#alternar-musica'); //# porque es por Id
const botonIniciarPausar = document.querySelector('#start-pause');
const textoIniciarPausar = document.querySelector('#start-pause span');
const iconoIniciarPausar = document.querySelector(".app__card-primary-butto-icon");
//música
const musica = new Audio('./sonidos/luna-rise-part-one.mp3');
const audioPlay = new Audio('./sonidos/play.wav');
const audioPausa = new Audio('./sonidos/pause.mp3');
const audioTiempoFinalizado = new Audio('./sonidos/beep.mp3');
const tiempoEnPantalla = document.querySelector('#timer');

//pendiente de poner las imagenes de pal y y pause en botón de comenzar
//const botonPause = document.querySelector('./imagenes/play_arrow.png');
//const botonPlay = document.querySelector('./imagenes/pause.png');

let tiempoTranscurridoEnSegundos = 1500; //5seg
let idIntervalo = null;

musica.loop = true; //para que escuche la música por el tiempo que quiera

inputEnfoqueMusica.addEventListener('change', ()=>{
    if(musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})

botonCorto.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 300;
    cambiarContexto('descanso-corto');
    // html.setAttribute('data-contexto', 'descanso-corto');
    // banner.setAttribute('src', 'imagenes/descanso-corto.png'); 
    //para que los botones se pongan focus al seleccionar
    botonCorto.classList.add('active');
});

botonEnfoque.addEventListener('click', () =>{
    tiempoTranscurridoEnSegundos = 1500;
    cambiarContexto('enfoque');
    // html.setAttribute('data-contexto', ('enfoque'));
    // banner.setAttribute('src', './imagenes/enfoque.png');
    botonEnfoque.classList.add('active');
} );

botonLargo.addEventListener('click', () =>{
    tiempoTranscurridoEnSegundos = 900;
    cambiarContexto('descanso-largo');
    // html.setAttribute('data-contexto', 'descanso-largo');
    // banner.setAttribute('src', './imagenes/descanso-largo.png');
    botonLargo.classList.add('active');
});


function cambiarContexto(contexto){
    mostrarTiempo();

//para los enfoques
    botones.forEach(function(contexto) {
        contexto.classList.remove('active');
    });

    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagenes/${contexto}.png`); //templeates string

    //para el texto
    switch (contexto) {
        case "enfoque":
            titulo.innerHTML = `Optimiza tu productividad,<br>
            <strong class="app__title-strong">sumérgete en lo que importa.</strong>`;
            break;
        
        case "descanso-corto": 
        titulo.innerHTML = `¿Qué tal tomar un respiro?
            <strong class="app__title-strong">¡Haz una pausa corta!</strong>`;
            break;
        
        case "descanso-largo":
            titulo.innerHTML = ` Hora de volver a superficie
            <strong class="app__title-strong">Haz una pausa larga.</strong>`;
            
        default:
            break;
    }
}

const cuentaRegresiva = ()=>{
    if(tiempoTranscurridoEnSegundos <= 0){
        audioTiempoFinalizado.play();
        alert('Tiempo finalizado');
        reiniciar();
        return;
    }
    textoIniciarPausar.textContent = 'Pausar'; //cuando queremos agregar texto al html 
    tiempoTranscurridoEnSegundos -= 1;//sustraer un seg de esta variable(5)
    //console.log("temporizador: ", +tiempoTranscurridoEnSegundos);
    mostrarTiempo();
}

botonIniciarPausar.addEventListener('click', iniciarPausar);

function iniciarPausar(){
    if(idIntervalo){
        audioPausa.play();
        reiniciar();
        return;
    }
    audioPlay.play();
    idIntervalo = setInterval(cuentaRegresiva,1000);//para hacer lo que deseamos  1000 seg 1
    //para el botón de pausar la imagen
    textoIniciarPausar.textContent = "Pausar";
    iconoIniciarPausar.setAttribute('src', `/imagenes/pause.png`);
}

function reiniciar(){
    clearInterval (idIntervalo); //interrumple el flujo de
    textoIniciarPausar.textContent = "Comenzar";
    iconoIniciarPausar.setAttribute('src', `/imagenes/play_arrow.png`);
    idIntervalo = null;
}

function mostrarTiempo(){
    const tiempo = new Date (tiempoTranscurridoEnSegundos *1000);
    const tiempoFormateado = tiempo.toLocaleTimeString('es-Mx', {minute: '2-digit', second: '2-digit'});
    tiempoEnPantalla.innerHTML = `${tiempoFormateado}`;
}

mostrarTiempo();

//quedó pendiente de poner los 3 sonidos, sí puedes...