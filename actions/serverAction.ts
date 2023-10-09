"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export const getRandomDrinks = async () => {
  const results: any = [];
  ("use server");
  for (let i = 0; i < 5; i++) {
    const res = await fetch(`${process.env.BASE_URL}/random.php`, {
      cache: "no-cache",
    });
    let cocktails = await res.json();
    results.push(cocktails.drinks[0]);
  }
  return results;
};

export const searchCocktail = async (searchVal: any) => {
  "use server";
  const res = await fetch(
    `${process.env.BASE_URL}/search.php?s=${searchVal.search}`
  );
  let cocktails = await res.json();
  return cocktails;
};
