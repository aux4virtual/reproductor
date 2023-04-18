// Obtén el elemento de audio y de canvas
const audio = document.getElementById("audio");
const waveform = document.getElementById("waveform");
const playButton = document.getElementById("play-button");
const pauseButton = document.getElementById("pause-button");

// Inicializa WaveSurfer
const wavesurfer = WaveSurfer.create({
  container: waveform,
  waveColor: "violet",
  progressColor: "purple",
});

// Carga el archivo de audio
wavesurfer.load(audio);

// Agrega un listener al botón de reproducción
playButton.addEventListener("click", function() {
  wavesurfer.play();
});

// Agrega un listener al botón de pausa
pauseButton.addEventListener("click", function() {
  wavesurfer.pause();
});