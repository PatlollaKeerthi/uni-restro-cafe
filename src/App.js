import {Component} from 'react'
import Header from './components/Header'
import CategoryTabs from './components/CategoryTabs'
import DishList from './components/DishList'
import './App.css'

// write your code here
const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
class App extends Component {
  state = {
    menuData: [],
    activeCategoryId: '',
    cartItems: {},
    cartCount: 0,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getMenuData()
  }

  getMenuData = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const response = await fetch(
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
    )
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      this.setState({
        restautantName: data[0].restaurant_name,
        menuData: data[0].table_menu_list,
        activeCategoryId: data[0].table_menu_list[0].menu_category_id,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  incrementBtn = dishId => {
    this.setState(prevState => {
      const count = prevState.cartItems[dishId] || 0
      return {
        cartItems: {...prevState.cartItems, [dishId]: count + 1},
        cartCount: prevState.cartCount + 1,
      }
    })
  }

  decrementBtn = dishId => {
    this.setState(prevState => {
      if (!prevState.cartItems[dishId]) {
        return null
      }
      return {
        cartItems: {
          ...prevState.cartItems,
          [dishId]: prevState.cartItems[dishId] - 1,
        },
        cartCount: prevState.cartCount - 1,
      }
    })
  }

  getActiveDishes = () => {
    const {menuData, activeCategoryId, cartItems, cartCount} = this.state
    const activeCategory = menuData.find(
      each => each.menu_category_id === activeCategoryId,
    )
    return activeCategory ? activeCategory.category_dishes : []
  }

  changeTab = id => {
    this.setState({activeCategoryId: id})
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <p>Loading...</p>
    </div>
  )

  renderFailureView = () => (
    <div className="error-container">
      <p>Something went wrong. Please try again.</p>
    </div>
  )

  renderSuccessView = () => {
    const {
      restautantName, 
      menuData, 
      activeCategoryId, 
      cartItems, 
      cartCount,
    } =
      this.state
    const dishes = this.getActiveDishes()
    return (
      <div>
        <Header restautantName={restautantName} cartCount={cartCount} />
        <CategoryTabs
          menuData={menuData}
          activeCategoryId={activeCategoryId}
          changeTab={this.changeTab}
        />
        <DishList
          dishes={dishes}
          cartItems={cartItems}
          incrementBtn={this.incrementBtn}
          decrementBtn={this.decrementBtn}
        />
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.loading:
        return this.renderLoadingView()

      case apiStatusConstants.success:
        return this.renderSuccessView()

      case apiStatusConstants.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }
}

export default App
