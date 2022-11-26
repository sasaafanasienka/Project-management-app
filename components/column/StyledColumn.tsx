import styled from 'styled-components';

import theme from '../../theme/theme';

export interface StyledColumnPropsModel {
  opacity: number;
}

const StyledColumn = styled.div<StyledColumnPropsModel>`
  /* width: 250px; */
  flex: 0 0 270px;
  max-height: calc(100vh - 200px);
  border: 1px dashed ${theme.palette.secondary.light};
  border-radius: 5px;
  padding: 12px;
  display: flex;
  flex-flow: column;
  gap: 10px;
  opacity: ${(props) => (props.opacity ?? 1)};
  & h3 {
    color: #373737;
    margin: 0;
    font-size: 16px;
  }
`;

export default StyledColumn;
