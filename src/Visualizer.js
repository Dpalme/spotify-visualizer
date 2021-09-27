import * as THREE from 'https://threejs.org/build/three.module.js';
import { EffectComposer } from 'https://threejs.org/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://threejs.org/examples/jsm/postprocessing/RenderPass.js';
import { GlitchPass } from './shaders/customGlitch.js';
import { UnrealBloomPass } from 'https://threejs.org/examples/jsm/postprocessing/UnrealBloomPass.js';

class Visualizer {
    constructor(options) {
        this.camera = null;
        this.scene = null;
        this.renderer = null;
        this.container = null;
        this.frustumSize = 800;

        const aspect = window.innerWidth / window.innerHeight;
        this.camera = new THREE.OrthographicCamera(this.frustumSize * aspect / - 2, this.frustumSize * aspect / 2, this.frustumSize / 2, this.frustumSize / - 2, 0, 4000);
        this.camera.position.set(1024, 1024, 1024);
        this.camera.lookAt(0, 0, 0);

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(options.backgroundColor);

        this.scene.add(new THREE.HemisphereLight(0xffffbb, 0x080820, 1));
        this.scene.add(new THREE.AmbientLight(0x404040, 1));

        // Fake Reflections Plane 
        const p_o = 720;
        const p_g = new THREE.PlaneGeometry(p_o, p_o);
        const p_m = new THREE.MeshBasicMaterial({
            color: options.backgroundColor,
            transparent: true,
            opacity: 0.8,
            side: THREE.DoubleSide
        });
        const plane = new THREE.Mesh(p_g, p_m);
        plane.position.set((p_o >> 1) - 100, 99.999, (p_o >> 1) - 100);
        plane.rotateX(- Math.PI / 2);
        this.scene.add(plane);


        // Bars generation promise
        this.bars = new THREE.Group();
        this.generateBars(options.fftSize, options.colors)
            .then(
                new_bars => {
                    this.bars = new_bars;
                    this.scene.add(this.bars);
                }
            )


        // Rendering pipeline
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.toneMapping = THREE.ReinhardToneMapping;

        this.canvas = this.renderer.domElement
        document.body.appendChild(
            object({
                type: 'div',
                class: 'overflow-h center-a back',
                child: this.renderer.domElement
            })
        )

        const renderScene = new RenderPass(this.scene, this.camera);

        // UnrealBloomPass(resolution, intensity, radius, threshold)
        this.bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            1, 1, 0.25);

        this.glitchPass = new GlitchPass(8);

        this.finalComposer = new EffectComposer(this.renderer);
        this.finalComposer.addPass(renderScene);
        this.finalComposer.addPass(this.bloomPass);
        this.finalComposer.addPass(this.glitchPass);

        window.addEventListener('resize', () => {
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.camera.updateProjectionMatrix();
        }, false);
    }

    generateBars = async (fftSize, colors) => {
        return new Promise((res, rej) => {
            let bars = new THREE.Group();
            const bins = Math.sqrt(fftSize >> 2),
                side = 512 / bins,
                geometry = new THREE.CylinderGeometry(side >> 2, side >> 2, 400, 12, 1);
            for (let x = 0; x < bins; x++) {
                for (let y = 0; y < bins; y++) {
                    const color = colors[x % colors.length],
                        object = new THREE.Mesh(geometry,
                            new THREE.MeshStandardMaterial({
                                color: color,
                                emissive: color
                            }));

                    object.position.x = x % bins * side - 96;
                    object.position.y = 100;
                    object.position.z = y % bins * side - 96;

                    bars.add(object);
                }
            }
            if (bars.length === 0) {
                rej('Error generating bars');
            } else {
                res(bars);
            }
        })
    }

    draw(data) {
        let avgIntensity = 0;
        this.bars.children.forEach(
            (bar, ind) => {
                const intensity = data[ind - 1] / 255;
                avgIntensity += intensity >= 0.5;
                bar.scale.y = intensity;
                bar.material.emissiveIntensity = intensity;
                bar.material.metalness = 1 - intensity;
            }
        );
        avgIntensity /= this.bars.children.length;
        this.bloomPass.intensity = avgIntensity * 4
        if (avgIntensity > 0.5) {
            this.glitchPass.goWild = true;
        }
        else {
            this.glitchPass.goWild = false;
        }
        this.finalComposer.render(this.scene, this.camera);
    }

    newPallete(pallete) {
        console.log('new pallete')
        if (this.bars.children.length === 0) {
            setTimeout(async () => { this.newPallete(pallete) }, 100);
        } else {
            this.bars.children.forEach(
                (bar, ind) => {
                    console.log(this.ind);
                    bar.material.color = pallete[ind % pallete.length];
                }
            );
        }
    }
}

export { Visualizer }