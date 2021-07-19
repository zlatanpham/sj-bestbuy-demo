import App from 'next/app';
import Header from '../components/Header';
import SearchProvider from '../context/SearchProvider';
import { CartProvider } from '../context/CartContext';
import '../styles/globals.css';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <SearchProvider>
        <CartProvider>
          <Header />
          <Component {...pageProps} />
        </CartProvider>
      </SearchProvider>
    );
  }
}

export default MyApp;
