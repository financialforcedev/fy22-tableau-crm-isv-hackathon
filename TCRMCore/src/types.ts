/*
 * Copyright (c) 2021 FinancialForce.com, inc. All rights reserved.
 */
 
export type State = Record<string, unknown>;

export type GetStateFunction = () => State;
export type SetStateFunction = (s: State) => void;

export type Params = {
    autoplay: boolean,
    config: string,
    getState: GetStateFunction,
    setState: SetStateFunction
};

