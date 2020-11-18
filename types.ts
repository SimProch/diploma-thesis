export type TSType = 'string' | 'number' | 'boolean' | 'date';
export type CSStringType = 'string' | 'char';
export type CSNumberType = 'int' | 'byte' | 'double' | 'float';
export type CSDateType = 'DateTime';
export type CSBoolType = 'bool';
export type CSType = CSStringType | CSNumberType | CSDateType | CSBoolType;

export interface InterfaceProperties {
	propertyName: string;
	typeName: TSType;
	isNullable: boolean;
}

export interface ModelProperties {
	propertyName: string;
	typeName: CSType;
	isNullable: boolean;
}


export type MethodCallType = 'ToDynamic';

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
	httpMethodType: "POST" | "GET",
	route: string;
}

export interface Configuration {
	global: GlobalConfiguration;
	[key: string]: CommandArguments;
}
