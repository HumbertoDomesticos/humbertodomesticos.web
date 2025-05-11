import { Button } from "@mui/material";
import { FooterComponent } from "../components/footer-component";
import { HeaderComponent } from "../components/header-component";

export default function Perfil() {
    return (
        <>
            <HeaderComponent />

            <div>
                <div>
                    <p>User123</p>
                    <span>Editar</span>
                </div>
                <div>
                    <p>Minha conta</p>
                    <p>Minhas compras</p>
                </div>
            </div>

            <div>
                <h1>Meu perfil</h1>
                <p>Altere seus dados</p>

                <div>
                    <p>Nome de usuário</p>
                    <p>Nome</p>
                    <p>E-mail</p>
                    <p>Telefone</p>
                    <p>Sexo</p>
                    <p>CPF</p>
                </div>

                <div>
                <Button variant="contained" href="/" sx={{
                        backgroundColor: "var(--secondary-color)", boxShadow: 'none',
                        textTransform: "none"
                    }}>Selecionar foto</Button>
                    <p>Tamanho do arquivo: no máximo 1 MB
                    Extensão de arquivo: .JPEG, .PNG</p>
                </div>

                <Button variant="contained" href="/" sx={{
                        backgroundColor: "var(--primary-color)", boxShadow: 'none',
                        textTransform: "none"
                    }}>Salvar</Button>
            </div>
            <FooterComponent />
        </>
    )
}