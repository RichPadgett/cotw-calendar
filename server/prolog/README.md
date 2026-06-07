# COTW Commands Prolog Notes

Author: rpadgett

This folder is a tiny Prolog learning area for modeling biblical commands as
facts and rules.

## Folder Structure

```text
prolog/
  main.pl
  commands.pl
  commands/
    clean_meats.pl
  facts/
    availability.pl
    great_commands.pl
    requirement_labels.pl
  rules/
    obeyability.pl
    embodiment.pl
    flow.pl
  tests/
    clean_meats_tests.pl
```

## What Each Area Does

`main.pl` loads the whole Prolog knowledge base.

`commands.pl` is a compatibility entry point so `swipl commands.pl` still works.

`commands/` contains one file per biblical command.

`facts/` contains shared facts that many commands can use.

`rules/` contains shared logic that evaluates the facts.

`tests/` contains small checks that prove the example still works.

## Run It

From this folder:

```bash
swipl main.pl
```

Then try these questions inside Prolog:

```prolog
can_obey_today(clean_meats).
blocked_requirement(clean_meats, Requirement).
embodies(clean_meats, GreatCommand).
next_question(clean_meats, [], Question).
next_question(clean_meats, [answer(distinguish_clean_from_unclean, yes)], Question).
flow_complete(clean_meats, [answer(distinguish_clean_from_unclean, yes), answer(individual_can_choose_food, yes)]).
scripture_reference(clean_meats, Reference).
study_note(clean_meats, Note).
```

## Run The Tests

From this folder:

```bash
swipl -q -s tests/clean_meats_tests.pl -g run_tests -t halt
```

## API

The TypeScript API lives in `../server`.

From the project root:

```bash
npm install
npm run dev
```

The API starts on:

```text
http://localhost:3002
```

Current endpoints:

```text
GET  /api/health
GET  /api/commands
GET  /api/commands/:commandKey
POST /api/commands/:commandKey/evaluate
```

Example evaluate body:

```json
{
  "answers": [
    {
      "question": "identify_dead_animal_article_contact",
      "answer": "yes"
    }
  ]
}
```

## How To Read The Syntax

This is a fact:

```prolog
command(clean_meats).
```

Human reading:

> Clean meats is a command.

This is also a fact:

```prolog
requires(clean_meats, individual_can_choose_food).
```

Human reading:

> The clean meats command requires that an individual can choose food.

This is a question flow fact:

```prolog
question_order(clean_meats, [
    distinguish_clean_from_unclean,
    individual_can_choose_food
]).
```

Human reading:

> When walking through clean meats, ask about clean/unclean distinction first,
> then ask whether the person can choose food.

This is a rule:

```prolog
can_obey_today(Command) :-
    command(Command),
    \+ blocked_requirement(Command, _).
```

Human reading:

> A command can be obeyed today if it is a known command and there is no blocked
> requirement.

## Important Prolog Ideas

- Lowercase names like `clean_meats` are atoms, which are plain values.
- Uppercase names like `Command` are variables.
- A period ends every fact or rule.
- `:-` means "if".
- `,` means "and".
- `\+` means "Prolog cannot prove this".
- `_` means "something exists here, but I do not need to name it".
- `[a, b, c]` is a list.
- `answer(question_key, yes)` is a structured value.
