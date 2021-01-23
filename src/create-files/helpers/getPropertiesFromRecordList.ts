#!/usr/bin/env node

import {
	ModelProperties,
	mapDbToCsModel,
	InterfaceProperties,
	mapDbToTsTsInterface,
	CommandDefinitionProperties,
	mapDbToCsCommandDefinition,
} from "../../types/mapping.types";
import { Output, Input } from "../../types/queries.types";

export function getCommandDefinitionPropertiesFromRecordList(res: (Output | Input)[]): CommandDefinitionProperties[] {
	return res.map((i) => {
		const name = (i as Output).outputName ? (i as Output).outputName : (i as Input).inputName;
		return <CommandDefinitionProperties>{
			propertyName: name.charAt(0) === "@" ? name.slice(1) : name,
			typeName: mapDbToCsCommandDefinition(i.variableName),
			isNullable: i.isNullable,
			maxLength: i.maxLength,
		};
	});
}

export function getModelPropertiesFromRecordList(res: (Output | Input)[]): ModelProperties[] {
	return res.map((i) => {
		const name = (i as Output).outputName ? (i as Output).outputName : (i as Input).inputName;
		return <ModelProperties>{
			propertyName: name.charAt(0) === "@" ? name.slice(1) : name,
			typeName: mapDbToCsModel(i.variableName),
			isNullable: i.isNullable,
			maxLength: i.maxLength,
		};
	});
}

export function getInterfacePropertiesFromRecordList(res: (Output | Input)[]): InterfaceProperties[] {
	return res.map((i) => {
		const name = (i as Output).outputName ? (i as Output).outputName : (i as Input).inputName;
		return <InterfaceProperties>{
			propertyName: name.charAt(0) === "@" ? name.slice(1) : name,
			typeName: mapDbToTsTsInterface(i.variableName),
			isNullable: i.isNullable,
			maxLength: i.maxLength,
		};
	});
}
