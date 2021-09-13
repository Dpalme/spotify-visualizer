# Spotify Visualizer

Connect your premium spotify account and enjoy a 3d visualizer that reacts in real-time to your favorite music!

[See the live version](https://dpalmer.in/spotify-visualizer)

## Requirements

- You need a premium spotify account in order to use the visualizer. If you don't have one, [you can sign-up for a free-trial](https://spotify.com).

- You need a separate spotify client to control the music, the visualizer cannot browse or change music, think of it as a bluetooth speaker.

## Usage

1. In the main page, click the log-in button, you will be taken to the spotify authentication page.
2. Authorize the app. Once back, you will now see "Visualizer" in your connected devices
3. Select the device as your output

## Highlights

The visualizer is built on ThreeJs and Web Audio API, so it can be adapted to accept inputs from any source, if you want to try this out, you can find the Visualizer module inside the `src/` folder

`Feel free to re-use any code you may find usefull`

## Visualizer Configuration

- Smoothing: How long energy takes to disipate `defaults to 0.5`
- Resolution: Determines how many bars the visualizer has (Exponential effect on performance) `defaults to Medium`
- Night Mode: Color of the background `off by default`
- Color mode: Where the bars get their color from
    - From cover `default` 
    - Custom Color 
- Camera Zoom: 1.0 `default`

### Effects:
`Can be toggled on or off`
- Glow
- AntiAlias
- Reflections

## Screenshots
![Light Login]("https://dpalmer.in/spotify-visualizer/imgs/Light_Login.jpg" "Light Login")
![Light Waiting]("https://dpalmer.in/spotify-visualizer/imgs/Light_Waiting.jpg" "Light Waiting")
![Light Visual]("https://dpalmer.in/spotify-visualizer/imgs/Light_Visual.jpg" "Light Visual")
![Light Settings]("https://dpalmer.in/spotify-visualizer/imgs/Light_Settings.jpg" "Light Settings")

## Technical specifications

- Pillars: Rectangles extruded from plane
- Number of pillars: `FFT_SIZE/2`
    - Low: **256**
    - Medium **1024**
    - High **4096**
- Max Pillar Height: **200u**
- Hz/bin: 22500/Pillars:
    - Low: **~88 Hz**
    - Medium: **~22 Hz**
    - High: **~6 Hz**
- Plane size: **512ux512u**
- Pillar side:
    - Low: 512/16 = 32u
    - Medium: 512/32 = 16u
    - Hight: 512/64 = 8u
- Camera projection: **Isometric**
- Frequency map:

|   |  0  |  1  |  2  |  3  |  4  |  5  |  6  |  7  |  8  |  9  |  A  |  B  |  C  |  D  |  E  |  F  |
|:-:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 0 | 225 | 226 | 227 | 228 | 229 | 230 | 231 | 232 | 233 | 234 | 235 | 236 | 237 | 238 | 239 | 240 |
| 1 | 224 | 169 | 170 | 171 | 172 | 173 | 174 | 175 | 176 | 177 | 178 | 179 | 180 | 181 | 182 | 241 |
| 2 | 223 | 168 | 121 | 122 | 123 | 124 | 125 | 126 | 127 | 128 | 129 | 130 | 131 | 132 | 183 | 242 |
| 3 | 222 | 167 | 120 |  81 |  82 |  83 |  84 |  85 |  86 |  87 |  88 |  89 |  90 | 133 | 184 | 243 |
| 4 | 221 | 166 | 119 |  80 |  49 |  50 |  51 |  52 |  53 |  54 |  55 |  56 |  91 | 134 | 185 | 244 |
| 5 | 220 | 165 | 118 |  79 |  48 |  25 |  26 |  27 |  28 |  29 |  30 |  57 |  92 | 135 | 186 | 245 |
| 6 | 219 | 164 | 117 |  78 |  47 |  24 |  9  |  10 |  11 |  12 |  31 |  58 |  93 | 136 | 187 | 246 |
| 7 | 218 | 163 | 116 |  77 |  46 |  23 |  8  |  1  |  2  |  13 |  32 |  59 |  94 | 137 | 188 | 247 |
| 8 | 217 | 162 | 115 |  76 |  45 |  22 |  7  |  0  |  3  |  14 |  33 |  60 |  95 | 138 | 189 | 248 |
| 9 | 216 | 161 | 114 |  75 |  44 |  21 |  6  |  5  |  4  |  15 |  34 |  61 |  96 | 139 | 190 | 249 |
| A | 215 | 160 | 113 |  74 |  43 |  20 |  19 |  18 |  17 |  16 |  35 |  62 |  97 | 140 | 191 | 250 |
| B | 214 | 159 | 112 |  73 |  42 |  41 |  40 |  39 |  38 |  37 |  36 |  63 |  98 | 141 | 192 | 251 |
| C | 213 | 158 | 111 |  72 |  71 |  70 |  69 |  68 |  67 |  66 |  65 |  64 |  99 | 142 | 193 | 252 |
| D | 212 | 157 | 110 | 109 | 108 | 107 | 106 | 105 | 104 | 103 | 102 | 101 | 100 | 143 | 194 | 253 |
| E | 211 | 156 | 155 | 154 | 153 | 152 | 151 | 150 | 149 | 148 | 147 | 146 | 145 | 144 | 195 | 254 |
| F | 210 | 209 | 208 | 207 | 206 | 205 | 204 | 203 | 202 | 201 | 200 | 199 | 198 | 197 | 196 | 255 |

### Algorithm to generate frequency map:
1. Create a 2d array with each side measuring `SQRT(FFT_SIZE/2)`.
2. Start in `(SQRT(FFT_SIZE/2)/2) + 1`, `(SQRT(FFT_SIZE/2)/2) + 1`.
3. Go above until space to the right is clear.
4. Go right until space below is clear.
5. Go down until space at the left is clear.
6. Go left until space above is clear.
7. Repeat 3-6 until no space is empty.