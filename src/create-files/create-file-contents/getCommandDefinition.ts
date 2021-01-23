#!/usr/bin/env node

import { DataAccessEnumType } from "../../types/mapping.types";
import { getCommandDefinitionArguments } from "./types/file-contents.types";

const LINE_END = "\r\n";

export default function getCommandDefinition(args: getCommandDefinitionArguments): string {
	const commandDefinitionStart = `    private static CommandDefinition ${args.spName} = CommandDefinition.DefineSp({${LINE_END}`;
	let typing = `        "${args.schema}.${args.spName}"${LINE_END}`;
	args.properties.forEach((property) => {
		typing += addTypeLine(property.propertyName, property.typeName, property.maxLength);
	});
	const commandDefinitionEnd = `    );`;
	const result = commandDefinitionStart + typing + commandDefinitionEnd;
	return result;
}

function addTypeLine(propertyName: string, typeName: DataAccessEnumType, maxLength: number): string {
	const specifyMaxLength = typeName === "NVarChar" || typeName === "VarChar";
	const typingToAdd = `        "@${propertyName}", SqlDbType.${typeName}${specifyMaxLength ? ", " + maxLength + "," : ""}${LINE_END}`;
	return typingToAdd;
}
