import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Store from 'store/Store';

import Layout from 'components/Layout';
import { GeneralRoute, AuthRoute, UsersOnlyRoute, AdminsOnlyRoute } from 'components/ProtectedRoute';

import Home from 'routes/Home';
import TopBoards from 'routes/TopBoards';
import SignUp from 'routes/Auth/SignUp';
import SignIn from 'routes/Auth/SignIn';
import Search from 'routes/Search';
import Boards from 'routes/Forum/Boards';
import Board from 'routes/Forum/Board';
import Thread from 'routes/Forum/Thread';
import Admins from 'routes/Users/Admins';
import Rules from 'routes/Rules';
import User from 'routes/User';
import Banned from 'routes/Banned';
import Dashboard from 'routes/Dashboard';
import Messages from 'routes/Messages';
import Nfts from 'routes/Nfts';
import Merch from 'routes/Merch';
import GameStore from 'routes/GameStore';
import { NotFound } from 'routes/Error';

const App = () => {
  useEffect(() => {
    if (localStorage.getItem('theme') === 'light') {
      document.body.classList.add('light')
      document.querySelector('meta[name="theme-color"]').setAttribute('content', '#eef0f1')
      document.querySelector('meta[name="color-scheme"]').setAttribute('content', 'light dark')
    }
  }, [])

  return (
    <Store>
      <Router>
        <Layout>
          <Switch>
            <GeneralRoute exact path="/" component={Home} />
            <GeneralRoute exact path="/forum" component={TopBoards} />
            <AuthRoute path="/signup" component={SignUp} />
            <AuthRoute path="/signin" component={SignIn} />
            <GeneralRoute path="/search" component={Search} />
            <GeneralRoute exact path="/boards" component={Boards} />
            <GeneralRoute path="/boards/:boardName" component={Board} />
            <GeneralRoute path="/thread/:threadId" component={Thread} />
            {/* <GeneralRoute path="/users" component={Users} /> */}
            <UsersOnlyRoute path="/user/:userName" component={User} />
            <GeneralRoute path="/admins" component={Admins} />
            <GeneralRoute path="/rules" component={Rules} />
            <AdminsOnlyRoute path="/dashboard" component={Dashboard} />
            <UsersOnlyRoute path="/messages" component={Messages} />
            <GeneralRoute path="/nfts" component={Nfts} />
            <GeneralRoute path="/store" component={GameStore} />
            <GeneralRoute path="/merch" component={Merch} />
            <Route path="/banned" component={Banned} />
            <Route path="*" component={NotFound} status={404} />
            {/* test */}
          </Switch>
        </Layout>
      </Router>

      <ToastContainer position="bottom-right" autoClose={2000} pauseOnFocusLoss={false} />
    </Store>
  )
}

export default App;
