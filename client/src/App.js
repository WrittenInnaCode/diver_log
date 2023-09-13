import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

import './App.css';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dive from './pages/Dive';
import NewDive from './pages/NewDive';
import SingleDive from './pages/SingleDive';
import Profile from './pages/Profile';
import BucketList from './pages/BucketList';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
        <Container fluid>
          <Row>
            <Col sm={4}>
              <Navbar />
            </Col>
            
            <Col sm={8}>
              <Routes>
                <Route
                  path="/"
                  element={<Home />}
                />
                <Route
                  path="/me"
                  element={<Profile />}
                />
                <Route
                  path="/profiles/:username"
                  element={<Profile />}
                />
                <Route
                  path="/dives"
                  element={<Dive />}
                />
                <Route
                  path="/newdivelog"
                  element={<NewDive />}
                />
                <Route
                  path="/dives/:diveId"
                  element={<SingleDive />}
                />
                <Route
                  path="/bucketlist"
                  element={<BucketList />}
                />
                <Route
                  path='*'
                  element={<h1>Wrong page!</h1>}
                />
              </Routes>
            </Col>
          </Row>
          </Container>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
