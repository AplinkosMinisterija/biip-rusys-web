import { Form, Formik, yupToFormErrors } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { device } from '../../styles';
import { DeleteInfoProps } from '../../types';
import { buttonsTitles } from '../../utils/texts';
import Button from '../buttons/Button';
import { FormErrorMessage } from '../other/FormErrorMessage';
import { FormTitle } from '../other/FormTitle';
import Icon from '../other/Icons';
import FormPageWrapper from './FormPageWrapper';

interface FormPageWrapperProps {
  renderForm: (
    vales: any,
    errors: any,
    handleChange: (field: string, value: any, shouldValidate?: boolean | undefined) => void,
    setValues?: (values: any, shouldValidate?: boolean | undefined) => void,
  ) => JSX.Element;
  initialValues: any;
  onSubmit: (values: any, setErrors?: any) => void;
  title?: string;
  validationSchema: any;
  additionalValidation?: any;
  back?: boolean;
  backUrl?: string;
  canSubmit?: boolean;
  disabled?: boolean;
  deleteInfo?: DeleteInfoProps;
  twoColumn?: boolean;
  validateOnMount?: boolean;
  submitButtonText?: string;
}

const FormikFormPageWrapper = ({
  renderForm,
  title,
  initialValues,
  validateOnMount = false,
  onSubmit,
  validationSchema,
  back = true,
  additionalValidation,
  canSubmit = true,
  backUrl,
  disabled,
  deleteInfo,
  twoColumn = false,
  submitButtonText = buttonsTitles.save,
}: FormPageWrapperProps) => {
  const [validateOnChange, setValidateOnChange] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any, helper?: any) => {
    setLoading(true);
    try {
      await onSubmit(values, helper);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  return (
    <FormPageWrapper>
      <Formik
        validateOnMount={validateOnMount}
        enableReinitialize={false}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validateOnChange={validateOnChange}
        validationSchema={validationSchema}
        validate={async (values) => {
          setValidateOnChange(true);
          const additionalErrors = additionalValidation ? additionalValidation(values) : null;

          try {
            await validationSchema.validate(values, { abortEarly: false });
          } catch (e) {
            return {
              ...yupToFormErrors(e),
              ...additionalErrors,
            };
          }

          return additionalErrors;
        }}
      >
        {({ values, errors, setFieldValue, handleSubmit, setValues }) => {
          return (
            <StyledForm two_column={twoColumn ? 1 : 0}>
              <FormTitle title={title} back={back} backUrl={backUrl} />
              {renderForm(values, errors, setFieldValue, setValues)}
              <FormErrorMessage errors={errors} />

              {canSubmit && !disabled && (
                <ButtonContainer>
                  <Button
                    aria-label={submitButtonText}
                    onClick={() => handleSubmit()}
                    type="button"
                    color="black"
                    height={32}
                    loading={loading}
                    disabled={disabled}
                  >
                    {submitButtonText}
                  </Button>
                </ButtonContainer>
              )}
            </StyledForm>
          );
        }}
      </Formik>
    </FormPageWrapper>
  );
};

const ButtonContainer = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Title = styled.div`
  font-size: 3.2rem;
  font-weight: bold;
  color: #121926;
  opacity: 1;
  @media ${device.mobileL} {
    font-size: 2.4rem;
  }
`;

const StyledForm = styled(Form)<{ two_column: number }>`
  display: flex;
  flex-direction: column;
  flex-basis: ${({ two_column }) => (two_column ? '1200px' : '800px')};
`;

const StyledBackIcon = styled(Icon)`
  cursor: pointer;

  font-size: 1.1rem;
  align-self: center;
  color: #000000;
`;

const Row = styled.div<{ titleRowWidth?: number }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 22px 0px;
  flex-wrap: wrap;
  gap: 16px;
  width: '100%';
`;

const InnerRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
`;

export default FormikFormPageWrapper;
