import { t, makeSprite } from '@replay/core';

const requiredProps = [
  'id',
  'duration',
  'sprites',
];

export const Transition = makeSprite({
  init({ props }) {
    
    const missingProps = requiredProps.filter(prop => {
      return (props.hasOwnProperty(prop) === false);
    });
    if (missingProps.length > 0) {
      throw(`Transition is missing required prop(s): ${missingProps.join(', ')}`)
    }
    
    
    
    return {
      startTime: new Date(),
      prevTarget: { ... props.target },
      progress: 0,
      reverse: props.playbacl === 'reverse',
    };
  },

  loop({ state, props }) {
    
    const { prevTarget } = state;
    let { startTime, reverse } = state;
    
    const now = new Date();
    
    if (JSON.stringify(props.target) !== JSON.stringify(prevTarget)) {
      startTime = now;
    }
    
    let progress = (now - startTime) / props.duration;
    if (progress >= 1) {
      progress = 0;
      if (props.playback === 'repeat') {
        startTime = now;
      } else if (props.playback === 'bounce') {
        startTime = now;
        reverse = !reverse;
      }
    }
    
    if (reverse) {
      progress = 1 - progress;
    }
    
    return {
      prevTarget: { ... props.target },
      startTime,
      progress,
      reverse,
    };
  },

  render({ state, props }) {
    
    const { origin, target } = props;
    const { progress } = state;
    
    const easeFn = props.easing || easeInOutQuad;
    
    const validProps = ['x', 'y', 'scaleX', 'scaleY', 'rotation'];
    const containerProps = validProps.reduce((obj, propName) => {
      if (propName in origin) {
        const value = lerp(origin[propName], target[propName], easeFn(progress));
        obj[propName] = value;
      }
      return obj;
    }, {});
    
    const container = TransitionContainer({
      id: `${props.id}-container`,
      sprites: props.sprites,
      ... containerProps,
    });
    
    return [
      container,
    ];
  },
});

const TransitionContainer = makeSprite({
  render({ props }) {
    return props.sprites;
  }
});



function lerp(v0, v1, t) {
  return v0*(1-t)+v1*t
}
function easeInOutQuad(x) {
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}