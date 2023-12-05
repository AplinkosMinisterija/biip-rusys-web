import { isEqual } from 'lodash';
import RequestCard from '../../../components/containers/RequestCard';
import { RequestTypes, SpeciesTypes } from '../../../utils/constants';
import { useGetFormTypes } from '../hooks/useGetFormTypes';
import { TypeContainer } from '../styles';
import { FormTypeContainerProps } from '../types';

export const FormTypeContainer = ({ handleChange, type, disabled }: FormTypeContainerProps) => {
  const formTypes = useGetFormTypes();

  const handleChangeType = (formType) => {
    handleChange('type', formType);

    if (isEqual(formType, RequestTypes.GET)) {
      handleChange('speciesTypes', [SpeciesTypes.ENDANGERED]);
    }
  };

  return (
    <TypeContainer>
      {formTypes.map((formType, index) => (
        <RequestCard
          key={`formTypes-${index}`}
          onClick={() => handleChangeType(formType.value)}
          title={formType.title}
          description={formType.description}
          selected={type === formType.value}
          disabled={disabled}
        />
      ))}
    </TypeContainer>
  );
};
