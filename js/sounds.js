let audioContext = null;


function getAudioContext() {

    if (!audioContext) {

        audioContext =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();

    }


    if (
        audioContext.state ===
        "suspended"
    ) {

        audioContext.resume();
    }


    return audioContext;
}


function playTone(
    frequency,
    duration = 0.1,
    type = "sine"
) {

    const ctx =
        getAudioContext();


    const oscillator =
        ctx.createOscillator();


    const gain =
        ctx.createGain();


    oscillator.type = type;

    oscillator.frequency.value =
        frequency;


    gain.gain.setValueAtTime(
        0.001,
        ctx.currentTime
    );


    gain.gain.exponentialRampToValueAtTime(
        0.12,
        ctx.currentTime + 0.01
    );


    gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + duration
    );


    oscillator.connect(gain);

    gain.connect(ctx.destination);


    oscillator.start();

    oscillator.stop(
        ctx.currentTime + duration
    );
}


function successSound() {

    playTone(523.25, 0.12);

    setTimeout(() => {

        playTone(659.25, 0.12);

    }, 100);

    setTimeout(() => {

        playTone(783.99, 0.18);

    }, 200);
}


function clickSound() {

    playTone(
        300,
        0.06,
        "square"
    );
}


function levelUpSound() {

    playTone(392, 0.1);

    setTimeout(() => {
        playTone(523, 0.1);
    }, 100);

    setTimeout(() => {
        playTone(659, 0.15);
    }, 200);

}
