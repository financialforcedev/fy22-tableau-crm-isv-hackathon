/*
 * Copyright (c) 2021 FinancialForce.com, inc. All rights reserved.
 */

import { Config, ConfigSchema } from "./config";
import { Validator } from "jsonschema";

export function parseConfig(config: string): Config {
    const parsedJson: unknown = JSON.parse(config);



}