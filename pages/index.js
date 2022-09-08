import ColorPickerContainer from "../components/ColorPickerContainer";
import Header from "../components/Header";
import { PainterContext } from "../contexts/PainterContext";
import { useState } from "react";
import Canvas from "../components/Canvas";
import CanvasLib from "../libs/CanvasLib";

export default function Home() {
  //selected color from color picker
  //set black color as default
  const [selColor, setSelColor] = useState("#000000");

  //16x16 2D Array that holds color data
  const [pixels, setPixels] = useState(CanvasLib.createEmptyCanvas());

  const paint = (xPos, yPos) => {
    const newPixels = CanvasLib.copyCanvas(pixels);
    newPixels[xPos][yPos] = selColor;
    setPixels(newPixels);
  };

  const clear = () => {
    setPixels(CanvasLib.createEmptyCanvas());
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "GhostWhite" }}>
      <PainterContext.Provider value={{ selColor, setSelColor, pixels, paint }}>
        <Header />
        <ColorPickerContainer />
        <Canvas />

        <div className="d-flex justify-content-center gap-2">
          <button className="btn btn-dark" onClick={clear}>
            Clear
          </button>
          <button
            className="btn btn-dark"
            onClick={() => setPixels(CanvasLib.createRandomCanvas())}
          >
            Random Color
          </button>
        </div>
      </PainterContext.Provider>
    </div>
  );
}
