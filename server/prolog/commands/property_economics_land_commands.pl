% =============================================================================
% Command Group: Property, Economics, And Land
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
% story_reference(command_key, 'Book 1:1-2', 'Short label for where the command is seen practiced or enforced.').
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
% story_reference(do_not_destroy_the_edge_of_the_beard, 'Example 1:1-2', 'Optional Tanakh story reference where this command is seen in practice.').
% source_term(do_not_destroy_the_edge_of_the_beard, hebrew, shachath, 'mar / ruin / destroy').
% translation_note(do_not_destroy_the_edge_of_the_beard, 'KJV says, "neither shalt thou mar the corners of thy beard."').
% clarification_note(do_not_destroy_the_edge_of_the_beard, 'The Hebrew shachath means to spoil, ruin, corrupt, or destroy; this supports wording the command as destruction of the beard edge rather than a broad ban on all trimming.').
% study_note(do_not_destroy_the_edge_of_the_beard, 'Catalog wording stays close to the source-language action word and avoids adding a man-made fence.').

% Command: do_not_steal
command(do_not_steal).
command_title(do_not_steal, 'Exo 20:15 - Do not steal.').
normal_obedience(do_not_steal, 'Do not steal.').
concerns(do_not_steal, property_restoration).
scripture_reference(do_not_steal, 'Exodus 20:15').
scripture_reference(do_not_steal, 'Deuteronomy 5:19').
story_reference(do_not_steal, 'Joshua 7:1-26', 'Achan takes devoted things from Jericho, showing theft against YHWH''s command.').
story_reference(do_not_steal, '2 Samuel 12:1-7', 'Nathan''s parable exposes David through the image of taking another man''s lamb.').
source_term(do_not_steal, hebrew, ganav, 'to steal, take by stealth, or carry away what belongs to another').
study_note(do_not_steal, 'The command protects neighbor property and trust.').

% Command: do_not_covet
command(do_not_covet).
command_title(do_not_covet, 'Exo 20:17 - Do not covet.').
normal_obedience(do_not_covet, 'Do not covet your neighbor''s household, spouse, servants, animals, or anything belonging to him.').
concerns(do_not_covet, neighbor_protection).
scripture_reference(do_not_covet, 'Exodus 20:17').
scripture_reference(do_not_covet, 'Deuteronomy 5:21').
story_reference(do_not_covet, '1 Kings 21:1-16', 'Ahab covets Naboth''s vineyard and the desire leads to false witness and murder.').
source_term(do_not_covet, hebrew, chamad, 'to desire, delight in, or covet; the command addresses desire aimed at taking what belongs to a neighbor').
study_note(do_not_covet, 'Torah addresses desire that aims at taking what belongs to another.').

% Command: use_honest_weights_and_measures
command(use_honest_weights_and_measures).
command_title(use_honest_weights_and_measures, 'Lev 19:35-36 - Use honest weights and measures.').
normal_obedience(use_honest_weights_and_measures, 'Use honest balances, weights, ephah, and hin.').
concerns(use_honest_weights_and_measures, honest_business).
scripture_reference(use_honest_weights_and_measures, 'Leviticus 19:35-36').
scripture_reference(use_honest_weights_and_measures, 'Deuteronomy 25:13-16').
story_reference(use_honest_weights_and_measures, 'Amos 8:4-6', 'The prophet rebukes those who make the ephah small and the shekel great.').
story_reference(use_honest_weights_and_measures, 'Micah 6:10-11', 'YHWH rebukes wicked scales and deceitful weights.').
source_term(use_honest_weights_and_measures, hebrew, moznayim, 'balances or scales used for weighing goods in trade').
source_term(use_honest_weights_and_measures, hebrew, ephah, 'a dry measure; Amos 8 rebukes making the ephah small to cheat buyers').
source_term(use_honest_weights_and_measures, hebrew, hin, 'a liquid measure named with the balances, weights, and ephah in Leviticus 19:36').
study_note(use_honest_weights_and_measures, 'Business integrity is a Torah matter.').

% Command: pay_wages_on_time
command(pay_wages_on_time).
command_title(pay_wages_on_time, 'Deu 24:14-15 - Pay wages on time.').
normal_obedience(pay_wages_on_time, 'Do not oppress a hired worker; give wages on the same day.').
concerns(pay_wages_on_time, honest_business).
scripture_reference(pay_wages_on_time, 'Leviticus 19:13').
scripture_reference(pay_wages_on_time, 'Deuteronomy 24:14-15').
story_reference(pay_wages_on_time, 'Jeremiah 22:13', 'The prophet rebukes building by unrighteousness and making a neighbor serve without wages.').
source_term(pay_wages_on_time, hebrew, sakir, 'a hired worker or wage laborer, often economically vulnerable in the command context').
source_term(pay_wages_on_time, hebrew, peullah, 'wages, work, or recompense owed for labor').
study_note(pay_wages_on_time, 'The command protects workers from delayed pay.').

% Command: return_lost_property
command(return_lost_property).
command_title(return_lost_property, 'Deu 22:1-3 - Return lost property.').
normal_obedience(return_lost_property, 'Do not ignore lost property; return it to your brother.').
concerns(return_lost_property, property_restoration).
scripture_reference(return_lost_property, 'Deuteronomy 22:1-3').
source_term(return_lost_property, hebrew, avedah, 'a lost thing or lost property that must not be ignored').
study_note(return_lost_property, 'Torah makes restoration an active neighbor duty.').

% Command: help_fallen_animal
command(help_fallen_animal).
command_title(help_fallen_animal, 'Deu 22:4 - Help a fallen animal.').
normal_obedience(help_fallen_animal, 'Do not ignore your brother''s fallen animal; help lift it up.').
concerns(help_fallen_animal, neighbor_protection).
scripture_reference(help_fallen_animal, 'Exodus 23:4-5').
scripture_reference(help_fallen_animal, 'Deuteronomy 22:4').
study_note(help_fallen_animal, 'Neighbor help includes practical intervention, even with animals.').
source_term(help_fallen_animal, hebrew, naphal, 'fall, lie fallen').
source_term(help_fallen_animal, hebrew, qum, 'raise, lift up, establish').
source_term(help_fallen_animal, hebrew, chamor, 'donkey').

% Command: leave_gleanings_for_poor_and_stranger
command(leave_gleanings_for_poor_and_stranger).
command_title(leave_gleanings_for_poor_and_stranger, 'Lev 19:9-10 - Leave gleanings.').
normal_obedience(leave_gleanings_for_poor_and_stranger, 'Leave corners and gleanings for the poor and the stranger.').
concerns(leave_gleanings_for_poor_and_stranger, include_vulnerable_neighbors).
scripture_reference(leave_gleanings_for_poor_and_stranger, 'Leviticus 19:9-10').
scripture_reference(leave_gleanings_for_poor_and_stranger, 'Deuteronomy 24:19-22').
story_reference(leave_gleanings_for_poor_and_stranger, 'Ruth 2:2-17', 'Ruth gleans in Boaz''s field, showing the poor and stranger provision in practice.').
source_term(leave_gleanings_for_poor_and_stranger, hebrew, leqet, 'gleanings left after harvest rather than gathered by the landowner').
source_term(leave_gleanings_for_poor_and_stranger, hebrew, ger, 'sojourner or stranger living among Israel and included in field provision').
study_note(leave_gleanings_for_poor_and_stranger, 'Agricultural provision is built into Torah care for vulnerable neighbors.').

