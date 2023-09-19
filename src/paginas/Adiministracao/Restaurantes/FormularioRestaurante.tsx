import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";
import http from "../../../http";

export default function FormularioRestaurante() {
  const parametros = useParams();

  useEffect(() => {
    if (parametros.id) {
      http
        .get<IRestaurante>(`restaurantes/${parametros.id}/`)
        .then((res) => setNomeRestaurante(res.data.nome));
    }
  }, [parametros]);

  const [nomeRestaurante, setNomeRestaurante] = useState("");

  const aoSubmeterFomr = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (parametros.id) {
      http
        .put(`restaurantes/${parametros.id}/`, {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert("restaurante Atualizado com sucesso");
        });
    } else {
      http
        .post("restaurantes/", {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert("restaurante cadastrado com sucesso");
        });
    }
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography component={"h1"} variant="h6">
        Formulário de Restaurantes
      </Typography>
      <Box component={"form"} onSubmit={aoSubmeterFomr}>
        <TextField
          value={nomeRestaurante}
          onChange={(event) => setNomeRestaurante(event.target.value)}
          id="standard-basic"
          label="Nome do Restaurante"
          variant="standard"
          fullWidth
          required
        />
        <Button
          sx={{ marginTop: 1 }}
          type="submit"
          fullWidth
          variant="outlined"
        >
          Salvar
        </Button>
      </Box>
    </Box>
  );
}
