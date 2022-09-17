import { emptySplitApi as api } from '../emptyApi';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
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
export type ModelBase = {
  id: string;
};
export type ThumbnailModel = ModelBase & {
  image: string;
};
export type TagModel = ModelBase & {
  name: string;
  group: TagGroupModel;
  thumbnail: ThumbnailModel;
};
export type TagGroupModel = ModelBase & {
  name: string;
  tags: TagModel[];
};
export type CommandResult = {
  isSuccessful: boolean;
  message: string;
};
export type UpdateLocationCommandModel = {
  path: string;
  tags: string[];
};
export type CommandResultWithOfUpdateLocationCommandModel = CommandResult & {
  data?: UpdateLocationCommandModel;
};
export type UpdateGroupCommandModel = {
  groupName: string;
  tagIds: string[];
};
export const {
  useTagGroupGetQuery,
  useTagGroupAddMutation,
  useTagGroupRemoveMutation,
  useTagGroupRemoveTagMutation,
} = injectedRtkApi;
