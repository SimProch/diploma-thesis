#!/usr/bin/env node
import * as sql from "mssql/msnodesqlv8";
import { DatabaseQueryResult } from "../types/queries.types";
export declare function listDatabases(): Promise<sql.IRecordSet<DatabaseQueryResult>>;
