class SettingsScreen {
  constructor(options) {
    options = options || {};
    this.toggle = object("p", {
      innerText: "settings",
      class: "m-md absolute bottom right front-2 z-2 bold fade",
      style: "cursor:pointer"
    });

    this.toggle.addEventListener("click", _ => {
      document.querySelector(".settings-panel").classList.toggle("open");
    });
    
    this.bgToggle = object('div', {
      class: "fullscreen fixed",
    })

    this.settingsPanel = object("div", {
      type: "div",
      class: "p-md fullscreen settings-panel",
      style: "background: #0006;flex-direction:column-reverse;align-items:flex-end;",
      children: [
        this.bgToggle,
        object("div", {
          class: "float-r text-r grid front",
          style: "max-width: 400px",
          children: [
            object("select", {
              class: "col-6",
              name: "fftSize",
              bars: "fftSize",
              children: [
                object('option', {
                  value: "0",
                  innerText: "Lowest"
                }),
                object('option', {
                  value: "1",
                  innerText: "Low"
                }),
                object('option', {
                  value: "2",
                  innerText: "Medium"
                }),
                object('option', {
                  value: "3",
                  innerText: "High"
                }),
                object('option', {
                  value: "4",
                  innerText: "Extreme"
                })
              ]
            }),
            object("label", {
              class: "col-6",
              for: "fftSize",
              innerText: "Resolution"
            }),
            object("select", {
              class: "col-6",
              name: "visualizerBarType",
              bars: "barType",
              value: options.barType,
              children: [
                object('option', {
                  value: "0",
                  innerText: "Round"
                }),
                object('option', {
                  value: "1",
                  innerText: "Square"
                }),
                object('option', {
                  value: "2",
                  innerText: "Pyramids"
                })
              ]
            }),
            object("label", {
              class: "col-6",
              for: "visualizerBarType",
              innerText: "Bar Type"
            }),
            object("input", {
              type: "range",
              class: "col-6",
              name: "analyserSmoothingTimeConstant",
              global: "audioData",
              element: "analyser",
              setting: "smoothingTimeConstant",
              max: "0.99",
              min: 0.01,
              step: 0.01,
              value: options.analyser.smoothness
            }),
            object("label", {
              class: "col-6",
              for: "analyserSmoothingTimeConstant",
              innerText: "Smoothing"
            }),
            object("input", {
              type: "range",
              class: "col-6",
              name: "bloomIntensity",
              global: "visualizer",
              element: "options",
              setting: "bloomIntensity",
              max: "1.0",
              min: 0.0,
              step: 0.01,
              value: options.bloomIntensity
            }),
            object("label", {
              class: "col-6",
              for: "bloomIntensity",
              innerText: "Bloom Intensity"
            }),
            
            object("input", {
              type: "range",
              class: "col-6",
              name: "glitchThreshold",
              global: "visualizer",
              element: "options",
              setting: "glitchThreshold",
              max: "1.0",
              min: 0.0,
              step: 0.01,
              value: options.glitchThreshold
            }),
            object("label", {
              class: "col-6",
              for: "glitchThreshold",
              innerText: "Glitch Threshold"
            }),
            object('div', {
              class:'h-lg col-f'
            })
          ]
        })
      ]
    });
    
    this.bgToggle.addEventListener('click', _ => {
      document.querySelector(".settings-panel").classList.toggle("open");
    })
  }
}

export { SettingsScreen };
