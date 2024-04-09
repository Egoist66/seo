import { api } from "./api.module.js";
import { createObservable, render, pipe, calc, getMinMax } from "./utils.module.js";




const compose = pipe(calc, getMinMax)
const res = compose(1, 2, 3, 4, 5)

res.forEach(item => console.log(item))




let count = 5
let state = {
     posts: []
}
const observable = createObservable({
     srcTarget: state,
     interceptors: ['get', 'set'],
     callbacks: [

          // get 
          (target, prop) => console.log(target),

          //set
          (target) => render('#out', (item) => {
               return `<div>
                  <h2>${item.title}</h2>
                  <p>${item.id}</p>
               </div>`
          },
               target.posts)


     ]
})

window.observable = observable

api.get({
     url: `https://jsonplaceholder.typicode.com/posts?_limit=${count}`,
     responseType: 'json'
})
     .then(data => {
          observable[1].posts = data
     })
 





document.querySelector('#fetch').addEventListener('click', () => {
     count++
     api.get({
          url: `https://jsonplaceholder.typicode.com/posts?_limit=${count}`,
          responseType: 'json'
     })
          .then(data => {

               observable[1].posts = data

          })

})