% Command: release_debts_in_seventh_year
command(release_debts_in_seventh_year).
command_title(release_debts_in_seventh_year, 'Deu 15:1-2 - Release debts in the seventh year.').
normal_obedience(release_debts_in_seventh_year, 'Release debts in the seventh year according to Torah.').
concerns(release_debts_in_seventh_year, debt_mercy).
scripture_reference(release_debts_in_seventh_year, 'Deuteronomy 15:1-11').
story_reference(release_debts_in_seventh_year, 'Nehemiah 5:1-13', 'Nehemiah confronts debt oppression and calls the nobles to restore fields, vineyards, houses, and interest.').
source_term(release_debts_in_seventh_year, hebrew, shemittah, 'release, remission, or letting drop; the seventh-year release restrains enduring debt pressure').
study_note(release_debts_in_seventh_year, 'The release year restrains permanent debt bondage among brothers.').

% Command: do_not_harden_heart_to_poor
command(do_not_harden_heart_to_poor).
command_title(do_not_harden_heart_to_poor, 'Deu 15:7-11 - Do not harden your heart to the poor.').
normal_obedience(do_not_harden_heart_to_poor, 'Open your hand to your poor brother and do not harden your heart.').
concerns(do_not_harden_heart_to_poor, include_vulnerable_neighbors).
scripture_reference(do_not_harden_heart_to_poor, 'Deuteronomy 15:7-11').
story_reference(do_not_harden_heart_to_poor, 'Nehemiah 5:1-13', 'Nehemiah confronts economic oppression and calls the nobles to restore what they took.').
source_term(do_not_harden_heart_to_poor, hebrew, evyon, 'the needy or poor person whose lack requires open-handed help').
source_term(do_not_harden_heart_to_poor, hebrew, qaphats, 'to shut or close; used of closing the hand against the poor brother').
study_note(do_not_harden_heart_to_poor, 'The command connects generosity to covenant community life.').

% Command: keep_sabbatical_year_for_land
command(keep_sabbatical_year_for_land).
command_title(keep_sabbatical_year_for_land, 'Lev 25:1-7 - Keep the land Sabbath.').
normal_obedience(keep_sabbatical_year_for_land, 'Let the land rest in the seventh year.').
concerns(keep_sabbatical_year_for_land, land_stewardship).
scripture_reference(keep_sabbatical_year_for_land, 'Leviticus 25:1-7').
story_reference(keep_sabbatical_year_for_land, '2 Chronicles 36:20-21', 'The exile is described as allowing the land to enjoy its Sabbaths.').
source_term(keep_sabbatical_year_for_land, hebrew, shabbat, 'rest or cessation; Leviticus 25 applies Sabbath language to the land itself').
study_note(keep_sabbatical_year_for_land, 'The land Sabbath is tied to Israel''s land inheritance and trust in YHWH.').

% Command: proclaim_jubilee
command(proclaim_jubilee).
command_title(proclaim_jubilee, 'Lev 25:8-17 - Proclaim Jubilee.').
normal_obedience(proclaim_jubilee, 'Proclaim Jubilee and return property and liberty according to Torah.').
concerns(proclaim_jubilee, land_stewardship).
scripture_reference(proclaim_jubilee, 'Leviticus 25:8-17').
story_reference(proclaim_jubilee, 'Jeremiah 34:8-17', 'Judah proclaims liberty to Hebrew servants and then violates the release by taking them back.').
source_term(proclaim_jubilee, hebrew, yovel, 'Jubilee, associated with the ram horn and the fiftieth-year return of liberty and inheritance').
source_term(proclaim_jubilee, hebrew, deror, 'liberty or release proclaimed through the land in the Jubilee year').
study_note(proclaim_jubilee, 'Jubilee restores land inheritance and liberty in Israel.').

% Command: do_not_move_boundary_marker
command(do_not_move_boundary_marker).
command_title(do_not_move_boundary_marker, 'Deu 19:14 - Do not move boundary markers.').
normal_obedience(do_not_move_boundary_marker, 'Do not move your neighbor''s boundary marker.').
concerns(do_not_move_boundary_marker, property_restoration).
scripture_reference(do_not_move_boundary_marker, 'Deuteronomy 19:14').
scripture_reference(do_not_move_boundary_marker, 'Deuteronomy 27:17').
story_reference(do_not_move_boundary_marker, 'Hosea 5:10', 'The princes of Judah are compared to those who move a boundary marker.').
source_term(do_not_move_boundary_marker, hebrew, gevul, 'border, boundary, or territory marker that protects a neighbor inheritance').
study_note(do_not_move_boundary_marker, 'Boundary markers protect inheritance and property justice.').

% -----------------------------------------------------------------------------
% Additional Property, Economics, And Land Commands
% -----------------------------------------------------------------------------

% Command: leave_the_corner_of_the_field_for_the_poor_and_stranger
command(leave_the_corner_of_the_field_for_the_poor_and_stranger).
command_title(leave_the_corner_of_the_field_for_the_poor_and_stranger, 'Leviticus 19:9 - Leave the corner of the field for the poor and stranger.').
normal_obedience(leave_the_corner_of_the_field_for_the_poor_and_stranger, 'Leave the corner of the field for the poor and stranger.').
concerns(leave_the_corner_of_the_field_for_the_poor_and_stranger, land_stewardship).
scripture_reference(leave_the_corner_of_the_field_for_the_poor_and_stranger, 'Leviticus 19:9').
story_reference(leave_the_corner_of_the_field_for_the_poor_and_stranger, 'Ruth 2:2-17', 'Ruth gleans in Boaz''s field as a poor stranger receiving field provision.').
study_note(leave_the_corner_of_the_field_for_the_poor_and_stranger, 'This command treats land, harvest, inheritance, and provision as matters held under YHWH''s order: Leave the corner of the field for the poor and stranger.').
source_term(leave_the_corner_of_the_field_for_the_poor_and_stranger, hebrew, peah, 'corner, edge of the field left for provision').
source_term(leave_the_corner_of_the_field_for_the_poor_and_stranger, hebrew, ani, 'poor, afflicted person').
source_term(leave_the_corner_of_the_field_for_the_poor_and_stranger, hebrew, ger, 'resident foreigner, sojourner').

% Command: do_not_reap_the_field_corner_completely
command(do_not_reap_the_field_corner_completely).
command_title(do_not_reap_the_field_corner_completely, 'Leviticus 19:9 - Do not reap the field corner completely.').
normal_obedience(do_not_reap_the_field_corner_completely, 'Do not reap the field corner completely.').
concerns(do_not_reap_the_field_corner_completely, land_stewardship).
scripture_reference(do_not_reap_the_field_corner_completely, 'Leviticus 19:9').
story_reference(do_not_reap_the_field_corner_completely, 'Ruth 2:15-16', 'Boaz commands his young men to let Ruth glean and even pull out handfuls for her.').
study_note(do_not_reap_the_field_corner_completely, 'This command treats land, harvest, inheritance, and provision as matters held under YHWH''s order: Do not reap the field corner completely.').
source_term(do_not_reap_the_field_corner_completely, hebrew, qatsar, 'reap, harvest').
source_term(do_not_reap_the_field_corner_completely, hebrew, peah, 'corner, edge of the field').
source_term(do_not_reap_the_field_corner_completely, hebrew, kalah, 'finish, complete, bring to an end').

