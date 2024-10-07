import { useFormik } from 'formik';
import { useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import api from '../api';
import Button from '../components/buttons/Button';
import CheckBox from '../components/buttons/CheckBox';
import PasswordField from '../components/fields/PasswordField';
import { device } from '../styles';
import { handleErrorFromServerToast } from '../utils/functions';
import { useEGatesSign, useUserInfo } from '../utils/hooks';
import { handleUpdateTokens } from '../utils/loginFunctions';
import { buttonsTitles, inputLabels, validationTexts } from '../utils/texts';
import { loginSchema } from '../utils/validation';
import { TextField } from '@aplinkosministerija/design-system';

interface LoginProps {
  email: string;
  password: string;
}

export const Login = () => {
  const captchaRef = useRef<any>();
  const { isLoading: userInfoLoading } = useUserInfo();
  const isProdEnvironment = import.meta.env.VITE_USER_NODE_ENV === 'production';
  const handleLogin = async (values: LoginProps) => {
    const captchaToken = await captchaRef?.current?.execute();
    const params = { ...values, captchaToken };

    return await api.login(params);
  };

  const loginMutation = useMutation((params: LoginProps) => handleLogin(params), {
    onError: ({ response }: any) => {
      const text = validationTexts[response?.data?.type];

      if (text) {
        return setErrors({ password: text });
      }

      handleErrorFromServerToast();
    },
    onSuccess: (data) => {
      handleUpdateTokens(data);
    },
    retry: false,
  });

  const { mutateAsync: eGatesMutation, isLoading: eGatesSignLoading } = useEGatesSign();

  const loading = [loginMutation.isLoading, userInfoLoading].some((loading) => loading);

  const { values, errors, setFieldValue, handleSubmit, setErrors } = useFormik({
    initialValues: {
      email: '',
      password: '',
      refresh: false,
    },
    validateOnChange: false,
    validationSchema: loginSchema,
    onSubmit: loginMutation.mutateAsync,
  });

  const handleType = (field: string, value: string | boolean) => {
    setFieldValue(field, value);
    setErrors({});
  };

  return (
    <Container onSubmit={handleSubmit}>
      {!isProdEnvironment && (
        <>
          <TextField
            value={values.email}
            type="email"
            name="email"
            error={errors.email}
            onChange={(value) => handleType('email', value)}
            label={inputLabels.email}
          />
          <PasswordField
            value={values.password}
            name="password"
            error={errors.password}
            onChange={(value) => handleType('password', value)}
            label={inputLabels.password}
          />
          <Row>
            <StyledSingleCheckbox
              onChange={(value) => handleType('refresh', value)}
              value={values.refresh}
              label={inputLabels.rememberMe}
            />
            <StyledButton loading={loading} type={'submit'}>
              {buttonsTitles.login}
            </StyledButton>
          </Row>
          <OrRow>
            <Hr />
            <OrLabel>{inputLabels.or}</OrLabel>
            <Hr />
          </OrRow>
        </>
      )}
      <Button
        type="button"
        leftIcon={<EvvIcon alt="EVV" src="./icons/EVV.svg" />}
        loading={eGatesSignLoading}
        onClick={() => eGatesMutation()}
      >
        {buttonsTitles.eGates}
      </Button>
      <ReCAPTCHA
        ref={captchaRef}
        size="invisible"
        sitekey="6LdydlggAAAAAO-vBvg9yBWEVxlulH5b4X6BijMV"
      />
    </Container>
  );
};

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  padding-top: 16px;
`;

const StyledSingleCheckbox = styled(CheckBox)`
  flex-grow: 1;
`;

const StyledButton = styled(Button)`
  flex-basis: auto;
  flex-grow: 1;
`;

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const EvvIcon = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 12px;
`;

const OrLabel = styled.div`
  font-weight: normal;
  font-size: 1.4rem;
  letter-spacing: 0.56px;
  color: #716c6b;
  margin: 0 17px;
`;

const OrRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px 0px;
  width: 100%;
  @media ${device.mobileL} {
    margin: 6px 0px;
  }
`;

const Hr = styled.div`
  background-color: #d3d2d2;
  width: 100%;
  height: 1px;
`;
