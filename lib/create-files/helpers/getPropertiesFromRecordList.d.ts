#!/usr/bin/env node
import { ModelProperties, InterfaceProperties, CommandDefinitionProperties } from "../../types/mapping.types";
import { Output, Input } from "../../types/queries.types";
export declare function getCommandDefinitionPropertiesFromRecordList(res: (Output | Input)[]): CommandDefinitionProperties[];
export declare function getModelPropertiesFromRecordList(res: (Output | Input)[]): ModelProperties[];
export declare function getInterfacePropertiesFromRecordList(res: (Output | Input)[]): InterfaceProperties[];
