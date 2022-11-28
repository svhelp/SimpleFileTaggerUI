import { enhancedApi as api } from '../partial/tag';

const enhancedApi = api.enhanceEndpoints({
  addTagTypes: ['Tags'],
  endpoints: {
    tagGet: {
      providesTags: ['Tags'],
    },
    tagCreate: {
        async onQueryStarted({ simpleNamedModel }, { dispatch, queryFulfilled }) {
            try {
              const { data: response } = await queryFulfilled
    
              if (!response.isSuccessful){
                return;
              }
    
              dispatch(
                api.util.updateQueryData('tagGet', undefined, (draft) => {
                  draft.push({
                    id: response.data,
                    name: simpleNamedModel.name,
                    thumbnailId: ''
                  });
                })
              )
            } catch {}
          },
    },
    tagUpdate: {
        async onQueryStarted({ updateTagCommandModel }, { dispatch, queryFulfilled }) {
            try {
              const { data: response } = await queryFulfilled
    
              if (!response.isSuccessful){
                return;
              }
    
              dispatch(
                api.util.updateQueryData('tagGet', undefined, (draft) => {
                  const updatedTag = draft.find(t => t.id === updateTagCommandModel.id);

                  if (!updatedTag){
                    return;
                  }

                  updatedTag.name = updateTagCommandModel.name;
                })
              )
            } catch {}
          }
    },
    tagRemove: {
        invalidatesTags: ['Tags']
    },
    tagMerge: {
      invalidatesTags: ['Tags']
    },
  },
})

export const {
  useTagGetQuery,
  useTagCreateMutation,
  useTagUpdateMutation,
  useTagRemoveMutation,
  useTagMergeMutation,
} = enhancedApi;