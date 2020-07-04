import { t, makeSprite } from "@replay/core";

export const Pattern = makeSprite({
  render({ props, device }) {

    const {
      fileName,
      width,
      height,
      tileWidth,
      tileHeight
    } = props;
    
    const rows = width / tileWidth;
    const columns = height / tileHeight;
    
    const positions = [];
    for (var x = 0; x < rows; x++) {
      for (var y = 0; y < columns; y++) {
        positions.push([
          x - Math.floor(rows * 0.5),
          y - Math.floor(columns * 0.5)
        ]);
      }      
    }
             
    const imgs = positions.map(pos => {
      const img = t.image({
        x: (tileWidth * pos[0]),
        y: (tileHeight * pos[1]),
        fileName,
        width: tileWidth + 0.1,
        height: tileHeight + 0.1
      });
      return img;
    });
    
    return imgs;
  }
});
