const missions = [

    {
        id: "awareness",
        title: "Perceba como você está",
        description:
            "Pare por alguns minutos e observe como você está se sentindo, sem se julgar.",
        xp: 10
    },

    {
        id: "environment",
        title: "Mude de ambiente",
        description:
            "Levante e passe alguns minutos em outro lugar da casa.",
        xp: 10
    },

    {
        id: "activity",
        title: "Faça outra coisa",
        description:
            "Escolha uma atividade que você gosta e dedique alguns minutos a ela.",
        xp: 10
    },

    {
        id: "outside",
        title: "Pegue um pouco de ar",
        description:
            "Se puder, saia um pouco do ambiente em que está e caminhe.",
        xp: 10
    },

    {
        id: "screen",
        title: "Faça uma pausa da tela",
        description:
            "Fique alguns minutos longe do celular e faça outra atividade.",
        xp: 10
    },

    {
        id: "reflection",
        title: "Escreva uma linha",
        description:
            "Anote como você está se sentindo hoje. Não precisa ser perfeito.",
        xp: 10
    },

    {
        id: "sleep",
        title: "Prepare seu descanso",
        description:
            "Organize seu ambiente para uma noite mais tranquila.",
        xp: 10
    }

];


function getDailyMission() {

    const day =
        dayjs().dayOfYear?.() ||
        dayjs().date();

    const index =
        day % missions.length;


    return missions[index];
}


function missionCompletedToday() {

    return state.completedMissions[
        todayKey()
    ] === true;
}


function completeMission() {

    if (missionCompletedToday()) {

        return false;
    }


    const mission =
        getDailyMission();


    state.completedMissions[
        todayKey()
    ] = true;


    addXP(mission.xp);


    saveState();


    return true;
}
