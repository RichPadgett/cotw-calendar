% =============================================================================
% Obeyability Rules
% Author: rpadgett
%
% These rules decide whether a command is structurally obeyable today.
% =============================================================================

% -----------------------------------------------------------------------------
% Blocked Requirement
% -----------------------------------------------------------------------------
% A command has a blocked requirement when:
% - the command requires something
% - that requirement is unavailable today

blocked_requirement(Command, Requirement) :-
    requires(Command, Requirement),
    unavailable_today(Requirement).

% -----------------------------------------------------------------------------
% Can Obey Today
% -----------------------------------------------------------------------------
% A command can be obeyed today when:
% - it is a known command
% - Prolog cannot find any blocked requirement for it
%
% "\+" means "Prolog cannot prove this."
% "_" means "something exists here, but I do not need to name it."

can_obey_today(Command) :-
    command(Command),
    \+ blocked_requirement(Command, _).
