document.getElementById('birthdateForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const day = parseInt(document.getElementById('day').value);
    const month = parseInt(document.getElementById('month').value);
    const year = parseInt(document.getElementById('year').value);

    const birthDate = new Date(year, month - 1, day);
    const now = new Date();

    const dayOfWeek = getDayOfWeek(birthDate);
    const isLeapYear = checkLeapYear(year);
    const age = calculateAge(birthDate, now);

    const output = `
        <p>Вы родились в ${dayOfWeek}.</p>
        <p>${year} год ${isLeapYear ? 'является' : 'не является'} високосным.</p>
        <p>Вам ${age} лет.</p>
        <p>Дата вашего рождения:</p>
        ${formatDateAsDigits(day, month, year)}
    `;

    document.getElementById('output').innerHTML = output;
});

function getDayOfWeek(date) {
    const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    return days[date.getDay()];
}

function checkLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function calculateAge(birthDate, now) {
    let age = now.getFullYear() - birthDate.getFullYear();
    const monthDifference = now.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && now.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

function formatDateAsDigits(day, month, year) {
    const digits = `${padZero(day)} ${padZero(month)} ${year}`;
    return `<div class="digits">${digits.split('').map(digit => `<span class="digit">${digit}</span>`).join('')}</div>`;
}

function padZero(num) {
    return num < 10 ? '0' + num : num;
}