% Command: leave_gleanings_of_harvest_for_the_poor_and_stranger
command(leave_gleanings_of_harvest_for_the_poor_and_stranger).
command_title(leave_gleanings_of_harvest_for_the_poor_and_stranger, 'Leviticus 19:9 - Leave gleanings of harvest for the poor and stranger.').
normal_obedience(leave_gleanings_of_harvest_for_the_poor_and_stranger, 'Leave gleanings of harvest for the poor and stranger.').
concerns(leave_gleanings_of_harvest_for_the_poor_and_stranger, land_stewardship).
scripture_reference(leave_gleanings_of_harvest_for_the_poor_and_stranger, 'Leviticus 19:9').
story_reference(leave_gleanings_of_harvest_for_the_poor_and_stranger, 'Ruth 2:7-17', 'Ruth gleans after the reapers in Boaz''s field.').
study_note(leave_gleanings_of_harvest_for_the_poor_and_stranger, 'This command treats land, harvest, inheritance, and provision as matters held under YHWH''s order: Leave gleanings of harvest for the poor and stranger.').
source_term(leave_gleanings_of_harvest_for_the_poor_and_stranger, hebrew, leqet, 'gleanings left after harvest').
source_term(leave_gleanings_of_harvest_for_the_poor_and_stranger, hebrew, qatsir, 'harvest').
source_term(leave_gleanings_of_harvest_for_the_poor_and_stranger, hebrew, ani_ger, 'poor person and resident foreigner').

% Command: do_not_gather_the_gleanings_of_harvest
command(do_not_gather_the_gleanings_of_harvest).
command_title(do_not_gather_the_gleanings_of_harvest, 'Leviticus 19:9 - Do not gather the gleanings of harvest.').
normal_obedience(do_not_gather_the_gleanings_of_harvest, 'Do not gather the gleanings of harvest.').
concerns(do_not_gather_the_gleanings_of_harvest, land_stewardship).
scripture_reference(do_not_gather_the_gleanings_of_harvest, 'Leviticus 19:9').
story_reference(do_not_gather_the_gleanings_of_harvest, 'Ruth 2:15-16', 'Boaz tells the workers not to reproach Ruth and to let grain fall for her to glean.').
study_note(do_not_gather_the_gleanings_of_harvest, 'This command treats land, harvest, inheritance, and provision as matters held under YHWH''s order: Do not gather the gleanings of harvest.').
source_term(do_not_gather_the_gleanings_of_harvest, hebrew, laqat, 'glean, gather stray pieces').
source_term(do_not_gather_the_gleanings_of_harvest, hebrew, leqet, 'gleaning, what remains after harvest').

% Command: leave_fallen_grapes_for_the_poor_and_stranger
command(leave_fallen_grapes_for_the_poor_and_stranger).
command_title(leave_fallen_grapes_for_the_poor_and_stranger, 'Leviticus 19:10 - Leave fallen grapes for the poor and stranger.').
normal_obedience(leave_fallen_grapes_for_the_poor_and_stranger, 'Leave fallen grapes for the poor and stranger.').
concerns(leave_fallen_grapes_for_the_poor_and_stranger, land_stewardship).
scripture_reference(leave_fallen_grapes_for_the_poor_and_stranger, 'Leviticus 19:10').
story_reference(leave_fallen_grapes_for_the_poor_and_stranger, 'Ruth 2:15-16', 'Boaz tells his workers to let grain fall for Ruth, a narrative example of generous harvest provision for the vulnerable.').
study_note(leave_fallen_grapes_for_the_poor_and_stranger, 'This command treats land, harvest, inheritance, and provision as matters held under YHWH''s order: Leave fallen grapes for the poor and stranger.').
source_term(leave_fallen_grapes_for_the_poor_and_stranger, hebrew, peret, 'fallen or separated grapes').
source_term(leave_fallen_grapes_for_the_poor_and_stranger, hebrew, kerem, 'vineyard').
source_term(leave_fallen_grapes_for_the_poor_and_stranger, hebrew, ani_ger, 'poor person and resident foreigner').

% Command: do_not_strip_the_vineyard_bare
command(do_not_strip_the_vineyard_bare).
command_title(do_not_strip_the_vineyard_bare, 'Leviticus 19:10 - Do not strip the vineyard bare.').
normal_obedience(do_not_strip_the_vineyard_bare, 'Do not strip the vineyard bare.').
concerns(do_not_strip_the_vineyard_bare, land_stewardship).
scripture_reference(do_not_strip_the_vineyard_bare, 'Leviticus 19:10').
story_reference(do_not_strip_the_vineyard_bare, 'Ruth 2:15-16', 'Boaz commands his workers to leave extra for Ruth rather than stripping the harvest bare.').
study_note(do_not_strip_the_vineyard_bare, 'This command treats land, harvest, inheritance, and provision as matters held under YHWH''s order: Do not strip the vineyard bare.').
source_term(do_not_strip_the_vineyard_bare, hebrew, alal, 'glean, strip, deal thoroughly with').
source_term(do_not_strip_the_vineyard_bare, hebrew, kerem, 'vineyard').

% Command: let_the_land_rest_in_the_seventh_year
command(let_the_land_rest_in_the_seventh_year).
command_title(let_the_land_rest_in_the_seventh_year, 'Leviticus 25:1-7 - Let the land rest in the seventh year.').
normal_obedience(let_the_land_rest_in_the_seventh_year, 'Let the land rest in the seventh year.').
concerns(let_the_land_rest_in_the_seventh_year, land_stewardship).
scripture_reference(let_the_land_rest_in_the_seventh_year, 'Leviticus 25:1-7').
story_reference(let_the_land_rest_in_the_seventh_year, '2 Chronicles 36:20-21', 'The exile is described as allowing the land to enjoy its Sabbaths.').
study_note(let_the_land_rest_in_the_seventh_year, 'This command treats land, harvest, inheritance, and provision as matters held under YHWH''s order: Let the land rest in the seventh year.').
source_term(let_the_land_rest_in_the_seventh_year, hebrew, shabbath_shabbathon, 'complete Sabbath rest').
source_term(let_the_land_rest_in_the_seventh_year, hebrew, erets, 'land').
source_term(let_the_land_rest_in_the_seventh_year, hebrew, shebii, 'seventh').

% Command: do_not_sow_the_field_in_the_seventh_year
command(do_not_sow_the_field_in_the_seventh_year).
command_title(do_not_sow_the_field_in_the_seventh_year, 'Leviticus 25:4 - Do not sow the field in the seventh year.').
normal_obedience(do_not_sow_the_field_in_the_seventh_year, 'Do not sow the field in the seventh year.').
concerns(do_not_sow_the_field_in_the_seventh_year, land_stewardship).
scripture_reference(do_not_sow_the_field_in_the_seventh_year, 'Leviticus 25:4').
story_reference(do_not_sow_the_field_in_the_seventh_year, '2 Chronicles 36:20-21', 'The exile is tied to the land enjoying its Sabbaths after Israel failed to give the land rest.').
study_note(do_not_sow_the_field_in_the_seventh_year, 'This command treats land, harvest, inheritance, and provision as matters held under YHWH''s order: Do not sow the field in the seventh year.').
source_term(do_not_sow_the_field_in_the_seventh_year, hebrew, zara, 'sow seed').
source_term(do_not_sow_the_field_in_the_seventh_year, hebrew, sadeh, 'field').
source_term(do_not_sow_the_field_in_the_seventh_year, hebrew, shebii, 'seventh').

% Command: do_not_prune_the_vineyard_in_the_seventh_year
command(do_not_prune_the_vineyard_in_the_seventh_year).
command_title(do_not_prune_the_vineyard_in_the_seventh_year, 'Leviticus 25:4 - Do not prune the vineyard in the seventh year.').
normal_obedience(do_not_prune_the_vineyard_in_the_seventh_year, 'Do not prune the vineyard in the seventh year.').
concerns(do_not_prune_the_vineyard_in_the_seventh_year, land_stewardship).
scripture_reference(do_not_prune_the_vineyard_in_the_seventh_year, 'Leviticus 25:4').
story_reference(do_not_prune_the_vineyard_in_the_seventh_year, '2 Chronicles 36:20-21', 'The exile is described as paying back the land Sabbath rests.').
study_note(do_not_prune_the_vineyard_in_the_seventh_year, 'This command treats land, harvest, inheritance, and provision as matters held under YHWH''s order: Do not prune the vineyard in the seventh year.').
source_term(do_not_prune_the_vineyard_in_the_seventh_year, hebrew, zamar, 'prune').
source_term(do_not_prune_the_vineyard_in_the_seventh_year, hebrew, kerem, 'vineyard').
source_term(do_not_prune_the_vineyard_in_the_seventh_year, hebrew, shebii, 'seventh').

