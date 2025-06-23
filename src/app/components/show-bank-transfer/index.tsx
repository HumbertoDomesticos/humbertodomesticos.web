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

interface showBankTransferProps {
    handleClose: () => void;
    subtotal: number;
}

export function ShowBankTransfer({ handleClose, subtotal }: showBankTransferProps) {
    const [open, setOpen] = React.useState(true);
    const { user } = useAuth();

    const [formData, setFormData] = React.useState({
        code: "",
        agency: "",
        account: "",
        accountDigit: "",
        bankAccountType: "CONTA_CORRENTE", // valor padrão

    });

    const gerarTransferencia = async () => {
        try {
            const response = await fetch("/api/asaas/bank-transfer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    value: subtotal,
                    code: formData.code,
                    ownerName: user?.nome_usuario,
                    cpfCnpj: user?.cpf,
                    agency: formData.agency,
                    account: formData.account,
                    accountDigit: formData.accountDigit,
                    bankAccountType: formData.bankAccountType

                }),
            });

            console.log("Resposta do fetch:", response.status, response.statusText);

            const data = await response.json();

            console.log('post: ', data);

        } catch (error) {
            console.error("Erro ao chamar API do PIX:", error);
        }
    };

    // const teste = async () => {
    //     const response = await fetch("/api/asaas/bank-transfer", {
    //         method: "GET",
    //         headers: { "Content-Type": "application/json" },
    //     });
    //     const data = await response.json();

    //     console.log(data);
    // }

    // const twogeda = async () => {
    //     await gerarTransferencia();
    //     await teste();
    // }



    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className={styles.modalBox}>
                <div className={styles.content}>
                    <h1 className={styles.modalTitle}>Adicione seu dados bancários</h1>

                    <TextField
                        type="number"
                        label="Valor a ser transferido"
                        variant="outlined"
                        value={subtotal}
                        // onChange={(e) =>
                        //     setFormData({ ...formData, cep_endereco: e.target.value })
                        // }
                        disabled
                        aria-readonly
                    />
                    <TextField
                        type="number"
                        label="Código de compensação do banco no sistema bancário"
                        variant="outlined"
                        value={formData.code}
                        onChange={(e) =>
                            setFormData({ ...formData, code: e.target.value })
                        }
                    />
                    <TextField
                        type="text"
                        label="Nome completo"
                        variant="outlined"
                        value={user?.nome_usuario}
                    // onChange={(e) =>
                    //     setFormData({ ...formData, cep_endereco: e.target.value })
                    // }
                    />
                    <TextField
                        // type="text"
                        label="CPF ou CNPJ do proprietário da conta bancária"
                        variant="outlined"
                        value={user?.cpf}
                    // onChange={(e) =>
                    //     setFormData({ ...formData, cep_endereco: e.target.value })
                    // }
                    />
                    <TextField
                        type="number"
                        label="Número da agência sem dígito"
                        variant="outlined"
                        value={formData.agency}
                        onChange={(e) =>
                            setFormData({ ...formData, agency: e.target.value })
                        }
                    />
                    <TextField
                        type="number"
                        label="Número da conta bancária sem dígito"
                        variant="outlined"
                        value={formData.account}
                        onChange={(e) =>
                            setFormData({ ...formData, account: e.target.value })
                        }
                    />
                    <TextField
                        type="number"
                        label="Dígito da conta bancária"
                        variant="outlined"
                        value={formData.accountDigit}
                        onChange={(e) =>
                            setFormData({ ...formData, accountDigit: e.target.value })
                        }
                    />
                    <FormControl fullWidth>
                        <InputLabel>Tipo de conta</InputLabel>
                        <Select
                            value={formData.bankAccountType}
                            label="Tipo de conta"
                            onChange={(e) =>
                                setFormData({ ...formData, bankAccountType: e.target.value })
                            }
                        >
                            <MenuItem value="CONTA_CORRENTE">Conta Corrente</MenuItem>
                            <MenuItem value="CONTA_POUPANCA">Conta Poupança</MenuItem>
                        </Select>
                    </FormControl>

                </div>
                <Button
                    variant="contained"
                    type="submit"
                    role="link"
                    sx={{
                        backgroundColor: "var(--primary-color)",
                        boxShadow: "none",
                        textTransform: "none",
                    }}
                    onClick={gerarTransferencia}
                >
                    Finalizar
                </Button>
            </Box>
        </Modal>
    );
}
