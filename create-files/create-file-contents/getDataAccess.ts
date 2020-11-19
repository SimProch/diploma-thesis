import { MethodCallType } from "../../types/cli.types";
import { ModelProperties } from "../../types/mapping.types";

const LINE_END = "\r\n";
const asyncMethods: MethodCallType[] = ["ExecuteToObjectsAsync", "ExecuteToDynamicAsync", "ExecuteToCacheAsync"];

export default function getDataAccess(
	methodType: MethodCallType,
	spName: string,
	modelName: string,
	properties: ModelProperties[]
): string {
	const resultType = getTypeBasedOnCallMethod(methodType, modelName);
	const methodStart = `    public ${resultType} ${spName}(${LINE_END}`;
	const args = getQueryArguments(methodType, properties);
	const methodBody = getQueryBody(methodType, spName, modelName, properties);
	const methodEnd = `    }`;
	const result = methodStart + args + methodBody + methodEnd;
	return result;
}

function getTypeBasedOnCallMethod(methodType: MethodCallType, modelName: string) {
	if (methodType === "ExecuteToCacheAsync") return `Task<ICacheableData<IDbMultiResult<${modelName}>>>`;
	if (methodType === "ExecuteToObjects") return `Task<${modelName}>`;
	if (methodType === "ExecuteToObjectsAsync") return `Task<IEnumerable<${modelName}>>`;
	if (methodType === "ExecuteToDynamic") return `Task<dynamic>`;
	if (methodType === "ExecuteToDynamicAsync") return `Task<IList<dynamic>>`;
	if (methodType === "ExecuteNonQuery") return "void";
	throw new Error("Unknown call type!");
}

function getQueryArguments(methodType: MethodCallType, properties: ModelProperties[]): string {
	let result = "";
	const hasGuid = methodType === "ExecuteToCacheAsync";
	const hasCancellation = asyncMethods.includes(methodType);
	properties.forEach((i) => {
		result += `        ${i.typeName} ${i.propertyName}${hasGuid || hasCancellation ? ", " : ''} ${LINE_END}`;
	});
	if (hasGuid) result += `        Guid? cacheRevision${hasCancellation ? ", " : ''} ${LINE_END}`;
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
		result += `            ${i.propertyName}${hasGuid || hasCancellation ? ", " : ''} ${LINE_END}`;
	});
	if (hasGuid) result += `            cacheRevision${hasCancellation ? ", " : ''} ${LINE_END}`;
	if (hasCancellation) result += `            cancellationToken ${LINE_END}`;
	result += "    );" + LINE_END;
	return result;
}

/*
public IEnumerable<OutputProperties> storedProcedure() {
    return p_StoredProcedure.ExecuteToMethod<OutputProperties>(Context, OutputProperties.map(i => i.name));
}
*/
