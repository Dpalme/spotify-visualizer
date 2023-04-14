# Spotify Visualizer

Connect your premium spotify account and enjoy a 3d visualizer that reacts in real-time to your favorite music!

[See the live version](https://visualizer.dpalmer.in/)

![Visualizer Demo](https://dpalmer.in/spotify-visualizer/imgs/DarkFinalDesign.png "Visualizer Demo")

## Requirements

- You need a premium spotify account in order to use the visualizer. If you don't have one, [you can sign-up for a free-trial](https://spotify.com).

## Usage

1. In the main page, click the log-in button, you will be taken to the spotify authentication page.
2. Authorize the app. Once back, you will now see "Visualizer" in your connected devices
3. Click on any of the song covers and enjoy!

## Highlights

The visualizer is built on ThreeJs and Web Audio API, so it can be adapted to accept inputs from any source, if you want to try this out, you can find the Visualizer class inside the `public/src/` folder

&nbsp;

### Feel free to re-use any code you may find usefull

&nbsp;

## Visualizer Configuration

- Smoothing: How long energy takes to disipate `defaults to 0.5`
- Resolution: Determines how many bars the visualizer has (Exponential effect on performance) `defaults to Medium`

### Effects:

- Bloom: The amount of bloom applied `0.5 by default`
- Glitch Threshold: The amount of energy needed to toggle the glitch effect `0.75 by default`

&nbsp;

## Project Overview

### Initial goal

The original idea was a spotify connected endpoint that would recieve the song data and pipe it into a Web Audio API analyzer to get visualizable data. The user would get to the page, log in if they didn't have a refresh cookie, and play something on their device.

### Initial UI/UX Design (Figma / Cinema 4D)

#### Login

![Dark Login](https://dpalmer.in/spotify-visualizer/imgs/Dark_Login.jpg "Dark Login")
![Light Login](https://dpalmer.in/spotify-visualizer/imgs/Light_Login.jpg "Light Login")

#### Awaiting User playback

![Dark Waiting](https://dpalmer.in/spotify-visualizer/imgs/Dark_Waiting.jpg "Dark Waiting")
![Light Waiting](https://dpalmer.in/spotify-visualizer/imgs/Light_Waiting.jpg "Light Waiting")

#### Playing a song with cover art mapped to the bars

![Dark Visual](https://dpalmer.in/spotify-visualizer/imgs/Dark_Visual.jpg "Dark Visual")
![Light Visual](https://dpalmer.in/spotify-visualizer/imgs/Light_Visual.jpg "Light Visual")

#### Settings menu

![Dark Settings](https://dpalmer.in/spotify-visualizer/imgs/Dark_Settings.jpg "Dark Settings")
![Light Settings](https://dpalmer.in/spotify-visualizer/imgs/Light_Settings.jpg "Light Settings")

&nbsp;

### First Prototype

Before connecting to Spotify, I focused on the visualizer component (arguably the most important)

![First Prototype](https://dpalmer.in/spotify-visualizer/imgs/V0.0.1SS.jpg?raw=true "First Prototype")

&nbsp;

### A change of course

The original idea was to use the visualizer as a spotify enabled endpoint to allow the user to stream complete songs and alter playback ([Why I changed course](#song-data-limitation)), but when that changed, the design was adapted to meet the new user flow and functionality for the page.

The result is a minimal UI with the visualizer front and center and a responsive bar at the top with the user's top 12 songs fetched from the Spotify API. In mobile it adapts automatically to be 2 rows of 6

![Final Design](https://dpalmer.in/spotify-visualizer/imgs/DarkFinalDesign.png "Final Design")

---

## Technical specifications

### Measurements and math

- Pillars: Object with 0,0,0 at the center of the object
- Number of pillars: `FFT_SIZE/2`
  - Low: **1024**
  - Medium **2048**
  - High **4096**
- Max Pillar Height: **200u**
- Hz/bin: 22500/Pillars:
  - Low: **~22 Hz**
  - Medium: **~11 Hz**
  - High: **~5 Hz**
- Plane size: **512ux512u**
- Pillar side:
  - Low: 512/32 = 16u
  - Medium: 512/64 = 8u
  - Hight: 512/128 = 4u
- Camera projection: **Isometric**

&nbsp;

#### Reflections

Reflections are expensive, so a semi-transparent plane is placed @ y=0 to fake the reflexion

![Dark Settings](https://dpalmer.in/spotify-visualizer/imgs/Dark_Settings.jpg "Dark Settings")

&nbsp;

#### Different Resolutions

##### Low

![Low Resolution](https://dpalmer.in/spotify-visualizer/imgs/Low_Res.jpg "Low resolution")

##### Medium

![Medium Resolution](https://dpalmer.in/spotify-visualizer/imgs/Med_Res.jpg "Medium resolution")

##### High

![High Resolution](https://dpalmer.in/spotify-visualizer/imgs/High_Res.jpg "High resolution")

&nbsp;
&nbsp;

### Spotify

#### Authentication Flow

[![](https://mermaid.ink/img/pako:eNptkMFqwzAMhl9F6Lr2BXwodN1GDiuMJUdfhK0sJonV2QqjK333OUs6KEwny__36xe6oBPPaDDz58TR8VOgj0SjjVDqMASOut3tHh7J9Ry9gapp3uB9hrMu0CoVasFNkX1I7BRUoD6JhvYM-0k7SeGbNEiEl0G-7iLmjBX9L2OVZmz7t8reOc4ZGiktUPTF0ibO3fJzv9xsvK1XNcfXX75mhYNIHxgqJs8pQytpsWcb7TrjVrjBkdNIwZd7XWbNonY8skVTnp5Sb9HGa-GmkyflZx9UEhpNE2-QJpX6HN2tX5j13mhaGjJffwANToSs)](https://mermaid.live/edit#pako:eNptkMFqwzAMhl9F6Lr2BXwodN1GDiuMJUdfhK0sJonV2QqjK333OUs6KEwny__36xe6oBPPaDDz58TR8VOgj0SjjVDqMASOut3tHh7J9Ry9gapp3uB9hrMu0CoVasFNkX1I7BRUoD6JhvYM-0k7SeGbNEiEl0G-7iLmjBX9L2OVZmz7t8reOc4ZGiktUPTF0ibO3fJzv9xsvK1XNcfXX75mhYNIHxgqJs8pQytpsWcb7TrjVrjBkdNIwZd7XWbNonY8skVTnp5Sb9HGa-GmkyflZx9UEhpNE2-QJpX6HN2tX5j13mhaGjJffwANToSs)

#### Data stream

[![](https://mermaid.ink/img/pako:eNp9kMFKA0EMhl8l5Gp76m0OhUIVPRQWW_Qyl7iT1eDOzJqZOayl7-4s3SIVNadAvo8__Edso2M0mPijcGh5K_Sq5G2AOjuSAHcltFliWK7XN_shZulGA_eHQwOPk5MydFHBD6uzMyOVXl7pBnbNChxlgpSVf4-o1jO_wKY4ibBpHgw0MvC3KeFsXUGT9SNqO8GUgFRphNhB10fK6Y_IJ0mFevlk_ce0c_RlcIGe1ZO42t5xulnMb-zZoqmrI323aMOpcmWoz_OtkxwVTUd94gVSyXE_hhZN1sIXaK5_pk5fcHeIXg)](https://mermaid.live/edit#pako:eNp9kMFKA0EMhl8l5Gp76m0OhUIVPRQWW_Qyl7iT1eDOzJqZOayl7-4s3SIVNadAvo8__Edso2M0mPijcGh5K_Sq5G2AOjuSAHcltFliWK7XN_shZulGA_eHQwOPk5MydFHBD6uzMyOVXl7pBnbNChxlgpSVf4-o1jO_wKY4ibBpHgw0MvC3KeFsXUGT9SNqO8GUgFRphNhB10fK6Y_IJ0mFevlk_ce0c_RlcIGe1ZO42t5xulnMb-zZoqmrI323aMOpcmWoz_OtkxwVTUd94gVSyXE_hhZN1sIXaK5_pk5fcHeIXg)

&nbsp;
&nbsp;

### ThreeJs

#### Rendering Pipeline

[![](https://mermaid.ink/img/pako:eNpNj7sOwyAMRX8FeU5-gKFDH8qSoUqHLCwuuAU1QASkUhXl30vTB72Tj861ZM8gvSLgcA04atZ2wrGcns5Ny-p6wzpyisIRY3ybwqveDt7bYn-4ymYwSepiC696h-6Okf0FKrAULBqVL5pfSwKSJksCeB4VhpsA4Zbcm0aFiQ7KJB-AX3CIVAFOyZ8eTgJPYaJvaW8wf2c_reUJriZNGQ)](https://mermaid.live/edit#pako:eNpNj7sOwyAMRX8FeU5-gKFDH8qSoUqHLCwuuAU1QASkUhXl30vTB72Tj861ZM8gvSLgcA04atZ2wrGcns5Ny-p6wzpyisIRY3ybwqveDt7bYn-4ymYwSepiC696h-6Okf0FKrAULBqVL5pfSwKSJksCeB4VhpsA4Zbcm0aFiQ7KJB-AX3CIVAFOyZ8eTgJPYaJvaW8wf2c_reUJriZNGQ)

##### Render Pass

The render pass is the default render the threejs framework outputs. It controls the baseline anti-aliasing and the resolution.

##### Bloom Pass

The bloom pass is a custom modification of the default bloom pass provided by threejs, while the factory shader only has a bottom minimum threshold for bloom, I added a maximum to avoid pure white bars and white background from saturating the image beyond comprehension.

##### Glitch Pass

The glitch pass is also a modification of the default threejs provided one, in this I removed the digital noise and left only the distortions and chromatic aberration.

&nbsp;
&nbsp;

#### Song data limitation

The original idea was to use the visualizer as a spotify enabled endpoint to allow the user to stream complete songs and alter playback, however, spotify encodes the audio data and it would be a breach of ToS to decode it and pipe it into the Web Audio API. The Workaround is to use the "public" previews spotify hosts, which consists of 30 seconds snippets of songs. This is obtained by querying the user's top songs from the past 6 months and building the html with the info of the first 12.
