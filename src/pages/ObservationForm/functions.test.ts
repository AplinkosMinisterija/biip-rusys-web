import { describe, expect, it } from 'vitest';
import { CriteriaOption, CriteriaSign } from '../../types';
import { getStageOptions } from './functions';

const stage: CriteriaOption = { id: 90, name: 'SUAUGES_INDIVIDAS', value: 'Suaugęs individas' };

const withStages: CriteriaSign = {
  id: 77,
  name: 'STEBETAS_GYVAS',
  value: 'Stebėtas gyvas',
  stages: [stage],
};

const withoutStages: CriteriaSign = { id: 65, name: 'NERASTA', value: 'Nerasta', stages: [] };

const signs: CriteriaSign[] = [withStages, withoutStages];

describe('getStageOptions', () => {
  it('offers the stages of the chosen sign', () => {
    expect(getStageOptions(signs, withStages)).toEqual([stage]);
  });

  it('offers nothing when the chosen sign has no stages', () => {
    expect(getStageOptions(signs, withoutStages)).toEqual([]);
  });

  it('offers nothing when no sign is chosen', () => {
    expect(getStageOptions(signs, null)).toEqual([]);
  });

  it('offers nothing for a retired sign no criterion lists', () => {
    const retired: CriteriaOption = { id: 16, name: 'HABITATION', value: 'Lizdas, ola ir pan' };

    expect(getStageOptions(signs, retired)).toEqual([]);
  });

  it('offers nothing for a species with no criterion', () => {
    expect(getStageOptions([], withStages)).toEqual([]);
  });
});
