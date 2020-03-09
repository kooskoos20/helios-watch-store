export const getAllProducts = (success, failure) => {
    const products = JSON.parse(localStorage.getItem("products"))
    if (!products)
        fetch("https://androidbootcamp.github.io/staticcontent/shoppingapplication/products_json.json")
            .then(response => response.text())
            .then(response => JSON.parse(response))
            .then(response => {
                success(response)
                localStorage.setItem("products", JSON.stringify(response))
            })
            .catch(err => failure("Server is down"))
    else success(products)
}