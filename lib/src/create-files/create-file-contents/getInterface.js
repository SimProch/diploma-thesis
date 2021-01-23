#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LINE_END = "\r\n";
function getInterface(args) {
    var interfaceStart = "export interface " + args.interfaceName + " {" + LINE_END;
    var typing = "";
    args.properties.forEach(function (property) {
        typing += addTypeLine(property.propertyName, property.typeName, property.isNullable);
    });
    var interfaceEnd = "}";
    var result = interfaceStart + typing + interfaceEnd;
    return result;
}
exports.default = getInterface;
function addTypeLine(propertyName, typeName, isNullable) {
    var typingToAdd = "    " + propertyName + (isNullable ? "?" : "") + ": " + typeName + ";" + LINE_END;
    return typingToAdd;
}
