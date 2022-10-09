import { enhancedApi as api } from '../partial/location';

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
    
              dispatch(
                api.util.updateQueryData('locationAll', undefined, (draft) => {
                  const updatedLocation = draft.find(l => l.id === response.data!.id);

                  if (!updatedLocation){
                    return;
                  }

                  updatedLocation.tagIds = response.data!.tags.map(t => t.id);
                })
              )
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
    
              dispatch(
                api.util.updateQueryData('locationAll', undefined, (draft) => {
                  const updatedLocation = draft.find(l => l.id === response.data!.id);

                  if (!updatedLocation){
                    return;
                  }

                  updatedLocation.tagIds = response.data!.tags.map(t => t.id);
                })
              )
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
} = enhancedApi;