world.encounterList = {
    Grassland: {
        7: {possibleEncounters: [
            {
                creatures: [
                    {name: "redFox", x: 100, y: 450, width:150},
                    {name: "redFox", x: 350, y:500, width:150},
                ],
                weight: 50,
            },
            {
                creatures: [
                    {name:"armadillo", x: 50, y: 550, width: 150},
                    {name:"armadillo", x: 650, y: 550, width: 150},
                    {name:"armadillo", x: 350, y: 600, width: 150},
                ],
                weight: 50
            },
            //{creatures: ["zebra", "zebra", "zebra"], weight: 80}
        ], battleBack: "shortGrass"},
        8: {possibleEncounters: [
                {
                    creatures: [
                        {name: "brownAntelopeFemale", x: 100, y: 400, width:180},
                        {name: "brownAntelopeMale", x: 350, y:420, width:180},
                    ],
                    weight: 50,
                },
                {
                    creatures: [
                        {name:"brownBunny", x: 50, y: 500, width: 150},
                        {name:"brownBunny", x: 550, y: 500, width: 150},
                        {name:"brownBunny", x: 300, y: 530, width: 150},
                    ],
                    weight: 50
                },
                //{creatures: ["zebra", "zebra", "zebra"], weight: 80}
            ], battleBack: "tallGrass"},
    },
    Town: {}
};