import { AudioApiScrapper } from "./AudioApiScrapper.js";
import { Visualizer } from "./Visualizer.js";
import { PlayingScreen } from "../views/player.js";
import { SettingsScreen } from "../views/settings.js";

const colorThief = new ColorThief();
let visualizer,
  audioData = null,
  playerView,
  settingsView;

let options = {
  backgroundColor: 0x121212,
  colors: [],
  colors_n: 7,
  fftSize: 0,
  barType: 0,
  bloomLowerThreshold: 0.25,
  bloomUpperThreshold: 0.75,
  bloomIntensity: 0.6,
  glitchThreshold: 0.75,
  analyser: { smoothness: 0.8 }
};

function getPallete(length = 8) {
  return new Promise((res, rej) => {
    var img = document.querySelector("#album-art");
    let pallete = [];
    if (img.complete) {
      colorThief.getPalette(img, length).forEach(color => {
        pallete.push(
          parseInt(
            color
              .map(x => {
                const hex = x.toString(16);
                return hex.length === 1 ? "0" + hex : hex;
              })
              .join(""),
            16
          )
        );
      });
      res(pallete);
    } else {
      img.addEventListener("load", function() {
        colorThief.getPalette(img, length).forEach(color => {
          pallete.push(
            parseInt(
              color
                .map(x => {
                  const hex = x.toString(16);
                  return hex.length === 1 ? "0" + hex : hex;
                })
                .join(""),
              16
            )
          );
        });
        res(pallete);
      });
    }
  });
}

function update() {
  requestAnimationFrame(_ => {
    update();
  });
  visualizer.draw(audioData.update());
}

settingsView = new SettingsScreen(options);
document.body.appendChild(settingsView.toggle);
document.body.appendChild(settingsView.settingsPanel);
playerView = new PlayingScreen(options.audioSource);
addToContent(playerView.layout);
visualizer = new Visualizer(options);

document.querySelectorAll("input[type=range]").forEach(e => {
  e.addEventListener("input", _ => {
    let global = e.getAttribute("global") == "audioData" ? audioData || options : visualizer;
    global[e.getAttribute("element")][e.getAttribute("setting")] = parseFloat(
      e.value
    );
    if (e.getAttribute("global") == "visualizer") {
      visualizer.camera.updateProjectionMatrix();
    }
  });
});

document.querySelectorAll("[pass]").forEach(e => {
  e.style.cursor = "pointer";
  e.addEventListener("click", ev => {
    if (e.hasAttribute("pass")) {
      e.classList.toggle("mid-white");
      options[e.getAttribute("pass")] = !options[e.getAttribute("pass")];
      return visualizer.togglePass(e.getAttribute("pass"));
    }
  });
});

document.querySelectorAll("img[preview]").forEach(obj => {
  obj.addEventListener("click", ev => {
    if (!audioData) {
      audioData = new AudioApiScrapper(options);
      audioData.changeSource(playerView.audioElement);
    }
    update();
    playerView.layout.classList.remove("slide-t");
    playerView.layout.classList.add("d-none");
    playerView.imgElement.setAttribute("src", ev.target.getAttribute("src"));
    playerView.audioElement.setAttribute(
      "src",
      ev.target.getAttribute("preview")
    );
    playerView.songTitle.innerText = ev.target.getAttribute("name");
    playerView.artistTitle.innerText = ev.target.getAttribute("artists");
    getPallete(options.colors_n).then(data => {
      options.colors = data;
      visualizer.newPallete(data);
      playerView.layout.classList.remove("d-none");
      playerView.layout.classList.add("slide-t");
    });
  });
});

document.querySelectorAll("select[bars]").forEach(e => {
  e.addEventListener(
    "change",
    async ev => {
      options[e.getAttribute("bars")] = parseInt(e.value);
      visualizer.newBars(options);
      if (e.getAttribute("bars") == "fftSize" && audioData) {
        audioData.updateFft(parseInt(e.value))
      }
    },
    { passive: true }
  );
});
