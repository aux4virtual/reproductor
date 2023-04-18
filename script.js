var btnPlay = document.getElementById("play");
//icono de play y pause
var icon = document.getElementById("icon");
//Element audio
var audio = document.getElementById("audio");
var reproduciendo = false;
// Obtén el elemento de la barra de progreso y su contenido interno
var progressBar = document.getElementById('progress-bar');
var progressBarInner = document.getElementById('progress-bar-inner');
// Obtén los elementos del DOM para la duración y el tiempo actual
var durationElement = document.getElementById('duration');
var currentTimeElement = document.getElementById("current-time");
//Obtener los elementos adelantar y atrasar
var adelantarBtn = document.getElementById("adelantarBtn");
var retrasarBtn = document.getElementById("retrasarBtn");
//Obtener los elementos de velocidad
var velocidadBtn = document.getElementById("velocidadBtn");
var velocidadActual = 1; // Velocidad inicial del audio


btnPlay.addEventListener("click", () => {

    if (reproduciendo) {
      document.getElementById("icons").className = "fa-solid fa-circle-play";
      audio.pause();
      // Pausar el audio si está reproduciendo
    } else {
      document.getElementById("icons").className = "fa-solid fa-circle-pause";
      audio.play();
      // Reproducir el audio si está pausado
    }
    reproduciendo = !reproduciendo;
});



// Función para actualizar la barra de progreso
function updateProgressBar() {
  // Obtén la duración total del audio
  var duration = audio.duration;

  // Obtén la posición actual del audio
  var currentTime = audio.currentTime;

  // Calcula el porcentaje completado de la reproducción del audio
  var progress = (currentTime / duration) * 100;

  // Actualiza el ancho de la barra de progreso
  progressBarInner.style.width = progress + '%';
}

// Función para adelantar o atrasar la reproducción del audio al hacer clic en la barra de progreso
// progressBar.addEventListener('click', function(event) {
//   // Obtén la posición horizontal del clic en la barra de progreso
//   var clickX = event.clientX;

//   // Obtén el ancho total de la barra de progreso
//   var progressBarWidth = progressBar.clientWidth;

//   // Calcula el porcentaje correspondiente a la posición horizontal del clic
//   var progressPercentage = (clickX / progressBarWidth) * 100;

//   // Calcula el tiempo correspondiente al porcentaje de progreso
//   var duration = audio.duration;
//   var seekTime = (progressPercentage / 100) * duration;

//   // Establece el tiempo de reproducción del audio al tiempo calculado
//   audio.currentTime = seekTime;
// });

function updateAudioTimeOnClick(progressBar, audio, event) {
  //Se calcula el ancho de la barra de progreso
  const progressBarWidth = progressBar.offsetWidth;
  const clickXPosition = event.clientX - progressBar.offsetLeft;
  const audioDuration = audio.duration;
  //Nueva posicion del audio
  const newPosition = (clickXPosition / progressBarWidth) * audioDuration;
  //Se actualiza el tiempo actual del audio con la nueva posicion.
  audio.currentTime = newPosition;
}

progressBar.addEventListener("click", (event) => {
  updateAudioTimeOnClick(progressBar, audio, event);
});

// Uso de la función de actualización de la barra de progreso
audio.addEventListener('timeupdate', function() {
  updateProgressBar();
});

//Duracion t tiempo recorrido del audio
// Espera a que los metadatos del audio estén cargados
audio.addEventListener('loadedmetadata', function() {
  // Obtén la duración total del audio en segundos
  var duration = audio.duration;

  // Convierte la duración a un formato legible (por ejemplo, minutos:segundos)
  var durationFormatted = formatTime(duration);

  // Muestra la duración total del audio en el elemento HTML correspondiente
  durationElement.textContent = durationFormatted;
});

// Actualiza el tiempo actual de reproducción del audio en tiempo real
audio.addEventListener('timeupdate', function() {
  // Obtén el tiempo actual de reproducción del audio en segundos
  var currentTime = audio.currentTime;

  // Convierte el tiempo actual a un formato legible (por ejemplo, minutos:segundos)
  var currentTimeFormatted = formatTime(currentTime);

  // Muestra el tiempo actual de reproducción del audio en el elemento HTML correspondiente
  currentTimeElement.textContent = currentTimeFormatted;
});

// Función para formatear el tiempo en minutos:segundos
function formatTime(time) {
  var minutes = Math.floor(time / 60);
  var seconds = Math.floor(time % 60);
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

//Funciones para adelantar y atrasar audio
    adelantarBtn.addEventListener("click", function () {
      audio.currentTime += 10; // Adelanta 10 segundos
    });

    retrasarBtn.addEventListener("click", function () {
      audio.currentTime -= 10; // Retrasa 10 segundos
    });

  //Funcion para velocidad del audio
  velocidadBtn.addEventListener("click", function () {
    velocidadActual += 0.5; // Incrementa la velocidad en 0.5

    if (velocidadActual >= 1.5) {
        document.getElementById("icons2").className = "fa-solid fa-house";
     } if(velocidadActual == 2) {
        document.getElementById("icons2").className = "fa-solid fa-phone";
     }
    // Si la velocidad actual supera 2, se reinicia a 0.5
    else if (velocidadActual > 2) {
      velocidadActual = 1;
      document.getElementById("icons2").className = "fa-solid fa-user";
    }

    audio.playbackRate = velocidadActual; // Cambia la velocidad de reproducción del audio
  });


  