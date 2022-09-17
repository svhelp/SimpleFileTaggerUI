import { emptySplitApi as api } from '../emptyApi';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    locationGet: build.query<LocationGetApiResponse, LocationGetApiArg>({
      query: (queryArg) => ({
        url: `/api/Location/Get`,
        params: { path: queryArg.path },
      }),
    }),
    locationAll: build.query<LocationAllApiResponse, LocationAllApiArg>({
      query: () => ({ url: `/api/Location/All` }),
    }),
    locationAddTags: build.mutation<
      LocationAddTagsApiResponse,
      LocationAddTagsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Location/AddTags`,
        method: 'PUT',
        body: queryArg.updateLocationCommandModel,
      }),
    }),
    locationSetTags: build.mutation<
      LocationSetTagsApiResponse,
      LocationSetTagsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Location/SetTags`,
        method: 'PUT',
        body: queryArg.updateLocationCommandModel,
      }),
    }),
    locationRemoveTags: build.mutation<
      LocationRemoveTagsApiResponse,
      LocationRemoveTagsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Location/RemoveTags`,
        method: 'PUT',
        body: queryArg.updateLocationCommandModel,
      }),
    }),
    locationRemove: build.mutation<
      LocationRemoveApiResponse,
      LocationRemoveApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Location/Remove`,
        method: 'DELETE',
        params: { id: queryArg.id },
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type LocationGetApiResponse = /** status 200  */ TaggerDirectoryInfo;
export type LocationGetApiArg = {
  path?: string;
};
export type LocationAllApiResponse = /** status 200  */ TaggerDirectoryInfo[];
export type LocationAllApiArg = void;
export type LocationAddTagsApiResponse =
  /** status 200  */ CommandResultWithOfUpdateLocationCommandResultModel;
export type LocationAddTagsApiArg = {
  updateLocationCommandModel: UpdateLocationCommandModel;
};
export type LocationSetTagsApiResponse =
  /** status 200  */ CommandResultWithOfUpdateLocationCommandResultModel;
export type LocationSetTagsApiArg = {
  updateLocationCommandModel: UpdateLocationCommandModel;
};
export type LocationRemoveTagsApiResponse = /** status 200  */ CommandResult;
export type LocationRemoveTagsApiArg = {
  updateLocationCommandModel: UpdateLocationCommandModel;
};
export type LocationRemoveApiResponse = /** status 200  */ CommandResult;
export type LocationRemoveApiArg = {
  id?: string;
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
export type CommandResult = {
  isSuccessful: boolean;
  message: string;
};
export type UpdateLocationCommandResultModel = ModelBase & {
  path: string;
  name: string;
  tags: SimpleModel[];
};
export type CommandResultWithOfUpdateLocationCommandResultModel =
  CommandResult & {
    data?: UpdateLocationCommandResultModel;
  };
export type UpdateLocationCommandModel = {
  path: string;
  tags: string[];
};
export const {
  useLocationGetQuery,
  useLocationAllQuery,
  useLocationAddTagsMutation,
  useLocationSetTagsMutation,
  useLocationRemoveTagsMutation,
  useLocationRemoveMutation,
} = injectedRtkApi;
