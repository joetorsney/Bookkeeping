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

const { createLog } = require('../../../../../lib/server/services/log/createLog.js');
const { shiftService } = require('../../../../../lib/server/services/shift/ShiftService.js');
const { expect } = require('chai');
const { ShiftTypes } = require('../../../../../lib/domain/enums/ShiftTypes.js');

module.exports = () => {
    const shift1 = new Date('2020-02-02 12:00:00').getTime();

    it('Should successfully return the logs related to a given ECS shift', async () => {
        const defaultLogData = {
            title: 'Title',
            text: 'Text',
            subtype: 'comment',
            origin: 'process',
            userId: 2,
            createdAt: new Date(shift1 + 5000),
        };
        // Not kept : not the good tags
        await createLog(defaultLogData, [], ['EoS'], [], [], []);
        await createLog(defaultLogData, [], ['ECS Shifter', 'EoS'], [], [], []);
        // Kept
        await createLog(defaultLogData, [], ['ECS Shifter'], [], [], []);

        const logs = await shiftService.getShiftIssues(shift1, ShiftTypes.ECS);
        expect(logs).to.lengthOf(1);
        expect(logs[0].tags.every(({ text }) => text !== 'EoS')).to.be.true;
        expect(logs[0].tags.some(({ text }) => text === 'ECS Shifter')).to.be.true;
    });

    it('Should successfully return the logs related to a given QC shift', async () => {
        const defaultLogData = {
            title: 'Title',
            text: 'Text',
            subtype: 'comment',
            origin: 'process',
            userId: 2,
            createdAt: new Date(shift1 + 5000),
        };
        // Not kept : not the good tags
        await createLog(defaultLogData, [], ['EoS'], [], [], []);
        await createLog(defaultLogData, [], ['QC/PDP Shifter', 'EoS'], [], [], []);
        // Kept
        await createLog(defaultLogData, [], ['QC/PDP Shifter'], [], [], []);

        const logs = await shiftService.getShiftIssues(shift1, ShiftTypes.QC_PDP);
        expect(logs).to.lengthOf(1);
        expect(logs[0].tags.every(({ text }) => text !== 'EoS')).to.be.true;
        expect(logs[0].tags.some(({ text }) => text === 'QC/PDP Shifter')).to.be.true;
    });

    it('Should successfully return the logs related to a given SLIMOS shift', async () => {
        const defaultLogData = {
            title: 'Title',
            text: 'Text',
            subtype: 'comment',
            origin: 'process',
            userId: 2,
            createdAt: new Date(shift1 + 5000),
        };
        // Not kept : not the good tags
        await createLog(defaultLogData, [], ['EoS'], [], [], []);
        await createLog(defaultLogData, [], ['SLIMOS', 'EoS'], [], [], []);
        // Kept
        await createLog(defaultLogData, [], ['SLIMOS'], [], [], []);

        const logs = await shiftService.getShiftIssues(shift1, ShiftTypes.SLIMOS);
        expect(logs).to.lengthOf(1);
        expect(logs[0].tags.every(({ text }) => text !== 'EoS')).to.be.true;
        expect(logs[0].tags.some(({ text }) => text === 'SLIMOS')).to.be.true;
    });

    it('Should successfully return the logs related to a given Shift Leader shift', async () => {
        const defaultLogData = {
            title: 'Title',
            text: 'Text',
            subtype: 'comment',
            origin: 'process',
            userId: 2,
            createdAt: new Date(shift1 + 5000),
        };
        // Not kept : not the good tags
        await createLog(defaultLogData, [], ['EoS'], [], [], []);
        await createLog(defaultLogData, [], ['Shift Leader', 'EoS'], [], [], []);
        // Kept
        await createLog(defaultLogData, [], ['Shift Leader'], [], [], []);

        const logs = await shiftService.getShiftIssues(shift1, ShiftTypes.SL);
        expect(logs).to.lengthOf(1);
        expect(logs[0].tags.every(({ text }) => text !== 'EoS')).to.be.true;
        expect(logs[0].tags.some(({ text }) => text === 'Shift Leader')).to.be.true;
    });
};
