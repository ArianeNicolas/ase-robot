function setup() {
  createCanvas(1000, 1000, document.getElementById("simulator"));
  window.entities = [];
  window.p5robot = null;
  window.time = 0;
  window.lastTimestamp = 0;
  window.scene = null;
}

function draw() {
  background("#2d2a2e");
  stroke(255);
  strokeWeight(1);

  for (var e = 0; e < window.entities.length; e++) {
    window.entities[e].show();
  }

  if (
    window.scene !== null &&
    window.scene.timestamps.length > lastTimestamp + 1
  ) {
    //console.log(window.scene.timestamps);
    time += deltaTime;
    updateRobot();
  }

  if (window.p5robot !== null) {
    window.p5robot.show();
  }
}

function updateRobot() {
  const lastKnownState = window.scene.timestamps[window.lastTimestamp];
  const nextKnownState = window.scene.timestamps[window.lastTimestamp + 1];

  window.p5robot.x = map(
    window.time,
    lastKnownState.time,
    nextKnownState.time,
    lastKnownState.pos.x,
    nextKnownState.pos.x,
    true,
  );
  window.p5robot.y = map(
    window.time,
    lastKnownState.time,
    nextKnownState.time,
    lastKnownState.pos.y,
    nextKnownState.pos.y,
    true,
  );
  window.p5robot.angle = map(
    window.time,
    lastKnownState.time,
    nextKnownState.time,
    lastKnownState.rad,
    nextKnownState.rad,
    true,
  );
  if (window.time >= nextKnownState.time) {
    window.time = nextKnownState.time;
    window.lastTimestamp++;
  }

  const factor = window.p5robot.factor;
  for (var i = 0; i < window.lastTimestamp + 1; i++) {
    let first = window.scene.timestamps[i];
    let last = window.scene.timestamps[i + 1];

    let x2;
    let y2;
    if (i == window.lastTimestamp) {
      x2 = window.p5robot.x;
      y2 = window.p5robot.y;
    } else {
      x2 = last.pos.x;
      y2 = last.pos.y;
    }

    stroke("#ff6f61");
    strokeWeight(3);
    line(first.pos.x * factor, first.pos.y * factor, x2 * factor, y2 * factor);
  }
}

function resetSimulation() {
  window.time = 0;
  window.lastTimestamp = 0;
}

window.setup = setup;
window.resetSimulation = resetSimulation;
