import { FeatureCollection } from '@aplinkosministerija/design-system';
import { FileProps, FormHistory, HandleChangeType } from '../../types';
import { RequestTypes, SpeciesTypes, StatusTypes } from '../../utils/constants';

export interface RequestFormProps {
  notifyEmail?: string;
  taxonomies?: any[];
  files: FileProps[];
  generatedFile: string;
  description?: string;
  isCorrectFormInformation?: boolean;
  status?: StatusTypes;
  history?: FormHistory[];
  type?: RequestTypes;
  commitToProtectData?: boolean;
  accessDate?: Date;
  receiveDate?: Date;
  exactCoordinates?: boolean;
  comment?: string;
  geom?: FeatureCollection;
  speciesTypes: SpeciesTypes[];
}

export interface RequestFormServerProps {
  taxonomies:
    | {
        id: any;
        taxonomy: any;
      }[]
    | undefined;
  files: FileProps[];
  speciesTypes: SpeciesTypes[];
  comment: string | undefined;
  notifyEmail: string | undefined;
  data: {
    accessDate?: Date | undefined;
    receiveDate?: Date | undefined;
    exactCoordinates?: boolean | undefined;
    description: string | undefined;
  };
  geom?: FeatureCollection;
  type: RequestTypes | undefined;
}

export interface FormTypeContainerProps {
  handleChange: HandleChangeType;
  type?: RequestTypes;
  disabled: boolean;
  label?: string;
}

export interface AdditionalInfoComponentProps {
  values: RequestFormProps;
  errors: { [key: string]: string };
  handleChange: HandleChangeType;
  disabled: boolean;
}
export interface AdditionalFieldsByFormTypeProps {
  values: RequestFormProps;
  errors: { [key: string]: string };
  handleChange: HandleChangeType;
  disabled: boolean;
}

export interface SpeciesTypeContainerProps {
  disabled?: boolean;
  speciesTypes: SpeciesTypes[];
  handleChange: HandleChangeType;
}

export interface SpeciesTaxonomiesProps {
  onChange: HandleChangeType;
  files?: File[];
  values: RequestFormProps;
  errors: { [key: string]: string };
  disabled?: boolean;
  taxonomies?: any[];
}
