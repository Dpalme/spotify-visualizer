class Audio_Analyzer {
    constructor(source, fft_size, smoothing) {
        var AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioCtx = new AudioContext(),
        this.analyser = this.audioCtx.createAnalyser();
        this.analyser.fftSize = fft_size;
        this.analyser.smoothingTimeConstant = smoothing;
        this.data = new Uint8Array(this.analyser.frequencyBinCount);
        this.audioStr = this.audioCtx.createMediaElementSource(source);
        this.audioStr.connect(this.analyser);
        this.audioStr.connect(this.audioCtx.destination)
    }

    update() {
        this.analyser.getByteFrequencyData(this.data);
        return [...this.data];
    }
}

export {Audio_Analyzer}