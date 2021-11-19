import { React } from 'react';

import Header from '../Header';
import Clip from '../../img/clip.svg'
import { Wrapper ,WrapperMain ,Flex} from './AddProduct.styled'

const AddProduct = () => {

    return (
        <>
            <Header />
            <Wrapper>
                <h1 >Add Product</h1>
                    <Flex btwn>
                        <input
                            type="text"
                            name="Title"
                            placeholder="Title"
                            className="first"
                            />
                        <label className="second" htmlFor='imgFile'>Attach Image
                            <img src={Clip}/>
                            <input type="file" name='img' id= "imgFile" hidden/>
                        </label>
                    </Flex>
                    <input
                        className="third"
                        type="text"
                        name="price"
                        placeholder="Price"
                        ></input>
                <WrapperMain>
                    <button>Save</button>
                </WrapperMain>
            </Wrapper>
        </>
    )
}

export default AddProduct