import { FC, useEffect, useState } from "react";
import "./index.css";
import { downloadPDF, queryVklass } from "../../apis/klassWhisperer";
import { ClockLoader } from "react-spinners";

interface Props {}

const QueryPage: FC<Props> = () => {
  const [query, setQuery] = useState<string>("");
  const [response, setResponse] = useState<string[]>([]);
  const [sources, setSources] = useState<string[]>([]);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);

  useEffect(() => {});

  const handleOnClickQuery = async () => {
    setResponse([]);
    setSources([]);
    setShowSpinner(true);
    const response = await queryVklass(query);
    setShowSpinner(false);
    if (response) {
      if (response.send_pdf) {
        try {
          const blob = await downloadPDF(response.response);
          const downloadUrl = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = downloadUrl;
          link.setAttribute("download", response.response);
          document.body.appendChild(link);
          link.click();
          link.parentNode?.removeChild(link);
          window.URL.revokeObjectURL(downloadUrl); // Clean up to release memory
          setResponse(["Veckobrevet har laddats ner"])
        } catch (error) {
          setResponse(["Misslyckades med att ladda ner filen"])
          console.error("Error in downloading the file:", error);
        }
      } else {
        var responsedLocal = response.response.split("\n");
        setResponse(responsedLocal);
        setSources(response.sources);
      }
    }
  };

  const handleQueryChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="flex-container">
      <div className="card">
        <h1 className="">Vklass whisperer</h1>
        <div>Skriv in en fråga.</div>

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
