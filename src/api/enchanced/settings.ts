import { enhancedApi as api } from '../partial/settings';

const enhancedApi = api.enhanceEndpoints({
  endpoints: {
    importDirectoryGet: {
        // invalidatesTags: ['Groups']
    },
  },
})

export const {
  useImportDirectoryGetQuery,
} = enhancedApi;