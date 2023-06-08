//Elemento audio
var audio = document.getElementById("audio");
//Elemento boton play
var btnPlay = document.getElementById("play");
// // Obtén el elemento de la barra de progreso y su contenido interno
// var progressBar = document.getElementById('progress-bar');
// var progressBarInner = document.getElementById('progress-bar-inner');
// Obtén los elementos del DOM para la duración y el tiempo actual
var durationElement = document.getElementById('duration');
var currentTimeElement = document.getElementById("current-time");
//Obtener los elementos adelantar y atrasar
var adelantarBtn = document.getElementById("adelantarBtn");
var retrasarBtn = document.getElementById("retrasarBtn");
//Obtener los elementos de velocidad
var velocidadBtn = document.getElementById("velocidadBtn");
//obtener elemento menu
var menuBtn = document.getElementById("menuBtn");
//obtener elemento overlya del menu
var overlay = document.querySelector(".overlay");
var cerrarOverlay = document.getElementById("cerrarOverlay");
//Array con los capitulos
var chapters = [
  {
    title: "Chapter One",
    start: 0,
    img: "./img/ruta.png",
  },
  {
    title: "Chapter Two",
    start: 30,
    img: "./img/gym.png",
  },
  {
    title: "Chapter Three",
    start: 75,
    img: "./img/salud.png",
  },
];


//abrir el overlay
menuBtn.addEventListener("click", () => {
  wavesurfer.pause();
  overlay.style.display = "block";
});

//Cerrar el overlay
cerrarOverlay.addEventListener("click", function () {
  overlay.style.display = "none";
});


//Ondas libreria wavesurfer
var wavesurfer = WaveSurfer.create({
  container: "#waveform",
  waveColor: "#d8d8d8",
  progressColor: "#007b99",
  barWidth: 4,
  barGap: 3,
  height: 50,
  responsive: true,
  hideScrollbar: true,
  barRadius: 4,
  cursorColor: "white",
});

wavesurfer.load(audio);


wavesurfer.on("ready", function () {
  btnPlay.disabled = false;
});

//Realizamos la funcion para reproducir el audio y pausarlo al mismo modo cambiar los iconos
let reproduciendo = false;
btnPlay.addEventListener("click", () => {

    if (reproduciendo) {
      document.getElementById("icons").className = "fa-solid fa-circle-play";
      wavesurfer.pause();
      reproduciendo = false;
      // Pausar el audio si está reproduciendo
    } else {
      document.getElementById("icons").className = "fa-solid fa-circle-pause";
      wavesurfer.play();
      reproduciendo = true;
      // Reproducir el audio si está pausado
    }
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
  let currentSpeed = 1;
  velocidadBtn.addEventListener("click", function () {

    if (currentSpeed === 1) {
      currentSpeed = 1.25;
      document.getElementById("icons2").className = "imgVelocidad15";
    } else if (currentSpeed === 1.25) {
      currentSpeed = 1.5;
      document.getElementById("icons2").className = "imgVelocidad2";
    } else if (currentSpeed === 1.5) {
      currentSpeed = 2;
      document.getElementById("icons2").className = "imgVelocidad";
    } else if (currentSpeed === 2) {
      currentSpeed = 1;
      document.getElementById("icons2").className = "imgVelocidad125";
    }

    wavesurfer.setPlaybackRate(currentSpeed)

  });

  //Devolver y adelantar 10 segundos el audio
  retrasarBtn.addEventListener("click", function () {
    wavesurfer.skipBackward(10);
  });

  adelantarBtn.addEventListener("click", function () {
     wavesurfer.skipForward(30);
  });


  var ul = document.getElementById("listaCapitulos");

  // Iteramos a través de la matriz de nombres
  for (var i = 0; i < chapters.length; i++) {
    var chapter = chapters[i]
    // Creamos un nuevo elemento de lista li y le asignamos el nombre actual
    var li = document.createElement("li");
     li.textContent = formatTime(chapter.start) + " " + chapter.title;
     li.setAttribute("class", "capitulo");
     li.setAttribute("data-start", chapter.start);

    // Agregamos el elemento li a la lista ul
    ul.appendChild(li);
  }

document.querySelectorAll(".capitulo").forEach((li) => {
  li.addEventListener("click", () => {
    const startTime = li.getAttribute("data-start");
    wavesurfer.seekTo(startTime / wavesurfer.getDuration());
    wavesurfer.play();
    overlay.style.display = "none";

    // Obtener el índice del capítulo seleccionado
    const index = Array.from(li.parentNode.children).indexOf(li);

    // Obtener la imagen correspondiente al capítulo
    const selectedImg = chapters[index].img;

    // Cambiar la imagen del div "imagenReproductor"
    document.getElementById("imagenReproductor").innerHTML = `<img src="${selectedImg}" alt="">`;
  });
});

wavesurfer.on("play", function () {
  document.getElementById("icons").className = "fa-solid fa-circle-pause";
  reproduciendo = true;
});

wavesurfer.on("pause", function () {
  document.getElementById("icons").className = "fa-solid fa-circle-play";
  reproduciendo = false;
});
