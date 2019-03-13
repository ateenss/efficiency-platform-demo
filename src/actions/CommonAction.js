import {
    SINGLE_SELECT_VALUE
} from './types';


export const changSingleSelectValue=(value)=>({
    type:SINGLE_SELECT_VALUE,
    value
});