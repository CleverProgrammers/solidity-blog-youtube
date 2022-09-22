import '../styles/globals.scss'
import { AppProvider } from '../context/context'

const MyApp = ({ Component, pageProps }) => {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  )
}

export default MyApp
