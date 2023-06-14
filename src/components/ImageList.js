import React from 'react';
import css from './ImageList.module.css'

const ImageList = ({images, func}) => {
    console.log('images got from ImageList', images)
    // const bgHandler = () => {func()}
    // func(img.regular)
    return (
        <div className={css.Carousel}>
            {
                images &&
                images.map((img, index) => {
                    console.log('img.regular:', img.regular)
                    const bgHandler = () => func(img.regular)
                    return <div
                        key={index}
                        onMouseEnter={bgHandler}

                        style={{background: `url('${img.thumb}') no-repeat center center fixed`}}>


                    </div>


            })
            }

        </div>
    );
};

export default ImageList;