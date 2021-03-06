#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = void 0;
var chalk = require("chalk");
var configure_1 = require("../../configure");
var listProcedureInput_1 = require("../database-connection/listProcedureInput");
var listProcedureOutput_1 = require("../database-connection/listProcedureOutput");
var createFiles_1 = require("./create-file-contents/createFiles");
var getPropertiesFromRecordList_1 = require("./helpers/getPropertiesFromRecordList");
function generate(args) {
    getProcedureParams()
        .then(function (res) {
        var inputModelName = "";
        var outputModelName = "";
        var promises = [];
        if (args.generateInterface) {
            var inputProperties = getPropertiesFromRecordList_1.getInterfacePropertiesFromRecordList(res[0]);
            var outputProperties = getPropertiesFromRecordList_1.getInterfacePropertiesFromRecordList(res[1]);
            promises.push(createFiles_1.createTsInterface("inputInterface", inputProperties));
            promises.push(createFiles_1.createTsInterface("outputInterface", outputProperties));
        }
        if (args.generateModel) {
            var inputProperties = getPropertiesFromRecordList_1.getModelPropertiesFromRecordList(res[0]);
            var outputProperties = getPropertiesFromRecordList_1.getModelPropertiesFromRecordList(res[1]);
            inputModelName = "inputModel";
            outputModelName = "outputModel";
            promises.push(createFiles_1.createCsModel(inputModelName, inputProperties));
            promises.push(createFiles_1.createCsModel(outputModelName, outputProperties));
        }
        if (args.generateDataAccess) {
            var commandDefinitionProperties = getPropertiesFromRecordList_1.getCommandDefinitionPropertiesFromRecordList(res[0]);
            var dataAccessArguments = getPropertiesFromRecordList_1.getModelPropertiesFromRecordList(res[0]);
            promises.push(createFiles_1.createDataAccess(args.callType, args.schema, args.storedProcedureName, commandDefinitionProperties, dataAccessArguments));
        }
        if (args.generateController) {
            var inputProps = getPropertiesFromRecordList_1.getModelPropertiesFromRecordList(res[0]);
            var controllerArgs = {
                methodType: args.callType || "ExecuteToObjects",
                outputModelName: outputModelName || "outputModelName",
                inputModelName: inputModelName || "inputModelName",
                classMethodName: args.controllerPath || "controllerPath",
                routePath: args.route,
                requestType: args.httpMethodType || "GET",
                dataAccessName: args.storedProcedureName || "storedProcedureName",
                properties: inputProps,
            };
            promises.push(createFiles_1.createController(controllerArgs));
        }
        Promise.all(promises)
            .then(function (res) { return onPromisesResolved(res, args); })
            .catch(function (err) { return onPromisesError(err); });
    })
        .catch(function (err) { return console.error(err); });
    function getProcedureParams() {
        return __awaiter(this, void 0, void 0, function () {
            var inputs, outputs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, listProcedureInput_1.listProcedureInput(args.database, args.schema, args.storedProcedureName)];
                    case 1:
                        inputs = _a.sent();
                        return [4 /*yield*/, listProcedureOutput_1.listProcedureOutput(args.database, args.schema, args.storedProcedureName)];
                    case 2:
                        outputs = _a.sent();
                        return [2 /*return*/, Promise.all([inputs, outputs])];
                }
            });
        });
    }
}
exports.generate = generate;
function onPromisesResolved(res, args) {
    res.forEach(function (fileName) {
        if (fileName == null)
            return;
        console.log("Created " + fileName);
    });
    var message = chalk.green("Files were successfully created");
    configure_1.configure(args.storedProcedureName, args);
    console.log(message);
    process.exit();
}
function onPromisesError(err) {
    console.error(err);
    var message = chalk.red("There were some errors creating files. See logged errors above");
    console.log(message);
    process.exit(1);
}
