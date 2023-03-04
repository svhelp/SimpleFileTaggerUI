import styled from "styled-components";

interface ITabContainerProps {
    hasDetails?: boolean;
}

export const TabContainer = styled.div<ITabContainerProps>`
    height: 100%;
    padding: 24px;
    width: ${({hasDetails}) => hasDetails ? "calc(100% - 350px)" : "100%"};

    display: flex;
    flex-direction: column;
`

export const TabHeaderContainer = styled.div`
    position: sticky;
    top: 0;
    margin-bottom: 16px;
`

export const TabContentContainer = styled.div`
    overflow: auto;
`