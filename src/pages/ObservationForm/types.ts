import type { FeatureCollection } from '@aplinkosministerija/design-system';
import {
  FileProps,
  FormNoQuantityReason,
  HandleChangeType,
  Sources,
  SpeciesSearchProp,
  Transect,
} from '../../types';
import { AnimalActivity, StatusTypes } from '../../utils/constants';

export type ObservationPhoto = FileProps | File;
export type ObservationGeom = FeatureCollection | '';
type ObservationFormFieldErrors = Partial<Record<Exclude<keyof FormProps, 'transect'>, string>>;
export type ObservationFormErrors = ObservationFormFieldErrors & {
  transect?: Partial<Record<keyof Transect, string>>;
};
export type SetObservationFormValues = (values: FormProps, shouldValidate?: boolean) => void;

export interface FormProps {
  species?: SpeciesSearchProp;
  method?: string;
  methodValue?: string;
  source?: Sources;
  quantity: string;
  transect?: Transect;
  description: string;
  photos: ObservationPhoto[];
  geom: ObservationGeom;
  observedBy: string;
  observedAt?: Date;
  isCorrectFormInformation: boolean;
  status?: StatusTypes;
  comment?: string;
  evolutionStateId?: number;
  evolution?: string;
  activity?: AnimalActivity;
  noQuantityReason?: FormNoQuantityReason;
}

export interface FormServerProps {
  transect?: Transect | null;
  quantity: string;
  species: number | undefined;
  source: string | undefined;
  description: string;
  method?: string;
  geom?: FeatureCollection;
  photos?: ObservationPhoto[];
  observedBy: string;
  observedAt: Date | undefined;
  status?: StatusTypes;
  comment?: string;
  evolutionStateId?: number;
  evolution?: string;
  activity: AnimalActivity | undefined;
  noQuantityReason?: FormNoQuantityReason;
}

export interface SpecieActivityProps {
  values: FormProps;
  errors: ObservationFormErrors;
  setValues: SetObservationFormValues;
  handleChange: HandleChangeType;
  disabled: boolean;
}

export interface ObservedSpecieDataContainerProps {
  values: FormProps;
  errors: ObservationFormErrors;
  setValues: SetObservationFormValues;
  handleChange: HandleChangeType;
  disabled: boolean;
}

export interface ObserverDataContainerProps {
  values: FormProps;
  errors: ObservationFormErrors;
  handleChange: HandleChangeType;
  disabled: boolean;
  id?: string;
}

export interface PhotoContainerProps {
  photos: ObservationPhoto[];
  photoError?: string;
  handleChange: HandleChangeType;
  disabled: boolean;
}

export interface TransectInfoFieldsProps {
  disabled: boolean;
  handleChange: HandleChangeType;
  transect?: Transect;
  errors?: Partial<Record<keyof Transect, string>>;
}
