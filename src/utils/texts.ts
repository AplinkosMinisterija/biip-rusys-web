import {
  AnimalActivity,
  AnimalEvolutionState,
  CrustaceanMethodType,
  FishMethodType,
  HistoryTypes,
  MammalMethodType,
  MeasurementUnits,
  MolluskMethodType,
  MushroomEvolutionState,
  PlantAbundanceType,
  PlantEvolutionState,
  RequestTypes,
  RolesTypes,
  ServerErrors,
  SpeciesTypes,
  StatusTypes,
  TaxonomyOptions,
} from './constants';

export const emptyStateLabels = {
  form: 'Jūs neturite pateikę stebėjimo anketų. Sukurkite ',
  user: 'Jūs neturite Naudotojų. Sukurkite ',
  accessRequest: 'Jūs neturite pateikę prašymų. Pateikite ',
  excerpt: 'Jūs neturite pateikę išrašų prašymų Pateikite ',
};

export const emptyStateUrlLabels = {
  form: 'naują stebėjimo anketą',
  user: 'naują naudotoją.',
  request: 'naują prašymą.',
};

export const url = {
  new: 'naujas',
  publicSris: 'https://sris.biip.lt',
  publicInva: 'https://inva.biip.lt',
  upload: '/api/public/files',
};
export const subTitles = {
  dataUpdate: 'Duomenų koregavimas',
  legalPerson: 'Juridinis asmuo',
};

export const formFiltersLabels = {
  source: 'Šaltinis',
  method: 'metodas',
  activity: 'Veiklos požymiai',
  evolution: 'Vystymosi stadija',
  dateFrom: 'Sukūrimo data nuo',
  dateTo: 'Sukūrimo data iki',
  status: 'Būsena',
  species: 'Rūšis',
  users: 'Pateikė',
  type: 'Tipas',
};

export const userFilterLabels = {
  firstName: 'Vardas',
  lastName: 'Pavardė',
};

export const usersLabels = {
  fullName: { label: 'Vardas, pavardė', show: true },
  email: { label: 'Elektroninis paštas', show: true },
  phone: { label: 'Telefono numeris', show: true },
};

export const tenantUsersLabels = {
  fullName: { label: 'Vardas, pavardė', show: true },
  email: { label: 'Elektroninis paštas', show: true },
  role: { label: 'Teisė', show: true },
};

export const myObservationFormLabels = {
  name: {
    label: 'Rūšis',
    mobileOrder: 1,
    desktopOrder: 1,
    show: true,
  },

  createdAt: {
    label: 'Duomenų įvedimo data',
    mobileOrder: 4,
    desktopOrder: 3,
    show: true,
  },
  observedAt: {
    label: 'Stebėjimo data',
    mobileOrder: 5,
    desktopOrder: 4,
    show: true,
  },
  status: {
    label: 'Būsena',
    mobileOrder: 2,
    desktopOrder: 5,
    show: true,
  },
  respondedAt: {
    label: 'Atsakymo data',
    mobileOrder: 7,
    desktopOrder: 7,
    show: true,
  },
};

export const observationFormLabels = {
  ...myObservationFormLabels,
  createdBy: {
    label: 'Pateikė',
    mobileOrder: 3,
    desktopOrder: 2,
    show: true,
  },
};

export const commonRequestsLabels = {
  type: {
    label: 'Tipas',
    mobileOrder: 3,
    desktopOrder: 2,
    show: true,
  },
  createdAt: {
    label: 'Teikimo data',
    mobileOrder: 4,
    desktopOrder: 3,
    show: true,
  },

  respondedAt: {
    label: 'Atsakymo data',
    mobileOrder: 5,
    desktopOrder: 5,
    show: true,
  },

  generatedFile: {
    label: '',
    mobileOrder: 7,
    desktopOrder: 7,
    show: true,
  },
};
export const myRequestsLabels = {
  ...commonRequestsLabels,
  status: {
    label: 'Būsena',
    mobileOrder: 2,
    desktopOrder: 4,
    show: true,
  },
};

export const deletedRequestsLabels = {
  ...commonRequestsLabels,
  createdBy: {
    label: 'Pateikė',
    mobileOrder: 1,
    desktopOrder: 1,
    show: true,
  },
  deletedAt: {
    label: 'Panaikinimo data',
    mobileOrder: 6,
    desktopOrder: 6,
    show: true,
  },
};

