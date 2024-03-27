import Matter from "matter-js";
import { PhysicsWorld } from "./physics-world";

export class PhysicsBody extends HTMLElement {
  engine!: Matter.Engine;
  body!: Matter.Body;
  animationFrame!: number;

  async connectedCallback() {
    await customElements.whenDefined("physics-world");
    const world = this.closest("physics-world");
    if (world instanceof PhysicsWorld) {
      const engine = (this.engine = this.engine || world.engine);
      const width = this.offsetWidth;
      const height = this.offsetHeight;
      const body = (this.body =
        this.body ||
        Matter.Bodies.rectangle(
          this.offsetLeft + width / 2,
          this.offsetTop + height / 2,
          width,
          height,
          {
            angle: Math.random() - 0.5,
            force: {
              x: (Math.random() - 0.5) / 50,
              y: (Math.random() - 0.5) / 50,
            },
          },
        ));

      Matter.Composite.add(engine.world, body);

      this.onAnimationFrame();
    }
  }

  disconnectedCallback() {
    Matter.Composite.remove(this.engine.world, this.body);

    if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
  }

  onAnimationFrame = () => {
    const body = this.body;

    const { x, y } = body.position;

    const style = this.style;
    const width = this.offsetWidth;
    const height = this.offsetHeight;
    const tx = x - this.offsetLeft - width / 2;
    const ty = y - this.offsetTop - height / 2;

    style.transform = `translate(${tx}px, ${ty}px) rotate(${body.angle}rad)`;

    this.animationFrame = requestAnimationFrame(this.onAnimationFrame);
  };
}
