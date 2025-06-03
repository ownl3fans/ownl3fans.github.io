const cards = document.querySelectorAll('.card');
const textData = [
  `Кодер, осинтер.\nБольшой опыт в поиске по открытым данным, анализе данных. В 2023 был фейм, но вынужден был уйти.\nРаботаю над прогами на Python, создание сайтов на HTML/CSS/JS. Второстепенно — OSINT. Знаю Java.\nСостоял в:
OSINTATTACK — 2022г
KNZ — 2023г
309sq —2023г`,
  `Троль, снос.\nМногократное участие в конференциях, войсчатах, бифах на фейм. Огромный словарный запас, быстрый тайпинг, выдержка, позволяющая побеждать в битвах. В КМ тг с 2022 года, в КМ ds с 2017 года.\nСостоял в:
OSINTATTACK — 2022г
KNZ — 2023г
309sq —2023г`
];

cards.forEach((card, index) => {
  const typingEl = document.createElement('div');
  typingEl.classList.add('typing');
  card.appendChild(typingEl);

  let isTyping = false;
  let textVisible = false;
  let typingTimeout;

  card.addEventListener('click', async () => {
    if (isTyping) return; // блокируем во время анимации
    isTyping = true;

    if (!textVisible) {
      // Убираем аву, ник и тд
      card.classList.add('clicked');

      // Очистим, покажем блок
      typingEl.textContent = '';
      typingEl.classList.remove('typing-out');
      typingEl.classList.add('typing-in');

      await typeText(typingEl, textData[index]);

      textVisible = true;
    } else {
      // Скрытие текста с анимацией
      typingEl.classList.remove('typing-in');
      typingEl.classList.add('typing-out');

      // Ждём окончания анимации и чистим
      setTimeout(() => {
        typingEl.textContent = '';
        card.classList.remove('clicked');
        typingEl.classList.remove('typing-out');
        textVisible = false;
        isTyping = false;
      }, 500);
      return;
    }

    isTyping = false;
  });
});

function typeText(el, text) {
  return new Promise(resolve => {
    let i = 0;
    const speed = 20;
    function type() {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else {
        resolve();
      }
    }
    type();
  });
}
