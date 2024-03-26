export enum AnimalActivity {
  FAECES = 'FAECES',
  CUD = 'CUD',
  HABITATION = 'HABITATION',
  OBSERVED_FOOTPRINT = 'OBSERVED_FOOTPRINT',
  OBSERVED_ALIVE = 'OBSERVED_ALIVE',
  OTHER = 'OTHER',
}

export enum AnimalEvolutionState {
  EGG = 'EGG',
  LARVA = 'LARVA',
  IMMATURE = 'IMMATURE',
  PUPA = 'PUPA',
  DEAD = 'DEAD',
  MATURE = 'MATURE',
}

export enum PlantEvolutionState {
  GROWING = 'GROWING',
  VEGETATING = 'VEGETATING',
  BLOOMING = 'BLOOMING',
  FRUIT_BEARING = 'FRUIT_BEARING',
  DRY = 'DRY',
}

export enum MushroomEvolutionState {
  GROWING = 'GROWING',
  DRIED_UP = 'DRIED_UP',
}

export enum HistoryTypes {
  CREATED = 'CREATED',
  UPDATED = 'UPDATED',
  REJECTED = 'REJECTED',
  PLACE_CREATED = 'PLACE_CREATED',
  FILE_GENERATED = 'FILE_GENERATED',
  RETURNED = 'RETURNED',
  PLACE_CHANGED = 'PLACE_CHANGED',
  PLACE_ASSIGNED = 'PLACE_ASSIGNED',
  APPROVED = 'APPROVED',
  DELETED = 'DELETED',
}

export enum StateTypes {
  STABLE = 'STABLE',
  RELEVANT = 'RELEVANT',
  IRRELEVANT = 'IRRELEVANT',
  REJECTED = 'REJECTED',
  APPROVED = 'APPROVED',
  INITIAL = 'INITIAL',
}

export enum StatusTypes {
  CREATED = 'CREATED',
  SUBMITTED = 'SUBMITTED',
  APPROVED = 'APPROVED',
  RETURNED = 'RETURNED',
  REJECTED = 'REJECTED',
}

