import React, { useEffect, useState } from "react";
import { Org } from "./interfaces";

export default function OrgTable() {
  const [isLoading, setIsLoading] = useState(true);
  const [orgs, setOrgs] = useState<Org[]>([]);

  useEffect(() => {
    const url = new URL("http://localhost:8080/orgs");
    url.searchParams.set("limit", String(20));
    url.searchParams.set("offset", String(0));

    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        const hits: Org[] = responseJson.results.hits;
        setOrgs(hits);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
        </tr>
      </thead>

      <tbody>
        {orgs.map((org) => (
          <tr key={org.uuid}>
            <td>{org.company_name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
