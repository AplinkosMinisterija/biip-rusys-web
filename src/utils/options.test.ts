import { describe, expect, it } from 'vitest';
import { ClassifierOption } from '../types';
import { ClassifierGroups } from './constants';
import { getClassifierFilterOptions } from './options';

const option = (
  id: number,
  name: string,
  value: string,
  active: boolean,
  group = ClassifierGroups.EVOLUTION,
): ClassifierOption => ({ id, name, value, group, active });

describe('getClassifierFilterOptions', () => {
  it('sends the code as the filter value', () => {
    const options = getClassifierFilterOptions(
      [option(90, 'SUAUGES_INDIVIDAS', 'Suaugęs individas', true)],
      ClassifierGroups.EVOLUTION,
    );

    expect(options).toEqual([{ id: 'SUAUGES_INDIVIDAS', label: 'Suaugęs individas' }]);
  });

  it('keeps only the older row of a code the legacy vocabulary seeded twice', () => {
    const options = getClassifierFilterOptions(
      [
        option(20, 'GROWING', 'Augantis augalas', false),
        option(25, 'GROWING', 'Augantis grybas arba kerpė', false),
      ],
      ClassifierGroups.EVOLUTION,
    );

    expect(options).toEqual([{ id: 'GROWING', label: 'Augantis augalas (nebenaudojama)' }]);
  });

  it('keeps two generations of the same label distinct', () => {
    const options = getClassifierFilterOptions(
      [
        option(10, 'MATURE', 'Suaugęs individas', false),
        option(90, 'SUAUGES_INDIVIDAS', 'Suaugęs individas', true),
      ],
      ClassifierGroups.EVOLUTION,
    );

    expect(options).toHaveLength(2);
    expect(options[0].label).not.toBe(options[1].label);
  });

  it('ignores options from another group', () => {
    const options = getClassifierFilterOptions(
      [option(41, 'HABITATION', 'Lizdas, ola ir pan', false, ClassifierGroups.ACTIVITY)],
      ClassifierGroups.EVOLUTION,
    );

    expect(options).toEqual([]);
  });
});
