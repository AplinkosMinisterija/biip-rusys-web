import {
  CheckBox,
  FieldWrapper,
  MultiTextField,
  useKeyAction,
} from '@aplinkosministerija/design-system';
import { isEmpty } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { SpeciesTypes } from '../../../utils/constants';
import { inputLabels } from '../../../utils/texts';
import Icon from '../../other/Icons';
import { TaxonomyTree, TreeOption } from './functions';

interface TreeProps {
  treeData: any;
  values: any[];
  disabled?: boolean;
  onChange: (props: any[]) => void;
  error?: string;
  label: string;
  speciesTypes: SpeciesTypes[];
}

const Tree = ({ treeData, values, onChange, disabled, error, label, speciesTypes }: TreeProps) => {
  const globalTreeFunctions = useMemo(() => {
    const data = {
      kingdoms: treeData,
      keyType: 'options',
      selectedOptions: values,
    };

    return new TaxonomyTree(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [treeData]);

  const handleBlur = (event: any) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setShowSelect(false);
    }
  };

  const [treeOptions, setTreeOptions] = useState<TreeOption[]>([]);
  const [input, setInput] = useState('');
  const [showSelect, setShowSelect] = useState(false);
  const handleOnExpandKeyDown = useKeyAction((item) => handleExpand(item), disabled);
  const handleExpand = (item) => {
    item.toggleExpanded();
    setTreeOptions([...globalTreeFunctions.items]);
  };

  const handleToggle = (item) => {
    item.toggleSelected();
    setTreeOptions([...globalTreeFunctions.items]);
    onChange(globalTreeFunctions.toJson());
  };

  const GenerateTree = (list: TreeOption[]) => {
    const generateLeafs = list.map((item, index) => {
      return (
        <div
          key={index + item.name}
          role="treeitem"
          aria-expanded={!!item.items && item.expanded}
          aria-selected={item.selected}
        >
          <Row>
            {!!item.items && item.items.length > 0 ? (
              <IconContainer
                onClick={() => handleExpand(item)}
                tabIndex={0}
                role="button"
                aria-label={`Toggle ${item.name}`}
                onKeyDown={handleOnExpandKeyDown(item)}
              >
                <Arrow expanded={item?.expanded} name="dropdownArrow" />
              </IconContainer>
            ) : (
              <IconContainer />
            )}
            <CheckBox
              intermediate={item.intermediate}
              onChange={() => {
                handleToggle(item);
              }}
              value={item.selected}
              label={item.name}
            />
          </Row>
          {!!item.items && item.expanded && (
            <CheckBoxRow role="group">{GenerateTree(item.items)}</CheckBoxRow>
          )}
        </div>
      );
    });

    return generateLeafs;
  };

  useEffect(() => {
    if (isEmpty(speciesTypes)) return;

    globalTreeFunctions.type(speciesTypes);
    if (input.length > 0) {
      globalTreeFunctions.search('');
      setInput('');
    }
    setTreeOptions([...globalTreeFunctions.items]);
    onChange(globalTreeFunctions.toJson());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speciesTypes, globalTreeFunctions]);

  const handleInputChange = (input: string) => {
    setInput(input);
    globalTreeFunctions.search(input);
    setTreeOptions([...globalTreeFunctions.items]);
    if (input.length > 1 && !showSelect) setShowSelect(true);
  };

  return (
    <FieldWrapper
      onClick={() => !disabled && setShowSelect(true)}
      label={label}
      error={error}
      handleBlur={handleBlur}
    >
      <MultiTextField
        values={values}
        name={'speciesTreeSelect'}
        input={input}
        error={error}
        disabled={disabled}
        handleInputChange={handleInputChange}
        onRemove={({ value }) => {
          globalTreeFunctions.toggleItem(value.id, value.taxonomy);
          onChange(globalTreeFunctions.toJson());
        }}
        getOptionLabel={(value) => value?.name}
      />

      {showSelect && (
        <OptionContainer onClick={(e) => e.stopPropagation()}>
          {!isEmpty(treeOptions) ? (
            GenerateTree(treeOptions)
          ) : (
            <Option>{inputLabels.noOptions}</Option>
          )}
        </OptionContainer>
      )}
    </FieldWrapper>
  );
};

const Option = styled.div`
  cursor: pointer;
  padding: 0 12px;
  font-size: 1.6rem;
  line-height: 36px;
  &:hover {
    background: #f3f3f7 0% 0% no-repeat padding-box;
  }
`;

const OptionContainer = styled.div`
  z-index: 999;
  position: absolute;
  width: 100%;
  padding: 10px 0px;
  max-height: 400px;
  overflow-y: auto;
  background-color: white;
  box-shadow: 0px 2px 16px #121a5529;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 20px 1fr;
`;

const CheckBoxRow = styled.div`
  padding-left: 20px;
`;

const Arrow = styled(Icon)<{ disabled?: boolean; expanded?: boolean }>`
  font-size: 2.4rem;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transform: ${({ expanded }) => !expanded && `rotate(-90deg)`};
`;

export default Tree;
