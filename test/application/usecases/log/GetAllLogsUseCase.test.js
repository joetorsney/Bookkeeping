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

const { repositories: { LogRepository } } = require('../../../../lib/database');
const { log: { GetAllLogsUseCase } } = require('../../../../lib/application/usecases');
const chai = require('chai');

const { expect } = chai;

module.exports = () => {
    it('should return an array', async () => {
        const result = await new GetAllLogsUseCase()
            .setLogRepository(LogRepository)
            .execute();

        expect(result).to.be.an('array');
    });
};
