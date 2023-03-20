import Catalog from "./Catalog";
import styled from "styled-components";

export default function Home() {

    return (
        <ContentWrapper>
            <Catalog/>
        </ContentWrapper>
    );
}

export const ContentWrapper = styled.div`
  scroll-behavior: smooth;
  overflow-y: scroll;
  height: 90vh;
`;