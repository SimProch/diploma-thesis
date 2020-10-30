import { ModelProperties } from "./types";

const LINE_END = "\r\n";

export default function createModel(interfaceName: string, properties: ModelProperties[]): string {
    const interfaceStart = `public class ${interfaceName} {${LINE_END}`;
    const interfaceEnd = `}`;
    let typing = "";
    properties.forEach(property => {
        typing += addTypeLine(property.propertyName, property.typeName, property.isNullable);
    })
    const result = interfaceStart + typing + interfaceEnd;
    return result;
}


function addTypeLine(propertyName: string, typeName: string, isNullable: boolean): string {
    const typingToAdd = `    public ${typeName}${isNullable ? "?" : ""} ${propertyName} { get; set; }${LINE_END}`;
    return typingToAdd;
}

