import { ModelProperties, mapDbToCsModel, InterfaceProperties, mapDbToTsTsInterface, CommandDefinitionProperties } from "../../types/mapping.types";
import { Output, Input } from "../../types/queries.types";

export function getCommandDefinitionPropertiesFromRecordList(res: (Output | Input)[]): CommandDefinitionProperties[] {
	return res.map((i) => {
		const name = (i as Output).outputName ? (i as Output).outputName : (i as Input).inputName;
		return <CommandDefinitionProperties>{
			propertyName: name,
			typeName: mapDbToCsModel(i.variableName),
			isNullable: i.isNullable,
		};
	});
}

export function getModelPropertiesFromRecordList(res: (Output | Input)[]): ModelProperties[] {
	return res.map((i) => {
		const name = (i as Output).outputName ? (i as Output).outputName : (i as Input).inputName;
		return <ModelProperties>{
			propertyName: name,
			typeName: mapDbToCsModel(i.variableName),
			isNullable: i.isNullable,
		};
	});
}

export function getInterfacePropertiesFromRecordList(res: (Output | Input)[]): InterfaceProperties[] {
	return res.map((i) => {
		const name = (i as Output).outputName ? (i as Output).outputName : (i as Input).inputName;
		return <InterfaceProperties>{
			propertyName: name,
			typeName: mapDbToTsTsInterface(i.variableName),
			isNullable: i.isNullable,
		};
	});
}
