import React, {useEffect, useState} from 'react';
import css from './InputCity.module.css'
import axios from "axios";
import {AccessKey, BasicUrl, DefaultCity} from "./consts";

const InputCity = ({fun}) => {
    const [city, setCity] = useState(`${DefaultCity}`)
    const [images, setImages] = useState([])


    useEffect(() => fetchCity(DefaultCity),[])
    const inputHandler = (evt) => {
        // console.log(evt.target.value)
        let newCity = evt.target.value.trim().toLowerCase();

        evt.key === 'Enter' &&
        newCity !== city &&
        (() => {
            setCity(newCity)
            console.log('new city:', newCity)
            console.log('city: ', city)

            fetchCity(newCity)

        })()


    }

        const fetchCity = (newCity) => {
            axios.get(BasicUrl, {
                params: {
                    query: newCity,
                    orientation: 'landscape',

                },
                headers: {
                    Authorization: `Client-ID ${AccessKey}`
                }
            }).then(res => {
                console.log('raw data:', res)

                let {data: {results}} = res;
                // let {data} =res;
                // let {results} = data;


               let imgList = results.map(ele => ({
                    des: ele.alt_description,
                    regular: ele.urls.regular,
                    thumb: ele.urls.thumb

                }))

                console.log('tidied data: ', imgList)
                setImages(imgList)
                fun(imgList)





            }).catch(err => console.log('fetch city http error: ', err))

        }



    return (
        <div className={css.SearchBar}>
            <input
                type="text"
                className={css.InputName}
                placeholder={'Search city here ...'}
                onKeyDown = {inputHandler}
            />
            <button className={css.Btn}>Search</button>

            {/*{JSON.stringify(images)}*/}

        </div>
    );
};

export default InputCity;