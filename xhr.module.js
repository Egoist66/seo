import { api } from "./api.module.js";
import { createObservable, render } from "./utils.module.js";

let state = {
     posts: []
}

let count = 5

const observable = createObservable({
     srcTarget: state,
     interceptors: ['get', 'set'],
     callbacks: [
          (target, prop) => console.log(target[prop]),
          (target) => render('#out', (item) => {
               return `<div>
                  <h2>${item.title}</h2>
                  <p>${item.id}</p>
               </div>`
          },
               target.posts)


     ]
})

api.get({
     url: `https://jsonplaceholder.typicode.com/posts?_limit=${count}`,
     responseType: 'json'
})
     .then(data => {

          observable[1].posts = data

     })
     .then(() => render('#out', (item) => {
          return `<div>
        <h2>${item.title}</h2>
        <p>${item.id}</p>
     </div>`
     }, observable[1].posts))





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

observable[0].posts