
// sum(1,2,4)(5)() -> 12
//sum(1,2)


// Currying
// This is a concept in JS will give a transformation to the function
// Calling a function will give a transformed function
//

/**
 * Method sum will give a function as a result on calling until no args passed to it 
 * Note: This function uses closure to remenber the value
 * @param  {...any} args 
 * @returns function / Vale
 */
const sum = function (...args)  {
    let value = 0;

    // A helper function will return a function if there is a argument ans sum the arguments value
    // and persist the value using closure
    // If no args given  then return the persisted value
    const helper = function (...args1) {
     if(args1 && args1.length > 0) {
          let  argsValue = args1.reduce((acc,ele) => { return acc+ele}, 0);
          value = value+argsValue;
          return helper;
        } else {
            return value;
        }
    }
    return helper(...args)
}


// Test
console.log(sum(2,3,4)(1)(1,2,2)())