export enum RolesTypes {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum ServerErrors {
  USER_NOT_FOUND = `Email not found.`,
  WRONG_PASSWORD = 'WRONG_PASSWORD',
  USER_EXIST = 'User already exists.',
  WRONG_OLD_PASSWORD = 'Wrong old password.',
  PARAMETERS_VALIDATION_ERROR = 'Parameters validation error!',
  NOT_FOUND = 'Not found.',
  ENTITY_NOT_FOUND = 'Entity not found',
  AUTH_USER_EXISTS = 'AUTH_USER_EXISTS',
}
export enum Resources {
  LOGIN = 'auth/login',
  TENANT = 'tenants',
  MAPS_AUTH = 'maps/auth',
  GEOM = 'geom',
  REFRESH_TOKEN = 'auth/refresh',
  VERIFY_USER = 'auth/change/verify',
  SET_PASSWORD = 'auth/change/accept',
  REMIND_PASSWORD = 'auth/remind',
  E_GATES_LOGIN = 'auth/evartai/login',
  E_GATES_SIGN = 'auth/evartai/sign',
  USERS = 'users',
  TAXONOMY_SPECIES = 'taxonomies/species',
  TAXONOMY_CLASSES = 'taxonomyClasses',
  TAXONOMY_KINGDOMS = 'taxonomyKingdoms',
  TAXONOMY_PHYLUMS = 'taxonomyPhylums',
  TAXONOMY_TREE = 'taxonomies/tree',
  TAXONOMY_SEARCH = 'taxonomies/search',
  CLASS = 'class',
  PHYLUM = 'phylum',
  PHYLUMS = 'phylums',
  KINGDOM = 'kingdom',
  SOURCES = 'forms/settings/sources',
  FORMS = 'forms',
  MY_FORMS = 'forms/my',
  HISTORY = 'history',
  PLACE = 'place',
  PLACES = 'places',
  CREATED_BY = 'createdBy',
  SPECIES = 'species',
  ASSIGNEE = 'assignee',
  REQUESTS = 'requests',
  MY_REQUESTS = 'requests/my',
  DELETED_REQUESTS = 'requests/deleted',
  TAXONOMIES = 'taxonomies',
  TAXONOMY = 'taxonomy',
  UPLOAD = 'upload',
  CAN_EDIT = 'canEdit',
}

export enum PlantAbundanceType {
  VALUE_1 = 'VALUE_1',
  VALUE_2 = 'VALUE_2',
  VALUE_3 = 'VALUE_3',
  VALUE_4 = 'VALUE_4',
  VALUE_5 = 'VALUE_5',
  VALUE_6 = 'VALUE_6',
  VALUE_7 = 'VALUE_7',
  VALUE_8 = 'VALUE_8',
  VALUE_9 = 'VALUE_9',
  VALUE_10 = 'VALUE_10',
}

export enum Populations {
  SOURCE = 'source',
  ROLE = 'role',
}

export enum SortFields {
  NAME_DESC = `-name`,
  CREATED_AT = '-createdAt',
  LAST_NAME = 'lastName',
  NAME = 'name',
}

export enum LoadingTypes {
  INIT = 'init',
  DELETE = 'delete',
  SUBMIT = 'submit',
}

export enum FormStatusTypes {
  RELEVANT = 'RELEVANT',
  IRRELEVANT = 'IRRELEVANT',
  APPROVED = 'APPROVED',
  ARCHIVAL = 'ARCHIVAL',
  PREARCHIVAL = 'PREARCHIVAL',
  INFORMATIONAL = 'INFORMATIONAL',
}

export enum PlaceStatusTypes {
  STABLE = 'STABLE',
  INITIAL = 'INITIAL',
  INCREASED = 'INCREASED',
  DECREASED = 'DECREASED',
  DISAPPEARED = 'DISAPPEARED',
  DESTROYED = 'DESTROYED',
}

export enum Entity {
  SPECIES = 'species',
  PHYLUMS = 'phylums',
  CLASSES = 'classes',
  KINGDOMS = 'kingdoms',
  FORMS = 'forms',
  PLACES = 'places',
  USERS = 'USERS',
}

export enum TaxonomyOptions {
  SPECIES = 'SPECIES',
  PHYLUM = 'PHYLUM',
  CLASS = 'CLASS',
  KINGDOM = 'KINGDOM',
}

export enum RequestTypes {
  GET = 'GET',
  CHECK = 'CHECK',
  GET_ONCE = 'GET_ONCE',
}

export enum KingdomTypes {
  MUSHROOMS = 'Grybai',
  PLANTS = 'Augalai',
  ANIMALS = 'Gyvūnai',
}

export enum TagColors {
  BLUE = 'blue',
  BROWN = 'brown',
  GREEN = 'green',
  PINK = 'pink',
  VIOLET = 'violet',
  ORANGE = 'orange',
  SKYBLUE = 'skyblue',
  GREY = 'grey',
}

export const colorsByStatus = {
  [StatusTypes.CREATED]: TagColors.BLUE,
  [StatusTypes.SUBMITTED]: TagColors.VIOLET,
  [StatusTypes.APPROVED]: TagColors.GREEN,
  [StatusTypes.RETURNED]: TagColors.ORANGE,
  [StatusTypes.REJECTED]: TagColors.PINK,
};

export enum MeasurementUnits {
  CENTIMETER = 'CENTIMETER',
  METER = 'METER',
  KILOMETER = 'KILOMETERS',
  HECTARES = 'HECTARES',
}

export enum SpeciesTypes {
  ENDANGERED = 'ENDANGERED',
  INVASIVE = 'INVASIVE',
}

const mapsHost = import.meta.env.VITE_MAPS_HOST;
export const Url = {
  DRAW: `${mapsHost}/edit`,
  SPECIES: `${mapsHost}/rusys`,
};

export enum FormTypes {
  ENDANGERED_ANIMAL = 'ENDANGERED_ANIMAL',
  ENDANGERED_PLANT = 'ENDANGERED_PLANT',
  ENDANGERED_MUSHROOM = 'ENDANGERED_MUSHROOM',
  INVASIVE_PLANT = 'INVASIVE_PLANT',
  INVASIVE_FISH = 'INVASIVE_FISH',
  INVASIVE_MAMMAL = 'INVASIVE_MAMMAL',
  INVASIVE_MOLLUSK = 'INVASIVE_MOLLUSK',
  INVASIVE_CRUSTACEAN = 'INVASIVE_CRUSTACEAN',
  DEFAULT = 'DEFAULT',
}

export enum FishMethodType {
  OBSERVATION = 'OBSERVATION',
  AMATEUR_FISHING_TOOLS = 'AMATEUR_FISHING_TOOLS',
  SPECIAL_FISHING_TOOLS = 'SPECIAL_FISHING_TOOLS',
  OTHER = 'OTHER',
}

export enum CrustaceanMethodType {
  OBSERVATION = 'OBSERVATION',
  AMATEUR_FISHING_TOOLS = 'AMATEUR_FISHING_TOOLS',
  SPECIAL_FISHING_TOOLS = 'SPECIAL_FISHING_TOOLS',
  LANDING_NET = 'LANDING_NET',
  OTHER = 'OTHER',
}

export enum MolluskMethodType {
  OBSERVATION = 'OBSERVATION',
  TRAP = 'TRAP',
  LANDING_NET = 'LANDING_NET',
  COLLECTION = 'COLLECTION',
  OTHER = 'OTHER',
}

export enum MammalMethodType {
  ACCOUNTING = 'ACCOUNTING',
  SURVEY = 'SURVEY',
  OBSERVATION = 'OBSERVATION',
  CAMERA = 'CAMERA',
  TRAP = 'TRAP',
  DEAD_INDIVIDUALS_REGISTRATION = 'DEAD_INDIVIDUALS_REGISTRATION',
  OTHER = 'OTHER',
}

export enum ServerErrorCodes {
  NOT_FOUND = 404,
  NO_PERMISSION = 401,
}

export enum TableItemWidth {
  MEDIUM = '76px',
  SMALL = '40px',
  LARGE = '30px',
}
