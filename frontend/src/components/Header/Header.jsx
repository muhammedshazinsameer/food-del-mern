import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className="header">
        <div className="header-contents">
            <h2>Order your favourite food from here</h2>
            <p>Discover a world of flavor right at your fingertips. From comforting classics to exciting new cuisines, we make it simple to explore, order, and enjoy your favorite meals — all without leaving home. Fast delivery, fresh ingredients, and unbeatable taste, every time.</p>
            <a href="#explore-menu" className="view-menu-link">View Menu</a>
        </div>
    </div>
  )
}

export default Header