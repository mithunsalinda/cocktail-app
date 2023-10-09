'use client'
import React, { useEffect, useState } from "react";
import { getRandomDrinks } from "@/actions/serverAction";
import { Card, Button, Skeleton } from "@mantine/core";
import Image from "next/image";
interface DrinkProduct {
  id: string;
  strDrinkThumb: string;
  strCategory: string;
  href: string;
  strDrink: string;
  strAlcoholic: string;
}

const Drink: React.FC<{ product: DrinkProduct }> = ({ product }) => (
  <div key={product.id} className="p-4">
    <div>
      <Image
        src={product.strDrinkThumb}
        alt={product.strCategory}
        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
      />
    </div>
    <div className="mt-4 flex justify-between">
      <div>
        <h3 className="text-sm text-gray-700">
          <a href={product.href}>
            <span aria-hidden="true" className="absolute inset-0" />
            {product.strDrink}
          </a>
        </h3>
        <p className="mt-1 text-sm text-gray-500">{product.strAlcoholic}</p>
      </div>
      <p className="text-sm font-medium text-gray-900">{product.strCategory}</p>
    </div>
  </div>
);

const RandomDrinks: React.FC = () => {
  const [drinks, setDrinks] = useState<DrinkProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getRandomDrinks();
      setDrinks(res);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const LoadingSkeleton = () => (
    <div>
      <Skeleton height={220} />
      <Skeleton height={8} mt ={5} width="60%" />
      <Skeleton height={8} mt ={5} width="40%" mb={20}/>
    </div>
  );
  return (
    <>
      {loading ? (
        // Display Skeleton while loading
        Array(5)
          .fill(null)
          .map((_, index) => <LoadingSkeleton key={index} />)
      ) : (
        <>
          {drinks.map((product) => (
            <Drink product={product} key={product.id} />
          ))}
          <Card>
            <Button
              variant="gradient"
              gradient={{ from: 'red', to: 'orange', deg: 90 }}
              onClick={fetchData}
            >
              Refresh
            </Button>
          </Card>
        </>
      )}
    </>
  );
};

export default RandomDrinks;
