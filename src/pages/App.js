import React, { useEffect, useState } from 'react';
import '../App.css'
import { makeStyles } from '@material-ui/core/styles'
import Cover from '../homepage/Cover';
import Footer from '../homepage/Footer';
import Products from '../homepage/Products';


const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '5% 5% 0 5%',
    padding: '0%',
  }
})

function App() {
  const [products, setProducts] = useState(undefined)
  useEffect(() => {
    fetch("https://androidbootcamp.github.io/staticcontent/shoppingapplication/products_json.json")
      .then(response => response.text())
      .then(response => JSON.parse(response))
      .then(response => {
        setProducts(response)
        localStorage.setItem("products",JSON.stringify(response))
      })
      .catch(err=> setProducts([]))
  }, [])

  const classes = useStyles()
  return (
    <>
      <Cover />
      <div className={classes.wrapper}>
        <Products products={products}/>
      </div>
      <Footer />
    </>
  );
}

export default App;
