#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LINE_END = "\r\n";
function getCommandDefinition(args) {
    var commandDefinitionStart = "    private static CommandDefinition " + args.spName + " = CommandDefinition.DefineSp({" + LINE_END;
    var typing = "        \"" + args.schema + "." + args.spName + "\"" + LINE_END;
    args.properties.forEach(function (property) {
        typing += addTypeLine(property.propertyName, property.typeName, property.maxLength);
    });
    var commandDefinitionEnd = "    );";
    var result = commandDefinitionStart + typing + commandDefinitionEnd;
    return result;
}
exports.default = getCommandDefinition;
function addTypeLine(propertyName, typeName, maxLength) {
    var specifyMaxLength = typeName === "NVarChar" || typeName === "VarChar";
    var typingToAdd = "        \"@" + propertyName + "\", SqlDbType." + typeName + (specifyMaxLength ? ", " + maxLength + "," : "") + LINE_END;
    return typingToAdd;
}
