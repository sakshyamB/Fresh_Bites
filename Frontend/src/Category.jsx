import React from 'react'
import { CgMenuGridR } from "react-icons/cg";
import { MdOutlineFreeBreakfast } from "react-icons/md";
import { FaBowlFood } from "react-icons/fa6";
import { LuCakeSlice } from "react-icons/lu";
import { LuSoup } from "react-icons/lu";
import { RiDrinks2Line } from "react-icons/ri";
import { LuLeafyGreen } from "react-icons/lu";
const Categories = [{
    id: 1,
    name: "All",
    icon: <CgMenuGridR className='w-10 h-10 md:w-15 md:h-15 text-red-300'/>
},
{
    id: 2,
    name: "Breakfast",
    icon: <MdOutlineFreeBreakfast className='w-10 h-10 md:w-15 md:h-15 text-red-300'/>
},
{
    id: 3,
    name: "Main",
    icon: <FaBowlFood className='w-10 h-10 md:w-15 md:h-15 text-red-300'/>
},
{
    id: 4,
    name: "Dessert",
    icon: <LuCakeSlice  className='w-10 h-10 md:w-15 md:h-15 text-red-300'/>
},
{
    id: 5,
    name: "Soup",
    icon: <LuSoup className='w-10 h-10 md:w-15 md:h-15 text-red-300'/>
},
{
    id: 6,
    name: "Drinks",
    icon: <RiDrinks2Line  className='w-10 h-10 md:w-15 md:h-15 text-red-300'/>
},
{
    id: 7,
    name: "Salads",
    icon: <LuLeafyGreen className='w-10 h-10 md:w-15 md:h-15 text-red-300'/>
}]

export default Categories