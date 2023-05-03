import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';
import { ObjectId } from 'mongodb';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
    try {
        const { id } = req.query;
        const collection = req.db.collection('users')
        let data = null
        if (id) {
            data = await collection.findOne({ _id: new ObjectId(id) })
        } else {
            data = await collection.find({})
                .toArray();
        }

        return res.json({
            message: 'data get successfully',
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
        const { id } = req.query;
        let input = req.body
        let data = await req.db.collection('users').updateOne({ _id: new ObjectId(id) }, { $set: input })
        return res.json({
            message: 'data updated successfully',
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

handler.delete(async (req, res) => {
    try {
        const { id } = req.query;
        let data = await req.db.collection('users').deleteOne({ _id: new ObjectId(id) })
        return res.json({
            message: 'data deleted successfully',
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