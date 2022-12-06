import styled from 'styled-components';

export const StyledHomeWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
  overflow: auto;
  height: max-content;
`;

export const StyledHomeSection = styled.section`
  width: 100%;
  padding: 100px 10% 0;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
  &:last-of-type {
    padding-bottom: 100px;
    @media screen and (max-width: 768px) {
      padding-bottom: 60px
    }
    @media screen and (max-width: 480px) {
      padding-bottom: 40px
    }
  }
  @media screen and (max-width: 768px) {
    padding-top: 60px
  }
  @media screen and (max-width: 480px) {
    padding-top: 40px
  }
  & h1 {
    font-size: 60px;
    text-align: center;
    max-width: 25ch;
    margin: 0 0 25px 0;
    @media screen and (max-width: 768px) {
      font-size: 40px;
    }
    @media screen and (max-width: 480px) {
      font-size: 28px;
    }
  }
  & h2 {
    font-size: 40px;
    text-align: center;
    max-width: 25ch;
    margin: 0 0 25px 0;
    @media screen and (max-width: 768px) {
      font-size: 32px;
    }
    @media screen and (max-width: 480px) {
      font-size: 24px;
    }
  }
  & p {
    font-size: 24px;
    text-align: center;
    max-width: 40ch;
    margin: 0 0 40px 0;
    line-height: 160%;
    @media screen and (max-width: 768px) {
      font-size: 20px;
    }
    @media screen and (max-width: 480px) {
      font-size: 16px;
    }
  }
  & img {
    width: 90px;
    height: 90px;
    border-radius: 50%;
  }
`;
