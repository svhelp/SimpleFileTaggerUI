import { enhancedApi as api } from '../partial/taggroup';

const enhancedApi = api.enhanceEndpoints({
  addTagTypes: ['Groups'],
  endpoints: {
    tagGroupGet: {
      providesTags: ['Groups'],
    },
    tagGroupUpdate: {
        async onQueryStarted({ updateGroupCommandModel }, { dispatch, queryFulfilled }) {
            try {
              const { data: response } = await queryFulfilled
    
              if (!response.isSuccessful || !response.data){
                return;
              }
    
              dispatch(
                api.util.updateQueryData('tagGroupGet', undefined, (draft) => {
                  const updatedTag = draft.find(t => t.id === response.data!.id);

                  if (!updatedTag){
                    draft.push({
                        id: response.data!.id,
                        name: updateGroupCommandModel.name,
                        isRequired: updateGroupCommandModel.isRequired,
                        tagIds: response.data!.tags.map(t => t.id),
                      });
                    return;
                  }

                  updatedTag.name = updateGroupCommandModel.name;
                  updatedTag.isRequired = updateGroupCommandModel.isRequired;
                  updatedTag.tagIds = response.data!.tags.map(t => t.id);
                })
              )
            } catch {}
          }
    },
    tagGroupRemove: {
        invalidatesTags: ['Groups']
    },
    tagGroupRemoveTag: {
        async onQueryStarted({ updateTagGroupRelationCommandModel }, { dispatch, queryFulfilled }) {
            try {
              const { data: response } = await queryFulfilled
    
              if (!response.isSuccessful){
                return;
              }
    
              dispatch(
                api.util.updateQueryData('tagGroupGet', undefined, (draft) => {
                  const updatedTag = draft.find(t => t.id === updateTagGroupRelationCommandModel.groupId);

                  if (!updatedTag){
                    return;
                  }

                  updatedTag.tagIds = updatedTag.tagIds.filter(id => id !== updateTagGroupRelationCommandModel.tagId);
                })
              )
            } catch {}
          }
    },
    tagGroupAddTag: {
        async onQueryStarted({ updateTagGroupRelationCommandModel }, { dispatch, queryFulfilled }) {
            try {
              const { data: response } = await queryFulfilled
    
              if (!response.isSuccessful){
                return;
              }
    
              dispatch(
                api.util.updateQueryData('tagGroupGet', undefined, (draft) => {
                  const updatedTag = draft.find(t => t.id === updateTagGroupRelationCommandModel.groupId);

                  if (!updatedTag){
                    return;
                  }

                  updatedTag.tagIds.push(updateTagGroupRelationCommandModel.tagId);
                })
              )
            } catch {}
          }
    }
  },
})

export const {
    useTagGroupGetQuery,
    useTagGroupUpdateMutation,
    useTagGroupRemoveMutation,
    useTagGroupAddTagMutation,
    useTagGroupRemoveTagMutation,
} = enhancedApi;