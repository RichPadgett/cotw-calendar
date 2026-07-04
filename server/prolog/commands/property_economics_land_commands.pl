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
study_note(do_not_steal, 'The command protects neighbor property and trust.').

% Command: do_not_covet
command(do_not_covet).
command_title(do_not_covet, 'Exo 20:17 - Do not covet.').
normal_obedience(do_not_covet, 'Do not covet your neighbor''s household, spouse, servants, animals, or anything belonging to him.').
concerns(do_not_covet, neighbor_protection).
scripture_reference(do_not_covet, 'Exodus 20:17').
scripture_reference(do_not_covet, 'Deuteronomy 5:21').
story_reference(do_not_covet, '1 Kings 21:1-16', 'Ahab covets Naboth''s vineyard and the desire leads to false witness and murder.').
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
study_note(use_honest_weights_and_measures, 'Business integrity is a Torah matter.').

% Command: pay_wages_on_time
command(pay_wages_on_time).
command_title(pay_wages_on_time, 'Deu 24:14-15 - Pay wages on time.').
normal_obedience(pay_wages_on_time, 'Do not oppress a hired worker; give wages on the same day.').
concerns(pay_wages_on_time, honest_business).
scripture_reference(pay_wages_on_time, 'Leviticus 19:13').
scripture_reference(pay_wages_on_time, 'Deuteronomy 24:14-15').
story_reference(pay_wages_on_time, 'Jeremiah 22:13', 'The prophet rebukes building by unrighteousness and making a neighbor serve without wages.').
study_note(pay_wages_on_time, 'The command protects workers from delayed pay.').

% Command: return_lost_property
command(return_lost_property).
command_title(return_lost_property, 'Deu 22:1-3 - Return lost property.').
normal_obedience(return_lost_property, 'Do not ignore lost property; return it to your brother.').
concerns(return_lost_property, property_restoration).
scripture_reference(return_lost_property, 'Deuteronomy 22:1-3').
study_note(return_lost_property, 'Torah makes restoration an active neighbor duty.').

% Command: help_fallen_animal
command(help_fallen_animal).
command_title(help_fallen_animal, 'Deu 22:4 - Help a fallen animal.').
normal_obedience(help_fallen_animal, 'Do not ignore your brother''s fallen animal; help lift it up.').
concerns(help_fallen_animal, neighbor_protection).
scripture_reference(help_fallen_animal, 'Exodus 23:4-5').
scripture_reference(help_fallen_animal, 'Deuteronomy 22:4').
study_note(help_fallen_animal, 'Neighbor help includes practical intervention, even with animals.').

% Command: leave_gleanings_for_poor_and_stranger
command(leave_gleanings_for_poor_and_stranger).
command_title(leave_gleanings_for_poor_and_stranger, 'Lev 19:9-10 - Leave gleanings.').
normal_obedience(leave_gleanings_for_poor_and_stranger, 'Leave corners and gleanings for the poor and the stranger.').
concerns(leave_gleanings_for_poor_and_stranger, include_vulnerable_neighbors).
scripture_reference(leave_gleanings_for_poor_and_stranger, 'Leviticus 19:9-10').
scripture_reference(leave_gleanings_for_poor_and_stranger, 'Deuteronomy 24:19-22').
story_reference(leave_gleanings_for_poor_and_stranger, 'Ruth 2:2-17', 'Ruth gleans in Boaz''s field, showing the poor and stranger provision in practice.').
study_note(leave_gleanings_for_poor_and_stranger, 'Agricultural provision is built into Torah care for vulnerable neighbors.').

% Command: release_debts_in_seventh_year
command(release_debts_in_seventh_year).
command_title(release_debts_in_seventh_year, 'Deu 15:1-2 - Release debts in the seventh year.').
normal_obedience(release_debts_in_seventh_year, 'Release debts in the seventh year according to Torah.').
concerns(release_debts_in_seventh_year, debt_mercy).
scripture_reference(release_debts_in_seventh_year, 'Deuteronomy 15:1-11').
study_note(release_debts_in_seventh_year, 'The release year restrains permanent debt bondage among brothers.').

% Command: do_not_harden_heart_to_poor
command(do_not_harden_heart_to_poor).
command_title(do_not_harden_heart_to_poor, 'Deu 15:7-11 - Do not harden your heart to the poor.').
normal_obedience(do_not_harden_heart_to_poor, 'Open your hand to your poor brother and do not harden your heart.').
concerns(do_not_harden_heart_to_poor, include_vulnerable_neighbors).
scripture_reference(do_not_harden_heart_to_poor, 'Deuteronomy 15:7-11').
story_reference(do_not_harden_heart_to_poor, 'Nehemiah 5:1-13', 'Nehemiah confronts economic oppression and calls the nobles to restore what they took.').
study_note(do_not_harden_heart_to_poor, 'The command connects generosity to covenant community life.').

