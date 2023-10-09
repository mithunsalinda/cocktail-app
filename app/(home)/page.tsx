import { getRandomDrinks } from "@/actions/serverAction";
import AddButton from "@/components/AddButton";
import RandomDrinks from "@/components/RandomDrinks";
import Search from "@/components/Search";
import { revalidateTag } from "next/cache";

export default function Home() {
  /**
   * let drinks:any = []
  async function loadRandomDrinks () {
    drinks = await getRandomDrinks();
    revalidateTag('drinks')
  }
   */
  //const drinks:any = await getRanDrinks();

  return (
    <main className="flex min-h-screen flex-col p-24 px-5">
      <div className="grid lg:grid-cols-5 gap-3">
        <RandomDrinks />
      </div>
      <Search />
    </main>
  );
}
