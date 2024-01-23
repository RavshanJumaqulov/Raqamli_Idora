import { Box } from '@mui/material'
import { Text } from '@styles/globalStyle'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const NotFound = ({url} : {url ?: string}) => {
  const [count, setCount] = useState(5)
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if(prev <= 0) navigate(url ?? "/")
        return prev - 1
    })
    }, 1000)

    const timeOut = setTimeout(() => {
        navigate(url ?? "/")
    }, 5000)

    return () => {
        clearInterval(interval)
        clearTimeout(timeOut)
    }
  }, [])

  return (
    <Box
      mt={"70px"}
    >
      <Text fs='25px' fw='600' textAlign={"center"} >
        Sahifa topilmadi
      </Text>
      <Text fs='22px' fw='500' textAlign={"center"} >
        {count} soniyada bosh sahifaga qaytasiz
      </Text>

    </Box>
  )
}
