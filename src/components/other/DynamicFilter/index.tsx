import { useMediaQuery } from '@material-ui/core';
import { format } from 'date-fns';
import { map } from 'lodash';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { device } from '../../../styles';
import Icon from '../Icons';
import Loader from '../Loader';
import Popup from '../Popup';
import Filter, { FilterConfig, FilterInputTypes } from './Filter';

export interface DynamicFilterProps {
  loading?: boolean;
  isFilterApplied: boolean;
  className?: string;
  filterConfig: any;
  rowConfig: string[][];
  onSetFilters: (filters: any) => void;
  filters: any;
}

const mapFilters = (
  filterConfig: { [key: string]: FilterConfig },
  filters?: { [key: string]: any },
): string[] => {
  const applied: { key: string; label: string }[] | any = [];
  if (filters) {
    map(filterConfig, (config) => {
      const optionLabel = config?.optionLabel;
      const optionValue = config?.getOptionValue;
      const hasOptionValueFunction = !!optionValue;
      const hasOptionLabelFunction = !!optionLabel;

      const filter: any = filters?.[config.key];
      if (filter) {
        if (config.inputType === FilterInputTypes.date) {
          applied.push({
            key: config.key,
            label: `${config.label}: ${format(new Date(filter), 'yyyy-MM-dd')}`,
          });
        } else if (config.inputType === FilterInputTypes.multiselect) {
          applied.push(
            map(filter, (item: any) => {
              return {
                key: config.key,
                id: hasOptionValueFunction ? optionValue(item) : item.id,
                label: `${config.label}: ${
                  hasOptionLabelFunction ? optionLabel(item) : item.label
                }`,
                optionValue,
              };
            }),
          );
        } else if (config.inputType === FilterInputTypes.singleselect) {
          applied.push({
            key: config.key,
            label: `${config.label}: ${
              hasOptionLabelFunction ? optionLabel(filter) : filter.label
            }`,
          });
        } else if (config.inputType === FilterInputTypes.asyncSelect) {
          applied.push({
            key: config.key,
            label: `${config.label}: ${hasOptionLabelFunction ? optionLabel(filter) : filter.name}`,
          });
        } else if (config.inputType === FilterInputTypes.asyncMultiSelect) {
          applied.push(
            map(filter, (item: any) => {
              return {
                key: config.key,
                id: hasOptionValueFunction ? optionValue(item) : item.id,
                label: `${config.label}: ${hasOptionLabelFunction ? optionLabel(item) : item.name}`,
                optionValue,
              };
            }),
          );
        } else {
          applied.push({
            key: config.key,
            label: `${config.label}: ${filter}`,
          });
        }
      }
    });
  }
  return applied.flat();
};

const DynamicFilter = ({
  loading = false,
  className,
  filterConfig,
  rowConfig,
  onSetFilters,
  filters,
}: any) => {
  const isMobile = useMediaQuery(device.mobileL);

  const [showFilters, setShowFilters] = useState(false);

  const [appliedFilters, setAppliedFilters] = useState<any>([]);

  useEffect(() => {
    setAppliedFilters(mapFilters(filterConfig, filters));
  }, [filters, filterConfig]);

  return (
    <>
      <Container>
        {!isMobile &&
          map(appliedFilters, (appliedFilter, index) => (
            <Tag key={`${appliedFilter}_${index}`}>
              <TextContainer>{appliedFilter?.label}</TextContainer>
              <CloseIconContainer
                onClick={() => {
                  const { [appliedFilter.key]: key, ...rest } = filters;
                  if (appliedFilter.id) {
                    const optionValue = appliedFilter.optionValue;

                    const hasOptionValueFunction = !!optionValue;

                    const filteredFilters = {
                      ...rest,
                      [appliedFilter.key]: key.filter((filter) =>
                        hasOptionValueFunction
                          ? optionValue(filter) !== appliedFilter.id
                          : filter.id !== appliedFilter.id,
                      ),
                    };

                    onSetFilters(filteredFilters);

                    return;
                  }

                  onSetFilters(rest);
                }}
              >
                <CloseIcon name="close" />{' '}
              </CloseIconContainer>
            </Tag>
          ))}
        <Wrapper className={className} disabled={loading} onClick={() => setShowFilters(true)}>
          <StyledButton disabled={loading}>
            <StyledIcon name="filter" />
            {loading ? <Loader color="white" /> : 'Filtrai'}
            <Count>{appliedFilters.length}</Count>
          </StyledButton>
        </Wrapper>
      </Container>
      <Popup visible={showFilters} onClose={() => setShowFilters(false)}>
        <FilterWraper>
          <Filter
            values={filters}
            filters={filterConfig}
            rowConfig={rowConfig}
            onSubmit={(values) => {
              onSetFilters(values);
              setShowFilters(false);
            }}
          />
        </FilterWraper>
      </Popup>
    </>
  );
};

const Container = styled.div`
  display: flex;
  align-items: flex-end;
  margin-right: auto;
  flex-wrap: wrap;
`;

const CloseIcon = styled(Icon)`
  color: #b55007;
  font-size: 2rem;
`;

const CloseIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 4px;
  cursor: pointer;
`;

const TextContainer = styled.div`
  text-align: center;
  vertical-align: middle;
  color: #b55007;
`;

const Wrapper = styled.div<{
  disabled: boolean;
}>`
  opacity: ${({ disabled }) => (disabled ? 0.48 : 1)};
  min-width: 100px;
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
  margin-right: 14px;
`;

const Count = styled.div`
  background-color: #fef3c6;
  border-radius: 9px;
  width: 18px;
  height: 18px;
  justify-content: center;
  align-items: center;
  display: flex;
  color: #b55007;
  font-size: 1rem;
  margin-left: 14px;
`;

const Tag = styled.div`
  background-color:  #fef3c6;
  height: 40px;
  padding: 12px 8px;
  margin-right: 12px;
  border-radius: 4px;
  font-size: 1.2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const FilterWraper = styled.div`
  padding: 0 24px 24px 24px;
`;

DynamicFilter.map = mapFilters;
export default DynamicFilter;
