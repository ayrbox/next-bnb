export default (req, res) => {
    if(req.method !== 'POST') {
        res.state(405).end();
        return;
    }
    console.log(req.body);
}