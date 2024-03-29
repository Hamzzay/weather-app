const BackgroundGif = ({backgroundImage}) => {
  let backgroundGif;

  switch (backgroundImage) {
    case '01d':
      backgroundGif = require('../../assets/images/sun.jpg');
      break;
    case '01n':
      backgroundGif = require('../../assets/images/moon.jpg');
      break;
    case '02d':
      backgroundGif = require('../../assets/images/cloudsDay.jpg');
      break;
    case '02n':
      backgroundGif = require('../../assets/images/fewnightCloud.jpg');
      break;
    case '03d':
      backgroundGif = require('../../assets/images/cloudsDay.jpg');
      break;
    case '03n':
      backgroundGif = require('../../assets/images/cloudsDay.jpg');
      break;
    case '04d':
      backgroundGif = require('../../assets/images/rainDay.jpg');
      break;
    case '04n':
      backgroundGif = require('../../assets/images/rainNight.jpg');
      break;
    case '09d':
      backgroundGif = require('../../assets/images/rainDay.jpg');
      break;
    case '09n':
      backgroundGif = require('../../assets/images/rainNight.jpg');
      break;
    case '10d':
      backgroundGif = require('../../assets/images/rainDay.jpg');
      break;
    case '10n':
      backgroundGif = require('../../assets/images/rainNight.jpg');
      break;
    case '11d':
      backgroundGif = require('../../assets/images/thunderDay.jpg');
      break;
    case '11n':
      backgroundGif = require('../../assets/images/thunderNight.jpg');
      break;
    case '13d':
      backgroundGif = require('../../assets/images/snowDay.jpg');
      break;
    case '13n':
      backgroundGif = require('../../assets/images/snowNight.jpg');
      break;
    case '50d':
      backgroundGif = require('../../assets/images/mistDay.jpg');
      break;
    case '50n':
      backgroundGif = require('../../assets/images/mistNight.jpg');
      break;
    default:
      backgroundGif = null; // Set a default animation source or handle accordingly
  }
  return backgroundGif;
};
export default BackgroundGif;
