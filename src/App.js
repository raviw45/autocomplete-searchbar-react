import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [cache, setCache] = useState({});
  const fetchData = async () => {
    console.log("API call " + input);
    const data = await fetch("https://dummyjson.com/recipes/search?q=" + input);
    const json = await data.json();
    setResults(json?.recipes);
    setCache((prev) => ({ ...prev, [input]: results }));
  };

  useEffect(() => {
    if (cache[input]) {
      console.log("API call cached " + input);
      setResults(cache[input]);
      return;
    }
    const timer = setTimeout(() => {
      fetchData();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  const handleSearch = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="App">
      <h1>Amazon Searchbar</h1>
      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          onChange={handleSearch}
          onFocus={() => setShowResult(true)}
          onBlur={() => setShowResult(false)}
        />
        <div className="result">
          {showResult &&
            results?.map((r) => (
              <span className="search-result" key={r.id}>
                {r.name}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}