export const requestsLabels = {
  ...myRequestsLabels,
  createdBy: {
    label: 'Pateikė',
    mobileOrder: 1,
    desktopOrder: 1,
    show: true,
  },
};

export const pageTitles = {
  observationForms: 'Stebėjimo anketos',
  excerpts: 'Išrašo prašymai',
  requests: 'Prašymai',
  newRequest: 'Naujas prašymas',
  formReview: 'Stebėjimo anketos peržiūra',
  request: (id: string) => `Prašymo Nr. ${id}`,
  newExcerpt: 'Naujas išrašas',
  excerpt: (id: string) => `Išrašo prašymas Nr. ${id}`,
  profile: 'Profilis',
  tasks: 'Užduotys',
  newForm: 'Nauja stebėjimo anketa',
  updateForm: 'Atnaujinti stebėjimo anketą',
  inviteTenantUser: 'Pakviesti darbuotoją',
  updateTenantUser: 'Atnaujinti darbuotoją',
  forms: 'Stebėjimo anketos',
  places: 'Radavietės',
  users: 'Naudotojai',
  class: 'Būriai',
  types: 'Tipai/Klasės',
  updateProfile: 'Atnaujinti profilį',
  tenantUsers: 'Įmonės darbuotojai',
  title: 'Rūšių stebėjimas',
};

export const menuLabels = {
  observationForms: 'Stebėjimo anketos',
  excerpts: 'Išrašai',
  requests: 'Prašymai',
  profile: 'Profilis',
  tenantUsers: 'Įmonės darbuotojai',
  tenant: 'Įmonė',
  myProfile: 'MANO PASKYRA',
};
export const buttonsTitles = {
  download: 'Atsisiųsti',
  returnToLogin: 'Grįžti į prisijungimo langą',
  or: 'Arba',
  eLogin: 'Prisijungti per el. valdžios vartus',
  fillOutRequest: 'Pildyti prašymą',
  newExcerpt: 'Naujas išrašas',
  inviteTenantUser: 'Pakviesti darbuotoją',
  checkData: 'Naujas prašymas',
  columns: 'Stulpeliai',
  getData: 'Noriu gauti prieigą',
  addNew: '+ Pridėti naują',
  newClass: 'Nauja klasė',
  newForm: 'Nauja stebėjimo anketa',
  logout: 'Atsijungti',
  newType: 'Naujas tipas',
  newSpecie: 'Nauja rūšis',
  newUser: 'Naujas naudotojas',
  save: 'Išsaugoti',
  submit: 'Pateikti',
  back: 'Grįžti atgal',
  generate: 'Generuoti',
  approve: 'Tvirtinti',
  return: 'Grąžinti taisymui',
  reject: 'Atmesti',
  importData: 'Įkelti duomenis',
  templateFile: 'Šablono failas',
  clearAll: 'Išvalyti visus',
  filter: 'Filtruoti',
  resetPassword: 'Atstatyti slaptažodį',
  createPassword: 'Nustatyti slaptažodį',
  login: 'Prisijungti',
  eGates: 'Prisijungti per el. valdžios vartus',
  edit: 'Atnaujinti',
  view: 'Peržiūrėti',
  removeTenantUser: 'Pašalinti darbuotoją',
  removeForm: 'Pašalinti stebėjimą',
  deleteGroup: 'Ištrinti grupę',
  sarasas: 'Sąrašas',
  zemelapis: 'Žemėlapis',
  padalintas: 'Padalintas vaizdas',
  newTenant: 'Nauja įmonė',
  newFish: 'Nauja žuvis',
  cancel: 'Atšaukti',
  delete: 'Ištrinti',
  deleteRequest: 'Ištrinti prašymą',
  deleteExcerpt: 'Ištrinti išrašą',
};

