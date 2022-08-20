import { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect } from "react"

const RulesPage: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace('/')
  })

  return (
    <>
    </>
  )
}

export default RulesPage
