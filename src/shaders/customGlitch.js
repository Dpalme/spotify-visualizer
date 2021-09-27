import {
	DataTexture,
	FloatType,
	MathUtils,
	RGBFormat,
	ShaderMaterial,
	UniformsUtils
} from 'https://threejs.org/build/three.module.js';
import { Pass, FullScreenQuad } from 'https://threejs.org/examples/jsm/postprocessing/Pass.js';
import { DigitalGlitch } from 'https://threejs.org/examples/jsm/shaders/DigitalGlitch.js';

class GlitchPass extends Pass {

	constructor( dt_size = 64 ) {

		super();

		if ( DigitalGlitch === undefined ) console.error( 'THREE.GlitchPass relies on DigitalGlitch' );

		const shader = DigitalGlitch;

		this.uniforms = UniformsUtils.clone( shader.uniforms );

		this.uniforms[ 'tDisp' ].value = this.generateHeightmap( dt_size );

		this.material = new ShaderMaterial( {
			uniforms: this.uniforms,
			vertexShader: shader.vertexShader,
			fragmentShader: shader.fragmentShader
		} );

		this.fsQuad = new FullScreenQuad( this.material );

		this.goWild = false;
		this.curF = 0;

	}

	render( renderer, writeBuffer, readBuffer /*, deltaTime, maskActive */ ) {

		this.uniforms[ 'tDiffuse' ].value = readBuffer.texture;
		this.uniforms[ 'seed' ].value = Math.random();//default seeding
		this.uniforms[ 'byp' ].value = 0;

		if ( this.goWild == true ) {
			this.uniforms[ 'amount' ].value = 0.01;
			this.uniforms[ 'angle' ].value = MathUtils.randFloat( - Math.PI, Math.PI );
			this.uniforms[ 'seed_x' ].value = MathUtils.randFloat( - 1, 1 );
			this.uniforms[ 'seed_y' ].value = MathUtils.randFloat( - 1, 1 );
			this.uniforms[ 'distortion_x' ].value = MathUtils.randFloat( 0, 1 );
			this.uniforms[ 'distortion_y' ].value = MathUtils.randFloat( 0, 1 );
		} else if ( this.goWild == false ) {
			this.uniforms[ 'byp' ].value = 1;
		}

		if ( this.renderToScreen ) {
			renderer.setRenderTarget( null );
			this.fsQuad.render( renderer );
		} else {
			renderer.setRenderTarget( writeBuffer );
			if ( this.clear ) renderer.clear();
			this.fsQuad.render( renderer );
		}
	}

	generateHeightmap( dt_size ) {

		const data_arr = new Float32Array( dt_size * dt_size * 3 );
		const length = dt_size * dt_size;

		for ( let i = 0; i < length; i ++ ) {

			const val = MathUtils.randFloat( 0, 1 );
			data_arr[ i * 3 + 0 ] = val;
			data_arr[ i * 3 + 1 ] = val;
			data_arr[ i * 3 + 2 ] = val;

		}

		return new DataTexture( data_arr, dt_size, dt_size, RGBFormat, FloatType );

	}

}

export { GlitchPass };