import styled from 'styled-components';

export interface SingleCheckBoxProps {
  value?: boolean;
  onChange: (value?: boolean) => void;
  disabled?: boolean;
  label?: string;
  error?: boolean;
  className?: string;
  intermediate?: boolean;
}

const Checkbox = ({
  value,
  onChange,
  disabled = false,
  label,
  error,
  className,
  intermediate,
}: SingleCheckBoxProps) => {
  return (
    <>
      <Container
        className={className}
        onClick={() => {
          !disabled && onChange(value);
        }}
      >
        <InnerContainer
          intermediate={intermediate}
          disabled={disabled}
          error={error}
          checked={value}
        >
          <CheckBox type="checkbox" checked={value || false} disabled={disabled} readOnly />
          <Label intermediate={intermediate} />
        </InnerContainer>
        <TextLabel>{label}</TextLabel>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 28px 1fr;
  align-items: center;
  cursor: pointer;
`;

const TextLabel = styled.div`
  text-align: left;
  font-size: 1.4rem;
  color: #4b5565;
`;

const InnerContainer = styled.div<{
  checked?: boolean;
  error?: boolean;
  disabled?: boolean;
  intermediate?: boolean;
}>`
  transform: scale(0.8);
  position: relative;
  width: 18px;
  height: 18px;
  border-radius: 2px;
  background-color: ${({ theme, checked, error, intermediate }) =>
    checked || intermediate
      ? theme.colors.primary
      : error
      ? theme.colors.error
      : theme.colors.border};
  margin-right: 8px;
  opacity: ${({ disabled }) => (disabled ? 0.48 : 1)};
`;

const Label = styled.label<{ intermediate?: boolean }>`
  cursor: pointer;
  position: absolute;
  z-index: 4;
  width: 14px;
  height: 14px;
  left: 2px;
  top: 2px;

  background-color: ${({ intermediate }) => (intermediate ? 'transparent' : 'white')};

  &::after {
    -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=0)';
    filter: alpha(opacity=0);
    opacity: 0;
    content: '';
    position: absolute;
    width: ${({ intermediate }) => `${intermediate ? 10 : 13}px`};
    height: 6px;
    top: ${({ intermediate }) => `${intermediate ? 1 : 1}px`};
    left: ${({ intermediate }) => `${intermediate ? 2.2 : 0}px`};
    background: transparent;
    border: 2px solid #fcfff4;
    border-top: none;
    border-right: none;

    ${({ intermediate }) =>
      intermediate &&
      `border-left: none;
      -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
      filter: alpha(opacity=100);
      opacity: 1;
  `}

    -webkit-transform: rotate(
      ${({ intermediate }) => `${intermediate ? 0 : -45}deg`}
    );
    -moz-transform: rotate(${({ intermediate }) => `${intermediate ? 0 : -45}deg`});
    -o-transform: rotate(${({ intermediate }) => `${intermediate ? 0 : -45}deg`});
    -ms-transform: rotate(${({ intermediate }) => `${intermediate ? 0 : -45}deg`});
    transform: rotate(${({ intermediate }) => `${intermediate ? 0 : -45}deg`});
  }
`;
const CheckBox = styled.input<{ disabled: boolean }>`
  position: absolute;
  width: 20px;
  height: 20px;
  top: -4px;
  left: -4px;
  z-index: 7;
  opacity: 0;

  cursor: ${({ disabled }) => (disabled ? 'text' : 'pointer')};
  &:checked + label {
    background-color: transparent;
  }

  &:checked + label::after {
    -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)';
    filter: alpha(opacity=100);
    opacity: 1;
  }
`;
export default Checkbox;
