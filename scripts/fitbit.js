var fitbit = {

    // Variables
    fitbitAccessToken : "empty",
    startDate : new Date(),
    lastKnownTotalSteps : 0,
    lastReceivedTotalSteps : 0,
    
    // Functions
    onload : function(){

        var aDate = new Date();
        aDate.setHours(23);
        aDate.setMinutes(59);
        aDate.setSeconds(59);
        aDate.setMilliseconds(999);
        var tStamp = aDate.getTime();
        tStamp = tStamp - 86400000; //86400000 is the amount of miliseconds in a day

        fitbit.setStartDate(new Date(tStamp)); //set the date to count steps from (i.e. right before the date that CandyBoxF was first accessed)

        fitbit.setFitbitAccessToken(); // Set the token for all future API calls
        fitbit.setLastKnownTotalSteps(0);
        fitbit.setLastReceivedTotalSteps(0);
    },

    setFitbitAccessToken : function() {

        var fragmentQueryParameters = {};
        window.location.hash.slice(1).replace(
            new RegExp("([^?=&]+)(=([^&]*))?", "g"),
            function($0, $1, $2, $3) { fragmentQueryParameters[$1] = $3; }
        );

        this.fitbitAccessToken = fragmentQueryParameters.access_token;
    },

    setStartDate : function(value) {
        this.startDate = value;
    },

    setLastKnownTotalSteps : function(value) {
        this.lastKnownTotalSteps = value;
    },

    setLastReceivedTotalSteps : function(value) {
        this.lastReceivedTotalSteps = value;
    },

    callAPI : function() {
        fetch(
            'https://api.fitbit.com/1/user/-/activities/steps/date/today/30d.json',
            {
                headers: new Headers({
                    'Authorization': 'Bearer ' + fitbit.fitbitAccessToken
                }),
                mode: 'cors',
                method: 'GET'
            }
        ).then(fitbit.processResponse)
        .then(fitbit.processSteps)
        .catch(function(error) {
            console.log(error);
        });
    },

    processResponse : function(res) {

        if (!res.ok) {
            throw new Error('Fitbit API request failed: ' + res);
        }
        return res.json();

    },

    processSteps : function(json) {

        var aSteps = json['activities-steps']
        fitbit.lastReceivedTotalSteps = 0;

        for(var i = 0; i < aSteps.length; i++) {
            var aDate = new Date(aSteps[i].dateTime);
            if(aDate.getTime() > fitbit.startDate.getTime()) {
                fitbit.lastReceivedTotalSteps += Number(aSteps[i].value);
            }
        }

        if(fitbit.lastReceivedTotalSteps > fitbit.lastKnownTotalSteps) {
            var difference = fitbit.lastReceivedTotalSteps - fitbit.lastKnownTotalSteps;
            if(objects.list.oldAmulet.have == false) candies.setNbrOwned(candies.nbrOwned + difference);
            else candies.setNbrOwned(candies.nbrOwned + candies.newCandies*3);
            fitbit.lastKnownTotalSteps = fitbit.lastReceivedTotalSteps;
        }

    }

};
