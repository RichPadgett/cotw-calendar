% =============================================================================
% Command Group: Offerings Connected To Appointed Times
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

% Command: daily_offerings
command(daily_offerings).
command_title(daily_offerings, 'Num 28:1-8 - Daily offerings.').
normal_obedience(daily_offerings, 'Remember the morning and evening continual offering command.').
concerns(daily_offerings, appointed_times).
scripture_reference(daily_offerings, 'Exodus 29:38-42').
scripture_reference(daily_offerings, 'Numbers 28:1-8').
story_reference(daily_offerings, '1 Chronicles 16:39-40', 'David appoints priests to offer burnt offerings continually morning and evening.').
story_reference(daily_offerings, 'Ezra 3:3-5', 'The returned exiles offer burnt offerings morning and evening.').
study_note(daily_offerings, 'The daily offering command shows the regular rhythm around the sanctuary service.').
command_requirement(daily_offerings, 'Temple or Tabernacle').
command_requirement(daily_offerings, 'Priests').

% Command: sabbath_offerings
command(sabbath_offerings).
command_title(sabbath_offerings, 'Num 28:9-10 - Sabbath offerings.').
normal_obedience(sabbath_offerings, 'Remember the additional Sabbath offering command.').
concerns(sabbath_offerings, sabbath_rest).
scripture_reference(sabbath_offerings, 'Numbers 28:9-10').
story_reference(sabbath_offerings, '2 Chronicles 8:12-13', 'Solomon offers according to the daily, Sabbath, new moon, and feast appointments.').
study_note(sabbath_offerings, 'The Sabbath offering belongs to the appointed rhythm of Sabbath.').

% Command: monthly_offerings
command(monthly_offerings).
command_title(monthly_offerings, 'Num 28:11-15 - Monthly offerings.').
normal_obedience(monthly_offerings, 'Remember the new month offering command.').
concerns(monthly_offerings, appointed_times).
scripture_reference(monthly_offerings, 'Numbers 28:11-15').
story_reference(monthly_offerings, '2 Chronicles 8:12-13', 'Solomon offers according to the appointed order for new moons.').
story_reference(monthly_offerings, 'Ezra 3:5', 'The returned exiles offer for new moons and appointed feasts.').
study_note(monthly_offerings, 'The new month offerings mark month-level appointed rhythm.').
command_requirement(monthly_offerings, 'Priests').
command_requirement(monthly_offerings, 'Temple or Tabernacle').
story_reference(monthly_offerings, 'Romans 12:1 - I appeal to you therefore, brothers,fn by the mercies of God, to present your bodies as a living sacrifice, holy and acceptable to God, which is your spiritual worship.', 'Romans 12:1 - I appeal to you therefore, brothers,fn by the mercies of God, to present your bodies as a living sacrifice, holy and acceptable to God, which is your spiritual worship.').

% Command: passover_unleavened_bread_offerings
command(passover_unleavened_bread_offerings).
command_title(passover_unleavened_bread_offerings, 'Num 28:16-25 - Passover and Unleavened Bread offerings.').
normal_obedience(passover_unleavened_bread_offerings, 'Remember the offerings appointed for Passover and Unleavened Bread.').
concerns(passover_unleavened_bread_offerings, passover_memorial).
scripture_reference(passover_unleavened_bread_offerings, 'Numbers 28:16-25').
story_reference(passover_unleavened_bread_offerings, '2 Chronicles 35:10-16', 'Josiah''s Passover service is prepared according to the command.').
study_note(passover_unleavened_bread_offerings, 'Numbers records the offering pattern attached to the feast days.').

% Command: firstfruits_shavuot_offerings
command(firstfruits_shavuot_offerings).
command_title(firstfruits_shavuot_offerings, 'Num 28:26-31 - Firstfruits and Shavuot offerings.').
normal_obedience(firstfruits_shavuot_offerings, 'Remember the offerings appointed for the day of firstfruits.').
concerns(firstfruits_shavuot_offerings, firstfruits_and_counting).
scripture_reference(firstfruits_shavuot_offerings, 'Numbers 28:26-31').
story_reference(firstfruits_shavuot_offerings, '2 Chronicles 8:12-13', 'Solomon offers according to the appointed feasts, including the Feast of Weeks.').
study_note(firstfruits_shavuot_offerings, 'The offering command accompanies the completion of the count.').

% Command: trumpets_offerings
command(trumpets_offerings).
command_title(trumpets_offerings, 'Num 29:1-6 - Trumpets offerings.').
normal_obedience(trumpets_offerings, 'Remember the offerings appointed for the first day of the seventh month.').
concerns(trumpets_offerings, appointed_times).
scripture_reference(trumpets_offerings, 'Numbers 29:1-6').
story_reference(trumpets_offerings, 'Ezra 3:5', 'The returned exiles offer for new moons and all appointed feasts of YHWH.').
study_note(trumpets_offerings, 'The offerings sit alongside the memorial of blowing.').

% Command: atonement_offerings
command(atonement_offerings).
command_title(atonement_offerings, 'Num 29:7-11 - Atonement offerings.').
normal_obedience(atonement_offerings, 'Remember the offerings appointed for the Day of Atonement.').
concerns(atonement_offerings, atonement_rest).
scripture_reference(atonement_offerings, 'Numbers 29:7-11').
study_note(atonement_offerings, 'The offering pattern is connected to the solemn appointed day.').

% Command: tabernacles_offerings
command(tabernacles_offerings).
command_title(tabernacles_offerings, 'Num 29:12-40 - Tabernacles offerings.').
normal_obedience(tabernacles_offerings, 'Remember the offerings appointed across Booths and the eighth day.').
concerns(tabernacles_offerings, tabernacles_rejoicing).
scripture_reference(tabernacles_offerings, 'Numbers 29:12-40').
story_reference(tabernacles_offerings, 'Ezra 3:4', 'The returned exiles keep Booths as written and offer the daily burnt offerings by number according to the ordinance.').
study_note(tabernacles_offerings, 'Numbers records the offering sequence across Booths and the eighth day.').
