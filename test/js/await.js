
// test promise?
// a promise is commonly defined as a proxy for a value that will eventually become available

async function f() {
    return 1;
}


// normal function
const normal_function = (input) => {
    return "output string for normal_function";
}

console.log(normal_function());
console.log('-----------------------------');

// dummy function that return a promise
// and it is required a little time to resolve the value
const p = (input) => {
    return new Promise( (resolve, reject) => {
    
        err = false;
        if(err) {
            reject("error message...");
            return;
        }
        //return resolve(input);
        setTimeout(()=> resolve(input), 1000);
    })
}

p('input message')
.then (o => console.log(o))
.catch(err => console.log(err))
;


// inside a async function to use the promise
// can apply await to wait until the promise value has been resolved.
async function f2() {
    console.log('f2 start...');
    let promise = await p('f2....'); // apply await to wait until the promise has been resolved before continue to next line
    console.log('f2 ending....');

    return promise;    
}

f2().then(o => console.log(o));

console.log('----------- end ----------------')