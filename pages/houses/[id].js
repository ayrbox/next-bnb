import { useState } from 'react';
import Head from 'next/head';
import houses from '../houses.json'
import Layout from '../../components/Layout';
import DateRangePicker from '../../components/DateRangePicker'

const House = (props) => {
  const [dateChosen, setDateChosen] = useState(false);
  
  return (
    <Layout>
        <div className="container">
          <Head>
              <title>{props.house.title}</title>
          </Head>
          <article>
            <img src={props.house.picture} width='100%' alt='House picture' />
            <p>
              {props.house.type} - {props.house.town}
            </p>
            <p>{props.house.title}</p>
            <p>
              {props.house.rating} ({props.house.reviewsCount})
            </p>
          </article>
          <aside>
            <h2>Add dates for prices</h2>
            <DateRangePicker datesChanged={(startDate, endDate) => {
              console.log(startDate, endDate);
              setDateChosen(true);
            }} />
            {dateChosen && (
              <div>
                <h2>Price per night</h2>
                <p>{`${props.house.price}`}</p>
              </div>
            )}
          </aside>
          <style jsx>{`
            .container {
              display: grid;
              grid-template-columns: 60% 40%;
              grid-gap: 30px;
            }

            aside {
              border: 1px solid #ccc;
              padding: 20px;
            }
          `}</style>
        </div>
    </Layout>
  )
};

export default House;

House.getInitialProps = ({ query }) => {
    const { id } = query;
    return {
        house: houses.find(house => house.id === id),
    };
}
