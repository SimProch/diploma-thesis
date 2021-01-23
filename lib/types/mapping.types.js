#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapDbToCsModel = exports.mapDbToTsTsInterface = exports.mapDbToCsCommandDefinition = exports.DbToCsCommandDefinition = exports.DbToTsInterface = exports.DbToCsharpModel = void 0;
var DbToCsharpModel;
(function (DbToCsharpModel) {
    DbToCsharpModel["varchar"] = "string";
    DbToCsharpModel["nvarchar"] = "string";
    DbToCsharpModel["int"] = "int";
    DbToCsharpModel["smallint"] = "Int16";
    DbToCsharpModel["tinyint"] = "byte";
    DbToCsharpModel["bigint"] = "Int64";
    DbToCsharpModel["uniqueidentifier"] = "Guid";
    DbToCsharpModel["date"] = "DateTime";
    DbToCsharpModel["datetime"] = "DateTime";
    DbToCsharpModel["datetime2"] = "DateTime";
    DbToCsharpModel["float"] = "double";
    DbToCsharpModel["decimal"] = "decimal";
    DbToCsharpModel["numeric"] = "decimal";
    DbToCsharpModel["money"] = "decimal";
    DbToCsharpModel["bit"] = "bool";
})(DbToCsharpModel = exports.DbToCsharpModel || (exports.DbToCsharpModel = {}));
var DbToTsInterface;
(function (DbToTsInterface) {
    DbToTsInterface["varchar"] = "string";
    DbToTsInterface["nvarchar"] = "string";
    DbToTsInterface["int"] = "number";
    DbToTsInterface["smallint"] = "number";
    DbToTsInterface["tinyint"] = "number";
    DbToTsInterface["bigint"] = "number";
    DbToTsInterface["uniqueidentifier"] = "string";
    DbToTsInterface["date"] = "Date";
    DbToTsInterface["datetime"] = "Date";
    DbToTsInterface["datetime2"] = "Date";
    DbToTsInterface["float"] = "number";
    DbToTsInterface["decimal"] = "number";
    DbToTsInterface["numeric"] = "number";
    DbToTsInterface["money"] = "number";
    DbToTsInterface["bit"] = "boolean";
})(DbToTsInterface = exports.DbToTsInterface || (exports.DbToTsInterface = {}));
var DbToCsCommandDefinition;
(function (DbToCsCommandDefinition) {
    DbToCsCommandDefinition["bigint"] = "BigInt";
    DbToCsCommandDefinition["binary"] = "VarBinary";
    DbToCsCommandDefinition["bit"] = "Bit";
    DbToCsCommandDefinition["char"] = "Char";
    DbToCsCommandDefinition["date"] = "DateTime";
    DbToCsCommandDefinition["datetime"] = "DateTime";
    DbToCsCommandDefinition["datetime2"] = "DateTime2";
    DbToCsCommandDefinition["datetimeoffset"] = "DateTimeOffset";
    DbToCsCommandDefinition["decimal"] = "Decimal";
    DbToCsCommandDefinition["float"] = "Float";
    DbToCsCommandDefinition["image"] = "Binary";
    DbToCsCommandDefinition["int"] = "Int";
    DbToCsCommandDefinition["money"] = "Money";
    DbToCsCommandDefinition["nchar"] = "NChar";
    DbToCsCommandDefinition["ntext"] = "NText";
    DbToCsCommandDefinition["numeric"] = "Decimal";
    DbToCsCommandDefinition["nvarchar"] = "NVarChar";
    DbToCsCommandDefinition["real"] = "Real";
    DbToCsCommandDefinition["rowversion"] = "Timestamp";
    DbToCsCommandDefinition["smalldatetime"] = "DateTime";
    DbToCsCommandDefinition["smallint"] = "SmallInt";
    DbToCsCommandDefinition["smallmoney"] = "SmallMoney";
    DbToCsCommandDefinition["sql_variant"] = "Variant";
    DbToCsCommandDefinition["text"] = "Text";
    DbToCsCommandDefinition["time"] = "Time";
    DbToCsCommandDefinition["timestamp"] = "Timestamp";
    DbToCsCommandDefinition["tinyint"] = "TinyInt";
    DbToCsCommandDefinition["uniqueidentifier"] = "UniqueIdentifier";
    DbToCsCommandDefinition["varbinary"] = "VarBinary";
    DbToCsCommandDefinition["varchar"] = "VarChar";
    DbToCsCommandDefinition["xml"] = "Xml";
})(DbToCsCommandDefinition = exports.DbToCsCommandDefinition || (exports.DbToCsCommandDefinition = {}));
function mapDbToCsCommandDefinition(key) {
    return DbToCsCommandDefinition[key];
}
exports.mapDbToCsCommandDefinition = mapDbToCsCommandDefinition;
function mapDbToTsTsInterface(key) {
    return DbToTsInterface[key];
}
exports.mapDbToTsTsInterface = mapDbToTsTsInterface;
function mapDbToCsModel(key) {
    return DbToCsharpModel[key];
}
exports.mapDbToCsModel = mapDbToCsModel;
