#!/usr/bin/env node
export declare type CSType = "string" | "int" | "Int16" | "Int64" | "byte" | "Guid" | "DateTime" | "double" | "decimal" | "bool";
export declare type TSType = "string" | "number" | "date" | "boolean";
export declare type DBType = keyof typeof DbToCsCommandDefinition;
export declare type DataAccessEnumType = "BigInt" | "VarBinary" | "Bit" | "Char" | "DateTime" | "DateTime2" | "DateTimeOffset" | "Decimal" | "Float" | "Binary" | "Int" | "Money" | "NChar" | "NText" | "NVarChar" | "Real" | "Timestamp" | "SmallInt" | "SmallMoney" | "Variant" | "Text" | "Time" | "TinyInt" | "UniqueIdentifier" | "VarChar" | "Xml";
export interface CommandDefinitionProperties {
    propertyName: string;
    typeName: DataAccessEnumType;
    isNullable: boolean;
    maxLength: number;
}
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
export declare enum DbToCsharpModel {
    varchar = "string",
    nvarchar = "string",
    int = "int",
    smallint = "Int16",
    tinyint = "byte",
    bigint = "Int64",
    uniqueidentifier = "Guid",
    date = "DateTime",
    datetime = "DateTime",
    datetime2 = "DateTime",
    float = "double",
    decimal = "decimal",
    numeric = "decimal",
    money = "decimal",
    bit = "bool"
}
export declare enum DbToTsInterface {
    varchar = "string",
    nvarchar = "string",
    int = "number",
    smallint = "number",
    tinyint = "number",
    bigint = "number",
    uniqueidentifier = "string",
    date = "Date",
    datetime = "Date",
    datetime2 = "Date",
    float = "number",
    decimal = "number",
    numeric = "number",
    money = "number",
    bit = "boolean"
}
export declare enum DbToCsCommandDefinition {
    bigint = "BigInt",
    binary = "VarBinary",
    bit = "Bit",
    char = "Char",
    date = "DateTime",
    datetime = "DateTime",
    datetime2 = "DateTime2",
    datetimeoffset = "DateTimeOffset",
    decimal = "Decimal",
    float = "Float",
    image = "Binary",
    int = "Int",
    money = "Money",
    nchar = "NChar",
    ntext = "NText",
    numeric = "Decimal",
    nvarchar = "NVarChar",
    real = "Real",
    rowversion = "Timestamp",
    smalldatetime = "DateTime",
    smallint = "SmallInt",
    smallmoney = "SmallMoney",
    sql_variant = "Variant",
    text = "Text",
    time = "Time",
    timestamp = "Timestamp",
    tinyint = "TinyInt",
    uniqueidentifier = "UniqueIdentifier",
    varbinary = "VarBinary",
    varchar = "VarChar",
    xml = "Xml"
}
export declare function mapDbToCsCommandDefinition(key: DBType): string;
export declare function mapDbToTsTsInterface(key: DBType): string;
export declare function mapDbToCsModel(key: DBType): string;
