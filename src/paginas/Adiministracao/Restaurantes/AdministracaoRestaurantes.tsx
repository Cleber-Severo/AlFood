import React, { useState, useEffect } from 'react'
import axios from 'axios';
import IRestaurante from '../../../interfaces/IRestaurante';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button
} from "@mui/material";
import { Link } from 'react-router-dom';

export default function AdministracaoRestaurantes() {
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

    useEffect(() => {
        axios.get<IRestaurante[]>('http://localhost:8000/api/v2/restaurantes/')
        .then( res => setRestaurantes(res.data))
    }, [])

    const excluirRestaurante = (restauranteAhSerExcluido: IRestaurante) => {
      axios.delete(`http://localhost:8000/api/v2/restaurantes/${restauranteAhSerExcluido.id}/`)
      .then(() => {
        const listaRestaurantes = restaurantes.filter( restaurante => restaurante.id !== restauranteAhSerExcluido.id);
        setRestaurantes([...listaRestaurantes]);
      })
    }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurantes.map((restaurante) => (
            <TableRow key={restaurante.id}>
              <TableCell>{restaurante.nome}</TableCell>
              <TableCell>[ <Link to={`/admin/restaurantes/${restaurante.id}`} >editar</Link> ]</TableCell>
              <TableCell>
                <Button variant='outlined' color='error' onClick={() => excluirRestaurante(restaurante)}>Excluir</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
