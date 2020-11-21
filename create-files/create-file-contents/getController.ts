import { MethodCallType } from "../../types/cli.types";
import { ModelProperties, TSType } from "../../types/mapping.types";
import { getControllerArguments } from "./types/file-contents.types";

const LINE_END = "\r\n";
const asyncMethods: MethodCallType[] = ["ExecuteToObjectsAsync", "ExecuteToDynamicAsync", "ExecuteToCacheAsync"];
const typedMethods: MethodCallType[] = ["ExecuteToObjects", "ExecuteToObjectsAsync", "ExecuteToCacheAsync"];

export default function getController(args: getControllerArguments): string {
	const spaceBetween = LINE_END;
	const fileStart = getControllerClass(args.routePath);
	const method = getMethod(args);
	const fileEnd = `}`;
	const result = fileStart + spaceBetween + method + fileEnd;
	return result;
}

function getControllerClass(routePath: string) {
	const apiController = `[ApiController]${LINE_END}`;
	const route = `[Route(/* Controller Route Path */)]${LINE_END}`;
	const auth = `[Authorize(/*Roles = ApplicationPermissions.Access*/)]${LINE_END}`;
	const fileContents = `public class Controller: ApiController {${LINE_END}`;
	const fileStart = apiController + route + auth + fileContents;
	return fileStart;
}

function getMethod(args: getControllerArguments): string {
	const returnType = getTypeBasedOnCallMethod(args.methodType, args.outputModelName);
	const route = `    [Route(${args.routePath ? args.routePath : "/* Method Route Path */"})]${LINE_END}`;
	const auth = `    [Authorize(/* Roles = ApplicationPermissions.Edit */)]${LINE_END}`;
	const request = `    [${args.requestType === "POST" ? "HttpPost" : "HttpGet"}]${LINE_END}`;
	const methodStart = `    public ${returnType} ${args.classMethodName}(${LINE_END}`;
	const methodArguments = getMethodArguments(args.methodType, args.requestType, args.properties, args.inputModelName);
	const methodContents = getMethodContents(args);
	const methodEnd = `    }${LINE_END}`;
	const methodAttributes = route + auth + request;
	const method = methodStart + methodArguments + methodContents + methodEnd;
	const result = methodAttributes + method;
	return result;
}

function getTypeBasedOnCallMethod(methodType: MethodCallType, modelName: string) {
	if (methodType === "ExecuteToCacheAsync") return `async Task<${modelName}>`;
	if (methodType === "ExecuteToObjects") return `Task<${modelName}>`;
	if (methodType === "ExecuteToObjectsAsync") return `async Task<IEnumerable<${modelName}>>`;
	if (methodType === "ExecuteToDynamic") return `Task<dynamic>`;
	if (methodType === "ExecuteToDynamicAsync") return `async Task<IList<dynamic>>`;
	if (methodType === "ExecuteNonQuery") return "dynamic";
	throw new Error("Unknown call type!");
}

function getMethodArguments(
	methodType: MethodCallType,
	requestType: "POST" | "GET",
	properties: ModelProperties[],
	inputPropertiesName: string
): string {
	let result = "";
	result += getStandardProperties(requestType, methodType, properties, inputPropertiesName);
	result += getAsynchronousProperties(methodType);
	result += `    )${LINE_END}    {${LINE_END}`;
	return result;
}

function getStandardProperties(
	requestType: "POST" | "GET",
	methodType: MethodCallType,
	properties: ModelProperties[],
	inputPropertiesName: string
): string {
	if (requestType === "POST") return inputPropertiesName;
	const hasGuid = methodType === "ExecuteToCacheAsync";
	const hasCancellation = asyncMethods.includes(methodType);
	let result = "";
	properties.forEach((i) => {
		result += `        [FromURI] ${i.typeName} ${i.propertyName}${hasGuid || hasCancellation ? ", " : ""} ${LINE_END}`;
	});
	return result;
}

function getAsynchronousProperties(methodType: MethodCallType) {
	let result = "";
	const hasGuid = methodType === "ExecuteToCacheAsync";
	const hasCancellation = asyncMethods.includes(methodType);
	if (hasGuid) result += `        Guid? cacheRevision${hasCancellation ? ", " : ""} ${LINE_END}`;
	if (hasCancellation) result += `        CancellationToken cancellationToken ${LINE_END}`;
	return result;
}

function getMethodContents(args: getControllerArguments): string {
	let result = "        return ";
	const hasType = typedMethods.includes(args.methodType);
	const generics = hasType ? `<${args.outputModelName}>` : "";
	const dataAccessCall = `${args.dataAccessName}.${args.methodType}${generics}(${LINE_END}`;
	const parameters = getDataAccessParameters(args.methodType, args.properties);
	result += dataAccessCall;
	result += parameters;
	return result;
}

function getDataAccessParameters(methodType: MethodCallType, properties: ModelProperties[]): string {
	let result = "";
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

function addTypeLine(propertyName: string, typeName: TSType, isNullable: boolean): string {
	const typingToAdd = `    ${propertyName}${isNullable ? "?" : ""}: ${typeName};${LINE_END}`;
	return typingToAdd;
}
