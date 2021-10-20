/*
 * Copyright (c) 2021 FinancialForce.com, inc. All rights reserved.
 */

import Engine from "./engine/core";

 
export type State = Record<string, unknown>;

export type GetStateFunction = () => State;
export type SetStateFunction = (s: State) => void;

export type Params = {
    config: string,
    title: string,
    getState: GetStateFunction,
    setState: SetStateFunction
};

export type Bundle = {
    engine: Engine
};
