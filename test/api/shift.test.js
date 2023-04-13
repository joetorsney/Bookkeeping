/**
 *  @license
 *  Copyright CERN and copyright holders of ALICE O2. This software is
 *  distributed under the terms of the GNU General Public License v3 (GPL
 *  Version 3), copied verbatim in the file "COPYING".
 *
 *  See http://alice-o2.web.cern.ch/license for full licensing information.
 *
 *  In applying this license CERN does not waive the privileges and immunities
 *  granted to it by virtue of its status as an Intergovernmental Organization
 *  or submit itself to any jurisdiction.
 */

const { resetDatabaseContent } = require('../utilities/resetDatabaseContent.js');
const request = require('supertest');
const { server } = require('../../lib/application');
const { expect } = require('chai');
const { shiftService } = require('../../lib/server/services/shift/ShiftService.js');
const { createLog } = require('../../lib/server/services/log/createLog.js');

module.exports = () => {
    before(resetDatabaseContent);

    describe('GET /api/shift-data', () => {
        it('should successfully return the data related to the current user\'s shift', async () => {
            shiftService.issuesLogEntriesTags = ['RUN'];

            // Create some logs for the shift

            const logIds = [];
            const currentShift = await shiftService.getUserPendingShiftOrFail({ userId: 1 });
            const defaultLogData = {
                title: 'Title',
                text: 'Text',
                subtype: 'comment',
                origin: 'process',
                userId: 2,
                createdAt: currentShift.start,
            };
            // Not kept : not the good tags and user
            await createLog(defaultLogData, [], ['FOOD'], []);
            // Keep the 3 log ids
            logIds.push(await createLog(defaultLogData, [], ['RUN'], []));
            logIds.push(await createLog({ ...defaultLogData, userId: 1 }, [], ['RUN'], []));
            logIds.push(await createLog({ ...defaultLogData, userId: 1 }, [], [], []));
            // Not kept : not the good tags and user
            await createLog(defaultLogData, [], [], []);

            const response = await request(server).get('/api/shift-data?shiftType=ECS');

            expect(response.status).to.equal(200);
            expect(response.body.data).to.be.an('object');
            expect(response.body.data.issuesLogs).to.lengthOf(3);
            expect(response.body.data.issuesLogs.every(({ id }) => logIds.includes(id))).to.be.true;
        });
    });
};