% Command: do_not_reap_aftergrowth_as_ordinary_harvest_in_the_seventh_year
command(do_not_reap_aftergrowth_as_ordinary_harvest_in_the_seventh_year).
command_title(do_not_reap_aftergrowth_as_ordinary_harvest_in_the_seventh_year, 'Leviticus 25:5 - Do not reap aftergrowth as ordinary harvest in the seventh year.').
normal_obedience(do_not_reap_aftergrowth_as_ordinary_harvest_in_the_seventh_year, 'Do not reap aftergrowth as ordinary harvest in the seventh year.').
concerns(do_not_reap_aftergrowth_as_ordinary_harvest_in_the_seventh_year, land_stewardship).
scripture_reference(do_not_reap_aftergrowth_as_ordinary_harvest_in_the_seventh_year, 'Leviticus 25:5').
study_note(do_not_reap_aftergrowth_as_ordinary_harvest_in_the_seventh_year, 'This command treats land, harvest, inheritance, and provision as matters held under YHWH''s order: Do not reap aftergrowth as ordinary harvest in the seventh year.').
source_term(do_not_reap_aftergrowth_as_ordinary_harvest_in_the_seventh_year, hebrew, saphiach, 'aftergrowth, volunteer crop').
source_term(do_not_reap_aftergrowth_as_ordinary_harvest_in_the_seventh_year, hebrew, qatsar, 'reap, harvest').

% Command: do_not_gather_unpruned_grapes_as_ordinary_harvest_in_the_seventh_year
command(do_not_gather_unpruned_grapes_as_ordinary_harvest_in_the_seventh_year).
command_title(do_not_gather_unpruned_grapes_as_ordinary_harvest_in_the_seventh_year, 'Leviticus 25:5 - Do not gather unpruned grapes as ordinary harvest in the seventh year.').
normal_obedience(do_not_gather_unpruned_grapes_as_ordinary_harvest_in_the_seventh_year, 'Do not gather unpruned grapes as ordinary harvest in the seventh year.').
concerns(do_not_gather_unpruned_grapes_as_ordinary_harvest_in_the_seventh_year, land_stewardship).
scripture_reference(do_not_gather_unpruned_grapes_as_ordinary_harvest_in_the_seventh_year, 'Leviticus 25:5').
story_reference(do_not_gather_unpruned_grapes_as_ordinary_harvest_in_the_seventh_year, '2 Chronicles 36:20-21', 'The land enjoys its Sabbaths during exile, showing the seriousness of seventh-year land rest.').
study_note(do_not_gather_unpruned_grapes_as_ordinary_harvest_in_the_seventh_year, 'This command treats land, harvest, inheritance, and provision as matters held under YHWH''s order: Do not gather unpruned grapes as ordinary harvest in the seventh year.').
source_term(do_not_gather_unpruned_grapes_as_ordinary_harvest_in_the_seventh_year, hebrew, nazir, 'unpruned, undressed vine').
source_term(do_not_gather_unpruned_grapes_as_ordinary_harvest_in_the_seventh_year, hebrew, anab, 'grapes').
source_term(do_not_gather_unpruned_grapes_as_ordinary_harvest_in_the_seventh_year, hebrew, batsar, 'gather grapes, vintage').

% Command: count_seven_sabbatical_cycles_toward_jubilee
command(count_seven_sabbatical_cycles_toward_jubilee).
command_title(count_seven_sabbatical_cycles_toward_jubilee, 'Leviticus 25:8 - Count seven sabbatical cycles toward Jubilee.').
normal_obedience(count_seven_sabbatical_cycles_toward_jubilee, 'Count seven sabbatical cycles toward Jubilee.').
concerns(count_seven_sabbatical_cycles_toward_jubilee, land_stewardship).
scripture_reference(count_seven_sabbatical_cycles_toward_jubilee, 'Leviticus 25:8').
story_reference(count_seven_sabbatical_cycles_toward_jubilee, '2 Chronicles 36:20-21', 'The exile reckons with missed land Sabbaths, showing the importance of counting and observing the sabbatical rhythm.').
source_term(count_seven_sabbatical_cycles_toward_jubilee, hebrew, shabbat, 'Sabbath or cessation; the Jubilee count is built from seven Sabbath-year cycles').
study_note(count_seven_sabbatical_cycles_toward_jubilee, 'This command treats land, harvest, inheritance, and provision as matters held under YHWH''s order: Count seven sabbatical cycles toward Jubilee.').

% Command: sound_the_shofar_for_jubilee_on_day_of_atonement
command(sound_the_shofar_for_jubilee_on_day_of_atonement).
command_title(sound_the_shofar_for_jubilee_on_day_of_atonement, 'Leviticus 25:9 - Sound the shofar for Jubilee on Day of Atonement.').
normal_obedience(sound_the_shofar_for_jubilee_on_day_of_atonement, 'Sound the shofar for Jubilee on Day of Atonement.').
concerns(sound_the_shofar_for_jubilee_on_day_of_atonement, land_stewardship).
scripture_reference(sound_the_shofar_for_jubilee_on_day_of_atonement, 'Leviticus 25:9').
story_reference(sound_the_shofar_for_jubilee_on_day_of_atonement, 'Jeremiah 34:8-17', 'Judah proclaims liberty but then reverses the release, giving a narrative failure around liberty proclamation.').
source_term(sound_the_shofar_for_jubilee_on_day_of_atonement, hebrew, shofar, 'ram horn; the Jubilee announcement is sounded with a shofar on Day of Atonement').
study_note(sound_the_shofar_for_jubilee_on_day_of_atonement, 'This command treats land, harvest, inheritance, and provision as matters held under YHWH''s order: Sound the shofar for Jubilee on Day of Atonement.').

% Command: proclaim_liberty_in_the_jubilee_year
command(proclaim_liberty_in_the_jubilee_year).
command_title(proclaim_liberty_in_the_jubilee_year, 'Leviticus 25:10 - Proclaim liberty in the Jubilee year.').
normal_obedience(proclaim_liberty_in_the_jubilee_year, 'Proclaim liberty in the Jubilee year.').
concerns(proclaim_liberty_in_the_jubilee_year, land_stewardship).
scripture_reference(proclaim_liberty_in_the_jubilee_year, 'Leviticus 25:10').
story_reference(proclaim_liberty_in_the_jubilee_year, 'Jeremiah 34:8-17', 'The leaders proclaim liberty to Hebrew servants and then profane the covenant by enslaving them again.').
source_term(proclaim_liberty_in_the_jubilee_year, hebrew, qara, 'to call out, proclaim, or announce publicly').
source_term(proclaim_liberty_in_the_jubilee_year, hebrew, deror, 'liberty, release, or free flowing; the Jubilee proclamation releases people back to inheritance and household').
study_note(proclaim_liberty_in_the_jubilee_year, 'This command treats land, harvest, inheritance, and provision as matters held under YHWH''s order: Proclaim liberty in the Jubilee year.').

