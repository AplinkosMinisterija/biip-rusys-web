import { describe, expect, it } from 'vitest';
import { CriteriaOption, CriteriaSign } from '../../types';
import { getSignOptions, getStageOptions } from './functions';

const habitation: CriteriaOption = { id: 41, name: 'HABITATION', value: 'Lizdas, ola ir pan' };

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
    expect(getSignOptions(signs, null)).toEqual(signs);
  });

  it('leaves the offered signs alone when the stored sign is still offered', () => {
    expect(getSignOptions(signs, 77, sign)).toEqual(signs);
  });

  it('prepends the stored sign the criterion no longer offers, marked as retired', () => {
    const options = getSignOptions(signs, 41, habitation);

    expect(options).toHaveLength(2);
    expect(options[0]).toEqual({
      id: 41,
      name: 'HABITATION',
      value: 'Lizdas, ola ir pan (nebenaudojama)',
      stages: [],
    });
  });

  it('ignores a stored option that is no longer the chosen value', () => {
    expect(getSignOptions(signs, 77, habitation)).toEqual(signs);
  });

  it('offers no signs for a species with no criterion', () => {
    expect(getSignOptions([], null)).toEqual([]);
  });

  it('keeps the injected option distinct from an offered one carrying the same label', () => {
    const legacy: CriteriaOption = { id: 10, name: 'MATURE', value: 'Suaugęs individas' };
    const offered: CriteriaSign = {
      id: 90,
      name: 'SUAUGES_INDIVIDAS',
      value: 'Suaugęs individas',
      stages: [],
    };

    const options = getSignOptions([offered], 10, legacy);

    expect(options).toHaveLength(2);
    expect(options[0].value).not.toBe(options[1].value);
  });
});

describe('getStageOptions', () => {
  it('offers no stages when the chosen sign has none', () => {
    expect(getStageOptions({ ...sign, stages: [] }, null)).toEqual([]);
  });

  it('prepends the stored stage the sign no longer offers', () => {
    const options = getStageOptions(sign, 41, habitation);

    expect(options).toHaveLength(2);
    expect(options[0].value).toBe('Lizdas, ola ir pan (nebenaudojama)');
  });

  it('offers nothing when no sign is chosen and nothing is stored', () => {
    expect(getStageOptions(undefined, null)).toEqual([]);
  });
});
