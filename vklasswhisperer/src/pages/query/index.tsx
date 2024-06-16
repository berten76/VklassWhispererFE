import { FC, useState } from "react";
import "./index.css";
import { queryVklass } from "../../apis/klassWhisperer";
import { ClockLoader } from "react-spinners";

interface Props {}

const QueryPage: FC<Props> = () => {
  const [query, setQuery] = useState<string>("");
  const [response, setResponse] = useState<string[]>([]);
  const [sources, setSources] = useState<string[]>([]);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);

  const handleOnClickQuery = async () => {
    setResponse([]);
    setSources([]);
    setShowSpinner(true);
    const response = await queryVklass(query);
    setShowSpinner(false);
    if (response) {
      console.log("rep-----------");
      console.log(response.sources);

      var responsedLocal = response.response.split("\n");
      console.log(responsedLocal.length);
      setResponse(responsedLocal);

      console.log(sources.length);
      setSources(response.sources);
    }
  };

  const handleQueryChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="flex-container">
      <div className="card">
        <h1 className="">Vklass whisperer</h1>
        <div>Skriv in en fråga!</div>

        <input className="input-large" onChange={handleQueryChanged} />
        <div className="button-container">
          <button className="button_query" onClick={handleOnClickQuery}>
            Fråga
          </button>
        </div>
        <div className="clockloader">
          {showSpinner && <ClockLoader color="#36d7b7" />}
        </div>

        <div className="leftCentered">
          <div>
            {response.length > 0 && (
              <div>
                <div className="bold">Svar</div>
                {response.map((res, index) => (
                  <p key={index}>{res}</p>
                ))}
              </div>
            )}
          </div>
          <div>
            {sources.length > 0 && (
              <div>
                <div className="bold">Resurser</div>
                {sources.map((res, index) => (
                  <p key={index}>{res}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueryPage;
