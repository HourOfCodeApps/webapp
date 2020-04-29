const getUserLocation = (): Promise<Position> =>
  new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    } else {
      resolve(null);
    }
  });

export default getUserLocation;
