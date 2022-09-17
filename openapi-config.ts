import { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
    schemaFile: 'http://localhost:9366/swagger/v1/swagger.json',
    apiFile: './src/api/emptyApi.ts',
    apiImport: 'emptySplitApi',
    outputFiles: {
      './src/api/partial/thumbnail.ts': {
        filterEndpoints: [/thumbnail/i],
      },
      './src/api/partial/tag.ts': {
        filterEndpoints: [/tag/i],
      },
      './src/api/partial/taggroup.ts': {
        filterEndpoints: [/taggroup/i],
      },
      './src/api/partial/location.ts': {
        filterEndpoints: [/location/i],
      },
      './src/api/partial/search.ts': {
        filterEndpoints: [/search/i],
      },
    },
    hooks: true,
  }

  export default config