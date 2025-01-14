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

import { Observable } from '/js/src/index.js';
import { LhcPeriodsOverviewModel } from './Overview/LhcPeriodsOverviewModel.js';

/**
 * LHC Periods model
 */
export class LhcPeriodsModel extends Observable {
    /**
     * The constructor of the model
     */
    constructor() {
        super();

        this._overviewModel = new LhcPeriodsOverviewModel();
        this._overviewModel.bubbleTo(this);
    }

    /**
     * Load the overview page model
     *
     * @returns {void}
     */
    loadOverview() {
        this._overviewModel.fetchLhcPeriods();
    }

    /**
     * Reset the overview page model to its default state
     * @returns {void}
     */
    clearOverview() {
        this._overviewModel.reset();
    }

    /**
     * Returns the model for the overview page
     *
     * @return {LhcPeriodsOverviewModel} the overview model
     */
    get overviewModel() {
        return this._overviewModel;
    }
}
