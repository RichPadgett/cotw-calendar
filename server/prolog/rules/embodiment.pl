% =============================================================================
% Embodiment Rules
% Author: rpadgett
%
% These rules infer whether a command embodies loving God, loving neighbor, or
% both, based on the teaching concerns connected to the command.
% =============================================================================

% -----------------------------------------------------------------------------
% Embodies
% -----------------------------------------------------------------------------
% embodies(Command, GreatCommand).
%
% Read this as:
% "A command embodies a great command if one of its concerns points to that
% great command."

embodies(Command, GreatCommand) :-
    concerns(Command, Concern),
    points_to(Concern, GreatCommand).

% -----------------------------------------------------------------------------
% Embodies List
% -----------------------------------------------------------------------------
% embodies_list(Command, GreatCommands).
%
% This gives the API a deduped list. If two teaching concerns both point to
% love_god, the UI should normally receive love_god only once.

embodies_list(Command, GreatCommands) :-
    findall(GreatCommand, embodies(Command, GreatCommand), RawGreatCommands),
    sort(RawGreatCommands, GreatCommands).
