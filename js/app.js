document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadState();

        render();

        setupEvents();

        registerServiceWorker();

        animateEntrance();

    }
);


function setupEvents() {

    elements.missionButton.addEventListener(
        "click",
        handleMission
    );


    document
        .getElementById("pauseButton")
        .addEventListener(
            "click",
            openPause
        );


    document
        .getElementById("closePause")
        .addEventListener(
            "click",
            closePause
        );


    document
        .querySelector(".modal-backdrop")
        .addEventListener(
            "click",
            closePause
        );


    document
        .querySelectorAll(".option-button")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const action =
                        button.dataset.action;


                    handlePauseAction(
                        action
                    );

                }
            );

        });


    document
        .getElementById("settingsButton")
        .addEventListener(
            "click",
            () => {

                const confirmed =
                    confirm(
                        "Apagar todo o progresso deste dispositivo?"
                    );


                if (confirmed) {

                    resetAllData();

                }

            }
        );


    document
        .querySelectorAll(".nav-item")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    clickSound();

                }
            );

        });

}


function handleMission() {

    if (
        missionCompletedToday()
    ) {

        return;
    }


    clickSound();


    const oldLevel =
        getLevel().level;


    const completed =
        completeMission();


    if (!completed) {

        return;
    }


    const todayCompleted =
        completeToday();


    render();


    animateXP();

    celebration();

    successSound();


    showToast(
        "+20 XP • Missão concluída!"
    );


    const newLevel =
        getLevel().level;


    if (
        newLevel > oldLevel
    ) {

        setTimeout(() => {

            levelUpSound();

            showToast(
                `✨ Nível ${newLevel}!`
            );

        }, 900);

    }
}


let timerInterval = null;

let remainingSeconds = 120;


function openPause() {

    const modal =
        document.getElementById(
            "pauseModal"
        );


    modal.classList.remove(
        "hidden"
    );


    remainingSeconds = 120;

    updateTimer();


    timerInterval =
        setInterval(
            updateTimer,
            1000
        );


    gsap.fromTo(

        ".modal-box",

        {
            y: 300
        },

        {
            y: 0,
            duration: 0.45,
            ease: "power3.out"
        }

    );

}


function closePause() {

    const modal =
        document.getElementById(
            "pauseModal"
        );


    modal.classList.add(
        "hidden"
    );


    clearInterval(
        timerInterval
    );

}


function updateTimer() {

    const minutes =
        Math.floor(
            remainingSeconds / 60
        );


    const seconds =
        remainingSeconds % 60;


    document.getElementById(
        "timer"
    ).textContent =

        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;


    if (
        remainingSeconds <= 0
    ) {

        clearInterval(
            timerInterval
        );


        successSound();

        showToast(
            "Pausa concluída ✨"
        );

        return;
    }


    remainingSeconds--;
}


function handlePauseAction(
    action
) {

    const messages = {

        breathe:
            "Respire devagar por alguns ciclos.",

        walk:
            "Levante e mude de ambiente.",

        music:
            "Coloque uma música e deixe sua atenção ir para ela.",

        water:
            "Pegue um pouco de água e faça uma pequena pausa."

    };


    showToast(
        messages[action]
    );


    clickSound();
}


function animateEntrance() {

    gsap.from(
        ".hero-card",
        {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out"
        }
    );


    gsap.from(
        ".stat-card",
        {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            delay: 0.15
        }
    );


    gsap.from(
        ".level-card",
        {
            y: 20,
            opacity: 0,
            duration: 0.5,
            delay: 0.3
        }
    );


    gsap.from(
        ".mission-card",
        {
            y: 20,
            opacity: 0,
            duration: 0.5,
            delay: 0.4
        }
    );
}


function registerServiceWorker() {

    if (
        "serviceWorker" in navigator
    ) {

        navigator.serviceWorker
            .register("sw.js")
            .catch(error => {

                console.log(
                    "Service Worker não registrado:",
                    error
                );

            });

    }
}
