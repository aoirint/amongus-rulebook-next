
import path from 'path'
import fs from 'fs'
import yaml from 'js-yaml'
import { array, constant, Decoder, number, object, optional, string, union } from '@mojotech/json-type-validation'

export interface Rule {
  id: string
  name: string
  recommendedParticipants: number
  createdAt: string
  updatedAt: string
  versions: {
    amongUs: string
    extremeRoles: string | undefined | null
    submerged: string | undefined | null
  }
  imageUrls: string[]
}

const ruleDecoder: Decoder<Rule> = object({
  id: string(),
  name: string(),
  recommendedParticipants: number(),
  versions: object({
    amongUs: string(),
    extremeRoles: optional(union(string(), constant(null))),
    submerged: optional(union(string(), constant(null)))
  }),
  createdAt: string(),
  updatedAt: string(),
  imageUrls: array(string())
})

const ruleDirPath = path.join(process.cwd(), 'public', 'contents', 'rules')

function getRuleFilePath(ruleId: string) {
  const ruleFilePath = path.join(ruleDirPath, `${ruleId}.yml`)
  return ruleFilePath
}

export function getRuleIdList() {
  const ruleFileList = fs.readdirSync(ruleDirPath).filter((file) => fs.lstatSync(path.join(ruleDirPath, file)).isFile() && file.endsWith('.yml'))
  const ruleIdList = ruleFileList.map((ruleFile) => ruleFile.substring(0, ruleFile.lastIndexOf('.')))
  return ruleIdList
}

export function loadRule(ruleId: string) {
  const ruleFilePath = getRuleFilePath(ruleId)

  const rawRule = yaml.load(fs.readFileSync(ruleFilePath, {
    encoding: 'utf-8'
  }))

  const rule = ruleDecoder.runWithException(rawRule)
  return rule
}

export function loadRules(): Rule[] {
  const ruleIdList = getRuleIdList()
  const rules = ruleIdList.map((ruleId) => loadRule(ruleId))
  return rules
}
