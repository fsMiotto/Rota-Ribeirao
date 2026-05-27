import { Component } from 'react'
import './NavbarStyles.css'
import { MenuItems } from './MenuItems'
import { Link } from 'react-router-dom'

class Navbar extends Component {
  state = { clicked: false }

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked })
  }

  render() {
    return (
      <nav className='NavbarItems'>
        <h1 className='navbar-logo'>Rota Ribeir&#227;o</h1>

        <div className='menu-icon' onClick={this.handleClick}>
          <i className={this.state.clicked ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'}></i>
        </div>

        <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
          {MenuItems.map((item, index) => {
            return (
              <li key={index}>
                <Link to={item.url} className={item.className}>
                  <i className={item.icon}></i> {item.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    )
  }
}

export default Navbar
