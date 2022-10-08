import { TagGroupPlainModel, CommandResultWithOfUpdateGroupTagsCommandResultModel, UpdateGroupCommandModel, CommandResult, UpdateTagGroupRelationCommandModel } from 'domain/models';
import { emptySplitApi as api } from '../emptyApi';

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    tagGroupGet: build.query<TagGroupGetApiResponse, TagGroupGetApiArg>({
      query: () => ({ url: `/api/TagGroup/Get` }),
    }),
    tagGroupUpdate: build.mutation<
      TagGroupUpdateApiResponse,
      TagGroupUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/TagGroup/Update`,
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
    tagGroupAddTag: build.mutation<
      TagGroupAddTagApiResponse,
      TagGroupAddTagApiArg
    >({
      query: (queryArg) => ({
        url: `/api/TagGroup/AddTag`,
        method: 'PUT',
        body: queryArg.updateTagGroupRelationCommandModel,
      }),
    }),
    tagGroupRemoveTag: build.mutation<
      TagGroupRemoveTagApiResponse,
      TagGroupRemoveTagApiArg
    >({
      query: (queryArg) => ({
        url: `/api/TagGroup/RemoveTag`,
        method: 'PUT',
        body: queryArg.updateTagGroupRelationCommandModel,
      }),
    }),
  }),
  overrideExisting: false,
});

export { injectedRtkApi as enhancedApi };

export type TagGroupGetApiResponse = /** status 200  */ TagGroupPlainModel[];
export type TagGroupGetApiArg = void;
export type TagGroupUpdateApiResponse =
  /** status 200  */ CommandResultWithOfUpdateGroupTagsCommandResultModel;
export type TagGroupUpdateApiArg = {
  updateGroupCommandModel: UpdateGroupCommandModel;
};
export type TagGroupRemoveApiResponse = /** status 200  */ CommandResult;
export type TagGroupRemoveApiArg = {
  id?: string;
};
export type TagGroupAddTagApiResponse = /** status 200  */ CommandResult;
export type TagGroupAddTagApiArg = {
  updateTagGroupRelationCommandModel: UpdateTagGroupRelationCommandModel;
};
export type TagGroupRemoveTagApiResponse = /** status 200  */ CommandResult;
export type TagGroupRemoveTagApiArg = {
  updateTagGroupRelationCommandModel: UpdateTagGroupRelationCommandModel;
};

export const {
  useTagGroupGetQuery,
  useTagGroupUpdateMutation,
  useTagGroupRemoveMutation,
  useTagGroupAddTagMutation,
  useTagGroupRemoveTagMutation,
} = injectedRtkApi;