export const formLabels = {
  notGrantedAccess: 'Nesuteikta prieiga',
  infoAboutTenant: 'Informacija apie įmonę',
  selectProfile: 'Pasirinkite paskyrą',
  history: 'Istorija',
  tenantUserInfo: 'Darbuotojo kontaktinė informacija',
  accessGranted: 'Prieiga suteikta',
  name: 'Pavadinimas',
  description: 'Aprašymas',
  gallery: 'Galerija',

  directives: 'Direktyvos',
  mainPhoto: 'Pagrindinė nuotrauka',
  scientificClassification: 'Mokslinė klasifikacija',
  informationAboutObservedSpecie: 'Informacija apie stebėtą rūšį',
  informationAboutObservedSpecieIndividuals: 'Informacija apie stebėtos rūšies individus',
  map: 'Žemėlapis',
  photos: 'Nuotraukos',
  dataAboutObserver: 'Duomenys apie stebėtoją',
  observationalHistory: 'Stebėjimų istorija',
  profileInfo: 'Profilio informacija',
  additionalInfo: 'Papildoma informacija',
  contactInfo: 'Prašymo teikėjo kontaktinė informacija',
  documents: 'Dokumentai',
};

export const inputLabels = {
  area: 'Plotas',
  generating: 'Išrašas kuriamas',
  method: 'Metodas',
  abundance: 'Gausumas',
  respondentsNumber: 'Respondentų skaičius',
  daysNumber: 'Dienų skaičius',
  daysNumberTrapsNumber: 'Dienų skaičius * Spąstų skaičius',
  drivenDistance: 'Nuvažiuotas astumas',
  specifyOtherMethod: 'Nurodykite kitą metodą',
  noData: 'Nėra duomenų',
  chooseOption: 'Pasirinkite',
  comment: 'Komentaras',
  speciesType: 'Rūšių tipas',
  or: 'arba',
  place: 'Radavietė',
  uploadPhotos: 'Įkelti nuotraukas',
  receiveDate: 'Nurodykite, kokios dienos situaciją norite gauti',
  pressToWant: 'Paspauskite norėdami',
  uploadOrDragFilesHere: 'įkelti arba įtempkite failus čia',
  fileTypesAndMaxSize: 'PDF, PNG, JPEG, JPG (maks. 20MB)',
  profiles: 'PASKYROS',
  accessDate: 'Prieigos galiojimo laikas iki:',
  exactCoordinates: 'Noriu gauti tikslų radaviečių koordinačių sąrašą',
  description: 'Duomenų tikrinimo tikslas',
  commitToProtectData:
    'Įsipareigoju gautus duomenis, kuriuose yra tikslios saugomų gyvūnų, augalų ir gyvūnų rūšių radaviečių koordinatės, naudoti tik nurodytais tikslais, neatskleisti jų kitiems asmenims, jei tai galėtų sukelti grėsmę saugomų rūšių išlikimui.',
  correctInformation: 'Patvirtinu, kad nurodyta informacija teisinga',
  checkSpeciesTerritories: 'Pasirinkite rūšis ir teritorijas',
  repliesWIllBeSentToThisEmail:
    'Šiuo el. pašto adresu bus siunčiama informacija apie prašymo būseną',
  specie: 'Rūšis',
  species: 'Rūšys',
  source: 'Šaltinis',
  sources: 'Šaltiniai',
  length: 'Ilgis',
  width: 'Plotis',
  classification: 'Klasifikavimas',
  observationBiotope: 'Buveinė, elgsena, ūkinė veikla ir kita informacija',
  observedSpecieIndividualsQuantity: 'Individų skaičius (gausumas)',
  partWatchArea: 'Stebiu dalyje ploto',
  measurementUnits: 'Matavimo vienetai',
  individualsQuantity: 'Individų skaičius',
  placeArea: 'Radavietės plotas',
  observedAt: 'Stebėjimo data',
  createdBy: 'Duomenis įvedė',
  dataEnteredDate: 'Duomenų įvedimo data',
  observedBy: 'Stebėtojas',
  firstName: 'Vardas',
  gallery: 'Galerija',
  companyCode: 'Įmonės kodas',
  directives: 'Direktyvos',
  name: 'Pavadinimas',
  nameLatin: 'Lotyniškas pavadinimas',
  scientificClassification: 'Mokslinė klasifikacija',
  kingdom: 'Karalystė',
  class: 'Klasė',
  phylum: 'Tipas',
  lastName: 'Pavardė',
  phone: 'Telefonas',
  email: 'El. pašto adresas',
  legalPersonName: 'Juridinio asmens pavadinimas',
  personalCode: 'Asmens kodas',
  duties: 'Pareigos',
  groupUsers: 'Grupės naudotojai',
  getData: 'gauti duomenims',
  expirationDate: 'Paskyros galiojimo terminas',
  role: 'Rolė',
  password: 'Slaptažodis',
  rememberMe: 'Likti prisijungus',
  newPassword: 'Naujas slaptažodis',
  repeatNewPassword: 'Pakartokite naują slaptažodį',
  qualificationDocuments:
    'Įkelkite duomenų tikrinimo tikslą ir/ar jūsų kvalifikaciją pagrindžiančius dokumentus',
  quantity: 'vnt.',
  evolution: 'Vystymosi stadija',
  activity: 'Veiklos požymiai',
  noOptions: 'Nėra pasirinkimų',
};