% Command: keep_sabbatical_year_for_land
command(keep_sabbatical_year_for_land).
command_title(keep_sabbatical_year_for_land, 'Lev 25:1-7 - Keep the land Sabbath.').
normal_obedience(keep_sabbatical_year_for_land, 'Let the land rest in the seventh year.').
concerns(keep_sabbatical_year_for_land, land_stewardship).
scripture_reference(keep_sabbatical_year_for_land, 'Leviticus 25:1-7').
story_reference(keep_sabbatical_year_for_land, '2 Chronicles 36:20-21', 'The exile is described as allowing the land to enjoy its Sabbaths.').
study_note(keep_sabbatical_year_for_land, 'The land Sabbath is tied to Israel''s land inheritance and trust in YHWH.').

% Command: proclaim_jubilee
command(proclaim_jubilee).
command_title(proclaim_jubilee, 'Lev 25:8-17 - Proclaim Jubilee.').
normal_obedience(proclaim_jubilee, 'Proclaim Jubilee and return property and liberty according to Torah.').
concerns(proclaim_jubilee, land_stewardship).
scripture_reference(proclaim_jubilee, 'Leviticus 25:8-17').
study_note(proclaim_jubilee, 'Jubilee restores land inheritance and liberty in Israel.').

% Command: do_not_move_boundary_marker
command(do_not_move_boundary_marker).
command_title(do_not_move_boundary_marker, 'Deu 19:14 - Do not move boundary markers.').
normal_obedience(do_not_move_boundary_marker, 'Do not move your neighbor''s boundary marker.').
concerns(do_not_move_boundary_marker, property_restoration).
scripture_reference(do_not_move_boundary_marker, 'Deuteronomy 19:14').
scripture_reference(do_not_move_boundary_marker, 'Deuteronomy 27:17').
story_reference(do_not_move_boundary_marker, 'Hosea 5:10', 'The princes of Judah are compared to those who move a boundary marker.').
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

% Command: do_not_reap_the_field_corner_completely
command(do_not_reap_the_field_corner_completely).
command_title(do_not_reap_the_field_corner_completely, 'Leviticus 19:9 - Do not reap the field corner completely.').
normal_obedience(do_not_reap_the_field_corner_completely, 'Do not reap the field corner completely.').
concerns(do_not_reap_the_field_corner_completely, land_stewardship).
scripture_reference(do_not_reap_the_field_corner_completely, 'Leviticus 19:9').
story_reference(do_not_reap_the_field_corner_completely, 'Ruth 2:15-16', 'Boaz commands his young men to let Ruth glean and even pull out handfuls for her.').
study_note(do_not_reap_the_field_corner_completely, 'This command treats land, harvest, inheritance, and provision as matters held under YHWH''s order: Do not reap the field corner completely.').

% Command: leave_gleanings_of_harvest_for_the_poor_and_stranger
command(leave_gleanings_of_harvest_for_the_poor_and_stranger).
command_title(leave_gleanings_of_harvest_for_the_poor_and_stranger, 'Leviticus 19:9 - Leave gleanings of harvest for the poor and stranger.').
normal_obedience(leave_gleanings_of_harvest_for_the_poor_and_stranger, 'Leave gleanings of harvest for the poor and stranger.').
concerns(leave_gleanings_of_harvest_for_the_poor_and_stranger, land_stewardship).
scripture_reference(leave_gleanings_of_harvest_for_the_poor_and_stranger, 'Leviticus 19:9').
story_reference(leave_gleanings_of_harvest_for_the_poor_and_stranger, 'Ruth 2:7-17', 'Ruth gleans after the reapers in Boaz''s field.').
study_note(leave_gleanings_of_harvest_for_the_poor_and_stranger, 'This command treats land, harvest, inheritance, and provision as matters held under YHWH''s order: Leave gleanings of harvest for the poor and stranger.').

% Command: do_not_gather_the_gleanings_of_harvest
command(do_not_gather_the_gleanings_of_harvest).
command_title(do_not_gather_the_gleanings_of_harvest, 'Leviticus 19:9 - Do not gather the gleanings of harvest.').
normal_obedience(do_not_gather_the_gleanings_of_harvest, 'Do not gather the gleanings of harvest.').
concerns(do_not_gather_the_gleanings_of_harvest, land_stewardship).
scripture_reference(do_not_gather_the_gleanings_of_harvest, 'Leviticus 19:9').
story_reference(do_not_gather_the_gleanings_of_harvest, 'Ruth 2:15-16', 'Boaz tells the workers not to reproach Ruth and to let grain fall for her to glean.').
study_note(do_not_gather_the_gleanings_of_harvest, 'This command treats land, harvest, inheritance, and provision as matters held under YHWH''s order: Do not gather the gleanings of harvest.').

