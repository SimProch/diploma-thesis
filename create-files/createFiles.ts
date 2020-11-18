import * as fs from 'fs-extra';
import * as path from 'path';
import { InterfaceProperties, ModelProperties } from '../types/mapping.types';
import createInterface from './create-file-contents/createInterface';
import createModel from './create-file-contents/createModel';

const rootDirectory = path.dirname(require.main.filename);

export function createTsInterface(interfaceName: string, props: InterfaceProperties[]): void {
	const filePath = `${rootDirectory}/result/${interfaceName}.ts`;
	deleteFileIfExists(filePath);
	const newInterface = createInterface(interfaceName, props);
	fs.appendFile(filePath, newInterface, (err) => postCreateCallback(err, newInterface));
}
export function createCsModel(modelName: string, props: ModelProperties[]): void {
	const filePath = `${rootDirectory}/result/${modelName}.cs`;
	deleteFileIfExists(filePath);
	const newModel = createModel(modelName, props);
	fs.appendFile(filePath, newModel, (err) => postCreateCallback(err, newModel));
}
function deleteFileIfExists(fileName: string): void {
	if (fs.existsSync(fileName))
		fs.unlinkSync(fileName);
}
function postCreateCallback(err: NodeJS.ErrnoException, newItem: string) {
	if (err)
		throw err;
	console.log(`Created ${newItem}`);
}
