import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
    const { id } = req.query;
    const collection = req.db.collection('users')
    let doc = {}

    if (id) {
        doc = await collection.findOne(id)
    } else {
        doc = await collection.find({})
            .toArray();
    }

    res.json(doc)
});

handler.post(async (req, res) => {
    try {
        let input = req.body
        let data = await req.db.collection('users').insertOne(input)
        return res.json({
            message: 'data added successfully',
            success: true,
            data: data
        });
    } catch (error) {
        // return an error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
})

handler.put(async (req, res) => {
    try {
        let input = req.body
        let data = await req.db.collection('users').updateOne(input)
        return res.json({
            message: 'data added successfully',
            success: true,
            data: data
        });
    } catch (error) {
        // return an error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
})

export default handler;