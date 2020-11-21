import { MethodCallType } from "../../../types/cli.types";
import { CommandDefinitionProperties, InterfaceProperties, ModelProperties } from "../../../types/mapping.types";

export interface getInterfaceArguments {
	interfaceName: string;
	properties: InterfaceProperties[];
}

export interface getModelArguments {
	modelName: string;
	properties: ModelProperties[];
}

export interface getCommandDefinitionArguments {
	schema: string;
	spName: string;
	properties: CommandDefinitionProperties[];
}

export interface getDataAccessArguments {
	methodType: MethodCallType;
	spName: string;
	modelName: string;
	properties: ModelProperties[];
}

export interface getControllerArguments {
	methodType: MethodCallType;
    outputModelName: string;
    inputModelName: string;
	classMethodName: string;
    routePath: string;
    dataAccessName: string;
	requestType: "POST" | "GET";
	properties: ModelProperties[];
}
