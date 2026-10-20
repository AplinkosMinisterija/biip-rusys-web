import { describe, expect, it } from 'vitest';
import { CriteriaOption, CriteriaSign } from '../../types';
import { getSignOptions, getStageOptions } from './functions';

const vocabulary: CriteriaOption[] = [
  { id: 41, name: 'HABITATION', value: 'Lizdas, ola ir pan' },
  { id: 77, name: 'STEBETAS_GYVAS', value: 'Stebėtas gyvas' },
  { id: 90, name: 'SUAUGES_INDIVIDAS', value: 'Suaugęs individas' },
];

const stage: CriteriaOption = { id: 90, name: 'SUAUGES_INDIVIDAS', value: 'Suaugęs individas' };

const sign: CriteriaSign = {
  id: 77,
  name: 'STEBETAS_GYVAS',
  value: 'Stebėtas gyvas',
  stages: [stage],
};

const signs: CriteriaSign[] = [sign];

describe('getSignOptions', () => {
  it('leaves the offered signs alone when nothing is stored', () => {
    expect(getSignOptions(signs, {}, vocabulary)).toEqual(signs);
  });

  it('leaves the offered signs alone when the stored sign is still offered', () => {
    expect(getSignOptions(signs, { id: 77, name: 'STEBETAS_GYVAS' }, vocabulary)).toEqual(signs);
  });

  it('prepends a deactivated stored sign labelled from the vocabulary', () => {
    const options = getSignOptions(signs, { id: 41, name: 'HABITATION' }, vocabulary);

    expect(options).toHaveLength(2);
    expect(options[0]).toEqual({
      id: 41,
      name: 'HABITATION',
      value: 'Lizdas, ola ir pan (nebenaudojama)',
      stages: [],
    });
  });

  it('falls back to the stored code when the vocabulary has no row', () => {
    const options = getSignOptions(signs, { id: 999, name: 'GONE' }, vocabulary);

    expect(options[0].value).toBe('GONE (nebenaudojama)');
  });

  it('offers no signs for a species with no criterion', () => {
    expect(getSignOptions([], {}, vocabulary)).toEqual([]);
  });

  it('keeps the injected option distinct from an offered one carrying the same label', () => {
    const legacy: CriteriaOption = { id: 10, name: 'MATURE', value: 'Suaugęs individas' };
    const offered: CriteriaSign = {
      id: 90,
      name: 'SUAUGES_INDIVIDAS',
      value: 'Suaugęs individas',
      stages: [],
    };

    const options = getSignOptions([offered], { id: 10, name: 'MATURE' }, [legacy]);

    expect(options).toHaveLength(2);
    expect(options[0].value).not.toBe(options[1].value);
  });
});

describe('getStageOptions', () => {
  it('offers no stages when the chosen sign has none', () => {
    expect(getStageOptions({ ...sign, stages: [] }, {}, vocabulary)).toEqual([]);
  });

  it('prepends a deactivated stored stage to the offered stages', () => {
    const options = getStageOptions(sign, { id: 41, name: 'HABITATION' }, vocabulary);

    expect(options).toHaveLength(2);
    expect(options[0].value).toBe('Lizdas, ola ir pan (nebenaudojama)');
  });

  it('offers nothing when no sign is chosen and nothing is stored', () => {
    expect(getStageOptions(undefined, {}, vocabulary)).toEqual([]);
  });
});
