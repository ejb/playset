import { t, makeSprite } from '@replay/core';
import { Clickable } from './clickable';

export const Button = makeSprite({
  render({ props, device }) {
    const buttonWidth = props.width || 150;
    const buttonHeight = props.height || 50;
    const {
      font,
      color = 'white',
      colorPressed = 'white',
      text,
      onPress
    } = props;

    return [
      Clickable({
        id: 'clickable',
        width: buttonWidth,
        height: buttonHeight,
        onPress,
        sprites: isPressed => [
          t.rectangle({
            width: buttonWidth,
            height: buttonHeight,
            color: isPressed ? colorPressed : color
          }),
          t.text({
            text,
            font,
            color: '#0F1011'
          })
        ]
      })
    ];
  }
});