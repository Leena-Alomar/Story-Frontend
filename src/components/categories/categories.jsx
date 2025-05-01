import "./styles.css";



export default function Categories({ category }) {

    return (
        <div className="category-index-card">
                <div className="category-index-card-content">
                    <h2>{category.category_type}</h2>
                </div>
        </div>
    )
}