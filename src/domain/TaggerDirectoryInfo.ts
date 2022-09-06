import { TagModel } from "./TagModel"

export interface TaggerDirectoryInfo {
    path: string
    name: string
    children: TaggerDirectoryInfo[]
    tags: TagModel[]
}