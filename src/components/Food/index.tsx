import { FiEdit3, FiTrash } from "react-icons/fi";
import { useState } from "react";
import { Container } from "./styles";
import { FoodProps } from "../../types";
import { useFoods } from "../../contexts/FoodContext";
export default function Food({
  food,
  handleEditFood,
  handleDelete,
}: FoodProps) {
  const { toggleAvailable } = useFoods();
  const { available } = food;
  const [isAvailable, setIsAvailable] = useState(available);

  const handleToogleAvailable = () => {
    const isAvailable = toggleAvailable(food.id);
    setIsAvailable(isAvailable);
  };

  const setEditingFood = () => {
    handleEditFood(food);
  };
  return (
    <Container available={isAvailable}>
      <header>
        <img src={food.image} alt={food.name} />
      </header>
      <section className="body">
        <h2>{food.name}</h2>
        <p>{food.description}</p>
        <p className="price">
          R$ <b>{food.price}</b>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={setEditingFood}
            data-testid={`edit-food-${food.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(food.id)}
            data-testid={`remove-food-${food.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{isAvailable ? "Disponível" : "Indisponível"}</p>

          <label htmlFor={`available-switch-${food.id}`} className="switch">
            <input
              id={`available-switch-${food.id}`}
              type="checkbox"
              checked={isAvailable}
              onChange={handleToogleAvailable}
              data-testid={`change-status-food-${food.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  );
}
