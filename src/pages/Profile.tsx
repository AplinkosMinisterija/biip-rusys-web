import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import Cookies from 'universal-cookie';
import api from '../api';
import SimpleContainer from '../components/containers/SimpleContainer';
import TextField from '../components/fields/TextField';
import FormikFormPageWrapper from '../components/wrappers/FormikFormPageWrapper';
import { useAppSelector } from '../state/hooks';
import { device } from '../styles';
import { User } from '../types';
import {
  handleErrorFromServerToast,
  handleSuccessToast,
  isProfileFullyCompleted,
} from '../utils/functions';
import { formLabels, inputLabels, pageTitles, validationTexts } from '../utils/texts';
import { validateProfileForm } from '../utils/validation';

export interface UserProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

const cookies = new Cookies();

const Profile = () => {
  const user: User = useAppSelector((state) => state?.user?.userData);
  const token = cookies.get('token');
  const queryClient = useQueryClient();

  const updateForm = useMutation((values: UserProps) => api.updateProfile(values, user?.id), {
    onError: () => {
      handleErrorFromServerToast();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries([token]);
      handleSuccessToast(validationTexts.profileUpdated);
    },
    retry: false,
  });

  const initialProfileValues: UserProps = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
  };

  const renderProfileForm = (values: UserProps, errors: any, handleChange: any) => {
    return (
      <>
        <SimpleContainer title={formLabels.profileInfo}>
          <>
            <Row>
              <TextField
                label={inputLabels.firstName}
                value={values.firstName}
                error={errors.firstName}
                disabled={true}
                name="firstName"
                onChange={(firstName) => handleChange('firstName', firstName)}
              />
              <TextField
                label={inputLabels.lastName}
                disabled={true}
                name="lastName"
                value={values.lastName}
                error={errors.lastName}
                onChange={(lastName) => handleChange('lastName', lastName)}
              />
              <TextField
                label={inputLabels.phone}
                value={values.phone}
                error={errors.phone}
                name="phone"
                onChange={(phone) => handleChange('phone', phone)}
              />
              <TextField
                label={inputLabels.email}
                name="email"
                value={values.email}
                error={errors.email}
                onChange={(email) => handleChange('email', email)}
              />
            </Row>
          </>
        </SimpleContainer>
      </>
    );
  };

  return (
    <FormikFormPageWrapper
      back={false}
      title={pageTitles.updateProfile}
      validateOnMount={!isProfileFullyCompleted(user)}
      initialValues={initialProfileValues}
      onSubmit={updateForm.mutateAsync}
      renderForm={renderProfileForm}
      validationSchema={validateProfileForm}
    />
  );
};

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;

  @media ${device.mobileL} {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export default Profile;
