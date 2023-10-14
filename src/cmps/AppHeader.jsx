import { NavLink } from 'react-router-dom'

export const AppHeader = () => {
    return (
      <header className='app-header'>
        <nav>
          <NavLink to={'/'}>HomePage</NavLink>
          <NavLink to={'/applicant'}>Applicant</NavLink>
        </nav>
      </header>
    )
  }