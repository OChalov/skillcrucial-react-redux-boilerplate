import React from 'react'
import { Link, useParams } from 'react-router-dom'

const Header = () => {
  const { username, repository } = useParams()

  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-900 p-5 text-white font-bold">
      <div id="repository-name">{repository || username || 'Welcome, Github User!'}</div>
      <div className="flex" justify-end>
        {username && (
          <Link to="/" id="go-back" className="mr-5">
            Go Home
          </Link>
        )}
        {repository && (
          <Link to={`/${username}`} id="go-repository-list">
            Go Repositories
          </Link>
        )}
      </div>
    </nav>
  )
}

Header.propTypes = {}

export default React.memo(Header)
