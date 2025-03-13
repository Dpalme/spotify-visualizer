import * as THREE from "./shaders/three.module.js";
import { EffectComposer } from "./shaders/EffectComposer.js";
import { RenderPass } from "./shaders/RenderPass.js";
import { GlitchPass } from "./shaders/customGlitch.js";
import { UnrealBloomPass } from "./shaders/ulBloom.js";

class Visualizer {
  constructor(options) {
    this.camera = null;
    this.scene = null;
    this.renderer = null;
    this.container = null;
    this.frustumSize = 800;
    this.options = options;
    this.mouse = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();

    const vHeight =
      window.innerHeight - document.querySelector("#album-bar").clientHeight;

    const aspect = window.innerWidth / vHeight;
    this.camera = new THREE.OrthographicCamera(
      (this.frustumSize * aspect) / -2,
      (this.frustumSize * aspect) / 2,
      this.frustumSize / 2,
      this.frustumSize / -2,
      0,
      5000
    );
    this.camera.position.set(512, 512, 512);
    this.camera.lookAt(0, 0, 0);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(options.backgroundColor);

    this.scene.add(new THREE.HemisphereLight(0xffffbb, 0x080820, 1));
    this.scene.add(new THREE.AmbientLight(0x121212, 1));

    // Fake Reflections Plane
    const p_o = 2056;
    const p_g = new THREE.PlaneGeometry(p_o, p_o);
    const p_m = new THREE.MeshBasicMaterial({
      color: options.backgroundColor,
      transparent: true,
      opacity: 0.7,
      side: THREE.DoubleSide
    });
    const plane = new THREE.Mesh(p_g, p_m);
    plane.position.set(0, 99.9, 0);
    plane.rotateX(-Math.PI / 2);
    this.scene.add(plane);

    // Bars generation promise
    this.bars = new THREE.Group();
    this.generateBars(options.fftSize, options.colors, options.barType).then(
      new_bars => {
        this.bars = new_bars;
        this.scene.add(this.bars);
      }
    );

    // Rendering pipeline
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, vHeight);

    this.canvas = this.renderer.domElement;
    document.body.appendChild(
      object("div", {
        class: "overflow-h absolute back z--1",
        style: `top:${document.querySelector("#album-bar").clientHeight}px`,
        child: this.renderer.domElement
      })
    );

    const renderScene = new RenderPass(this.scene, this.camera);
    this.passes = {};