% Command: return_each_man_to_his_property_in_jubilee
command(return_each_man_to_his_property_in_jubilee).
command_title(return_each_man_to_his_property_in_jubilee, 'Leviticus 25:10 - Return each man to his property in Jubilee.').
normal_obedience(return_each_man_to_his_property_in_jubilee, 'Return each man to his property in Jubilee.').
concerns(return_each_man_to_his_property_in_jubilee, land_stewardship).
scripture_reference(return_each_man_to_his_property_in_jubilee, 'Leviticus 25:10').
story_reference(return_each_man_to_his_property_in_jubilee, 'Nehemiah 5:1-13', 'Nehemiah commands nobles to restore fields, vineyards, oliveyards, and houses taken through debt oppression.').
source_term(return_each_man_to_his_property_in_jubilee, hebrew, shuv, 'to return or turn back; Jubilee reverses loss of family inheritance').
source_term(return_each_man_to_his_property_in_jubilee, hebrew, achuzzah, 'possession, holding, or inherited property').
study_note(return_each_man_to_his_property_in_jubilee, 'This command treats land, harvest, inheritance, and provision as matters held under YHWH''s order: Return each man to his property in Jubilee.').

% Command: do_not_sow_or_reap_ordinary_harvest_in_jubilee
command(do_not_sow_or_reap_ordinary_harvest_in_jubilee).
command_title(do_not_sow_or_reap_ordinary_harvest_in_jubilee, 'Leviticus 25:11 - Do not sow or reap ordinary harvest in Jubilee.').
normal_obedience(do_not_sow_or_reap_ordinary_harvest_in_jubilee, 'Do not sow or reap ordinary harvest in Jubilee.').
concerns(do_not_sow_or_reap_ordinary_harvest_in_jubilee, land_stewardship).
scripture_reference(do_not_sow_or_reap_ordinary_harvest_in_jubilee, 'Leviticus 25:11').
story_reference(do_not_sow_or_reap_ordinary_harvest_in_jubilee, '2 Chronicles 36:20-21', 'The land Sabbath judgment background relates to the Jubilee cycle of release and rest.').
study_note(do_not_sow_or_reap_ordinary_harvest_in_jubilee, 'This command treats land, harvest, inheritance, and provision as matters held under YHWH''s order: Do not sow or reap ordinary harvest in Jubilee.').
source_term(do_not_sow_or_reap_ordinary_harvest_in_jubilee, hebrew, yovel, 'Jubilee').
source_term(do_not_sow_or_reap_ordinary_harvest_in_jubilee, hebrew, zara, 'sow seed').
source_term(do_not_sow_or_reap_ordinary_harvest_in_jubilee, hebrew, qatsar, 'reap, harvest').

% Command: do_not_sell_land_permanently
command(do_not_sell_land_permanently).
command_title(do_not_sell_land_permanently, 'Leviticus 25:23 - Do not sell land permanently.').
normal_obedience(do_not_sell_land_permanently, 'Do not sell land permanently.').
concerns(do_not_sell_land_permanently, land_stewardship).
scripture_reference(do_not_sell_land_permanently, 'Leviticus 25:23').
story_reference(do_not_sell_land_permanently, '1 Kings 21:1-3', 'Naboth refuses to give Ahab his fathers'' inheritance, showing concern for ancestral land.').
source_term(do_not_sell_land_permanently, hebrew, tsemithuth, 'permanence or finality; the land was not to be sold as a permanent alienation').
study_note(do_not_sell_land_permanently, 'This command treats land, harvest, inheritance, and provision as matters held under YHWH''s order: Do not sell land permanently.').

% Command: redeem_land_according_to_torah_redemption_law
command(redeem_land_according_to_torah_redemption_law).
command_title(redeem_land_according_to_torah_redemption_law, 'Leviticus 25:24-34 - Redeem land according to Torah redemption law.').
normal_obedience(redeem_land_according_to_torah_redemption_law, 'Redeem land according to Torah redemption law.').
concerns(redeem_land_according_to_torah_redemption_law, land_stewardship).
scripture_reference(redeem_land_according_to_torah_redemption_law, 'Leviticus 25:24-34').
story_reference(redeem_land_according_to_torah_redemption_law, 'Ruth 4:1-10', 'Boaz acts as redeemer for Elimelech''s land and Ruth before the elders at the gate.').
source_term(redeem_land_according_to_torah_redemption_law, hebrew, gaal, 'to redeem or act as kinsman-redeemer, restoring what was lost or sold').
source_term(redeem_land_according_to_torah_redemption_law, hebrew, geullah, 'redemption right or redemption process for land and persons').
study_note(redeem_land_according_to_torah_redemption_law, 'This command treats land, harvest, inheritance, and provision as matters held under YHWH''s order: Redeem land according to Torah redemption law.').

% Command: bring_firstfruits_of_the_land
command(bring_firstfruits_of_the_land).
command_title(bring_firstfruits_of_the_land, 'Deuteronomy 26:1-11 - Bring firstfruits of the land.').
normal_obedience(bring_firstfruits_of_the_land, 'Bring firstfruits of the land.').
concerns(bring_firstfruits_of_the_land, land_stewardship).
scripture_reference(bring_firstfruits_of_the_land, 'Deuteronomy 26:1-11').
story_reference(bring_firstfruits_of_the_land, '2 Chronicles 31:5', 'Israel brings firstfruits abundantly during Hezekiah''s reforms.').
source_term(bring_firstfruits_of_the_land, hebrew, reshit, 'first, beginning, or choicest first portion brought from the land').
source_term(bring_firstfruits_of_the_land, hebrew, bikkurim, 'firstfruits, the earliest produce presented to YHWH').
study_note(bring_firstfruits_of_the_land, 'This command treats land, harvest, inheritance, and provision as matters held under YHWH''s order: Bring firstfruits of the land.').

% Command: give_the_tithe_to_levite_stranger_orphan_and_widow_in_the_third_year
command(give_the_tithe_to_levite_stranger_orphan_and_widow_in_the_third_year).
command_title(give_the_tithe_to_levite_stranger_orphan_and_widow_in_the_third_year, 'Deuteronomy 14:28-29 - Give the tithe to Levite, stranger, orphan, and widow in the third year.').
normal_obedience(give_the_tithe_to_levite_stranger_orphan_and_widow_in_the_third_year, 'Give the tithe to Levite, stranger, orphan, and widow in the third year.').
concerns(give_the_tithe_to_levite_stranger_orphan_and_widow_in_the_third_year, land_stewardship).
scripture_reference(give_the_tithe_to_levite_stranger_orphan_and_widow_in_the_third_year, 'Deuteronomy 14:28-29').
scripture_reference(give_the_tithe_to_levite_stranger_orphan_and_widow_in_the_third_year, '26:12').
story_reference(give_the_tithe_to_levite_stranger_orphan_and_widow_in_the_third_year, 'Nehemiah 13:10-12', 'Nehemiah restores the tithe storehouses after the Levites had been neglected.').
source_term(give_the_tithe_to_levite_stranger_orphan_and_widow_in_the_third_year, hebrew, maaser, 'tithe or tenth portion, here stored for Levite, stranger, orphan, and widow').
source_term(give_the_tithe_to_levite_stranger_orphan_and_widow_in_the_third_year, hebrew, ger, 'sojourner or stranger included with vulnerable households in the third-year tithe').
study_note(give_the_tithe_to_levite_stranger_orphan_and_widow_in_the_third_year, 'This command treats land, harvest, inheritance, and provision as matters held under YHWH''s order: Give the tithe to Levite, stranger, orphan, and widow in the third year.').

