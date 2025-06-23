import Image from "next/image";
import styles from "./styles.module.scss";

export const categoriesList = [
    {
        id: 0,
        category: "Geladeiras",
        image: "/categories/geladeiras.png"
    },
    {
        id: 1,
        category: "Cafeteiras",
        image: "/categories/cafeteiras.png"
    },
    {
        id: 2,
        category: "Microondas",
        image: "/categories/microondas.png"
    },
    {
        id: 3,
        category: "Fritadeiras",
        image: "/categories/fritadeiras.png"
    },
    {
        id: 4,
        category: "Fornos",
        image: "/categories/fornos.png"
    },
    {
        id: 5,
        category: "Fogões",
        image: "/categories/fogao.png"
    },
    {
        id: 6,
        category: "Máquinas de lavar",
        image: "/categories/maquina_lavar.png"
    },
    {
        id: 7,
        category: "Máquinas de café",
        image: "/categories/maquina_cafe.png"
    },
]

interface CategoriesProps{
    category: string,
    image: string;
}

export function Categories({category, image} : CategoriesProps){
    return(
        <div className={`${styles.content} container_info`} id="categorias">
            <div className={styles.cardCategories}>
                <Image src={image} alt={category} width={100} height={100}/>
                <h3>{category}</h3>
            </div>
        </div>
    )
}