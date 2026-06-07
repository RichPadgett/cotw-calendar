% =============================================================================
% Decision Flow Rules
% Author: rpadgett
%
% These rules support a step-by-step UI. The API can pass in previous answers,
% and Prolog can return the next unanswered requirement question.
% =============================================================================

% -----------------------------------------------------------------------------
% Next Question
% -----------------------------------------------------------------------------
% next_question(Command, Answers, Question).
%
% Answers should be a list shaped like:
%
% [
%     answer(distinguish_clean_from_unclean, yes),
%     answer(individual_can_choose_food, no)
% ]
%
% This rule finds the first question in question_order/2 that has not been
% answered yet. The "!" tells Prolog to stop after the first match.

next_question(Command, Answers, Question) :-
    question_order(Command, Questions),
    member(Question, Questions),
    \+ member(answer(Question, _), Answers),
    !.

% -----------------------------------------------------------------------------
% Flow Complete
% -----------------------------------------------------------------------------
% The flow is complete when Prolog cannot find another unanswered question.

flow_complete(Command, Answers) :-
    question_order(Command, _),
    \+ next_question(Command, Answers, _).
