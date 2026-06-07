% =============================================================================
% Clean Meats Smoke Tests
% Author: rpadgett
%
% These are tiny checks to prove the example knowledge base loads and answers
% the first important questions.
% =============================================================================

:- begin_tests(clean_meats).

:- consult('../main.pl').

test(clean_meats_can_be_obeyed_today) :-
    can_obey_today(clean_meats).

test(clean_meats_has_no_blocked_requirements, true(Requirements == [])) :-
    findall(Requirement, blocked_requirement(clean_meats, Requirement), Requirements).

test(clean_meats_embodies_love_god, true(GreatCommands == [love_god])) :-
    embodies_list(clean_meats, GreatCommands).

test(clean_meats_next_question_starts_at_first_requirement) :-
    next_question(clean_meats, [], distinguish_clean_from_unclean).

test(clean_meats_next_question_resumes_from_answers) :-
    next_question(
        clean_meats,
        [answer(distinguish_clean_from_unclean, yes)],
        individual_can_choose_food
    ).

test(clean_meats_flow_complete_after_all_answers) :-
    flow_complete(
        clean_meats,
        [
            answer(distinguish_clean_from_unclean, yes),
            answer(individual_can_choose_food, yes)
        ]
    ).

:- end_tests(clean_meats).
