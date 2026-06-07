# Prolog Intent Notes

Author: rpadgett

This note describes the intended spirit of the command reasoning tool.

The goal is not to create a cold pass/fail calculator for Torah commands. The
goal is to build a teaching companion that helps a person reason carefully
through command, obedience, circumstance, mercy, and intent.

## Core Framing

Torah should be treated as instruction from the Creator, similar to a programming
guide or instruction manual for human life.

An edge case should not be allowed to erase the command. Instead, an edge case
should help clarify how mercy, intent, circumstance, and judgment work around
the command.

The tool should avoid this kind of reasoning:

```text
Can everyone obey this perfectly in every possible circumstance?
No.
Therefore the command is not applicable.
```

The tool should guide toward this kind of reasoning:

```text
What does the command instruct?
What does obedience normally look like?
What requirements are needed?
Are those requirements structurally available today?
Is this person personally prevented?
Was the failure willful, accidental, ignorant, or constrained?
What does the command teach about loving God or neighbor?
```

## Layered Outcome

The final result should not be only a single yes/no verdict. It should be a
layered explanation.

Example:

```text
Command Status:
Obeyable today

Normal obedience:
Choose clean foods and avoid unclean meats.

Personal limitations:
Some people may lack control over food due to sickness, care, poverty,
captivity, or other constraints.

Intent:
YHWH distinguishes willful rebellion from unintentional or constrained failure.

Embodies:
Loving God by honoring His instruction and His clean/unclean distinction.

Scriptural references:
- Add passages that establish the command.
- Add passages that explain the requirements.
- Add passages that clarify mercy, intent, or personal limitation.

Notes:
Add teaching notes, study observations, or pastoral explanation that help the
person understand the command after the reasoning path is complete.
```

## End Of Flow Teaching

At the very end of a decision tree, after the tool has shown whether the command
is structurally obeyable today and who is loved by obeying it, the UI should
provide a dedicated place for scriptural references and notes.

This section should support:

- scriptures connected to the command
- scriptures connected to the requirements
- scriptures connected to mercy, intent, ignorance, or constrained failure
- notes that explain the teaching outcome in human language

This allows the logic path to end in study and discipleship, not only a verdict.

## Design Principle

The Prolog layer can reason with precise keys and facts, but the UI should speak
in careful human language.

The app should help people see the path of reasoning, not merely receive a
verdict.

The command remains true. A person's present ability may be limited. YHWH
distinguishes willful rebellion from accidental, ignorant, or constrained
failure.
