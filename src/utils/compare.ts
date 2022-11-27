export const compareArrays = (arr1: string[], arr2: string[]) => {
    if (arr1.length !== arr2.length){
        return false;
    }

    return arr1.every(el => arr2.includes(el)) && arr2.every(el => arr1.includes(el))
}