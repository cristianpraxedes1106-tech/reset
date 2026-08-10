const STORAGE_KEY = "reset_app_state";


const defaultState = {

    streak: 0,

    bestStreak: 0,

    xp: 0,

    completedToday: false,

    lastCompletedDate: null,

    history: {},

    completedMissions: {},

    createdAt: null

};


let state;


function loadState() {

    const saved =
        localStorage.getItem(STORAGE_KEY);

    if (saved) {

        try {

            state = {
                ...defaultState,
                ...JSON.parse(saved)
            };

        } catch (error) {

            console.error(
                "Não foi possível carregar os dados.",
                error
            );

            state = {
                ...defaultState
            };
        }

    } else {

        state = {
            ...defaultState,

            createdAt:
                dayjs().format("YYYY-MM-DD")
        };
    }


    checkNewDay();

    saveState();
}


function saveState() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(state)
    );
}


function todayKey() {

    return dayjs().format("YYYY-MM-DD");

}


function checkNewDay() {

    const today = todayKey();

    const lastDate =
        state.lastCompletedDate;


    if (!lastDate) {

        state.completedToday = false;

        return;
    }


    if (lastDate !== today) {

        state.completedToday = false;
    }

}


function completeToday() {

    const today = todayKey();


    if (state.completedToday) {

        return false;
    }


    const yesterday =
        dayjs()
            .subtract(1, "day")
            .format("YYYY-MM-DD");


    if (state.lastCompletedDate === yesterday) {

        state.streak += 1;

    } else {

        state.streak = 1;
    }


    state.bestStreak =
        Math.max(
            state.bestStreak,
            state.streak
        );


    state.completedToday = true;

    state.lastCompletedDate = today;


    state.history[today] = true;


    addXP(10);

    saveState();


    return true;
}


function addXP(amount) {

    state.xp += amount;

    saveState();
}


function getLevel() {

    const level =
        Math.floor(state.xp / 100) + 1;


    const currentXP =
        state.xp % 100;


    return {

        level,

        currentXP,

        nextXP: 100,

        progress: currentXP

    };
}


function resetAllData() {

    localStorage.removeItem(
        STORAGE_KEY
    );

    location.reload();
}
