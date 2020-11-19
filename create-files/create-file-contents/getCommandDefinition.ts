import { CommandDefinitionProperties, DataAccessEnumType, DBType } from "../../types/mapping.types";

const LINE_END = "\r\n";

export default function getCommandDefinition(schema: string, spName: string, properties: CommandDefinitionProperties[]): string {
	const commandDefinitionStart = `    private static CommandDefinition ${spName} = CommandDefinition.DefineSp({${LINE_END}`;
	let typing = `        "${schema}.${spName}"${LINE_END}`;
	properties.forEach((property) => {
		typing += addTypeLine(property.propertyName, property.typeName, property.maxLength);
	});
	const commandDefinitionEnd = `    );`;
	const result = commandDefinitionStart + typing + commandDefinitionEnd;
	return result;
}

function addTypeLine(propertyName: string, typeName: DataAccessEnumType, maxLength: number): string {
	const specifyMaxLength = typeName === "NVarChar" || typeName === "VarChar";
	const typingToAdd = `        "@${propertyName}", SqlDbType.${typeName}${specifyMaxLength ? ", " + maxLength + ",": ""}${LINE_END}`;
	return typingToAdd;
}
