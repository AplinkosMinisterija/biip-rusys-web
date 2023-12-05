import { useMutation, useQueryClient } from 'react-query';
import api from '../api';
import SimpleContainer from '../components/containers/SimpleContainer';
import TextField from '../components/fields/TextField';
import FormPageWrapper from '../components/wrappers/FormikFormPageWrapper';
import { useAppSelector } from '../state/hooks';
import { ColumnOne, Grid } from '../styles/GenericStyledComponents';
import { Tenant } from '../types';
import {
  handleErrorFromServerToast,
  handleSuccessToast,
  isTenantFullyCompleted,
} from '../utils/functions';
import { formLabels, inputLabels, validationTexts } from '../utils/texts';
import { validateUpdateTenantForm } from '../utils/validation';

export interface TenantProps {
  phone: string;
  email: string;
}

const TenantForm = () => {
  const tenant: Tenant = useAppSelector((state) => state.tenant);
  const loggedIn = useAppSelector((state) => state?.user?.loggedIn);
  const queryClient = useQueryClient();

  const updateUser = useMutation((values: TenantProps) => api.updateTenant(values, tenant?.id), {
    onError: () => {
      handleErrorFromServerToast();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(['tenant', loggedIn]);
      handleSuccessToast(validationTexts.tenantUpdated);
    },
    retry: false,
  });

  const initialValues: TenantProps = {
    phone: tenant.phone || '',
    email: tenant.email || '',
  };

  const renderForm = (values: TenantProps, errors: any, handleChange) => {
    return (
      <ColumnOne>
        <SimpleContainer title={formLabels.infoAboutTenant}>
          <Grid column={2}>
            <TextField
              label={inputLabels.phone}
              value={values.phone}
              error={errors.phone}
              name="phone"
              placeholder="862211123"
              onChange={(e) => handleChange('phone', e)}
            />
            <TextField
              label={inputLabels.email}
              value={values.email}
              error={errors.email}
              type="email"
              name="email"
              placeholder="naudotojas@am.lt"
              onChange={(e) => handleChange('email', e)}
            />
          </Grid>
        </SimpleContainer>
      </ColumnOne>
    );
  };

  return (
    <FormPageWrapper
      title={tenant.name}
      validateOnMount={!isTenantFullyCompleted(tenant)}
      initialValues={initialValues}
      onSubmit={updateUser.mutateAsync}
      renderForm={renderForm}
      validationSchema={validateUpdateTenantForm}
    />
  );
};

export default TenantForm;
