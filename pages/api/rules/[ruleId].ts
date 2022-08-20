// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import assert from 'assert'
import type { NextApiRequest, NextApiResponse } from 'next'

import { loadRule, Rule } from '../../../lib/rules'

interface Data {
  rule: Rule
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { rawRuleId } = req.query
  assert(rawRuleId !== undefined)

  const ruleId = Array.isArray(rawRuleId) ? rawRuleId[0] : rawRuleId
  const rule = loadRule(ruleId)

  res.status(200).json({ rule })
}
