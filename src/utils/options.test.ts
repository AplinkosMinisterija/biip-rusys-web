import { describe, expect, it } from 'vitest';
import { ClassifierOption } from '../types';
import { ClassifierGroups } from './constants';
import { classifierOptionLabel } from './options';

const option = (value: string, active: boolean): ClassifierOption => ({
  id: 1,
  name: 'MATURE',
  value,
  group: ClassifierGroups.EVOLUTION,
  active,
});

describe('classifierOptionLabel', () => {
  it('shows an offered option as it comes', () => {
    expect(classifierOptionLabel(option('Suaugęs individas', true))).toBe('Suaugęs individas');
  });

  it('marks a deactivated option so two generations stay distinct', () => {
    expect(classifierOptionLabel(option('Suaugęs individas', false))).toBe(
      'Suaugęs individas (istorinė reikšmė)',
    );
  });

  it('stays blank for a chip left over from the old filter shape', () => {
    expect(classifierOptionLabel(undefined)).toBe('');
    expect(classifierOptionLabel({ id: 1, label: 'Suaugęs individas' } as never)).toBe('');
  });
});
