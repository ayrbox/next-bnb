import { useState } from 'react';
import Head from 'next/head';
import { useStoreActions, useStoreState } from 'easy-peasy';
import fetch from 'isomorphic-unfetch';

import Layout from '../../components/Layout';
import DateRangePicker from '../../components/DateRangePicker'
import axios from 'axios';


const calcNumberOfNightsBetweenDates = (startDate, endDate) => {
  const start = new Date(startDate) //clone
  const end = new Date(endDate) //clone
  let dayCount = 0

  while(end > start) {
    dayCount++
    start.setDate(start.getDate() + 1)
  }

  return dayCount
}

const getBookedDates = async(houseId) => {
  try {
    const res = await axios.post('http://localhost:3000/api/houses/booked', { houseId });
    if (res.data.status === 'error') {
      alert(res.data.message);
      return;
    }
    return res.data.dates;
  } catch(error) {
    console.error(error);
    return;
  }
};

const canReserve = async (houseId, startDate, endDate) => {
  try {
    const res = await axios.post('http://localhost:3000/api/houses/check', {
      houseId,
      startDate,
      endDate,
    });

    if (res.data.status === 'error') {
      alert(res.data.message);
      return;
    }

    if (res.data.message === 'busy') return false;
    return true;
  } catch(error) {
    console.error(error);
    return;
  }
}

const House = (props) => {
  const setShowLoginModal = useStoreActions(
    actions => actions.modals.setShowLoginModal
  );

  const [dateChosen, setDateChosen] = useState(false);
  const [numberOfNightsBetweenDates, setNumberOfNightsBetweenDates] = useState(0)

  const user = useStoreState(state => state.user.user);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();


  const handleReserve = async (e) => {
    e.preventDefault();
    try {
      if (!(await canReserve(props.house.id, startDate, endDate))) {
        alert('The date chosen are not valid');
        return;
      }

      const res = await axios.post('/api/houses/reserve', {
        houseId: props.house.id,
        startDate,
        endDate,
      });

      if(res.data.status === 'error') {
        alert(res.data.message);
        return;
      }

      console.log(res.data);

    } catch (error) {
      console.log(error);
      return;
    }
  }


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
            {props.house.reviewsCount && (
              <div className="reviews">
                <h3>{props.house.reviewsCount} Reviews</h3>

                {props.house.reviews.map((review, index) => {
                  return (
                    <div key={index}>
                      <p>{new Date(review.createdAt).toDateString()}</p>
                      <p>{review.comment}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </article>
          <aside>
            <h2>Add dates for prices</h2>
            <DateRangePicker datesChanged={(startDate, endDate) => {
              console.log(startDate, endDate);
              setNumberOfNightsBetweenDates(
                calcNumberOfNightsBetweenDates(startDate, endDate)
              )
              setDateChosen(true);
              setStartDate(startDate);
              setEndDate(endDate);
            }}
            bookedDates={props.bookedDates} />
            {dateChosen && (
              <div>
                <h2>Price per night</h2>
                <p>${props.house.price}</p>
                <h2>Total price for booking</h2>
                <p>
                  ${(numberOfNightsBetweenDates * props.house.price).toFixed(2)}
                </p>
                {user ? (
                  <button
                    className="reserve"
                    onClick={handleReserve}
                  >
                    Reserve
                  </button>
                ): (
                  <button
                    className="reserve"
                    onClick={setShowLoginModal}
                  >
                    Log in to reserve
                  </button>
                )}
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
            button {
              background-color: rgb(255, 90, 95);
              color: white;
              font-size: 13px;
              width: 100%;
              border: none;
              height: 40px;
              border-radius: 4px;
              cursor: pointer;
            }
          `}</style>
        </div>
    </Layout>
  )
};

export default House;

House.getInitialProps = async ({ query }) => {
    const { id } = query;
    const res = await fetch(`http://localhost:3000/api/houses/${id}`);
    const house = await res.json();

    const bookedDates = await getBookedDates(id);

    return {
        house,
        bookedDates,
    };
}
