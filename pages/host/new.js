import { useState } from 'react';
import Head from 'next/head';

import Layout from '../../components/Layout';

const NewHouse = () => {
    const [title, setTitle] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/host/new', {
                house: {
                    title,
                }
            });
        } catch (err) {
            alert(err.response.data.message);
            return
        }
    };

    return (
        <Layout>
            <Head>
                <title>Add a new house</title>
            </Head>
            <form
                onSubmit={handleSubmit}
            >
                <input
                    id="title"
                    type="text"
                    placeholder="House Title"
                    onChange={e => setTitle(e.target.value)}
                />
                <button>Add house</button>
            </form>
        </Layout>
    );
}

export default NewHouse;