% Command: do_not_neglect_the_levite
command(do_not_neglect_the_levite).
command_title(do_not_neglect_the_levite, 'Deuteronomy 12:19 - Do not neglect the Levite.').
normal_obedience(do_not_neglect_the_levite, 'Do not neglect the Levite.').
concerns(do_not_neglect_the_levite, land_stewardship).
scripture_reference(do_not_neglect_the_levite, 'Deuteronomy 12:19').
story_reference(do_not_neglect_the_levite, 'Nehemiah 13:10-12', 'Nehemiah restores the portions for the Levites after they had been neglected.').
source_term(do_not_neglect_the_levite, hebrew, azav, 'to leave, forsake, abandon, or neglect; the Levite is not to be left without provision').
study_note(do_not_neglect_the_levite, 'This command treats land, harvest, inheritance, and provision as matters held under YHWH''s order: Do not neglect the Levite.').

% Command: do_not_deny_falsely_about_a_deposit_pledge_robbery_or_oppression
command(do_not_deny_falsely_about_a_deposit_pledge_robbery_or_oppression).
command_title(do_not_deny_falsely_about_a_deposit_pledge_robbery_or_oppression, 'Leviticus 6:1-7 - Do not deny falsely about a deposit, pledge, robbery, or oppression.').
normal_obedience(do_not_deny_falsely_about_a_deposit_pledge_robbery_or_oppression, 'Do not deny falsely about a deposit, pledge, robbery, or oppression.').
concerns(do_not_deny_falsely_about_a_deposit_pledge_robbery_or_oppression, damages_and_restitution).
scripture_reference(do_not_deny_falsely_about_a_deposit_pledge_robbery_or_oppression, 'Leviticus 6:1-7').
story_reference(do_not_deny_falsely_about_a_deposit_pledge_robbery_or_oppression, 'Joshua 7:20-26', 'Achan first hides and then confesses what he took from the devoted things.').
source_term(do_not_deny_falsely_about_a_deposit_pledge_robbery_or_oppression, hebrew, kachash, 'to deny, deceive, or deal falsely').
source_term(do_not_deny_falsely_about_a_deposit_pledge_robbery_or_oppression, hebrew, piqqadon, 'deposit or entrusted property placed in another person''s care').
source_term(do_not_deny_falsely_about_a_deposit_pledge_robbery_or_oppression, hebrew, tesumeth_yad, 'a pledge, security, or thing put into the hand as collateral').
source_term(do_not_deny_falsely_about_a_deposit_pledge_robbery_or_oppression, hebrew, gazel, 'robbery or something taken by force or fraud').
source_term(do_not_deny_falsely_about_a_deposit_pledge_robbery_or_oppression, hebrew, osheq, 'oppression, extortion, or unjust withholding from another').
study_note(do_not_deny_falsely_about_a_deposit_pledge_robbery_or_oppression, 'This command assigns responsibility for loss or damage and turns wrongdoing toward restitution where Torah requires it: Do not deny falsely about a deposit, pledge, robbery, or oppression.').

% Command: do_not_lie_to_one_another
command(do_not_lie_to_one_another).
command_title(do_not_lie_to_one_another, 'Leviticus 19:11 - Do not lie to one another.').
normal_obedience(do_not_lie_to_one_another, 'Do not lie to one another.').
concerns(do_not_lie_to_one_another, damages_and_restitution).
scripture_reference(do_not_lie_to_one_another, 'Leviticus 19:11').
story_reference(do_not_lie_to_one_another, 'Joshua 7:19-21', 'Achan confesses after hiding what he took from Jericho.').
story_reference(do_not_lie_to_one_another, '2 Kings 5:20-27', 'Gehazi lies to Naaman and Elisha after taking silver and garments.').
source_term(do_not_lie_to_one_another, hebrew, shaqar, 'to lie, deceive, or deal falsely').
study_note(do_not_lie_to_one_another, 'This command assigns responsibility for loss or damage and turns wrongdoing toward restitution where Torah requires it: Do not lie to one another.').

% Command: restore_stolen_or_withheld_property_and_add_a_fifth_in_the_guilt_case
command(restore_stolen_or_withheld_property_and_add_a_fifth_in_the_guilt_case).
command_title(restore_stolen_or_withheld_property_and_add_a_fifth_in_the_guilt_case, 'Leviticus 6:1-7 - Restore stolen or withheld property and add a fifth in the guilt case.').
normal_obedience(restore_stolen_or_withheld_property_and_add_a_fifth_in_the_guilt_case, 'Restore stolen or withheld property and add a fifth in the guilt case.').
concerns(restore_stolen_or_withheld_property_and_add_a_fifth_in_the_guilt_case, damages_and_restitution).
scripture_reference(restore_stolen_or_withheld_property_and_add_a_fifth_in_the_guilt_case, 'Leviticus 6:1-7').
story_reference(restore_stolen_or_withheld_property_and_add_a_fifth_in_the_guilt_case, 'Nehemiah 5:10-13', 'Nehemiah calls the nobles to restore what they have taken from their brothers.').
source_term(restore_stolen_or_withheld_property_and_add_a_fifth_in_the_guilt_case, hebrew, shalam, 'to make whole, repay, restore, or complete restitution').
source_term(restore_stolen_or_withheld_property_and_add_a_fifth_in_the_guilt_case, hebrew, chamishit, 'a fifth part added to restitution in the guilt case').
study_note(restore_stolen_or_withheld_property_and_add_a_fifth_in_the_guilt_case, 'This command assigns responsibility for loss or damage and turns wrongdoing toward restitution where Torah requires it: Restore stolen or withheld property and add a fifth in the guilt case.').

% Command: pay_restitution_for_theft_according_to_the_case
command(pay_restitution_for_theft_according_to_the_case).
command_title(pay_restitution_for_theft_according_to_the_case, 'Exodus 22:1-4 - Pay restitution for theft according to the case.').
normal_obedience(pay_restitution_for_theft_according_to_the_case, 'Pay restitution for theft according to the case.').
concerns(pay_restitution_for_theft_according_to_the_case, damages_and_restitution).
scripture_reference(pay_restitution_for_theft_according_to_the_case, 'Exodus 22:1-4').
story_reference(pay_restitution_for_theft_according_to_the_case, '2 Samuel 12:1-6', 'David says the rich man in Nathan''s parable must restore fourfold for taking the poor man''s lamb.').
source_term(pay_restitution_for_theft_according_to_the_case, hebrew, shalam, 'to repay or make restitution; theft is answered by making the loss whole according to the case').
study_note(pay_restitution_for_theft_according_to_the_case, 'This command assigns responsibility for loss or damage and turns wrongdoing toward restitution where Torah requires it: Pay restitution for theft according to the case.').

% Command: pay_for_borrowed_animal_loss_when_torah_assigns_responsibility
command(pay_for_borrowed_animal_loss_when_torah_assigns_responsibility).
command_title(pay_for_borrowed_animal_loss_when_torah_assigns_responsibility, 'Exodus 22:14-15 - Pay for borrowed animal loss when Torah assigns responsibility.').
normal_obedience(pay_for_borrowed_animal_loss_when_torah_assigns_responsibility, 'Pay for borrowed animal loss when Torah assigns responsibility.').
concerns(pay_for_borrowed_animal_loss_when_torah_assigns_responsibility, damages_and_restitution).
scripture_reference(pay_for_borrowed_animal_loss_when_torah_assigns_responsibility, 'Exodus 22:14-15').
source_term(pay_for_borrowed_animal_loss_when_torah_assigns_responsibility, hebrew, shaal, 'to ask, borrow, or request; the case concerns responsibility for borrowed property').
source_term(pay_for_borrowed_animal_loss_when_torah_assigns_responsibility, hebrew, shalam, 'to repay or make restitution when Torah assigns the loss to the borrower').
study_note(pay_for_borrowed_animal_loss_when_torah_assigns_responsibility, 'This command assigns responsibility for loss or damage and turns wrongdoing toward restitution where Torah requires it: Pay for borrowed animal loss when Torah assigns responsibility.').

