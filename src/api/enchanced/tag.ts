import { enhancedApi as api } from '../partial/tag';
import { enhancedApi as locationsApi } from '../partial/location';

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
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
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

              updatedTag.isRemoved = true;
            })
          )
        } catch {}
      }
    },
    tagMerge: {
      async onQueryStarted({ mergeTagsCommandModel }, { dispatch, queryFulfilled }) {
        try {
          const { data: response } = await queryFulfilled

          if (!response.isSuccessful){
            return;
          }

          dispatch(
            api.util.updateQueryData('tagGet', undefined, (draft) => {
              const mergedTags = draft.filter(t => mergeTagsCommandModel.tagIds.includes(t.id)
                && t.id !== mergeTagsCommandModel.mainTagId);

              for (const mergedTag of mergedTags) {
                mergedTag.isRemoved = true;
              }
            })
          )
          
          dispatch(
            locationsApi.util.updateQueryData('locationAll', undefined, (draft) => {
              const updatedLocations = draft.filter(l => l.tagIds.filter(t => mergeTagsCommandModel.tagIds.includes(t)).length > 1);

              for (const removedLocation of updatedLocations){
                removedLocation.tagIds = removedLocation.tagIds.filter(t => !mergeTagsCommandModel.tagIds.includes(t));

                if (!removedLocation.tagIds.includes(mergeTagsCommandModel.mainTagId)) {
                  removedLocation.tagIds.push(mergeTagsCommandModel.mainTagId);
                }
              }
            })
          )
        } catch {}
      }
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