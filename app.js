
// Exercise Controller 

var exerciseController = (function() {

    var Abs = function(id, description, minutes, sets, intensity, reps) {
        this.id = id;
        this.description = description;
        this.minutes = minutes;
        this.sets = sets;
        this.intensity = intensity;
        this.reps = reps;
    };

    var Arms = function(id, description, minutes, sets, intensity, reps) {
        this.id = id;
        this.description = description;
        this.minutes = minutes;
        this.sets = sets;
        this.intensity = intensity;
        this.reps = reps;
    };

    var Back = function(id, description, minutes, sets, intensity, reps) {
        this.id = id;
        this.description = description;
        this.minutes = minutes;
        this.sets = sets;
        this.intensity = intensity;
        this.reps = reps;
    };

    var Chest = function(id, description, minutes, sets, intensity, reps) {
        this.id = id;
        this.description = description;
        this.minutes = minutes;
        this.sets = sets;
        this.intensity = intensity;
        this.reps = reps;
    };

    var Legs = function(id, description, minutes, sets, intensity, reps) {
        this.id = id;
        this.description = description;
        this.minutes = minutes;
        this.sets = sets;
        this.intensity = intensity;
        this.reps = reps;
    };

    var Shoulders = function(id, description, minutes, sets, intensity, reps) {
        this.id = id;
        this.description = description;
        this.minutes = minutes;
        this.sets = sets;
        this.intensity = intensity;
        this.reps = reps;
    };

    var Triceps = function(id, description, minutes, sets, intensity, reps) {
        this.id = id;
        this.description = description;
        this.minutes = minutes;
        this.sets = sets;
        this.intensity = intensity;
        this.reps = reps;
    };



    var data = {
        allExercises: {
            abs: [],
            arms: [],
            back: [],
            chest: [],
            legs: [],
            shoulders: [],
            triceps: []
        },
        totalCal: {
            abs: 0,
            arms: 0,
            back: 0,
            chest: 0,
            legs: 0,
            shoulders: 0,
            triceps: 0
        }
    };


    return {
        addExercise: function(exercise, des, min, set, int, rep) {
            var newExercise, ID;

            // ID = last ID + 1

            // Create new ID
            if (data.allExercises[exercise].length > 0) {
                ID = data.allExercises[exercise][data.allExercises[exercise].length - 1].id + 1;
            } else {
                ID = 0
            }
            

            // Create new exercise based on the type
            if (exercise === 'abs') {
                newExercise = new Abs(ID, des, min, set, int, rep);
            } else if (exercise === 'arms') {
                newExercise = new Arms(ID, des, min, set, int, rep);
            } else if (exercise === 'back') {
                newExercise = new Back(ID, des, min, set, int, rep);
            } else if (exercise === 'chest') {
                newExercise = new Chest(ID, des, min, set, int, rep);
            } else if (exercise === 'legs') {
                newExercise = new Legs(ID, des, min, set, int, rep);
            } else if (exercise === 'shoulders') {
                newExercise = new Shoulders(ID, des, min, set, int, rep);
            } else {
                newExercise = new Triceps(ID, des, min, set, int, rep);
            }

            // Push the new exercise into our data structure 
            data.allExercises[exercise].push(newExercise);

            // Return the new element 
            return newExercise;

        },

        testing: function() {
            console.log(data);
        }
    };


})();





// UI Controller 


var UIController = (function() {

    var DOMstrings = {
        inputExercise: '.add-exercise',
        inputDescription: '.exercise-description',
        inputMinutes: '.num-min',
        inputSets: '.sets',
        inputIntensity: '.intensity',
        inputReps: '.reps',
        inputBtn: '.add-btn',
        exerciseContainer: '.workout-list'
    }

    return {
        getInput: function() {

            return {
                exercise: document.querySelector(DOMstrings.inputExercise).value, // Will be abs, arms, back, chest, legs, shoulder, or tricep
                description: document.querySelector(DOMstrings.inputDescription).value,
                minutes: document.querySelector(DOMstrings.inputMinutes).value,
                sets: document.querySelector(DOMstrings.inputSets).value,
                intensity: document.querySelector(DOMstrings.inputIntensity).value,
                reps: document.querySelector(DOMstrings.inputReps).value
            };
        },

        addListExercise: function(obj, exercise) {

            var html, newHtml, element;

            // Create HTML string with placeholder text

            html = '<div class="activity clearfix" id="exercise-%id%"><div class="activity-description">%description%</div><div class="right clearfix"><div class="activity-minutes">%minutes%</div><div class="activity-sets">%sets%</div><div class="activity-intensity">%intensity%</div><div class="activity-reps">%reps%</div><div class="activity-delete"><button class="activity-delete-btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'

            element = DOMstrings.exerciseContainer;

            // Replace the placeholder text with actual data

            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%minutes%', obj.minutes);
            newHtml = newHtml.replace('%sets%', obj.sets);
            newHtml = newHtml.replace('%intensity%', obj.intensity);
            newHtml = newHtml.replace('%reps%', obj.reps);

            // Insert the HTML into the DOM 
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        getDOMstrings: function() {
            return DOMstrings;
        }
    };


})();




// Global App Controller 

//exerciseCtrl = exerciseController, it's just in case you have to change the exerciseController variable, you only do it once
var controller = (function(exerciseCtrl, UICtrl) {  // Pass other two modules as arguements to the controller, so this controller knows about other two and connect them 


    var setupEventListners = function() {

        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);


        document.addEventListener('keypress', function(event) {
    
            if (event.keyCode === 13 || event.which === 13) {
                
                ctrlAddItem();
            }
    
        });
    };





    var ctrlAddItem = function() {

        var input, newExercise;

        // 1. Get the field input data

        var input = UICtrl.getInput();
        
    
        // 2. Add the item to the exercise controller
        var newExercise = exerciseController.addExercise(input.exercise, input.description, input.minutes, input.sets, input.intensity, input.reps);


        // 3. Add the new item to the UI

        UICtrl.addListExercise(newExercise, input.exercise);

        // 4. Calculate Calories

        // 5. Display Calories

        

    };

    return {
        init: function() {
            console.log('app has started');
            setupEventListners();
        }
    };

})(exerciseController, UIController);

controller.init();