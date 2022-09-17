import { emptySplitApi as api } from '../emptyApi';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    thumbnailGet: build.query<ThumbnailGetApiResponse, ThumbnailGetApiArg>({
      query: (queryArg) => ({
        url: `/api/Thumbnail/Get`,
        params: { id: queryArg.id },
      }),
    }),
    thumbnailAdd: build.mutation<ThumbnailAddApiResponse, ThumbnailAddApiArg>({
      query: (queryArg) => ({
        url: `/api/Thumbnail/Add`,
        method: 'POST',
        body: queryArg.simpleNamedModel,
      }),
    }),
    thumbnailRemove: build.mutation<
      ThumbnailRemoveApiResponse,
      ThumbnailRemoveApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Thumbnail/Remove`,
        method: 'DELETE',
        params: { id: queryArg.id },
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type ThumbnailGetApiResponse = /** status 200  */ ThumbnailModel;
export type ThumbnailGetApiArg = {
  id?: string;
};
export type ThumbnailAddApiResponse =
  /** status 200  */ CommandResultWithOfGuid;
export type ThumbnailAddApiArg = {
  simpleNamedModel: SimpleNamedModel;
};
export type ThumbnailRemoveApiResponse = /** status 200  */ CommandResult;
export type ThumbnailRemoveApiArg = {
  id?: string;
};
export type ModelBase = {
  id: string;
};
export type ThumbnailModel = ModelBase & {
  image: string;
};
export type CommandResult = {
  isSuccessful: boolean;
  message: string;
};
export type CommandResultWithOfGuid = CommandResult & {
  data: string;
};
export type SimpleNamedModel = {
  name: string;
};
export const {
  useThumbnailGetQuery,
  useThumbnailAddMutation,
  useThumbnailRemoveMutation,
} = injectedRtkApi;
