import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import NotFound404Page from './NotFound404Page';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        width: '100%',
        height: '100vh',
        justifyContent: 'center'
    },
    image_wrapper: {
        width: '50%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    content_wrapper: {
        width: '50%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'column',
        padding:'0 10% 0 0%',
        boxSizing:'border-box'
    }
})

export default function (props) {
    const [products, setProducts] = useState([])
    useEffect(() => {
        const products = JSON.parse(localStorage.getItem("products"))
        if (!products)
            fetch("https://androidbootcamp.github.io/staticcontent/shoppingapplication/products_json.json")
                .then(response => response.text())
                .then(response => JSON.parse(response))
                .then(response => {
                    setProducts(response)
                    localStorage.setItem("products", JSON.stringify(response))
                })
                .catch(err => setProducts([]))
        else setProducts(products)
    }, [])
    const classes = useStyles()
    let product = products.filter(product => product.title === props.match.params.name)
    if (!product.length) return <NotFound404Page />
    product = product[0]
    return (
        <div className={classes.root}>
            <div className={classes.image_wrapper}>
                <img src={product.image_url} height='600px' width='400px' />
            </div>
            <div className={classes.content_wrapper}>
                <h1>{product.title}</h1>
                <p>{product.description}</p>
            </div>
        </div>
    )
}