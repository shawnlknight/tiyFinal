app.factory('wod', ['$rootScope', function ($rootScope) {

    var randomWod = [
        {
            title: "Fran",
            content: "21-15-9 of 95# thrusters & pull ups"
        },
        {
            title: "Helen",
            content: "3 rounds of 400 meter run, 21 kettlebell swings, 12 pull ups"
        },
        {
            title: "Cindy",
            content: "20 minute AMRAP of 5 pull ups, 10 push ups, 15 air squats"
        }

    ];

   


    return randomWod;
}]);