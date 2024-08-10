import Papa from "papaparse";

export const fetchMovies = async () => {
  const response = await fetch("/movie_dataset.csv");
  const reader = response.body.getReader();
  const result = await reader.read();
  const decoder = new TextDecoder("utf-8");
  const csv = decoder.decode(result.value);
  const results = Papa.parse(csv, {header: true});
  return results.data;
};
