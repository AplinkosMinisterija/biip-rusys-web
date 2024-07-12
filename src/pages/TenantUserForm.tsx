import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import SimpleContainer from '../components/containers/SimpleContainer';
import LoaderComponent from '../components/other/LoaderComponent';
import FormPageWrapper from '../components/wrappers/FormikFormPageWrapper';
import { useAppSelector } from '../state/hooks';
import { device } from '../styles';
import { DeleteInfoProps } from '../types';
import { RolesTypes } from '../utils/constants';
import { getRolesTypes, handleErrorFromServerToast, isNew } from '../utils/functions';
import { slugs } from '../utils/routes';
import {
  buttonsTitles,
  deleteDescriptionFirstPart,
  deleteDescriptionSecondPart,
  deleteTitles,
  formLabels,
  inputLabels,
  pageTitles,
} from '../utils/texts';
import { validateCreateTenantUser, validateUpdateTenantUser } from '../utils/validation';
import api from './../api';
import { NumericTextField, PhoneField, SelectField, TextField } from '@aplinkosministerija/design-system';

interface TenantUserProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  role: RolesTypes;
  phone?: string;
  personalCode?: string;
}

const TenantUserForm = () => {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const currentUser = useAppSelector((state) => state.user?.userData);
  const title = isNew(id) ? pageTitles.inviteTenantUser : pageTitles.updateTenantUser;
  const validationSchema = isNew(id) ? validateCreateTenantUser : validateUpdateTenantUser;

  const userMutation = useMutation(
    (values: TenantUserProps) =>
      isNew(id) ? api.createTenantUser(values) : api.updateTenantUser(values, id),
    {
      onError: (e: any) => {
        const errorType = e?.response?.data?.type;
        handleErrorFromServerToast(errorType);
      },
      onSuccess: () => {
        navigate(slugs.tenantUsers);
      },
      retry: false,
    },
  );

  const { data: user, isFetching } = useQuery(['tenantUser', id], () => api.getTenantUser(id), {
    onError: () => {
      navigate(slugs.tenantUsers);
    },
    onSuccess: (user) => {
      if (currentUser?.id === user?.id) return navigate(slugs.profile);
    },
    refetchOnWindowFocus: false,

    enabled: !isNew(id),
  });

  const removeUser = useMutation(() => api.deleteTenantUser(id), {
    onError: () => {
      handleErrorFromServerToast();
    },
    onSuccess: () => {
      navigate(slugs.tenantUsers);
    },
    retry: false,
  });

  const deleteInfo: DeleteInfoProps = {
    deleteButtonText: buttonsTitles.removeTenantUser,
    deleteDescriptionFirstPart: deleteDescriptionFirstPart.tenantUser,
    deleteDescriptionSecondPart: deleteDescriptionSecondPart.tenantUser,
    deleteTitle: deleteTitles.tenantUser,
    deleteName: `${user?.firstName} ${user?.lastName}`,
    deleteFunction: !isNew(id) ? removeUser.mutateAsync : undefined,
  };

  const initialValues: TenantUserProps = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    personalCode: user?.personalCode || '',
    role: user?.role || RolesTypes.USER,
  };
  const renderForm = (values: TenantUserProps, errors: any, handleChange: any) => {
    return (
      <InnerContainer>
        <SimpleContainer title={formLabels.tenantUserInfo}>
          <>
            <Row>
              <TextField
                label={inputLabels.firstName}
                value={values.firstName}
                error={errors.firstName}
                name="firstName"
                onChange={(firstName) => handleChange('firstName', firstName)}
              />

              <TextField
                label={inputLabels.lastName}
                name="lastName"
                value={values.lastName}
                error={errors.lastName}
                onChange={(lastName) => handleChange('lastName', lastName)}
              />
              {isNew(id) && (
                <NumericTextField
                  label={inputLabels.personalCode}
                  name="personalCode"
                  value={values.personalCode}
                  error={errors.personalCode}
                  onChange={(code) => handleChange('personalCode', code.replace(/\s/g, ''))}
                />
              )}
              <PhoneField
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
              <SelectField
                label={inputLabels.role}
                name="role"
                value={getRolesTypes().find((role) => role.id === values.role)}
                error={errors.role}
                options={getRolesTypes()}
                onChange={(role) => handleChange('role', role.id)}
                getOptionLabel={(option) => option.label}
              />
            </Row>
          </>
        </SimpleContainer>
      </InnerContainer>
    );
  };

  if (isFetching) {
    return <LoaderComponent />;
  }

  return (
    <FormPageWrapper
      title={title}
      initialValues={initialValues}
      onSubmit={userMutation.mutateAsync}
      renderForm={renderForm}
      validationSchema={validationSchema}
      deleteInfo={deleteInfo}
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

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default TenantUserForm;
