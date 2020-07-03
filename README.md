# Playset

Handy utilities for the Replay game engine.

## Animation

Extends Replay's built-in [spriteSheet](https://replay.js.org/docs/textures/#sprite-sheet) to allow for GIF-like looping animation.

```js
const blueFlame = Animation({
  id: 'person',
  x: 0,
  y: 0,
  fileName: 'blue-flame.png',
  columns: 3,
  rows: 1,
  fps: 10
});
```

Additional properties:

* `fps`: Frames Per Second _(required)_
* `frameArray`: If you want use a subset of the spritesheet, or edit the frame order. This should a zero-indexed array of positions on the spritesheet (e.g. `[3, 4, 5, 4]`). If the spritesheet is large, there is an alternative syntax `[{x: 0, y: 4}, {x: 1, y: 4}, {x: 2, y: 4}]`
* `playing`: Set to `false` to pause animation

For other properties, see [spriteSheet](https://replay.js.org/docs/textures/#sprite-sheet) documentation.


## Credits

Sprites used in examples are by [Lanea Zimmerman](https://opengameart.org/content/tiny-16-basic).