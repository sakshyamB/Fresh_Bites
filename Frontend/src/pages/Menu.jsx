import React from 'react'
import { useState } from 'react'
const Menu = () => {
    const [Menu, setMenu] = useState([])
    const [error, seterror] = useState(null)
    const [Loading, setLoading] = useState(true)
  return (
    <div>
      Here is the menu.
    </div>
  )
}

export default Menu
