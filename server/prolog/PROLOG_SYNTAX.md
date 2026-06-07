# Custom Prolog Syntax Guide

Author: rpadgett

This guide describes the preferred Prolog style for the COTW command reasoning
project. The goal is to keep command files readable as the library grows.

## General Rules

Use one fact per line:

```prolog
command(clean_meats).
requires(clean_meats, individual_can_choose_food).
```

Use lowercase snake_case for keys:

```prolog
clean_meats
individual_can_choose_food
distinguish_clean_from_unclean
```

Use uppercase names only for variables inside rules:

```prolog
blocked_requirement(Command, Requirement) :-
    requires(Command, Requirement),
    unavailable_today(Requirement).
```

End every fact and rule with a period.

## Command File Order

Every command file should follow this order:

```text
1. Header comment
2. Command Identity
3. Human-Facing Summary
4. Requirements
5. Decision Flow
6. Embodiment / Teaching Connection
7. End Of Flow Study Notes
```

## Command Key Rule

The command key should be the anchor for the whole file.

Good:

```prolog
command(clean_meats).
command_title(clean_meats, 'Deu 14:3 - You shall not eat any abomination.').
normal_obedience(clean_meats, 'Choose clean foods and avoid unclean meats.').
requires(clean_meats, individual_can_choose_food).
```

Avoid mixing keys in the same command file:

```prolog
command(purify_unclean_articles).
command_title(clean_meats, 'Wrong key here.').
```

## Lists

Use vertical lists for question flows:

```prolog
question_order(clean_meats, [
    distinguish_clean_from_unclean,
    individual_can_choose_food
]).
```

This is easier to scan and easier to edit than a long one-line list.

## Long Text

Short text can stay on one line:

```prolog
scripture_reference(clean_meats, 'Leviticus 11').
```

Long text should be split so the command key remains easy to see:

```prolog
study_note(clean_meats,
    'This command teaches the distinction between clean and unclean and gives a practical daily expression of honoring YHWH''s instruction.'
).
```

To write an apostrophe inside Prolog text, use two apostrophes:

```prolog
'YHWH''s instruction'
```

## Requirement Names

Requirement names should describe the actual requirement, not the conclusion.

Good:

```prolog
individual_can_choose_food
distinguish_clean_from_unclean
identify_dead_animal_article_contact
```

Avoid:

```prolog
can_obey
is_applicable
valid
```

The rule engine decides whether the command can be obeyed. The requirement key
should describe the thing being checked.

## Concerns

Concerns should describe what the command teaches or protects:

```prolog
concerns(clean_meats, clean_and_unclean_distinction).
concerns(purify_unclean_articles, restore_unclean_article).
```

Then shared facts can connect those concerns to the great command categories:

```prolog
points_to(clean_and_unclean_distinction, love_god).
points_to(restore_unclean_article, love_god).
```

## Command Template

Use this shape when adding a new command:

```prolog
% =============================================================================
% Command: Human Readable Name
% Author: rpadgett
%
% Short description of what this command file defines.
% =============================================================================

% -----------------------------------------------------------------------------
% Command Identity
% -----------------------------------------------------------------------------

command(example_command).

% -----------------------------------------------------------------------------
% Human-Facing Summary
% -----------------------------------------------------------------------------

command_title(example_command, 'Scripture ref - command summary.').

normal_obedience(example_command,
    'Describe what obedience normally looks like.'
).

% -----------------------------------------------------------------------------
% Requirements
% -----------------------------------------------------------------------------

requires(example_command, first_requirement_key).
requires(example_command, second_requirement_key).

% -----------------------------------------------------------------------------
% Decision Flow
% -----------------------------------------------------------------------------

question_order(example_command, [
    first_requirement_key,
    second_requirement_key
]).

% -----------------------------------------------------------------------------
% Embodiment / Teaching Connection
% -----------------------------------------------------------------------------

concerns(example_command, example_teaching_concern).

% -----------------------------------------------------------------------------
% End Of Flow Study Notes
% -----------------------------------------------------------------------------

scripture_reference(example_command, 'Book 1:1').

study_note(example_command,
    'Add the teaching note that should appear after the decision path is complete.'
).
```

## Checklist For A New Command

- Add the command file under `commands/`.
- Add the command file to `main.pl`.
- Add each requirement to `facts/availability.pl`.
- Add each requirement title and description to `facts/requirement_labels.pl`.
- Add each concern mapping to `facts/great_commands.pl`.
- Add a smoke test under `tests/`.
- Run the Prolog tests.
