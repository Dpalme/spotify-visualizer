import { AudioApiScrapper } from './AudioApiScrapper.js';
import { Visualizer } from './Visualizer.js';
import { PlayingScreen } from '../views/player.js';
// import { Spotify_Scrapper } from './SpotifyScrapper.js';

const colorThief = new ColorThief();
let visualizer, audioData;

let options = {
    audioSource: {
        file: './audio/apparition.mp3',
        img_url: './imgs/faces-cover.jpg',
        title: 'Apparition',
        artist: 'Mac Miller'
    },
    backgroundColor: 0x000000,
    colors: [],
    colors_n: 8,
    fftSize: 4096,
    bloom: true,
    glitch: true,
    smoothness: 0.8
};

function getPallete(length = 8) {
    return new Promise((res, rej) => {
        var img = document.querySelector('img');
        let pallete = []
        if (img.complete) {
            colorThief.getPalette(img, length).forEach(color => {
                pallete.push(parseInt(color.map(x => {
                    const hex = x.toString(16)
                    return hex.length === 1 ? '0' + hex : hex
                }).join(''), 16))
            });
            res(pallete);
        } else {
            img.addEventListener('load', function () {
                colorThief.getPalette(img, length).forEach(color => {
                    pallete.push(parseInt(color.map(
                        x => {
                            const hex = x.toString(16);
                            return hex.length === 1 ? '0' + hex : hex
                        })
                        .join(''), 16))
                });
                res(pallete);
            });
        }
    })

}


function update() {
    requestAnimationFrame(_ => { update() })
    visualizer.draw(audioData.update())
}

document
    .getElementById('disclaimer')
    .addEventListener('click',
        _ => {
            clearContent()
            const playerView = new PlayingScreen(options.audioSource)
            addToContent(playerView.layout)
            // const player = new Spotify_Scrapper('BQAeXooTApP7t-0ryFGJMiHESdOM3CIrpoq62NWrL66qhFHCPMoEu0H7gb0xHb1Q4lf9rhFg4ozuD2t_777mbLYubfhNYF-FtkkHrwl9CK7tYmN7kNysbbKah-lTJL-jTIkgc6tcL-KkdFO6j6hFjfkWURNaLRONNg');
            getPallete(options.colors_n)
                .then(
                    data => {
                        options.colors = data;
                        visualizer = new Visualizer(options);
                        let audioNode = document.getElementById('audio-test');
                        audioData = new AudioApiScrapper(options);
                        audioData.changeSource(audioNode);
                        update();
                    }
                );

            // Input setting connections
            document.querySelectorAll('input[setting]').forEach(e => {
                e.addEventListener('input', _ => {
                    let global;
                    if (e.getAttribute('global') == 'audioData'){
                        global = audioData;
                    } else {
                        global = visualizer
                    }
                    global[e.getAttribute('element')][e.getAttribute('setting')] = parseFloat(e.value);
                    if (e.getAttribute('global')) {visualizer.camera.updateProjectionMatrix()}
                })
            })


        }
    )
// https://accounts.spotify.com/en/authorize?response_type=token&client_id=adaaf209fb064dfab873a71817029e0d&redirect_uri=https:%2F%2Fdeveloper.spotify.com%2Fdocumentation%2Fweb-playback-sdk%2Fquick-start%2F&scope=streaming%20user-read-email%20user-modify-playback-state%20user-read-private&show_dialog=true