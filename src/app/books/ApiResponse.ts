import { Books } from "./books";

export interface ApiResponse{
    status:number,
    data:Books[]
}

export interface ApiResponseSingleRec{
    status:number,
    data:Books
}