/**
 * @license
 * Copyright CERN and copyright holders of ALICE O2. This software is
 * distributed under the terms of the GNU General Public License v3 (GPL
 * Version 3), copied verbatim in the file "COPYING".
 *
 * See http://alice-o2.web.cern.ch/license for full licensing information.
 *
 * In applying this license CERN does not waive the privileges and immunities
 * granted to it by virtue of its status as an Intergovernmental Organization
 * or submit itself to any jurisdiction.
 */

import {
    Observable,
    QueryRouter,
    Loader,
    sessionService,
} from '/js/src/index.js';

import Overview from './views/Overview/Overview.js';

/**
 * Root of model tree
 * Handle global events: keyboard, websocket and router location change
 */
export default class Model extends Observable {
    /**
     * Load all sub-models and bind event handlers
     */
    constructor() {
        super();

        this.session = sessionService.get();
        this.session.personid = parseInt(this.session.personid, 10);

        // Bind Models
        this.loader = new Loader(this);
        this.loader.bubbleTo(this);

        this.overview = new Overview(this);
        this.overview.bubbleTo(this);
        // Setup router
        this.router = new QueryRouter();
        this.router.observe(this.handleLocationChange.bind(this));
        this.router.bubbleTo(this);

        this.handleLocationChange(); // Init first page
    }

    /**
     * Delegates sub-model actions depending on new location of the page
     * @returns {vnode} The page to be loaded
     */
    handleLocationChange() {
        switch (this.router.params.page) {
            case 'home':
                break;
            case 'entry':
                break;
            default:
                this.router.go('?page=home');
                break;
        }
    }
}