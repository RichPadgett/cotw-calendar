% =============================================================================
% Command Group: General Torah Participation
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

% Command: teach_children_diligently
command(teach_children_diligently).
command_title(teach_children_diligently, 'Deu 6:4-9 - Teach children diligently.').
normal_obedience(teach_children_diligently, 'Teach Torah diligently to children and speak of it in daily life.').
concerns(teach_children_diligently, teach_children_torah).
scripture_reference(teach_children_diligently, 'Deuteronomy 6:4-9').
scripture_reference(teach_children_diligently, 'Deuteronomy 11:18-21').
story_reference(teach_children_diligently, 'Genesis 18:19', 'YHWH speaks of Abraham commanding his children and household to keep the way of YHWH.').
story_reference(teach_children_diligently, 'Joshua 4:21-24', 'Joshua uses the memorial stones to teach children about YHWH''s deliverance.').
study_note(teach_children_diligently, 'This command supports the app idea of daily reminders and household teaching.').

% Command: remember_deliverance_from_egypt
command(remember_deliverance_from_egypt).
command_title(remember_deliverance_from_egypt, 'Exo 12:14 - Remember deliverance from Egypt.').
normal_obedience(remember_deliverance_from_egypt, 'Keep the feasts as memorials of deliverance.').
concerns(remember_deliverance_from_egypt, passover_memorial).
scripture_reference(remember_deliverance_from_egypt, 'Exodus 12:14').
scripture_reference(remember_deliverance_from_egypt, 'Exodus 13:3').
scripture_reference(remember_deliverance_from_egypt, 'Deuteronomy 16:1-3').
story_reference(remember_deliverance_from_egypt, 'Joshua 5:10-12', 'Israel keeps Passover in the land after the wilderness journey.').
story_reference(remember_deliverance_from_egypt, '2 Chronicles 30:1-27', 'Hezekiah calls Israel and Judah to keep Passover as a return to YHWH.').
story_reference(remember_deliverance_from_egypt, 'Ezra 6:19-22', 'The returned exiles keep Passover and Unleavened Bread with joy.').
study_note(remember_deliverance_from_egypt, 'The feasts repeatedly point back to YHWH''s deliverance.').

% Command: do_not_add_or_subtract
command(do_not_add_or_subtract).
command_title(do_not_add_or_subtract, 'Deu 4:2 - Do not add or subtract.').
normal_obedience(do_not_add_or_subtract, 'Preserve command integrity by not adding to or taking away from YHWH''s command.').
concerns(do_not_add_or_subtract, remember_yhwhs_commands).
scripture_reference(do_not_add_or_subtract, 'Deuteronomy 4:2').
scripture_reference(do_not_add_or_subtract, 'Deuteronomy 12:32').
story_reference(do_not_add_or_subtract, '1 Kings 12:25-33', 'Jeroboam makes calves, appoints his own priests, and devises a feast from his own heart.').
story_reference(do_not_add_or_subtract, '2 Kings 22:8-13', 'Josiah responds with humility when the found book of the Torah exposes covenant failure.').
story_reference(do_not_add_or_subtract, 'Matthew 5:17-19', 'Jesus says He did not come to destroy the law or the prophets but to fulfill them, that not one jot or tittle will pass from the law until all is fulfilled, and whoever breaks or teaches others to break the least of these commandments will be called least in the kingdom of heaven.').
story_reference(do_not_add_or_subtract, 'Luke 16:17', 'Jesus says it is easier for heaven and earth to pass away than for one tittle of the law to fail.').
story_reference(do_not_add_or_subtract, 'Romans 3:31', 'Paul asks whether faith makes the law void, and answers, "God forbid: yea, we establish the law."').
story_reference(do_not_add_or_subtract, 'Romans 7:12', 'Paul states that the law is holy, and the commandment holy, and just, and good.').
story_reference(do_not_add_or_subtract, '1 Corinthians 7:19', 'Paul writes that circumcision and uncircumcision are nothing, but keeping the commandments of God is what matters.').
story_reference(do_not_add_or_subtract, 'James 2:10-11', 'James teaches that whoever keeps the whole law yet stumbles at one point is guilty of breaking all of it.').
story_reference(do_not_add_or_subtract, 'Revelation 12:17', 'The dragon goes to make war with the rest of the woman''s offspring, who keep the commandments of God and hold the testimony of Jesus Christ.').
story_reference(do_not_add_or_subtract, 'Revelation 14:12', 'John describes the patience of the saints as those who keep the commandments of God and the faith of Jesus.').
story_reference(do_not_add_or_subtract, 'Revelation 22:14', 'John writes, "Blessed are they that do his commandments, that they may have right to the tree of life."').
study_note(do_not_add_or_subtract, 'This command guards the integrity of the command list itself.').

