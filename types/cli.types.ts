#!/usr/bin/env node

type NonTypedCallTypes = "ExecuteToDynamic" | "ExecuteToDynamicAsync";
type TypedCallTypes = "ExecuteToObjects" | "ExecuteToObjectsAsync" | "ExecuteToCacheAsync";
type VoidCallTypes = "ExecuteNonQuery";
export type MethodCallType = NonTypedCallTypes | TypedCallTypes | VoidCallTypes;

export interface GlobalConfiguration {
	server: string;
	database: string;
	schema: string;
	callType: MethodCallType;
	generateController: boolean;
	generateDataAccess: boolean;
	generateModel: boolean;
	generateInterface: boolean;
	dataAccessPath: string;
	controllerPath: string;
	[key: string]: any; // To compile
}

export interface CommandArguments extends GlobalConfiguration {
	storedProcedureName: string;
	httpMethodType: "POST" | "GET";
	route: string;
}

interface CommandConfiguration {
	[key: string]: CommandArguments;
}

export type Configuration = CommandConfiguration & {
	global: GlobalConfiguration;
};
