export type ModelBase = {
    id: string;
  };

  export type SimpleModel = ModelBase & {
    name: string;
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

  export type TagGroupPlainModel = SimpleModel & {
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

  export type TagPlainModel = SimpleModel & {
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
  
  export type LocationPlainModel = SimpleModel & {
    path: string;
    notFound: boolean;
    tagIds: string[];
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