% Command: leave_fallen_grapes_for_the_poor_and_stranger
command(leave_fallen_grapes_for_the_poor_and_stranger).
command_title(leave_fallen_grapes_for_the_poor_and_stranger, 'Leviticus 19:10 - Leave fallen grapes for the poor and stranger.').
normal_obedience(leave_fallen_grapes_for_the_poor_and_stranger, 'Leave fallen grapes for the poor and stranger.').
concerns(leave_fallen_grapes_for_the_poor_and_stranger, land_stewardship).
scripture_reference(leave_fallen_grapes_for_the_poor_and_stranger, 'Leviticus 19:10').
study_note(leave_fallen_grapes_for_the_poor_and_stranger, 'This command treats land, harvest, inheritance, and provision as matters held under YHWH''s order: Leave fallen grapes for the poor and stranger.').

% Command: do_not_strip_the_vineyard_bare
command(do_not_strip_the_vineyard_bare).
command_title(do_not_strip_the_vineyard_bare, 'Leviticus 19:10 - Do not strip the vineyard bare.').
normal_obedience(do_not_strip_the_vineyard_bare, 'Do not strip the vineyard bare.').
concerns(do_not_strip_the_vineyard_bare, land_stewardship).
scripture_reference(do_not_strip_the_vineyard_bare, 'Leviticus 19:10').
study_note(do_not_strip_the_vineyard_bare, 'This command treats land, harvest, inheritance, and provision as matters held under YHWH''s order: Do not strip the vineyard bare.').

% Command: let_the_land_rest_in_the_seventh_year
command(let_the_land_rest_in_the_seventh_year).
command_title(let_the_land_rest_in_the_seventh_year, 'Leviticus 25:1-7 - Let the land rest in the seventh year.').
normal_obedience(let_the_land_rest_in_the_seventh_year, 'Let the land rest in the seventh year.').
concerns(let_the_land_rest_in_the_seventh_year, land_stewardship).
scripture_reference(let_the_land_rest_in_the_seventh_year, 'Leviticus 25:1-7').
study_note(let_the_land_rest_in_the_seventh_year, 'This command treats land, harvest, inheritance, and provision as matters held under YHWH''s order: Let the land rest in the seventh year.').

% Command: do_not_sow_the_field_in_the_seventh_year
command(do_not_sow_the_field_in_the_seventh_year).
command_title(do_not_sow_the_field_in_the_seventh_year, 'Leviticus 25:4 - Do not sow the field in the seventh year.').
normal_obedience(do_not_sow_the_field_in_the_seventh_year, 'Do not sow the field in the seventh year.').
concerns(do_not_sow_the_field_in_the_seventh_year, land_stewardship).
scripture_reference(do_not_sow_the_field_in_the_seventh_year, 'Leviticus 25:4').
study_note(do_not_sow_the_field_in_the_seventh_year, 'This command treats land, harvest, inheritance, and provision as matters held under YHWH''s order: Do not sow the field in the seventh year.').

% Command: do_not_prune_the_vineyard_in_the_seventh_year
command(do_not_prune_the_vineyard_in_the_seventh_year).
command_title(do_not_prune_the_vineyard_in_the_seventh_year, 'Leviticus 25:4 - Do not prune the vineyard in the seventh year.').
normal_obedience(do_not_prune_the_vineyard_in_the_seventh_year, 'Do not prune the vineyard in the seventh year.').
concerns(do_not_prune_the_vineyard_in_the_seventh_year, land_stewardship).
scripture_reference(do_not_prune_the_vineyard_in_the_seventh_year, 'Leviticus 25:4').
study_note(do_not_prune_the_vineyard_in_the_seventh_year, 'This command treats land, harvest, inheritance, and provision as matters held under YHWH''s order: Do not prune the vineyard in the seventh year.').

% Command: do_not_reap_aftergrowth_as_ordinary_harvest_in_the_seventh_year
command(do_not_reap_aftergrowth_as_ordinary_harvest_in_the_seventh_year).
command_title(do_not_reap_aftergrowth_as_ordinary_harvest_in_the_seventh_year, 'Leviticus 25:5 - Do not reap aftergrowth as ordinary harvest in the seventh year.').
normal_obedience(do_not_reap_aftergrowth_as_ordinary_harvest_in_the_seventh_year, 'Do not reap aftergrowth as ordinary harvest in the seventh year.').
concerns(do_not_reap_aftergrowth_as_ordinary_harvest_in_the_seventh_year, land_stewardship).
scripture_reference(do_not_reap_aftergrowth_as_ordinary_harvest_in_the_seventh_year, 'Leviticus 25:5').
study_note(do_not_reap_aftergrowth_as_ordinary_harvest_in_the_seventh_year, 'This command treats land, harvest, inheritance, and provision as matters held under YHWH''s order: Do not reap aftergrowth as ordinary harvest in the seventh year.').

