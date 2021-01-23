#!/usr/bin/env node
import { InputList } from "../types/queries.types";
export declare function listProcedureInput(databaseName: string, schemaName: string, storedProcedureName: string): Promise<InputList>;
