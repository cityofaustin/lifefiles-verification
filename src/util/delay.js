
export default async (timeout) => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve();
      }, timeout);
    } catch (err) {
      reject(err);
    }
  });
}
