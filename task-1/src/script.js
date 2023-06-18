const initialValidationForm = () => {
  const form = document.getElementById("modal__form");

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let error = formValidate(form);

    if (error != 0) {
      document.querySelector(".modal__error").classList.add("active");
    } else {
      document.querySelector(".modal__form").classList.add("inactive");
      document.querySelector(".modal__thankYou").classList.remove("inactive");
      document.querySelector(".modal__error").classList.remove("active");
      form.reset();
    }
  });

  const formValidate = (form) => {
    let error = 0;
    let formsReq = document.querySelectorAll("._req");

    const formAddError = (input) => {
      input.parentElement.classList.add("_error");
      input.classList.add("_error");
    }

    const formRemoveError = (input) => {
      input.parentElement.classList.remove("_error");
      input.classList.remove("_error");
    }

    formsReq.forEach((formReq) => {
      formRemoveError(formReq);
      if (formReq.value === "") {
        formAddError(formReq);
        error++;
      }
    });

    return error;
  }
}

const initialAnimationText = () => {
  const screenWidth = window.screen.width;
  const shift = 400;
  
  let textAnimation1 = document.querySelector('.textAnimation__row1');
  let textAnimation2 = document.querySelector('.textAnimation__row2');
  let textAnimation3 = document.querySelector('.textAnimation__row3');

  let interval1 = 0;
  let interval2 = screenWidth;
  let interval3 = -shift * 2;

  let timer = setInterval(() => {
    textAnimation1.style.left = interval1 + 'px';
    textAnimation2.style.left = interval2 + 'px';
    textAnimation3.style.left = interval3 + 'px';

    interval1++;
    interval2--;
    interval3++;  

    if (interval1 === screenWidth) interval1 = -(textAnimation1.offsetWidth + shift);
    if (interval2 === -(textAnimation2.offsetWidth + shift)) interval2 = screenWidth;
    if (interval3 === screenWidth) interval3 = -(textAnimation1.offsetWidth + shift);
  }, 5);
}

const initialModalButtons = () => {
  const buttonsContact = document.querySelectorAll(".buttonContact");
  buttonsContact.forEach(button => {
    return button.addEventListener('click', () => {
      document.querySelector(".modal").classList.add("active");
      document.body.classList.add("lock");
    });
  })

  document.querySelector(".modal__close").addEventListener('click', () => {
    document.querySelector(".modal").classList.remove("active");
    document.body.classList.remove("lock");
  });

  document.querySelector(".modal__container").addEventListener('click', (event) => {
    event._isClickWithInModal = true;
  })

  document.querySelector(".modal").addEventListener('click', (event) => {
    if (event._isClickWithInModal) return;
    event.currentTarget.classList.remove('active');
    setTimeout(() => {
      document.querySelector(".modal__form").classList.remove("inactive");
      document.querySelector(".modal__thankYou").classList.add("inactive");
      document.body.classList.remove("lock");
    }, 200);
  })

  document.querySelector(".modal__button").addEventListener('click', () => {
    document.querySelector(".modal").classList.remove("active");
    setTimeout(() => {
      document.querySelector(".modal__form").classList.remove("inactive");
      document.querySelector(".modal__thankYou").classList.add("inactive");
      document.body.classList.remove("lock");
    }, 200);
  });
}

const initialCookies = () => {
  setTimeout(() => {
    document.querySelector(".cookie-alert").classList.add("active");
  }, 300);

  document.querySelector(".cookie-alert__close").addEventListener('click', () => {
    document.querySelector(".cookie-alert").classList.remove("active");
  });

  document.querySelector(".cookie-alert__accept").addEventListener('click', () => {
    document.querySelector(".cookie-alert").classList.remove("active");
  });

  document.querySelector(".cookie-alert__decine").addEventListener('click', () => {
    document.querySelector(".cookie-alert").classList.remove("active");
  });
}

const initialHeader = () => {
  let header = document.querySelector(".header__nav");
  let headerHeight = document.querySelector(".header").clientHeight;
  let headerNavHeight = document.querySelector(".header__nav").clientHeight;

  document.onscroll = () => {
    let scroll = window.scrollY;

    if (scroll > headerHeight) {
      header.classList.add("fixed");
      document.body.style.paddingTop = headerNavHeight + 'px';
    } else {
      header.classList.remove("fixed");
      document.body.removeAttribute('style');
    }
  }

  //Header menu 
  document.querySelector(".nav__menu").addEventListener("click", () => {
    document.querySelector(".header__menu").classList.add("active");
    document.body.classList.add("lock");
  })

  document.querySelector(".header__menu-close").addEventListener("click", () => {
    document.querySelector(".header__menu").classList.remove("active");
    document.body.classList.remove("lock");
  })
}

document.addEventListener('DOMContentLoaded', () => {
  initialValidationForm();
  initialAnimationText();
  initialModalButtons();
  
  // Cookies
  initialCookies();

  //Header
  initialHeader();
});