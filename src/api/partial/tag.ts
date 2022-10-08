import { CommandResultWithOfUpdateLocationCommandResultModel, UpdateLocationCommandModel, CommandResult, TagPlainModel, CommandResultWithOfGuid, SimpleNamedModel, MergeTagsCommandModel } from 'domain/models';
import { emptySplitApi as api } from '../emptyApi';

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
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
    tagGet: build.query<TagGetApiResponse, TagGetApiArg>({
      query: () => ({ url: `/api/Tag/Get` }),
    }),
    tagCreate: build.mutation<TagCreateApiResponse, TagCreateApiArg>({
      query: (queryArg) => ({
        url: `/api/Tag/Create`,
        method: 'POST',
        body: queryArg.simpleNamedModel,
      }),
    }),
    tagUpdate: build.mutation<TagUpdateApiResponse, TagUpdateApiArg>({
      query: (queryArg) => ({
        url: `/api/Tag/Update`,
        method: 'PUT',
        params: { Name: queryArg.name, Id: queryArg.id },
      }),
    }),
    tagRemove: build.mutation<TagRemoveApiResponse, TagRemoveApiArg>({
      query: (queryArg) => ({
        url: `/api/Tag/Remove`,
        method: 'DELETE',
        params: { id: queryArg.id },
      }),
    }),
    tagMerge: build.mutation<TagMergeApiResponse, TagMergeApiArg>({
      query: (queryArg) => ({
        url: `/api/Tag/Merge`,
        method: 'PUT',
        body: queryArg.mergeTagsCommandModel,
      }),
    }),
  }),
  overrideExisting: false,
});

export { injectedRtkApi as enhancedApi };

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
export type TagGetApiResponse = /** status 200  */ TagPlainModel[];
export type TagGetApiArg = void;
export type TagCreateApiResponse = /** status 200  */ CommandResultWithOfGuid;
export type TagCreateApiArg = {
  simpleNamedModel: SimpleNamedModel;
};
export type TagUpdateApiResponse = /** status 200  */ CommandResult;
export type TagUpdateApiArg = {
  name?: string;
  id?: string;
};
export type TagRemoveApiResponse = /** status 200  */ CommandResult;
export type TagRemoveApiArg = {
  id?: string;
};
export type TagMergeApiResponse = /** status 200  */ CommandResult;
export type TagMergeApiArg = {
  mergeTagsCommandModel: MergeTagsCommandModel;
};

export const {
  useLocationAddTagsMutation,
  useLocationSetTagsMutation,
  useLocationRemoveTagsMutation,
  useTagGetQuery,
  useTagCreateMutation,
  useTagUpdateMutation,
  useTagRemoveMutation,
  useTagMergeMutation,
} = injectedRtkApi;
