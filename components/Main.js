import React from "react";
import Portfolio from "./Portfolio";
import styled from "styled-components";
import Promos from "./Promos";

const Main = ({ thirdWebTokens, sanityTokens, address }) => {
  return (
    <Wrapper>
      <Portfolio
        thirdWebTokens={thirdWebTokens}
        sanityTokens={sanityTokens}
        walletAddress={address}
      />
      <Promos />
    </Wrapper>
  );
};

export default Main;

const Wrapper = styled.div`
  display: flex;
  justify content: space-between;
  max-height: calc(100vh - 64px);
  // width:81vw;
  overflow:hidden;
  overflow-y: scroll;
  ::-webkit-scrollbar{
    display: none;
  }
  & div {
    border-radius: 0.4rem;
  }
`;
