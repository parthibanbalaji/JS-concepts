
/**
 * Method will return a new promise
 * @param {*} promises Array of promises
 * @returns List of all promises with the status and value
 */
Promise.allSettled = (promises) => {
    return new Promise((resolve, reject) => {
        const results = [];
        let pushedCount = 0;
        for(let [index,promise] of promises.entries() ) {
            if(promise instanceof Promise) { 
                promise.then((res)=>{
                    results[index] ={status:"fullfilled", value:res};
                    pushedCount++;
                     if(pushedCount === promises.length) {
                        resolve(results)
                    }
                })
                .catch((err)=>{
                    results[index] = {status:"rejected", reason:err};
                      pushedCount++;
                     if(pushedCount === promises.length) {
                        resolve(results)
                    }
                })
            } else {
                results[index] = {status:"fulfilled", value:promise};
                pushedCount++;
                if(pushedCount === promises.length) {
                    resolve(results)
                }
            }
        }
    })
    
}


// testing the written polyfill.
const promise1 = Promise.resolve(1);
const promise2 = Promise.reject(2);
const promise3 = new Promise((resolve,reject)=> {
    setTimeout(()=> resolve(100),100)
})


Promise.allSettled([promise3 ,promise1,promise2])
.then((results) => {
    console.log(results)
})  // [{status:"fullfilled",value:100}, {status:"fullfilled",value:1}, {status:"rejected",reason:"2"}]

//