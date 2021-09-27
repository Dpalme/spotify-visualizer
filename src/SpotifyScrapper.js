class Spotify_Scrapper {
    constructor(token) {
        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new Spotify.Player({
                name: 'Web Playback SDK Quick Start Player',
                getOAuthToken: cb => { cb(token); },
                volume: 0.5
            });
            return player;
        }
    }
}

export { Spotify_Scrapper }