% Command: do_not_gather_unpruned_grapes_as_ordinary_harvest_in_the_seventh_year
command(do_not_gather_unpruned_grapes_as_ordinary_harvest_in_the_seventh_year).
command_title(do_not_gather_unpruned_grapes_as_ordinary_harvest_in_the_seventh_year, 'Leviticus 25:5 - Do not gather unpruned grapes as ordinary harvest in the seventh year.').
normal_obedience(do_not_gather_unpruned_grapes_as_ordinary_harvest_in_the_seventh_year, 'Do not gather unpruned grapes as ordinary harvest in the seventh year.').
concerns(do_not_gather_unpruned_grapes_as_ordinary_harvest_in_the_seventh_year, land_stewardship).
scripture_reference(do_not_gather_unpruned_grapes_as_ordinary_harvest_in_the_seventh_year, 'Leviticus 25:5').
study_note(do_not_gather_unpruned_grapes_as_ordinary_harvest_in_the_seventh_year, 'This command treats land, harvest, inheritance, and provision as matters held under YHWH''s order: Do not gather unpruned grapes as ordinary harvest in the seventh year.').

% Command: count_seven_sabbatical_cycles_toward_jubilee
command(count_seven_sabbatical_cycles_toward_jubilee).
command_title(count_seven_sabbatical_cycles_toward_jubilee, 'Leviticus 25:8 - Count seven sabbatical cycles toward Jubilee.').
normal_obedience(count_seven_sabbatical_cycles_toward_jubilee, 'Count seven sabbatical cycles toward Jubilee.').
concerns(count_seven_sabbatical_cycles_toward_jubilee, land_stewardship).
scripture_reference(count_seven_sabbatical_cycles_toward_jubilee, 'Leviticus 25:8').
study_note(count_seven_sabbatical_cycles_toward_jubilee, 'This command treats land, harvest, inheritance, and provision as matters held under YHWH''s order: Count seven sabbatical cycles toward Jubilee.').

% Command: sound_the_shofar_for_jubilee_on_day_of_atonement
command(sound_the_shofar_for_jubilee_on_day_of_atonement).
command_title(sound_the_shofar_for_jubilee_on_day_of_atonement, 'Leviticus 25:9 - Sound the shofar for Jubilee on Day of Atonement.').
normal_obedience(sound_the_shofar_for_jubilee_on_day_of_atonement, 'Sound the shofar for Jubilee on Day of Atonement.').
concerns(sound_the_shofar_for_jubilee_on_day_of_atonement, land_stewardship).
scripture_reference(sound_the_shofar_for_jubilee_on_day_of_atonement, 'Leviticus 25:9').
study_note(sound_the_shofar_for_jubilee_on_day_of_atonement, 'This command treats land, harvest, inheritance, and provision as matters held under YHWH''s order: Sound the shofar for Jubilee on Day of Atonement.').

% Command: proclaim_liberty_in_the_jubilee_year
command(proclaim_liberty_in_the_jubilee_year).
command_title(proclaim_liberty_in_the_jubilee_year, 'Leviticus 25:10 - Proclaim liberty in the Jubilee year.').
normal_obedience(proclaim_liberty_in_the_jubilee_year, 'Proclaim liberty in the Jubilee year.').
concerns(proclaim_liberty_in_the_jubilee_year, land_stewardship).
scripture_reference(proclaim_liberty_in_the_jubilee_year, 'Leviticus 25:10').
study_note(proclaim_liberty_in_the_jubilee_year, 'This command treats land, harvest, inheritance, and provision as matters held under YHWH''s order: Proclaim liberty in the Jubilee year.').

% Command: return_each_man_to_his_property_in_jubilee
command(return_each_man_to_his_property_in_jubilee).
command_title(return_each_man_to_his_property_in_jubilee, 'Leviticus 25:10 - Return each man to his property in Jubilee.').
normal_obedience(return_each_man_to_his_property_in_jubilee, 'Return each man to his property in Jubilee.').
concerns(return_each_man_to_his_property_in_jubilee, land_stewardship).
scripture_reference(return_each_man_to_his_property_in_jubilee, 'Leviticus 25:10').
study_note(return_each_man_to_his_property_in_jubilee, 'This command treats land, harvest, inheritance, and provision as matters held under YHWH''s order: Return each man to his property in Jubilee.').

% Command: do_not_sow_or_reap_ordinary_harvest_in_jubilee
command(do_not_sow_or_reap_ordinary_harvest_in_jubilee).
command_title(do_not_sow_or_reap_ordinary_harvest_in_jubilee, 'Leviticus 25:11 - Do not sow or reap ordinary harvest in Jubilee.').
normal_obedience(do_not_sow_or_reap_ordinary_harvest_in_jubilee, 'Do not sow or reap ordinary harvest in Jubilee.').
concerns(do_not_sow_or_reap_ordinary_harvest_in_jubilee, land_stewardship).
scripture_reference(do_not_sow_or_reap_ordinary_harvest_in_jubilee, 'Leviticus 25:11').
study_note(do_not_sow_or_reap_ordinary_harvest_in_jubilee, 'This command treats land, harvest, inheritance, and provision as matters held under YHWH''s order: Do not sow or reap ordinary harvest in Jubilee.').

