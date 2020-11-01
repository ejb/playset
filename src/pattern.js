import { t, mask, makeSprite } from "@replay/core";

const PatternInner = makeSprite({
  render({ props, device }) {

    const {
      fileName,
      width,
      height,
      tileWidth,
      tileHeight
    } = props;
    
    const rows = (width / tileWidth) + 2;
    const columns = (height / tileHeight) + 2;
    
    const positions = [];
    for (var x = -1; x < rows; x++) {
      for (var y = -1; y < columns; y++) {
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

export const Pattern = makeSprite({
  render({ props, device }) {
    
    const {
      width,
      height,
    } = props;
    
    const pattern = PatternInner({
      ...props,
      mask: mask.rectangle({
        width,
        height,
        x: 0,
        y: 0,
      }),
    });
    
    return [
      pattern
    ]; 
  }
});