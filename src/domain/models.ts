  export type ModelBase = {
    id: string;
  };

  export type SimpleModel = ModelBase & {
    name: string;
  };

  export type VirtualRemovableModel = {
    isRemoved?: boolean;
  };

  export type LocationModel = SimpleModel & {
    path: string;
    notFound: boolean;
    children: LocationModel[];
    tagIds: string[];
  };

  export type CommandResult = {
    isSuccessful: boolean;
    message: string;
  };

  export type SimpleNamedModel = {
    name: string;
  };
  
  export type ThumbnailPlainModel = ModelBase & {
    image: string;
  };

  export type TagGroupPlainModel = SimpleModel & VirtualRemovableModel & {
    tagIds: string[];
    isRequired: boolean;
  };
  
  export type UpdateGroupTagsCommandResultModel = ModelBase & {
    tags: SimpleModel[];
  };

  export type CommandResultWithOfUpdateGroupTagsCommandResultModel =
    CommandResult & {
      data?: UpdateGroupTagsCommandResultModel;
    };

  export type UpdateGroupCommandModel = {
    id?: string;
    name: string;
    isRequired: boolean;
    tagIds: string[];
  };

  export type UpdateTagGroupRelationCommandModel = {
    groupId: string;
    tagId: string;
  };

  export type TagPlainModel = SimpleModel & VirtualRemovableModel & {
    thumbnailId: string;
  };

  export type UpdateTagCommandModel = {
    id: string;
    name: string;
    groupId?: string;
  };
  
  export type MergeTagsCommandModel = {
    tagIds: string[];
  };

  export type CommandResultWithOfGuid = CommandResult & {
    data: string;
  };

  export type CommandResultWithOfListGuid = CommandResult & {
    data: string[];
  };
  
  export type LocationPlainModel = SimpleModel & VirtualRemovableModel & {
    path: string;
    parentId?: string;
    notFound: boolean;
    tagIds: string[];
  };

  export type CreateLocationCommandModel = {
    path: string;
    isRecoursive: boolean;
  }

  export type RemoveLocationCommandModel = {
    locationId: string;
    isRecoursive: boolean;
  }
  
  export type UpdateLocationCommandResultModel = {
    locations: LocationPlainModel[];
    createdTags: TagPlainModel[];
  };

  export type CommandResultWithOfUpdateLocationCommandResultModel =
    CommandResult & {
      data?: UpdateLocationCommandResultModel;
    };

  export type UpdateLocationCommandModel = {
    path: string;
    isRecoursive: boolean;
    tags: string[];
  };