% Command: do_not_sell_land_permanently
command(do_not_sell_land_permanently).
command_title(do_not_sell_land_permanently, 'Leviticus 25:23 - Do not sell land permanently.').
normal_obedience(do_not_sell_land_permanently, 'Do not sell land permanently.').
concerns(do_not_sell_land_permanently, land_stewardship).
scripture_reference(do_not_sell_land_permanently, 'Leviticus 25:23').
study_note(do_not_sell_land_permanently, 'This command treats land, harvest, inheritance, and provision as matters held under YHWH''s order: Do not sell land permanently.').

% Command: redeem_land_according_to_torah_redemption_law
command(redeem_land_according_to_torah_redemption_law).
command_title(redeem_land_according_to_torah_redemption_law, 'Leviticus 25:24-34 - Redeem land according to Torah redemption law.').
normal_obedience(redeem_land_according_to_torah_redemption_law, 'Redeem land according to Torah redemption law.').
concerns(redeem_land_according_to_torah_redemption_law, land_stewardship).
scripture_reference(redeem_land_according_to_torah_redemption_law, 'Leviticus 25:24-34').
study_note(redeem_land_according_to_torah_redemption_law, 'This command treats land, harvest, inheritance, and provision as matters held under YHWH''s order: Redeem land according to Torah redemption law.').

% Command: bring_firstfruits_of_the_land
command(bring_firstfruits_of_the_land).
command_title(bring_firstfruits_of_the_land, 'Deuteronomy 26:1-11 - Bring firstfruits of the land.').
normal_obedience(bring_firstfruits_of_the_land, 'Bring firstfruits of the land.').
concerns(bring_firstfruits_of_the_land, land_stewardship).
scripture_reference(bring_firstfruits_of_the_land, 'Deuteronomy 26:1-11').
story_reference(bring_firstfruits_of_the_land, '2 Chronicles 31:5', 'Israel brings firstfruits abundantly during Hezekiah''s reforms.').
study_note(bring_firstfruits_of_the_land, 'This command treats land, harvest, inheritance, and provision as matters held under YHWH''s order: Bring firstfruits of the land.').

% Command: give_the_tithe_to_levite_stranger_orphan_and_widow_in_the_third_year
command(give_the_tithe_to_levite_stranger_orphan_and_widow_in_the_third_year).
command_title(give_the_tithe_to_levite_stranger_orphan_and_widow_in_the_third_year, 'Deuteronomy 14:28-29 - Give the tithe to Levite, stranger, orphan, and widow in the third year.').
normal_obedience(give_the_tithe_to_levite_stranger_orphan_and_widow_in_the_third_year, 'Give the tithe to Levite, stranger, orphan, and widow in the third year.').
concerns(give_the_tithe_to_levite_stranger_orphan_and_widow_in_the_third_year, land_stewardship).
scripture_reference(give_the_tithe_to_levite_stranger_orphan_and_widow_in_the_third_year, 'Deuteronomy 14:28-29').
scripture_reference(give_the_tithe_to_levite_stranger_orphan_and_widow_in_the_third_year, '26:12').
study_note(give_the_tithe_to_levite_stranger_orphan_and_widow_in_the_third_year, 'This command treats land, harvest, inheritance, and provision as matters held under YHWH''s order: Give the tithe to Levite, stranger, orphan, and widow in the third year.').

% Command: do_not_neglect_the_levite
command(do_not_neglect_the_levite).
command_title(do_not_neglect_the_levite, 'Deuteronomy 12:19 - Do not neglect the Levite.').
normal_obedience(do_not_neglect_the_levite, 'Do not neglect the Levite.').
concerns(do_not_neglect_the_levite, land_stewardship).
scripture_reference(do_not_neglect_the_levite, 'Deuteronomy 12:19').
story_reference(do_not_neglect_the_levite, 'Nehemiah 13:10-12', 'Nehemiah restores the portions for the Levites after they had been neglected.').
study_note(do_not_neglect_the_levite, 'This command treats land, harvest, inheritance, and provision as matters held under YHWH''s order: Do not neglect the Levite.').

% Command: do_not_steal_2
command(do_not_steal_2).
command_title(do_not_steal_2, 'Exodus 20:15 - Do not steal.').
normal_obedience(do_not_steal_2, 'Do not steal.').
concerns(do_not_steal_2, damages_and_restitution).
scripture_reference(do_not_steal_2, 'Exodus 20:15').
study_note(do_not_steal_2, 'This command assigns responsibility for loss or damage and turns wrongdoing toward restitution where Torah requires it: Do not steal.').

% Command: do_not_deny_falsely_about_a_deposit_pledge_robbery_or_oppression
command(do_not_deny_falsely_about_a_deposit_pledge_robbery_or_oppression).
command_title(do_not_deny_falsely_about_a_deposit_pledge_robbery_or_oppression, 'Leviticus 6:1-7 - Do not deny falsely about a deposit, pledge, robbery, or oppression.').
normal_obedience(do_not_deny_falsely_about_a_deposit_pledge_robbery_or_oppression, 'Do not deny falsely about a deposit, pledge, robbery, or oppression.').
concerns(do_not_deny_falsely_about_a_deposit_pledge_robbery_or_oppression, damages_and_restitution).
scripture_reference(do_not_deny_falsely_about_a_deposit_pledge_robbery_or_oppression, 'Leviticus 6:1-7').
study_note(do_not_deny_falsely_about_a_deposit_pledge_robbery_or_oppression, 'This command assigns responsibility for loss or damage and turns wrongdoing toward restitution where Torah requires it: Do not deny falsely about a deposit, pledge, robbery, or oppression.').

