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
    tagGroupGet: build.query<TagGroupGetApiResponse, TagGroupGetApiArg>({
      query: () => ({ url: `/api/TagGroup/Get` }),
    }),
    tagGroupAdd: build.mutation<TagGroupAddApiResponse, TagGroupAddApiArg>({
      query: (queryArg) => ({
        url: `/api/TagGroup/Add`,
        method: 'PUT',
        body: queryArg.updateGroupCommandModel,
      }),
    }),
    tagGroupRemove: build.mutation<
      TagGroupRemoveApiResponse,
      TagGroupRemoveApiArg
    >({
      query: (queryArg) => ({
        url: `/api/TagGroup/Remove`,
        method: 'DELETE',
        params: { id: queryArg.id },
      }),
    }),
    tagGroupRemoveTag: build.mutation<
      TagGroupRemoveTagApiResponse,
      TagGroupRemoveTagApiArg
    >({
      query: (queryArg) => ({
        url: `/api/TagGroup/RemoveTag`,
        method: 'PUT',
        body: queryArg.updateGroupCommandModel,
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
export type TagGetApiResponse = /** status 200  */ TagModel[];
export type TagGetApiArg = void;
export type TagCreateApiResponse = /** status 200  */ CommandResultWithOfGuid;
export type TagCreateApiArg = {
  simpleNamedModel: SimpleNamedModel;
};
export type TagRemoveApiResponse = /** status 200  */ CommandResult;
export type TagRemoveApiArg = {
  id?: string;
};
export type TagMergeApiResponse = /** status 200  */ CommandResult;
export type TagMergeApiArg = {
  mergeTagsCommandModel: MergeTagsCommandModel;
};
export type TagGroupGetApiResponse = /** status 200  */ TagGroupModel[];
export type TagGroupGetApiArg = void;
export type TagGroupAddApiResponse =
  /** status 200  */ CommandResultWithOfUpdateLocationCommandModel;
export type TagGroupAddApiArg = {
  updateGroupCommandModel: UpdateGroupCommandModel;
};
export type TagGroupRemoveApiResponse = /** status 200  */ CommandResult;
export type TagGroupRemoveApiArg = {
  id?: string;
};
export type TagGroupRemoveTagApiResponse = /** status 200  */ CommandResult;
export type TagGroupRemoveTagApiArg = {
  updateGroupCommandModel: UpdateGroupCommandModel;
};
export type CommandResult = {
  isSuccessful: boolean;
  message: string;
};
export type ModelBase = {
  id: string;
};
export type SimpleModel = {
  id: string;
  name: string;
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
export type CommandResultWithOfGuid = CommandResult & {
  data: string;
};
export type SimpleNamedModel = {
  name: string;
};
export type MergeTagsCommandModel = {
  tagIds: string[];
};
export type CommandResultWithOfUpdateLocationCommandModel = CommandResult & {
  data?: UpdateLocationCommandModel;
};
export type UpdateGroupCommandModel = {
  groupName: string;
  tagIds: string[];
};
export const {
  useLocationAddTagsMutation,
  useLocationSetTagsMutation,
  useLocationRemoveTagsMutation,
  useTagGetQuery,
  useTagCreateMutation,
  useTagRemoveMutation,
  useTagMergeMutation,
  useTagGroupGetQuery,
  useTagGroupAddMutation,
  useTagGroupRemoveMutation,
  useTagGroupRemoveTagMutation,
} = injectedRtkApi;
