import { Radio, Square, Truck } from "@phosphor-icons/react"
import styles from "./styles.module.scss"
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Checkbox } from "@mui/material"
import { useState } from "react";
import React from "react";

export function ProductFilter() {
    const [checked, setChecked] = React.useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };
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

                            <FormControlLabel value="female" sx={{marginLeft: 1}} control={<Checkbox
                                size="small"
                                checked={checked}
                                onChange={handleChange} />

                            } label="Male" />

                            <FormControlLabel value="male" sx={{marginLeft: 1}} control={<Checkbox
                                size="small"
                                checked={checked}
                                onChange={handleChange} />

                            } label="Male" />
                            <FormControlLabel value="female" sx={{marginLeft: 1}} control={<Checkbox
                                size="small"
                                checked={checked}
                                onChange={handleChange} />

                            } label="Female" />
                            <FormControlLabel value="male"  sx={{marginLeft: 1}}control={<Checkbox
                                size="small"
                                checked={checked}
                                onChange={handleChange} />

                            } label="Male" />
                            <FormControlLabel value="female" sx={{marginLeft: 1}} control={<Checkbox
                                size="small"
                                checked={checked}
                                onChange={handleChange} />

                            } label="Female" />
                            <FormControlLabel value="male"  sx={{marginLeft: 1}}control={<Checkbox
                                size="small"
                                checked={checked}
                                onChange={handleChange} />

                            } label="Male" />
                        </FormControl>
                    </div>
                    <div>
                        <FormControl>
                            <FormLabel className={styles.title}>Marca</FormLabel>

                            <FormControlLabel value="female" sx={{marginLeft: 1}} control={<Checkbox
                                size="small"
                                checked={checked}
                                onChange={handleChange} />

                            } label="Female" />
                            <FormControlLabel value="male"  sx={{marginLeft: 1}}control={<Checkbox
                                size="small"
                                checked={checked}
                                onChange={handleChange} />

                            } label="Male" />
                            <FormControlLabel value="other" sx={{marginLeft: 1}} control={<Checkbox
                                size="small"
                                checked={checked}
                                onChange={handleChange} />

                            } label="Other" />
                            <FormControlLabel value="female" sx={{marginLeft: 1}} control={<Checkbox
                                size="small"
                                checked={checked}
                                onChange={handleChange} />

                            } label="Female" />
                            <FormControlLabel value="male"  sx={{marginLeft: 1}}control={<Checkbox
                                size="small"
                                checked={checked}
                                onChange={handleChange} />

                            } label="Male" />
                            <FormControlLabel value="other" sx={{marginLeft: 1}} control={<Checkbox
                                size="small"
                                checked={checked}
                                onChange={handleChange} />

                            } label="Other" />
                        </FormControl>
                    </div>
                    <div>
                        <FormControl>
                            <FormLabel className={styles.title}>Entrega</FormLabel>

                            <FormControlLabel value="female" sx={{marginLeft: 1}} control={<Checkbox
                                size="small"
                                checked={checked}
                                onChange={handleChange} />

                            } label="Female" />
                            <FormControlLabel value="male"  sx={{marginLeft: 1}}control={<Checkbox
                                size="small"
                                checked={checked}
                                onChange={handleChange} />

                            } label="Male" />
                            <FormControlLabel value="other" sx={{marginLeft: 1}} control={<Checkbox
                                size="small"
                                checked={checked}
                                onChange={handleChange} />

                            } label="Other" />
                            <FormControlLabel value="female" sx={{marginLeft: 1}} control={<Checkbox
                                size="small"
                                checked={checked}
                                onChange={handleChange} />

                            } label="Female" />
                            <FormControlLabel value="male"  sx={{marginLeft: 1}}control={<Checkbox
                                size="small"
                                checked={checked}
                                onChange={handleChange} />

                            } label="Male" />
                            <FormControlLabel value="other" sx={{marginLeft: 1}} control={<Checkbox
                                size="small"
                                checked={checked}
                                onChange={handleChange} />

                            } label="Other" />
                        </FormControl>
                    </div>
                </div>


            </div>
        </>
    )
}