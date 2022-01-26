import React, { Component } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import DisplayAllBlogs from './DisplayAllBlogs';
import DisplayUsers from './DisplayUsers'
import { getData } from './getData.js'
import DisplayUserBlogs from './DisplayUserBlogs'
import DisplayArticle from './DisplayArticle';
export default class App extends Component {

  state = {
    users: []
  }
  async getDataForApp() {
    const users = await getData('users');
    const usersArr = users.map(user => ({ id: user.id, name: user.name, website: user.website, companyInfo: user.company }));

    this.setState({
      users: usersArr
    });
  }

  componentDidMount() {
    this.getDataForApp();
  }


  render() {
    const user = this.state.users.map(user => <DisplayUsers key={user.name} user={user}  />)
    return (<>
      <div id='center'>
        <div id='allUsersDisplay'>
          <span>{this.state.users.length > 1 ? 'Ours Users:' : 'User'}</span>
          {user}


        </div>
        <Routes>
          <Route index element={<DisplayAllBlogs  />} />
          <Route path={`/:userName`} element={<DisplayUserBlogs />} />
          <Route path={`/blog/:id`} element={<DisplayArticle />} />
          <Route path='*' element={<Navigate to='/' replace='true' />} />
        </Routes>
        <Outlet /></div>
      <a href="/" id="back">Back</a>
    </>
    )
  }
}