% Command: handle_entrusted_property_loss_according_to_torah
command(handle_entrusted_property_loss_according_to_torah).
command_title(handle_entrusted_property_loss_according_to_torah, 'Exodus 22:7-13 - Handle entrusted property loss according to Torah.').
normal_obedience(handle_entrusted_property_loss_according_to_torah, 'Handle entrusted property loss according to Torah.').
concerns(handle_entrusted_property_loss_according_to_torah, damages_and_restitution).
scripture_reference(handle_entrusted_property_loss_according_to_torah, 'Exodus 22:7-13').
source_term(handle_entrusted_property_loss_according_to_torah, hebrew, shamar, 'to keep, guard, or watch; entrusted property is placed under another person''s care').
source_term(handle_entrusted_property_loss_according_to_torah, hebrew, piqqadon, 'deposit or entrusted item held by another person').
study_note(handle_entrusted_property_loss_according_to_torah, 'This command assigns responsibility for loss or damage and turns wrongdoing toward restitution where Torah requires it: Handle entrusted property loss according to Torah.').

% Command: do_not_oppress_your_neighbor
command(do_not_oppress_your_neighbor).
command_title(do_not_oppress_your_neighbor, 'Leviticus 19:13 - Do not oppress your neighbor.').
normal_obedience(do_not_oppress_your_neighbor, 'Do not oppress your neighbor.').
concerns(do_not_oppress_your_neighbor, damages_and_restitution).
scripture_reference(do_not_oppress_your_neighbor, 'Leviticus 19:13').
story_reference(do_not_oppress_your_neighbor, 'Nehemiah 5:1-13', 'Nehemiah rebukes nobles and officials for oppressing their brothers through debt and seizure of property.').
source_term(do_not_oppress_your_neighbor, hebrew, ashaq, 'to oppress, extort, exploit, or wrongfully withhold what is due').
study_note(do_not_oppress_your_neighbor, 'This command assigns responsibility for loss or damage and turns wrongdoing toward restitution where Torah requires it: Do not oppress your neighbor.').

% Command: do_not_rob
command(do_not_rob).
command_title(do_not_rob, 'Leviticus 19:13 - Do not rob.').
normal_obedience(do_not_rob, 'Do not rob.').
concerns(do_not_rob, damages_and_restitution).
scripture_reference(do_not_rob, 'Leviticus 19:13').
story_reference(do_not_rob, 'Micah 2:1-2', 'The prophet rebukes those who covet fields, seize houses, and oppress a man and his inheritance.').
story_reference(do_not_rob, '2 Samuel 12:1-6', 'Nathan''s parable exposes robbery through the rich man taking the poor man''s lamb.').
source_term(do_not_rob, hebrew, gazal, 'to rob, seize, tear away, or take by force').
study_note(do_not_rob, 'This command assigns responsibility for loss or damage and turns wrongdoing toward restitution where Torah requires it: Do not rob.').

% Command: do_not_keep_a_hired_worker_s_wages_overnight
command(do_not_keep_a_hired_worker_s_wages_overnight).
command_title(do_not_keep_a_hired_worker_s_wages_overnight, 'Leviticus 19:13 - Do not keep a hired worker''s wages overnight.').
normal_obedience(do_not_keep_a_hired_worker_s_wages_overnight, 'Do not keep a hired worker''s wages overnight.').
concerns(do_not_keep_a_hired_worker_s_wages_overnight, damages_and_restitution).
scripture_reference(do_not_keep_a_hired_worker_s_wages_overnight, 'Leviticus 19:13').
story_reference(do_not_keep_a_hired_worker_s_wages_overnight, 'Jeremiah 22:13', 'The prophet rebukes the one who makes his neighbor serve without wages.').
source_term(do_not_keep_a_hired_worker_s_wages_overnight, hebrew, lun, 'to lodge or remain overnight; wages must not stay with the employer until morning').
source_term(do_not_keep_a_hired_worker_s_wages_overnight, hebrew, peullah, 'wages, work, or recompense owed for labor').
study_note(do_not_keep_a_hired_worker_s_wages_overnight, 'This command assigns responsibility for loss or damage and turns wrongdoing toward restitution where Torah requires it: Do not keep a hired worker''s wages overnight.').

% Command: pay_a_poor_hired_worker_the_same_day
command(pay_a_poor_hired_worker_the_same_day).
command_title(pay_a_poor_hired_worker_the_same_day, 'Deuteronomy 24:14-15 - Pay a poor hired worker the same day.').
normal_obedience(pay_a_poor_hired_worker_the_same_day, 'Pay a poor hired worker the same day.').
concerns(pay_a_poor_hired_worker_the_same_day, damages_and_restitution).
scripture_reference(pay_a_poor_hired_worker_the_same_day, 'Deuteronomy 24:14-15').
story_reference(pay_a_poor_hired_worker_the_same_day, 'Jeremiah 22:13', 'The prophet rebukes building by unrighteousness and using a neighbor''s labor without paying wages.').
source_term(pay_a_poor_hired_worker_the_same_day, hebrew, sakir, 'a hired worker or wage laborer').
source_term(pay_a_poor_hired_worker_the_same_day, hebrew, evyon, 'needy or poor; the worker is vulnerable to delayed wages').
study_note(pay_a_poor_hired_worker_the_same_day, 'This command assigns responsibility for loss or damage and turns wrongdoing toward restitution where Torah requires it: Pay a poor hired worker the same day.').

% Command: do_not_charge_interest_to_your_brother
command(do_not_charge_interest_to_your_brother).
command_title(do_not_charge_interest_to_your_brother, 'Exodus 22:25 - Do not charge interest to your brother.').
normal_obedience(do_not_charge_interest_to_your_brother, 'Do not charge interest to your brother.').
concerns(do_not_charge_interest_to_your_brother, damages_and_restitution).
scripture_reference(do_not_charge_interest_to_your_brother, 'Exodus 22:25').
scripture_reference(do_not_charge_interest_to_your_brother, 'Deuteronomy 23:19').
story_reference(do_not_charge_interest_to_your_brother, 'Nehemiah 5:7-12', 'Nehemiah rebukes nobles for exacting interest from their brothers and calls them to restore it.').
source_term(do_not_charge_interest_to_your_brother, hebrew, neshek, 'interest or usury, literally biting; money charged on a loan to a brother is forbidden here').
source_term(do_not_charge_interest_to_your_brother, hebrew, tarbit, 'increase or profit taken from a loan').
study_note(do_not_charge_interest_to_your_brother, 'This command assigns responsibility for loss or damage and turns wrongdoing toward restitution where Torah requires it: Do not charge interest to your brother.').

% Command: you_may_charge_interest_to_a_foreigner_as_stated
command(you_may_charge_interest_to_a_foreigner_as_stated).
command_title(you_may_charge_interest_to_a_foreigner_as_stated, 'Deuteronomy 23:20 - You may charge interest to a foreigner as stated.').
normal_obedience(you_may_charge_interest_to_a_foreigner_as_stated, 'You may charge interest to a foreigner as stated.').
concerns(you_may_charge_interest_to_a_foreigner_as_stated, damages_and_restitution).
scripture_reference(you_may_charge_interest_to_a_foreigner_as_stated, 'Deuteronomy 23:20').
source_term(you_may_charge_interest_to_a_foreigner_as_stated, hebrew, nokri, 'foreigner or outsider in contrast with brother in the interest laws').
source_term(you_may_charge_interest_to_a_foreigner_as_stated, hebrew, nashak, 'to lend on interest or charge interest').
study_note(you_may_charge_interest_to_a_foreigner_as_stated, 'This command assigns responsibility for loss or damage and turns wrongdoing toward restitution where Torah requires it: You may charge interest to a foreigner as stated.').

