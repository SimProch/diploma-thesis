#!/usr/bin/env node

import * as chalk from "chalk";
import { configure } from "../configure";
import { listProcedureInput } from "../database-connection/listProcedureInput";
import { listProcedureOutput } from "../database-connection/listProcedureOutput";
import { CommandArguments } from "../types/cli.types";
import { CommandDefinitionProperties, InterfaceProperties, ModelProperties } from "../types/mapping.types";
import { InputList, OutputList } from "../types/queries.types";
import { createTsInterface, createCsModel, createDataAccess, createController } from "./create-file-contents/createFiles";
import { getControllerArguments } from "./create-file-contents/types/file-contents.types";
import {
	getCommandDefinitionPropertiesFromRecordList,
	getInterfacePropertiesFromRecordList,
	getModelPropertiesFromRecordList,
} from "./helpers/getPropertiesFromRecordList";

export function generate(args: CommandArguments) {
	getProcedureParams()
		.then((res) => {
			let inputModelName = "";
			let outputModelName = "";
			const promises: Array<Promise<string>> = [];
			if (args.generateInterface) {
				const inputProperties: InterfaceProperties[] = getInterfacePropertiesFromRecordList(res[0]);
				const outputProperties: InterfaceProperties[] = getInterfacePropertiesFromRecordList(res[1]);
				promises.push(createTsInterface("inputInterface", inputProperties));
				promises.push(createTsInterface("outputInterface", outputProperties));
			}
			if (args.generateModel) {
				const inputProperties: ModelProperties[] = getModelPropertiesFromRecordList(res[0]);
				const outputProperties: ModelProperties[] = getModelPropertiesFromRecordList(res[1]);
				inputModelName = "inputModel";
				outputModelName = "outputModel";
				promises.push(createCsModel(inputModelName, inputProperties));
				promises.push(createCsModel(outputModelName, outputProperties));
			}
			if (args.generateDataAccess) {
				const commandDefinitionProperties: CommandDefinitionProperties[] = getCommandDefinitionPropertiesFromRecordList(res[0]);
				const dataAccessArguments: ModelProperties[] = getModelPropertiesFromRecordList(res[0]);
				promises.push(
					createDataAccess(args.callType, args.schema, args.storedProcedureName, commandDefinitionProperties, dataAccessArguments)
				);
			}
			if (args.generateController) {
				const inputProps: ModelProperties[] = getModelPropertiesFromRecordList(res[0]);
				const controllerArgs: getControllerArguments = {
					methodType: args.callType,
					outputModelName: outputModelName,
					inputModelName: inputModelName,
					classMethodName: "controllerPath",
					routePath: args.route,
					requestType: args.httpMethodType,
					dataAccessName: args.storedProcedureName,
					properties: inputProps,
				};
				promises.push(createController(controllerArgs));
			}

			Promise.all(promises)
				.then((res) => onPromisesResolved(res, args))
				.catch((err) => onPromisesError(err));
		})
		.catch((err) => console.error(err));

	async function getProcedureParams(): Promise<[InputList, OutputList]> {
		const inputs = await listProcedureInput(args.database, args.schema, args.storedProcedureName);
		const outputs = await listProcedureOutput(args.database, args.schema, args.storedProcedureName);
		return Promise.all([inputs, outputs]);
	}
}

function onPromisesResolved(res: string[], args: CommandArguments): void {
	res.forEach((fileName) => {
		console.log("Created " + fileName);
	});
	const message = chalk.green("Files were successfully created");
	configure(args.storedProcedureName, args);
	console.log(message);
	process.exit();
}

function onPromisesError(err: NodeJS.ErrnoException[]): void {
	console.error(err);
	const message = chalk.red("There were some errors creating files. See logged errors above");
	console.log(message);
	process.exit(1);
}
