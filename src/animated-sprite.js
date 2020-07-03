import { t, makeSprite } from '@replay/core';

export const AnimatedSprite = makeSprite({
  init({ props }) {
    const defaultFrame = props.frameArray ? props.frameArray[0] : 0
    return {
      frame: defaultFrame,
      tick: 0
    };
  },

  loop({ state, props }) {
    
    let frameArray = props.frameArray;
    if (typeof props.frameArray === 'undefined') {
      frameArray = [...Array(props.rows * props.columns)].map((x, i) => i);
    } else if (props.frameArray[0].hasOwnProperty('x')) {
      frameArray = props.frameArray.map(f => {
        return (f.y + (f.x / props.columns)) * props.columns;
      });
    }
                
    const fps = props.fps;

    const totalFrames = frameArray.length;    
    const ticksPerFrame = 60 / fps; // 7.5
    
    let frame = state.frame;
    if (props.playing !== false) {
      let frameIndex = Math.round(state.tick / ticksPerFrame);
      if (frameIndex >= totalFrames) {
        frameIndex = frameIndex % totalFrames;
      }
      frame = frameArray[frameIndex];
    }
        
    return {
      frame,
      tick: state.tick + 1
    };
  },

  render({ state, props }) {
    
    const { fileName, columns, rows } = props;
    const image = t.spriteSheet({
      fileName,
      columns,
      rows,
      index: state.frame,
      width: 50,
      height: 50
    });
    
    return [
      image
    ];
  },
});

