/*
 * Copyright (c) 2020 FinancialForce.com, inc. All rights reserved.
 */

import { LightningElement, api, track } from "lwc";
import { loadJsonPatch } from "./lib/jsonPatch";

class Resonate extends LightningElement {

    @api title;
    @api config;
    @api getState;
    @api setState;

    @track state;
    @track store;

    async connectedCallback() {
        const patch = await loadJsonPatch(this);
        if (!window.ffdcStore) {
            window.ffdcStore = "Secret" + Math.random();
        }
        this.state = JSON.stringify(this.getState());
        this.store = window.ffdcStore;
    }

    handleRefresh() {
        this.state = JSON.stringify(this.getState());
    }

}

export default Resonate;