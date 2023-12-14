import { Form, Formik, yupToFormErrors } from 'formik';
import { isEmpty } from 'lodash';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { device } from '../../styles';
import { DeleteInfoProps } from '../../types';
import { buttonsTitles, validationTexts } from '../../utils/texts';
import Button, { ButtonColors } from '../buttons/Button';
import { DeleteComponent } from '../other/DeleteComponent';
import Icon from '../other/Icons';

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

const FormPageWrapper = ({
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
  const navigate = useNavigate();
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

  const url: string | number = backUrl || -1;

  return (
    <Container>
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
              <Row>
                <InnerRow>
                  {back && (
                    <Button
                      onClick={() => navigate(url as string)}
                      leftIcon={<StyledBackIcon name="back" />}
                      variant={ButtonColors.TRANSPARENT}
                      type="button"
                      height={32}
                      buttonPadding="6px 8px"
                      color="black"
                    >
                      {buttonsTitles.back}
                    </Button>
                  )}
                  <Title>{title}</Title>
                </InnerRow>
                <DeleteComponent deleteInfo={deleteInfo} />
              </Row>
              {renderForm(values, errors, setFieldValue, setValues)}
              <MessageCointainer>
                {!isEmpty(errors) && <ErrorMessage>{validationTexts.formFillError}</ErrorMessage>}
              </MessageCointainer>
              {canSubmit && !disabled && (
                <ButtonContainer>
                  <Button
                    aria-label={submitButtonText}
                    onClick={() => handleSubmit()}
                    type="button"
                    color="black"
                    height={32}
                    buttonPadding="6px 8px"
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
    </Container>
  );
};

const Container = styled.div`
  flex-basis: 1200px;
  margin-bottom: 120px;
  display: flex;
  justify-content: center;
`;

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

const MessageCointainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 8px;
  gap: 12px;
`;

const ErrorMessage = styled.div`
  display: flex;
  width: 100%;
  background-color: #ffedf0;
  color: #fe1d42;
  border: 1px solid #fe1d42;
  border-radius: 4px;
  padding: 5px 15px 5px 15px;
  margin: 0 0 10px 0;
`;

export default FormPageWrapper;
