import React, { useState } from "react";
import { Funding } from "../interfaces";

export default function FundingRoundsForSearch() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("Test");
  const [fundings, setFundings] = useState<Funding[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClick = () => {
    setIsLoading(true);
    const url = new URL("http://localhost:8080/fundings");
    url.searchParams.set("limit", String(20));
    url.searchParams.set("offset", String(0));
    url.searchParams.set("q", searchTerm);

    fetch(url).then((response) => response.json()).then((responseJson) => {
      const hits: Funding[] = responseJson.results.hits;
      setFundings(hits);
      setIsLoading(false);
    });
  };

  const Fundings: React.FC = () => isLoading ?
    <div>Loading</div>
    :
    <pre>{JSON.stringify(fundings, null, 4)}</pre>;


  return (
    <div>
      <input type="search" name="org_search" onChange={handleChange} value={searchTerm}></input>
      <button onClick={handleClick}>Search</button>
      <Fundings/>
    </div>
  );
}
