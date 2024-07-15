import * as Yup from 'yup';
import { validationTexts } from './texts';

import {
  AnimalActivity,
  FormTypes,
  MammalMethodType,
  RequestTypes,
  SpeciesTypes,
} from './constants';

import { isEqual } from 'lodash';
import { availableMimeTypes } from '../components/fields/DragAndDropUploadField';
import { availablePhotoMimeTypes } from '../components/fields/PhotoUploadField';
import { Species } from '../types';
import { phoneNumberRegexPattern } from '@aplinkosministerija/design-system';

export const validateForm = Yup.object().shape(
  {
    species: Yup.object().required(validationTexts.requireSelect).nullable(),
    source: Yup.object().required(validationTexts.requireSelect).nullable(),
    transect: Yup.object().when(['species', 'transect'], {
      is: (species: Species, transect) => {
        const hasTransect = [
          FormTypes.ENDANGERED_ANIMAL,
          FormTypes.ENDANGERED_MUSHROOM,
          FormTypes.ENDANGERED_PLANT,
        ].includes(species?.formType);

        return hasTransect && transect;
      },
      then: Yup.object()
        .shape({
          height: Yup.string()
            .required(validationTexts.requireText)
            .matches(/^(?=.*[1-9])\d*(?:\.\d+)?$/, 'Turi būti teigiama reikšmė'),
          width: Yup.string()
            .required(validationTexts.requireText)
            .matches(/^(?=.*[1-9])\d*(?:\.\d+)?$/, 'Turi būti teigiama reikšmė'),
        })
        .nullable(),
    }),

    description: Yup.string().required(validationTexts.requireText).nullable(),
    geom: Yup.object().required(validationTexts.requireMap).nullable(),
    observedBy: Yup.string().required(validationTexts.requireText).nullable(),
    observedAt: Yup.date().required(validationTexts.requireSelect).nullable(),
    activity: Yup.string().when(['species'], {
      is: (species: Species) => {
        return isEqual(species?.formType, FormTypes.ENDANGERED_ANIMAL);
      },
      then: Yup.string().required(validationTexts.requireSelect).nullable(),
    }),

    evolution: Yup.string().when(['species', 'activity'], {
      is: (species: Species, activity: AnimalActivity) =>
        [FormTypes.ENDANGERED_MUSHROOM, FormTypes.ENDANGERED_PLANT].includes(species?.formType) ||
        [AnimalActivity.HABITATION, AnimalActivity.OBSERVED_ALIVE, AnimalActivity.OTHER].includes(
          activity,
        ),
      then: Yup.string().required(validationTexts.requireSelect).nullable(),
    }),
    quantity: Yup.string().when(['species'], {
      is: (species: Species) => {
        const isInvasivePlant = isEqual(FormTypes.INVASIVE_PLANT, species?.formType);

        return !isInvasivePlant;
      },
      then: Yup.string()
        .required(validationTexts.requireText)
        .matches(/^[0-9][0-9]*$/, 'Turi būti teigiama reikšmė'),
    }),
    method: Yup.string().when(['species'], {
      is: (species: Species) => {
        const formType = species?.formType;

        const hasMethod = [
          FormTypes.INVASIVE_CRUSTACEAN,
          FormTypes.INVASIVE_FISH,
          FormTypes.INVASIVE_MOLLUSK,
          FormTypes.INVASIVE_MAMMAL,
          FormTypes.INVASIVE_PLANT,
        ].includes(formType);

        return hasMethod;
      },
      then: Yup.string().required(validationTexts.requireSelect).nullable(),
    }),
    methodValue: Yup.string().when(['species', 'method'], {
      is: (species: Species, method: string) => {
        const isInvasiveMammal = isEqual(FormTypes.INVASIVE_MAMMAL, species?.formType);

        const isObservationValue = isEqual(MammalMethodType.OBSERVATION, method);

        return isInvasiveMammal && !isObservationValue;
      },
      then: Yup.string().required(validationTexts.requireText).nullable(),
    }),
    isCorrectFormInformation: Yup.boolean()
      .required(validationTexts.requireSelect)
      .oneOf([true], validationTexts.requireSelect),
  },
  [
    ['quantity', 'method'],
    ['transect', 'transect'],
  ],
);

