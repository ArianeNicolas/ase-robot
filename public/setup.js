import {
  MonacoEditorLanguageClientWrapper,
  vscode,
} from "./monaco-editor-wrapper/index.js";
import { buildWorkerDefinition } from "./monaco-editor-workers/index.js";
import monarchSyntax from "./syntaxes/ase-robot.monarch.js";
//import { BaseScene } from "../web/simulator/scene.js";

buildWorkerDefinition(
  "./monaco-editor-workers/workers",
  new URL("", window.location.href).href,
  false,
);

MonacoEditorLanguageClientWrapper.addMonacoStyles("monaco-editor-styles");

const client = new MonacoEditorLanguageClientWrapper();
const editorConfig = client.getEditorConfig();
editorConfig.setMainLanguageId("ase-robot");
// WARNING Dependent of your project

editorConfig.setMonarchTokensProvider(monarchSyntax);

let numScene = 1;
let code = `let void entry () {
  setSpeed(150 in mm)
  var number count = 0
  loop count < 5
  {
    count = count + 1
    square(count)
  }
}

let void square(number count){
  var number dist = 200 + 10 * count
  Forward dist in cm
  ClockRight 90
  Forward dist in cm
  ClockRight 90
  Forward dist in cm
  ClockRight 90
  Forward dist in cm
  ClockRight 90
}`;

editorConfig.setMainCode(code);

editorConfig.theme = "vs-dark";
editorConfig.useLanguageClient = true;
editorConfig.useWebSocket = false;

const workerURL = new URL("./ase-robot-server-worker.js", import.meta.url); // WARNING Dependent of your project
console.log(workerURL.href);

const lsWorker = new Worker(workerURL.href, {
  type: "classic",
  name: "AseRobot Language Server",
});
client.setWorker(lsWorker);

// keep a reference to a promise for when the editor is finished starting, we'll use this to setup the canvas on load
let startingPromise = client.startEditor(
  document.getElementById("monaco-editor-root"),
);

// Modals for TypeChecking
var errorModal = document.getElementById("errorModal");
var validModal = document.getElementById("validModal");
var closeError = document.querySelector("#errorModal .close");
var closeValid = document.querySelector("#validModal .close");
closeError.onclick = function () {
  errorModal.style.display = "none";
};
closeValid.onclick = function () {
  validModal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == validModal) {
    validModal.style.display = "none";
  }
  if (event.target == errorModal) {
    errorModal.style.display = "none";
  }
};

// Simulation utility function
const setupSimulator = (scene) => {
  const wideSide = max(scene.size.x, scene.size.y);
  let factor = 1000 / wideSide;

  window.scene = scene;

  scene.entities.forEach((entity) => {
    if (entity.type === "Wall") {
      window.entities.push(
        new Wall(
          entity.pos.x * factor,
          entity.pos.y * factor,
          entity.size.x * factor,
          entity.size.y * factor,
        ),
      );
    }
    if (entity.type === "Block") {
      window.entities.push(
        new Block(
          entity.pos.x * factor,
          entity.pos.y * factor,
          entity.size.x * factor,
          entity.size.y * factor,
        ),
      );
    }
  });

  window.p5robot = new Robot(
    factor,
    scene.robot.pos.x,
    scene.robot.pos.y,
    scene.robot.size.x * factor,
    scene.robot.size.y * factor,
    scene.robot.rad,
  );
};

const parseAndValidate = async () => {
  console.info("validating current code...");
  const value = client.editor.getValue();
  const parseAndValidateResult = await vscode.commands.executeCommand(
    "parseAndValidate",
    value,
  );
  const modal = document.getElementById("validModal");
  modal.style.display = "block";
};

const typecheck = async () => {
  console.info("typechecking current code...");

  const value = client.editor.getValue();
  const typecheckResult = await vscode.commands.executeCommand(
    "typeCheck",
    value,
  );

  if (errors.length > 0) {
    const modal = document.getElementById("errorModal");
    modal.style.display = "block";
  } else {
    const modal = document.getElementById("validModal");
    modal.style.display = "block";
  }
};

const execute = async () => {
  console.info("running current code...");
  const value = client.editor.getValue();
  //let scene = new BaseScene();
  //setupSimulator(scene);
  const scene = await vscode.commands.executeCommand(
    "interprate",
    value,
    window.scene,
    numScene,
  );
  setupSimulator(scene);
};

