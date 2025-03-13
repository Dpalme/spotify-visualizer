class PlayingScreen {
  constructor(options) {
    options = options || {};
    this.imgElement = object("img", {
      src: options.img_url || "",
      id: "album-art",
      crossorigin: "anonymous",
      class: "col-2"
    });
    this.songTitle = object("h2", {
      style: "margin-bottom:0.5rem",
      id: "track-title",
      innerText: options.title || ""
    });
    this.artistTitle = object("p", {
      id: "track-artist",
      innerText: options.artist || ""
    });
    this.audioElement = object("audio", {
      src: options.file || "",
      type: "audio/mpeg",
      id: "audio-test",
      crossorigin: "anonymous",
      autoplay: "true"
    });

    this.layout = object("div", {
      children: [
        object("div", {
          class: "grid w-f slide-l",
          style: "text-shadow: 0 0 4px var(--white);",
          children: [
            this.imgElement,
            object("div", {
              class: "col-9",
              children: [this.songTitle, this.artistTitle]
            })
          ]
        }),
        this.audioElement
      ]
    });
  }
}

export { PlayingScreen };
