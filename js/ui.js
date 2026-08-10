const elements = {

    streak:
        document.getElementById(
            "streakValue"
        ),

    xp:
        document.getElementById(
            "xpValue"
        ),

    level:
        document.getElementById(
            "levelNumber"
        ),

    levelName:
        document.getElementById(
            "levelName"
        ),

    xpFill:
        document.getElementById(
            "xpFill"
        ),

    currentXP:
        document.getElementById(
            "currentLevelXP"
        ),

    nextXP:
        document.getElementById(
            "nextLevelXP"
        ),

    missionTitle:
        document.getElementById(
            "missionTitle"
        ),

    missionDescription:
        document.getElementById(
            "missionDescription"
        ),

    missionButton:
        document.getElementById(
            "completeMission"
        ),

    missionCount:
        document.getElementById(
            "missionCount"
        ),

    missionCard:
        document.getElementById(
            "missionCard"
        ),

    calendar:
        document.getElementById(
            "calendar"
        ),

    toast:
        document.getElementById(
            "toast"
        ),

    toastText:
        document.getElementById(
            "toastText"
        )
};


const levelNames = [

    "Semente",
    "Broto",
    "Planta",
    "Árvore",
    "Floresta",
    "Bosque",
    "Jardim",
    "Ecosistema",
    "Horizonte",
    "Constelação"

];


function render() {

    renderStats();

    renderLevel();

    renderMission();

    renderCalendar();


    lucide.createIcons();
}


function renderStats() {

    elements.streak.textContent =
        state.streak;


    elements.xp.textContent =
        state.xp;
}


function renderLevel() {

    const level =
        getLevel();


    elements.level.textContent =
        level.level;


    elements.levelName.textContent =
        levelNames[
            Math.min(
                level.level - 1,
                levelNames.length - 1
            )
        ];


    elements.currentXP.textContent =
        `${level.currentXP} XP`;


    elements.nextXP.textContent =
        `${level.nextXP} XP`;


    gsap.to(
        elements.xpFill,
        {
            width:
                `${level.progress}%`,
            duration: 0.8,
            ease: "power2.out"
        }
    );
}


function renderMission() {

    const mission =
        getDailyMission();


    const completed =
        missionCompletedToday();


    elements.missionTitle.textContent =
        mission.title;


    elements.missionDescription.textContent =
        mission.description;


    elements.missionCount.textContent =
        completed
            ? "1/1"
            : "0/1";


    elements.missionButton.disabled =
        completed;


    elements.missionButton.innerHTML =
        completed

            ? `
                <i data-lucide="check-circle"></i>
                Concluída
              `

            : `
                <i data-lucide="check"></i>
                Concluir
              `;


    if (completed) {

        elements.missionCard.classList.add(
            "mission-complete"
        );

    }
}


function renderCalendar() {

    elements.calendar.innerHTML = "";


    for (
        let i = 13;
        i >= 0;
        i--
    ) {

        const date =
            dayjs().subtract(
                i,
                "day"
            );


        const key =
            date.format(
                "YYYY-MM-DD"
            );


        const completed =
            state.history[key] === true;


        const isToday =
            key === todayKey();


        const day =
            document.createElement(
                "div"
            );


        day.className =
            "day";


        if (completed) {

            day.classList.add(
                "completed"
            );
        }


        if (isToday) {

            day.classList.add(
                "today"
            );
        }


        day.innerHTML = `

            <span class="day-number">
                ${date.date()}
            </span>

            <span class="day-label">
                ${date.format("ddd")}
            </span>

        `;


        elements.calendar.appendChild(
            day
        );
    }
}


function showToast(text) {

    elements.toastText.textContent =
        text;


    gsap.killTweensOf(
        elements.toast
    );


    gsap.fromTo(

        elements.toast,

        {
            y: -100,
            opacity: 0
        },

        {
            y: 0,
            opacity: 1,
            duration: 0.45,
            ease: "back.out"
        }

    );


    setTimeout(() => {

        gsap.to(

            elements.toast,

            {
                y: -100,
                opacity: 0,
                duration: 0.3
            }

        );

    }, 1800);
}


function animateXP() {

    gsap.fromTo(

        elements.xp,

        {
            scale: 1
        },

        {
            scale: 1.3,
            duration: 0.2,
            yoyo: true,
            repeat: 1
        }

    );
}


function celebration() {

    const rect =
        elements.missionCard
            .getBoundingClientRect();


    for (
        let i = 0;
        i < 12;
        i++
    ) {

        const particle =
            document.createElement(
                "div"
            );


        particle.textContent =
            ["✦", "✧", "•", "✦"][
                Math.floor(
                    Math.random() * 4
                )
            ];


        particle.style.position =
            "fixed";


        particle.style.left =
            `${rect.left + rect.width / 2}px`;


        particle.style.top =
            `${rect.top + 40}px`;


        particle.style.pointerEvents =
            "none";


        particle.style.zIndex =
            "999";


        document.body.appendChild(
            particle
        );


        gsap.to(

            particle,

            {
                x:
                    (Math.random() - 0.5) *
                    220,

                y:
                    -Math.random() *
                    160,

                opacity: 0,

                scale:
                    Math.random() * 1.5 + 0.5,

                duration:
                    Math.random() * 0.7 + 0.6,

                ease: "power2.out",

                onComplete() {

                    particle.remove();

                }
            }

        );
    }
}
