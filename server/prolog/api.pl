% =============================================================================
% COTW Commands - API Queries
% Author: rpadgett
%
% This file exposes JSON-producing predicates for the TypeScript API.
% =============================================================================

:- use_module(library(http/json)).
:- use_module(library(random)).

:- consult('main.pl').

% -----------------------------------------------------------------------------
% Command List
% -----------------------------------------------------------------------------

api_commands_json :-
    findall(CommandJson, command_summary_json(CommandJson), Commands),
    json_write(current_output, json([commands=Commands])).

% Defines api commands by category json.
api_commands_by_category_json(Category) :-
    findall(CommandJson, (
        command_category(Command, Category),
        command_summary_json_for(Command, CommandJson)
    ), Commands),
    json_write(current_output, json([commands=Commands])).

% Defines api commands by fact json.
api_commands_by_fact_json(Fact) :-
    findall(CommandJson, (
        command_fact(Command, Fact),
        command_summary_json_for(Command, CommandJson)
    ), Commands),
    json_write(current_output, json([commands=Commands])).

% Defines api commands by facts json.
api_commands_by_facts_json(Facts) :-
    findall(CommandJson, (
        command_has_all_facts(Command, Facts),
        command_summary_json_for(Command, CommandJson)
    ), Commands),
    json_write(current_output, json([commands=Commands])).

% Defines api commands by applicability json.
api_commands_by_applicability_json(Applicability) :-
    findall(CommandJson, (
        applies_if(Command, Applicability),
        command_summary_json_for(Command, CommandJson)
    ), Commands),
    json_write(current_output, json([commands=Commands])).

api_commands_grouped_by_category_json :-
    setof_or_empty(Category, Command^command_category(Command, Category), Categories),
    findall(CategoryJson, (
        member(Category, Categories),
        commands_for_category_json(Category, CategoryJson)
    ), CategoryGroups),
    json_write(current_output, json([categories=CategoryGroups])).

api_random_command_json :-
    findall(Command, command(Command), Commands),
    random_command_json(Commands).

% Defines api random command by category json.
api_random_command_by_category_json(Category) :-
    findall(Command, command_category(Command, Category), Commands),
    random_command_json(Commands).

% Defines api random command by fact json.
api_random_command_by_fact_json(Fact) :-
    findall(Command, command_fact(Command, Fact), Commands),
    random_command_json(Commands).

% Defines api random command by facts json.
api_random_command_by_facts_json(Facts) :-
    findall(Command, command_has_all_facts(Command, Facts), Commands),
    random_command_json(Commands).

% Defines api random command by applicability json.
api_random_command_by_applicability_json(Applicability) :-
    findall(Command, applies_if(Command, Applicability), Commands),
    random_command_json(Commands).

api_random_category_json :-
    setof_or_empty(Category, Command^command_category(Command, Category), Categories),
    random_category_json(Categories).

api_random_command_in_random_category_json :-
    setof_or_empty(Category, Command^command_category(Command, Category), Categories),
    random_command_in_random_category_json(Categories).

% Defines command summary json.
command_summary_json(json([
    key=Command,
    title=Title,
    categories=Categories
])) :-
    command(Command),
    command_summary_json_for(Command, json([
        key=Command,
        title=Title,
        categories=Categories
    ])).

% Defines command summary json for.
command_summary_json_for(Command, json([
    key=Command,
    title=Title,
    categories=Categories
])) :-
    command_title(Command, Title),
    setof_or_empty(Category, command_category(Command, Category), Categories).

% Defines commands for category json.
commands_for_category_json(Category, json([
    key=Category,
    commands=Commands
])) :-
    findall(CommandJson, (
        command_category(Command, Category),
        command_summary_json_for(Command, CommandJson)
    ), Commands).

% -----------------------------------------------------------------------------
% Command Detail
% -----------------------------------------------------------------------------

api_command_json(Command) :-
    command_detail_json(Command, CommandJson),
    json_write(current_output, CommandJson).

