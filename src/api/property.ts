import { PropertyItemType } from "../types";

import { PAGINATION_LIMIT } from ".././constants";

type PropertiesQuery = {
  pageParam: number;
};

export async function getProperties({
  pageParam,
}: PropertiesQuery): Promise<PropertyItemType[]> {
  const response = await fetch(
    `https://65ca332c3b05d29307dfed7b.mockapi.io/properties?page=${pageParam}&limit=${PAGINATION_LIMIT}`,
    {
      method: "GET",
      headers: { "content-type": "application/json" },
    }
  );

  const data = await response.json();

  return data;
}

export async function getProperty(
  id: string
): Promise<PropertyItemType | null> {
  const response = await fetch(
    `https://65ca332c3b05d29307dfed7b.mockapi.io/properties/${id}`,
    {
      method: "GET",
      headers: { "content-type": "application/json" },
    }
  );

  const data = await response.json();

  if (data === "Not found" || !data) {
    return null;
  }

  return data;
}
