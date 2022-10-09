import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { Alert, Skeleton } from "antd";
import React, { FC } from "react";
import { getErrorMessage } from "utils/getErrorMessage";
import { TabContainer } from "./Tab.styles";

interface ITabProps {
    isFetching: boolean;
    isError: boolean;
    error?: FetchBaseQueryError | SerializedError;
    children: React.ReactNode;
}

export const Tab: FC<ITabProps> = (props) => {
    const errorMessage = getErrorMessage(props.error);

    return (
        <TabContainer>
            {props.isFetching && <Skeleton.Image active />}

            {props.isError && <Alert
                message="Error"
                description={errorMessage}
                type="error"
                showIcon />}

            {!props.isFetching && !props.isError && props.children}
        </TabContainer>
    )
}
