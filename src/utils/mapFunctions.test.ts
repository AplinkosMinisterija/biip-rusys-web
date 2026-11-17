import { describe, expect, it } from 'vitest';
import { Form } from '../types';
import { mapObservationList } from './mapFunctions';

const form = (overrides: Partial<Form> = {}) =>
  ({
    id: '1',
    createdBy: { firstName: 'Vardas', lastName: 'Pavardenis' },
    ...overrides,
  }) as Form;

describe('mapObservationList — who a form was filed as', () => {
  it('names the organisation when the form was filed for one', () => {
    const [row] = mapObservationList([form({ tenant: { id: '7', name: 'VšĮ Gamta' } })]);

    expect(row.submittedAs).toBe('VšĮ Gamta');
  });

  it('names the person when the form was filed by them alone', () => {
    const [row] = mapObservationList([form()]);

    expect(row.submittedAs).toBe('Vardas Pavardenis');
  });
});
