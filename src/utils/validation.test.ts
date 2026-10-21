import { describe, expect, it, vi } from 'vitest';
import * as Yup from 'yup';
import { CriteriaSign, SpeciesCriteria } from '../types';
import { EMPTY_SPECIES_CRITERIA } from './constants';
import { validationTexts } from './texts';
import { getObservationFormValidationSchema, ObservationFormRules } from './validation';

// validation.ts pulls the design-system in via PhotoUploadField, which needs a browser to evaluate.
vi.mock('@aplinkosministerija/design-system', () => ({ phoneNumberRegexPattern: /^\+370\d{8}$/ }));
vi.mock('../components/fields/PhotoUploadField', () => ({ availablePhotoMimeTypes: [] }));

const signWithStages: CriteriaSign = {
  id: 77,
  name: 'STEBETAS_GYVAS',
  value: 'Stebėtas gyvas',
  stages: [{ id: 90, name: 'SUAUGES_INDIVIDAS', value: 'Suaugęs individas' }],
};

const signWithoutStages: CriteriaSign = {
  id: 78,
  name: 'NERASTA',
  value: 'Nerasta',
  stages: [],
};

const criteria: SpeciesCriteria = {
  criteria: { id: 1, name: 'Vabzdžiai' },
  signs: [signWithStages, signWithoutStages],
};

const errorFor = async (
  criteria: SpeciesCriteria,
  field: string,
  values: Record<string, unknown>,
  overrides: Partial<Omit<ObservationFormRules, 'criteria'>> = {},
): Promise<string | undefined> => {
  const rules = { criteria, predatesSigns: false, criteriaFailed: false, ...overrides };

  try {
    await getObservationFormValidationSchema(rules).validateAt(field, values);
    return undefined;
  } catch (error) {
    return (error as Yup.ValidationError).message;
  }
};

describe('getObservationFormValidationSchema', () => {
  it('does not require a sign for a species with no criterion', async () => {
    expect(await errorFor(EMPTY_SPECIES_CRITERIA, 'activity', { activity: null })).toBe(undefined);
  });

  it('requires a sign when the criterion offers signs', async () => {
    expect(await errorFor(criteria, 'activity', { activity: null })).toBe(
      validationTexts.requireSelect,
    );
  });

  it('requires a stage when the chosen sign offers stages', async () => {
    expect(
      await errorFor(criteria, 'evolution', { activity: signWithStages, evolution: null }),
    ).toBe(validationTexts.requireSelect);
  });

  it('does not require a stage when the chosen sign offers none', async () => {
    expect(
      await errorFor(criteria, 'evolution', { activity: signWithoutStages, evolution: null }),
    ).toBe(undefined);
  });

  it('accepts a stored sign the criterion no longer offers', async () => {
    expect(
      await errorFor(criteria, 'activity', {
        activity: { id: 41, name: 'HABITATION', value: 'Lizdas, ola ir pan' },
      }),
    ).toBe(undefined);
  });

  it('does not force a sign onto a form stored before the criterion had any', async () => {
    expect(await errorFor(criteria, 'activity', { activity: null }, { predatesSigns: true })).toBe(
      undefined,
    );
  });

  it('blocks the form when the criterion could not be loaded', async () => {
    expect(
      await errorFor(criteria, 'species', { species: { speciesId: 1 } }, { criteriaFailed: true }),
    ).toBe(validationTexts.criteriaUnavailable);
  });

  it('lets the species through once the criterion has loaded', async () => {
    expect(await errorFor(criteria, 'species', { species: { speciesId: 1 } })).toBe(undefined);
  });

  it('requires neither field while the criterion is still loading', async () => {
    const values = { activity: null, evolution: null };

    expect(await errorFor(EMPTY_SPECIES_CRITERIA, 'activity', values)).toBe(undefined);
    expect(await errorFor(EMPTY_SPECIES_CRITERIA, 'evolution', values)).toBe(undefined);
  });
});
