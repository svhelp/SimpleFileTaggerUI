import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import queryString from 'query-string'

export const BaseURL = 'http://localhost:9366';

// initialize an empty api service that we'll inject endpoints into later as needed
export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BaseURL,
    paramsSerializer: queryString.stringify,
  }),
  endpoints: () => ({}),
})