import { isEqual } from 'lodash';
import { DeleteInfoProps } from '../../types';
import { RequestTypes } from '../../utils/constants';
import {
  buttonsTitles,
  deleteDescriptionFirstPart,
  deleteDescriptionSecondPart,
  deleteTitles,
  formLabels,
} from '../../utils/texts';

export const getDeleteInfo = (
  type?: RequestTypes,
  id?: string,
  deleteFunction?: () => void,
): DeleteInfoProps => {
  return {
    deleteButtonText:
      type === RequestTypes.GET_ONCE ? buttonsTitles.deleteExcerpt : buttonsTitles.deleteRequest,
    deleteDescriptionFirstPart: deleteDescriptionFirstPart.entity,
    deleteDescriptionSecondPart:
      type === RequestTypes.GET_ONCE
        ? deleteDescriptionSecondPart.excerpt
        : deleteDescriptionSecondPart.request,
    deleteTitle: type === RequestTypes.GET_ONCE ? deleteTitles.excerpt : deleteTitles.request,
    deleteName: `Nr. ${id} `,
    deleteFunction,
  };
};

export const getFormTypes = (isTenantUser: boolean) => {
  const formTypes = [
    {
      title: 'Gauti išrašą/Atsisiųsti duomenis',
      description:
        'Suteikiama galimybė gauti išrašą apie jums priklausančioje teritorijoje esančias saugomas/invazines rūšis.',
      value: RequestTypes.GET_ONCE,
    },
    {
      title: 'Gauti prieigą',
      description: 'Suteikiama galimybė peržiūrėti saugomų rūšių radavietes žemėlapyje.',
      value: RequestTypes.GET,
    },
    {
      title: 'Tapti ekspertu',
      description:
        'Suteikiama galimybė tikrinti saugomas/invazines augalų, gyvūnų ir grybų rūšių anketas, matyti jų radavietes žemėlapyje',
      value: RequestTypes.CHECK,
    },
  ].filter((item) => {
    if (isEqual(item.value, RequestTypes.CHECK)) {
      return !isTenantUser;
    }

    return true;
  });

  return formTypes;
};

export const getMapPath = (disabled = false) => {
  const param = new URLSearchParams();
  const path = '/edit';

  if (disabled) {
    param.append('preview', 'true');
  } else {
    param.append('types[]', 'polygon');
    param.append('multi', 'true');
  }

  return `${path}?${param}`;
};

export const getScope = (isDeletedRequest: boolean) => (isDeletedRequest ? 'deleted' : '');

export const getFileName = (id: string) => {
  const amountOfCharacters = 7;

  return `${formLabels.documentNo}${String(id).padStart(amountOfCharacters, '0')}`;
};

export const getDownloadUrl = (url?: string, fileName?: string, extension?: string): string => {
  if (!url || !fileName || !extension) return '';

  return `${url}?download=${encodeURIComponent(
    removeDiacritics(fileName)
      .replace(/[.\s]+/g, '-')
      .toLowerCase()
      .replace(/[^\w-]/g, ''),
  )}.${extension}`;
};

const removeDiacritics = (str: string): string => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};