% Command: do_not_lie_to_one_another
command(do_not_lie_to_one_another).
command_title(do_not_lie_to_one_another, 'Leviticus 19:11 - Do not lie to one another.').
normal_obedience(do_not_lie_to_one_another, 'Do not lie to one another.').
concerns(do_not_lie_to_one_another, damages_and_restitution).
scripture_reference(do_not_lie_to_one_another, 'Leviticus 19:11').
study_note(do_not_lie_to_one_another, 'This command assigns responsibility for loss or damage and turns wrongdoing toward restitution where Torah requires it: Do not lie to one another.').

% Command: restore_stolen_or_withheld_property_and_add_a_fifth_in_the_guilt_case
command(restore_stolen_or_withheld_property_and_add_a_fifth_in_the_guilt_case).
command_title(restore_stolen_or_withheld_property_and_add_a_fifth_in_the_guilt_case, 'Leviticus 6:1-7 - Restore stolen or withheld property and add a fifth in the guilt case.').
normal_obedience(restore_stolen_or_withheld_property_and_add_a_fifth_in_the_guilt_case, 'Restore stolen or withheld property and add a fifth in the guilt case.').
concerns(restore_stolen_or_withheld_property_and_add_a_fifth_in_the_guilt_case, damages_and_restitution).
scripture_reference(restore_stolen_or_withheld_property_and_add_a_fifth_in_the_guilt_case, 'Leviticus 6:1-7').
study_note(restore_stolen_or_withheld_property_and_add_a_fifth_in_the_guilt_case, 'This command assigns responsibility for loss or damage and turns wrongdoing toward restitution where Torah requires it: Restore stolen or withheld property and add a fifth in the guilt case.').

% Command: pay_restitution_for_theft_according_to_the_case
command(pay_restitution_for_theft_according_to_the_case).
command_title(pay_restitution_for_theft_according_to_the_case, 'Exodus 22:1-4 - Pay restitution for theft according to the case.').
normal_obedience(pay_restitution_for_theft_according_to_the_case, 'Pay restitution for theft according to the case.').
concerns(pay_restitution_for_theft_according_to_the_case, damages_and_restitution).
scripture_reference(pay_restitution_for_theft_according_to_the_case, 'Exodus 22:1-4').
study_note(pay_restitution_for_theft_according_to_the_case, 'This command assigns responsibility for loss or damage and turns wrongdoing toward restitution where Torah requires it: Pay restitution for theft according to the case.').

% Command: pay_for_grazing_damage_2
command(pay_for_grazing_damage_2).
command_title(pay_for_grazing_damage_2, 'Exodus 22:5 - Pay for grazing damage.').
normal_obedience(pay_for_grazing_damage_2, 'Pay for grazing damage.').
concerns(pay_for_grazing_damage_2, damages_and_restitution).
scripture_reference(pay_for_grazing_damage_2, 'Exodus 22:5').
study_note(pay_for_grazing_damage_2, 'This command assigns responsibility for loss or damage and turns wrongdoing toward restitution where Torah requires it: Pay for grazing damage.').

% Command: pay_for_fire_damage_2
command(pay_for_fire_damage_2).
command_title(pay_for_fire_damage_2, 'Exodus 22:6 - Pay for fire damage.').
normal_obedience(pay_for_fire_damage_2, 'Pay for fire damage.').
concerns(pay_for_fire_damage_2, damages_and_restitution).
scripture_reference(pay_for_fire_damage_2, 'Exodus 22:6').
study_note(pay_for_fire_damage_2, 'This command assigns responsibility for loss or damage and turns wrongdoing toward restitution where Torah requires it: Pay for fire damage.').

% Command: pay_for_pit_damage_2
command(pay_for_pit_damage_2).
command_title(pay_for_pit_damage_2, 'Exodus 21:33-34 - Pay for pit damage.').
normal_obedience(pay_for_pit_damage_2, 'Pay for pit damage.').
concerns(pay_for_pit_damage_2, damages_and_restitution).
scripture_reference(pay_for_pit_damage_2, 'Exodus 21:33-34').
study_note(pay_for_pit_damage_2, 'This command assigns responsibility for loss or damage and turns wrongdoing toward restitution where Torah requires it: Pay for pit damage.').

