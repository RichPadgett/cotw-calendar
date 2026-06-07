% =============================================================================
% Command: Blasphemy Penalty
% Author: rpadgett
%
% This file defines a command that has structural requirements unavailable
% today. It is useful for testing the "cannot obey as written today" path.
% =============================================================================

% -----------------------------------------------------------------------------
% Command Identity
% -----------------------------------------------------------------------------

command(blasphemy_penalty).

% -----------------------------------------------------------------------------
% Human-Facing Summary
% -----------------------------------------------------------------------------

command_title(blasphemy_penalty, 'Lev 24:16 - Penalty for blaspheming the Name.').

normal_obedience(blasphemy_penalty,
    'This penalty cannot be carried out as written today without the Torah-defined legal structure required for righteous judgment.'
).

% -----------------------------------------------------------------------------
% Requirements
% -----------------------------------------------------------------------------

requires(blasphemy_penalty, recognized_torah_court).
requires(blasphemy_penalty, priests_levites_and_judge).
requires(blasphemy_penalty, authorized_public_penalty).

% -----------------------------------------------------------------------------
% Decision Flow
% -----------------------------------------------------------------------------

question_order(blasphemy_penalty, [
    recognized_torah_court,
    priests_levites_and_judge,
    authorized_public_penalty
]).

% -----------------------------------------------------------------------------
% Embodiment / Teaching Connection
% -----------------------------------------------------------------------------

concerns(blasphemy_penalty, honor_yhwhs_name).
concerns(blasphemy_penalty, lawful_judgment).

% -----------------------------------------------------------------------------
% End Of Flow Study Notes
% -----------------------------------------------------------------------------

scripture_reference(blasphemy_penalty, 'Leviticus 24:10-16').
scripture_reference(blasphemy_penalty, 'Deuteronomy 17:8-13').
scripture_reference(blasphemy_penalty, 'Matthew 26:57-66').

study_note(blasphemy_penalty,
    'This command teaches reverence for YHWH''s Name and shows that penalties require lawful judgment, not private action.'
).

study_note(blasphemy_penalty,
    'Deuteronomy 17:9 describes coming to the priests, the Levites, and the judge in those days for the sentence of judgment.'
).

study_note(blasphemy_penalty,
    'Yeshua was accused of blasphemy, yet the handling of His trial shows the danger of separating a command from righteous judgment. Torah penalties required lawful authority and righteous proceedings, not corrupt or self-serving judgment.'
).
