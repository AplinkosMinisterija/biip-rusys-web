import { describe, expect, it } from 'vitest';
import { CriteriaOption } from '../types';
import { classifierLabel } from './options';

const offered: CriteriaOption = { id: 78, name: 'SUAUGES_INDIVIDAS', value: 'Suaugęs individas' };

describe('classifierLabel', () => {
  it('words an option the way the vocabulary does', () => {
    expect(classifierLabel({ ...offered, active: true })).toBe('Suaugęs individas');
  });

  it('marks a retired option so it reads apart from the one that replaced it', () => {
    expect(
      classifierLabel({ id: 7, name: 'MATURE', value: 'Suaugęs individas', active: false }),
    ).toBe('Suaugęs individas (nebenaudojama)');
  });

  it('leaves a criterion option alone, which never says whether it is active', () => {
    expect(classifierLabel(offered)).toBe('Suaugęs individas');
  });

  it('is blank when there is no option', () => {
    expect(classifierLabel(undefined)).toBe('');
  });
});
