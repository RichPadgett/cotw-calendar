% =============================================================================
% Command Group: Firstfruits and Omer
% Author: rpadgett
% =============================================================================

% -----------------------------------------------------------------------------
% Command Entry Reference
% -----------------------------------------------------------------------------
% Required fields for a normal command entry:
%
% % Command: command_key
% command(command_key).
% command_title(command_key, 'Book 1:1 - Short command title.').
% normal_obedience(command_key, 'Text-faithful statement of what the command says to do or not do.').
% concerns(command_key, concern_key).
% scripture_reference(command_key, 'Book 1:1-2').
% study_note(command_key, 'Short human note about scope, context, or catalog status.').
%
% Optional detail fields:
%
% source_term(command_key, hebrew, word, 'brief gloss').
% source_term(command_key, greek, word, 'brief gloss').
% source_term(command_key, aramaic, word, 'brief gloss').
% translation_note(command_key, 'Short note about a translation wording such as KJV, LXX, etc.').
% clarification_note(command_key, 'Explain how the source wording should or should not narrow the command.').
%
% How these are used downstream:
% - command_title, normal_obedience, concerns, scripture_reference, and study_note appear in command detail APIs.
% - source_term appears as sourceTerms with language, term, and gloss.
% - translation_note appears as translationNotes.
% - clarification_note appears as clarificationNotes.
% - concerns drives derived facts, categories, applicability, filtering, and notification selection.
%
% Full example:
%
% % Command: do_not_destroy_the_edge_of_the_beard
% command(do_not_destroy_the_edge_of_the_beard).
% command_title(do_not_destroy_the_edge_of_the_beard, 'Leviticus 19:27 - Do not destroy the edge of the beard.').
% normal_obedience(do_not_destroy_the_edge_of_the_beard, 'Do not destroy the edge of the beard.').
% concerns(do_not_destroy_the_edge_of_the_beard, mixed_kinds_boundary).
% scripture_reference(do_not_destroy_the_edge_of_the_beard, 'Leviticus 19:27').
% source_term(do_not_destroy_the_edge_of_the_beard, hebrew, shachath, 'mar / ruin / destroy').
% translation_note(do_not_destroy_the_edge_of_the_beard, 'KJV says, "neither shalt thou mar the corners of thy beard."').
% clarification_note(do_not_destroy_the_edge_of_the_beard, 'The Hebrew shachath means to spoil, ruin, corrupt, or destroy; this supports wording the command as destruction of the beard edge rather than a broad ban on all trimming.').
% study_note(do_not_destroy_the_edge_of_the_beard, 'Catalog wording stays close to the source-language action word and avoids adding a man-made fence.').

% Command: bring_firstfruits_sheaf
command(bring_firstfruits_sheaf).
command_title(bring_firstfruits_sheaf, 'Lev 23:9-11 - Bring the firstfruits sheaf.').
normal_obedience(bring_firstfruits_sheaf, 'Bring the sheaf of firstfruits to the priest.').
concerns(bring_firstfruits_sheaf, firstfruits_and_counting).
scripture_reference(bring_firstfruits_sheaf, 'Leviticus 23:9-11').
story_reference(bring_firstfruits_sheaf, '2 Chronicles 31:5', 'Israel brings firstfruits abundantly during Hezekiah''s reforms.').
source_term(bring_firstfruits_sheaf, hebrew, omer, 'sheaf or measured bundle; the firstfruits sheaf is brought to the priest').
source_term(bring_firstfruits_sheaf, hebrew, reshith, 'first, beginning, or firstfruits; used for the first portion of harvest').
study_note(bring_firstfruits_sheaf, 'The sheaf begins the count toward Shavuot.').

% Command: wave_firstfruits_sheaf
command(wave_firstfruits_sheaf).
command_title(wave_firstfruits_sheaf, 'Lev 23:11 - Wave the sheaf before YHWH.').
normal_obedience(wave_firstfruits_sheaf, 'The priest waves the sheaf before YHWH.').
concerns(wave_firstfruits_sheaf, firstfruits_and_counting).
scripture_reference(wave_firstfruits_sheaf, 'Leviticus 23:11').
story_reference(wave_firstfruits_sheaf, '2 Chronicles 31:5', 'Israel brings firstfruits abundantly during Hezekiah''s reforms, showing the firstfruits setting for priestly presentation.').
source_term(wave_firstfruits_sheaf, hebrew, nuph, 'to wave or move to and fro; the priest waves the sheaf before YHWH').
source_term(wave_firstfruits_sheaf, hebrew, omer, 'sheaf or measured bundle; the item waved in Leviticus 23').
study_note(wave_firstfruits_sheaf, 'The wave sheaf marks acceptance and begins the appointed count.').

command_requirement(wave_firstfruits_sheaf, 'Priests').

% Command: do_not_eat_new_grain_before_offering
command(do_not_eat_new_grain_before_offering).
command_title(do_not_eat_new_grain_before_offering, 'Lev 23:14 - Do not eat new grain before the offering.').
normal_obedience(do_not_eat_new_grain_before_offering, 'Do not eat bread, parched grain, or fresh grain until the offering.').
concerns(do_not_eat_new_grain_before_offering, firstfruits_and_counting).
scripture_reference(do_not_eat_new_grain_before_offering, 'Leviticus 23:14').
story_reference(do_not_eat_new_grain_before_offering, 'Joshua 5:11-12', 'Israel eats from the produce of the land after Passover as the manna ceases.').
source_term(do_not_eat_new_grain_before_offering, hebrew, lechem, 'bread; one of the foods not eaten before the offering').
source_term(do_not_eat_new_grain_before_offering, hebrew, qali, 'parched or roasted grain; one of the foods named in the restriction').
source_term(do_not_eat_new_grain_before_offering, hebrew, karmel, 'fresh grain or full ears; one of the foods named in the restriction').
study_note(do_not_eat_new_grain_before_offering, 'The firstfruits offering sets the boundary before eating from the new grain.').

% Command: count_seven_sabbaths_to_shavuot
command(count_seven_sabbaths_to_shavuot).
command_title(count_seven_sabbaths_to_shavuot, 'Lev 23:15-16 - Count seven Sabbaths to Shavuot.').
normal_obedience(count_seven_sabbaths_to_shavuot, 'Count from the wave sheaf to Shavuot.').
concerns(count_seven_sabbaths_to_shavuot, firstfruits_and_counting).
scripture_reference(count_seven_sabbaths_to_shavuot, 'Leviticus 23:15-16').
scripture_reference(count_seven_sabbaths_to_shavuot, 'Deuteronomy 16:9').
story_reference(count_seven_sabbaths_to_shavuot, '2 Chronicles 8:13', 'Solomon keeps the yearly appointed feasts, including the Feast of Weeks reached by the count.').
source_term(count_seven_sabbaths_to_shavuot, hebrew, saphar, 'to count, number, or recount; used for counting toward Shavuot').
source_term(count_seven_sabbaths_to_shavuot, hebrew, sheba, 'seven; the count is seven complete Sabbaths or weeks').
source_term(count_seven_sabbaths_to_shavuot, hebrew, shabbath, 'sabbath or rest; Leviticus counts seven Sabbaths in this command').
study_note(count_seven_sabbaths_to_shavuot, 'Counting creates the bridge from Firstfruits to Shavuot.').

non_canonical_story_reference(count_seven_sabbaths_to_shavuot, 'Jubilees 6:17-22', 'Jubilees commands that the Festival of Weeks be observed to renew the covenant every year, tying it to the covenant God made with Noah and later renewed with Abraham, Isaac, and Jacob.').
