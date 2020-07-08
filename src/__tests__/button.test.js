import { testSprite } from '@replay/test';
import { mapInputCoordinates } from '@replay/web';
import { Button } from '../button';
import { gameProps } from '..';

test('Button basic init', (done) => {

  expect.assertions(4);
  
  const initInputs = {
    pointer: {
      pressed: false,
      justPressed: false,
      justReleased: false,
      x: 0,
      y: 0,
    },
  };
    
  const buttonProps = {
    id: 'button',
    x: 0,
    y: 0,
    width: 100,
    height: 30,
    text: 'Click me',
    color: 'white',
    colorPressed: 'gray',
    onPress: () => {
      expect(true).toBeTruthy();
      done();
    }
  };
  
  const button = testSprite(Button(buttonProps), gameProps,  { initInputs });
  
  const textures = button.getTextures();
  
  expect(textures.length).toBe(2);
  expect(textures[0].type).toBe('rectangle');
  expect(button.getByText('Click me').length).toBe(1);

  button.updateInputs({
    pointer: {
      pressed: false,
      justPressed: false,
      justReleased: true,
      x: 0,
      y: 0
    }
  });
  
  button.nextFrame();
  
});

