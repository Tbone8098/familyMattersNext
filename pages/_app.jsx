import '../styles/globals.css'
import UserProvider from 'context/userContext'
import ModalProvider from 'context/modalContext'


export default function App({
    Component,
    pageProps: {
        ...pageProps
    }
}) {

    return (
        <UserProvider>
            <ModalProvider>
                <Component {...pageProps} />
            </ModalProvider>
        </UserProvider>
    )
}
