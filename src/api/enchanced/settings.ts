import { enhancedApi as api } from '../partial/settings';

const enhancedApi = api.enhanceEndpoints({
  addTagTypes: ['Groups', 'Locations', 'Tags'],
  endpoints: {
    importDirectoryPatch: {
        invalidatesTags: ['Groups', 'Locations', 'Tags']
    },
  },
})

export const {
  useImportDirectoryPatchMutation,
} = enhancedApi;