#!/usr/bin/env node
import { DBType } from "./mapping.types";
export declare type DatabaseQueryResult = Database[];
export interface Database {
    name: string;
}
export declare type SchemaQueryResult = Schema[];
export interface Schema {
    SCHEMA_NAME: string;
}
export declare type StoredProcedureQueryResult = Database[];
export interface Database {
    ROUTINE_NAME: string;
}
export declare type OutputQueryResult = DbDescriptionType[];
export declare type InputQueryResult = DbDescriptionType[];
export declare type TypeQueryResult = DbDescriptionType[];
export interface DbDescriptionType {
    name: string;
    system_type_id: number;
    max_length: number;
    is_nullable: boolean;
}
export declare type OutputList = Output[];
export interface Output {
    outputName: string;
    variableName: DBType;
    maxLength: number;
    isNullable: boolean;
}
export declare type InputList = Input[];
export interface Input {
    inputName: string;
    variableName: DBType;
    maxLength: number;
    isNullable: boolean;
}
