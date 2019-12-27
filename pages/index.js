import fetch from 'isomorphic-unfetch'

import House from '../components/House';
import Layout from '../components/Layout';

const Content = ({
  houses,
}) => (
  <div>
    <h2>Places to stay</h2>
    <div className='houses'>
      {houses.map((house, index) => {
          return (
             <House key={house.id} {...house} /> 
          )
      })}
    </div>
    <style jsx>{`
        .houses {
            display: grid;
            grid-template-columns: 50% 50%;
            grid-template-rows: 300px 300px;
            grid-gap: 40px;
        }
        `}</style>
  </div>
)

const Index = ({
  houses
}) => (
  <Layout>
      <Content houses={houses} />
  </Layout>
);

Index.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/houses');
  const houses = await res.json();

  return { 
    houses,
  }
}

export default Index