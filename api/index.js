//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const { default: axios } = require("axios");
const server = require("./src/app.js");
const { conn } = require("./src/db.js");

axios.defaults.baseURL =
  process.env.NODE_ENV === "production"
    ? "https://poke-app-stobar93.herokuapp.com"
    : "http://localhost:3001";
// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(process.env.PORT || 3001, () => {
    console.log(
      `%s listening at ${process.env.PORT ? process.env.PORT : 3001} `
    ); // eslint-disable-line no-console
  });
  //Get Types on server start
  axios.get("/types");
});

setInterval(function () {
  axios.get("/");
}, 3000000); // every 5 minutes (300000)
