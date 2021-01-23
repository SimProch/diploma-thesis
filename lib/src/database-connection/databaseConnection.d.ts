#!/usr/bin/env node
import * as sql from "mssql/msnodesqlv8";
export declare const DEFAULT_DB_NAME = "master";
export declare const DEFAULT_SERVER_NAME: string;
export declare function initSqlConfig(): void;
export declare function updateSqlConfig(server: string, database: string): void;
export declare function tryConnect(): Promise<sql.ConnectionPool>;
