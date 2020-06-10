import React, { useState, useEffect } from 'react'
import { Switch, Route, useParams } from 'react-router-dom'
import axios from 'axios'

import Head from './head'
import Main from './main'
import Repos from './repos'
import Readme from './readme'
import Header from './header'

const Home = () => {
  const { username, repository } = useParams()
  const url = `https://api.github.com/users/${username}/repos`
  const urlReadMe = `https://api.github.com/repos/${username}/${repository}/readme`
  const [repositoriesList, setRepos] = useState([])

  useEffect(() => {
    if (typeof username !== 'undefined') {
      axios.get(url).then((it) => {
        setRepos(it.data.map((repo) => ({ name: repo.name, id: repo.id })))
      })
    }
  }, [url, username])

  const [readme, setReadMe] = useState('')

  useEffect(() => {
    if (typeof username !== 'undefined' && typeof repository !== 'undefined') {
      axios.get(urlReadMe).then(({ data }) => {
        axios(data.download_url).then(({ data: text }) => {
          setReadMe(text)
        })
      })
    }
  }, [urlReadMe, username, repository])

  return (
    <div>
      <Head title="Home" />
      <Header />
      <Switch>
        <Route exact path="/" component={() => <Main />} />
        <Route exact path="/:username" component={() => <Repos repos={repositoriesList} />} />
        <Route exact path="/:username/:repository" component={() => <Readme readme={readme} />} />
      </Switch>
    </div>
  )
}

Home.propTypes = {}

export default Home
