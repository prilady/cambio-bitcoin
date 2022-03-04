import React from "react";
import { render } from "react-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  useQuery
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://t9xt21.sse.codesandbox.io/graphql",
  cache: new InMemoryCache()
});

client
  .query({
    query: gql`
    query BitcoinValue {
      bitcoinValue {
        time {
            updated
        }
        bpi {
            USD {
                rate
            }
        }
      }
    }
    `
  }).then(result => console.log(result));

  const EXCHANGE_RATES = gql`
  query BitcoinValue {
    bitcoinValue {
      time {
          updated
      }
      bpi {
          USD {
              rate
          }
      }
    }
  }
`;

function ExchangeRates() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <p>
        {data.bitcoinValue.bpi.USD.rate} - {data.bitcoinValue.time.updated}
      </p>
    </div>
  );
  
}

  function App() {
    return (
      <div>
        <h2>Bitcoin USD rate and time: 🚀</h2>
         <ExchangeRates /> 
      </div>
    );
  }
  
  render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    document.getElementById('root'),
  );