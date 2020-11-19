import { MethodCallType } from "../../types/cli.types";
import { InterfaceProperties, TSType } from "../../types/mapping.types";

const LINE_END = "\r\n";

export default function getController(methodType: MethodCallType, modelName: string, classMethodName: string, routePath: string, requestType: "POST" | "GET"): string {
	const route = `[Route(${routePath ? routePath : '/*path*/'})]${LINE_END}`;
	const apiController = `[ApiController]${LINE_END}`;
	const auth = `[Authorize(/*Roles = ApplicationPermissions.Access*/)]${LINE_END}`;
	const fileContents = `public class Controller: WebApiController {${LINE_END}`
	const fileStart = route + apiController + auth + fileContents;
	const returnType = getTypeBasedOnCallMethod(methodType, modelName);
	const request = `    [${requestType === "POST" ? 'HttpPost' : 'HttpGet'}]${LINE_END}`;
	const methodStart = `    public ${returnType} ${classMethodName}(`;
	const methodContents = ``
	const methodEnd = `    }`
	const fileEnd = `}`;
	const result = fileStart + method + fileEnd;
	return result;
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


function addTypeLine(propertyName: string, typeName: TSType, isNullable: boolean): string {
	const typingToAdd = `    ${propertyName}${isNullable ? "?" : ""}: ${typeName};${LINE_END}`;
	return typingToAdd;
}
