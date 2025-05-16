// src/utils/fetchPlayerData.ts
import Papa from "papaparse";

interface Character {
  name: string;
  level: string;
  lastLevelUp: string;
}

export interface PlayerData {
  name: string;
  availableXP: string;
  characters: Character[];
}

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQYKptcX5PKFKFT0agKac20yp9W9PknTz_BBR5hi8uhtLuRq54aTyEWEbGZIfJTxfvfvXbvkTKueSg5/pub?output=csv"; // Replace with your link

export const fetchPlayerData = async (): Promise<PlayerData[]> => {
  const response = await fetch(CSV_URL);
  const csvData = await response.text();

  return new Promise((resolve) => {
    Papa.parse(csvData, {
      header: false,
      complete: (results) => {
        const rows = results.data;
        const parsedPlayers: PlayerData[] = [];

        for (let i = 1; i < rows.length; i++) {
          const row = rows[i];
          if (row[1]) {
            const player: PlayerData = {
              name: row[1],
              availableXP: row[3],
              characters: [],
            };
            let j = i + 1;

            while (rows[j] && rows[j][5]) {
              player.characters.push({
                name: rows[j][5],
                level: rows[j][10],
                lastLevelUp: rows[j][12],
              });
              j++;
            }
            parsedPlayers.push(player);
            i = j - 1;
          }
        }

        resolve(parsedPlayers);
      },
    });
  });
};
