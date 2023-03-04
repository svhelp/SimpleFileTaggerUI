import styled from "styled-components"

export const DetailsSectionWrapper = styled.div`
    height: 100%;
    width: 350px;

    border-left: 1px solid #ddd;
`

export const DetailsSectionContainer = styled.div`
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    background: #fff;
`

export const DetailsSectionContent = styled.div`
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    padding: 24px;
`

export const DetailsSectionTitle = styled.div`
    display: flex;
    flex: 0;
    align-items: center;

    padding: 16px 24px;

    font-size: 16px;
    line-height: 22px;

    border-bottom: 1px solid #f0f0f0;
`

export const DetailsSectionBody = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

export const DetailsSectionBodyButtons = styled.div`
    display: flex;

    margin: 16px 0;

    & > *:not(:last-child) {
        margin-right: 8px;
    }
`

export const DetailsSectionFooterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

export const DetailsSectionFooterButtons = styled.div`
    display: flex;

    & > *:not(:last-child) {
        margin-right: 8px;
    }
`