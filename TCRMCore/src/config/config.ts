/*
 * Copyright (c) 2021 FinancialForce.com, inc. All rights reserved.
 */

import { Schema } from "jsonschema";
import { Operation } from "fast-json-patch";

export type Config = {
    steps: Array<ConfigStep>;
};

export type ConfigStep = {
    title: string;
    description: string;
    operations: Array<Operation>;
    time: number;
};

export const ConfigSchema: Schema = {
    id: "/Config",
	type: "object",
	required: true,
    additionalProperties: false,
	properties: {
        steps: {
            type: "array",
            required: true,
            minItems: 1,
            items: {
                type: "object",
                required: true,
                additionalProperties: false,
                properties: {
                    title: { type: "string", required: true, minLength: 1 },
                    description: { type: "string", required: true, minLength: 1 },
                    time: { type: "number", required: true },
                    operations: {
                        type: "array",
                        required: true,
                        items: {
                            type: "object",
                            required: true,
                            additionalProperties: false,
                            properties: {
                                path: { type: "string", required: true, minLength: 1 },
                                op: { 
                                    type: "string", 
                                    required: true, 
                                    enum: ["add", "remove", "replace", "move", "copy"] 
                                },
                                value: {
                                    type: ["number","string","boolean","object","array", "null"],
                                }
                            },
                            if: {
                                properties: {
                                    op: {
                                        enum: ["add", "replace"]
                                    }
                                }
                            },
                            then: {
                                required: [
                                    "value"
                                ]
                            }
                        }
                    } 
                }
            }
        },
    }
};


