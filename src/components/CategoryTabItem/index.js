import './index.css'

const CategoryTabItem = ({category, isActive, changeTab}) => (
  <button
    type="button"
    className={isActive ? 'active-tab' : 'tab'}
    onClick={() => changeTab(category.menu_category_id)}
  >
    {category.menu_category}
  </button>
)
export default CategoryTabItem
