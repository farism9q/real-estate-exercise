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

export async function createProperty(property: PropertyItemType) {
  const response = await fetch(
    `https://65ca332c3b05d29307dfed7b.mockapi.io/properties/`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        ...property,
        images: [
          "https://media.istockphoto.com/id/1026556184/photo/3d-rendering-of-modern-cozy-house-by-the-river-cool-autumn-evening-with-soft-light.jpg?s=2048x2048&w=is&k=20&c=Rm3_2H0-bqyIuZTga_rfzM6hHa6CACLrE-h9Bn4tkIo=",
          "https://media.istockphoto.com/id/697705520/photo/3d-rendering-of-modern-cozy-house-summer-evening.jpg?s=2048x2048&w=is&k=20&c=jnktLS6sf2SN9ki_cuYe7wdOefRzjzSUAp-m6BthCsU=",
          "https://media.istockphoto.com/id/1026556184/photo/3d-rendering-of-modern-cozy-house-by-the-river-cool-autumn-evening-with-soft-light.jpg?s=2048x2048&w=is&k=20&c=Rm3_2H0-bqyIuZTga_rfzM6hHa6CACLrE-h9Bn4tkIo=",
          "https://media.istockphoto.com/id/697705520/photo/3d-rendering-of-modern-cozy-house-summer-evening.jpg?s=2048x2048&w=is&k=20&c=jnktLS6sf2SN9ki_cuYe7wdOefRzjzSUAp-m6BthCsU=",
        ],
      }),
    }
  );

  const data = await response.json();

  return data;
}

export async function updateProperty(id: string, property: PropertyItemType) {
  const response = await fetch(
    `https://65ca332c3b05d29307dfed7b.mockapi.io/properties/${id}`,
    {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(property),
    }
  );

  const data = await response.json();

  return data;
}
