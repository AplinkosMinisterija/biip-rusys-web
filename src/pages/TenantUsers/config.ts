import { FilterInputTypes } from '../../components/other/DynamicFilter/Filter';
import { userFilterLabels } from '../../utils/texts';

export const filterConfig = () => ({
  firstName: {
    label: userFilterLabels.firstName,
    key: 'firstName',
    inputType: FilterInputTypes.text,
  },
  lastName: {
    label: userFilterLabels.lastName,
    key: 'lastName',
    inputType: FilterInputTypes.text,
  },
});

export const rowConfig = [['firstName', 'lastName']];
