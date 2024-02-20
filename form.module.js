const form = document.querySelector('form');



function createObservable({ srcTarget, methods = [], callbacks = [] }) {

     let handler = {}

     return methods.map((method, i) => {
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
                                   target.push(value)
                                   callbacks[i](target, prop, value);

                              }

                              if (target[prop]) {
                                   target[prop] = value;
                                   callbacks[i](target, prop, value);
                                   return true;
                              }
                              throw new Error('Such prop does not exist!');
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


///////////////////////////////

let user = ['Peter', 'Jsck', 'Vova']

function render(element, arr = []) {
     const fragment = document.createDocumentFragment()
     const div = document.createElement('div')
     fragment.append(div)

     const data = arr.map(item => (
          `<div>${item}</div>`
     )).join(" ")

    
     fragment.querySelector('div').innerHTML = data

     document.querySelector(element).textContent = fragment.querySelector('div').textContent
}

function removeHtmlTags(str) {
     return str.replace(/<[^>]+>/g, '');
}

const proxy = createObservable({
     srcTarget: user,
     methods: ['set', 'get', 'apply'],
     callbacks: [
          (target, prop, value) => render('h2', target),
          (target, prop) => console.log(target[prop])
     ]
})


render('h2', user)

form.addEventListener('submit', (e) => {
     
     e.preventDefault()

     if(!form.querySelector('input').value){
          return
     }

     proxy[0].push(removeHtmlTags(form.querySelector('input').value))
     form.querySelector('input').value = ''
})

