#!/usr/bin/env node
import { createTsInterface, createCsModel } from './create-files/createFiles';
import { interfaceProperties, modelProperties } from './fakeValues';

export function generate(tsinterface: boolean, csmodel: boolean) {
	if (tsinterface) createTsInterface('newInterface', interfaceProperties);
	if (csmodel) createCsModel('newModel', modelProperties);
}


