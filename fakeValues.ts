import { InterfaceProperties, ModelProperties } from "./types/mapping.types";

export const interfaceProperties: InterfaceProperties[] = [
	{
		propertyName: 'aStringProperty',
		typeName: 'string',
		isNullable: false,
	},
	{
		propertyName: 'aNumberProperty',
		typeName: 'number',
		isNullable: true,
	},
	{
		propertyName: 'aBooleanProperty',
		typeName: 'boolean',
		isNullable: false,
	},
];
export  const modelProperties: ModelProperties[] = [
	{
		propertyName: 'aStringProperty',
		typeName: 'string',
		isNullable: false,
	},
	{
		propertyName: 'aNumberProperty',
		typeName: 'int',
		isNullable: true,
	},
	{
		propertyName: 'aBooleanProperty',
		typeName: 'bool',
		isNullable: false,
	},
];