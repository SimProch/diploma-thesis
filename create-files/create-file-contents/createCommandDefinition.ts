import { CommandDefinitionProperties, DataAccessEnumType, DBType } from "../../types/mapping.types";

const LINE_END = '\r\n';

export default function getCommandDefinition(schema: string, spName: string, properties: CommandDefinitionProperties[]): string {
    const interfaceStart = `private static CommandDefinition ${spName} = CommandDefinition.DefineSp({${LINE_END}`;
    const procedure = `    "${schema}.${spName}"${LINE_END}`
    const version = `    "@version_id", SqlDbType.Int, ${LINE_END}`
	let typing = procedure + version;
	properties.forEach((property) => {
        typing += addTypeLine(property.propertyName, property.typeName, property.maxLength);
	});
    const interfaceEnd = `);`;
	const result = interfaceStart + typing + interfaceEnd;
	return result;
}

function addTypeLine(propertyName: string, typeName: DataAccessEnumType, maxLength: number): string {
    const specifyMaxLength = typeName === "NVarChar" || typeName === "VarChar";
    const typingToAdd = `    "${propertyName}", SqlDbType.${typeName} ${specifyMaxLength ? ", " + maxLength : ""},${LINE_END}`;
	return typingToAdd;
}