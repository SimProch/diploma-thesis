#!/usr/bin/env node
import * as sql from "mssql/msnodesqlv8";
import { StoredProcedureQueryResult } from "../types/queries.types";
export declare function listStoredProcedures(databaseName: string, schemaName: string): Promise<sql.IRecordSet<StoredProcedureQueryResult>>;
