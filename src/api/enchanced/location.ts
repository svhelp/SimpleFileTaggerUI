import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { CommandResultWithOfUpdateLocationCommandResultModel, LocationModel } from 'domain/models';
import { enhancedApi as api } from '../partial/location';
import { enhancedApi as tagsApi } from '../partial/tag';

const getUpdatedLocationIds = (location: LocationModel, ids: string[]) => {
  const currentLocationsResult = ids.includes(location.id)
    ? [ location ]
    : [];

    if (!location.children || location.children.length === 0){
        return currentLocationsResult;
    }

    const childrenData: LocationModel[] =
        location.children.reduce((acc, l) => acc.concat(getUpdatedLocationIds(l, ids)), [] as LocationModel[])

    return childrenData.concat(currentLocationsResult);
}

const updateLocationsCache = (
    dispatch: ThunkDispatch<any, any, AnyAction>,
    response: CommandResultWithOfUpdateLocationCommandResultModel) => {
    dispatch(
        api.util.updateQueryData('locationAll', undefined, (draft) => {
            const updatedLocation = draft.find(l => l.id === response.data!.id);

            if (!updatedLocation) {
                return;
            }

            updatedLocation.tagIds = response.data!.tags.map(t => t.id);
        })
    );
}

const updateTagsCache = (
    dispatch: ThunkDispatch<any, any, AnyAction>,
    response: CommandResultWithOfUpdateLocationCommandResultModel) => {
    dispatch(
        tagsApi.util.updateQueryData('tagGet', undefined, (draft) => {
            const tagsToAdd = response.data!.tags.filter(t => !draft.some(existingTag => existingTag.id === t.id));

            for (const tag of tagsToAdd) {
                draft.push({
                    id: tag.id,
                    name: tag.name,
                    groupId: '',
                    thumbnailId: ''
                });
            }
        })
    );
}

const enhancedApi = api.enhanceEndpoints({
  addTagTypes: ['Locations'],
  endpoints: {
    locationGet: {
        providesTags: (result, error, arg) => [{ type: 'Locations', id: arg.path }]
    },
    locationAll: {
      providesTags: [{type: 'Locations', id: 'List' }],
    },
    locationCreate: {
        async onQueryStarted({ simpleNamedModel }, { dispatch, queryFulfilled }) {
            try {
              const { data: response } = await queryFulfilled
    
              if (!response.isSuccessful){
                return;
              }
    
              dispatch(
                api.util.updateQueryData('locationAll', undefined, (draft) => {
                  draft.push({
                    id: response.data!.id,
                    name: response.data!.name,
                    path: response.data!.path,
                    notFound: false,
                    children: [],
                    tagIds: [],
                  });
                })
              )
            } catch {}
          },
    },
    locationRemove: {
        invalidatesTags: ['Locations']
    },
    locationAddTags: {
        async onQueryStarted({ updateLocationCommandModel }, { dispatch, queryFulfilled }) {
            try {
              const { data: response } = await queryFulfilled
    
              if (!response.isSuccessful){
                return;
              }
    
              updateLocationsCache(dispatch, response);
              updateTagsCache(dispatch, response);
            } catch {}
          }
    },
    locationSetTags: {
        async onQueryStarted({ updateLocationCommandModel }, { dispatch, queryFulfilled }) {
            try {
              const { data: response } = await queryFulfilled
    
              if (!response.isSuccessful){
                return;
              }
    
              updateLocationsCache(dispatch, response);
              updateTagsCache(dispatch, response);
            } catch {}
          }
    },
    locationRemoveTags: {
        async onQueryStarted({ updateLocationCommandModel }, { dispatch, queryFulfilled }) {
            try {
              const { data: response } = await queryFulfilled
    
              if (!response.isSuccessful){
                return;
              }
    
              dispatch(
                api.util.updateQueryData('locationAll', undefined, (draft) => {
                  const updatedLocation = draft.find(l => l.path === updateLocationCommandModel.path);

                  if (!updatedLocation){
                    return;
                  }

                  updatedLocation.tagIds = updatedLocation.tagIds.filter(t => !updateLocationCommandModel.tags.includes(t));
                })
              )
            } catch {}
          }
    },
    markNotFound: {
      async onQueryStarted({ locationIds }, { dispatch, queryFulfilled }) {
          try {
            const { data: response } = await queryFulfilled
  
            if (!response.isSuccessful){
              return;
            }
  
            dispatch(
              api.util.updateQueryData('locationAll', undefined, (draft) => {
                const updatedLocations = getUpdatedLocationIds({
                  id: '',
                  notFound: false,
                  path: '',
                  name: '',
                  tagIds: [],
                  children: draft
                }, locationIds ?? []);

                for (const location of updatedLocations){
                  location.notFound = true;
                }
              })
            )
          } catch {}
        }
    }
  },
})

export const {
    useLocationGetQuery,
    useLocationAllQuery,
    useLocationCreateMutation,
    useLocationAddTagsMutation,
    useLocationSetTagsMutation,
    useLocationRemoveTagsMutation,
    useLocationRemoveMutation,
    useMarkNotFoundMutation,
} = enhancedApi;

