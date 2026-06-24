# Enoch Part Time Model

## Additional Theory: Gate Speed and Variable Course Duration

### Important Design Principle

The Part Time engine is not merely a day/night part calculator.

It is based on a working hypothesis that the annual solar course is not traversed at a constant speed.

The model uses a race-track analogy:

- The equinox regions are like straights.
- The solstice regions are like turns.
- Motion is faster near equinoxes.
- Motion is slower near solstices.

The total yearly course remains fixed:

```text
364 Enoch days
12 months
18 parts per day
```

but the elapsed modern time required to traverse the course is variable.

## Why the Speed Model Exists

The tropical year is approximately:

```text
365.2422 modern days
```

The Enoch year is:

```text
364 counted days
```

Difference:

```text
365.2422 - 364 = 1.2422 days
```

Instead of inserting leap days or leap weeks, the model assumes the extra elapsed time is absorbed in the turning regions of the annual course.

Working hypothesis:

```text
Summer turning region ≈ 0.40 day absorbed
Winter turning region ≈ 0.8422 day absorbed
Total ≈ 1.2422 days
```

The winter turning region absorbs more because the annual path is considered larger/slower there.

## Twelve Gates

The engine should treat the year as twelve gate phases.

```text
Gate 1
Gate 2
Gate 3

Gate 4
Gate 5
Gate 6

Gate 7
Gate 8
Gate 9

Gate 10
Gate 11
Gate 12
```

Conceptually:

```text
Gates 1-3: Spring
Gates 4-6: Summer
Gates 7-9: Fall
Gates 10-12: Winter
```

The major turning points occur between these sections.

## Day and Night Parts

The traditional anchor values remain:

```text
Winter Solstice: 6 day parts / 12 night parts
Spring Equinox: 9 day parts / 9 night parts
Summer Solstice: 12 day parts / 6 night parts
Fall Equinox: 9 day parts / 9 night parts
```

However, the transition should be gradual. The values should interpolate through the gates.

Example progression:

```text
Winter Solstice: 6/12
Gate 11: 7/11
Gate 12: 8/10
Spring Equinox: 9/9
Gate 2: 10/8
Gate 3: 11/7
Summer Solstice: 12/6
```

Then the progression reverses for the second half of the year.

## Variable Course Duration

The number of parts is not the only thing changing. The duration of a course-day changes too.

Near the equinoxes:

```text
Course speed = faster
Course-day duration = slightly shorter
```

Near the solstices:

```text
Course speed = slower
Course-day duration = slightly longer
```

Therefore:

```text
Summer:
More daylight
Slower turn
Slightly longer course-days

Winter:
Less daylight
Even slower turn
Longest course-days
```

The model intentionally separates:

1. Daylight duration
2. Number of day/night parts
3. Total course-day duration

These are not assumed to be the same thing.

## Future Engine Direction

The current implementation may use:

```ts
dayParts = 9 + 3 * Math.sin(angle);
```

and:

```ts
courseSpeed = "fast" | "normal" | "slow";
```

as placeholders.

However, the intended future architecture is:

```text
coursePosition
  ↓
speedMultiplier
  ↓
elapsedModernTime
  ↓
currentEnochDay
  ↓
currentPart
```

where the speed multiplier is derived from position within the annual course.

The engine should eventually support a smooth speed curve rather than fixed labels.

The total integrated speed curve over the year should equal approximately:

```text
365.2422 modern days
```

while maintaining:

```text
364 Enoch days
6,552 total parts
```

This is the core theory behind the Part Time system. The speed curve is not a UI decoration; it is the mechanism that explains how a 364-day counted year corresponds to a 365.2422-day elapsed year while keeping 18 parts per day.