% Command: love_yhwh_and_keep_commands
command(love_yhwh_and_keep_commands).
command_title(love_yhwh_and_keep_commands, 'Deu 6:4-5 - Love YHWH and keep His commands.').
normal_obedience(love_yhwh_and_keep_commands, 'Love YHWH and walk in covenant obedience.').
concerns(love_yhwh_and_keep_commands, remember_yhwhs_commands).
scripture_reference(love_yhwh_and_keep_commands, 'Deuteronomy 6:4-5').
scripture_reference(love_yhwh_and_keep_commands, 'Deuteronomy 10:12-13').
scripture_reference(love_yhwh_and_keep_commands, 'Deuteronomy 11:1').
story_reference(love_yhwh_and_keep_commands, 'Joshua 22:5', 'Joshua exhorts the tribes to love YHWH, walk in His ways, and keep His commandments.').
story_reference(love_yhwh_and_keep_commands, '2 Kings 23:25', 'Josiah is remembered as turning to YHWH with all his heart, soul, and might.').
story_reference(love_yhwh_and_keep_commands, 'John 14:15', 'Jesus tells His disciples, "If ye love me, keep my commandments."').
story_reference(love_yhwh_and_keep_commands, 'John 14:21', 'Jesus says the one who has His commandments and keeps them is the one who loves Him.').
story_reference(love_yhwh_and_keep_commands, 'John 15:10', 'Jesus says if you keep His commandments you will abide in His love, just as He has kept His Father''s commandments and abides in His love.').
story_reference(love_yhwh_and_keep_commands, '1 John 2:3-4', 'John writes that we know we know Him if we keep His commandments, and calls anyone who claims to know Him without keeping His commandments a liar.').
story_reference(love_yhwh_and_keep_commands, '1 John 5:3', 'John states that the love of God is this, that we keep His commandments, and His commandments are not burdensome.').
story_reference(love_yhwh_and_keep_commands, '2 John 1:6', 'John writes that love is walking according to His commandments, and this is the commandment heard from the beginning.').
story_reference(love_yhwh_and_keep_commands, 'Matthew 19:17', 'Jesus tells the rich young man that if he wants to enter into life, he should keep the commandments.').
study_note(love_yhwh_and_keep_commands, 'The command reminder feature can point daily obedience back to love for YHWH.').

% Command: gather_to_hear_torah
command(gather_to_hear_torah).
command_title(gather_to_hear_torah, 'Deu 31:10-13 - Gather to hear Torah.').
normal_obedience(gather_to_hear_torah, 'Gather men, women, children, and the stranger to hear and learn Torah.').
concerns(gather_to_hear_torah, teach_children_torah).
scripture_reference(gather_to_hear_torah, 'Deuteronomy 31:10-13').
story_reference(gather_to_hear_torah, 'Nehemiah 8:1-12', 'The people gather as Ezra reads the Torah and the Levites give understanding.').
study_note(gather_to_hear_torah, 'Public Torah hearing forms a communal rhythm of learning and reverence.').

% -----------------------------------------------------------------------------
% Source Term Supplements For General Torah Review Commands
% -----------------------------------------------------------------------------

source_term(teach_children_diligently, hebrew, shanan, 'teach diligently, sharpen by repetition').
source_term(teach_children_diligently, hebrew, ben, 'child, son').
source_term(teach_children_diligently, hebrew, dabar, 'speak, word, matter').

source_term(remember_deliverance_from_egypt, hebrew, zakar, 'remember, call to mind').
source_term(remember_deliverance_from_egypt, hebrew, yatsa, 'go out, be brought out').
source_term(remember_deliverance_from_egypt, hebrew, mitsrayim, 'Egypt').

source_term(do_not_add_or_subtract, hebrew, yasaph, 'add, increase').
source_term(do_not_add_or_subtract, hebrew, gara, 'take away, diminish').
source_term(do_not_add_or_subtract, hebrew, mitsvah, 'commandment').

source_term(love_yhwh_and_keep_commands, hebrew, ahav, 'love').
source_term(love_yhwh_and_keep_commands, hebrew, shamar, 'keep, guard, observe').
source_term(love_yhwh_and_keep_commands, hebrew, levav_nephesh_meod, 'heart, soul, and might').

source_term(gather_to_hear_torah, hebrew, qahal, 'assemble, gather as a congregation').
source_term(gather_to_hear_torah, hebrew, shama, 'hear, listen, obey').
source_term(gather_to_hear_torah, hebrew, lamad, 'learn, be taught').
