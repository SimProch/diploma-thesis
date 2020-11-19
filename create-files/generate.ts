#!/usr/bin/env node

import { listProcedureInput } from "../database-connection/listProcedureInput";
import { listProcedureOutput } from "../database-connection/listProcedureOutput";
import { CommandArguments } from "../types/cli.types";
import { CommandDefinitionProperties, InterfaceProperties, ModelProperties } from "../types/mapping.types";
import { InputList, OutputList } from "../types/queries.types";
import { createTsInterface, createCsModel, createDataAccess } from "./create-file-contents/createFiles";
import {
	getCommandDefinitionPropertiesFromRecordList,
	getInterfacePropertiesFromRecordList,
	getModelPropertiesFromRecordList,
} from "./helpers/getPropertiesFromRecordList";

export function generate(args: CommandArguments) {
	getProcedureParams()
		.then((res) => {
			if (args.generateInterface) {
				const inputProperties: InterfaceProperties[] = getInterfacePropertiesFromRecordList(res[0]);
				const outputProperties: InterfaceProperties[] = getInterfacePropertiesFromRecordList(res[1]);
				createTsInterface("inputInterface", inputProperties);
				createTsInterface("outputInterface", outputProperties);
			}
			if (args.generateModel) {
				const inputProperties: ModelProperties[] = getModelPropertiesFromRecordList(res[0]);
				const outputProperties: ModelProperties[] = getModelPropertiesFromRecordList(res[1]);
				createCsModel("inputModel", inputProperties);
				createCsModel("outputModel", outputProperties);
			}
			if (args.generateDataAccess) {
				const commandDefinitionProperties: CommandDefinitionProperties[] = getCommandDefinitionPropertiesFromRecordList(res[0]);
				const dataAccessArguments: ModelProperties[] = getModelPropertiesFromRecordList(res[0]);
				createDataAccess(args.callType, args.schema, args.storedProcedureName, commandDefinitionProperties, dataAccessArguments);
			}
			if (args.generateController) {
				
			}
		})
		.catch((err) => console.error(err));

	async function getProcedureParams(): Promise<[InputList, OutputList]> {
		const inputs = await listProcedureInput(args.database, args.schema, args.storedProcedureName);
		const outputs = await listProcedureOutput(args.database, args.schema, args.storedProcedureName);
		return Promise.all([inputs, outputs]);
	}
}
