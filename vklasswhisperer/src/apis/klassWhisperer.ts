import axios from "axios";

const ROUTE = "https://vklasswhispererbe.azurewebsites.net/"

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