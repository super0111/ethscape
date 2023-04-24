import { useEffect, useContext, useState, useRef } from 'react';
import { Switch, Redirect, Route, useRouteMatch, useHistory } from 'react-router-dom';

import { StoreContext } from 'store/Store';

import { Strings } from 'support/Constants';

import { Section } from 'components/Section';
import Breadcrumbs from 'components/Breadcrumbs';
import SortNav from 'components/SortNav';
import Errorer from 'components/Errorer';

import Results from './Results';

import { useForm } from 'hooks/useForm';

const Search = () => {
  const { lang } = useContext(StoreContext)
  const { path } = useRouteMatch()
  const [type, setType] = useState('threads')
  const searchField = useRef()
  const history = useHistory()
  const [searchActive, setSearchActive] = useState(false)

  useEffect(() => {
    if (searchActive) {
      searchField.current?.focus()
      document.addEventListener('click', handleClickOutside)
    }
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [searchActive])

  const handleClickOutside = ({ target }) => {
    if (searchField.current?.contains(target)) return

    setSearchActive(false)
  }

  const formCallback = () => {
    history.push('/search/' + values.query)
  }

  const { onChange, onSubmit, values } = useForm(formCallback, {
    query: ''
  })

  return (
    <Section>
      <Breadcrumbs current={Strings.search[lang]} links={[
        { title: Strings.home[lang], link: '/' },
        { title: Strings.forum[lang], link: '/forum' },
      ]} />

      <SortNav links={[
        { title: Strings.threads[lang], sort: 'threads' },
        { title: Strings.answers[lang], sort: 'answers' },
        { title: Strings.boards[lang], sort: 'boards' },
        { title: Strings.users[lang], sort: 'users' }
      ]} setSort={setType} state={type} />

    <li className='head_search'>
        <i className="head_search_ic bx bx-search" onClick={() => setSearchActive(!searchActive)} />
        <form className="head_search_form" onSubmit={onSubmit}>
          <input
            ref={searchField}
            className="head_search_field"
            type="search"
            name="query"
            value={values.query}
            placeholder={Strings.enterForSearch[lang] + '...'}
            onChange={onChange}
          />
        </form> 
      </li>

      <Switch>
        <Route path={path + '/:searchQuery'}>
          <Results lang={lang} type={type} />
        </Route>
        <Route path={path} exact>
          <Errorer message={Strings.enterYourSearchTerm[lang]} />
        </Route>
        <Route>
          <Redirect to={path} />
        </Route>
      </Switch>
    </Section>
  )
}

export default Search;
