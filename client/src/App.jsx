import { useEffect, useState } from "react"
import client from "./api/Api"
import { 
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from "@mui/material";

export default function App() {
  const [vaquinhas, setVaquinhas] = useState([])
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState("");
  
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

  const handleDialog = (event) => {
    event.preventDefault();
    setOpenDialog(true)
  }

  const handleDialogClose = () => {
    setOpenDialog(false)
  }
  
  return (
    <div className="flex flex-col items-center justify-center bg-zinc-200 min-h-screen">
      <div className="text-4xl font-serif font-semibold text-blue-700 mt-4">Vaquinhas Solidárias</div>
      <div className="text-2xl font-sans text-blue-600 mb-4">Sua doação pode salvar uma vida!</div>
      <div className="border-2 border-blue-600 border-solid rounded-md p-4 lg:w-[1000px] bg-white">
        {vaquinhas.map((vaquinha) => (
          <Card className="lg:flex my-2 justify-between items-center" key={vaquinha.id}>
            <CardMedia 
              component="img"
              className="h-32"
              alt={vaquinha.name}
              image={vaquinha.image}
            />
            <CardContent className="flex flex-col">
              <b className="flex justify-center">
                {vaquinha.name}
              </b>
              {vaquinha.desc}
              <span className="flex justify-center mt-2">
                <Button href={vaquinha.url} target="_blank" rel="noopener noreferrer" variant="contained">LINK DA VAQUINHA</Button>
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
      <div onClick={handleDialog} className="text-1xl font-sans hover:text-blue-600 cursor-pointer my-4">
        Quer adicionar uma vaquinha? Clique aqui!
      </div>

      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            client.post(`/vaquinhas`, formJson).then(() => {
              handleDialogClose();
              location.reload();
            })
          }
        }}
      >
        <DialogTitle>Adicionar Vaquinha</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <span className='text-red-500'>
              {error ? error : ""}
            </span>
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Nome da Vaquinha"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="desc"
            name="desc"
            label="Descrição da Vaquinha"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="url"
            name="url"
            label="Link da Vaquinha"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="image"
            name="image"
            label="URL da imagem"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancelar</Button>
          <Button type='submit' variant="contained">Adicionar</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}