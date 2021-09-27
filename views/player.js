class PlayingScreen {
    constructor(options) {
        this.imgElement = object(
            {
                type: 'img',
                src: options.img_url,
                id: 'album-art',
                crossorigin: 'anonymous',
                style: 'width:8rem;height:8rem',
                class: 'mr-md inline'
            });
        this.songTitle = object({
            type: 'h2',
            style: 'margin-bottom:0.5rem',
            id: 'track-title',
            innerText: options.title
        })
        this.artistTitle = object({
            type: 'p',
            id: 'track-artist',
            innerText: options.artist
        })
        this.audioElement = object({
            type: 'audio',
            src: options.file,
            _type: 'audio/mpeg',
            id: 'audio-test',
            autoplay: 'true',
            controls: 'true'
        })

        this.layout = object({
            type: 'div',
            class: 'mb-md track-info',
            children: [
                this.imgElement,
                object({
                    type: 'div',
                    class: 'd-inline',
                    style: 'width:auto',
                    children: [
                        this.songTitle,
                        this.artistTitle
                    ]
                }),
                this.audioElement
            ]
        })
    }
}

export { PlayingScreen };


/*
<div class="mb-md track-info">
    <img src="./imgs/faces-cover.jpg" id="album-art" crossorigin="anonymous"
        style="width: 8rem;height: 8rem;" class="mr-md inline">
    <div class="d-inline" style="width: auto;">
        <h2 style="margin-bottom: .5rem;" id="track-title">Spotify Visualizer</h2>
        <p id="track-artist">Select this device in your spotify app</p>
    </div>
</div>
<!--
<input type="range" class="mr-md" name="smoothness" min="0.01"
    max="0.99" step="0.01" value="0.9" id="smooth-range">
    -->
<audio src="./audio/demo-song.mp3" type="audio/mpeg"
    id="audio-test" autoplay loop></audio>
*/