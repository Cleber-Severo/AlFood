import React, { useState } from "react";
import axios from 'axios';
import { TextField, Button } from "@mui/material";


export default function FormularioRestaurante() {
    const [nomeRestaurante, setNomeRestaurante] = useState("");

    const aoSubmeterFomr = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      
      axios.post('http://localhost:8000/api/v2/restaurantes/', {
        nome: nomeRestaurante
      })
      .then(() => {
        alert('restaurante cadastrado com sucesso')
      })
      
    };

  return (
    <form onSubmit={aoSubmeterFomr}>
      <TextField
        value={nomeRestaurante}
        onChange={(event) => setNomeRestaurante(event.target.value)}
        id="standard-basic"
        label="Nome do Restaurante"
        variant="standard"
      />
      <Button type="submit" variant="outlined">Salvar</Button>
    </form>
  );
}
