import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import path from 'path'

// add path in prisma init config as test fix for https://github.com/prisma/prisma/issues/6051
const prisma = new PrismaClient({
//@ts-ignore
__internal: {
    engine: {binaryPath: path.join(__dirname, "query-engine-rhel-openssl-1.0.x")}
  }
})

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
     const data = await prisma.user.findMany()
     res.status(200).json(data)
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
