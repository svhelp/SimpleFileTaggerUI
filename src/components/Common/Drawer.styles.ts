import styled from "styled-components";

export const DrawerContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    height: 100%;
`

export const DrawerButtonContainer = styled.div`
    display: flex;

    margin: 16px 0;

    & > *:not(:last-child) {
        margin-right: 8px;
    }
`