import {
  FormNoQuantityReason,
  HandleChangeType,
  Sources,
  SpeciesSearchProp,
  Transect,
} from './../../types';
import {
  AnimalActivity,
  AnimalEvolutionState,
  PlantEvolutionState,
  StatusTypes,
} from './../../utils/constants';

export interface FormProps {
  species?: SpeciesSearchProp;
  method?: string;
  methodValue?: string;
  source?: Sources;
  quantity: string;
  transect?: Transect;
  description: string;
  photos: any[];
  geom: any;
  observedBy: string;
  observedAt?: Date;
  isCorrectFormInformation: boolean;
  status?: StatusTypes;
  comment?: string;
  evolution?: AnimalEvolutionState | PlantEvolutionState;
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
  geom?: any;
  photos?: any[];
  observedBy: string;
  observedAt: Date | undefined;
  status?: StatusTypes;
  comment?: string;
  evolution?: AnimalEvolutionState | PlantEvolutionState;
  activity: AnimalActivity | undefined;
  noQuantityReason?: FormNoQuantityReason;
}

export interface SpecieActivityProps {
  values: FormProps;
  errors: { [key: string]: string };
  setValues: any;
  handleChange: HandleChangeType;
  disabled: boolean;
}

export interface ObservedSpecieDataContainerProps {
  values: FormProps;
  errors: { [key: string]: any };
  setValues: any;
  handleChange: HandleChangeType;
  disabled: boolean;
}

export interface ObserverDataContainerProps {
  values: FormProps;
  errors: { [key: string]: string };
  handleChange: HandleChangeType;
  disabled: boolean;
  id?: string;
}

export interface PhotoContainerProps {
  photos: any[];
  photoError?: string;
  handleChange: HandleChangeType;
  disabled: boolean;
}

export interface TransectInfoFieldsProps {
  disabled: boolean;
  handleChange: HandleChangeType;
  transect?: Transect;
  errors: { [key: string]: string };
}
