#!/usr/bin/env node
import { CommandArguments, Configuration, GlobalConfiguration } from "./src/types/cli.types";
export declare function initializeConfig(): void;
export declare function configureGlobal(config: GlobalConfiguration): void;
export declare function configure(namespace: string, config: CommandArguments | GlobalConfiguration): void;
export declare function getConfigObject(): Configuration;