export const typeFileLabels = {
  [RequestTypes.GET]: 'Gautų duomenų naudojimo tikslą pagrindžiantys dokumentai',
  [RequestTypes.GET_ONCE]: 'Išrašo duomenų naudojimo tikslą pagrindžiantys dokumentai',
  [RequestTypes.CHECK]:
    'Įkelkite duomenų tikrinimo tikslą ir/ar jūsų kvalifikaciją pagrindžiančius dokumentus',
};

export const roleLabels = {
  [RolesTypes.ADMIN]: 'Administratorius',
  [RolesTypes.USER]: 'Naudotojas',
};

export const measurementUnitsLabels = {
  [MeasurementUnits.CENTIMETER]: 'Centimetrai',
  [MeasurementUnits.METER]: 'Metrai',
};

export const shortMeasurementUnitsLabels = {
  [MeasurementUnits.CENTIMETER]: 'cm',
  [MeasurementUnits.METER]: 'm',
  [MeasurementUnits.KILOMETER]: 'km',
  [MeasurementUnits.HECTARES]: 'ha',
};

export const observationFormStatusLabels = {
  [StatusTypes.CREATED]: 'Pateikta',
  [StatusTypes.SUBMITTED]: 'Pateikta pakartotinai ',
  [StatusTypes.RETURNED]: 'Grąžinta taisymui',
  [StatusTypes.REJECTED]: 'Atmesta',
  [StatusTypes.APPROVED]: 'Patvirtinta',
};

export const requestStatusLabels = {
  [StatusTypes.CREATED]: 'Pateiktas',
  [StatusTypes.SUBMITTED]: 'Pateiktas pakartotinai ',
  [StatusTypes.RETURNED]: 'Grąžintas taisymui',
  [StatusTypes.REJECTED]: 'Atmestas',
  [StatusTypes.APPROVED]: 'Patvirtintas',
};

export const taxonomyOptionLabels = {
  [TaxonomyOptions.SPECIES]: 'Rūšis',
  [TaxonomyOptions.PHYLUM]: 'Tipas',
  [TaxonomyOptions.KINGDOM]: 'Karalystė',
  [TaxonomyOptions.CLASS]: 'Klasė',
};

export const taxonomyOptionLabelsPlural = {
  [TaxonomyOptions.SPECIES]: 'Rūšis',
  [TaxonomyOptions.PHYLUM]: 'Tipus',
  [TaxonomyOptions.KINGDOM]: 'Karalystes',
  [TaxonomyOptions.CLASS]: 'Būrius',
};

export const taxonomyOptionLabelsSingular = {
  [TaxonomyOptions.SPECIES]: 'Rūšį',
  [TaxonomyOptions.PHYLUM]: 'Tipą',
  [TaxonomyOptions.KINGDOM]: 'Karalystę',
  [TaxonomyOptions.CLASS]: 'Būrį',
};

export const typeDescriptionLabels = {
  [RequestTypes.GET]: 'Gautų duomenų naudojimo tikslas',
  [RequestTypes.GET_ONCE]: 'Gautų išrašo duomenų naudojimo tikslas',
  [RequestTypes.CHECK]: 'Duomenų tikrinimo tikslas',
};

export const requestTypeLabels = {
  [RequestTypes.CHECK]: 'Tikrinti',
  [RequestTypes.GET]: 'Gauti',
  [RequestTypes.GET_ONCE]: 'Išrašas',
};

