import CategoryTabItem from '../CategoryTabItem'
import './index.css'

const CategoryTabs = ({menuData, activeCategoryId, changeTab}) => (
  <div className="tab-container">
    {menuData.map(each => (
      <CategoryTabItem
        key={each.menu_category_id}
        category={each}
        isActive={each.menu_category_id === activeCategoryId}
        changeTab={changeTab}
      />
    ))}
  </div>
)
export default CategoryTabs
