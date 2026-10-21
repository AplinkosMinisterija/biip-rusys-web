import { describe, expect, it, vi } from 'vitest';
import * as Yup from 'yup';
import { CriteriaSign, SpeciesCriteria } from '../types';
import { EMPTY_SPECIES_CRITERIA } from './constants';
import { validationTexts } from './texts';
import { getObservationFormValidationSchema, ObservationFormRules } from './validation';

// validation.ts reaches the design-system through a photo-upload component that cannot evaluate
// outside a browser; neither symbol takes part in the rules under test.
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
    expect(await errorFor(EMPTY_SPECIES_CRITERIA, 'activityId', { activityId: null })).toBe(
      undefined,
    );
  });

  it('requires a sign when the criterion offers signs', async () => {
    expect(await errorFor(criteria, 'activityId', { activityId: null })).toBe(
      validationTexts.requireSelect,
    );
  });

  it('requires a stage when the chosen sign offers stages', async () => {
    expect(await errorFor(criteria, 'evolutionId', { activityId: 77, evolutionId: null })).toBe(
      validationTexts.requireSelect,
    );
  });

  it('does not require a stage when the chosen sign offers none', async () => {
    expect(await errorFor(criteria, 'evolutionId', { activityId: 78, evolutionId: null })).toBe(
      undefined,
    );
  });

  it('accepts a stored sign the criterion no longer offers', async () => {
    expect(await errorFor(criteria, 'activityId', { activityId: 41 })).toBe(undefined);
  });

  it('does not force a sign onto a form stored before the criterion had any', async () => {
    expect(
      await errorFor(criteria, 'activityId', { activityId: null }, { predatesSigns: true }),
    ).toBe(undefined);
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
    const values = { activityId: null, evolutionId: null };

    expect(await errorFor(EMPTY_SPECIES_CRITERIA, 'activityId', values)).toBe(undefined);
    expect(await errorFor(EMPTY_SPECIES_CRITERIA, 'evolutionId', values)).toBe(undefined);
  });
});
