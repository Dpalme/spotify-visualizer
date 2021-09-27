class AudioApiScrapper {
    constructor(options) {
        var AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioCtx = new AudioContext(),
        this.analyser = this.audioCtx.createAnalyser();
        this.analyser.fftSize = options.fftSize;
        this.analyser.smoothingTimeConstant = options.smoothness;
        this.data = new Uint8Array(this.analyser.frequencyBinCount);
    }

    update() {
        this.analyser.getByteFrequencyData(this.data);
        return [...this.data];
    }

    changeSource(source) {
        this.audioStr = this.audioCtx.createMediaElementSource(source);
        this.audioStr.connect(this.analyser);
        this.audioStr.connect(this.audioCtx.destination);
    }
}

export {AudioApiScrapper}
