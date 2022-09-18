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
export type SearchGetApiResponse = /** status 200  */ TaggerDirectoryInfo[];
export type SearchGetApiArg = {
  tags?: string[];
};
export type ModelBase = {
  id: string;
};
export type TagGroupModel = ModelBase & {
  name: string;
  tags: TagModel[];
};
export type ThumbnailModel = ModelBase & {
  image: string;
};
export type TagModel = ModelBase & {
  name: string;
  group: TagGroupModel;
  thumbnail: ThumbnailModel;
};
export type TaggerDirectoryInfo = ModelBase & {
  path: string;
  name: string;
  children: TaggerDirectoryInfo[];
  tags: TagModel[];
};
export const { useSearchGetQuery } = injectedRtkApi;
