/*
 * Copyright (c) 2021 FinancialForce.com, inc. All rights reserved.
 */

import { LightningElement, api, track } from "lwc";
import { loadBundle } from "./lib/loadBundle";

class Resonate extends LightningElement {

    @api autoplay;
    @api config;
    @api getState;
    @api setState;

    model;

    cachedState = { mock: "state" };

    @track ready = false;
    @track viewState = {
        error: "",
        previousDisabled: false,
        playPauseDisabled: false,
        nextDisabled: false,
        stepTitle: "",
        stepDescription: "", 
        paused: false,
        progressPercentage: 0
    }

    async connectedCallback() {
        // bundle
        const bundle = await loadBundle(this),
            model = bundle.createModel({
                autoplay: this.autoplay,
                config: this.config,
                getState: this.getStateFromEA.bind(this),
                setState: this.setStateToEA.bind(this)
            });
        this.model = model;
        this.viewState = model.viewState;
        this.ready = true;
        if (!this.isInEditMode()) {
            setInterval(() => this.tick(), 10);
        }
    }

    get hasError() {
        return this.viewState.error != null;
    }

    get pausePlayIcon() {
        return this.viewState.paused ? "utility:play" : "utility:pause";
    }

    /**
     * Hack to see if we're in the editor, setInterval seems to break the whole UI
     */
    
    isInEditMode() {
        return document.location.href.toLowerCase().endsWith("edit")
    }

    /**
     * So I can't properly pass the get/setState functions to TS, need this hack
     */

    readCachedState() {
        this.cachedState = this.getState();
    }

    writeCachedState() {
        if (JSON.stringify(this.cachedState) != JSON.stringify(this.getState())) {
            this.setState(this.cachedState);
        }
    }

    getStateFromEA() {
        return this.cachedState;
    }

    setStateToEA(s) {
        this.cachedState = s;
    }

    // end nasty hack

    tick() {
        this.readCachedState();
        this.model.tick();
        this.viewState = this.model.viewState;
        this.writeCachedState();
    }

    handlePausePlay() {
        this.readCachedState();
        this.model.playPause();
        this.viewState = this.model.viewState;
        this.writeCachedState();
    }

    handleJumpLeft() {
        this.readCachedState();
        this.model.previous();
        this.viewState = this.model.viewState;
        this.writeCachedState();
    }

    handleJumpRight() {
        this.readCachedState();
        this.model.next();
        this.viewState = this.model.viewState;
        this.writeCachedState();
    }

}

export default Resonate;