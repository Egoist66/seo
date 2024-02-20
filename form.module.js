const form = document.querySelector('form');



function createObservable({ srcTarget, methods = [], callbacks = []}) {

     let handler = {}
    
     return methods.map((method, i) => {
          switch(method){
               case 'apply': {
                    handler =  {
                         [method](target, thisArg, args) {
                              callbacks[i](target, thisArg, args);
                              return target.apply(target, thisArg, args);
                         },
                    }
                    break;
               }
               case 'set': {
                    handler = {
                         [method](target, prop, value){
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
                         [method](target, prop){
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

          return  new Proxy(srcTarget, handler)
     })
   
    
   

}



const proxy = createObservable({
     srcTarget: form.querySelector('input'),
     methods: ['set', 'get', 'apply'],
     callbacks: [
          (target, prop, value) => console.log(value),
          (target, prop) => console.log(target[prop])
     ]
})

proxy[0].name = 2



