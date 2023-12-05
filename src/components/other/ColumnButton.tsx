import { useState } from 'react';
import styled from 'styled-components';
import { Columns } from '../../types';
import { buttonsTitles, validationTexts } from '../../utils/texts';
import SingleCheckBox from '../buttons/TreeSelectCheckBox';
import Icon from './Icons';

export interface ColumnButtonProps {
  columns: Columns;
  handleToggle: (key: string) => void;
}

const ColumnButton = ({ columns, handleToggle }: ColumnButtonProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const [error, setError] = useState('');
  const labelKeys = Object.keys(columns).filter((key) => {
    return columns[key].label;
  });

  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setShowMenu(false);
    }
  };

  const onColumnChange = (key: string) => {
    const isOneColumnSelected =
      columns[key].show && labelKeys.filter((key) => columns[key].show).length === 1;

    if (isOneColumnSelected) {
      setError(validationTexts.atLeastOneColumn);
    } else {
      setError('');
      handleToggle(key);
    }
  };

  return (
    <Container tabIndex={1} onBlur={handleBlur}>
      <StyledButton onClick={() => setShowMenu(!showMenu)}>
        <StyledIcon name="settings" />
        {buttonsTitles.columns}
      </StyledButton>
      {showMenu && (
        <OptionContainer>
          {labelKeys.map((key) => (
            <div key={`column-${key}`}>
              <StyledSingleCheckbox
                value={columns[key].show}
                label={columns[key].label}
                onChange={() => {
                  onColumnChange(key);
                }}
              />
            </div>
          ))}
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </OptionContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  border-radius: 4px;
  background-color: white;
  color: #121926;
  border: 1px solid #cdd5df;
  font-weight: normal;
  font-size: 1.4rem;
  :hover {
    opacity: 0.6;
  }
  cursor: pointer;
  width: fit-content;
  padding: 12px;
`;

const StyledIcon = styled(Icon)`
  color: #9aa4b2;
  margin-right: 12px;
`;

const ErrorMessage = styled.label`
  position: relative;
  color: ${({ theme }) => theme.colors.error};
  font-size: 1.4rem;
  margin-left: 8px;
`;

const StyledSingleCheckbox = styled(SingleCheckBox)`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const OptionContainer = styled.div`
  position: absolute;
  top: 42px;
  background-color: white;
  box-shadow: 0px 4px 15px #12192614;
  border: 1px solid #cdd5df;
  border-radius: 4px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-x: auto;
  min-width: 130px;
  z-index: 9999;
`;

export default ColumnButton;
