import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

export const getErrorMessage = (error: FetchBaseQueryError | SerializedError | undefined) => {
    if (!error){
        return '';
    }

    if ((error as FetchBaseQueryError).data !== undefined){
        return (error as FetchBaseQueryError).data as string;
    }

    if ((error as SerializedError).message !== undefined){
        return (error as SerializedError).message;
    }

    return '';
}