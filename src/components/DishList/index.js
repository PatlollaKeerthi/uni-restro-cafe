import DishItem from '../DishItem'
import './index.css'

const DishList = ({dishes, cartItems, incrementBtn, decrementBtn}) => (
  <ul className="dish-container">
    {dishes.map(eachdish => (
      <DishItem
        key={eachdish.dish_id}
        dish={eachdish}
        count={cartItems[eachdish.dish_id] || 0}
        incrementBtn={incrementBtn}
        decrementBtn={decrementBtn}
      />
    ))}
  </ul>
)
export default DishList
