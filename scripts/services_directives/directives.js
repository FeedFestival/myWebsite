(function () {
    'use strict';

    app.directive('paragraphQuestions', function () {
        var obj = {
            restrict: 'E',
            scope: {
                p: '@paragraph'
            },
            template: '<div ng-include="\'scripts/services_directives/paragraphQuestions.html\'"></div>',

            controller: controller
        };

        controller.$inject = [
            '$scope',
            '$element',
            '$attrs',
            '$location',
            'utils'
        ];

        function controller(
            $scope,
            $element,
            $attrs,
            $location,
            utils) {

            var paragraphId = parseInt($scope.p);

            $scope.paragraph = {};

            if (paragraphId == 1) {
                $scope.paragraph = {
                    id: 1,
                    answersCount: 1,
                    hasAnswers: true,
                    answeredQuestions: [
                        {
                            id: 1,
                            //QuestionsCount: 1,
                            //Questions: [
                            //    {
                            //        id: 3,
                            //        QuestionsCount: 0
                            //    }
                            //],
                            //
                            Date: new Date(),
                            User: {
                                id: 1,
                                Name: "Anonymouse",
                                isAnonymous: true
                            },
                            Content: "how can i cahow can i cahow can i cahow can i cahow can i cahow can i cahow can i cahow can i cahow can i cahow can i cahow can i cahow can i ca",
                            Answers: [
                                {
                                    id: 45,
                                    Date: new Date(),
                                    User: {
                                        id: 3,
                                        Name: "Anonymouse45",
                                        isAnonymous: true
                                    },
                                    Content: "you can shut up!",
                                }
                            ]
                        }
                    ]
                };

                // get Questions and Answers only NUMBERS from server by paragraph id

                // get questions and answers from server by paragraph id
                $scope.paragraph.Questions = [
                        {
                            id: 1,
                            QuestionsCount: 1
                        },
                        {
                            id: 2,
                            QuestionsCount: 0
                        }
                ];

            }

            $scope.expandOptions = function (paragraph, val) {
                if (val == 0) {
                    paragraph.expandQuestions = !paragraph.expandQuestions;
                    paragraph.expandAnswers = false;
                } else {
                    paragraph.expandQuestions = false;
                    paragraph.expandAnswers = !paragraph.expandAnswers;
                }
            };
        };

        return obj;
    });

    app.directive('questionsAndAnswers', function () {
        var obj = {
            restrict: 'E',
            scope: {
                q: '@questionId'
            },
            template: '<div ng-include="\'scripts/services_directives/QaA.html\'"></div>',

            controller: controller
        };

        controller.$inject = [
            '$scope',
            '$element',
            '$attrs',
            '$location',
            'utils'
        ];

        function controller($scope, $element, $attrs, $location, utils) {

            // get question id from sever by id
            var questionId = parseInt($scope.q);

            if (questionId == 1) {
                $scope.question = {
                    id: 1,
                    QuestionsCount: 1,
                    Questions: [
                        {
                            id: 3,
                            QuestionsCount: 0
                        }
                    ],
                    //
                    Date: new Date(),
                    User: {
                        id: 1,
                        Name: "Anonymouse",
                        isAnonymous: true
                    },
                    Content: "how can i cahow can i cahow can i cahow can i cahow can i cahow can i cahow can i cahow can i cahow can i cahow can i cahow can i cahow can i ca",
                    Answers: [
                        {
                            id: 45,
                            Date: new Date(),
                            User: {
                                id: 3,
                                Name: "Anonymouse45",
                                isAnonymous: true
                            },
                            Content: "you can shut up!",
                        }
                    ]
                };
            } else if (questionId == 2) {
                $scope.question = {
                    id: 2,
                    QuestionsCount: 0,
                    //
                    Date: new Date(),
                    User: {
                        id: 77,
                        Name: "Anonymouse412412",
                        isAnonymous: true
                    },
                    Content: "how can i cahow can i cahow can i ca ?? ",
                };
            } else if (questionId == 3) {
                $scope.question = {
                    id: 3,
                    QuestionsCount: 1,
                    Questions: [
                        {
                            id: 4,
                            QuestionsCount: 0
                        }
                    ],
                    //
                    Date: new Date(),
                    User: {
                        id: 77,
                        Name: "Anonymous666",
                        isAnonymous: true
                    },
                    Content: " What is your problem bro ?",
                };
            } else if (questionId == 4) {
                $scope.question = {
                    id: 4,
                    QuestionsCount: 0,
                    //
                    Date: new Date(),
                    User: {
                        id: 77,
                        Name: "Anonymous666",
                        isAnonymous: true
                    },
                    Content: " What is your problem bro ?",
                };
            }
        };

        return obj;
    })

})();