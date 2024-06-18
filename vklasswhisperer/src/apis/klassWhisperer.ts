import axios from "axios";

const ROUTE = "https://vklasswhispererbe.azurewebsites.net/"
//const ROUTE = "http://127.0.0.1:8000/"
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

export const downloadPDF = async (fileName: string): Promise<Blob> => {
    try {
        const url = ROUTE + "download/" + fileName;
        const response = await axios.get(url, { responseType: 'blob' });
        return response.data;
    } catch (error) {
        console.error("Error downloading the PDF file:", error);
        throw new Error("Failed to download PDF.");
    }
}