export const animalEvolutionStateLabels = {
  [AnimalEvolutionState.EGG]: 'Kiaušinis',
  [AnimalEvolutionState.LARVA]: 'Lerva',
  [AnimalEvolutionState.IMMATURE]: 'Jaunas, nesubrendęs individas',
  [AnimalEvolutionState.PUPA]: 'Lėliukė',
  [AnimalEvolutionState.DEAD]: 'Negyvas individas',
  [AnimalEvolutionState.MATURE]: 'Suaugęs individas',
};

export const plantEvolutionStateLabels = {
  [PlantEvolutionState.VEGETATING]: 'Daigas/vegetuojantis augalas',
  [PlantEvolutionState.BLOOMING]: 'Žydintis augalas',
  [PlantEvolutionState.FRUIT_BEARING]: 'Vaisius duodantis augalas',
  [PlantEvolutionState.DRY]: 'Sausas (nudžiūvęs) augalas, augalo liekanos',
};

export const mushroomEvolutionStateLabels = {
  [MushroomEvolutionState.GROWING]: 'Augantis grybas arba kerpė',
  [MushroomEvolutionState.DRIED_UP]: 'Sudžiūvęs grybas ar kerpė',
};
export const animalActivityLabels = {
  [AnimalActivity.FAECES]: 'Išmatos',
  [AnimalActivity.CUD]: 'Išvamos (atrajos)',
  [AnimalActivity.HABITATION]: 'Lizdas, ola ir pan',
  [AnimalActivity.OBSERVED_FOOTPRINT]: 'Stebėti pėdsakai',
  [AnimalActivity.OBSERVED_ALIVE]: 'Stebėtas gyvas (praskrendantis, besimaitinantis ir kt.)',
  [AnimalActivity.OTHER]: 'Kiti buvimo požymiai (balsai ir kt.)',
};

export const observationFormActionLabels = {
  [StatusTypes.APPROVED]: 'Tvirtinama stebėjimo anketa',
  [StatusTypes.RETURNED]: 'Grąžinti stebėjimo anketą taisymui',
  [StatusTypes.REJECTED]: 'Atmesti stebėjimo anketą',
  [StatusTypes.SUBMITTED]: 'Pateikti stebėjimo anketą',
};

export const requestFormActionLabels = {
  [StatusTypes.APPROVED]: 'Tvirtinamas prašymas',
  [StatusTypes.RETURNED]: 'Grąžinti prašymą taisymui',
  [StatusTypes.REJECTED]: 'Atmesti prašymą',
  [StatusTypes.SUBMITTED]: 'Pateikti prašymą',
};

export const observationFormHistoryLabels = {
  [HistoryTypes.CREATED]: 'Pateikta',
  [HistoryTypes.UPDATED]: 'Pateikta pakartotinai',
  [HistoryTypes.REJECTED]: 'Atmesta',
  [HistoryTypes.PLACE_CREATED]: 'Sukurta radavietė',
  [HistoryTypes.RETURNED]: 'Grąžinta taisyti',
  [HistoryTypes.PLACE_CHANGED]: 'Pakeista radavietė',
  [HistoryTypes.PLACE_ASSIGNED]: 'Priskirta radavietė',
  [HistoryTypes.APPROVED]: 'Priimta',
  [HistoryTypes.DELETED]: 'Ištrinta',
};

export const requestFormHistoryLabels = {
  [HistoryTypes.CREATED]: 'Pateiktas',
  [HistoryTypes.UPDATED]: 'Pateiktas pakartotinai',
  [HistoryTypes.REJECTED]: 'Atmestas',
  [HistoryTypes.FILE_GENERATED]: 'Išrašas paruoštas',
  [HistoryTypes.PLACE_CREATED]: 'Sukurta radavietė',
  [HistoryTypes.RETURNED]: 'Grąžintas taisyti',
  [HistoryTypes.PLACE_CHANGED]: 'Pakeista radavietė',
  [HistoryTypes.PLACE_ASSIGNED]: 'Priskirta radavietė',
  [HistoryTypes.APPROVED]: 'Priimtas',
  [HistoryTypes.DELETED]: 'Ištrintas',
};

