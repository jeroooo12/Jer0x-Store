import React from "react";
import Sketch from "react-p5";

export default function FooterAnimation() {
  let x = 0;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, 120).parent(canvasParentRef);
    p5.frameRate(30);
  };

  const draw = (p5) => {
    p5.clear(); // ✅ no hay fondo
    p5.push();

    p5.translate(x, 60); // mueve todo el muñequito
    drawCharacter(p5);

    p5.pop();
    x += 3;
    if (x > p5.width + 30) x = -50; // loop

  };

  const drawCharacter = (p5) => {
    // Cabeza
    p5.fill(255, 220, 180);
    p5.ellipse(0, -20, 20, 20);

    // Cuerpo
    p5.fill(0, 100, 200);
    p5.rect(-5, -10, 10, 25);

    // Brazos
    p5.stroke(0);
    p5.line(-5, -5, -15, 5); // brazo izquierdo
    p5.line(5, -5, 15, 5);   // brazo derecho

    // Piernas animadas
    const legSwing = Math.sin(p5.frameCount * 0.2) * 5;
    p5.line(-3, 15, -3 + legSwing, 25);
    p5.line(3, 15, 3 - legSwing, 25);
  };

  return <div style={{ position: 'relative', marginTop: '2rem' }}><Sketch setup={setup} draw={draw} /></div>;
}
