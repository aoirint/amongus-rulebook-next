// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { loadRules, Rule } from '../../../lib/rules'

interface Data {
  rules: Rule[]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const rules = loadRules()

  res.status(200).json({ rules })
}
