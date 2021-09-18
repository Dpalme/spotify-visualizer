import * as THREE from 'https://dpalmer.in/Art-Project/three.module.js';

class Visualizer {
    constructor(container, fft_size, pallete){
        this.camera      = null,
        this.scene       = null,
        this.renderer    = null,
        this.container   = null,
        this.frustumSize = 800;

        const aspect = window.innerWidth / window.innerHeight;
        this.camera = new THREE.OrthographicCamera( this.frustumSize * aspect / - 2, this.frustumSize * aspect / 2, this.frustumSize / 2, this.frustumSize / - 2, 1, 4000);
        this.camera.position.set(1024, 1024, 1024);
        this.camera.lookAt(0, 0, 0);
        
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);

        this.scene.add(new THREE.HemisphereLight(0xffffbb, 0x080820, 1 ));
        this.scene.add(new THREE.AmbientLight(0x404040, 1 ));

        const p_g = new THREE.PlaneGeometry( 4096, 4096 );
        const p_m = new THREE.MeshBasicMaterial( {
            color: 0x000000,
            transparent: true,
            opacity: 0.75,
            side: THREE.FrontSide
        } );
        const plane = new THREE.Mesh( p_g, p_m );
        plane.position.set(1024, 100.1, 1024);
        plane.rotateX( - Math.PI / 2);
        this.scene.add( plane );

        this.bars = new THREE.Group();
        
        const side = Math.sqrt(fft_size >> 1),
              h_side = side >> 1,
              geometry = new THREE.BoxGeometry(512/side, 200, 512/side),
              materials = pallete.map(color => {
                return new THREE.MeshStandardMaterial({
                    color: color,
                    roughness: 0,
                    metalness: 0,
                    side: THREE.FrontSide
                });
              })

        for ( let x = 0; x < side; x ++ ) {
            for (let y = 0; y < side; y ++) {
                const object = new THREE.Mesh(geometry, materials[x%pallete.length]);

                object.position.x = x * h_side;
                object.position.y = 100;
                object.position.z = y * h_side;

                this.bars.add(object);
            }
        }

        this.bars.position.set(-96, 0, -96)

        this.scene.add(this.bars);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.canvas = this.renderer.domElement
        container.appendChild(this.renderer.domElement);

        window.addEventListener('resize', this.onWindowResize, false);
    }

    onWindowResize() {
        const aspect = window.innerWidth / window.innerHeight;
        this.camera.left = -this.frustumSize * aspect / 2;
        this.camera.right = this.frustumSize * aspect / 2;
        this.camera.top = this.frustumSize / 2;
        this.camera.bottom = -this.frustumSize / 2;

        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    draw(data) {
        this.bars.children.forEach( (bar, ind) => {
            bar.scale.y = data[ind-1]/255;
        })
        this.renderer.render(this.scene, this.camera);
    }
}

export { Visualizer }