import { useEffect, useState } from "react"
import client from "./api/Api"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActions } from "@mui/material";


export default function App() {
  const [vaquinhas, setVaquinhas] = useState([])
  
  const listVaquinhas = async () => {
    try {
      const response = await client.get("/vaquinhas");
      if (response.data) {
        setVaquinhas(response.data.vaquinhas)
      } else {
        setVaquinhas([])
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    listVaquinhas();
  }, [])

  return (
    <div className="flex flex-col items-center justify-center bg-orange-100 h-screen">
      <div className="text-4xl font-serif font-semibold text-blue-700 mt-4">Vaquinhas Solidárias</div>
      <div className="text-2xl font-sans text-blue-600 mb-4">Sua doação pode salvar uma vida!</div>
      <div className="border-2 border-blue-600 border-solid rounded-md p-4 w-[1000px] bg-white">
        <Card className="flex my-2">
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            alt="ABC"
            image="https://employer.com.br/wp-content/uploads/2022/01/empurre-sua-vaquinha.jpg"
          />
          <CardContent>
            ABC
          </CardContent>
          <CardActions>
            LINK DA VAQUINHA
          </CardActions>
        </Card>
        <Card sx={{ display: 'flex' }}>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            alt="ABC"
            image="https://employer.com.br/wp-content/uploads/2022/01/empurre-sua-vaquinha.jpg"
          />
          <CardContent>
            ABC
          </CardContent>
          <CardActions>
            LINK DA VAQUINHA
          </CardActions>
        </Card>
      </div>
      <div className="text-1xl font-sans hover:text-blue-600 cursor-pointer mt-4">Quer adicionar uma vaquinha? Clique aqui!</div>
    </div>
  )
}