import React from 'react'
import Hero from '../../components/sections/hero'
import { Marquee } from '../../components/common/Marquee'
import  {Toolskills}  from '../../components/sections/Toolskills'
import { Projects } from '../../components/sections/Projects'

export const Mainpage = () => {
  return (
    <div className="flex flex-col items-center">
        <Hero />
        <Marquee />
        <Toolskills />
        <div id="gap" className='h-[30vh]'/>
        <Projects />
    </div>
  )
}