    // UnrealBloomPass(resolution, strength, radius, lowerThreshold, upperThreshold )
    this.passes.bloom = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, vHeight),
      this.options.bloomIntensity,
      0.5,
      this.options.bloomLowerThreshold,
      this.options.bloomUpperThreshold
    );

    this.passes.glitch = new GlitchPass();

    this.finalComposer = new EffectComposer(this.renderer);
    this.finalComposer.addPass(renderScene);
    this.finalComposer.addPass(this.passes.bloom);
    this.finalComposer.addPass(this.passes.glitch);

    document.addEventListener("pointermove", _ => {
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);

      this.intersected = this.raycaster
        .intersectObjects(this.bars.children)
        .map(col => col.object);
    });

    document.addEventListener(
      "wheel",
      ev => {
        const nz = this.camera.zoom - ev.deltaY / 300;
        if (0.5 < nz && nz < 7) {
          this.camera.zoom = nz;
          this.camera.updateProjectionMatrix();
        }
      },
      false
    );

    window.addEventListener(
      "resize",
      () => {
        const n_h =
            window.innerHeight -
            document.querySelector("#album-bar").clientHeight,
          aspect = window.innerWidth / n_h;

        (this.camera.left = (this.frustumSize * aspect) / -2),
          (this.camera.right = (this.frustumSize * aspect) / 2),
          (this.camera.top = this.frustumSize / 2),
          (this.camera.bottom = this.frustumSize / -2),
          this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, n_h);
        this.passes.bloom.resolution = new THREE.Vector2(
          window.innerWidth,
          n_h
        );

        this.finalComposer.render(this.scene, this.camera);
      },
      false
    );
  }

  async generateBars(fftSize, colors, type) {
    return new Promise((res, rej) => {
      const tSide = 512;
      let bars = new THREE.Group();
      this.bins = Math.sqrt(64 << fftSize);
      let side = tSide / this.bins,
        hSide = side >> 1;
      var geometry, yOff;
      switch (type) {
        case 0:
          geometry = new THREE.CylinderGeometry(side >> 2, side >> 2, 1, 12, 1);
          yOff = 100;
          break;
        case 1:
          geometry = geometry = new THREE.BoxGeometry(side, 1, side);
          yOff = 100;
          break;
        case 2:
          geometry = new THREE.BufferGeometry();
          // create a simple square shape. We duplicate the top left and bottom right
          // vertices because each vertex needs to appear once per triangle.
          const vertices = new Float32Array([
            -hSide,
            0,
            -hSide,
            hSide,
            0,
            -hSide,
            0,
            0.5,
            0,

            -hSide,
            0,
            -hSide,
            -hSide,
            0,
            hSide,
            0,
            0.5,
            0,

            -hSide,
            0,
            hSide,
            hSide,
            0,
            hSide,
            0,
            0.5,
            0,

            hSide,
            0,
            hSide,
            hSide,
            0,
            -hSide,
            0,
            0.5,
            0,

            -hSide,
            0,
            -hSide,
            hSide,
            0,
            -hSide,
            0,
            -0.5,
            0,

            -hSide,
            0,
            -hSide,
            -hSide,
            0,
            hSide,
            0,
            -0.5,
            0,

            -hSide,
            0,
            hSide,
            hSide,
            0,
            hSide,
            0,
            -0.5,
            0,

            hSide,
            0,
            -hSide,
            hSide,
            0,
            hSide,
            0,
            -0.5,
            0
          ]);
          geometry.setAttribute(
            "position",
            new THREE.BufferAttribute(vertices, 3)
          );
          yOff = 100;
          break;
      }
      const matOpts = {
        metalness: 0,
        flatShading: true
      };
      for (let x = 0; x < this.bins; x++) {
        for (let y = 0; y < this.bins; y++) {
          const color = new THREE.Color(colors[(x + y) % colors.length]),
            object = new THREE.Mesh(
              geometry,
              new THREE.MeshStandardMaterial(matOpts)
            );
          object.material.color.set(color);
          object.material.emissive.set(0x808080);
          object.position.x = x * side - 96;
          object.position.y = yOff;
          object.position.z = y * side - 96;

          bars.add(object);
        }
      }
      if (bars.length === 0) {
        rej("Error generating bars");
      } else {
        res(bars);
      }
    });
  }

  async generatePoints() {
    this.points = new THREE.Group();

    this.bars.traverse(bar => {
      if (bar.material) {
        const point = new THREE.Points(
            bar.geometry,
            new THREE.PointsMaterial({
              color: bar.material.color,
              size: 3
            })
          )
        point.position.copy(bar.position);
        point.scale.copy(bar.scale);
        this.points.add(point);
      }
    });
    this.scene.add(this.points);
    setTimeout(() => {
      this.scene.remove(this.points);
      this.points = undefined;
    }, 5000);
  }

  async draw(data) {
    if (this.bars.length == 0) return;

    let avgIntensity = 0;
    this.bars.children.forEach((bar, ind) => {
      const intensity = data[ind] / 255;
      avgIntensity += data[ind];
      bar.scale.y = 400 * intensity;
      bar.material.emissiveIntensity = 0 * intensity * 0.1;
    });

    if (avgIntensity == 0)
      return this.finalComposer.render(this.scene, this.camera);
    avgIntensity /= this.bars.children.length * 255;

    this.intersected.forEach(bar => {
      bar.material.emissiveIntensity *= 10;
    });

    this.passes.bloom.strength = this.options.bloomIntensity;

    if (this.points) {
      this.points.scale.multiplyScalar(1 + Math.random() / 10);
    } else if (avgIntensity > 0.75) {
      this.generatePoints();
    }

    if (avgIntensity > this.options.glitchThreshold) {
      this.passes.glitch.goWild = true;
    } else {
      this.passes.glitch.goWild = false;
    }
    this.finalComposer.render(this.scene, this.camera);
  }

  async togglePass(pass) {
    if (this.finalComposer.passes.includes(this.passes[pass])) {
      this.finalComposer.removePass(this.passes[pass]);
    } else {
      this.finalComposer.addPass(this.passes[pass]);
    }
  }

  async newBars(opts) {
    this.generateBars(opts.fftSize, opts.colors, opts.barType).then(
      new_bars => {
        this.scene.remove(this.bars);
        this.bars = new_bars;
        this.scene.add(this.bars);
      }
    );
  }

  async newPallete(pallete) {
    if (this.bars.children.length === 0) {
      setTimeout(async () => {
        this.newPallete(pallete);
      }, 100);
    } else {
      this.bars.children.forEach((bar, ind) => {
        bar.material.color = new THREE.Color(pallete[ind % pallete.length]);
      });
    }
  }
}

export { Visualizer };
