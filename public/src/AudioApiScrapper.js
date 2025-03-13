class AudioApiScrapper {
    constructor(options) {
        var AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioCtx = new AudioContext(),
        this.analyser = this.audioCtx.createAnalyser();
        this.analyser.fftSize = 256 << options.fftSize;
        this.analyser.smoothingTimeConstant = options.analyser.smoothness;
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
  
    updateFft(fft) {
      this.analyser.fftSize = 1024 << fft;
      this.data = new Uint8Array(this.analyser.frequencyBinCount);
    }
}

export {AudioApiScrapper}
