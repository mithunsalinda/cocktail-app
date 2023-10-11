'use client'
import { getRandomDrinks } from '@/actions/serverAction'
import { Button } from '@mantine/core'
import React, { useEffect, useTransition } from 'react'

const AddButton = () => {
    const [isPending, startTransistion] = useTransition()
  return (
    <Button size="md" onClick={() => startTransistion(() => getRandomDrinks())}>{isPending ? "Loading.." : "Refresh"}</Button>
  )
}

export default AddButton