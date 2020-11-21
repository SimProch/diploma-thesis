import { MethodCallType } from "../../types/cli.types";
import { InterfaceProperties, ModelProperties, TSType } from "../../types/mapping.types";
import { getControllerArguments } from "./types/file-contents.types";

const LINE_END = "\r\n";
const asyncMethods: MethodCallType[] = ["ExecuteToObjectsAsync", "ExecuteToDynamicAsync", "ExecuteToCacheAsync"];

export default function getController(args: getControllerArguments): string {
	const fileStart = getControllerClass(args.routePath);
	const method = getMethod(args);
	const fileEnd = `}`;
	const result = fileStart + method + fileEnd;
	return result;
}

function getMethod(args: getControllerArguments): string {
	const returnType = getTypeBasedOnCallMethod(args.methodType, args.outputModelName);
	const request = `    [${args.requestType === "POST" ? 'HttpPost' : 'HttpGet'}]${LINE_END}`;
	const methodStart = `    public ${returnType} ${args.classMethodName}(${LINE_END}`;
	const methodArguments = getMethodArguments(args.methodType, args.requestType, args.properties, args.inputModelName);
	const methodContents = ``;
	const methodEnd = `    }`;
	const result = request + methodStart + methodArguments + methodContents + methodEnd;
	return result;
}

function getControllerClass(routePath: string) {
	const route = `[Route(${routePath ? routePath : '/*path*/'})]${LINE_END}`;
	const apiController = `[ApiController]${LINE_END}`;
	const auth = `[Authorize(/*Roles = ApplicationPermissions.Access*/)]${LINE_END}`;
	const fileContents = `public class Controller: ApiController {${LINE_END}`;
	const fileStart = route + apiController + auth + fileContents;
	return fileStart;
}

function getTypeBasedOnCallMethod(methodType: MethodCallType, modelName: string) {
	if (methodType === "ExecuteToCacheAsync") return `async Task<dynamic>`;
	if (methodType === "ExecuteToObjects") return `Task<${modelName}>`;
	if (methodType === "ExecuteToObjectsAsync") return `async Task<IEnumerable<${modelName}>>`;
	if (methodType === "ExecuteToDynamic") return `Task<dynamic>`;
	if (methodType === "ExecuteToDynamicAsync") return `async Task<IList<dynamic>>`;
	if (methodType === "ExecuteNonQuery") return "dynamic";
	throw new Error("Unknown call type!");
}


function getMethodArguments(methodType: MethodCallType, requestType: "POST" | "GET", properties: ModelProperties[], inputPropertiesName: string): string {
	let result = ""
	result += getStandardProperties(requestType, methodType, properties, inputPropertiesName);
	result += getAsynchronousProperties(methodType);
	result += ")";
	return result;
}

function getStandardProperties(requestType: "POST" | "GET", methodType: MethodCallType, properties: ModelProperties[], inputPropertiesName: string): string {
	if (requestType === "POST") return inputPropertiesName;
	const hasGuid = methodType === "ExecuteToCacheAsync";
	const hasCancellation = asyncMethods.includes(methodType);
	let result = "";
	properties.forEach((i) => {
		result += `        [FromURI] ${i.typeName} ${i.propertyName}${hasGuid || hasCancellation ? ", " : ''} ${LINE_END}`;
	});
	return result;
}

function getAsynchronousProperties(methodType: MethodCallType) {
	let result = "";
	const hasGuid = methodType === "ExecuteToCacheAsync";
	const hasCancellation = asyncMethods.includes(methodType);
	if (hasGuid) result += `        Guid? cacheRevision${hasCancellation ? ", " : ''} ${LINE_END}`;
	if (hasCancellation) result += `        CancellationToken cancellationToken ${LINE_END}`;
	return result;
}

function getDataAccessParameters(methodType: MethodCallType, properties: ModelProperties[]): string {
	let result = "(" + LINE_END;
	const hasGuid = methodType === "ExecuteToCacheAsync";
	const hasCancellation = asyncMethods.includes(methodType);
	properties.forEach((i) => {
		result += `            ${i.propertyName}${hasGuid || hasCancellation ? ", " : ''} ${LINE_END}`;
	});
	if (hasGuid) result += `            cacheRevision${hasCancellation ? ", " : ''} ${LINE_END}`;
	if (hasCancellation) result += `            cancellationToken ${LINE_END}`;
	result += "    );" + LINE_END;
	return result;
}

function addTypeLine(propertyName: string, typeName: TSType, isNullable: boolean): string {
	const typingToAdd = `    ${propertyName}${isNullable ? "?" : ""}: ${typeName};${LINE_END}`;
	return typingToAdd;
}
