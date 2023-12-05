import React from 'react';
import styled from 'styled-components';
import { ChildrenType } from '../../types';
import Loader from '../other/Loader';
export enum ButtonColors {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
  DANGER = 'danger',
  SUCCESS = 'success',
  TRANSPARENT = 'transparent',
}

export interface ButtonProps {
  variant?: ButtonColors;
  route?: string;
  children?: ChildrenType;
  leftIcon?: JSX.Element | string;
  rightIcon?: JSX.Element | string;
  height?: number;
  type?: string;
  loading?: boolean;
  padding?: string;
  buttonPadding?: string;
  signature?: boolean;
  disabled?: boolean;
}

const Button = ({
  variant = ButtonColors.PRIMARY,
  route,
  children,
  height,
  padding = '0',
  leftIcon,
  buttonPadding,
  rightIcon,
  type,
  loading = false,
  className,
  disabled = false,
  ...rest
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const isDisabled = loading || disabled;
  return (
    <Wrapper className={className} padding={padding} disabled={isDisabled}>
      <StyledButton
        padding={buttonPadding}
        variant={variant}
        height={height || 40}
        type={type}
        disabled={isDisabled}
        {...rest}
      >
        {leftIcon}
        {loading ? <Loader color="white" /> : children}
        {rightIcon}
      </StyledButton>
    </Wrapper>
  );
};

const Wrapper = styled.div<{
  padding: string;
  signature?: boolean;
  disabled: boolean;
}>`
  opacity: ${({ disabled }) => (disabled ? 0.48 : 1)};
  padding: ${({ padding }) => (padding ? padding : 0)};
  min-width: 100px;
`;

const StyledButton = styled.button<{
  variant: ButtonColors;
  height: number;
  padding?: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ height }) => (height ? height + 'px' : '40px')};
  border-radius: 4px;
  padding: ${({ padding }) => (padding ? padding : '11px 20px;')};
  background-color: ${({ variant, theme }) => theme.colors[variant]};
  color: #231f20;
  border: 1px solid ${({ variant }) => (variant !== 'transparent' ? 'transparent' : ' #231F20')};
  font-weight: normal;
  font-size: 1.6rem;

  :hover {
    background-color: ${({ variant, theme }) =>
      variant !== 'transparent' ? theme.colors.hover[variant] : theme.colors.tertiaryLight};
  }

  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  width: 100%;
`;

export default Button;
