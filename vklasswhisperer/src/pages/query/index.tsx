import { FC, useState } from "react";
import "./index.css";
import { queryVklass } from "../../apis/klassWhisperer";

interface Props {}

const QueryPage: FC<Props> = () => {
  const [query, setQuery] = useState<string>("");
  const [response, setResponse] = useState<string[]>([])

 
  const handleOnClickQuery = async () => {
    setResponse([]);
    const response = await queryVklass(query);
    if(response){
      console.log("rep-----------")
      
      var responsedLocal = response.response.split("\n")
      console.log(responsedLocal.length)
      setResponse(responsedLocal);
    }
  };

  const handleQueryChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <h1 className="center">Vklass whisperer</h1>
      <div>Skriv in en fråga!</div>
      <div>
        <input className="input-large" onChange={handleQueryChanged} />
        <button className="button_query" onClick={handleOnClickQuery}>Fråga</button>
      </div>
      {response.map((res, index) =>(
        <p key={index}>{res}</p>
      ) )}
    </div>
  );
};

export default QueryPage;
