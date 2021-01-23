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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createController = exports.createDataAccess = exports.createCsModel = exports.createTsInterface = void 0;
var fs = __importStar(require("fs-extra"));
var path = __importStar(require("path"));
var chalk = __importStar(require("chalk"));
var getCommandDefinition_1 = __importDefault(require("./getCommandDefinition"));
var getController_1 = __importDefault(require("./getController"));
var getDataAccess_1 = __importDefault(require("./getDataAccess"));
var getInterface_1 = __importDefault(require("./getInterface"));
var getModel_1 = __importDefault(require("./getModel"));
var LINE_END = "\r\n";
var rootDirectory = path.dirname(require.main.filename);
function createTsInterface(interfaceName, props) {
    return new Promise(function (resolve, reject) {
        if (props.length == 0) {
            var msg = chalk.yellow("There are no properties for " + interfaceName + ". Skipping creation of TS interface.");
            console.log(msg);
            resolve(null);
            return;
        }
        var filePath = rootDirectory + "/result/" + interfaceName + ".ts";
        deleteFileIfExists(filePath);
        var getInterfaceArgs = {
            interfaceName: interfaceName,
            properties: props,
        };
        var newInterface = getInterface_1.default(getInterfaceArgs);
        fs.appendFile(filePath, newInterface, function (err) { return postCreateCallback(err, filePath, resolve, reject); });
    });
}
exports.createTsInterface = createTsInterface;
function createCsModel(modelName, props) {
    return new Promise(function (resolve, reject) {
        if (props.length == 0) {
            var msg = chalk.yellow("There are no properties for " + modelName + ". Skipping creation of TS interface.");
            console.log(msg);
            resolve(null);
            return;
        }
        var filePath = rootDirectory + "/result/" + modelName + ".cs";
        deleteFileIfExists(filePath);
        var getModelArgs = {
            modelName: modelName,
            properties: props,
        };
        var newModel = getModel_1.default(getModelArgs);
        fs.appendFile(filePath, newModel, function (err) { return postCreateCallback(err, filePath, resolve, reject); });
    });
}
exports.createCsModel = createCsModel;
function createDataAccess(methodType, schema, spName, props, modelProps) {
    return new Promise(function (resolve, reject) {
        var filePath = rootDirectory + "/result/" + spName + ".cs";
        deleteFileIfExists(filePath);
        var dataAccessArgs = {
            methodType: methodType,
            spName: spName,
            modelName: "modelName",
            properties: modelProps,
        };
        var commandDefinitionArgs = {
            schema: schema,
            spName: spName,
            properties: props,
        };
        var dataAccessMethod = getDataAccess_1.default(dataAccessArgs);
        var commandDefinition = getCommandDefinition_1.default(commandDefinitionArgs);
        var spaceBetween = LINE_END + LINE_END;
        var fileStart = "public class DataAccess {" + spaceBetween;
        var dataAccessContents = dataAccessMethod + spaceBetween;
        var commandDefinitionContents = commandDefinition + LINE_END;
        var fileEnd = "}";
        var fileContents = fileStart + dataAccessContents + commandDefinitionContents + fileEnd;
        fs.appendFile(filePath, fileContents, function (err) { return postCreateCallback(err, filePath, resolve, reject); });
    });
}
exports.createDataAccess = createDataAccess;
function createController(args) {
    return new Promise(function (resolve, reject) {
        var filePath = rootDirectory + "/result/" + args.classMethodName + ".cs";
        deleteFileIfExists(filePath);
        var controller = getController_1.default(args);
        fs.appendFile(filePath, controller, function (err) { return postCreateCallback(err, filePath, resolve, reject); });
    });
}
exports.createController = createController;
function deleteFileIfExists(fileName) {
    if (fs.existsSync(fileName))
        fs.unlinkSync(fileName);
}
function postCreateCallback(err, fileName, resolve, reject) {
    if (err)
        reject(err);
    resolve(fileName);
}
