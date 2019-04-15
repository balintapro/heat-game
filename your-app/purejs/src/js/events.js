export const bounce = () => {
    const plusPoints = document.getElementById("plus-points");
    plusPoints.classList.add('bounce-me');
    setTimeout(() => {
        plusPoints.classList.remove('bounce-me');
    }, 3000);
}

export const loose = (temp) => {
    const lose = document.getElementById("lose");
    const celsiusLose = document.getElementById("cels-lose");
    celsiusLose.textContent = temp;
    lose.classList.add('restart-me');
    setTimeout(() => {
        location.reload();
    }, 15000);
}