import { useEffect, useState } from "react";
import apiClients from "../services/api-clients";
import { CanceledError } from "axios";


interface FetchResponse<T>{
    count: number;
    results: T[];
}

const useData = <T> (endpoint:string) => {
    const [data, setData] = useState<T[]>([]);
    const [error, setError] = useState<string>("");
    const [isLoading, setLoading] = useState(false);
  
    useEffect(() => {
      const controller = new AbortController();
  
      setLoading(true);
      apiClients
        .get<FetchResponse<T>>(endpoint, {signal: controller.signal})
        .then((res) => {
          setData(res.data.results)
          setLoading(false);
          })
        .catch((err) =>{
          if (err instanceof CanceledError) return;
          setError(err.message)
          setLoading(false);
        });
  
        return () => controller.abort();
    }, []); // Empty dependency array to run the effect only once on mount
  
    return { data, error, isLoading };};

export default useData;