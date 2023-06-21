const url = "http://localhost:3000/datos";
document.addEventListener("DOMContentLoaded", llamarAPI);

function llamarAPI() {
  fetch(url).then((resp) => resp.json()).then(data => {
      data.forEach(items => {
        const title = items.title;
        const subtitle = items.subtitle;
        const audio_path = items.audio_path;
        const cover_path = items.cover_path;
        const chapters = items.chapters;
        const credits = items.credits;

        document.getElementById("cover_path").src = `${cover_path}`;
        wavesurfer.load(audio_path);

        //recorremos todos los elementos del HTML y colocamos el titulo a los elementos que tienen la clase title
        const titulos = document.getElementsByClassName("title");
        for (const titulo of titulos) {
          titulo.textContent = `${title}`;
        }

        //recorremos todos los elementos del HTML y colocamos el subtitulo a los elementos que tienen la clase subtitle
        const subtitulos = document.getElementsByClassName("subtitle");
        for (const subtitulo of subtitulos) {
          subtitulo.textContent = `${subtitle}`;
        }

        //Recorremos el objeto chapters y creamos una lista para mostrarla en el html
        var ul = document.getElementById("listaCapitulos");
        for (var i = 0; i < chapters.length; i++) {
          var chapter = chapters[i];
          // Creamos un nuevo elemento de lista li y le asignamos el nombre actual
          var li = document.createElement("li");
          //  li.textContent = formatTime(chapter.start) + " " + chapter.title;
          li.setAttribute("class", "capitulo");
          li.setAttribute("data-start", chapter.start);

          // Creamos un elemento span y le asignamos el valor de chapter.start
          var span = document.createElement("span");
          span.textContent = formatTime(chapter.start);
          // Agregamos el elemento span al elemento li
          li.appendChild(span);

          // Agregamos el título del capítulo al elemento li
          li.appendChild(document.createTextNode(" " + chapter.chapter));

          // Agregamos el elemento li a la lista ul
          ul.appendChild(li);

          //recorremos los capitulos creados y creamos la funcion clic para reproducir y cambiar la imagen
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
              document.getElementById(
                "imagenReproductor"
              ).innerHTML = `<img src="${selectedImg}" alt="">`;
            });
          });
        }

        //Recorremos el objeto credits y mostramos todos los elementos en el overlay creditos
        for (const credit of credits) {
          document.getElementById("published").textContent = credit.published;
          document.getElementById("description").textContent = credit.description;
          document.getElementById("author").textContent = credit.author;
        }
      })


  });
}

//Elemento boton play
var btnPlay = document.getElementById("play");
// Elementos del DOM para la duración y el tiempo actual
var durationElement = document.getElementById('duration');
var currentTimeElement = document.getElementById("current-time");
//Obtener los elementos adelantar y atrasar
var adelantarBtn = document.getElementById("adelantarBtn");
var retrasarBtn = document.getElementById("retrasarBtn");
//Obtener los elementos de velocidad
var velocidadBtn = document.getElementById("velocidadBtn");
//obtener elemento menu
var menuBtn = document.getElementById("menuBtn");
//obtener elemento creditos
var creditosBtn = document.getElementById("creditosBtn");
//obtener elemento overlya del menu y creditos
var overlay = document.querySelector(".overlay");
var overlayCreditos = document.querySelector(".overlayCreditos");
var cerrarOverlay = document.getElementById("cerrarOverlay");
var cerrarOverlay2 = document.getElementById("cerrarOverlay2");



//abrir el overlay menu
menuBtn.addEventListener("click", () => {
  wavesurfer.pause();
  overlay.style.display = "block";
});

//abrir el overlay Creditos
creditosBtn.addEventListener("click", () => {
  wavesurfer.pause();
  overlayCreditos.style.display = "block";
});

//Cerrar el overlay menu
cerrarOverlay.addEventListener("click", function () {
  overlay.style.display = "none";
  overlayCreditos.style.display = "none";
});

//Cerrar el overlay creditos
cerrarOverlay2.addEventListener("click", function () {
  overlayCreditos.style.display = "none";
});


//Ondas libreria wavesurfer
var wavesurfer = WaveSurfer.create({
  container: "#waveform",
  waveColor: "#d8d8d8",
  progressColor: "#007b99",
  barWidth: 4,
  barGap: 4,
  height: 60,
  responsive: true,
  hideScrollbar: true,
  barRadius: 4,
  cursorColor: "white",
});



//Metodo para bloquear los botones hasta que cargue el audio
wavesurfer.on("ready", function () {
  btnPlay.disabled = false;
  adelantarBtn.disabled = false;
  retrasarBtn.disabled = false;
  velocidadBtn.disabled = false;
  menuBtn.disabled = false;
  creditosBtn.disabled = false;
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
wavesurfer.on("ready", function () {
  const duration = wavesurfer.getDuration();
  var durationFormatted = formatTime(duration);
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




wavesurfer.on("play", function () {
  document.getElementById("icons").className = "fa-solid fa-circle-pause";
  reproduciendo = true;
});

wavesurfer.on("pause", function () {
  document.getElementById("icons").className = "fa-solid fa-circle-play";
  reproduciendo = false;
});
