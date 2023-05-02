import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
    const { date } = req.query;

    let doc = {}

    if (date) {
        doc = await req.db.collection('users').findOne({ date: new Date(date) })
    } else {
        doc = await req.db.collection('users').findOne()
    }

    res.json(doc)

    res.status(200).json({ name: 'John Doe' })
});

handler.post(async (req, res) => {
    let data = req.body
    data = JSON.parse(data);
    data.date = new Date(data.date);
    let doc = await req.db.collection('users').updateOne({ date: new Date(data.date) }, { $set: data }, { upsert: true })

    res.json({ message: 'ok', doc });
})

export default handler;