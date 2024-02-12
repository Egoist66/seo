const h3 = document.querySelector('h3')

function render(obj) {
     h3.textContent = obj.name
}



function createObservable(obj, callback) {
     return new Proxy(obj, {
          set(target, prop, value) {
               if (target[prop]) {
                    target[prop] = value;
                    callback(target);
                    return true;
               }
               throw new Error('Such prop does not exist!');
          },
     });
}


user = createObservable({ name: 'Farid' }, render)

render(user)
user.name = '2222'


const people2 = ["Tom", "Bob", "Sam"];
const iter = people2[Symbol.iterator]();
const result = iter.next()
const result2 = iter.next();
console.log(result2);



function memoize(func) {
     const cache = new Map();

     return function (...args) {
          const key = JSON.stringify(args);

          if (cache.has(key) && cache.get(key).args.every((arg, index) => arg === args[index])) {
               console.log('cache hit');
               
               return cache.get(key).result
               
          }

          console.log('init cache');

          const result = func(...args);
          cache.set(key, { args, result });

         
         return  result
          
     };
}



function getMinMax(...numbers) {
     return {
          min: Math.min(...numbers),
          max: Math.max(...numbers)
     }
}

function calc(a, b) {
     return a + b
}


function pipe(...fns) {
     return (...args) => {
          return fns.map(fn => ({ [fn.name]: fn(...args) }))
     }

}


class Team extends Array {

     constructor(name, ...members) {
          super(...members);
          this.name = name;
     }
}
// создаем объект команды
const barcelona = new Team("Barcelona", "Tom", "Sam", "Bob");


const people = [{ name: "Tom", age: 37 }, { name: "Sam", age: 41 }, { name: "Bob", age: 21 }];
const markup = `
<ul>
     ${people.map(person => `<li>${person.name}</li>`).join("")}
</ul>`;
document.body.innerHTML += markup