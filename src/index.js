// defined in webpack
/* global ASSET_NAMES */

export const options = {
  loadingTextures: [
    t.text({
      color: "black",
      text: "Loading...",
    }),
  ],
  assets: ASSET_NAMES,
  dimensions: "scale-up",
};


import { makeSprite, t } from '@replay/core';

import * as playset from './playset';

export const gameProps = {
  id: 'Game',
  size: {
    landscape: {
      width: 600,
      height: 400,
      maxWidthMargin: 150,
    },
    portrait: {
      width: 400,
      height: 600,
      maxHeightMargin: 150,
    },
  },
  defaultFont: {
    name: 'Courier',
    size: 10,
  },
};

export const Game = makeSprite({
  init() {
    return {
      player: {
        x: 0,
        y: 0,
        direction: 'down',
        walking: false
      }
    };
  },

  loop({ state, device }) {
    const { keysDown } = device.inputs;
    let { player } = state;
    
    const xDir = keysDown.ArrowLeft ? -1 : keysDown.ArrowRight ? 1 : 0;
    const yDir = keysDown.ArrowDown ? -1 : keysDown.ArrowUp ? 1 : 0;
    
    const walkSpeed = 2;
    
    player.x += xDir * walkSpeed;
    player.y += yDir * walkSpeed;
    
    player.direction = 'down';
    if (yDir === 1) {
      player.direction = 'up'
    } else if (yDir === -1) {
      player.direction = 'down'
    } else if (xDir === 1) {
      player.direction = 'right'
    } else if (xDir === -1) {
      player.direction = 'left'
    }
    
    player.walking = (xDir !== 0 || yDir !== 0);

    return {
      player
    };
  },

  render({ state, device }) {
    

    // minimum of options
    const blameFlame = playset.Animation({
      id: 'blue-flame',
      x: -100,
      y: 0,
      fileName: 'blue-flame.png',
      columns: 3,
      rows: 1,
      fps: 10,
      width: 50,
      height: 50,
    });

    // using the x/y `frameArray` syntax in a larger spritesheet
    const orangeFlame = playset.Animation({
      id: 'orange-flame',
      x: 100,
      y: 0,
      fileName: 'things.png',
      columns: 12,
      rows: 8,
      fps: 10,
      width: 50,
      height: 50,
      frameArray: [{x: 0, y: 4}, {x: 1, y: 4}, {x: 2, y: 4}],
    });
    
    const frameArrays = {
      up: [39, 40, 41, 40],
      down: [3, 4, 5, 4],
      left: [15, 16, 17, 16],
      right: [27, 28, 29, 28]
    }
    
    // example of dynamically changing `frameArray`
    // and `playing` to swap between animations
    const { player } = state;
    const playerSprite = playset.Animation({
      id: 'player',
      x: player.x,
      y: player.y,
      fileName: 'characters.png',
      columns: 12,
      rows: 8,
      fps: 8,
      width: 50,
      height: 50,
      frameArray: frameArrays[player.direction],
      playing: player.walking
    });
    
    // basic pattern    
    const path = playset.Pattern({
      id: 'background-path',
      x: 0,
      y: 0,
      width: 150,
      height: 150,
      tileWidth: 50,
      tileHeight: 50,
      fileName: 'path.png'
    });

    // full-screen pattern
    const grass = playset.Pattern({
      id: 'background-grass',
      x: 0,
      y: 0,
      width: device.size.deviceWidth,
      height: device.size.deviceHeight,
      tileWidth: 50,
      tileHeight: 50,
      fileName: 'grass.png'
    });
    
    const button = playset.Button({
      id: 'button',
      x: -100,
      y: 150,
      width: 100,
      height: 30,
      font: { name: 'Papyrus', size: 15 },
      text: 'Click me',
      color: 'white',
      colorPressed: 'gray',
      onPress: () => alert('button pressed')
    });
    
    const transitionTest = playset.Transition({
      id: 'transition-test',
      x:  150,
      y: -150,
      origin: {
        scaleX: 0.8,
        rotation: -5,
      },
      target: {
        scaleX: 1.4,
        rotation: 5,
      },
      duration: 2000,
      playback: 'bounce',
      sprites: [
        t.rectangle({
          width: 120,
          height: 15,
        }),
        t.text({
          text: 'Transition example',
          color: 'black',
        }),
      ]
    });
    
    return [
      grass,
      path,
      playerSprite,
      orangeFlame,
      blameFlame,
      button,
      transitionTest,
    ];
  },
});
