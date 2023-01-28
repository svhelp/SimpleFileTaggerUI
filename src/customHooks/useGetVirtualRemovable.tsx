import { QueryDefinition } from "@reduxjs/toolkit/dist/query";
import { UseQueryHookResult } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { VirtualRemovableModel } from "domain/models";
import { useMemo } from "react";


export const useGetVirtualRemovable = <T extends VirtualRemovableModel>(query: () => UseQueryHookResult<QueryDefinition<any, any, any, T[]>>) => {
    const { data, isFetching, isError, error } = query();
    const actualData = useMemo(() => data?.filter(el => !el.isRemoved) ?? [], [data]);

    return { data: actualData, isFetching, isError, error };
}