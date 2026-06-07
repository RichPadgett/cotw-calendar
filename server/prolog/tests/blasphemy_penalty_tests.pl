% =============================================================================
% Blasphemy Penalty Smoke Tests
% Author: rpadgett
%
% These checks verify the cannot-obey-as-written path.
% =============================================================================

:- begin_tests(blasphemy_penalty).

:- consult('../main.pl').

test(blasphemy_penalty_cannot_be_obeyed_today, [fail]) :-
    can_obey_today(blasphemy_penalty).

test(blasphemy_penalty_has_blocked_requirements, true(Requirements == [
    recognized_torah_court,
    priests_levites_and_judge,
    authorized_public_penalty
])) :-
    findall(Requirement, blocked_requirement(blasphemy_penalty, Requirement), Requirements).

test(blasphemy_penalty_embodies_love_god_and_neighbor, true(GreatCommands == [love_god, love_neighbor])) :-
    embodies_list(blasphemy_penalty, GreatCommands).

test(blasphemy_penalty_next_question_starts_at_first_requirement) :-
    next_question(blasphemy_penalty, [], recognized_torah_court).

test(blasphemy_penalty_flow_complete_after_all_answers) :-
    flow_complete(
        blasphemy_penalty,
        [
            answer(recognized_torah_court, no),
            answer(priests_levites_and_judge, no),
            answer(authorized_public_penalty, no)
        ]
    ).

:- end_tests(blasphemy_penalty).
