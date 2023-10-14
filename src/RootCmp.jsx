import { Routes, Route } from 'react-router'

import { AppHeader } from './cmps/AppHeader'
import { HomePage } from './pages/HomePage'
import { ApplicantIndex } from './pages/ApplicantIndex'
import { StayIndex} from './pages/StayIndex'

export function RootCmp() {
  return (
    <main>
      <AppHeader />
      <section className='main-container'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/stay' element={<StayIndex />} />
          <Route path='/stay/:stayId' element={<ApplicantIndex />} />
        </Routes>
      </section>
    </main>
  )
}
