const getUserLocation = (): Promise<GeolocationPosition> =>
  new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    } else {
      resolve(null);
    }
  });

export default getUserLocation;
