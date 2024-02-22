export const api = {
     get({ url, responseType = 'text' }) {
          return new Promise((succeed, fail) => {

               const xhr = new XMLHttpRequest();
               xhr.responseType = responseType
               xhr.open("GET", url);
               xhr.addEventListener("load", () => {
                    if (xhr.status >= 200 && xhr.status < 400)
                         succeed(xhr.response);
                    else
                         fail(new Error(`Request failed: ${xhr.statusText}`));
               });
               xhr.addEventListener("error", () => fail(new Error("Network error")));
               xhr.send();

          });
     },

     post({ url, data, responseType }) {
          return new Promise((succeed, fail) => {

               const xhr = new XMLHttpRequest();
               xhr.responseType = responseType
               xhr.open("POST", url);
               xhr.addEventListener("load", () => {
                    if (xhr.status >= 200 && xhr.status < 400)
                         succeed(xhr.response);
                    else
                         fail(new Error(`Request failed: ${xhr.statusText}`));
               });
               xhr.addEventListener("error", () => fail(new Error("Network error")));
               xhr.send(data);

          });

     }
}