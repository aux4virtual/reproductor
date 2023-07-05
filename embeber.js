var containerId = "embed-container";
var embedContainer = document.getElementById(containerId);

function embedPage() {
  var iframe = document.createElement("iframe");
  iframe.src = "https://aux4virtual.github.io/reproductor/";
  iframe.loading = "lazy";
  iframe.width = "100%";
  iframe.height = "200";
  iframe.frameBorder = "0";
  iframe.scrolling = "no";

  embedContainer.appendChild(iframe);
}

if (embedContainer) {
  embedPage();
}
