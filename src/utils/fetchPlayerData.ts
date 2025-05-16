// src/utils/fetchPlayerData.ts
import Papa from "papaparse";

export interface Character {
  id: number;
  characterName: string;
  level: string;
  lastLevelUp: string;
}

export interface PlayerData {
  id: number;
  playerName: string;
  availableXP: string;
  characters: Character[];
}

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQYKptcX5PKFKFT0agKac20yp9W9PknTz_BBR5hi8uhtLuRq54aTyEWEbGZIfJTxfvfvXbvkTKueSg5/pub?output=csv"; // Replace with your link

const formatDateToISO = (dateString: string): string => {
  if (!dateString) {
    return "";
  }

  const [day, month, year] = dateString.split("/");
  if (!day || !month || !year) {
    return "";
  }

  const formattedYear = year.length === 2 ? `20${year}` : year;

  return `${formattedYear}-${month}-${day}`;
};

export const fetchPlayerData = async (): Promise<PlayerData[]> => {
  const response = await fetch(CSV_URL);
  const csvData = await response.text();

  return new Promise((resolve) => {
    Papa.parse(csvData, {
      header: false,
      complete: (results) => {
        const rows = results.data;
        const parsedPlayers: PlayerData[] = [];
        let playerIdCounter = 1;
        let characterIdCounter = 1;

        for (let i = 1; i < rows.length; i++) {
          const row = rows[i];
          if (row[1]) {
            const player: PlayerData = {
              id: playerIdCounter++,
              playerName: row[1],
              availableXP: row[3],
              characters: [],
            };
            let j = i;

            while (rows[j] && rows[j][5]) {
              player.characters.push({
                id: characterIdCounter++,
                characterName: rows[j][5],
                level: rows[j][10],
                lastLevelUp: formatDateToISO(rows[j][12]),
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
