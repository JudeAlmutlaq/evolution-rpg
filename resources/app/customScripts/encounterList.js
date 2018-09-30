world.encounterList = {
    Grassland: {
        7: {possibleEncounters: [
            {
                creatures: [
                    {name: "elephant", x: 0, y: 0, width:300},
                    {name: "elephant", x: 300, y:300, width:300},
                ],
                weight: 20,
            },
            {
                creatures: [
                    {name:"armadillo", x: 0, y: 0, width: 150},
                    {name:"armadillo", x: 200, y: 200, width: 150},
                    {name:"armadillo", x: 400, y: 400, width: 150},
                ],
                weight: 80
            },
            //{creatures: ["zebra", "zebra", "zebra"], weight: 80}
        ], battleBack: "grassBattleBack"},
        2: []
    },
    Town: {}
};