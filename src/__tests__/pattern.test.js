import { testSprite } from '@replay/test';
import { mapInputCoordinates } from '@replay/web';
import { Pattern } from '../pattern';
import { gameProps } from '..';

test('Pattern basic init', () => {
  
  const pathProps = {
    id: 'background-path',
    x: 0,
    y: 0,
    width: 150,
    height: 150,
    tileWidth: 50,
    tileHeight: 50,
    fileName: 'path.png'
  };
  
  const path = testSprite(Pattern(pathProps), gameProps);
  
  const textures = path.getTextures();
  
  expect(textures.length).toBe(36);
  expect(textures[0].type).toBe('image');
  
});
