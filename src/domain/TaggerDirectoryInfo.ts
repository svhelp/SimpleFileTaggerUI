import { TagModel } from "./TagModel"

export interface TaggerDirectoryInfo {
    path: string
    children: TaggerDirectoryInfo[]
    tags: TagModel[]
}