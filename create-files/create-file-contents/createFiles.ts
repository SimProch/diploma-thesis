import * as fs from "fs-extra";
import * as path from "path";
import { CommandDefinitionProperties, InterfaceProperties, ModelProperties } from "../../types/mapping.types";
import getCommandDefinition from "./createCommandDefinition";
import getInterface from "./createInterface";
import getModel from "./createModel";

const rootDirectory = path.dirname(require.main.filename);

export function createTsInterface(interfaceName: string, props: InterfaceProperties[]): void {
	const filePath = `${rootDirectory}/result/${interfaceName}.ts`;
	deleteFileIfExists(filePath);
	const newInterface = getInterface(interfaceName, props);
	fs.appendFile(filePath, newInterface, (err) => postCreateCallback(err, filePath));
}
export function createCsModel(modelName: string, props: ModelProperties[]): void {
	const filePath = `${rootDirectory}/result/${modelName}.cs`;
	deleteFileIfExists(filePath);
	const newModel = getModel(modelName, props);
	fs.appendFile(filePath, newModel, (err) => postCreateCallback(err, filePath));
}
export function createCommandDefinition(cdName: string, schema: string, spName: string, props: CommandDefinitionProperties[]): void {
	const filePath = `${rootDirectory}/result/${cdName}.cs`;
	deleteFileIfExists(filePath);
	const newModel = getCommandDefinition(schema, spName, props);
	fs.appendFile(filePath, newModel, (err) => postCreateCallback(err, filePath));
}

function deleteFileIfExists(fileName: string): void {
	if (fs.existsSync(fileName)) fs.unlinkSync(fileName);
}
function postCreateCallback(err: NodeJS.ErrnoException, fileName: string) {
	if (err) throw err;
	console.log(`Created ${fileName}`);
}
