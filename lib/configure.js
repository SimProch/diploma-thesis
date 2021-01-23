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
exports.getConfigObject = exports.configure = exports.configureGlobal = exports.initializeConfig = void 0;
var fs = __importStar(require("fs-extra"));
var databaseConnection_1 = require("./src/database-connection/databaseConnection");
var CONFIG_NAME = "config.json";
var DEFAULT_CONFIG = {
    global: {},
};
var globalConfig;
function initializeConfig() {
    var hasExistingConfig = fs.existsSync(CONFIG_NAME);
    if (!hasExistingConfig) {
        fs.writeFileSync(CONFIG_NAME, JSON.stringify(DEFAULT_CONFIG), { encoding: "utf8" });
    }
    var JSONconfig = fs.readFileSync(CONFIG_NAME, { encoding: "utf8" });
    globalConfig = JSON.parse(JSONconfig);
}
exports.initializeConfig = initializeConfig;
function configureGlobal(config) {
    if (!config.database && !globalConfig.global.database)
        config.database = databaseConnection_1.DEFAULT_DB_NAME;
    if (!config.server && !globalConfig.global.server)
        config.server = databaseConnection_1.DEFAULT_SERVER_NAME;
    configure("global", config);
}
exports.configureGlobal = configureGlobal;
function configure(namespace, config) {
    Object.keys(config).forEach(function (key) {
        if (!globalConfig[namespace])
            globalConfig[namespace] = {};
        if (config[key])
            addKeyValuePair(globalConfig[namespace], key, config[key]);
    });
}
exports.configure = configure;
function addKeyValuePair(namespace, key, value) {
    namespace[key] = value;
    fs.writeFileSync(CONFIG_NAME, JSON.stringify(globalConfig, null, 4), { encoding: "utf8" });
}
function getConfigObject() {
    return globalConfig;
}
exports.getConfigObject = getConfigObject;
