import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MergeTagsCommandModel } from "domain/MergeTagsCommandModel";
import { SimpleNamedModel } from "domain/SimpleNamedModel";
import { TaggerDirectoryInfo } from "domain/TaggerDirectoryInfo";
import { TagModel } from 'domain/TagModel'
import { UpdateTagsCommandModel } from "domain/UpdateTagsCommandModel";

export const sftApi = createApi({
    reducerPath: 'sftApi',
    baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:9366/api/',
    }),
    endpoints: (build) => ({
        getTags: build.query<TagModel[], string>({
            query: () => ({ url: `tag/get` }),
        }),
        createTag: build.query<void, SimpleNamedModel>({
            query: (payload) => ({
                url: 'tag/create',
                method: 'POST',
                body: payload,
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                },
              }),
        }),
        removeTag: build.query<void, string>({
            query: (payload) => ({
                url: `tag/remove?id=${payload}`,
                method: 'DELETE',
              }),
        }),
        mergeTags: build.query<void, MergeTagsCommandModel>({
            query: (payload) => ({
                url: 'tag/merge',
                method: 'PUT',
                body: payload,
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                },
              }),
        }),
        getLocations: build.query<TaggerDirectoryInfo[], string>({
            query: () => ({ url: `location/all` }),
        }),
        getLocationTags: build.query<TaggerDirectoryInfo, string>({
            query: (payload) => ({ url: `location/get?path=${payload}` }),
        }),
        addLocationTags: build.query<void, UpdateTagsCommandModel>({
            query: (payload) => ({
                url: 'tag/addtags',
                method: 'PUT',
                body: payload,
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                },
              }),
        }),
        setLocationTags: build.query<void, UpdateTagsCommandModel>({
            query: (payload) => ({
                url: 'tag/settags',
                method: 'PUT',
                body: payload,
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                },
              }),
        }),
        removeLocationTags: build.query<void, UpdateTagsCommandModel>({
            query: (payload) => ({
                url: 'tag/removetags',
                method: 'PUT',
                body: payload,
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                },
              }),
        }),
    })
})

export const { 
    useGetTagsQuery,
    useAddLocationTagsQuery,
    useCreateTagQuery, 
    useGetLocationsQuery,
    useGetLocationTagsQuery,
    useMergeTagsQuery, 
    useSetLocationTagsQuery, 
    useRemoveLocationTagsQuery,
    useRemoveTagQuery
} = sftApi