% Command: pay_for_borrowed_animal_loss_when_torah_assigns_responsibility
command(pay_for_borrowed_animal_loss_when_torah_assigns_responsibility).
command_title(pay_for_borrowed_animal_loss_when_torah_assigns_responsibility, 'Exodus 22:14-15 - Pay for borrowed animal loss when Torah assigns responsibility.').
normal_obedience(pay_for_borrowed_animal_loss_when_torah_assigns_responsibility, 'Pay for borrowed animal loss when Torah assigns responsibility.').
concerns(pay_for_borrowed_animal_loss_when_torah_assigns_responsibility, damages_and_restitution).
scripture_reference(pay_for_borrowed_animal_loss_when_torah_assigns_responsibility, 'Exodus 22:14-15').
study_note(pay_for_borrowed_animal_loss_when_torah_assigns_responsibility, 'This command assigns responsibility for loss or damage and turns wrongdoing toward restitution where Torah requires it: Pay for borrowed animal loss when Torah assigns responsibility.').

% Command: handle_entrusted_property_loss_according_to_torah
command(handle_entrusted_property_loss_according_to_torah).
command_title(handle_entrusted_property_loss_according_to_torah, 'Exodus 22:7-13 - Handle entrusted property loss according to Torah.').
normal_obedience(handle_entrusted_property_loss_according_to_torah, 'Handle entrusted property loss according to Torah.').
concerns(handle_entrusted_property_loss_according_to_torah, damages_and_restitution).
scripture_reference(handle_entrusted_property_loss_according_to_torah, 'Exodus 22:7-13').
study_note(handle_entrusted_property_loss_according_to_torah, 'This command assigns responsibility for loss or damage and turns wrongdoing toward restitution where Torah requires it: Handle entrusted property loss according to Torah.').

% Command: do_not_oppress_your_neighbor
command(do_not_oppress_your_neighbor).
command_title(do_not_oppress_your_neighbor, 'Leviticus 19:13 - Do not oppress your neighbor.').
normal_obedience(do_not_oppress_your_neighbor, 'Do not oppress your neighbor.').
concerns(do_not_oppress_your_neighbor, damages_and_restitution).
scripture_reference(do_not_oppress_your_neighbor, 'Leviticus 19:13').
study_note(do_not_oppress_your_neighbor, 'This command assigns responsibility for loss or damage and turns wrongdoing toward restitution where Torah requires it: Do not oppress your neighbor.').

% Command: do_not_rob
command(do_not_rob).
command_title(do_not_rob, 'Leviticus 19:13 - Do not rob.').
normal_obedience(do_not_rob, 'Do not rob.').
concerns(do_not_rob, damages_and_restitution).
scripture_reference(do_not_rob, 'Leviticus 19:13').
study_note(do_not_rob, 'This command assigns responsibility for loss or damage and turns wrongdoing toward restitution where Torah requires it: Do not rob.').

% Command: do_not_keep_a_hired_worker_s_wages_overnight
command(do_not_keep_a_hired_worker_s_wages_overnight).
command_title(do_not_keep_a_hired_worker_s_wages_overnight, 'Leviticus 19:13 - Do not keep a hired worker''s wages overnight.').
normal_obedience(do_not_keep_a_hired_worker_s_wages_overnight, 'Do not keep a hired worker''s wages overnight.').
concerns(do_not_keep_a_hired_worker_s_wages_overnight, damages_and_restitution).
scripture_reference(do_not_keep_a_hired_worker_s_wages_overnight, 'Leviticus 19:13').
study_note(do_not_keep_a_hired_worker_s_wages_overnight, 'This command assigns responsibility for loss or damage and turns wrongdoing toward restitution where Torah requires it: Do not keep a hired worker''s wages overnight.').

% Command: pay_a_poor_hired_worker_the_same_day
command(pay_a_poor_hired_worker_the_same_day).
command_title(pay_a_poor_hired_worker_the_same_day, 'Deuteronomy 24:14-15 - Pay a poor hired worker the same day.').
normal_obedience(pay_a_poor_hired_worker_the_same_day, 'Pay a poor hired worker the same day.').
concerns(pay_a_poor_hired_worker_the_same_day, damages_and_restitution).
scripture_reference(pay_a_poor_hired_worker_the_same_day, 'Deuteronomy 24:14-15').
study_note(pay_a_poor_hired_worker_the_same_day, 'This command assigns responsibility for loss or damage and turns wrongdoing toward restitution where Torah requires it: Pay a poor hired worker the same day.').

% Command: do_not_charge_interest_to_your_brother
command(do_not_charge_interest_to_your_brother).
command_title(do_not_charge_interest_to_your_brother, 'Exodus 22:25 - Do not charge interest to your brother.').
normal_obedience(do_not_charge_interest_to_your_brother, 'Do not charge interest to your brother.').
concerns(do_not_charge_interest_to_your_brother, damages_and_restitution).
scripture_reference(do_not_charge_interest_to_your_brother, 'Exodus 22:25').
scripture_reference(do_not_charge_interest_to_your_brother, 'Deuteronomy 23:19').
study_note(do_not_charge_interest_to_your_brother, 'This command assigns responsibility for loss or damage and turns wrongdoing toward restitution where Torah requires it: Do not charge interest to your brother.').

