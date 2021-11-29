import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'

const profileHandler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const username = fs.readFileSync('data/username.txt', 'utf8')

    return res.status(200).json({
      username,
    })
  }

  if (req.method === 'POST') {
    const { username } = req.body

    if (!username) {
      return res.status(422).json({
        success: false,
        fields: {
          username: 'username is required',
        },
      })
    }

    if (username.length < 3) {
      return res.status(422).json({
        success: false,
        fields: {
          username: 'username must be at least 3 characters',
        },
      })
    }

    // write username to data/username.txt
    fs.writeFileSync('data/username.txt', username)

    return res.status(200).json({
      success: true,
    })
  }
}

export default profileHandler
