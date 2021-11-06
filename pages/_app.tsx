import App from 'next/app';
import Header from '../components/Header';
import SearchProvider from '../context/SearchProvider';
import { CartProvider } from '../context/CartContext';
import '../styles/main.css';

class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props;

    return (
      <SearchProvider>
        <CartProvider>
          <div className="flex flex-col h-screen pt-16">
            <Header />
            <Component {...pageProps} />
          </div>
        </CartProvider>
      </SearchProvider>
    );
  }
}

export default MyApp;
