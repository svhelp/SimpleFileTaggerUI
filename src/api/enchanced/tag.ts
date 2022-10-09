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
                    groupId: '',
                    thumbnailId: ''
                  });
                })
              )
            } catch {}
          },
    },
    tagUpdate: {
        async onQueryStarted({ name, id }, { dispatch, queryFulfilled }) {
            try {
              const { data: response } = await queryFulfilled
    
              if (!response.isSuccessful){
                return;
              }
    
              dispatch(
                api.util.updateQueryData('tagGet', undefined, (draft) => {
                  const updatedTag = draft.find(t => t.id === id);

                  if (!updatedTag){
                    return;
                  }

                  updatedTag.name = name!;
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