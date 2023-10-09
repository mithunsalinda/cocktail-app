'use client'
import { getRandomDrinks } from '@/actions/serverAction'
import React, { useEffect, useTransition } from 'react'

const AddButton = () => {
    const [isPending, startTransistion] = useTransition()
  return (
    <button onClick={() => startTransistion(() => getRandomDrinks())}>{isPending ? "Loading.." : "Refresh"}</button>
  )
}

export default AddButton