export const validationTexts = {
  formFillError: 'Neteisingai užpildyta forma',
  requireMap: 'Privalote pasirinkti vietą žemėlapyje',
  photoNotUploaded: 'Nuotrauka neįkelta',
  requirePhotos: 'Privalote įkelti nuotrauką',
  requireSpeciesType: 'Privalote pasirinkti bent vieną rūšių tipą',
  requireText: 'Privalomas laukelis',
  requireSelect: 'Privalote pasirinkti',
  badEmailFormat: 'Blogas el. pašto adresas',
  badPhoneFormat: 'Blogai įvestas telefono numeris',
  tooFrequentRequest: 'Nepavyko, per dažna užklausa prašome pabandyti veliau ',
  [ServerErrors.WRONG_PASSWORD]: 'Blogas elektroninis paštas arba slaptažodis',
  [ServerErrors.USER_NOT_FOUND]: 'Naudotojo su tokiu el. paštu nėra',
  [ServerErrors.AUTH_USER_EXISTS]: 'Darbuotojas jau yra įmonėje',
  passwordsDoNotMatch: 'Slaptažodžiai nesutampa',
  error: 'Įvyko nenumatyta klaida, prašome pabandyti vėliau',
  validFirstName: 'Įveskite taisyklingą vardą',
  validLastName: 'Įveskite taisyklingą pavardę',
  badFileTypes: 'Blogi failų tipai',
  fileSizesExceeded: 'Viršyti failų dydžiai',
  personalCode: 'Neteisingas asmens kodo formatas',
  positiveNumber: 'Reikšmė turi būti didesnė už nulį',
  requireFiles: 'Privalote įkelti dokumentus',
  atLeastOneColumn: 'Turi būti pasirinktas bent vienas stulpelis',
  profileUpdated: 'Profilis atnaujintas',
  profileMustBeFullyCompleted: 'Profilio laukeliai turi būti užpildyti',
  tenantUpdated: 'Įmonė atnaujinta',
  tenantMustBeFullyCompleted: 'Įmonės laukeliai turi būti užpildyti',
};

export const descriptions = {
  getDataAboutPlaces:
    'Norėdami matyti tikslų radaviečių žemėlapį, pateikite prašymą gauti prieigą.',
  getMoreDataAboutPlaces:
    'Norėdami matyti daugiau radaviečių žemėlapyje, pateikite prašymą gauti prieigą.',
  mainDescription:
    'Naudotojai gali teikti informaciją apie pastebėtas saugomas ir invazines rūšis bei gauti prieigą apie jų paplitimą.',
  forgotPasswordDescription:
    'Jeigu pamiršote slaptažodį, įrašykite savo el. pašto adresą ir mes padėsime jį atkurti',
  instructionSentDescription: 'Jūsų nurodytu el. paštu išsiuntėme prisijungimo instrukciją',
  biipDescription: 'Biologinės įvairovės informacinė platforma',
  passwordChangedDescription:
    '  Jūsų slaptažodis sėkmingai pakeistas. Galite prisijungti prie paskyros',
  passwordCreatedDescription:
    '  Jūsų slaptažodis sėkmingai sukurtas. Galite prisijungti prie paskyros',
  resetPasswordDescription: 'Naujas slaptažodis neturi sutapti su senuoju slaptažodžiu',
  tableNotFound: 'Atsiprašome nieko neradome pagal pasirinktus filtrus',
  footerTitle: '© Lietuvos Respublikos aplinkos ministerija, 2013-2024',
  footerDescription:
    '  Duomenys apie įmonę kaupiami ir saugomi Juridinių asmenų registre. Įmonės kodas: 188602370 | Adresas: A. Jakšto g. 4, 01105 Vilnius Telefonas: +370 626 22 252 | El. paštas: info@am.lt',
};

export const deleteTitles = {
  tenantUser: 'Pašalinti darbuotoją',
  request: 'Ištrinti prašymą',
  form: 'Ištrinti stebėjimą',
  excerpt: 'Ištrinti išrašą',
};

export const deleteDescriptionFirstPart = {
  entity: 'Ar esate tikri, kad norite pašalinti',
};

