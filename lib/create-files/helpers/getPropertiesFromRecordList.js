#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInterfacePropertiesFromRecordList = exports.getModelPropertiesFromRecordList = exports.getCommandDefinitionPropertiesFromRecordList = void 0;
var mapping_types_1 = require("../../types/mapping.types");
function getCommandDefinitionPropertiesFromRecordList(res) {
    return res.map(function (i) {
        var name = i.outputName ? i.outputName : i.inputName;
        return {
            propertyName: name.charAt(0) === "@" ? name.slice(1) : name,
            typeName: mapping_types_1.mapDbToCsCommandDefinition(i.variableName),
            isNullable: i.isNullable,
            maxLength: i.maxLength,
        };
    });
}
exports.getCommandDefinitionPropertiesFromRecordList = getCommandDefinitionPropertiesFromRecordList;
function getModelPropertiesFromRecordList(res) {
    return res.map(function (i) {
        var name = i.outputName ? i.outputName : i.inputName;
        return {
            propertyName: name.charAt(0) === "@" ? name.slice(1) : name,
            typeName: mapping_types_1.mapDbToCsModel(i.variableName),
            isNullable: i.isNullable,
            maxLength: i.maxLength,
        };
    });
}
exports.getModelPropertiesFromRecordList = getModelPropertiesFromRecordList;
function getInterfacePropertiesFromRecordList(res) {
    return res.map(function (i) {
        var name = i.outputName ? i.outputName : i.inputName;
        return {
            propertyName: name.charAt(0) === "@" ? name.slice(1) : name,
            typeName: mapping_types_1.mapDbToTsTsInterface(i.variableName),
            isNullable: i.isNullable,
            maxLength: i.maxLength,
        };
    });
}
exports.getInterfacePropertiesFromRecordList = getInterfacePropertiesFromRecordList;
