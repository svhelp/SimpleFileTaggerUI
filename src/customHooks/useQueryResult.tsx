import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError, QueryStatus } from "@reduxjs/toolkit/dist/query";
import { notification } from "antd";
import { ErrorNotification } from "components/Common/ErrorNotification.styles";
import { CommandResult } from "domain/models"
import { useEffect } from "react"
import { getErrorMessage } from "utils/getErrorMessage";

interface IQueryResult {
    data?: CommandResult;
    status: QueryStatus;
    error?: FetchBaseQueryError | SerializedError
}

export const useQueryResult = (queryResult: IQueryResult, successCallback?: () => void) => {
    useEffect(() => {
        if (!queryResult){
            return;
        }

        if (queryResult.status === QueryStatus.rejected) {
            notification.error({
                message: `Error`,
                description: <ErrorNotification>{getErrorMessage(queryResult.error)}</ErrorNotification>,
                placement: "bottomRight",
                duration: 0,
            });

            return;
        }
        
        if (queryResult.status !== QueryStatus.fulfilled || !queryResult.data){
            return;
        }

        if (queryResult.data.isSuccessful) {
            notification.success({
                message: `Success`,
                placement: "bottomRight",
            });

            if (!!successCallback) {
                successCallback();
            }
        }

        if (!queryResult.data.isSuccessful) {
            notification.error({
                message: `Error`,
                description: <ErrorNotification>{queryResult.data.message}</ErrorNotification>,
                placement: "bottomRight",
                duration: 0,
            });
        }
    }, [ queryResult ]);
}