
import notiflix from 'notiflix';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (shouldResolve) {
        res({ position, delay });
      } else {
        rej({ position, delay });
      }
    }, delay);
  });
}

const formEl = document.querySelector('.form');
const inputDelay = formEl.elements['delay'];
const inputStep = formEl.elements['step'];
const inputAmount = formEl.elements['amount'];

formEl.addEventListener('submit', evt => {
  evt.preventDefault();
  let sumMin = parseInt(inputDelay.value);

  for (let i = 1; i <= inputAmount.value; i+=1) {
    console.log(sumMin);
    createPromise(i, sumMin)
      .then(({ position, delay }) => {
        notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    sumMin += parseInt(inputStep.value);
  }
});