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

export interface ConfigureArguments {
	server: string;
	database: string;
	schema: string;
}