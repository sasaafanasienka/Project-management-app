import styled from 'styled-components';

const StyledFormHeader = styled.div`
  padding: 12px 18px;
  width: 100%;
  background-color: #fff;
  flex: 1;
  background-image: url('/dotsBg.webp');
  background-size: cover;
  color: #373737;
  text-align: center;
  position: relative;

  &:after {
    position: absolute;
    content: '';
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(255,255,255,0.2);
  }

  h1 {
    color: #373737;
    font-size: 2.5rem;
    position: relative;
    z-index: 2;
  }
`;
export default StyledFormHeader;
