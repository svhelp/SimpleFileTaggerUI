import styled from "styled-components";

export const DrawerContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    height: 100%;
`

export const DrawerBody = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

export const DrawerFooter = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

export const DrawerButtonContainer = styled.div`
    display: flex;

    margin: 16px 0;

    & > *:not(:last-child) {
        margin-right: 8px;
    }
`