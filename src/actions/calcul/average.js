/**
 * This function will calculate the average from an array containing numbers
 * @param array     {array}:    contains all numbers value
 * @return          {number}:   average value, 0 if there isn't value in array
 */
export const numAverage = (array) =>{
    if (array.length) {
        let result = 0;
        for (let i = 0; i < array.length; i++) {
            result += array[i].rating
        }
        return (result / array.length)
    }
    else{return 0}
}
