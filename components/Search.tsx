"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  Center,
  Button,
  TextInput,
  Avatar,
  Title,
  ActionIcon,
  rem,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { searchCocktail } from "@/actions/serverAction";
import classes from "./Search.module.css";
import { IconTrash, IconSearch, IconArrowRight } from "@tabler/icons-react";
interface Drink {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strImageAttribution: string;
  strCategory: string;
}

const Search: React.FC = () => {
  const [searchData, setSearchData] = useState<Drink[]>([]);
  const [selectedDrinks, setSelectedDrinks] = useState<Drink[]>([]);
  const searchForm = useForm({
    initialValues: {
      search: "",
    },
    validate: {},
    validateInputOnBlur: true,
  });

  useEffect(() => {
    const storedData = localStorage.getItem("fav");
    if (storedData) {
      setSelectedDrinks(JSON.parse(storedData));
    }
  }, []);

  const formOnSubmit = searchForm.onSubmit(async (values) => {
    try {
      const res = await searchCocktail(values);
      setSearchData(res.drinks || []);
    } catch (error) {
      console.error(error);
    }
  });

  const addToFavourite = (fav: Drink) => {
    const updatedSelectedDrinks = [...selectedDrinks, fav];
    setSelectedDrinks(updatedSelectedDrinks);
    localStorage.setItem("fav", JSON.stringify(updatedSelectedDrinks));
  };

  const removeFromFavourite = (index: number) => {
    const updatedSelectedDrinks = selectedDrinks.filter((_, i) => i !== index);
    setSelectedDrinks(updatedSelectedDrinks);
    localStorage.setItem("fav", JSON.stringify(updatedSelectedDrinks));
  };

  return (
    <div className="grid lg:grid-cols-12 gap-4">
      <div className="lg:col-span-4">
        <form onSubmit={formOnSubmit}>
          <TextInput
            radius="xl"
            size="md"
            placeholder="Search Drinks"
            rightSectionWidth={42}
            leftSection={
              <IconSearch
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              />
            }
            rightSection={
              <ActionIcon size={32} radius="xl" variant="filled" type="submit">
                <IconArrowRight
                  style={{ width: rem(18), height: rem(18) }}
                  stroke={1.5}
                />
              </ActionIcon>
            }
            {...searchForm.getInputProps("search")}
          />
        </form>
      </div>
      <div className="lg:col-span-4 lg:col-start-1">
        <div className="mt-4">
          <Title size="md" className="mb-2">
            Favorite Cocktails
          </Title>
          <ul className="mt-4">
            {selectedDrinks.length !== 0 ? (
              selectedDrinks.map((drink: Drink, index) => (
                <li key={index}>
                  <Group className="mt-2 border-opacity-50 border p-1">
                    <Avatar src={drink.strDrinkThumb}></Avatar>
                    <Text>{drink.strDrink}</Text>
                    <Button
                      variant="outline"
                      onClick={() => removeFromFavourite(index)}
                      leftSection={
                        <IconTrash
                          color="red"
                          style={{ width: 20, height: 20 }}
                        />
                      }
                    >
                      Remove
                    </Button>
                  </Group>
                </li>
              ))
            ) : (
              <li>Please add favorite drinks..</li>
            )}
          </ul>
        </div>
      </div>
      <div className="lg:col-span-8">
        <div className="grid lg:grid-cols-4 gap-4">
          {searchData.map((drink: Drink, index) => (
            <Card key={drink.idDrink} withBorder radius="sm">
              <Card.Section className={classes.imageSection}>
                <Image
                  src={drink.strDrinkThumb}
                  alt={drink.strImageAttribution}
                />
              </Card.Section>

              <Group justify="space-between" mt="md">
                <div>
                  <Text fw={500}>{drink.strDrink}</Text>
                </div>
                <Badge variant="outline">{drink.strCategory}</Badge>
              </Group>
              <Card.Section className={classes.section}>
                <Group gap={30}>
                  {selectedDrinks.some(
                    (selectedDrink) => selectedDrink.idDrink === drink.idDrink
                  ) ? (
                    <Button radius="xl" color="pink">
                      Already Added
                    </Button>
                  ) : (
                    <Button
                      radius="xl"
                      style={{ flex: 1 }}
                      onClick={() => addToFavourite(drink)}
                    >
                      Add to Fav
                    </Button>
                  )}
                </Group>
              </Card.Section>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
