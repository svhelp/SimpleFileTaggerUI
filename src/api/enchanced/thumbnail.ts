import { enhancedApi as api } from '../partial/thumbnail';

const enhancedApi = api.enhanceEndpoints({
  addTagTypes: ['Thumbnail'],
  endpoints: {
    thumbnailGet: {
      providesTags: (result, error, arg) => [{ type: 'Thumbnail', id: arg.id }]
    },
    thumbnailAdd: {
    },
    thumbnailRemove: {
        invalidatesTags: (result, error, arg) => [{ type: 'Thumbnail', id: arg.id }]
    },
  },
})

export const {
  useThumbnailGetQuery,
  useThumbnailAddMutation,
  useThumbnailRemoveMutation,
} = enhancedApi;