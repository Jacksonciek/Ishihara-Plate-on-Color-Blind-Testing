function answer(cor_ans, usr_ans, stats) {
    this.cor_ans = cor_ans;
    this.usr_ans = usr_ans;
    this.status = stats ? "Correct" : "Incorrect";
}

var app = angular.module('CBApp', ["ui.router"]);
var time;
var nama_gambar = ['kotak', 'segitiga', 'bintang', 'hati', 'bebek'];

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'home.html'
        })
        .state('about', {
            url: '/about',
            templateUrl: 'about.html' 
        })
        .state('guide', {
            url: '/guide',
            templateUrl: 'guide.html' 
        })
		.state('test', {
			url: '/test',
			templateUrl: 'layout2.html', // Ensure this path is correct
			controller: 'TestController' // Add a controller if needed
		});		
});

// Define controllers if necessary
app.controller('HomeController', function($scope) {
    // Logic for Home page
});

app.controller('AboutController', function($scope) {
    // Logic for About page
});

app.controller('GuideController', function($scope) {
    // Logic for Guide page
});

// Add TestController here
app.controller('TestController', ['$scope', '$stateParams', function($scope, $stateParams) {
    $scope.bundle_id = $stateParams.bundle_id || 0; // Default to 0 if undefined
    $scope.start($scope.bundle_id);

    function createDialog(title, template) {
        return {
            title: title,
            template: template,
            success: {
                label: 'Start Test',
                fn: function() { alert(title + ' Started'); }
            }
        };
    }

    $scope.openStandardTest = function() {
        createDialog('Standard Test', '<p>This is the Standard Color Blind Test.</p>');
    };

    $scope.openProtanopiaTest = function() {
        createDialog('Protanopia Test', '<p>This is the Protanopia Test.</p>');
    };

    $scope.openDeuteranopiaTest = function() {
        createDialog('Deuteranopia Test', '<p>This is the Deuteranopia Test.</p>');
    };

    $scope.openTritanopiaTest = function() {
        createDialog('Tritanopia Test', '<p>This is the Tritanopia Test.</p>');
    };
}]);

function resetTimer() {
    window.clearTimeout(time);
}

function Timer() {
    document.getElementById('image').style.visibility = "hidden";
}

app.directive('test', ['testFactory', function(testFactory) {
    return {
        restrict: 'AE',
        scope: {
            bundleId: '=' // Bind bundleId from parent scope
        },
        templateUrl: 'layout2.html',
        link: function(scope) {
            scope.id = 0;
            scope.testOver = false;
            scope.inProgress = false;
            scope.score = 0;
            scope.result = [];

            scope.start = function() {
                scope.inProgress = true;
                scope.many = 0;
                scope.problem = scope.bundleId === 0 ? 24 : 10; // Assuming this is the logic
                scope.getQuestion();
            };

            scope.getQuestion = function() {
                document.getElementById("f").focus();
                var q = testFactory.getQuestion(scope.bundleId, scope.id);
                if (q) {
                    scope.question = q.question;
                    scope.answer = q.answer;
                    scope.many++;
                    scope.answerMode = true;
                    document.getElementById("submit_button").disabled = false;
                } else {
                    scope.score = Math.round((scope.score / scope.many) * 10000) / 100;
                    scope.testOver = true;
                }
            };

            scope.reset = function() {
                scope.inProgress = false;
                scope.id = 0;
                scope.score = 0;
                scope.result = [];
                scope.testOver = false;
                scope.start();
            };

            scope.checkAnswer = function() {
                var ans = $('input[name=answer]').val();
                if (!ans) return; // Handle case where no answer is provided

                scope.correctAns = ans === scope.answer;
                if (scope.correctAns) {
                    scope.score++;
                }

                scope.result.push(new answer(scope.answer, ans, scope.correctAns));
                scope.answerMode = false;
                document.getElementById("submit_button").disabled = true;
                scope.id++;
                scope.getQuestion();
            };

            // Start the test initially if bundleId is set
            if (scope.bundleId) {
                scope.start();
            }
        }
    };
}]);

app.factory('testFactory', function () {
    var questions = [[], [], [], []]; // Initialize a 2D array for questions

    // Populate questions for different bundles
    for (var i = 0; i < 24; i++) {
        questions[0][i] = {
            color: [[64, 135, 64], [86, 50, 86], [36, 109, 36], [270, 169, 0], [107, 39, 107]],
            answer: -1
        };
    }

    for (var i = 0; i < 10; i++) {
        questions[1][i] = {
            color: [[44, 128, 44], [243, 327, 243], [299, 209, 299], [60, 120, 60]],
            answer: -1
        };
        questions[2][i] = {
            color: [[4, 138, 4], [212, 127, 52], [303, 148, 349], [337, 169, 270], [42, 130, 42]],
            answer: -1
        };
        questions[3][i] = {
            color: [[176, 98, 176], [322, 30, 332], [170, 120, 170], [343, 33, 343], [0, 300, 0]],
            answer: -1
        };
    }

    return {
        getQuestion: function (bundle_id, id) {
            if (id < questions[bundle_id].length) {
                $('input[name=answer]').val('');
                document.getElementById('image').style.visibility = "visible";

                var ind = Math.round(1 + Math.random() * questions[bundle_id][id].color.length);
                var x = 1 + Math.round(Math.random() * 3);

                // Determine question type and generate the answer
                if (ind === 1) {
                    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                    var number = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                    ishi_buat(questions[bundle_id][id].color[x][0], questions[bundle_id][id].color[x][1], questions[bundle_id][id].color[x][2], number, 0);
                    questions[bundle_id][id].answer = number;
                } else if (ind === 2) {
                    var number = nama_gambar[Math.round(Math.random() * 3)];
                    ishi_buat(questions[bundle_id][id].color[x][0], questions[bundle_id][id].color[x][1], questions[bundle_id][id].color[x][2], number, 2);
                    questions[bundle_id][id].answer = number;
                } else {
                    var number = Math.round(Math.random() * 99);
                    if (number < 10) number += 10;
                    ishi_buat(questions[bundle_id][id].color[x][0], questions[bundle_id][id].color[x][1], questions[bundle_id][id].color[x][2], number, 1);
                    questions[bundle_id][id].answer = number;
                }
                return questions[bundle_id][id];
            } else {
                return false;
            }
        }
    };
});