% Defines command detail json.
command_detail_json(Command, json([
    key=Command,
    title=Title,
    requirement=Requirement,
    requirements=Requirements,
    reminderText=ReminderText,
    categories=Categories,
    facts=Facts,
    appliesIf=AppliesIf,
    embodies=GreatCommands,
    scriptureReferences=ScriptureReferences,
    storyReferences=StoryReferences,
    studyNotes=StudyNotes,
    sourceTerms=SourceTerms,
    translationNotes=TranslationNotes,
    clarificationNotes=ClarificationNotes
])) :-
    command(Command),
    command_title(Command, Title),
    one_or_null(normal_obedience(Command), Requirement),
    findall(RequirementItem, command_requirement(Command, RequirementItem), Requirements),
    one_or_null(reminder_text(Command), ReminderText),
    setof_or_empty(Category, command_category(Command, Category), Categories),
    setof_or_empty(Fact, command_fact(Command, Fact), Facts),
    setof_or_empty(Applicability, applies_if(Command, Applicability), AppliesIf),
    embodies_list(Command, GreatCommands),
    findall(Reference, scripture_reference(Command, Reference), ScriptureReferences),
    findall(json([
        reference=Reference,
        label=Label
    ]), story_reference(Command, Reference, Label), StoryReferences),
    findall(Note, study_note(Command, Note), StudyNotes),
    findall(json([
        language=Language,
        term=Term,
        gloss=Gloss
    ]), source_term(Command, Language, Term, Gloss), SourceTerms),
    findall(Note, translation_note(Command, Note), TranslationNotes),
    findall(Note, clarification_note(Command, Note), ClarificationNotes).

% -----------------------------------------------------------------------------
% Catalog Metadata
% -----------------------------------------------------------------------------

api_command_categories_json :-
    setof_or_empty(Category, Command^command_category(Command, Category), Categories),
    json_write(current_output, json([categories=Categories])).

api_command_facts_json :-
    setof_or_empty(Fact, Command^command_fact(Command, Fact), Facts),
    json_write(current_output, json([facts=Facts])).

api_command_applicability_json :-
    setof_or_empty(Applicability, Command^applies_if(Command, Applicability), ApplicabilityList),
    json_write(current_output, json([applicability=ApplicabilityList])).

% -----------------------------------------------------------------------------
% JSON Helpers
% -----------------------------------------------------------------------------

one_or_null(GoalTemplate, Value) :-
    call(GoalTemplate, Value),
    !.

% Defines one or null.
one_or_null(_, @(null)).

% Defines setof or empty.
setof_or_empty(Value, Goal, Values) :-
    setof(Value, Goal, Values),
    !.

% Defines setof or empty.
setof_or_empty(_, _, []).

% Defines command has all facts.
command_has_all_facts(Command, Facts) :-
    command(Command),
    forall(member(Fact, Facts), command_fact(Command, Fact)).

% Defines random command json.
random_command_json([]) :-
    json_write(current_output, json([command= @(null)])).

% Defines random command json.
random_command_json(Commands) :-
    random_member(Command, Commands),
    command_detail_json(Command, CommandJson),
    json_write(current_output, json([command=CommandJson])).

% Defines random category json.
random_category_json([]) :-
    json_write(current_output, json([category= @(null)])).

% Defines random category json.
random_category_json(Categories) :-
    random_member(Category, Categories),
    json_write(current_output, json([category=Category])).

% Defines random command in random category json.
random_command_in_random_category_json([]) :-
    json_write(current_output, json([
        category= @(null),
        command= @(null)
    ])).

% Defines random command in random category json.
random_command_in_random_category_json(Categories) :-
    random_member(Category, Categories),
    findall(Command, command_category(Command, Category), Commands),
    random_member(Command, Commands),
    command_detail_json(Command, CommandJson),
    json_write(current_output, json([
        category=Category,
        command=CommandJson
    ])).
