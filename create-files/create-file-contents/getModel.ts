import { CSType } from "../../types/mapping.types";
import { getModelArguments } from "./types/file-contents.types";

const LINE_END = "\r\n";

export default function getModel(args: getModelArguments): string {
	const modelStart = `public class ${args.modelName} {${LINE_END}`;
	let typing = "";
	args.properties.forEach((property) => {
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
