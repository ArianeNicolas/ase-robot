import { AstNode, EmptyFileSystem, LangiumServices } from "langium";
import { URI } from "vscode-uri";
import { createAseRobotServices } from "../language/ase-robot-module.js";
import { Program } from "../language/visitor.js"
import chalk from "chalk";
import { Interpreter } from "../semantics/interpreter.js";
import { Scene } from "./simulator/scene.js";

/**
 * Extracts an AST node from a virtual document, represented as a string
 * @param content Content to create virtual document from
 * @param services For constructing & building a virtual document
 * @returns A promise for the parsed result of the document
 */
 async function extractAstNodeFromString<T extends AstNode>(content: string, services: LangiumServices): Promise<T> {
    // create a document from a string instead of a file
    const doc = services.shared.workspace.LangiumDocumentFactory.fromString(content, URI.parse('memory://aserobot.document'));
    // proceed with build & validation
    await services.shared.workspace.DocumentBuilder.build([doc]);
    // get the parse result (root of our AST)
    
    let parseResult = doc.parseResult;
    if (parseResult.lexerErrors.length === 0 && 
        parseResult.parserErrors.length === 0
    ) {
        console.log(chalk.green(`Parsed and validated your code successfully!`));
    } else {
        console.log(chalk.red(`Failed to parse and validate your codes!`));
    }

    return parseResult?.value as T;
}

export async function parseAndValidate (aserobot: string): Promise<Object> {
    const services = createAseRobotServices(EmptyFileSystem).AseRobot;
    const model = await extractAstNodeFromString<Program>(aserobot, services);
    return Promise.resolve(model);
}

export async function interprate(aserobot: string, scene: Scene): Promise<Object>{
    const services = createAseRobotServices(EmptyFileSystem).AseRobot;
    const model = await extractAstNodeFromString<Program>(aserobot, services);
    const interpreter = new Interpreter(scene);
    console.log("before accept");
    model.accept(interpreter);
    return Promise.resolve(model);
}