import axios from 'axios'

import {
    API_PRODUCT_LIST
} from '../App/config'

export const getProductList = (search_query, price_range, volume_range, categories) => 
    axios.get(API_PRODUCT_LIST, {
        params: {
            search_query,
            price_range,
            volume_range,
            categories
        }
    })