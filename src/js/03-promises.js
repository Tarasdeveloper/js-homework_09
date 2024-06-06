import Notiflix from 'notiflix';

const promiseForm = document.querySelector('.form');

promiseForm.addEventListener('submit', pushBtn);

function pushBtn(e) {
  e.preventDefault();
  let delay = Number(e.target.delay.value);
  let step = Number(e.target.step.value);
  let amount = Number(e.target.amount.value);

  if (delay < 0 || step < 0 || amount <= 0) {
    return Notiflix.Notify.warning('Enter a positive value!');
  }

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delay += step;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
