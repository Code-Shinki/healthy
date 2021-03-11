import firebase from 'firebase'
import { NextApiRequest, NextApiResponse } from 'next'
import { db } from 'utils/firebase'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (!req.body.key || req.body.key !== process.env.NEXT_PUBLIC_DB_API_KEY) {
    return res.status(401).end()
  }

  switch (req.method) {
    case 'POST': {
      try {
        await db
          .collection('users')
          .doc(req.body.uid)
          .set({ ...req.body.data, createdAt: firebase.firestore.FieldValue.serverTimestamp() })
        res.status(200).end()
      } catch (err) {
        res.status(500).send(err)
      }
      break
    }
    case 'GET': {
      try {
        const snapshot = await db.collection('users').doc(req.body.uid).get()
        res.status(200).json(snapshot)
      } catch (err) {
        res.status(500).send(err)
      }
      break
    }
  }
}