export const validateCreateTenantUser = Yup.object().shape({
  firstName: Yup.string().required(validationTexts.requireText).nullable(),
  lastName: Yup.string().required(validationTexts.requireText).nullable(),
  personalCode: Yup.string()
    .required(validationTexts.requireText)
    .length(11, validationTexts.personalCode)
    .nullable(),
  phone: Yup.string()
    .required(validationTexts.requireText)
    .trim()
    .matches(phoneNumberRegexPattern, validationTexts.badPhoneFormat)
    .nullable(),
  email: Yup.string()
    .email(validationTexts.badEmailFormat)
    .required(validationTexts.requireText)
    .nullable(),
});

export const validateUpdateTenantUser = Yup.object().shape({
  firstName: Yup.string().required(validationTexts.requireText).nullable(),
  lastName: Yup.string().required(validationTexts.requireText).nullable(),
  phone: Yup.string()
    .required(validationTexts.requireText)
    .trim()
    .matches(phoneNumberRegexPattern, validationTexts.badPhoneFormat)
    .nullable(),
  email: Yup.string().email(validationTexts.badEmailFormat).required(validationTexts.requireText),
});

export const validateRequestForm = Yup.object().shape({
  notifyEmail: Yup.string()
    .email(validationTexts.badEmailFormat)
    .required(validationTexts.requireText)
    .nullable(),
  taxonomies: Yup.array().min(1, validationTexts.requireSelect).nullable(),
  description: Yup.string().required(validationTexts.requireText).nullable(),
  isCorrectFormInformation: Yup.boolean()
    .required(validationTexts.requireSelect)
    .oneOf([true], validationTexts.requireSelect),

  commitToProtectData: Yup.boolean().when('speciesTypes', {
    is: (speciesTypes) => speciesTypes.includes(SpeciesTypes.ENDANGERED),
    then: Yup.boolean()
      .required(validationTexts.requireSelect)
      .oneOf([true], validationTexts.requireSelect),
  }),

  geom: Yup.object()
    .when('type', {
      is: (type) => type !== RequestTypes.CHECK,
      then: Yup.object().required(validationTexts.requireMap).nullable(),
    })
    .nullable(),

  files: Yup.array().when('speciesTypes', {
    is: (speciesTypes) => speciesTypes.includes(SpeciesTypes.ENDANGERED),
    then: Yup.array()
      .required(validationTexts.requireFiles)
      .min(1, validationTexts.requireFiles)
      .nullable(),
  }),
});

export const validateProfileForm = Yup.object().shape({
  firstName: Yup.string()
    .required(validationTexts.requireText)
    .test('validFirstName', validationTexts.validFirstName, (values) => {
      if (/\d/.test(values || '')) return false;

      return true;
    }),
  lastName: Yup.string()
    .required(validationTexts.requireText)
    .test('validLastName', validationTexts.validLastName, (values) => {
      if (/\d/.test(values || '')) return false;

      return true;
    }),
  phone: Yup.string()
    .required(validationTexts.requireText)
    .trim()
    .matches(phoneNumberRegexPattern, validationTexts.badPhoneFormat),
  email: Yup.string().email(validationTexts.badEmailFormat).required(validationTexts.requireText),
});

export const validateFileSizes = (files: File[]) => {
  const maxSize = 20;
  for (let i = 0; i < files.length; i++) {
    const fileSizeIntoMb = files[i].size / 1024 / 1024;
    if (fileSizeIntoMb > maxSize) {
      return false;
    }
  }

  return true;
};

export const validatePhotoTypes = (files: File[]) => {
  for (let i = 0; i < files.length; i++) {
    const availableType = availablePhotoMimeTypes.find((type) => type === files[i].type);
    if (!availableType) return false;
  }
  return true;
};

export const validateFileTypes = (files: File[]) => {
  for (let i = 0; i < files.length; i++) {
    const availableType = availableMimeTypes.find((type) => type === files[i].type);
    if (!availableType) return false;
  }
  return true;
};

export const loginSchema = Yup.object().shape({
  email: Yup.string().required(validationTexts.requireText).email(validationTexts.badEmailFormat),
  password: Yup.string().required(validationTexts.requireText),
});

export const validateUpdateTenantForm = Yup.object().shape({
  phone: Yup.string()
    .required(validationTexts.requireText)
    .trim()
    .matches(phoneNumberRegexPattern, validationTexts.badPhoneFormat),
  email: Yup.string().email(validationTexts.badEmailFormat).required(validationTexts.requireText),
});
