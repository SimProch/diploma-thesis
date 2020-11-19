import { InterfaceProperties, TSType } from "../../types/mapping.types";

const LINE_END = "\r\n";

export default function getInterface(interfaceName: string, properties: InterfaceProperties[]): string {
	const interfaceStart = `export interface ${interfaceName} {${LINE_END}`;
	let typing = "";
	properties.forEach((property) => {
		typing += addTypeLine(property.propertyName, property.typeName, property.isNullable);
	});
	const interfaceEnd = `}`;
	const result = interfaceStart + typing + interfaceEnd;
	return result;
}

function addTypeLine(propertyName: string, typeName: TSType, isNullable: boolean): string {
	const typingToAdd = `    ${propertyName}${isNullable ? "?" : ""}: ${typeName};${LINE_END}`;
	return typingToAdd;
}