const selectScene = async () => {
  var e = document.getElementById("scene-select");
  numScene = e.value;
  console.log("selectScene : ", numScene);
  let newCode;
  if (numScene == 1) {
    console.log("code 1");
    newCode = `let void entry () {
  setSpeed(150 in mm)
  var number count = 0
  loop count < 5
  {
      count = count + 1
      square(count)
  }
}

let void square(number count){
  var number dist = 200 + 10 * count
  Forward dist in cm
  ClockRight 90
  Forward dist in cm
  ClockRight 90
  Forward dist in cm
  ClockRight 90
  Forward dist in cm
  ClockRight 90
}`;
  } else if (numScene == 2) {
    console.log("code 2");
    newCode = `let void entry () {
  setSpeed(150 in mm)
  var number count = 0
  loop count < 8 {
    loop getDistance() > 250
    {
      Forward 30 in cm
    }
    ClockRight 90
    count = count + 1
  }
}

`;
  } else if (numScene == 3) {
    newCode = `let void entry () {
  setSpeed(150 in mm)
  var number count = 0
  loop count < 10
  {
      count = count + 1
      Forward getTimestamp()/6 in cm
      ClockRight 90
  }
}`;
  } else if (numScene == 4) {
    newCode = `let void entry () {
  var number count = 0
  setSpeed(14 in cm)
  loop count < 38
  {	
    Forward 10 in cm
    ClockRight 10

    count = count + 1
  }
  count = 0
  loop count < 38
  {	
    Backward 10 in cm
    ClockRight 10

    count = count + 1
  }
  count = 0
  loop count < 38
  {	
    Right 10 in cm
    ClockRight 10

    count = count + 1
  }
    count = 0
  loop count < 38
  {	
    Left 10 in cm
    ClockRight 10

    count = count + 1
  }
}
`;} else if (numScene == 5) {
    newCode = `let void entry () {
  square()
  ClockRight 180
  Forward 1500 in mm
  circle()
  circle()
}

let void circle() {
  var number count = 0
  loop count < 20
  {	
    Forward 400 in mm
    ClockRight 18
    count = count + 1
  }
}

let void square() {
  setSpeed(15 in cm)
  var number count = 0
  loop count < 4
  {	
    Forward 3000 in mm
    ClockRight 90

    count = count + 1
  }
}`;
  } else if (numScene == 6) {
    newCode = `let void entry() {
  var number counter = 0
  var number speed = 10
  var bool obstacleDetected = false

  setSpeed(speed in cm)

  loop counter < 100 {
    obstacleDetected = detectObstacle()
    if (obstacleDetected) {
      avoidObstacle()
    } else {
      Forward 10 in cm
      ClockRight 10
    }
    counter = counter + 1
  }

  Backward 100 in cm
  ClockRight 180
  Forward 100 in cm
}

  let bool detectObstacle() {
    var number distance = getDistance()
    if (distance < 20) {
      return true
    } else {
      return false
    }
  }

  let void avoidObstacle(){
    Backward 15 in cm
    ClockRight 90
    Forward 10 in cm
  }
`} else if (numScene == 7) {
    newCode = `let void entry() {
  var number counter = 0
  var number speed = 12
  var bool obstacleDetected = false
  var number batteryLevel = 100
  var number obstacleCount = 0

  setSpeed(speed in cm)

  loop counter < 200 {
    obstacleDetected = detectObstacle()
    if (obstacleDetected and (batteryLevel > 10)) {
      avoidObstacle()
      obstacleCount = obstacleCount + 1
      batteryLevel = batteryLevel - 5
    } else if (batteryLevel < 10) {
      conserveBattery()
    } else {
      Forward 50 in cm
      ClockRight counter / 15
      batteryLevel = batteryLevel - 1
    }
    counter = counter + 1
  }

  if (obstacleCount > 20 or batteryLevel < 15) {
    ReturnToBase()
  } else {
    ExploreFurther()
  }
}

let bool detectObstacle() {
  var number distance = 100
  var number angle = 20
  return ((distance < 150) and (angle > 0) and (angle < 90))
}

let void avoidObstacle() {
  Backward 100 in cm
  ClockRight 45
  Forward 70 in cm
  ClockRight 90
}

let void conserveBattery() {
  setSpeed(5 in cm)
  Forward 30 in cm
  ClockRight 45
}

let void ReturnToBase() {
  Backward 200 in cm
  ClockRight 180
  Forward 300 in cm
}

let void ExploreFurther() {
  Forward 200 in cm
  ClockRight 90
  Forward 100 in cm
  ClockRight 90
}`;}
  const editor = client.getEditor();
  console.log(editor.getValue());
  if (editor) {
    console.log("normally changed...");
    editor.getModel().setValue(newCode);
  } else {
    console.error("L'éditeur Monaco n'est pas initialisé !");
  }
  window.setup();
  console.log(editor.getValue());
};

window.parseAndValidate = parseAndValidate;
window.typecheck = typecheck;
window.execute = execute;
window.selectScene = selectScene;
