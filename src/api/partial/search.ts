import { LocationPlainModel } from 'domain/models';
import { emptySplitApi as api } from '../emptyApi';

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    searchGet: build.query<SearchGetApiResponse, SearchGetApiArg>({
      query: (queryArg) => ({
        url: `/api/Search/Get`,
        params: { tags: queryArg.tags },
      }),
    }),
  }),
  overrideExisting: false,
});

export { injectedRtkApi as enhancedApi };

export type SearchGetApiResponse = /** status 200  */ LocationPlainModel[];
export type SearchGetApiArg = {
  tags?: string[];
};

export const { useSearchGetQuery } = injectedRtkApi;
