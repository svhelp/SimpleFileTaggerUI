import { emptySplitApi as api } from '../emptyApi';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    searchGet: build.query<SearchGetApiResponse, SearchGetApiArg>({
      query: (queryArg) => ({ url: `/api/Search/Get`, body: queryArg.body }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type SearchGetApiResponse = /** status 200  */ TaggerDirectoryInfo[];
export type SearchGetApiArg = {
  body: string[];
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
export type SimpleModel = {
  id: string;
  name: string;
};
export type TaggerDirectoryInfo = ModelBase & {
  path: string;
  name: string;
  children: TaggerDirectoryInfo[];
  tags: TagModel[];
  groups: SimpleModel[];
};
export const { useSearchGetQuery } = injectedRtkApi;
