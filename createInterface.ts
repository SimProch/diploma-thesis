import { InterfaceProperties } from './types';

const LINE_END = '\r\n';

export default function createInterface(interfaceName: string, properties: InterfaceProperties[]): string {
	const interfaceStart = `export interface ${interfaceName} {${LINE_END}`;
	const interfaceEnd = `}`;
	let typing = '';
	properties.forEach((property) => {
		typing += addTypeLine(property.propertyName, property.typeName, property.isNullable);
	});
	const result = interfaceStart + typing + interfaceEnd;
	return result;
}

function addTypeLine(propertyName: string, typeName: string, isNullable: boolean): string {
	const typingToAdd = `    ${propertyName}${isNullable ? '?' : ''}: ${typeName};${LINE_END}`;
	return typingToAdd;
}
