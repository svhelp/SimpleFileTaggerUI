import { CommandResultWithOfListGuid, CommandResultWithOfUpdateLocationCommandResultModel, CreateLocationCommandModel, LocationModel, LocationPlainModel, RemoveLocationCommandModel, UpdateLocationCommandModel } from 'domain/models';
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
    locationCreate: build.mutation<
      LocationCreateApiResponse,
      LocationCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Location/Create`,
        method: 'POST',
        body: queryArg.createLocationCommandModel,
      }),
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
        body: queryArg.removeLocationCommandModel,
      }),
    }),
    markNotFound: build.mutation<
      MarkNotFoundApiResponse,
      MarkNotFoundApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Location/MarkNotFound`,
        method: 'PATCH',
        params: { locationId: queryArg.locationId },
      }),
    })
  }),
  overrideExisting: false,
});

export { injectedRtkApi as enhancedApi };

export type LocationGetApiResponse = /** status 200  */ LocationModel;
export type LocationGetApiArg = {
  path?: string;
};
export type LocationAllApiResponse = /** status 200  */ LocationPlainModel[];
export type LocationAllApiArg = void;
export type LocationCreateApiResponse =
  /** status 200  */ CommandResultWithOfUpdateLocationCommandResultModel;
export type LocationCreateApiArg = {
  createLocationCommandModel: CreateLocationCommandModel;
};
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
export type LocationRemoveTagsApiResponse =
  /** status 200  */ CommandResultWithOfUpdateLocationCommandResultModel;
export type LocationRemoveTagsApiArg = {
  updateLocationCommandModel: UpdateLocationCommandModel;
};
export type LocationRemoveApiResponse =
  /** status 200  */ CommandResultWithOfListGuid;
export type LocationRemoveApiArg = {
  removeLocationCommandModel: RemoveLocationCommandModel;
};
export type MarkNotFoundApiResponse =
  /** status 200  */ CommandResultWithOfListGuid;
export type MarkNotFoundApiArg = {
  locationId: string;
};
