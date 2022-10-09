import { notification } from "antd";
import { CommandResult } from "domain/models"
import { useEffect } from "react"

interface IQueryResult {
    data?: CommandResult
}

export const useQueryResult = (queryResult: IQueryResult) => {
    useEffect(() => {
        if (!queryResult.data){
            return;
        }

        if (queryResult.data.isSuccessful) {
            notification.success({
                message: `Update successful`,
                placement: "bottomRight",
            });
        }

        if (!queryResult.data.isSuccessful) {
            notification.success({
                message: `Update error`,
                description: <span>{queryResult.data.message}</span>,
                placement: "bottomRight",
            });
        }
    }, [ queryResult ]);
}