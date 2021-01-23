#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk = __importStar(require("chalk"));
var LINE_END = "\r\n";
var asyncMethods = ["ExecuteToObjectsAsync", "ExecuteToDynamicAsync", "ExecuteToCacheAsync"];
function getDataAccess(args) {
    var resultType = getTypeBasedOnCallMethod(args.methodType, args.modelName);
    var methodStart = "    public " + resultType + " " + args.spName + "(" + LINE_END;
    var queryArgs = getQueryArguments(args.methodType, args.properties);
    var methodBody = getQueryBody(args.methodType, args.spName, args.modelName, args.properties);
    var methodEnd = "    }";
    var result = methodStart + queryArgs + methodBody + methodEnd;
    return result;
}
exports.default = getDataAccess;
function getTypeBasedOnCallMethod(methodType, modelName) {
    if (methodType === "ExecuteToCacheAsync")
        return "Task<ICacheableData<IDbMultiResult<" + modelName + ">>>";
    if (methodType === "ExecuteToObjects")
        return "Task<" + modelName + ">";
    if (methodType === "ExecuteToObjectsAsync")
        return "Task<IEnumerable<" + modelName + ">>";
    if (methodType === "ExecuteToDynamic")
        return "Task<dynamic>";
    if (methodType === "ExecuteToDynamicAsync")
        return "Task<IList<dynamic>>";
    if (methodType === "ExecuteNonQuery")
        return "void";
    throw new Error(chalk.red("Unknown call type!"));
}
function getQueryArguments(methodType, properties) {
    var result = "";
    var hasGuid = methodType === "ExecuteToCacheAsync";
    var hasCancellation = asyncMethods.includes(methodType);
    properties.forEach(function (i) {
        result += "        " + i.typeName + " " + i.propertyName + (hasGuid || hasCancellation ? ", " : "") + " " + LINE_END;
    });
    if (hasGuid)
        result += "        Guid? cacheRevision" + (hasCancellation ? ", " : "") + " " + LINE_END;
    if (hasCancellation)
        result += "        CancellationToken cancellationToken " + LINE_END;
    result += "    )" + LINE_END + "    {" + LINE_END;
    return result;
}
function getQueryBody(methodType, spName, modelName, properties) {
    var functionCall = getExecutionCall(methodType, spName, modelName);
    var params = getQueryParameters(methodType, properties);
    return functionCall + params;
}
function getExecutionCall(methodType, spName, modelName) {
    var result = spName + "." + methodType;
    if (methodType === "ExecuteNonQuery")
        return "        " + result;
    result = "        return " + result;
    if (methodType === "ExecuteToDynamic" || methodType === "ExecuteToDynamicAsync")
        return result;
    result += "<" + modelName + ">";
    return result;
}
function getQueryParameters(methodType, properties) {
    var result = "(" + LINE_END;
    var hasGuid = methodType === "ExecuteToCacheAsync";
    var hasCancellation = asyncMethods.includes(methodType);
    properties.forEach(function (i) {
        result += "            " + i.propertyName + (hasGuid || hasCancellation ? ", " : "") + " " + LINE_END;
    });
    if (hasGuid)
        result += "            cacheRevision" + (hasCancellation ? ", " : "") + " " + LINE_END;
    if (hasCancellation)
        result += "            cancellationToken " + LINE_END;
    result += "        );" + LINE_END;
    return result;
}
