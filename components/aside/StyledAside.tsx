import styled from '@emotion/styled';

const StyledAside = styled.aside`
display: flex;
flex-flow: column;
  width: 250px;
  background-color: white;
  border-right: 1px solid #ddd;
  padding: 22px 7px;
  transition: all 0.3s ease;
  @media (max-width: 1024px) {
    width: 60px;
    align-items: center;
  }
`;

export default StyledAside;
