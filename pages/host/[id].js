import Head from "next/head";
import axios from 'axios';

import Layout from '../../components/Layout';
import HouseForm from '../../components/HouseForm';

const EditHouse = props => {
  return (
    <Layout>
      <Head>
        <title>Edit House</title>
      </Head>
      <HouseForm edit={true} house={props.house} />
    </Layout>
  )
}

EditHouse.getInitialProps = async ({ query }) => {
  const { id } = query;
  const res = await axios.get(`http://localhost:3000/api/houses/${id}`);

  console.log('House', res.data);

  return {
    house: res.data,
  }
}

export default EditHouse;
