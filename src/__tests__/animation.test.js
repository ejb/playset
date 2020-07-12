import { testSprite } from '@replay/test';
import { mapInputCoordinates } from '@replay/web';
import { Animation } from '../animation';
import { gameProps } from '..';

test('Animation required props', () => {
  expect(() => {
    testSprite(Animation({}), gameProps);
  }).toThrow('missing required prop(s)');
});

test('Animation basic init', () => {
  
  const flameProps = ({
    id: 'person',
    x: 0,
    y: 0,
    fileName: 'blue-flame.png',
    columns: 3,
    rows: 1,
    fps: 10,
    width: 10,
    height: 10
  });
  
  const flame = testSprite(Animation(flameProps), gameProps);
  
  const textures = flame.getTextures();
  
  expect(textures.length).toBe(1);
  expect(textures[0].type).toBe('spriteSheet');
  
});

test('Animation size', () => {
  
  const flameProps = ({
    id: 'person',
    x: 0,
    y: 0,
    fileName: 'blue-flame.png',
    columns: 3,
    rows: 1,
    fps: 10,
    width: 999,
    height: 545
  });
  
  const flame = testSprite(Animation(flameProps), gameProps);
  
  const textures = flame.getTextures();
  
  expect(textures.length).toBe(1);
  
  expect(textures[0].props.width).toBe(999);
  expect(textures[0].props.height).toBe(545);
  
});

