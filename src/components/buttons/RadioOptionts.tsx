import React from 'react';
import styled from 'styled-components';
import { device } from '../../styles';

export interface RadioOptionsProps {
  options: { label: string; value: string }[];
  name?: string;
  value?: string;
  error?: string;
  showError?: boolean;
  className?: string;
  onChange: (option: any) => void;
  label?: string;
  disabled?: boolean;
  column?: boolean;
}

const RadioOptions = ({
  options,
  column = false,
  value,
  error,
  showError = true,
  name,
  onChange,
  className,
  disabled,
  label,
  ...rest
}: RadioOptionsProps) => {
  return (
    <Container className={className}>
      {label ? <Label>{label}</Label> : null}
      <OptionsContainer column={column}>
        {options?.map((option, index) => {
          const key = `${name}_${option.value}`;
          return (
            <InputContainer key={key} first={index === 0}>
              <StyledInput
                disabled={disabled}
                type="radio"
                name={name}
                id={option.value}
                value={option.value}
                checked={value === option.value}
                {...rest}
                onChange={() => onChange(option.value)}
              />
              <OptionLabel disabled={disabled} htmlFor={option.value}>
                {option.label}
              </OptionLabel>
            </InputContainer>
          );
        })}
      </OptionsContainer>
      {showError && error ? <ErrorMessage>{error}</ErrorMessage> : null}
    </Container>
  );
};

const Container = styled.div`
  padding: 8px 0;
  display: block;
`;

const OptionsContainer = styled.div<{ column?: boolean }>`
  display: flex;
  flex-direction: ${({ column }) => (column ? 'column' : 'row')};
  margin: 14px 0 0 0;
  flex-wrap: wrap;
  @media ${device.mobileL} {
    flex-direction: column;
  }
`;

const Label = styled.span`
  font-size: 1.2rem;
  color: #716c6b;
  text-transform: uppercase;
`;

const InputContainer = styled.div<{ first: boolean }>`
  margin: 0 8px 0 0;

  @media ${device.mobileL} {
    margin-bottom: 10px;
  }
`;

const OptionLabel = styled.label<{ disabled }>`
  font-size: 1.6rem;
  color: #231f20;
  opacity: 1;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

const ErrorMessage = styled.label`
  position: relative;
  color: ${({ theme }) => theme.colors.error};
  font-size: 1.4rem;
  margin-left: 8px;
`;

const StyledInput = styled.input<{ disabled?: boolean }>`
  & {
    display: none;
  }
  & + *::before {
    content: '';
    display: inline-block;
    width: 1.5rem;
    vertical-align: middle;
    height: 1.5rem;
    margin-right: 1rem;
    border-radius: 50%;
    border-style: solid;
    border-width: 0.1rem;
    border-color: ${({ theme }) => theme.colors.primary};
    opacity: ${({ disabled }) => (disabled ? 0.48 : 1)};
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  }

  &:checked + *::before {
    background: radial-gradient(
      ${({ theme }) => theme.colors.primary} 0%,
      ${({ theme }) => theme.colors.primary} 40%,
      transparent 50%,
      transparent 50%
    );
    opacity: ${({ disabled }) => (disabled ? 0.48 : 1)};

    border-color: ${({ theme }) => theme.colors.primary};
  }

  & + * {
    display: inline-block;
    padding: 0.5rem 2.4rem 0.5rem 0;
  }
`;

export default RadioOptions;
