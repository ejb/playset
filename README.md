# Playset

Handy utilities for the [Replay game engine](https://replay.js.org/).

* [Live demo of components](http://elliotbentley.com/playset/web/dist/)
* [Demo source code](./src/index.js)

## Importing

```js
import * as playset from 'playset';

// or if you just want individual components
import { Animation, Pattern } from 'playset';
```

## Animation

Extends Replay's built-in [spriteSheet](https://replay.js.org/docs/textures/#sprite-sheet) to allow for GIF-like looping animation.

```js
const blueFlame = playset.Animation({
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

## Pattern

Use a single image as a repeating pattern.

```js
const path = playset.Pattern({
  id: 'path',
  x: 0,
  y: 0,
  width: 150,
  height: 150,
  tileWidth: 50,
  tileHeight: 50,
  fileName: 'path.png'
});
```

## Button

A box with text on it that does something when clicked/tapped on. The font and color can be customised using the optional `font`, `color`, and `colorPressed` properties.

```js
const button = playset.Button({
  id: 'button',
  x: 0,
  y: 0,
  width: 100,
  height: 30,
  text: 'Click me',
  onPress: () => {
    // do something here when pressed
  },
  font: { name: 'Papyrus', size: 15 },
  color: 'white',
  colorPressed: 'gray'
});
```

## Clickable

Similar to a button, except it comes without any default appearance. Pass an array of sprites into the `sprites` property to define how it looks.

```js
const interactiveSquare = playset.Clickable({
  id: 'clickable',
  width: 24,
  height: 24,
  onPress: () => {
    // do something here when pressed
  },
  sprites: isPressed => [
    t.rectangle({
      width: 20,
      height: 20,
      color: isPressed ? 'red' : 'yellow'
    })
  ]
});
```

## Development

Clone repo, then:

```
npm install
npm start
```

To run unit tests:

```
npm test
```

## Credits

Sprites used in examples are by [Lanea Zimmerman](https://opengameart.org/content/tiny-16-basic).