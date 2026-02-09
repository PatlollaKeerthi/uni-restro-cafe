import './index.css'

const DishItem = ({dish, count, incrementBtn, decrementBtn}) => {
  const hasCostamization = dish.addonCat.length > 0
  const dishType = dish.dish_Type === 2 ? 'veg' : 'non-veg'
  return (
    <li>
      <div className="dish-content">
        <div className="dish-Title">
          <span className={`indicator ${dishType}`}>
            <span className="indicator-dot" />
          </span>
          <div className="left-content-dish">
            <h3>{dish.dish_name}</h3>
            <div className="dish-price">
              <p>
                {dish.dish_currency} {dish.dish_price}
              </p>
            </div>
            <p className="dish-desc">{dish.dish_description}</p>
            {dish.dish_Availability ? (
              <div className="incr-btn">
                <button onClick={() => decrementBtn(dish.dish_id)}>-</button>
                <p>{count}</p>
                <button onClick={() => incrementBtn(dish.dish_id)}>+</button>
              </div>
            ) : (
              <p className="not-available">Not Available</p>
            )}
            {hasCostamization && (
              <p className="custom">Customizations Available</p>
            )}
          </div>
        </div>
        <p className="dish-calories">{dish.dish_calories} calories</p>
        <img src={dish.dish_image} className="dish-img" />
      </div>
    </li>
  )
}
export default DishItem
