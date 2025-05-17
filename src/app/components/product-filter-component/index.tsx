import { Radio, Square, Truck } from "@phosphor-icons/react"
import styles from "./styles.module.scss"
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Checkbox } from "@mui/material"
import { useEffect, useState } from "react";
import { getProduto, Produto } from "@/services/routes/produtos/page";
import { type Categoria, getCategoria } from "@/services/routes/categorias/page";

export function ProductFilter() {
    const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<number[]>([]);
    const [marcasSelecionadas, setMarcasSelecionadas] = useState<string[]>([]);


    const handleChangeCategoria = (event: React.ChangeEvent<HTMLInputElement>, idCategoria: number) => {
        if (event.target.checked) {
            setCategoriasSelecionadas((prev) => [...prev, idCategoria]);
        } else {
            setCategoriasSelecionadas((prev) => prev.filter((id) => id !== idCategoria));
        }
    };

    const handleChangeMarca = (event: React.ChangeEvent<HTMLInputElement>) => {
        const marca = event.target.value;
        if (event.target.checked) {
            setMarcasSelecionadas((prev) => [...prev, marca]);
        } else {
            setMarcasSelecionadas((prev) => prev.filter((m) => m !== marca));
        }
    };
    const [categorias, setCategorias] = useState<Categoria[]>([]);

    useEffect(() => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        getCategoria().then((resp: any) => {
            setCategorias(resp);
        }).catch((err) => {
            console.log(err);
        })
    }, []);




    return (
        <>
            <div className={styles.bar}>
                <div className={styles.content}>
                    <h2>Filtros</h2>
                    <div className={styles.newSection}>
                        <Truck size={18} />
                        <p>Frete grátis</p>
                    </div>
                    <div>
                        <FormControl>
                            <FormLabel className={styles.title}>Categoria</FormLabel>
                            {categorias.map((categoria) => (
                                <>
                                    <FormControlLabel key={categoria.id_categoria} value={categoria.descritivo_categoria} sx={{ marginLeft: 1 }} control={<Checkbox
                                        size="small"
                                        checked={categoriasSelecionadas.includes(categoria.id_categoria)}
                                        onChange={(e) => handleChangeCategoria(e, categoria.id_categoria)} />

                                    } label={categoria.descritivo_categoria} />
                                </>
                            ))}
                        </FormControl>

                    </div>
                    <div>
                        <FormControl>
                            <FormLabel className={styles.title}>Marca</FormLabel>

                            {["Brastemp", "Electrolux", "LG", "Samsung", "Consul", "Philco"].map((marca) => (
                                <FormControlLabel
                                    key={marca}
                                    value={marca}
                                    sx={{ marginLeft: 1 }}
                                    control={
                                        <Checkbox
                                            size="small"
                                            checked={marcasSelecionadas.includes(marca)}
                                            onChange={handleChangeMarca}
                                        />
                                    }
                                    label={marca}
                                />
                            ))}

                        </FormControl>
                    </div>
                </div>
            </div>
        </>
    )
}