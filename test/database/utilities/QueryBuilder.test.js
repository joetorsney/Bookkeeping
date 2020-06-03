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

const {
    repositories: {
        LogRepository,
    },
    utilities: {
        QueryBuilder,
    },
} = require('../../../lib/database');
const chai = require('chai');

const { expect } = chai;

module.exports = () => {
    describe('WhereQueryBuilder', () => {
        describe('between', () => {
            it('should return entities with the id in the provided range', async () => {
                const queryBuilder = new QueryBuilder();
                queryBuilder.where('id').between(1, '3');

                const result = await LogRepository.findAll(queryBuilder);
                expect(result).to.not.be.null;
                expect(result).to.have.lengthOf(3);
                expect(result[0].id).to.equal(1);
                expect(result[1].id).to.equal(2);
                expect(result[2].id).to.equal(3);
            });
        });

        describe('is', () => {
            it('should return a single entity with the provided id', async () => {
                const queryBuilder = new QueryBuilder();
                queryBuilder.where('id').is('1');

                const result = await LogRepository.findAll(queryBuilder);
                expect(result).to.not.be.null;
                expect(result).to.have.lengthOf(1);
                expect(result[0].id).to.equal(1);
            });
        });

        describe('allOf', () => {
            it('should return no entities', async () => {
                const queryBuilder = new QueryBuilder();
                queryBuilder.where('id').allOf(1, 2);

                const result = await LogRepository.findAll(queryBuilder);
                expect(result).to.not.be.null;
                expect(result).to.have.lengthOf(0);
            });
        });

        describe('oneOf', () => {
            it('should return a single entity with the provided id', async () => {
                const queryBuilder = new QueryBuilder();
                queryBuilder.where('id').oneOf('1', 2);
                queryBuilder.orderBy('id', 'asc');

                const result = await LogRepository.findAll(queryBuilder);
                expect(result).to.not.be.null;
                expect(result).to.have.lengthOf(2);
                expect(result[0].id).to.equal(1);
                expect(result[1].id).to.equal(2);
            });
        });
    });
};
