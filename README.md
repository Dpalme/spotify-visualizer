# tc-3022-proyecto-final

## Ideas
[Idea 1 | Visualizador de Spotify](#visualizador-integrado-a-spotify)
[Idea 2 | Musica Generativa](#máquina-musical-generativainteractiva-audiovisual)
[Idea 3 | Racer infinito](#racer-infinito)

___

### Visualizador integrado a Spotify

`Herramienta audiovisual`

Una aplicación web que se conecte con spotify y te permita visualizar la música mientras la escuchas.
#### Requerimientos funcionales
 * Usar cuenta de spotify para reproducir música
 * Representar visualmente la información recibida de spotify
&nbsp;
 #### Plan de trabajo

 ##### Maco-tareas
| Id | Tarea                         | Dependencias |
|----|-------------------------------|--------------|
| 1  | Integrar con API Spotify      |              |
| 2  | Crear Visualizador            |              |
| 3  | Integrar API con visualizador | 1, 2         |

&nbsp;
###### Integrar APi Spotify
| Id | Tarea                             | Dependencias |
|----|-----------------------------------|--------------|
| 1  | Crear app de spotify              |              |
| 2  | Conectar cliente con API          | 1            |
| 3  | Obtener stream de audio en buffer | 2            |
&nbsp;

###### Crear Visualizador
| Id | Tarea                         | Dependencias |
|----|-------------------------------|--------------|
| 1  | Convertidor Audio buffer a UintArray |       |
| 2  | Animación que use el UintArray | 1           |
&nbsp;

###### Integrar API con visualizador
| Id | Tarea                         | Dependencias |
|----|-------------------------------|--------------|
| 1  | Conectar buffer a salida de audio Spotify |  |

&nbsp;
#### APIs con los que interactuaría
 * [Spotify Web Playback API](https://developer.spotify.com/documentation/web-playback-sdk/)
 * [Encrypted media](https://www.w3.org/TR/encrypted-media/)
 * [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
 * [Three.js](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene)

#### Moodboard
![3d spectrogram](https://www.stereophile.com/images/512MitRfig3.jpg "3d spectrogram")
![3d topography](https://i.pinimg.com/originals/45/0e/e3/450ee3fdb18295c286253ffb384fa66d.jpg "Topography with pillars")
![3d VIsualier](https://i.ytimg.com/vi/GcddK4RMk_0/maxresdefault.jpg "3d visualizer")
![3d visualizer](https://image.winudf.com/v2/image/YmUudG1kZS5tdXNpY3Zpc3VhbGl6ZXJfc2NyZWVuXzZfMTUxOTYwMjU5OV8wNzQ/screen-6.jpg?fakeurl=1&type=.jpg "3d visualizer")

#### Proyectos similares
[Cartographer](https://exp.v-os.ca/cartographer/)
A web-based exploration of a procedural world
[Rainmeter Visualizers](https://orig05.deviantart.net/79c7/f/2015/101/7/c/dexterity__nowplaying_display_for_rainmeter__by_alatsombath-d8pbv6m.png)
For years rainmeter has supported visualizers that use system audio output to gather audio data and a middleware to get the "now playing" track information
[Slowed + Reverb](https://dpalmer.in/Slowed-Reverb) Cosito que hice hace como 8 meses que intenta hacer música generativa pero no suena chido pero tiene un visualizador

___

### Máquina musical generativa/interactiva audiovisual

`Herramienta audiovisual`

Un tipo de syntetizador modular orientado a crear música generativa ambiental/drone
&nbsp;
#### Requerimientos funcionales
 * Sistema musical generativo
 * Manera de interactuar con el sistema generativo
&nbsp;
 #### Plan de trabajo

 ##### Maco-tareas
| Id | Tarea                           | Dependencias |
|----|---------------------------------|--------------|
| 1  | Componentes del sintetizador    |              |
| 2  | Interfaz gráfica                |              |
| 3  | Conectar interfaz y componentes | 1, 2         |
&nbsp;
###### Componentes del sintetizador
| Id | Tarea                           | Dependencias |
|----|---------------------------------|--------------|
| 1  | Randomizador                    |              |
| 2  | Oscilador                       |              |
| 3  | LFO                             |              |
| 4  | Mixer                           |              |
| 5  | Filtros                         |              |
| 5  | Attack, Decay, Sustain, Release |              |
&nbsp;
###### Interfaz gráfica
| Id | Tarea           | Dependencias |
|----|-----------------|--------------|
| 1  | Cables          |              |
| 2  | Entradas trs    |              |
| 3  | Sliders         |              |
| 4  | Potenciómetros  |              |
| 5  | Toggles         |              |

&nbsp;
###### Integrar API con visualizador
| Id | Tarea                              | Dependencias|
|----|------------------------------------|-------------|
| 1  | Crear UI de cada componente        |             |
| 2  | Sistema para conectar componentes  |             |
| 3  | Input de teclado como MIDI         |             |
| 4  | Animaciones (cables y voltímetros) |             |
&nbsp;
&nbsp;
#### APIs con los que interactuaría
 * [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
 * [Three.js](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene)

#### Moodboard
 ![modular synth](http://demonicsweaters.com/wp-content/uploads/2015/03/899944.jpg "modular synth")
 ![modular synth](http://i1.wp.com/www.synthtopia.com/wp-content/uploads/2013/10/modulargrid-truegrid-web-based-modular-synthesizer.png?fit=844%2C714 "modular synth")
 ![modular synth](https://rekkerd.org/img/201012/uhe_bazil.png "modular synth")

 #### Proyectos similares
 [Audio Visual Generator](https://fredericbriolet.com/avg/)
 [Generative.fm](https://generative.fm)
 [Web Modular](https://www.g200kg.com/docs/webmodular/)
 [Slowed + Reverb](https://dpalmer.in/Slowed-Reverb) Cosito que hice hace como 8 meses que intenta hacer música generativa pero no suena chido pero tiene un visualizador
  
  ___
### Racer infinito
`Videojuego`  

Un videojuego sin fin ni historia donde se vaya creando la música conforme se progresa en el juego y esta reaccione a las acciones de quien está jugando  
&nbsp;
#### Requerimientos funcionales
 * Sistema de manejo
 * Generador infinito del camino
 * Generador de música que reaccione a acciones en el juego

&nbsp;
 #### Plan de trabajo

 ##### Maco-tareas
| Id | Tarea                        | Dependencias |
|----|------------------------------|--------------|
| 1  | Creación de assets           |              |
| 2  | Sistema de manejo            |              |
| 3  | Generador de camino infinito | 1.4          |
| 4  | Generador de música          | 1.1          |
| 5  | Conectar todo chiquiwow      | 1, 2, 3, 4   |

&nbsp;
###### Creación de assets
| Id | Tarea                 | Dependencias |
|----|-----------------------|--------------|
| 1  | Definir estilo visual |              |
| 2  | Coche                 | 1            |
| 3  | UI                    | 1            |
| 4  | Pedazos del camino    | 1            |
| 5  | Decoración            | 1            |

&nbsp;
###### Sistema de manejo
| Id | Tarea          | Dependencias |
|----|----------------|--------------|
| 1  | Colisiones     |              |
| 1  | Inputs teclado |              |
| 2  | Aceleración    | 1            |
| 3  | Frenado        | 2            |
| 4  | Volante        | 1            |

&nbsp;
###### Generador de camino infinito
| Id | Tarea                       | Dependencias |
|----|-----------------------------|--------------|
| 1  | Randomizador                |              |
| 2  | Inputs para el randomizador | 1            |
&nbsp;

###### Generador de música
| Id | Tarea                       | Dependencias |
|----|-----------------------------|--------------|
| 1  | Samples iniciales           |              |
| 2  | Randomizador musical        | 1            |
| 3  | Inputs para el randomizador | 2            |
| 4  | Outputs del randomizador    | 1            |
&nbsp;

###### Conectar todo chiquiwow
| Id | Tarea                         | Dependencias |
|----|-------------------------------|--------------|
| 1  | Asignar sistema de coche al coche |          |
| 2  | Output música -> input camino |              |
| 3  | Output coche -> Input música  |              |
&nbsp;
#### APIs con los que interactuaría
 * [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
 * [Three.js](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene)
&nbsp;
#### Moodboard
 ![the art of rally](https://news-cdn.softpedia.com/images/news2/top-down-racer-art-of-rally-draws-inspiration-from-the-golden-era-of-rally-531156-5.jpg "the art of rally")
 ![Thumper](https://screenshots.gamerinfo.net/thumper/154916.jpg "Thumper")
 ![subway surfers](https://i.pinimg.com/originals/6f/1e/11/6f1e1126320e5cdfdf78a9eabf1ef815.jpg "subway surfers")

 #### Proyectos similares
 [Ape Out](https://apeout.com) usa un sistema de música responsivo con loops infinitos de jazz que van cambiando conforme el jugador realiza acciones
 [Firewatch](https://www.firewatchgame.com) en la introducción utiliza igualmente un sistema musical reactivo y teóricamente infinito
 [Running in the 80s](https://drive.google.com/drive/folders/0B5xSt2wAJGz3SDlkZjRCNkRCUWs?resourcekey=0-oqgEhjkof1YGyTsjSH_kUA&usp=sharing) de morro hice un juego similar con un sistema para crear un caminito pero con una meta al final (ta en unity como 4 tons...)
