import React, { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState("redux");
  const [url, setUrl] = useState(
    "https://hn.algolia.com/api/v1/search?query=redux"
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await axios(
        `https://hn.algolia.com/api/v1/search?query=${query}`
      );
      setData(result.data);
      console.log(`query: ${query}`);
      console.log(`url: ${url}`);
      setIsLoading(false);
    };
    fetchData();
  }, [url]);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      <button
        type="button"
        onClick={() => {
          setUrl(`https://hn.algolia.com/api/v1/search?query=${query}`);
        }}
        style={{ marginLeft: "7px" }}
      >
        search
      </button>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {data.hits.map((item) => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