% Command: do_not_take_a_widow_s_garment_in_pledge
command(do_not_take_a_widow_s_garment_in_pledge).
command_title(do_not_take_a_widow_s_garment_in_pledge, 'Deuteronomy 24:17 - Do not take a widow''s garment in pledge.').
normal_obedience(do_not_take_a_widow_s_garment_in_pledge, 'Do not take a widow''s garment in pledge.').
concerns(do_not_take_a_widow_s_garment_in_pledge, damages_and_restitution).
scripture_reference(do_not_take_a_widow_s_garment_in_pledge, 'Deuteronomy 24:17').
source_term(do_not_take_a_widow_s_garment_in_pledge, hebrew, chabal, 'to take or bind as a pledge; collateral language that can also carry a sense of binding or damaging').
source_term(do_not_take_a_widow_s_garment_in_pledge, hebrew, almanah, 'widow; the command protects a vulnerable woman from losing necessary covering as collateral').
source_term(do_not_take_a_widow_s_garment_in_pledge, hebrew, beged, 'garment or covering, here a prohibited item to take as pledge from a widow').
study_note(do_not_take_a_widow_s_garment_in_pledge, 'This command assigns responsibility for loss or damage and turns wrongdoing toward restitution where Torah requires it: Do not take a widow''s garment in pledge.').

% Command: do_not_enter_a_borrower_s_house_to_take_a_pledge
command(do_not_enter_a_borrower_s_house_to_take_a_pledge).
command_title(do_not_enter_a_borrower_s_house_to_take_a_pledge, 'Deuteronomy 24:10-11 - Do not enter a borrower''s house to take a pledge.').
normal_obedience(do_not_enter_a_borrower_s_house_to_take_a_pledge, 'Do not enter a borrower''s house to take a pledge.').
concerns(do_not_enter_a_borrower_s_house_to_take_a_pledge, damages_and_restitution).
scripture_reference(do_not_enter_a_borrower_s_house_to_take_a_pledge, 'Deuteronomy 24:10-11').
story_reference(do_not_enter_a_borrower_s_house_to_take_a_pledge, 'Nehemiah 5:1-13', 'Nehemiah addresses oppressive lending practices that had stripped families of fields, houses, and children.').
source_term(do_not_enter_a_borrower_s_house_to_take_a_pledge, hebrew, mashshah, 'loan or debt; the borrower is approached as a debtor, but his house boundary remains protected').
source_term(do_not_enter_a_borrower_s_house_to_take_a_pledge, hebrew, avot, 'pledge or security taken for a loan').
study_note(do_not_enter_a_borrower_s_house_to_take_a_pledge, 'This command assigns responsibility for loss or damage and turns wrongdoing toward restitution where Torah requires it: Do not enter a borrower''s house to take a pledge.').

% Command: return_a_poor_man_s_pledge_by_sunset
command(return_a_poor_man_s_pledge_by_sunset).
command_title(return_a_poor_man_s_pledge_by_sunset, 'Exodus 22:26-27 - Return a poor man''s pledge by sunset.').
normal_obedience(return_a_poor_man_s_pledge_by_sunset, 'Return a poor man''s pledge by sunset.').
concerns(return_a_poor_man_s_pledge_by_sunset, damages_and_restitution).
scripture_reference(return_a_poor_man_s_pledge_by_sunset, 'Exodus 22:26-27').
scripture_reference(return_a_poor_man_s_pledge_by_sunset, 'Deuteronomy 24:12-13').
story_reference(return_a_poor_man_s_pledge_by_sunset, 'Amos 2:6-8', 'The prophet rebukes those who lie beside every altar on garments taken in pledge.').
source_term(return_a_poor_man_s_pledge_by_sunset, hebrew, chabal, 'to take as a pledge or collateral').
source_term(return_a_poor_man_s_pledge_by_sunset, hebrew, salmah, 'outer garment or cloak; in context it may be the poor man''s only covering at night').
source_term(return_a_poor_man_s_pledge_by_sunset, hebrew, shemesh, 'sun; the pledge is returned before the sun goes down').
study_note(return_a_poor_man_s_pledge_by_sunset, 'This command assigns responsibility for loss or damage and turns wrongdoing toward restitution where Torah requires it: Return a poor man''s pledge by sunset.').

% Command: do_not_take_both_millstones_or_the_upper_millstone_as_pledge
command(do_not_take_both_millstones_or_the_upper_millstone_as_pledge).
command_title(do_not_take_both_millstones_or_the_upper_millstone_as_pledge, 'Deuteronomy 24:6 - Do not take both millstones or the upper millstone as pledge.').
normal_obedience(do_not_take_both_millstones_or_the_upper_millstone_as_pledge, 'Do not take both millstones or the upper millstone as pledge.').
concerns(do_not_take_both_millstones_or_the_upper_millstone_as_pledge, damages_and_restitution).
scripture_reference(do_not_take_both_millstones_or_the_upper_millstone_as_pledge, 'Deuteronomy 24:6').
study_note(do_not_take_both_millstones_or_the_upper_millstone_as_pledge, 'This command assigns responsibility for loss or damage and turns wrongdoing toward restitution where Torah requires it: Do not take both millstones or the upper millstone as pledge.').
clarification_note(do_not_take_both_millstones_or_the_upper_millstone_as_pledge, 'A pledge was collateral for a loan. A millstone was used every day to grind grain into flour, which was essential for making bread. The point is: A lender could require collateral, but not something essential to the borrower''s survival. Taking someone''s millstone would effectively prevent them from preparing food or earning a living. That is why the text says it would be like taking a life in pledge - you''re not merely taking property, you''re taking away the person''s ability to sustain themselves.').
command_requirement(do_not_take_both_millstones_or_the_upper_millstone_as_pledge, 'Lenders').
source_term(do_not_take_both_millstones_or_the_upper_millstone_as_pledge, hebrew, recheh, 'millstone; part of the hand-mill used to grind grain for bread').
source_term(do_not_take_both_millstones_or_the_upper_millstone_as_pledge, hebrew, rekeb, 'upper millstone, literally the rider, the movable stone used over the lower stone').
source_term(do_not_take_both_millstones_or_the_upper_millstone_as_pledge, hebrew, nephesh, 'life or living being; Deuteronomy says taking the millstone as pledge is taking life in pledge').

% Command: do_not_move_your_neighbor_s_boundary_marker
command(do_not_move_your_neighbor_s_boundary_marker).
command_title(do_not_move_your_neighbor_s_boundary_marker, 'Deuteronomy 19:14 - Do not move your neighbor''s boundary marker.').
normal_obedience(do_not_move_your_neighbor_s_boundary_marker, 'Do not move your neighbor''s boundary marker.').
concerns(do_not_move_your_neighbor_s_boundary_marker, damages_and_restitution).
scripture_reference(do_not_move_your_neighbor_s_boundary_marker, 'Deuteronomy 19:14').
story_reference(do_not_move_your_neighbor_s_boundary_marker, 'Hosea 5:10', 'The princes of Judah are compared to those who move a boundary marker.').
source_term(do_not_move_your_neighbor_s_boundary_marker, hebrew, gevul, 'border, boundary, or territory marker that protects a neighbor inheritance').
source_term(do_not_move_your_neighbor_s_boundary_marker, hebrew, nasag, 'to move back, remove, or shift a boundary').
study_note(do_not_move_your_neighbor_s_boundary_marker, 'This command assigns responsibility for loss or damage and turns wrongdoing toward restitution where Torah requires it: Do not move your neighbor''s boundary marker.').
