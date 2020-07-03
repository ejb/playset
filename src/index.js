import { makeSprite, t } from '@replay/core';
import { AnimatedSprite } from './animated-sprite';

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

  render({ state }) {
    

    // minimum of options
    const blameFlame = AnimatedSprite({
      id: 'blue-flame',
      x: -100,
      y: 0,
      fileName: 'blue-flame.png',
      columns: 3,
      rows: 1,
      fps: 10
    });

    // using the x/y `frameArray` syntax in a larger spritesheet
    const orangeFlame = AnimatedSprite({
      id: 'orange-flame',
      x: 100,
      y: 0,
      fileName: 'things.png',
      columns: 12,
      rows: 8,
      fps: 10,
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
    const playerSprite = AnimatedSprite({
      id: 'player',
      x: player.x,
      y: player.y,
      fileName: 'characters.png',
      columns: 12,
      rows: 8,
      fps: 8,
      frameArray: frameArrays[player.direction],
      playing: player.walking
    });  
    
    return [
      playerSprite,
      orangeFlame,
      blameFlame
    ];
  },
});
