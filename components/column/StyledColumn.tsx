import styled from 'styled-components';

import theme from '../../theme/theme';

export interface StyledColumnPropsModel {
  opacity?: number;
  display?: string;
}

const StyledColumn = styled.div<StyledColumnPropsModel>`
  /* width: 250px; */
  flex: 0 0 250px;
  min-height: calc(100vh - 300px);
  border: 1px dashed ${theme.palette.secondary.light};
  border-radius: 5px;
  padding: 12px;
  display: ${(props) => (props.display ?? 'flex')};
  flex-flow: column;
  gap: 10px;
  opacity: ${(props) => (props.opacity ?? 1)};
  & h3 {
    margin: 0;
    font-size: 16px;
  }
`;

export default StyledColumn;
