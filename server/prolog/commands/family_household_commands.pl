% =============================================================================
% Command Group: Family And Household
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
% study_note(command_key, 'Short human note about scope, context, or review status.').
%
% Optional review/detail fields:
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

% Command: honor_father_and_mother
command(honor_father_and_mother).
command_title(honor_father_and_mother, 'Exo 20:12 - Honor father and mother.').
normal_obedience(honor_father_and_mother, 'Honor your father and your mother.').
concerns(honor_father_and_mother, family_order).
scripture_reference(honor_father_and_mother, 'Exodus 20:12').
scripture_reference(honor_father_and_mother, 'Deuteronomy 5:16').
study_note(honor_father_and_mother, 'This command anchors household honor across generations.').

% Command: do_not_murder
command(do_not_murder).
command_title(do_not_murder, 'Exo 20:13 - Do not murder.').
normal_obedience(do_not_murder, 'Do not murder.').
concerns(do_not_murder, neighbor_protection).
scripture_reference(do_not_murder, 'Exodus 20:13').
scripture_reference(do_not_murder, 'Deuteronomy 5:17').
study_note(do_not_murder, 'The command protects human life.').

% Command: do_not_commit_adultery
command(do_not_commit_adultery).
command_title(do_not_commit_adultery, 'Exo 20:14 - Do not commit adultery.').
normal_obedience(do_not_commit_adultery, 'Do not commit adultery.').
concerns(do_not_commit_adultery, sexual_boundaries).
scripture_reference(do_not_commit_adultery, 'Exodus 20:14').
scripture_reference(do_not_commit_adultery, 'Deuteronomy 5:18').
study_note(do_not_commit_adultery, 'The command protects marriage covenant faithfulness.').

% Command: keep_forbidden_relations_boundaries
command(keep_forbidden_relations_boundaries).
command_title(keep_forbidden_relations_boundaries, 'Lev 18 - Keep forbidden relation boundaries.').
normal_obedience(keep_forbidden_relations_boundaries, 'Do not uncover the nakedness of forbidden near relations.').
concerns(keep_forbidden_relations_boundaries, sexual_boundaries).
scripture_reference(keep_forbidden_relations_boundaries, 'Leviticus 18').
scripture_reference(keep_forbidden_relations_boundaries, 'Leviticus 20').
study_note(keep_forbidden_relations_boundaries, 'Torah gives detailed sexual boundaries for family and community holiness.').

% Command: do_not_give_children_to_molech
command(do_not_give_children_to_molech).
command_title(do_not_give_children_to_molech, 'Lev 18:21 - Do not give children to Molech.').
normal_obedience(do_not_give_children_to_molech, 'Do not give offspring to Molech or profane YHWH''s Name.').
concerns(do_not_give_children_to_molech, reject_idolatry).
scripture_reference(do_not_give_children_to_molech, 'Leviticus 18:21').
scripture_reference(do_not_give_children_to_molech, 'Leviticus 20:2-5').
study_note(do_not_give_children_to_molech, 'The command joins child protection with rejection of idolatry.').

% Command: protect_newlywed_household
command(protect_newlywed_household).
command_title(protect_newlywed_household, 'Deu 24:5 - Protect the newlywed household.').
normal_obedience(protect_newlywed_household, 'A newly married man is free from public duty for one year to gladden his wife.').
concerns(protect_newlywed_household, family_order).
scripture_reference(protect_newlywed_household, 'Deuteronomy 24:5').
study_note(protect_newlywed_household, 'This command protects the beginning of a household.').

% Command: do_not_take_millstone_as_pledge
command(do_not_take_millstone_as_pledge).
command_title(do_not_take_millstone_as_pledge, 'Deu 24:6 - Do not take a millstone as pledge.').
normal_obedience(do_not_take_millstone_as_pledge, 'Do not take a millstone or upper millstone as pledge.').
concerns(do_not_take_millstone_as_pledge, neighbor_protection).
scripture_reference(do_not_take_millstone_as_pledge, 'Deuteronomy 24:6').
study_note(do_not_take_millstone_as_pledge, 'The command protects a household''s means of life.').

