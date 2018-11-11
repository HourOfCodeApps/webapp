// const showPosition = (position) => {
//   console.log(position);
//   alert(
//     "Latitude: " + position.coords.latitude +
//     " Longitude: " + position.coords.longitude
//   );
// };

const getUserLocation = () => new Promise((resolve, reject) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  } else {
    resolve(null);
  }
});

// const getUserLocation = () => {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition);
//   } else {
//     alert("Geolocation is not supported by this browser.");
//   }
// };

export default getUserLocation;
