export function unwrapMovies(movies = [], year = 2012) {
  return { year, movies };
}

let timerId;
export function debounce(func, wait = 1000) {
  return function (...args) {
    const context = this;
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}
