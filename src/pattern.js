import { t, makeSprite } from "@replay/core";

export const Pattern = makeSprite({
  render({ props, device }) {

    const {
      scale = 1,
      opacity = 1,
      offsetX = 0,
      offsetY = 0,
      fileName,
      repeatX = true,
      repeatY = true
    } = props;
    
    const width = props.width * scale;
    const height = props.height * scale;
    
    let rows = props.columns || (device.size.width / width) * 5;
    let columns = props.rows || (device.size.height / height) * 5;
    if (repeatX === false) {
      rows = 1;
    }
    if (repeatY === false) {
      columns = 1;
    }
    
    const positions = [];
    for (var x = 0; x < rows; x++) {
      for (var y = 0; y < columns; y++) {
        positions.push([
          x - Math.floor(rows * 0.5),
          y - Math.floor(columns * 0.5)
        ]);
      }      
    }
    
    const offsetXReal = offsetX % width;    
    const offsetYReal = offsetY % height;    
         
    const imgs = positions.map(pos => {
      const img = t.image({
        x: (width * pos[0] * 1) + offsetXReal,
        y: (height * pos[1] * 1) + offsetYReal,
        scaleX: 1,
        scaleY: 1,
        fileName,
        width: width + 1,
        height: height + 1,
        opacity: opacity
      });
      return img;
    });
    
    return imgs;
  }
});
