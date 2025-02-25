import { FeatureCollection } from '@aplinkosministerija/design-system';
import {
  AnimalActivity,
  AnimalEvolutionState,
  FormStatusTypes,
  FormTypes,
  HistoryTypes,
  KingdomTypes,
  MeasurementUnits,
  PlantEvolutionState,
  RequestDocumentType,
  RequestTypes,
  RolesTypes,
  SpeciesTypes,
  StatusTypes,
  TaxonomyOptions,
} from './utils/constants';

export interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: RolesTypes;
  phone?: string;
  personalCode?: string;
  accessDate?: Date;
  stats?: { approvedForms: number; rejectedForms: number };
  isExpert?: boolean;
  profiles?: Profile[];
}

export interface TenantUserProps {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role: RolesTypes;
  phone?: string;
  personalCode?: string;
}

export interface Tenant {
  id?: string;
  name?: string;
  code?: string;
  email?: string;
  phone?: string;
}

export type ProfileId = 'freelancer' | 'expert' | string;

export interface Profile {
  id: ProfileId;
  name: string;
  freelancer: boolean;
  email?: string;
  role: RolesTypes;
}

export interface AuthState {
  loggedIn: boolean;
}

export type Taxonomy = Species | Phylum | Class | Kingdom;

export type AccessTaxonomies = Taxonomy[] & {
  id?: number;
  taxonomy: TaxonomyOptions;
};

export interface TaxonomiesProp {
  type?: {
    id: TaxonomyOptions;
    label: string;
  };
  values?: Taxonomy[];
}

export interface Sources {
  id?: string;
  name: string;
  createdBy?: User;
  createdAt: string;
}

export type FileProps = {
  url: string;
  name: string;
  size: number;
};

export type ResponseFileProps = {
  url: string;
  filename: string;
  size: number;
};

export interface AppState {
  onSync: any;
  selectedHuntingArea: string | null;
  guestInvitationPhoto: string | null;
}
export interface Species {
  id?: string;
  name: string;
  nameLatin: string;
  description?: string;
  class: Class;
  phylum: Phylum;
  kingdom: Kingdom;
  error: string;
  createdBy?: User;
  createdAt: string;
  [key: string]: any;
}

export interface SpeciesSearchProp {
  classId: number;
  className: string;
  classNameLatin: string;
  formType: FormTypes;
  kingdomId: number;
  kingdomName: string;
  kingdomNameLatin: string;
  phylumId: number;
  phylumName: string;
  phylumNameLatin: string;
  speciesId: number;
  speciesName: string;
  speciesNameLatin: string;
  speciesSynonyms: string[];
  speciesType: SpeciesTypes;
  taxonomy: SpeciesSearchProp;
}

export enum FormNoQuantityReason {
  CLEANUP = 'CLEANUP',
  RESEARCH = 'RESEARCH',
}

export interface ListResultProps<T> {
  rows?: T[];
  totalPages?: number;
  error?: string;
}

export interface Class {
  name: string;
  nameLatin: string;
  phylum: Phylum;
  id?: string;
  [key: string]: any;
  createdBy?: User;
  createdAt: string;
}

export interface Phylum {
  name: string;
  nameLatin: string;
  kingdom: Kingdom;
  kingdomId?: string;
  id?: string;
  [key: string]: any;
  createdBy?: User;
  createdAt: string;
}

export interface TransformUser {
  id?: string;
  fullName: string;
  email: string;
  roles: string;
  active: string;
}

export interface Kingdom {
  name: KingdomTypes;
  nameLatin: string;
  id?: string;
  [key: string]: any;
}

export interface TransformObservation {
  id?: string;
  name: string;
  nameLatin: string;
  createdAt: string;
}

export interface Transect {
  width: string;
  height: string;
  unit: MeasurementUnits;
}

export interface Form {
  id: string;
  quantity: string;
  canEdit: boolean;
  transect: Transect;
  method?: string;
  methodValue?: string;
  density: string;
  species: SpeciesSearchProp;
  source: Sources;
  geom: any;
  status: StatusTypes;
  state: FormStatusTypes;
  place: Place;
  description: string;
  createdBy: User;
  history: FormHistory[];
  createdAt: Date;
  respondedAt: Date;
  comment: string;
  error?: string;
  observedBy?: string;
  photos: FileProps[] | File[] | any[];
  observedAt: Date;
  evolution?: AnimalEvolutionState | PlantEvolutionState;
  activity?: AnimalActivity;
  noQuantityReason?: FormNoQuantityReason;
}

export interface Request {
  notifyEmail: string;
  id: string;
  status: StatusTypes;
  generatedFile: string;
  files: FileProps[];
  respondedAt: Date;
  type: RequestTypes;
  createdAt: Date;
  deletedAt: Date;
  createdBy: User;
  updatedAt: Date;
  taxonomies?: AccessTaxonomies[];
  data: {
    description: string;
    email: string;
    accessDate?: Date;
    receiveDate?: Date;
    exactCoordinates?: boolean;
  };
  error?: string;
  history: FormHistory[];
  canEdit: boolean;
  geom?: FeatureCollection;
  speciesTypes?: SpeciesTypes[];
  documentTypes?: RequestDocumentType[];
}

export interface FormHistory {
  type: HistoryTypes;
  comment: string;
  createdBy: User;
  createdAt: Date;
}

export type HandleChangeType = (name: string, value: any) => void;
export type ChildrenType = string | JSX.Element | JSX.Element[] | any;

export interface DeleteInfoProps {
  deleteButtonText: string;
  deleteDescriptionFirstPart: string;
  deleteDescriptionSecondPart: string;
  deleteTitle: string;
  deleteName: string;
  deleteFunction?: () => void;
}

export interface Place {
  id: string;
  code: string;
  status: FormStatusTypes;
  species: Species;
  error?: string;
  createdAt: Date;
}

export interface TransformPlace {
  id?: string;
  code: string;
  species: string;
  status: string;
}

export interface UserFilters {
  firstName?: string;
  lastName?: string;
}
export interface RequestFilters {
  status?: { id: StatusTypes; label: string }[];
  type?: { id: RequestTypes; label: string }[];
  dateFrom?: string;
  dateTo?: string;
  createdBy?: User;
  scope?: string;
}

export interface RequestFilterProps {
  status?: { $in: StatusTypes[] };
  type?: { $in?: RequestTypes[]; $nin?: RequestTypes[] };
  createdAt?: { $gte?: Date; $lt?: Date };
  createdBy?: string | number;
  scope?: string;
}

export interface FormFilters {
  dateFrom?: string;
  dateTo?: string;
  state?: { id: StatusTypes; label: string }[];
  status?: { id: FormStatusTypes; label: string }[];
  noQuantityReason?: { id: FormNoQuantityReason; label: string };

  createdBy?: User;
  species?: SpeciesSearchProp[];
  source?: Sources;
  tenant?: Tenant;
  method?: { id: string; label: string };
  evolution?: { id: string; label: string };
  activity?: { id: string; label: string };
}

export interface FormFiltersProps {
  createdBy?: string | number;
  species?: { $in: number[] };
  createdAt?: { $gte?: Date; $lt?: Date };
  state?: { $in: StatusTypes[] };
  status?: { $in: FormStatusTypes[] };
  method?: string;
  evolution?: string;
  source?: string;
  eunis?: string;
  activity?: string;
  noQuantityReason?: FormNoQuantityReason;
}
