import Matter from "matter-js";

export class PhysicsWorld extends HTMLElement {
  engine = Matter.Engine.create();
  runner = Matter.Runner.create();

  walls = Array.from({ length: 4 }, () =>
    Matter.Bodies.rectangle(
      0,
      0,
      Number.MAX_SAFE_INTEGER,
      Number.MAX_SAFE_INTEGER,
      {
        isStatic: true,
      },
    ),
  );

  mouse = Matter.MouseConstraint.create(this.engine, {
    mouse: Matter.Mouse.create(this),
  });

  constructor() {
    super();

    Matter.Composite.add(this.engine.world, [...this.walls, this.mouse]);
  }

  connectedCallback() {
    this.resizeObserver.observe(this);
    this.onResize();

    window.addEventListener("deviceorientation", this.onDeviceOrientation);

    Matter.Runner.run(this.runner, this.engine);
  }

  disconnectedCallback() {
    this.resizeObserver.unobserve(this);

    window.removeEventListener("deviceorientation", this.onDeviceOrientation);

    Matter.Runner.stop(this.runner);
  }

  onResize = () => {
    const walls = this.walls;
    const width = this.offsetWidth;
    const height = this.offsetHeight;

    Matter.Body.setPosition(
      walls[0],
      Matter.Vector.create(width / 2, height + Number.MAX_SAFE_INTEGER / 2),
    );
    Matter.Body.setPosition(
      walls[1],
      Matter.Vector.create(-Number.MAX_SAFE_INTEGER / 2, height / 2),
    );
    Matter.Body.setPosition(
      walls[2],
      Matter.Vector.create(width + Number.MAX_SAFE_INTEGER / 2, height / 2),
    );
    Matter.Body.setPosition(
      walls[3],
      Matter.Vector.create(width / 2, -Number.MAX_SAFE_INTEGER / 2),
    );
  };

  resizeObserver = new ResizeObserver(this.onResize);

  onDeviceOrientation = (event: DeviceOrientationEvent) => {
    if (event.beta && event.gamma) {
      const gravity = this.engine.gravity;

      const pitch = Math.PI * (event.beta / 180);
      const roll = Math.PI * (event.gamma / 180);

      gravity.x = Math.cos(pitch) * Math.sin(roll);
      gravity.y = Math.sin(pitch);
    }
  };
}
