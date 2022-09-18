import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import queryString from 'query-string'

// initialize an empty api service that we'll inject endpoints into later as needed
export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:9366',
    paramsSerializer: queryString.stringify,
  }),
  endpoints: () => ({}),
})