% Command: you_may_charge_interest_to_a_foreigner_as_stated
command(you_may_charge_interest_to_a_foreigner_as_stated).
command_title(you_may_charge_interest_to_a_foreigner_as_stated, 'Deuteronomy 23:20 - You may charge interest to a foreigner as stated.').
normal_obedience(you_may_charge_interest_to_a_foreigner_as_stated, 'You may charge interest to a foreigner as stated.').
concerns(you_may_charge_interest_to_a_foreigner_as_stated, damages_and_restitution).
scripture_reference(you_may_charge_interest_to_a_foreigner_as_stated, 'Deuteronomy 23:20').
study_note(you_may_charge_interest_to_a_foreigner_as_stated, 'This command assigns responsibility for loss or damage and turns wrongdoing toward restitution where Torah requires it: You may charge interest to a foreigner as stated.').

% Command: do_not_take_a_widow_s_garment_in_pledge
command(do_not_take_a_widow_s_garment_in_pledge).
command_title(do_not_take_a_widow_s_garment_in_pledge, 'Deuteronomy 24:17 - Do not take a widow''s garment in pledge.').
normal_obedience(do_not_take_a_widow_s_garment_in_pledge, 'Do not take a widow''s garment in pledge.').
concerns(do_not_take_a_widow_s_garment_in_pledge, damages_and_restitution).
scripture_reference(do_not_take_a_widow_s_garment_in_pledge, 'Deuteronomy 24:17').
study_note(do_not_take_a_widow_s_garment_in_pledge, 'This command assigns responsibility for loss or damage and turns wrongdoing toward restitution where Torah requires it: Do not take a widow''s garment in pledge.').

% Command: do_not_enter_a_borrower_s_house_to_take_a_pledge
command(do_not_enter_a_borrower_s_house_to_take_a_pledge).
command_title(do_not_enter_a_borrower_s_house_to_take_a_pledge, 'Deuteronomy 24:10-11 - Do not enter a borrower''s house to take a pledge.').
normal_obedience(do_not_enter_a_borrower_s_house_to_take_a_pledge, 'Do not enter a borrower''s house to take a pledge.').
concerns(do_not_enter_a_borrower_s_house_to_take_a_pledge, damages_and_restitution).
scripture_reference(do_not_enter_a_borrower_s_house_to_take_a_pledge, 'Deuteronomy 24:10-11').
study_note(do_not_enter_a_borrower_s_house_to_take_a_pledge, 'This command assigns responsibility for loss or damage and turns wrongdoing toward restitution where Torah requires it: Do not enter a borrower''s house to take a pledge.').

% Command: return_a_poor_man_s_pledge_by_sunset
command(return_a_poor_man_s_pledge_by_sunset).
command_title(return_a_poor_man_s_pledge_by_sunset, 'Exodus 22:26-27 - Return a poor man''s pledge by sunset.').
normal_obedience(return_a_poor_man_s_pledge_by_sunset, 'Return a poor man''s pledge by sunset.').
concerns(return_a_poor_man_s_pledge_by_sunset, damages_and_restitution).
scripture_reference(return_a_poor_man_s_pledge_by_sunset, 'Exodus 22:26-27').
scripture_reference(return_a_poor_man_s_pledge_by_sunset, 'Deuteronomy 24:12-13').
study_note(return_a_poor_man_s_pledge_by_sunset, 'This command assigns responsibility for loss or damage and turns wrongdoing toward restitution where Torah requires it: Return a poor man''s pledge by sunset.').

% Command: do_not_take_both_millstones_or_the_upper_millstone_as_pledge
command(do_not_take_both_millstones_or_the_upper_millstone_as_pledge).
command_title(do_not_take_both_millstones_or_the_upper_millstone_as_pledge, 'Deuteronomy 24:6 - Do not take both millstones or the upper millstone as pledge.').
normal_obedience(do_not_take_both_millstones_or_the_upper_millstone_as_pledge, 'Do not take both millstones or the upper millstone as pledge.').
concerns(do_not_take_both_millstones_or_the_upper_millstone_as_pledge, damages_and_restitution).
scripture_reference(do_not_take_both_millstones_or_the_upper_millstone_as_pledge, 'Deuteronomy 24:6').
command_requirement(do_not_take_both_millstones_or_the_upper_millstone_as_pledge, 'Lenders').


% Command: do_not_move_your_neighbor_s_boundary_marker
command(do_not_move_your_neighbor_s_boundary_marker).
command_title(do_not_move_your_neighbor_s_boundary_marker, 'Deuteronomy 19:14 - Do not move your neighbor''s boundary marker.').
normal_obedience(do_not_move_your_neighbor_s_boundary_marker, 'Do not move your neighbor''s boundary marker.').
concerns(do_not_move_your_neighbor_s_boundary_marker, damages_and_restitution).
scripture_reference(do_not_move_your_neighbor_s_boundary_marker, 'Deuteronomy 19:14').
study_note(do_not_move_your_neighbor_s_boundary_marker, 'This command assigns responsibility for loss or damage and turns wrongdoing toward restitution where Torah requires it: Do not move your neighbor''s boundary marker.').
