% =============================================================================
% COTW Commands - API Queries
% Author: rpadgett
%
% This file exposes JSON-producing predicates for the TypeScript API.
% =============================================================================

:- use_module(library(http/json)).

:- consult('main.pl').

% -----------------------------------------------------------------------------
% Command List
% -----------------------------------------------------------------------------

api_commands_json :-
    findall(CommandJson, command_summary_json(CommandJson), Commands),
    json_write(current_output, json([commands=Commands])).

command_summary_json(json([
    key=Command,
    title=Title
])) :-
    command(Command),
    command_title(Command, Title).

% -----------------------------------------------------------------------------
% Command Detail
% -----------------------------------------------------------------------------

api_command_json(Command) :-
    command_detail_json(Command, CommandJson),
    json_write(current_output, CommandJson).

command_detail_json(Command, json([
    key=Command,
    title=Title,
    normalObedience=NormalObedience,
    canObeyToday=CanObeyToday,
    firstQuestion=FirstQuestionJson,
    embodies=GreatCommands,
    blockedRequirements=BlockedRequirements,
    scriptureReferences=ScriptureReferences,
    studyNotes=StudyNotes
])) :-
    command(Command),
    command_title(Command, Title),
    normal_obedience(Command, NormalObedience),
    truth_json(can_obey_today(Command), CanObeyToday),
    optional_next_question_json(Command, [], FirstQuestionJson),
    embodies_list(Command, GreatCommands),
    requirement_json_list(blocked_requirement(Command), BlockedRequirements),
    findall(Reference, scripture_reference(Command, Reference), ScriptureReferences),
    findall(Note, study_note(Command, Note), StudyNotes).

% -----------------------------------------------------------------------------
% Command Evaluation
% -----------------------------------------------------------------------------

api_evaluate_command_json(Command, Answers) :-
    evaluate_command_json(Command, Answers, CommandJson),
    json_write(current_output, CommandJson).

evaluate_command_json(Command, Answers, json([
    key=Command,
    canObeyToday=CanObeyToday,
    flowComplete=FlowComplete,
    nextQuestion=NextQuestionJson,
    embodies=GreatCommands,
    blockedRequirements=BlockedRequirements,
    scriptureReferences=ScriptureReferences,
    studyNotes=StudyNotes
])) :-
    command(Command),
    truth_json(can_obey_today(Command), CanObeyToday),
    truth_json(flow_complete(Command, Answers), FlowComplete),
    optional_next_question_json(Command, Answers, NextQuestionJson),
    embodies_list(Command, GreatCommands),
    requirement_json_list(blocked_requirement(Command), BlockedRequirements),
    findall(Reference, scripture_reference(Command, Reference), ScriptureReferences),
    findall(Note, study_note(Command, Note), StudyNotes).

% -----------------------------------------------------------------------------
% JSON Helpers
% -----------------------------------------------------------------------------

truth_json(Goal, @(true)) :-
    call(Goal),
    !.

truth_json(_, @(false)).

optional_next_question_json(Command, Answers, QuestionJson) :-
    next_question(Command, Answers, Question),
    !,
    requirement_json(Question, QuestionJson).

optional_next_question_json(_, _, @(null)).

requirement_json_list(RequirementGoal, RequirementJsonList) :-
    findall(RequirementJson, (
        call(RequirementGoal, Requirement),
        requirement_json(Requirement, RequirementJson)
    ), RequirementJsonList).

requirement_json(Requirement, json([
    key=Requirement,
    title=Title,
    description=Description
])) :-
    requirement_title(Requirement, Title),
    requirement_description(Requirement, Description).
