import { useEffect, useState } from "react";
import apiClients from "../services/api-clients";
import { CanceledError } from "axios";

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: {platform: Platform}[];
  metacritic: number;
}

interface FetchGamesResponse {
  count: number;
  results: Game[];
}

const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState<string>(""); // Explicitly setting the type as string

  useEffect(() => {
    const controller = new AbortController();

    apiClients
      .get<FetchGamesResponse>("/games", {signal: controller.signal})
      .then((res) => setGames(res.data.results))
      .catch((err) =>{
        if (err instanceof CanceledError) return;
        setError(err.message)
      })

      return () => controller.abort();
  }, []); // Empty dependency array to run the effect only once on mount

  return { games, error };
};

export default useGames;
