import { Program } from "../language/visitor.js";
import * as fs from "node:fs";
import { CompositeGeneratorNode, NL, toString } from "langium";
import * as path from "node:path";
import { extractDestinationAndName } from "./cli-util.js";
import { Compiler } from "../semantics/compiler.js";
import { typeChecking } from "../semantics/typeChecking.js";

export function generateJavaScript(
  program: Program,
  filePath: string,
  destination: string | undefined,
): string {
  const data = extractDestinationAndName(filePath, destination);
  const generatedFilePath = `${path.join(data.destination, data.name)}.js`;

  const fileNode = new CompositeGeneratorNode();
  fileNode.append('"use strict";', NL, NL);
  program.Func.forEach((func) =>
    fileNode.append(`console.log('function : ${func.name}!');`, NL),
  );

  if (!fs.existsSync(data.destination)) {
    fs.mkdirSync(data.destination, { recursive: true });
  }
  fs.writeFileSync(generatedFilePath, toString(fileNode));
  return generatedFilePath;
}

export function compileArduino(program: Program, fileName: string) {
  const compiler = new Compiler();
  const typeChecker = new typeChecking();
  program.accept(typeChecker);
  let arduino_string = program.accept(compiler);

  const data = extractDestinationAndName(fileName, ".");
  const generatedFilePath = `${path.join(".", data.name)}.ino`;

  fs.writeFileSync(generatedFilePath, arduino_string);
  console.log("Compiled successfully !");
}
