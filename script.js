//Element audio
var audio = document.getElementById("audio");
//Elemento boton play
var btnPlay = document.getElementById("play");
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


var wavesurfer = WaveSurfer.create({
  container: "#waveform",
  waveColor: "#d8d8d8",
  progressColor: "#007b99",
  barWidth: 5,
  height: 50,
  responsive: true,
  hideScrollbar: true,
  barRadius: 4,
  cursorColor: "white",
});

wavesurfer.load(audio);



//Realizamos la funcion para reproducir el audio y pausarlo al mismo modo cambiar los iconos
var reproduciendo = false;
btnPlay.addEventListener("click", () => {

    if (reproduciendo) {
      document.getElementById("icons").className = "fa-solid fa-circle-play";
      wavesurfer.pause();
      // Pausar el audio si está reproduciendo
    } else {
      document.getElementById("icons").className = "fa-solid fa-circle-pause";
      wavesurfer.play();
      // Reproducir el audio si está pausado
    }
    reproduciendo = !reproduciendo;
});



// Obtener el tiempo recorrido y mostrarlo en el elemento HTML
      wavesurfer.on('ready', function() {
        setInterval(function() {
          var currentTime = wavesurfer.getCurrentTime();
          currentTimeElement.innerHTML = formatTime(currentTime);
        }, 1000);
      });

// Función para convertir segundos en minutos y segundos
      function formatTime(time) {
        var minutes = Math.floor(time / 60);
        var seconds = Math.floor(time % 60);
        seconds = (seconds >= 10) ? seconds : '0' + seconds;
        return minutes + ':' + seconds;
      }

// Obtener la duración del audio y mostrarla en la consola
      audio.addEventListener("loadedmetadata", function () {
        // Obtén la duración total del audio en segundos
        var duration = audio.duration;

        // Convierte la duración a un formato legible (por ejemplo, minutos:segundos)
        var durationFormatted = formatTime(duration);

        // Muestra la duración total del audio en el elemento HTML correspondiente
        durationElement.textContent = durationFormatted;
      });

  //Funcion para velocidad del audio
  velocidadBtn.addEventListener("click", function () {
    //la velocida inicial que es 1
    var currentSpeed = wavesurfer.getPlaybackRate();

    if (currentSpeed < 1.25) {
      document.getElementById("icons2").className = "fa-solid fa-house";
       wavesurfer.setPlaybackRate(currentSpeed + 0.25);
    } else if (currentSpeed < 1.5) {
      document.getElementById("icons2").className = "fa-solid fa-phone";
      wavesurfer.setPlaybackRate(currentSpeed + 0.25);
    } else if (currentSpeed < 2) {
      document.getElementById("icons2").className = "fa-solid fa-circle-xmark";
      wavesurfer.setPlaybackRate(currentSpeed + 0.5);
    } else {
      document.getElementById("icons2").className = "fa-solid fa-user";
      wavesurfer.setPlaybackRate(1);
    }

  });

  //Devolver y adelantar 10 segundos el audio
  retrasarBtn.addEventListener("click", function () {
    wavesurfer.skipBackward(10);
  });

  adelantarBtn.addEventListener("click", function () {
     wavesurfer.skipForward(30);
  });
