export type MethodCallType = "ToDynamic";

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