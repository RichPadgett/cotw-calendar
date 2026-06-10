# COTW Commands Prolog Notes

Author: rpadgett

This folder models Torah commands as a catalog of commands, facts, scripture
references, reminders, and applicability notes.

## Folder Structure

```text
prolog/
  main.pl
  api.pl
  commands.pl
  commands/
    passover_unleavened_bread_commands.pl
  facts/
    great_commands.pl
  rules/
    catalog.pl
    embodiment.pl
```

## Shape

Each command file defines catalog facts:

```prolog
command(eat_unleavened_bread_seven_days).
command_title(eat_unleavened_bread_seven_days, 'Exo 12:15 - Eat unleavened bread seven days.').
normal_obedience(eat_unleavened_bread_seven_days, 'Eat unleavened bread throughout the Feast of Unleavened Bread.').
concerns(eat_unleavened_bread_seven_days, unleavened_bread_obedience).
scripture_reference(eat_unleavened_bread_seven_days, 'Exodus 12:15').
study_note(eat_unleavened_bread_seven_days, 'This is the specific positive requirement to eat unleavened bread during the seven-day feast.').
```

Shared rules in `rules/catalog.pl` infer:

- `command_requirement/2`
- `reminder_text/2`
- `command_fact/2`
- `command_category/2`
- `applies_if/2`

## Run It

From this folder:

```bash
swipl main.pl
```

Example questions:

```prolog
command(eat_unleavened_bread_seven_days).
command_fact(eat_unleavened_bread_seven_days, Fact).
command_category(eat_unleavened_bread_seven_days, Category).
applies_if(eat_unleavened_bread_seven_days, Applicability).
scripture_reference(eat_unleavened_bread_seven_days, Reference).
```

## API

The TypeScript API lives in `../server`.

Current endpoints:

```text
GET /api/command-resources
GET /api/command-resources?category=:category
GET /api/command-resources?fact=:fact
GET /api/command-resources?facts=:fact_a,:fact_b
GET /api/command-resources?appliesIf=:applicability
GET /api/command-resources/categories
GET /api/command-resources/categories/commands
GET /api/command-resources/facts
GET /api/command-resources/applicability
GET /api/command-resources/random
GET /api/command-resources/random?category=:category
GET /api/command-resources/random?fact=:fact
GET /api/command-resources/random?facts=:fact_a,:fact_b
GET /api/command-resources/random?appliesIf=:applicability
GET /api/command-resources/random/category
GET /api/command-resources/random/category-command
GET /api/command-resources/:commandKey
```

The API returns catalog data for the app command tab:

```json
{
  "key": "eat_unleavened_bread_seven_days",
  "title": "Exo 12:15 - Eat unleavened bread seven days.",
  "requirement": "Eat unleavened bread throughout the Feast of Unleavened Bread.",
  "reminderText": "Eat unleavened bread throughout the Feast of Unleavened Bread.",
  "categories": ["passover_unleavened_bread"],
  "facts": ["unleavened_bread", "scripture_backed"],
  "appliesIf": ["during_feast_of_unleavened_bread"],
  "scriptureReferences": ["Exodus 12:15"]
}
```
