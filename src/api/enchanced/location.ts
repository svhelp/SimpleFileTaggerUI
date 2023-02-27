import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { CommandResultWithOfUpdateLocationCommandResultModel } from 'domain/models';
import { enhancedApi as api } from '../partial/location';
import { enhancedApi as tagsApi } from '../partial/tag';

const updateLocationsCache = (
    dispatch: ThunkDispatch<any, any, AnyAction>,
    response: CommandResultWithOfUpdateLocationCommandResultModel) => {
    dispatch(
        api.util.updateQueryData('locationAll', undefined, (draft) => {
            for (const affectedLocation of response.data!.locations) {
              const cachedLocation = draft.find(l => l.id === affectedLocation.id);

              if (!cachedLocation) {
                  return;
              }
  
              cachedLocation.tagIds = affectedLocation.tagIds;
            }
        })
    );
}

const updateTagsCache = (
    dispatch: ThunkDispatch<any, any, AnyAction>,
    response: CommandResultWithOfUpdateLocationCommandResultModel) => {
    dispatch(
        tagsApi.util.updateQueryData('tagGet', undefined, (draft) => {
            const tagsToAdd = response.data!.createdTags ?? [];

            for (const tag of tagsToAdd) {
                draft.push(tag);
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
        async onQueryStarted({ createLocationCommandModel }, { dispatch, queryFulfilled }) {
            try {
              const { data: response } = await queryFulfilled
    
              if (!response.isSuccessful){
                return;
              }
    
              dispatch(
                api.util.updateQueryData('locationAll', undefined, (draft) => {
                  for (const location of response.data!.locations){
                    draft.push(location);
                  }
                })
              )
            } catch {}
          },
    },
    locationRemove: {
      async onQueryStarted({ removeLocationCommandModel }, { dispatch, queryFulfilled }) {
          try {
            const { data: response } = await queryFulfilled
  
            if (!response.isSuccessful){
              return;
            }
  
            dispatch(
              api.util.updateQueryData('locationAll', undefined, (draft) => {
                const removedLocationIds = response.data?.removedLocationIds ?? [];
                const orphansParent = response.data?.orphansParent;

                const removedLocations = draft.filter(l => removedLocationIds.includes(l.id));
  
                for (const removedLocation of removedLocations){
                  removedLocation.isRemoved = true;
                }

                const orphans = draft.filter(l => !!l.parentId && !l.isRemoved
                  && removedLocationIds.includes(l.parentId));
                
                for (const orphan of orphans){
                  orphan.parentId = orphansParent;
                }
              })
            )
          } catch {}
        },
    },
    locationAddTags: {
        async onQueryStarted({ updateLocationCommandModel }, { dispatch, queryFulfilled }) {
            try {
              const { data: response } = await queryFulfilled
    
              if (!response.isSuccessful){
                return;
              }
    
              updateTagsCache(dispatch, response);
              updateLocationsCache(dispatch, response);
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
    
              updateTagsCache(dispatch, response);
              updateLocationsCache(dispatch, response);
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
      async onQueryStarted({ locationId }, { dispatch, queryFulfilled }) {
          try {
            const { data: response } = await queryFulfilled
  
            if (!response.isSuccessful){
              return;
            }
  
            dispatch(
              api.util.updateQueryData('locationAll', undefined, (draft) => {
                const affectedLocations = draft.filter(l => response.data.includes(l.id));

                for (const location of affectedLocations){
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

