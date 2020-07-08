import { t, makeSprite } from "@replay/core";

export const Clickable = makeSprite({
  render({ props, device }) {
    const { x, y, justReleased, pressed } = device.inputs.pointer;

    const isOnButton =
      x <= props.width / 2 &&
      x >= -props.width / 2 &&
      y <= props.height / 2 &&
      y >= -props.height / 2;

    const isPressed = pressed && isOnButton;

    if (justReleased && isOnButton) {
      props.onPress();
    }

    return props.sprites(isPressed);
  }
});