export const deleteDescriptionSecondPart = {
  tenantUser: 'darbuotoją?',
  request: 'prašymą?',
  form: 'stebėjimą?',
  excerpt: 'išrašą?',
};

export const speciesTypeLabels = {
  [SpeciesTypes.ENDANGERED]: 'Saugoma',
  [SpeciesTypes.INVASIVE]: 'Invazinė',
};

export const fishMethodTypeLabels = {
  [FishMethodType.OBSERVATION]: 'Stebėjimas',
  [FishMethodType.AMATEUR_FISHING_TOOLS]: 'Sugauta mėgėjiškais žūklės įrankiais',
  [FishMethodType.SPECIAL_FISHING_TOOLS]: 'Sugauta specialiosios žūklės įrankiais',
  [FishMethodType.OTHER]: 'Kita',
};

export const crustaceanMethodTypeLabels = {
  [CrustaceanMethodType.OBSERVATION]: 'Stebėjimas',
  [CrustaceanMethodType.AMATEUR_FISHING_TOOLS]: 'Sugauta mėgėjiškais žūklės įrankiais',
  [CrustaceanMethodType.SPECIAL_FISHING_TOOLS]: 'Sugauta specialiosios žūklės įrankiais',
  [CrustaceanMethodType.LANDING_NET]: 'Rankinis graibštas',
  [CrustaceanMethodType.OTHER]: 'Kita',
};

export const molluskMethodTypeLabels = {
  [MolluskMethodType.OBSERVATION]: 'Stebėjimas',
  [MolluskMethodType.TRAP]: 'Gaudyklė',
  [MolluskMethodType.COLLECTION]: 'Rinkimas',
  [MolluskMethodType.LANDING_NET]: 'Rankinis graibštas',
  [MolluskMethodType.OTHER]: 'Kita',
};

export const mammalMethodTypeLabels = {
  [MammalMethodType.ACCOUNTING]: 'Apskaita',
  [MammalMethodType.SURVEY]: 'Apklausa',
  [MammalMethodType.OBSERVATION]: 'Stebėjimas',
  [MammalMethodType.CAMERA]: 'Rinkimas',
  [MammalMethodType.TRAP]: 'Spąstai',
  [MammalMethodType.DEAD_INDIVIDUALS_REGISTRATION]: 'Keliuose žuvusių individų registravimas',
  [MammalMethodType.OTHER]: 'Kita',
};

export const plantAbundanceTypeLabels = {
  [PlantAbundanceType.VALUE_1]:
    '1 - pasitaiko tik pavienių individų, jie užima 0,1% buveinės ploto.',
  [PlantAbundanceType.VALUE_2]:
    '2 - augalai pasklidę nedideliame plote ir užima ne daugiau kaip 1% buveinės ploto.',
  [PlantAbundanceType.VALUE_3]:
    '3 - augalai pasklidę visame kontūre, bet užima ne daugiau kaip 1% buveinės ploto.',
  [PlantAbundanceType.VALUE_4]:
    '4 - augalai auga pavieniui arba nedidelėmis grupėmis, užima nuo 1% iki 10% buveinės ploto.',
  [PlantAbundanceType.VALUE_5]:
    '5 - augalai auga pavieniui arba grupėmis dalyje kontūro ir užima nuo 20% iki 40% buveinės ploto.',
  [PlantAbundanceType.VALUE_6]:
    '6 - augalai ar jų sąžalynai pasklidę po visą kontūrą ir užima nuo 20% iki 40% buveinės ploto.',
  [PlantAbundanceType.VALUE_7]:
    '7 - augalai ar jų sąžalynai pasitaiko dalyje kontūro, bet jie užima nuo 40% iki 60% buveinės ploto.',
  [PlantAbundanceType.VALUE_8]:
    '8 - augalai ar jų sąžalynai pasklidę po visą kontūrą ir užima nuo 40% iki 60% buveinės ploto.',
  [PlantAbundanceType.VALUE_9]:
    '9 - augalai sudaro didelius sąžalynus ir užima nuo 60% iki 80% buveinės ploto.',
  [PlantAbundanceType.VALUE_10]:
    '10 - augalai sudaro beveik ištisinį sąžalyną ir užima daugiau kaip 80% buveinės ploto.',
};
