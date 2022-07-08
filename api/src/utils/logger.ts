import colors from 'colors';
colors.enable();
export default {
  error: function (msg: any) {
    const date = new Date();
    console.error(`[${date.toUTCString()}] : ${msg}`);
  },
  log: function (msg: any, color = 'default', address = '', userAgent = '') {
    const date = new Date();
    const myMsg = `[${date.toLocaleString()}]${address} ${userAgent}: ${msg}`;
    switch (color) {
      case 'red':
        console.log(myMsg.red);
        break;
      case 'blue':
        console.log(myMsg.white.bgBlue);
        break;
      case 'yellow':
        console.log(myMsg.bgYellow);
        break;
      case 'green':
        console.log(myMsg.green);
        break;
      case 'io':
        console.log(myMsg.cyan);
        break;
      default:
        console.log(myMsg);
        break;
    }
  },
};
