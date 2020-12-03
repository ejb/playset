import { t } from '@replay/core';
import { testSprite, jumpToFrame } from '@replay/test';
import { Transition } from '../transition';
import { gameProps } from '..';

test('Basic transition: translate', async () => {
  
  const sprite = Transition({
    id: 'rectangle',
    testId: 'transition',
    origin: {
      x: 0,
      y: 0,
    },
    target: {
      x: 10,
      y: 0,
    },
    duration: 100,
    sprites: [
      t.rectangle({
        testId: 'rectangle-inner',
        width: 10,
        height: 10,
      })
    ]
  });
  
  const rectangle = testSprite(sprite, gameProps);
  
  const textures = rectangle.getTextures();
    
  expect(textures[0].props.x).not.toBeNaN();
  expect(textures[0].props.x).toBe(0);
  expect(textures[0].type).toBe('rectangle');
  
  await rectangle.jumpToFrame(() => textures[0].props.x === 10);
  
  
});