% Command: do_not_return_runaway_slave
command(do_not_return_runaway_slave).
command_title(do_not_return_runaway_slave, 'Deu 23:15-16 - Do not return a runaway slave.').
normal_obedience(do_not_return_runaway_slave, 'Do not hand over a slave who escapes to you from his master.').
concerns(do_not_return_runaway_slave, neighbor_protection).
scripture_reference(do_not_return_runaway_slave, 'Deuteronomy 23:15-16').
study_note(do_not_return_runaway_slave, 'The command protects a vulnerable person seeking refuge.').

% -----------------------------------------------------------------------------
% Additional Family, Household, And Servant Review Commands
% -----------------------------------------------------------------------------

% Command: honor_father_and_mother_2
command(honor_father_and_mother_2).
command_title(honor_father_and_mother_2, 'Exodus 20:12 - Honor father and mother.').
normal_obedience(honor_father_and_mother_2, 'Honor father and mother.').
concerns(honor_father_and_mother_2, marriage_household_procedure).
scripture_reference(honor_father_and_mother_2, 'Exodus 20:12').
scripture_reference(honor_father_and_mother_2, 'Deuteronomy 5:16').
study_note(honor_father_and_mother_2, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: do_not_strike_father_or_mother
command(do_not_strike_father_or_mother).
command_title(do_not_strike_father_or_mother, 'Exodus 21:15 - Do not strike father or mother.').
normal_obedience(do_not_strike_father_or_mother, 'Do not strike father or mother.').
concerns(do_not_strike_father_or_mother, marriage_household_procedure).
scripture_reference(do_not_strike_father_or_mother, 'Exodus 21:15').
study_note(do_not_strike_father_or_mother, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: do_not_curse_father_or_mother
command(do_not_curse_father_or_mother).
command_title(do_not_curse_father_or_mother, 'Exodus 21:17 - Do not curse father or mother.').
normal_obedience(do_not_curse_father_or_mother, 'Do not curse father or mother.').
concerns(do_not_curse_father_or_mother, marriage_household_procedure).
scripture_reference(do_not_curse_father_or_mother, 'Exodus 21:17').
study_note(do_not_curse_father_or_mother, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: do_not_uncover_the_nakedness_of_close_relatives
command(do_not_uncover_the_nakedness_of_close_relatives).
command_title(do_not_uncover_the_nakedness_of_close_relatives, 'Leviticus 18 - Do not uncover the nakedness of close relatives.').
normal_obedience(do_not_uncover_the_nakedness_of_close_relatives, 'Do not uncover the nakedness of close relatives.').
concerns(do_not_uncover_the_nakedness_of_close_relatives, marriage_household_procedure).
scripture_reference(do_not_uncover_the_nakedness_of_close_relatives, 'Leviticus 18').
study_note(do_not_uncover_the_nakedness_of_close_relatives, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: do_not_commit_adultery_2
command(do_not_commit_adultery_2).
command_title(do_not_commit_adultery_2, 'Exodus 20:14 - Do not commit adultery.').
normal_obedience(do_not_commit_adultery_2, 'Do not commit adultery.').
concerns(do_not_commit_adultery_2, marriage_household_procedure).
scripture_reference(do_not_commit_adultery_2, 'Exodus 20:14').
scripture_reference(do_not_commit_adultery_2, 'Deuteronomy 5:18').
study_note(do_not_commit_adultery_2, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: do_not_lie_with_your_neighbor_s_wife
command(do_not_lie_with_your_neighbor_s_wife).
command_title(do_not_lie_with_your_neighbor_s_wife, 'Leviticus 18:20 - Do not lie with your neighbor''s wife.').
normal_obedience(do_not_lie_with_your_neighbor_s_wife, 'Do not lie with your neighbor''s wife.').
concerns(do_not_lie_with_your_neighbor_s_wife, marriage_household_procedure).
scripture_reference(do_not_lie_with_your_neighbor_s_wife, 'Leviticus 18:20').
study_note(do_not_lie_with_your_neighbor_s_wife, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: do_not_lie_with_a_male_as_with_a_woman
command(do_not_lie_with_a_male_as_with_a_woman).
command_title(do_not_lie_with_a_male_as_with_a_woman, 'Leviticus 18:22 - Do not lie with a male as with a woman.').
normal_obedience(do_not_lie_with_a_male_as_with_a_woman, 'Do not lie with a male as with a woman.').
concerns(do_not_lie_with_a_male_as_with_a_woman, marriage_household_procedure).
scripture_reference(do_not_lie_with_a_male_as_with_a_woman, 'Leviticus 18:22').
study_note(do_not_lie_with_a_male_as_with_a_woman, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: do_not_lie_with_an_animal
command(do_not_lie_with_an_animal).
command_title(do_not_lie_with_an_animal, 'Leviticus 18:23 - Do not lie with an animal.').
normal_obedience(do_not_lie_with_an_animal, 'Do not lie with an animal.').
concerns(do_not_lie_with_an_animal, marriage_household_procedure).
scripture_reference(do_not_lie_with_an_animal, 'Leviticus 18:23').
study_note(do_not_lie_with_an_animal, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: a_woman_must_not_stand_before_an_animal_to_mate_with_it
command(a_woman_must_not_stand_before_an_animal_to_mate_with_it).
command_title(a_woman_must_not_stand_before_an_animal_to_mate_with_it, 'Leviticus 18:23 - A woman must not stand before an animal to mate with it.').
normal_obedience(a_woman_must_not_stand_before_an_animal_to_mate_with_it, 'A woman must not stand before an animal to mate with it.').
concerns(a_woman_must_not_stand_before_an_animal_to_mate_with_it, marriage_household_procedure).
scripture_reference(a_woman_must_not_stand_before_an_animal_to_mate_with_it, 'Leviticus 18:23').
study_note(a_woman_must_not_stand_before_an_animal_to_mate_with_it, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: do_not_give_offspring_to_molech
command(do_not_give_offspring_to_molech).
command_title(do_not_give_offspring_to_molech, 'Leviticus 18:21 - Do not give offspring to Molech.').
normal_obedience(do_not_give_offspring_to_molech, 'Do not give offspring to Molech.').
concerns(do_not_give_offspring_to_molech, marriage_household_procedure).
scripture_reference(do_not_give_offspring_to_molech, 'Leviticus 18:21').
study_note(do_not_give_offspring_to_molech, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: do_not_marry_a_woman_and_her_mother
command(do_not_marry_a_woman_and_her_mother).
command_title(do_not_marry_a_woman_and_her_mother, 'Leviticus 20:14 - Do not marry a woman and her mother.').
normal_obedience(do_not_marry_a_woman_and_her_mother, 'Do not marry a woman and her mother.').
concerns(do_not_marry_a_woman_and_her_mother, marriage_household_procedure).
scripture_reference(do_not_marry_a_woman_and_her_mother, 'Leviticus 20:14').
study_note(do_not_marry_a_woman_and_her_mother, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: follow_the_accused_bride_case_procedure
command(follow_the_accused_bride_case_procedure).
command_title(follow_the_accused_bride_case_procedure, 'Deuteronomy 22:13-21 - Follow the accused bride case procedure.').
normal_obedience(follow_the_accused_bride_case_procedure, 'Follow the accused bride case procedure.').
concerns(follow_the_accused_bride_case_procedure, marriage_household_procedure).
scripture_reference(follow_the_accused_bride_case_procedure, 'Deuteronomy 22:13-21').
study_note(follow_the_accused_bride_case_procedure, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: follow_the_betrothed_virgin_violation_case_procedure
command(follow_the_betrothed_virgin_violation_case_procedure).
command_title(follow_the_betrothed_virgin_violation_case_procedure, 'Deuteronomy 22:23-27 - Follow the betrothed virgin violation case procedure.').
normal_obedience(follow_the_betrothed_virgin_violation_case_procedure, 'Follow the betrothed virgin violation case procedure.').
concerns(follow_the_betrothed_virgin_violation_case_procedure, marriage_household_procedure).
scripture_reference(follow_the_betrothed_virgin_violation_case_procedure, 'Deuteronomy 22:23-27').
study_note(follow_the_betrothed_virgin_violation_case_procedure, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: follow_the_unbetrothed_virgin_violation_case_procedure
command(follow_the_unbetrothed_virgin_violation_case_procedure).
command_title(follow_the_unbetrothed_virgin_violation_case_procedure, 'Deuteronomy 22:28-29 - Follow the unbetrothed virgin violation case procedure.').
normal_obedience(follow_the_unbetrothed_virgin_violation_case_procedure, 'Follow the unbetrothed virgin violation case procedure.').
concerns(follow_the_unbetrothed_virgin_violation_case_procedure, marriage_household_procedure).
scripture_reference(follow_the_unbetrothed_virgin_violation_case_procedure, 'Deuteronomy 22:28-29').
study_note(follow_the_unbetrothed_virgin_violation_case_procedure, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: do_not_take_your_father_s_wife
command(do_not_take_your_father_s_wife).
command_title(do_not_take_your_father_s_wife, 'Deuteronomy 22:30 - Do not take your father''s wife.').
normal_obedience(do_not_take_your_father_s_wife, 'Do not take your father''s wife.').
concerns(do_not_take_your_father_s_wife, marriage_household_procedure).
scripture_reference(do_not_take_your_father_s_wife, 'Deuteronomy 22:30').
study_note(do_not_take_your_father_s_wife, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: do_not_remarry_a_former_wife_after_she_became_another_man_s_wife
command(do_not_remarry_a_former_wife_after_she_became_another_man_s_wife).
command_title(do_not_remarry_a_former_wife_after_she_became_another_man_s_wife, 'Deuteronomy 24:1-4 - Do not remarry a former wife after she became another man''s wife.').
normal_obedience(do_not_remarry_a_former_wife_after_she_became_another_man_s_wife, 'Do not remarry a former wife after she became another man''s wife.').
concerns(do_not_remarry_a_former_wife_after_she_became_another_man_s_wife, marriage_household_procedure).
scripture_reference(do_not_remarry_a_former_wife_after_she_became_another_man_s_wife, 'Deuteronomy 24:1-4').
study_note(do_not_remarry_a_former_wife_after_she_became_another_man_s_wife, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: perform_levirate_marriage_in_the_stated_brother_childless_case
command(perform_levirate_marriage_in_the_stated_brother_childless_case).
command_title(perform_levirate_marriage_in_the_stated_brother_childless_case, 'Deuteronomy 25:5-6 - Perform levirate marriage in the stated brother-childless case.').
normal_obedience(perform_levirate_marriage_in_the_stated_brother_childless_case, 'Perform levirate marriage in the stated brother-childless case.').
concerns(perform_levirate_marriage_in_the_stated_brother_childless_case, marriage_household_procedure).
scripture_reference(perform_levirate_marriage_in_the_stated_brother_childless_case, 'Deuteronomy 25:5-6').
study_note(perform_levirate_marriage_in_the_stated_brother_childless_case, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: perform_the_shoe_removal_procedure_if_levirate_duty_is_refused
command(perform_the_shoe_removal_procedure_if_levirate_duty_is_refused).
command_title(perform_the_shoe_removal_procedure_if_levirate_duty_is_refused, 'Deuteronomy 25:7-10 - Perform the shoe-removal procedure if levirate duty is refused.').
normal_obedience(perform_the_shoe_removal_procedure_if_levirate_duty_is_refused, 'Perform the shoe-removal procedure if levirate duty is refused.').
concerns(perform_the_shoe_removal_procedure_if_levirate_duty_is_refused, marriage_household_procedure).
scripture_reference(perform_the_shoe_removal_procedure_if_levirate_duty_is_refused, 'Deuteronomy 25:7-10').
study_note(perform_the_shoe_removal_procedure_if_levirate_duty_is_refused, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: a_newly_married_man_must_not_go_out_with_the_army_or_be_charged_with_public_du
command(a_newly_married_man_must_not_go_out_with_the_army_or_be_charged_with_public_du).
command_title(a_newly_married_man_must_not_go_out_with_the_army_or_be_charged_with_public_du, 'Deuteronomy 24:5 - A newly married man must not go out with the army or be charged with public duty for one year.').
normal_obedience(a_newly_married_man_must_not_go_out_with_the_army_or_be_charged_with_public_du, 'A newly married man must not go out with the army or be charged with public duty for one year.').
concerns(a_newly_married_man_must_not_go_out_with_the_army_or_be_charged_with_public_du, marriage_household_procedure).
scripture_reference(a_newly_married_man_must_not_go_out_with_the_army_or_be_charged_with_public_du, 'Deuteronomy 24:5').
study_note(a_newly_married_man_must_not_go_out_with_the_army_or_be_charged_with_public_du, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: let_the_runaway_slave_dwell_where_he_chooses_among_you
command(let_the_runaway_slave_dwell_where_he_chooses_among_you).
command_title(let_the_runaway_slave_dwell_where_he_chooses_among_you, 'Deuteronomy 23:16 - Let the runaway slave dwell where he chooses among you.').
normal_obedience(let_the_runaway_slave_dwell_where_he_chooses_among_you, 'Let the runaway slave dwell where he chooses among you.').
concerns(let_the_runaway_slave_dwell_where_he_chooses_among_you, servant_release_mercy).
scripture_reference(let_the_runaway_slave_dwell_where_he_chooses_among_you, 'Deuteronomy 23:16').
study_note(let_the_runaway_slave_dwell_where_he_chooses_among_you, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: do_not_oppress_the_stranger
command(do_not_oppress_the_stranger).
command_title(do_not_oppress_the_stranger, 'Exodus 22:21 - Do not oppress the stranger.').
normal_obedience(do_not_oppress_the_stranger, 'Do not oppress the stranger.').
concerns(do_not_oppress_the_stranger, servant_release_mercy).
scripture_reference(do_not_oppress_the_stranger, 'Exodus 22:21').
scripture_reference(do_not_oppress_the_stranger, '23:9').
study_note(do_not_oppress_the_stranger, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: love_the_stranger
command(love_the_stranger).
command_title(love_the_stranger, 'Deuteronomy 10:19 - Love the stranger.').
normal_obedience(love_the_stranger, 'Love the stranger.').
concerns(love_the_stranger, servant_release_mercy).
scripture_reference(love_the_stranger, 'Deuteronomy 10:19').
study_note(love_the_stranger, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: do_not_afflict_widow_or_orphan
command(do_not_afflict_widow_or_orphan).
command_title(do_not_afflict_widow_or_orphan, 'Exodus 22:22 - Do not afflict widow or orphan.').
normal_obedience(do_not_afflict_widow_or_orphan, 'Do not afflict widow or orphan.').
concerns(do_not_afflict_widow_or_orphan, servant_release_mercy).
scripture_reference(do_not_afflict_widow_or_orphan, 'Exodus 22:22').
study_note(do_not_afflict_widow_or_orphan, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: give_justice_to_stranger_orphan_and_widow
command(give_justice_to_stranger_orphan_and_widow).
command_title(give_justice_to_stranger_orphan_and_widow, 'Deuteronomy 24:17 - Give justice to stranger, orphan, and widow.').
normal_obedience(give_justice_to_stranger_orphan_and_widow, 'Give justice to stranger, orphan, and widow.').
concerns(give_justice_to_stranger_orphan_and_widow, servant_release_mercy).
scripture_reference(give_justice_to_stranger_orphan_and_widow, 'Deuteronomy 24:17').
study_note(give_justice_to_stranger_orphan_and_widow, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: leave_forgotten_sheaf_for_stranger_orphan_and_widow
command(leave_forgotten_sheaf_for_stranger_orphan_and_widow).
command_title(leave_forgotten_sheaf_for_stranger_orphan_and_widow, 'Deuteronomy 24:19 - Leave forgotten sheaf for stranger, orphan, and widow.').
normal_obedience(leave_forgotten_sheaf_for_stranger_orphan_and_widow, 'Leave forgotten sheaf for stranger, orphan, and widow.').
concerns(leave_forgotten_sheaf_for_stranger_orphan_and_widow, servant_release_mercy).
scripture_reference(leave_forgotten_sheaf_for_stranger_orphan_and_widow, 'Deuteronomy 24:19').
study_note(leave_forgotten_sheaf_for_stranger_orphan_and_widow, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: leave_olive_and_grape_gleanings_for_stranger_orphan_and_widow
command(leave_olive_and_grape_gleanings_for_stranger_orphan_and_widow).
command_title(leave_olive_and_grape_gleanings_for_stranger_orphan_and_widow, 'Deuteronomy 24:20-21 - Leave olive and grape gleanings for stranger, orphan, and widow.').
normal_obedience(leave_olive_and_grape_gleanings_for_stranger_orphan_and_widow, 'Leave olive and grape gleanings for stranger, orphan, and widow.').
concerns(leave_olive_and_grape_gleanings_for_stranger_orphan_and_widow, servant_release_mercy).
scripture_reference(leave_olive_and_grape_gleanings_for_stranger_orphan_and_widow, 'Deuteronomy 24:20-21').
study_note(leave_olive_and_grape_gleanings_for_stranger_orphan_and_widow, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: follow_the_captive_woman_procedure_before_marriage
command(follow_the_captive_woman_procedure_before_marriage).
command_title(follow_the_captive_woman_procedure_before_marriage, 'Deuteronomy 21:10-14 - Follow the captive woman procedure before marriage.').
normal_obedience(follow_the_captive_woman_procedure_before_marriage, 'Follow the captive woman procedure before marriage.').
concerns(follow_the_captive_woman_procedure_before_marriage, servant_release_mercy).
scripture_reference(follow_the_captive_woman_procedure_before_marriage, 'Deuteronomy 21:10-14').
study_note(follow_the_captive_woman_procedure_before_marriage, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: do_not_sell_the_captive_woman_if_released
command(do_not_sell_the_captive_woman_if_released).
command_title(do_not_sell_the_captive_woman_if_released, 'Deuteronomy 21:14 - Do not sell the captive woman if released.').
normal_obedience(do_not_sell_the_captive_woman_if_released, 'Do not sell the captive woman if released.').
concerns(do_not_sell_the_captive_woman_if_released, servant_release_mercy).
scripture_reference(do_not_sell_the_captive_woman_if_released, 'Deuteronomy 21:14').
study_note(do_not_sell_the_captive_woman_if_released, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: do_not_treat_the_captive_woman_as_a_slave_after_humbling_her
command(do_not_treat_the_captive_woman_as_a_slave_after_humbling_her).
command_title(do_not_treat_the_captive_woman_as_a_slave_after_humbling_her, 'Deuteronomy 21:14 - Do not treat the captive woman as a slave after humbling her.').
normal_obedience(do_not_treat_the_captive_woman_as_a_slave_after_humbling_her, 'Do not treat the captive woman as a slave after humbling her.').
concerns(do_not_treat_the_captive_woman_as_a_slave_after_humbling_her, servant_release_mercy).
scripture_reference(do_not_treat_the_captive_woman_as_a_slave_after_humbling_her, 'Deuteronomy 21:14').
study_note(do_not_treat_the_captive_woman_as_a_slave_after_humbling_her, 'TODO: Verify wording against the written Torah text before final catalog refinement.').
