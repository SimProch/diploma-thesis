import { CSType, ModelProperties } from "../../types/mapping.types";

const LINE_END = "\r\n";

export default function getModel(interfaceName: string, properties: ModelProperties[]): string {
	const modelStart = `public class ${interfaceName} {${LINE_END}`;
	let typing = "";
	properties.forEach((property) => {
		typing += addTypeLine(property.propertyName, property.typeName, property.isNullable);
	});
	const modelEnd = `}`;
	const result = modelStart + typing + modelEnd;
	return result;
}

function addTypeLine(propertyName: string, typeName: CSType, isNullable: boolean): string {
	const typingToAdd = `    public ${typeName}${isNullable ? "?" : ""} ${propertyName} { get; set; }${LINE_END}`;
	return typingToAdd;
}
