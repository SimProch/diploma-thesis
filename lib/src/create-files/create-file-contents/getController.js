#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk = require("chalk");
var LINE_END = "\r\n";
var asyncMethods = ["ExecuteToObjectsAsync", "ExecuteToDynamicAsync", "ExecuteToCacheAsync"];
var typedMethods = ["ExecuteToObjects", "ExecuteToObjectsAsync", "ExecuteToCacheAsync"];
function getController(args) {
    var spaceBetween = LINE_END;
    var fileStart = getControllerClass(args.routePath);
    var method = getMethod(args);
    var fileEnd = "}";
    var result = fileStart + spaceBetween + method + fileEnd;
    return result;
}
exports.default = getController;
function getControllerClass(routePath) {
    var apiController = "[ApiController]" + LINE_END;
    var route = "[Route(/* Controller Route Path */)]" + LINE_END;
    var auth = "[Authorize(/*Roles = ApplicationPermissions.Access*/)]" + LINE_END;
    var fileContents = "public class Controller: ApiController {" + LINE_END;
    var fileStart = apiController + route + auth + fileContents;
    return fileStart;
}
function getMethod(args) {
    var returnType = getTypeBasedOnCallMethod(args.methodType, args.outputModelName);
    var route = "    [Route(" + (args.routePath ? args.routePath : "/* Method Route Path */") + ")]" + LINE_END;
    var auth = "    [Authorize(/* Roles = ApplicationPermissions.Edit */)]" + LINE_END;
    var request = "    [" + (args.requestType === "POST" ? "HttpPost" : "HttpGet") + "]" + LINE_END;
    var methodStart = "    public " + returnType + " " + args.classMethodName + "(" + LINE_END;
    var methodArguments = getMethodArguments(args.methodType, args.requestType, args.properties, args.inputModelName);
    var methodContents = getMethodContents(args);
    var methodEnd = "    }" + LINE_END;
    var methodAttributes = route + auth + request;
    var method = methodStart + methodArguments + methodContents + methodEnd;
    var result = methodAttributes + method;
    return result;
}
function getTypeBasedOnCallMethod(methodType, modelName) {
    if (methodType === "ExecuteToCacheAsync")
        return "async Task<" + modelName + ">";
    if (methodType === "ExecuteToObjects")
        return "Task<" + modelName + ">";
    if (methodType === "ExecuteToObjectsAsync")
        return "async Task<IEnumerable<" + modelName + ">>";
    if (methodType === "ExecuteToDynamic")
        return "Task<dynamic>";
    if (methodType === "ExecuteToDynamicAsync")
        return "async Task<IList<dynamic>>";
    if (methodType === "ExecuteNonQuery")
        return "dynamic";
    throw new Error(chalk.red("Unknown call type!"));
}
function getMethodArguments(methodType, requestType, properties, inputPropertiesName) {
    var result = "";
    result += getStandardProperties(requestType, methodType, properties, inputPropertiesName);
    result += getAsynchronousProperties(methodType);
    result += "    )" + LINE_END + "    {" + LINE_END;
    return result;
}
function getStandardProperties(requestType, methodType, properties, inputPropertiesName) {
    if (requestType === "POST")
        return "        " + inputPropertiesName + " inputArguments";
    var hasGuid = methodType === "ExecuteToCacheAsync";
    var hasCancellation = asyncMethods.includes(methodType);
    var result = "";
    properties.forEach(function (i) {
        result += "        [FromURI] " + i.typeName + " " + i.propertyName + (hasGuid || hasCancellation ? ", " : "") + " " + LINE_END;
    });
    return result;
}
function getAsynchronousProperties(methodType) {
    var result = "";
    var hasGuid = methodType === "ExecuteToCacheAsync";
    var hasCancellation = asyncMethods.includes(methodType);
    if (hasGuid)
        result += "        Guid? cacheRevision" + (hasCancellation ? ", " : "") + " " + LINE_END;
    if (hasCancellation)
        result += "        CancellationToken cancellationToken " + LINE_END;
    return result;
}
function getMethodContents(args) {
    var result = "        return ";
    var hasType = typedMethods.includes(args.methodType);
    var generics = hasType ? "<" + args.outputModelName + ">" : "";
    var dataAccessCall = args.dataAccessName + "." + args.methodType + generics + "(" + LINE_END;
    var parameters = getDataAccessParameters(args.methodType, args.requestType, args.inputModelName, args.properties);
    result += dataAccessCall;
    result += parameters;
    return result;
}
function getDataAccessParameters(methodType, requestType, inputName, properties) {
    var result = "";
    var hasGuid = methodType === "ExecuteToCacheAsync";
    var hasCancellation = asyncMethods.includes(methodType);
    properties.forEach(function (i) {
        result += "            " + (requestType === "POST" ? inputName + "." : "") + i.propertyName + (hasGuid || hasCancellation ? ", " : "") + " " + LINE_END;
    });
    if (hasGuid)
        result += "            cacheRevision" + (hasCancellation ? ", " : "") + " " + LINE_END;
    if (hasCancellation)
        result += "            cancellationToken " + LINE_END;
    result += "        );" + LINE_END;
    return result;
}
function addTypeLine(propertyName, typeName, isNullable) {
    var typingToAdd = "    " + propertyName + (isNullable ? "?" : "") + ": " + typeName + ";" + LINE_END;
    return typingToAdd;
}
