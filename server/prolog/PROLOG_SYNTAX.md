# Custom Prolog Syntax Guide

Author: rpadgett

This guide describes the preferred Prolog style for the COTW command catalog.

## General Rules

Use one fact per line:

```prolog
command(eat_unleavened_bread_seven_days).
concerns(eat_unleavened_bread_seven_days, unleavened_bread_obedience).
```

Use lowercase snake_case for keys:

```prolog
eat_unleavened_bread_seven_days
unleavened_bread_obedience
during_feast_of_unleavened_bread
```

End every fact or rule with a period.

## Command File Order

Every command entry should follow this order:

```text
1. Command Identity
2. Human-Facing Summary
3. Teaching / Fact Connection
4. Scripture References
5. Study Notes
```

## Command Template

```prolog
command(example_command).

command_title(example_command, 'Scripture ref - command summary.').

normal_obedience(example_command,
    'Describe the command requirement in plain language.'
).

concerns(example_command, example_teaching_concern).

scripture_reference(example_command, 'Book 1:1').

study_note(example_command,
    'Add the review note that should appear in the catalog.'
).
```

## Catalog Rules

The command files do not need to repeat every app-facing field. Shared rules in
`rules/catalog.pl` infer:

```prolog
command_requirement(Command, Text).
reminder_text(Command, Text).
command_fact(Command, Fact).
command_category(Command, Category).
applies_if(Command, Applicability).
```

## Long Text

Short text can stay on one line:

```prolog
scripture_reference(eat_unleavened_bread_seven_days, 'Exodus 12:15').
```

Long text should be split so the command key remains easy to see:

```prolog
study_note(eat_unleavened_bread_seven_days,
    'This is the specific positive requirement to eat unleavened bread during the seven-day feast.'
).
```

To write an apostrophe inside Prolog text, use two apostrophes:

```prolog
'YHWH''s instruction'
```

## Checklist For A New Command

- Add the command entry under `commands/`.
- Add the command file to `main.pl` if it is a new file.
- Add or reuse a `concerns/2` teaching concern.
- Map new concerns in `facts/great_commands.pl` when needed.
- Add scripture references and a study note.
- Run the Prolog load check.
