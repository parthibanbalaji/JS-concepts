

/* 
Bind, apply and call
Following is the implementation of bind, apply and call
*/

/**
 * Method will call the used function with the passed object as a this context
 * Note: We are adding this contenxt to the function by attaching the function to the passed object.
 * Note: We are forming a uniqued id to not mess with the exising property in the passed object
 * @param {*} object 
 * @param {*} args Array of paramters
 * @returns result of the given function
 */
Function.prototype.myApply = function(object,args) {
    let context = object;
    let uniqueId = Math.random();
    while(context[uniqueId]) {
        uniqueId = Math.random();
    }
    context[uniqueId] = this;
    let result = context[uniqueId](...args);
    return result;
}

/**
 * This method is same to apply except it accepts paramters as a comma separeted values
 * Using rest parameter to get the comma separated parametrs in a array list.
 * @param {*} object .
 * @param  {...any} args comma separeated paramets
 * @returns result of the given function.
 */
Function.prototype.myCall = function(object,...args) {
    let context = object;
    let uniqueId = Math.random();
    while(context[uniqueId]) {
        uniqueId = Math.random();
    }
    context[uniqueId] = this;
    let result = context[uniqueId](...args);
    return result;
}

/**
 * Method implements bind functionality
 * This method used myApply
 * Note: newArgs is needed for a case, if function call happens twice and arguments passed seperately to each call
 * @param {*} object 
 * @param  {...any} args 
 * @returns new function with the passed object as a this context
 */
Function.prototype.myBindApply = function(object, ...args) {
    return (...newArgs) => {
        this.myApply(object, [...args,...newArgs])
    }
}

Function.prototype.myBindCall = function(object, ...args) {
    return (...newArgs) => {
        this.myCall(object, ...args,...newArgs)
        
    }
}


function test(age,gender,height) {
    console.log("name "+this.name,age,gender,height);
}

// Testing 
// case 1: All the arguments passed in a single call
let testBindApply = test.myBindApply({name:"test1"},5, "male", "2 feet");
let testBindCall = test.myBindCall({name:"test2"},10, "male", "4 feet");
testBindApply();
testBindCall();

// case 2: Arguments passed in a subsequent call
let testBindApplyWithPartialArguments = test.myBindApply({name:"test3"},15, "male");
let testBindCallWithPartialArguments = test.myBindCall({name:"test4"},20, "male");

testBindApplyWithPartialArguments("5 feet");
testBindCallWithPartialArguments("6 feet");

// 

