#!/usr/bin/env node
import { MethodCallType } from "../../types/cli.types";
import { CommandDefinitionProperties, InterfaceProperties, ModelProperties } from "../../types/mapping.types";
import { getControllerArguments } from "./types/file-contents.types";
export declare function createTsInterface(interfaceName: string, props: InterfaceProperties[]): Promise<string | null>;
export declare function createCsModel(modelName: string, props: ModelProperties[]): Promise<string | null>;
export declare function createDataAccess(methodType: MethodCallType, schema: string, spName: string, props: CommandDefinitionProperties[], modelProps: ModelProperties[]): Promise<string>;
export declare function createController(args: getControllerArguments): Promise<string>;
