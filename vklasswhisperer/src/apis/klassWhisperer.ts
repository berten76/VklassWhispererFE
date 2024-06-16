import axios from "axios";

const ROUTE = "http://127.0.0.1:8000/"

interface QueryRequest {
    query: string;
}


export const queryVklass = async (query: string): Promise<ResponseModel | null> => {
    const request: QueryRequest = {
        query:query
    } 
    const response = await axios.post<ResponseModel>(ROUTE, request)

    return response.data;
}