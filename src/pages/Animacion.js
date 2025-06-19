import React from "react";
import Sketch from "react-p5";

export default function Animacion() {
  let x = 100;
  let y = 100;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(400, 400).parent(canvasParentRef);
  };

  const draw = (p5) => {
    p5.background(30);
    p5.fill(0, 255, 200);
    p5.ellipse(x, y, 50);
    x += p5.random(-5, 5);
    y += p5.random(-5, 5);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>✨ Animación con p5.js</h2>
      <Sketch setup={setup} draw={draw} />
    </div>
  );
}
