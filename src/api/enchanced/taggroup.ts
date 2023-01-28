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
                  for (const group of draft) {
                    group.tagIds = group.tagIds.filter(id => !updateGroupCommandModel.tagIds.includes(id));
                  }

                  const updatedGroup = draft.find(t => t.id === response.data!.id);

                  if (!updatedGroup){
                    draft.push({
                        id: response.data!.id,
                        name: updateGroupCommandModel.name,
                        isRequired: updateGroupCommandModel.isRequired,
                        tagIds: updateGroupCommandModel.tagIds,
                      });
                    return;
                  }

                  updatedGroup.name = updateGroupCommandModel.name;
                  updatedGroup.isRequired = updateGroupCommandModel.isRequired;
                  updatedGroup.tagIds = updateGroupCommandModel.tagIds;
                })
              )
            } catch {}
          }
    },
    tagGroupRemove: {
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        try {
          const { data: response } = await queryFulfilled

          if (!response.isSuccessful){
            return;
          }

          dispatch(
            api.util.updateQueryData('tagGroupGet', undefined, (draft) => {
              const updatedGroup = draft.find(gr => gr.id === id);

              if (!updatedGroup){
                return;
              }

              updatedGroup.isRemoved = true;
            })
          )
        } catch {}
      }
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
                  const updatedGroup = draft.find(t => t.id === updateTagGroupRelationCommandModel.groupId);

                  if (!!updatedGroup){
                    updatedGroup.tagIds = updatedGroup.tagIds.filter(id => id !== updateTagGroupRelationCommandModel.tagId);
                  }
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
                  const groupToRemove = draft.find(gr => gr.tagIds.includes(updateTagGroupRelationCommandModel.tagId));

                  if (!!groupToRemove){
                    groupToRemove.tagIds = groupToRemove.tagIds.filter(id => id !== updateTagGroupRelationCommandModel.tagId);
                  }

                  const updatedGroup = draft.find(t => t.id === updateTagGroupRelationCommandModel.groupId);

                  if (!!updatedGroup){
                    updatedGroup.tagIds.push(updateTagGroupRelationCommandModel.tagId);
                  }
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