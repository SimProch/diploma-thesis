#!/usr/bin/env node

import * as chalk from "chalk";
import { MethodCallType } from "../../types/cli.types";
import { ModelProperties } from "../../types/mapping.types";
import { getDataAccessArguments } from "./types/file-contents.types";

const LINE_END = "\r\n";
const asyncMethods: MethodCallType[] = ["ExecuteToObjectsAsync", "ExecuteToDynamicAsync", "ExecuteToCacheAsync"];

export default function getDataAccess(args: getDataAccessArguments): string {
	const resultType = getTypeBasedOnCallMethod(args.methodType, args.modelName);
	const methodStart = `    public ${resultType} ${args.spName}(${LINE_END}`;
	const queryArgs = getQueryArguments(args.methodType, args.properties);
	const methodBody = getQueryBody(args.methodType, args.spName, args.modelName, args.properties);
	const methodEnd = `    }`;
	const result = methodStart + queryArgs + methodBody + methodEnd;
	return result;
}

function getTypeBasedOnCallMethod(methodType: MethodCallType, modelName: string) {
	if (methodType === "ExecuteToCacheAsync") return `Task<ICacheableData<IDbMultiResult<${modelName}>>>`;
	if (methodType === "ExecuteToObjects") return `Task<${modelName}>`;
	if (methodType === "ExecuteToObjectsAsync") return `Task<IEnumerable<${modelName}>>`;
	if (methodType === "ExecuteToDynamic") return `Task<dynamic>`;
	if (methodType === "ExecuteToDynamicAsync") return `Task<IList<dynamic>>`;
	if (methodType === "ExecuteNonQuery") return "void";
	throw new Error(chalk.red("Unknown call type!"));
}

function getQueryArguments(methodType: MethodCallType, properties: ModelProperties[]): string {
	let result = "";
	const hasGuid = methodType === "ExecuteToCacheAsync";
	const hasCancellation = asyncMethods.includes(methodType);
	properties.forEach((i) => {
		result += `        ${i.typeName} ${i.propertyName}${hasGuid || hasCancellation ? ", " : ""} ${LINE_END}`;
	});
	if (hasGuid) result += `        Guid? cacheRevision${hasCancellation ? ", " : ""} ${LINE_END}`;
	if (hasCancellation) result += `        CancellationToken cancellationToken ${LINE_END}`;
	result += "    )" + LINE_END + "    {" + LINE_END;
	return result;
}

function getQueryBody(methodType: MethodCallType, spName: string, modelName: string, properties: ModelProperties[]): string {
	const functionCall = getExecutionCall(methodType, spName, modelName);
	const params = getQueryParameters(methodType, properties);
	return functionCall + params;
}

function getExecutionCall(methodType: MethodCallType, spName: string, modelName: string): string {
	let result = `${spName}.${methodType}`;
	if (methodType === "ExecuteNonQuery") return `        ${result}`;
	result = "        return " + result;
	if (methodType === "ExecuteToDynamic" || methodType === "ExecuteToDynamicAsync") return result;
	result += `<${modelName}>`;
	return result;
}

function getQueryParameters(methodType: MethodCallType, properties: ModelProperties[]): string {
	let result = "(" + LINE_END;
	const hasGuid = methodType === "ExecuteToCacheAsync";
	const hasCancellation = asyncMethods.includes(methodType);
	properties.forEach((i) => {
		result += `            ${i.propertyName}${hasGuid || hasCancellation ? ", " : ""} ${LINE_END}`;
	});
	if (hasGuid) result += `            cacheRevision${hasCancellation ? ", " : ""} ${LINE_END}`;
	if (hasCancellation) result += `            cancellationToken ${LINE_END}`;
	result += "        );" + LINE_END;
	return result;
}
