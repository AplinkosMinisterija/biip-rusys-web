import { isEqual } from 'lodash';
import { DeleteInfoProps } from '../../types';
import { RequestTypes } from '../../utils/constants';
import {
  buttonsTitles,
  deleteDescriptionFirstPart,
  deleteDescriptionSecondPart,
  deleteTitles,
} from '../../utils/texts';

export const getDeleteInfo = (
  type?: RequestTypes,
  id?: string,
  deleteFunction?: () => void,
): DeleteInfoProps => {
  return {
    deleteButtonText:
      type === RequestTypes.GET_ONCE ? buttonsTitles.deleteExcerpt : buttonsTitles.deleteRequest,
    deleteDescriptionFirstPart: deleteDescriptionFirstPart.request,
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
      title: 'Gauti išrašą',
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

export const getMapQueryString = (disabled = false) => {
  const queryString = `?`;
  const param = new URLSearchParams();

  if (disabled) {
    param.append('preview', 'true');
    return queryString + param;
  }

  param.append('types[]', 'polygon');
  param.append('multi', 'true');
  return queryString + param;
};

export const getScope = (isDeletedRequest: boolean) => (isDeletedRequest ? 'deleted' : '');
