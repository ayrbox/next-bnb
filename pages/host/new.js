import { useState } from "react";
import Head from "next/head";
import axios from "axios";
import Router from 'next/router'

import Layout from "../../components/Layout";

const NewHouse = () => {
  const [title, setTitle] = useState("");
  const [town, setTown] = useState("");
  const [price, setPrice] = useState(0);
  const [picture, setPicture] = useState("");
  const [description, setDescription] = useState("");
  const [guests, setGuests] = useState(0);
  const [bedrooms, setBedrooms] = useState(0);
  const [beds, setBeds] = useState(0);
  const [baths, setBaths] = useState(0);
  const [wifi, setWifi] = useState(false);
  const [kitchen, setKitchen] = useState(false);
  const [heating, setHeating] = useState(false);
  const [freeParking, setFreeParking] = useState(false);
  const [entirePlace, setEntirePlace] = useState(false);
  const [type, setType] = useState("Entire house");

  const houseTypes = ["Entire house", "Room"];

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/host/new", {
        house: {
          title,
          town,
          price,
          picture,
          description,
          guests,
          bedrooms,
          beds,
          baths,
          wifi,
          kitchen,
          heating,
          freeParking,
          entirePlace,
          type
        }
      });

      if(res.data.status === 'error') {
        alert(res.data.message);
        return;
      }

      Router.push('/host');

    } catch (err) {
      alert(err.response.data.message);
      return;
    }
  };

  return (
    <Layout>
      <Head>
        <title>Add a new house</title>
      </Head>
      <form onSubmit={handleSubmit}>
        <p>
          <label>House Title</label>
          <input
            id="title"
            type="text"
            placeholder="House Title"
            onChange={e => setTitle(e.target.value)}
          />
        </p>
        <p>
          <label>Town</label>
          <input
            required
            onChange={e => setTown(e.target.value)}
            type="text"
            placeholder="Town"
          />
        </p>
        <p>
          <label>Price per night</label>
          <input
            required
            onChange={e => setPrice(e.target.value)}
            type="number"
            placeholder="Price per night"
          />
        </p>
        <p>
          <label>House picture</label>
          <input
            required
            onChange={e => setPicture(e.target.value)}
            placeholder="House picture url"
          />
        </p>
        <p>
          <label>House Description</label>
          <textarea
            required
            onChange={e => setDescription(e.target.value)}
          ></textarea>
        </p>

        <div>
          <div>
            <p>
              <label>Number of guests</label>
              <input
                required
                onChange={e => setGuests(e.target.value)}
                type="number"
                placeholder="Number of guests"
                value={guests}
              />
            </p>
            <p>
              <label>Number of bedrooms</label>
              <input
                required
                onChange={e => setBedrooms(e.target.value)}
                type="number"
                placeholder="Number of bedrooms"
                value={bedrooms}
              />
            </p>
            <p>
              <label>Number of beds</label>
              <input
                required
                onChange={e => setBaths(e.target.value)}
                placeholder="Number of beds"
                value={beds}
              />
            </p>
            <p>
              <label>Number of baths</label>
              <input
                required
                onChange={e => setBaths(e.target.value)}
                type="number"
                placeholder="Number of beds"
                value={baths}
              />
            </p>
          </div>

          <div>
            <p>
              <label>Does it have wifi?</label>
              <select onChange={e => setWifi(e.target.value)} value={wifi}>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </p>
            <p>
              <label>Does it have a kitchen?</label>
              <select
                onChange={e => setKitchen(e.target.value)}
                value={kitchen}
              >
                <option value="true">Yes</option>
                <option vlaue="false">No</option>
              </select>
            </p>
            <p>
              <label>Does it have heating ?</label>
              <select
                onChange={e => setHeating(e.target.value)}
                value={heating}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </p>
            <p>
              <label>Does it have free parking?</label>
              <select
                onChange={e => setFreeParking(e.target.value)}
                value={freeParking}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </p>
            <p>
              <label>Is it the entire place?</label>
              <select
                onChange={e => setEntirePlace(e.target.value)}
                value={entirePlace}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </p>
            <p>
              <label>Type of house</label>
              <select
                onChange={e => setType(e.target.value)}
                value={type}
              >
                {houseTypes.map((item, key) => {
                  <option value={item} key={key}>
                    {item}
                  </option>
                })}
              </select>
            </p>
          </div>
        </div>

        <button>Add house</button>
      </form>
      <style jsx>{`
        input[type="number"],
        select,
        textarea {
          display: block;
          padding: 20px;
          font-size: 20px !important;
          width: 100%;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-sizing: border-box;
          margin-bottom: 10px;
        }
      `}</style>
    </Layout>
  );
};

export default NewHouse;
