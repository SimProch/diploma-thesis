import { DBType } from "./mapping.types";

export type DatabaseQueryResult = Database[];
export interface Database {
    name: string;
}
export type SchemaQueryResult = Schema[];
export interface Schema {
    SCHEMA_NAME: string;
}
export type StoredProcedureQueryResult = Database[];
export interface Database {
    ROUTINE_NAME: string;
}
export type OutputQueryResult = DbDescriptionType[];
export type InputQueryResult = DbDescriptionType[];
export type TypeQueryResult = DbDescriptionType[];
export interface DbDescriptionType {
    name: string;
    system_type_id: number;
}

export type OutputList = Output[];
interface Output {
    outputName: string;
    variableName: DBType;
}

export type InputList = Input[];
export interface Input {
    inputName: string;
    variableName: DBType;
}