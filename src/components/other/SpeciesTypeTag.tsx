import styled from 'styled-components';
import { SpeciesTypes } from '../../utils/constants';
import { speciesTypeListLabels } from '../../utils/texts';

const colors = {
  [SpeciesTypes.ENDANGERED]: { text: '#05603a', background: '#ecfdf3' },
  [SpeciesTypes.INVASIVE]: { text: '#b42318', background: '#fef3f2' },
  [SpeciesTypes.INTRODUCED]: { text: '#b54708', background: '#fffaeb' },
};

export const SpeciesTypeTag = ({ type }: { type?: SpeciesTypes }) => {
  if (!type || !speciesTypeListLabels[type]) return null;

  return (
    <Tag $text={colors[type].text} $background={colors[type].background}>
      {speciesTypeListLabels[type]}
    </Tag>
  );
};

const Tag = styled.span<{ $text: string; $background: string }>`
  display: inline-block;
  margin-top: 8px;
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 1.3rem;
  font-weight: 500;
  line-height: 2rem;
  color: ${({ $text }) => $text};
  background-color: ${({ $background }) => $background};
`;

export default SpeciesTypeTag;
