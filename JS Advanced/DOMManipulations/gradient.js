function attachGradientEvents() {
    let box = document.getElementById('gradient');
    box.addEventListener('mousemove', gradientPercentage);
    box.addEventListener('mouseout', clearGradient);

    function gradientPercentage(event) {
        let offset = event.offsetX / (event.target.clientWidth - 1);
        let percent = Math.trunc(offset * 100);
        document.getElementById('result').innerText = percent + '%';
    }

    function clearGradient() {
        document.getElementById('result').textContent = '';
    }
}