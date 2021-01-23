#!/usr/bin/env node
import { OutputList } from "../types/queries.types";
export declare function listProcedureOutput(databaseName: string, schemaName: string, storedProcedureName: string): Promise<OutputList>;
