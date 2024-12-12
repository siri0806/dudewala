import React from 'react'
import Navbar from '../components/navbar'
import Cardes from '../components/Cardes'
import { useState, useEffect } from 'react'
export default function Orders() {

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [Products, setProducts] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');

    const loaddata = async () => {
        let response = await fetch('https://dudewalaservices.onrender.com/api/DisplayData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }

        });
        response = await response.json();
        setProducts(response[0]);
        setBrands(response[1]);
        setCategories(response[2])
    };

    useEffect(() => {
        loaddata()
    }, [])


    useEffect(() => {
        const filteredProducts = Products.filter((product) => {
            if (selectedCategory && selectedBrand) {
                return (
                    product.category === selectedCategory &&
                    product.brand === selectedBrand
                );
            } else if (selectedCategory) {
                return product.category === selectedCategory;
            } else if (selectedBrand) {
                return product.brand === selectedBrand;
            } else {
                return true;
            }
        });

        setFilteredData(filteredProducts);
    }, [selectedCategory, selectedBrand, Products]);





    return (
        <>
            <div><Navbar /></div>
            <div style={{ fontSize: '20px', display: "flex", justifyContent: 'center', marginTop: '85px', flexWrap: "wrap" }}>
                <label htmlFor="category" style={{ marginRight: '10px', marginTop: '4px' }}>Category:</label>
                <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)} style={{ padding: '5px 10px', borderRadius: '5px', marginRight: '10px',boxShadow: '0 10px 15px rgba(0, 0, 0, 0.2)'}}>
                    <option value="">All</option>
                    {categories.map((category) => (
                        <option key={category._id} value={category.category}>{category.category}</option>
                    ))}
                </select>

                <label htmlFor="brand" style={{ marginRight: '10px', marginTop: '4px' }}>Brand:</label>
                <select
                    id="brand"
                    value={selectedBrand}
                    onChange={(e) =>
                        setSelectedBrand(e.target.value)
                    } style={{ padding: '5px 10px', borderRadius: '5px', marginRight: '10px',boxShadow: '0 10px 15px rgba(0, 0, 0, 0.2)' }} >
                    <option value="">All</option>
                    {brands.map((brand) => (
                        <option key={brand._id} value={brand.brand}>{brand.brand}</option>
                    ))}

                </select>
            </div>
            <div style={{ display: "flex", justifyContent: 'center', marginTop: '55px', flexWrap: "wrap" }} >
                 {filteredData.length > 0 ? (
                    filteredData.map((product) => (
                    <div key={product._id}>
                            <Cardes foodItem={product}></Cardes>
                        </div>
                    ))
                ) : (
                    <p>No results found.</p>
                )}
            </div>

        </>
    )
}
