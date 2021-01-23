#!/usr/bin/env node
declare type NonTypedCallTypes = "ExecuteToDynamic" | "ExecuteToDynamicAsync";
declare type TypedCallTypes = "ExecuteToObjects" | "ExecuteToObjectsAsync" | "ExecuteToCacheAsync";
declare type VoidCallTypes = "ExecuteNonQuery";
export declare type MethodCallType = NonTypedCallTypes | TypedCallTypes | VoidCallTypes;
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
export declare type Configuration = CommandConfiguration & {
    global: GlobalConfiguration;
};
export {};
