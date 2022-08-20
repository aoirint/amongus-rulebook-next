import { GetStaticProps, NextPage } from "next"

const RulesPage: NextPage = () => {
  return (
    <>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    redirect: {
      permanent: false,
      destination: '/'
    }
  }
}

export default RulesPage
