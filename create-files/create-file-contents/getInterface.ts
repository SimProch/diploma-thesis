#!/usr/bin/env node

import { TSType } from "../../types/mapping.types";
import { getInterfaceArguments } from "./types/file-contents.types";

const LINE_END = "\r\n";

export default function getInterface(args: getInterfaceArguments): string {
	const interfaceStart = `export interface ${args.interfaceName} {${LINE_END}`;
	let typing = "";
	args.properties.forEach((property) => {
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
