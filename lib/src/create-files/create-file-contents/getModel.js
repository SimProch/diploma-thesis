#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LINE_END = "\r\n";
function getModel(args) {
    var modelStart = "public class " + args.modelName + " {" + LINE_END;
    var typing = "";
    args.properties.forEach(function (property) {
        typing += addTypeLine(property.propertyName, property.typeName, property.isNullable);
    });
    var modelEnd = "}";
    var result = modelStart + typing + modelEnd;
    return result;
}
exports.default = getModel;
function addTypeLine(propertyName, typeName, isNullable) {
    var typingToAdd = "    public " + typeName + (isNullable ? "?" : "") + " " + propertyName + " { get; set; }" + LINE_END;
    return typingToAdd;
}
