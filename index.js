/* Name: Allen Ding
 * Email: allend@andrew.cmu.edu
 *
 * This file contains the implementation for the Cloudflare Fullstack 2020 Challenge. 
 * To start, the file has an event listener for any incoming requests. Once the request
 * is found, the function "handleRequest" will fetch that request, parse the response
 * to JSON, and return either one of the URLs using a random number generator.
 *
 */

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * This function below handles a request from a user, fetches the requested URL,
 * and uses promise chaining to first parse the response into a JSON. Then, using 
 * a random number generate that either returns 1 or 2, the function will return 
 * a URL from the variant array depending on the return value of the random number
 * generator.
 * @param {Request} request
 */
async function handleRequest(request) 
{
  let url = 'https://cfw-takehome.developers.workers.dev/api/variants';

  return fetch(url)

    /* Parsing the response as JSON, returns error code if fails */
    .then((response) => {
      if (response.ok) return response.json();
      else alert("ERROR Code: " + response.status);
    })

    .then((data) => {
      console.log(data);

      /* Making a fetch request to one of the two URLs, and return it as the response from the script */
      let random = Math.ceil(Math.random() * 2);

      if (random == 1) return fetch(data.variants[0]); 
      else return fetch(data.variants[1]);
    });  
}
