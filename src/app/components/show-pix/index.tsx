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
import { XCircle } from "@phosphor-icons/react";

interface showPixProps {
    handleClose: () => void;
    pixUrl: string,
    pixPayload: string,
}

export function ShowPix({ handleClose, pixPayload, pixUrl }: showPixProps) {
    const [open, setOpen] = React.useState(true);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className={styles.modalBox}>
                {/* <h1 className={styles.modalTitle}>Adicione seu endereço</h1> */}

                <div className={styles.content}>
                    <div style={{ display: "flex", justifyContent: "end", cursor: "pointer" }}>
                        <XCircle size={32} onClick={handleClose} />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", flexDirection: "column", gap: "10px" }}>

                        <img
                            src={`data:image/png;base64,${pixUrl}`}
                            alt="QR Code PIX"
                            style={{ maxWidth: 200, margin: "0 auto" }}
                        />
                        <p>
                            Escaneie o QR Code com seu app bancário ou copie e cole o código abaixo.
                        </p>
                        <span>{pixPayload}</span>
                        <Button
                            variant="contained"
                            type="submit"
                            role="link"
                            href="/"
                            sx={{
                                backgroundColor: "var(--primary-color)",
                                boxShadow: "none",
                                textTransform: "none",
                                marginTop: "10px"
                            }}
                        >
                            Voltar às compras
                        </Button>
                    </div>
                </div>
            </Box>
        </Modal>
    );
}
