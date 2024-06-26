const form = document.querySelector('form');

export function removeHtmlTags(str) {
     return str.replace(/<[^>]+>/g, '');
}

export function createObservable({ srcTarget, interceptors = [], callbacks = [] }) {

     let handler = {}

     return interceptors.map((method, i) => {
          switch (method) {
               case 'apply': {
                    handler = {
                         [method](target, thisArg, args) {
                              callbacks[i](target, thisArg, args);
                              return target.apply(target, thisArg, args);
                         },
                    }
                    break;
               }
               case 'set': {
                    handler = {
                         [method](target, prop, value) {
                              if (Array.isArray(target)) {
                                   if (Array.isArray(value)) {
                                        target = [...target, ...value]
                                   }

                                   target = [...target, value]
                                   callbacks[i](target, prop, value);

                              }
                              else {
                                   if (target[prop]) {
                                        target[prop] = value;
                                        callbacks[i](target, prop, value);
                                        return true;
                                   }
                                   throw new Error('Such prop does not exist!');
                              }


                         }
                    }
                    break;
               }

               case 'get': {
                    handler = {
                         [method](target, prop) {
                              if (target[prop]) {

                                   callbacks[i](target, prop);
                                   return target[prop];
                              }
                              throw new Error('Such prop does not exist!');
                         }
                    }
                    break;
               }
          }

          return new Proxy(srcTarget, handler)
     })




}



export function getMinMax(...numbers) {
     return {
          min: Math.min(...numbers),
          max: Math.max(...numbers)
     }
}

export function calc(a, b) {
     return a + b
}


export function pipe(...fns) {
     return (...args) => {
          return fns.map(fn => ({ [fn.name]: fn(...args) }))
     }

}

const compose = pipe(calc, getMinMax)
const res = compose(1, 2, 3, 4, 5)

export function render(element, callback, arr = []) {
     const fragment = document.createDocumentFragment()
     const div = document.createElement('div')
     fragment.append(div)

     const data = arr.map(item => (
          callback(item)
     )).join(" ")


     fragment.querySelector('div').innerHTML = data

     document.querySelector(element).innerHTML = fragment.querySelector('div').innerHTML
}



