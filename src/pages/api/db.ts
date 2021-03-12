import { NextApiRequest, NextApiResponse } from 'next'
import { db } from 'utils/firebase'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const token = req.headers.authorization

  if (!token || token !== 'Bearer ' + process.env.NEXT_PUBLIC_X_API_KEY) {
    res.status(401).end()
  }

  switch (req.method) {
    case 'GET': {
      try {
        const snapshot = await db
          .collection('users')
          .doc(req.query.uid as string)
          .get()
          .then((doc) => {
            return doc.data()
          })
        res.status(200).json(snapshot)
      } catch (err) {
        res.status(500).send(err)
      }
      break
    }

    case 'POST': {
      try {
        await db
          .collection('users')
          .doc(req.body.uid)
          .set({ ...req.body.data, createdAt: new Date().toString() })
        res.status(200).end()
      } catch (err) {
        res.status(500).send(err)
      }
      break
    }
  }
}
