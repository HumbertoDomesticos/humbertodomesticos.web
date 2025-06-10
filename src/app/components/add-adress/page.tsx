import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { borderRadius } from '@mui/system';
import { useAuth } from '@/app/context/AuthContext';
import { IUserAddress, Usuario, postUsuarioEndereco } from '@/services/routes/usuarios/page';
import { TextField } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    borderRadius: '16px',
    //   border: '2px solid #000',
    //   boxShadow: 24,
    p: 4,
};

export default function BasicModal() {
    const { user } = useAuth();

    const [open, setOpen] = React.useState(true);
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [formData, setFormData] = React.useState({
        cep_endereco: '',
        numero_endereco: '',
        rua_endereco: '',
        bairro_endereco: '',
        cidade_endereco: '',
        descricao_endereco: '',
        uf_endereco: '',
    });

    const handleSubmit = async () => {
        const usuarioEndereco: IUserAddress = {
            cep_endereco: formData.cep_endereco,
            numero_endereco: formData.numero_endereco,
            rua_endereco: formData.rua_endereco,
            bairro_endereco: formData.bairro_endereco,
            cidade_endereco: formData.cidade_endereco,
            descricao_endereco: formData.descricao_endereco,
            uf_endereco: formData.uf_endereco,
            // data_nasc_usuario: nascimento?.startOf('day').toISOString().split('T')[0] ?? '',
        };

        try {
            await postUsuarioEndereco(user?.id_usuario!, usuarioEndereco);
        } catch (err) {
            console.error('Erro ao criar usuário:', err);
        }
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h1>Adicione seu endereço</h1>
                    <TextField
                        id="cep_endereco"
                        label="CEP"
                        variant="outlined"
                        value={formData.cep_endereco}
                        onChange={(e) => setFormData({ ...formData, cep_endereco: e.target.value })}
                    />
                    <TextField
                        id="rua_endereco"
                        label="Rua"
                        variant="outlined"
                        value={formData.rua_endereco}
                        onChange={(e) => setFormData({ ...formData, rua_endereco: e.target.value })}
                    />
                    <TextField
                        id="numero_endereco"
                        label="Número"
                        variant="outlined"
                        value={formData.numero_endereco}
                        onChange={(e) => setFormData({ ...formData, numero_endereco: e.target.value })}
                    />
                    <TextField
                        id="bairro_endereco"
                        label="Bairro"
                        variant="outlined"
                        value={formData.bairro_endereco}
                        onChange={(e) => setFormData({ ...formData, bairro_endereco: e.target.value })}
                    />
                    <TextField
                        id="cidade_endereco"
                        label="Cidade"
                        variant="outlined"
                        value={formData.cidade_endereco}
                        onChange={(e) => setFormData({ ...formData, cidade_endereco: e.target.value })}
                    />
                    <TextField
                        id="uf_endereco"
                        label="UF"
                        variant="outlined"
                        value={formData.uf_endereco}
                        onChange={(e) => setFormData({ ...formData, uf_endereco: e.target.value })}
                    />
                    <Button variant="contained" sx={{
                        backgroundColor: "var(--primary-color)", boxShadow: 'none',
                        textTransform: "none"
                    }
                    } onClick={handleClose}>Cancelar</Button>
                    <Button variant="contained" sx={{
                        backgroundColor: "var(--primary-color)", boxShadow: 'none',
                        textTransform: "none"
                    }
                    } >Salvar</Button>
                </Box>
            </Modal>
        </div>
    );
}
