# Hi!

Thanks for showing interest in us. We'd like to ask you to put together a small web app here to give us an idea of your skills.

## What should the web app do?

It's up to you! We have some pointers though:
* **Use at least _two_ free web `API`s.** Note that it's easier to look for APIs that don't require your app to sign in. Examples.:
    * https://api.chucknorris.io/
    * https://www.openweathermap.org/api
    * https://keyvalue.xyz/
    * https://restcountries.eu/
    * etc... many more here: https://github.com/toddmotto/public-apis
* **Combine the API results** somehow, ~~even~~ _especially if it's silly_. 
* **Include user interaction.** Users should not only look at the app, but do something with it.
* **No external documantation** should be needed to figure out how to use your app.
* **Make the UI look somewhat aesthetically pleasing.** We'll briefly look through your stylesheets to see how maintainable they seem to be.

## What to leave out?

The idea is to showcase how you handle (what you consider) the most important aspects of an app. We don't expect a polished experience, as it typically involves a lot of tedious work. Feel free to skip:
* **Fiddling with styles** to make the app look the same in every browser.
* **Non-essential features** requiring you to repeat what you've already shown.

**Two examples**

***Country heat, the game:*** An app that shows a random country from Europe (https://restcountries.eu/#api-endpoints-region) and the current temperature of its capital city (https://www.openweathermap.org/api). You also see that you have zero points now. You have to select another country from the dropdown. If it's warmer, you get 100 points, otherwise it's game over. In order to stop players picking the same hot country over and over, you don't allow selecting the same country twice.

***Nameday notes:*** The app asks for a Hungarian name then gets the nameday(s) for it (https://api.abalin.net). If there is more than one, you can add the name and date to a list. You can keep adding people that way. When you click the save button it creates a new key-value store (https://keyvalue.xyz/) and stores the access-hash in the URL for bookmarking. Once the store is initialized, the app saves the list of people there. When you open the page with the bookmarked URL from another machine, you can still see the people with their namedays.

## Supported browsers

We are only interested in the **evergreen** browsers. _We promise not to open your app with Internet Explorer._

## Your development environment

Only perform changes inside the `/your-app` directory. Your app has to be a **static site**. We'll serve `/your-app/dist` with an `HTTP server` to try it out. You can use either of the following approaches to create it.

### A) No build step

It's perfectly fine to jump straight into manually coding for the browser. In this case simply put your files in the `your-app/dist` directory. You can also use popular `CDN`s to access `3rd party` modules if you think they are necessary.

### B) Node.js + build / bundling tools

You can also use the latest stable `Node.js` to bundle your application. In this case we ask you to also send in your app build in the `dist` directory with your source code, so we don't have to build it ourselves.

## How do we evaluate your app?

We'd like you to zip the project (`/your-app`) and send it to us. We are going to review **two areas**.

### 1. The user experience. We'll:
1. Unpack the zip file and run an HTTP server on the `/your-app/dist` directory.
1. Open your site with a browser and try to figure out what it does. _Don't spoil the fun by writing a user manual._
1. Check on the `inspect -> network` tab which `API`s your app is using.

### 2. The source code. We'll:
1. Check how easy it is to understand the source code with reading as few comments as possible. (Best if you do not need them at all.)
1. Check the readability of your code.
1. Get an impression of how easy it would be for people familiar with your technology stack to contribute to this project.

