"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

import { useAuth } from "@/app/context/AuthContext";
import {
  IUserAddress,
  postUsuarioEndereco,
  UF,
} from "@/services/routes/usuarios/page";

import styles from "./styles.module.scss";

interface addressInputs {
  handleClose: () => void;
}

export function BasicModal({ handleClose }: addressInputs) {
  const { user } = useAuth();
  const [open, setOpen] = React.useState(true);

  const [formData, setFormData] = React.useState({
    cep_endereco: "",
    numero_endereco: "",
    rua_endereco: "",
    bairro_endereco: "",
    cidade_endereco: "",
    descricao_endereco: "",
    uf_endereco: "" as UF,
  });

  const handleSubmit = async () => {
    const endereco: IUserAddress = {
      cep_endereco: formData.cep_endereco,
      numero_endereco: formData.numero_endereco,
      rua_endereco: formData.rua_endereco,
      bairro_endereco: formData.bairro_endereco,
      cidade_endereco: formData.cidade_endereco,
      descricao_endereco: formData.descricao_endereco,
      uf_endereco: formData.uf_endereco,
    };

    try {
      await postUsuarioEndereco(user?.id_usuario!, endereco);
    } catch (err) {
      console.error("Erro ao criar usuário:", err);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={styles.modalBox}>
        <h1 className={styles.modalTitle}>Adicione seu endereço</h1>

        <TextField
          label="CEP"
          variant="outlined"
          value={formData.cep_endereco}
          onChange={(e) =>
            setFormData({ ...formData, cep_endereco: e.target.value })
          }
        />
        <TextField
          label="Rua"
          variant="outlined"
          value={formData.rua_endereco}
          onChange={(e) =>
            setFormData({ ...formData, rua_endereco: e.target.value })
          }
        />
        <TextField
          label="Número"
          variant="outlined"
          value={formData.numero_endereco}
          onChange={(e) =>
            setFormData({ ...formData, numero_endereco: e.target.value })
          }
        />
          <TextField
            label="Cidade"
            variant="outlined"
            value={formData.cidade_endereco}
            onChange={(e) =>
              setFormData({ ...formData, cidade_endereco: e.target.value })
            }
          />
        <TextField
          label="Bairro"
          variant="outlined"
          value={formData.bairro_endereco}
          onChange={(e) =>
            setFormData({ ...formData, bairro_endereco: e.target.value })
          }
        />
        <TextField
          label="Descrição"
          variant="outlined"
          value={formData.descricao_endereco}
          onChange={(e) =>
            setFormData({ ...formData, descricao_endereco: e.target.value })
          }
        />
        <FormControl fullWidth>
          <InputLabel id="uf-label">UF</InputLabel>
          <Select
            labelId="uf-label"
            id="uf_endereco"
            value={formData.uf_endereco}
            label="UF"
            onChange={(e) =>
              setFormData({ ...formData, uf_endereco: e.target.value as UF })
            }
          >
            {[
              "AC",
              "AL",
              "AP",
              "AM",
              "BA",
              "CE",
              "DF",
              "ES",
              "GO",
              "MA",
              "MT",
              "MS",
              "MG",
              "PA",
              "PB",
              "PR",
              "PE",
              "PI",
              "RJ",
              "RN",
              "RS",
              "RO",
              "RR",
              "SC",
              "SP",
              "SE",
              "TO",
            ].map((uf) => (
              <MenuItem key={uf} value={uf}>
                {uf}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div className={styles.modalActions}>
          <Button
            variant="outlined"
            className={styles.cancelButton}
            onClick={handleClose}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            className={styles.primaryButton}
            onClick={handleSubmit}
          >
            Salvar
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
