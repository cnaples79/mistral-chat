import '../app/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <div className="container">
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
