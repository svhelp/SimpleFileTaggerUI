import { CommandResult } from 'domain/models';
import { emptySplitApi as api } from '../emptyApi';

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    importDirectoryGet: build.query<ImportDirectoryApiResponse, ImportDirectoryApiArg>({
      query: (queryArg) => ({
        url: `/api/Settings/ImportDirectory`,
        params: { path: queryArg.path },
      }),
    }),
  }),
  overrideExisting: false,
});

export { injectedRtkApi as enhancedApi };

export type ImportDirectoryApiResponse = /** status 200  */ CommandResult;
export type ImportDirectoryApiArg = {
  path?: string;
};
