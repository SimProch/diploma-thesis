#!/usr/bin/env node
import * as sql from "mssql/msnodesqlv8";
import { SchemaQueryResult } from "../types/queries.types";
export declare function listSchemas(databaseName: string): Promise<sql.IRecordSet<SchemaQueryResult>>;
