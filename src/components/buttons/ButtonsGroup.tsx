import { map } from 'lodash';
import styled from 'styled-components';
import FieldWrapper from '../fields/components/FieldWrapper';

export interface ToggleButtonProps {
  options: any[];
  onChange: (option?: any) => void;
  isSelected: (option: any) => boolean;
  disabled?: boolean;
  className?: string;
  label?: string;
  getOptionLabel?: (option: any) => string;
}

const ButtonsGroup = ({
  options,
  onChange,
  disabled,
  isSelected,
  className,
  label,
  getOptionLabel,
}: ToggleButtonProps) => {
  return (
    <div>
      <FieldWrapper className={className} label={label}>
        <Container className={className}>
          {map(options, (option, index) => (
            <StyledButton
              type="button"
              disabled={disabled}
              key={`group-button${index}`}
              left={index === 0}
              right={index === options.length - 1}
              selected={isSelected(option)}
              onClick={() => (disabled ? {} : onChange(option))}
            >
              {getOptionLabel ? getOptionLabel(option) : option.name}
            </StyledButton>
          ))}
        </Container>
      </FieldWrapper>
    </div>
  );
};

const Container = styled.div`
  border-radius: 4px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const StyledButton = styled.button<{
  left: boolean;
  right: boolean;
  selected: boolean;
  disabled?: boolean;
}>`
  display: flex;
  justify-content: center;

  align-items: center;
  height: 40px;
  padding: 12px;
  border-color: ${({ selected, theme }) => (selected ? theme.colors.primary : '#cdd5df')};
  border-style: solid;
  font-weight: normal;
  font-size: 1.4rem;
  line-height: 13px;
  opacity: ${({ disabled }) => (disabled ? 0.48 : 1)};
  :hover {
    opacity: ${({ disabled }) => (disabled ? 0.48 : 0.6)};
  }
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  background-color: ${({ selected, theme }) => (selected ? theme.colors.primary + '1F' : 'white')};
  color: #121926;
  justify-content: center;
  border-width: 1px;
  border-top-left-radius: ${({ left }) => (left ? '4px' : 0)};
  border-bottom-left-radius: ${({ left }) => (left ? '4px' : 0)};
  border-top-right-radius: ${({ right }) => (right ? '4px' : 0)};
  border-bottom-right-radius: ${({ right }) => (right ? '4px' : 0)};
`;

export default ButtonsGroup;
