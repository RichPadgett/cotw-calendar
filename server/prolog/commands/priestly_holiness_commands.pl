% =============================================================================
% Command Group: Priestly Holiness
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

% Command: priests_keep_holy_status
command(priests_keep_holy_status).
command_title(priests_keep_holy_status, 'Lev 21 - Priests keep holy status.').
normal_obedience(priests_keep_holy_status, 'Priests keep the holiness requirements given for their service.').
concerns(priests_keep_holy_status, priestly_holiness).
scripture_reference(priests_keep_holy_status, 'Leviticus 21').
study_note(priests_keep_holy_status, 'This command applies specifically to priestly role and service.').

% Command: high_priest_keep_special_holiness
command(high_priest_keep_special_holiness).
command_title(high_priest_keep_special_holiness, 'Lev 21:10-15 - High priest keeps special holiness.').
normal_obedience(high_priest_keep_special_holiness, 'The high priest keeps the additional holiness restrictions given in Torah.').
concerns(high_priest_keep_special_holiness, priestly_holiness).
scripture_reference(high_priest_keep_special_holiness, 'Leviticus 21:10-15').
study_note(high_priest_keep_special_holiness, 'The high priest has stricter role-specific commands.').

% Command: priests_do_not_serve_with_defect
command(priests_do_not_serve_with_defect).
command_title(priests_do_not_serve_with_defect, 'Lev 21:16-24 - Priests with defects do not approach to offer bread.').
normal_obedience(priests_do_not_serve_with_defect, 'Priests with listed defects do not approach to offer the bread of Elohim.').
concerns(priests_do_not_serve_with_defect, priestly_holiness).
scripture_reference(priests_do_not_serve_with_defect, 'Leviticus 21:16-24').
study_note(priests_do_not_serve_with_defect, 'This is a role-specific sanctuary service command.').

% Command: priests_do_not_eat_holy_things_while_unclean
command(priests_do_not_eat_holy_things_while_unclean).
command_title(priests_do_not_eat_holy_things_while_unclean, 'Lev 22:1-9 - Priests do not eat holy things while unclean.').
normal_obedience(priests_do_not_eat_holy_things_while_unclean, 'Priests who are unclean must not eat holy things until clean.').
concerns(priests_do_not_eat_holy_things_while_unclean, priestly_holiness).
scripture_reference(priests_do_not_eat_holy_things_while_unclean, 'Leviticus 22:1-9').
study_note(priests_do_not_eat_holy_things_while_unclean, 'Holy portions require priestly purity.').

% Command: offer_unblemished_animals
command(offer_unblemished_animals).
command_title(offer_unblemished_animals, 'Lev 22:17-25 - Offer unblemished animals.').
normal_obedience(offer_unblemished_animals, 'Do not offer blemished animals; offerings must meet Torah requirements.').
concerns(offer_unblemished_animals, priestly_holiness).
scripture_reference(offer_unblemished_animals, 'Leviticus 22:17-25').
study_note(offer_unblemished_animals, 'The quality of offerings expresses reverence for YHWH.').

% Command: guard_sanctuary_duties
command(guard_sanctuary_duties).
command_title(guard_sanctuary_duties, 'Num 18 - Guard sanctuary duties.').
normal_obedience(guard_sanctuary_duties, 'Priests and Levites guard their appointed sanctuary duties.').
concerns(guard_sanctuary_duties, priestly_holiness).
scripture_reference(guard_sanctuary_duties, 'Numbers 18').
study_note(guard_sanctuary_duties, 'Sanctuary service has assigned roles and boundaries.').

% Command: give_priestly_portions
command(give_priestly_portions).
command_title(give_priestly_portions, 'Num 18 - Give priestly and Levitical portions.').
normal_obedience(give_priestly_portions, 'Give the portions assigned to priests and Levites.').
concerns(give_priestly_portions, priestly_holiness).
scripture_reference(give_priestly_portions, 'Numbers 18').
scripture_reference(give_priestly_portions, 'Deuteronomy 18:1-8').
study_note(give_priestly_portions, 'Torah provides for priestly and Levitical service through assigned portions.').

% Command: levites_receive_tithe
command(levites_receive_tithe).
command_title(levites_receive_tithe, 'Num 18:21-32 - Levites receive the tithe.').
normal_obedience(levites_receive_tithe, 'Give the tithe assigned to the Levites, and the Levites give a tithe from it.').
concerns(levites_receive_tithe, priestly_holiness).
scripture_reference(levites_receive_tithe, 'Numbers 18:21-32').
study_note(levites_receive_tithe, 'This command belongs to the Levitical support system.').

% -----------------------------------------------------------------------------
% Additional Priestly Holiness Review Commands
% -----------------------------------------------------------------------------

% Command: build_the_sanctuary_according_to_the_pattern_shown
command(build_the_sanctuary_according_to_the_pattern_shown).
command_title(build_the_sanctuary_according_to_the_pattern_shown, 'Exodus 25:8-9 - Build the sanctuary according to the pattern shown.').
normal_obedience(build_the_sanctuary_according_to_the_pattern_shown, 'Build the sanctuary according to the pattern shown.').
concerns(build_the_sanctuary_according_to_the_pattern_shown, priestly_holiness).
scripture_reference(build_the_sanctuary_according_to_the_pattern_shown, 'Exodus 25:8-9').
study_note(build_the_sanctuary_according_to_the_pattern_shown, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: make_the_ark_according_to_torah_instructions
command(make_the_ark_according_to_torah_instructions).
command_title(make_the_ark_according_to_torah_instructions, 'Exodus 25:10-22 - Make the ark according to Torah instructions.').
normal_obedience(make_the_ark_according_to_torah_instructions, 'Make the ark according to Torah instructions.').
concerns(make_the_ark_according_to_torah_instructions, priestly_holiness).
scripture_reference(make_the_ark_according_to_torah_instructions, 'Exodus 25:10-22').
study_note(make_the_ark_according_to_torah_instructions, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: make_the_table_lampstand_altar_curtains_and_court_according_to_the_pattern
command(make_the_table_lampstand_altar_curtains_and_court_according_to_the_pattern).
command_title(make_the_table_lampstand_altar_curtains_and_court_according_to_the_pattern, 'Exodus 25-27 - Make the table, lampstand, altar, curtains, and court according to the pattern.').
normal_obedience(make_the_table_lampstand_altar_curtains_and_court_according_to_the_pattern, 'Make the table, lampstand, altar, curtains, and court according to the pattern.').
concerns(make_the_table_lampstand_altar_curtains_and_court_according_to_the_pattern, priestly_holiness).
scripture_reference(make_the_table_lampstand_altar_curtains_and_court_according_to_the_pattern, 'Exodus 25-27').
study_note(make_the_table_lampstand_altar_curtains_and_court_according_to_the_pattern, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: keep_the_lamp_burning_with_pure_beaten_olive_oil
command(keep_the_lamp_burning_with_pure_beaten_olive_oil).
command_title(keep_the_lamp_burning_with_pure_beaten_olive_oil, 'Exodus 27:20-21 - Keep the lamp burning with pure beaten olive oil.').
normal_obedience(keep_the_lamp_burning_with_pure_beaten_olive_oil, 'Keep the lamp burning with pure beaten olive oil.').
concerns(keep_the_lamp_burning_with_pure_beaten_olive_oil, priestly_holiness).
scripture_reference(keep_the_lamp_burning_with_pure_beaten_olive_oil, 'Exodus 27:20-21').
study_note(keep_the_lamp_burning_with_pure_beaten_olive_oil, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: make_priestly_garments_for_glory_and_beauty
command(make_priestly_garments_for_glory_and_beauty).
command_title(make_priestly_garments_for_glory_and_beauty, 'Exodus 28 - Make priestly garments for glory and beauty.').
normal_obedience(make_priestly_garments_for_glory_and_beauty, 'Make priestly garments for glory and beauty.').
concerns(make_priestly_garments_for_glory_and_beauty, priestly_holiness).
scripture_reference(make_priestly_garments_for_glory_and_beauty, 'Exodus 28').
study_note(make_priestly_garments_for_glory_and_beauty, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: consecrate_aaron_and_his_sons_according_to_torah
command(consecrate_aaron_and_his_sons_according_to_torah).
command_title(consecrate_aaron_and_his_sons_according_to_torah, 'Exodus 29 - Consecrate Aaron and his sons according to Torah.').
normal_obedience(consecrate_aaron_and_his_sons_according_to_torah, 'Consecrate Aaron and his sons according to Torah.').
concerns(consecrate_aaron_and_his_sons_according_to_torah, priestly_holiness).
scripture_reference(consecrate_aaron_and_his_sons_according_to_torah, 'Exodus 29').
study_note(consecrate_aaron_and_his_sons_according_to_torah, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: offer_the_daily_continual_offering_morning_and_evening
command(offer_the_daily_continual_offering_morning_and_evening).
command_title(offer_the_daily_continual_offering_morning_and_evening, 'Exodus 29:38-42 - Offer the daily continual offering morning and evening.').
normal_obedience(offer_the_daily_continual_offering_morning_and_evening, 'Offer the daily continual offering morning and evening.').
concerns(offer_the_daily_continual_offering_morning_and_evening, priestly_holiness).
scripture_reference(offer_the_daily_continual_offering_morning_and_evening, 'Exodus 29:38-42').
scripture_reference(offer_the_daily_continual_offering_morning_and_evening, 'Numbers 28:1-8').
study_note(offer_the_daily_continual_offering_morning_and_evening, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: make_the_incense_altar
command(make_the_incense_altar).
command_title(make_the_incense_altar, 'Exodus 30:1-10 - Make the incense altar.').
normal_obedience(make_the_incense_altar, 'Make the incense altar.').
concerns(make_the_incense_altar, priestly_holiness).
scripture_reference(make_the_incense_altar, 'Exodus 30:1-10').
study_note(make_the_incense_altar, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: do_not_offer_strange_incense_on_the_incense_altar
command(do_not_offer_strange_incense_on_the_incense_altar).
command_title(do_not_offer_strange_incense_on_the_incense_altar, 'Exodus 30:9 - Do not offer strange incense on the incense altar.').
normal_obedience(do_not_offer_strange_incense_on_the_incense_altar, 'Do not offer strange incense on the incense altar.').
concerns(do_not_offer_strange_incense_on_the_incense_altar, priestly_holiness).
scripture_reference(do_not_offer_strange_incense_on_the_incense_altar, 'Exodus 30:9').
study_note(do_not_offer_strange_incense_on_the_incense_altar, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: do_not_offer_burnt_offering_or_grain_offering_on_the_incense_altar
command(do_not_offer_burnt_offering_or_grain_offering_on_the_incense_altar).
command_title(do_not_offer_burnt_offering_or_grain_offering_on_the_incense_altar, 'Exodus 30:9 - Do not offer burnt offering or grain offering on the incense altar.').
normal_obedience(do_not_offer_burnt_offering_or_grain_offering_on_the_incense_altar, 'Do not offer burnt offering or grain offering on the incense altar.').
concerns(do_not_offer_burnt_offering_or_grain_offering_on_the_incense_altar, priestly_holiness).
scripture_reference(do_not_offer_burnt_offering_or_grain_offering_on_the_incense_altar, 'Exodus 30:9').
study_note(do_not_offer_burnt_offering_or_grain_offering_on_the_incense_altar, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: make_the_bronze_laver_for_washing
command(make_the_bronze_laver_for_washing).
command_title(make_the_bronze_laver_for_washing, 'Exodus 30:17-21 - Make the bronze laver for washing.').
normal_obedience(make_the_bronze_laver_for_washing, 'Make the bronze laver for washing.').
concerns(make_the_bronze_laver_for_washing, priestly_holiness).
scripture_reference(make_the_bronze_laver_for_washing, 'Exodus 30:17-21').
study_note(make_the_bronze_laver_for_washing, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: priests_must_wash_hands_and_feet_before_service
command(priests_must_wash_hands_and_feet_before_service).
command_title(priests_must_wash_hands_and_feet_before_service, 'Exodus 30:19-21 - Priests must wash hands and feet before service.').
normal_obedience(priests_must_wash_hands_and_feet_before_service, 'Priests must wash hands and feet before service.').
concerns(priests_must_wash_hands_and_feet_before_service, priestly_holiness).
scripture_reference(priests_must_wash_hands_and_feet_before_service, 'Exodus 30:19-21').
study_note(priests_must_wash_hands_and_feet_before_service, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: make_the_anointing_oil_according_to_torah
command(make_the_anointing_oil_according_to_torah).
command_title(make_the_anointing_oil_according_to_torah, 'Exodus 30:22-33 - Make the anointing oil according to Torah.').
normal_obedience(make_the_anointing_oil_according_to_torah, 'Make the anointing oil according to Torah.').
concerns(make_the_anointing_oil_according_to_torah, priestly_holiness).
scripture_reference(make_the_anointing_oil_according_to_torah, 'Exodus 30:22-33').
study_note(make_the_anointing_oil_according_to_torah, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: do_not_pour_holy_anointing_oil_on_ordinary_flesh
command(do_not_pour_holy_anointing_oil_on_ordinary_flesh).
command_title(do_not_pour_holy_anointing_oil_on_ordinary_flesh, 'Exodus 30:32 - Do not pour holy anointing oil on ordinary flesh.').
normal_obedience(do_not_pour_holy_anointing_oil_on_ordinary_flesh, 'Do not pour holy anointing oil on ordinary flesh.').
concerns(do_not_pour_holy_anointing_oil_on_ordinary_flesh, priestly_holiness).
scripture_reference(do_not_pour_holy_anointing_oil_on_ordinary_flesh, 'Exodus 30:32').
study_note(do_not_pour_holy_anointing_oil_on_ordinary_flesh, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: do_not_make_anointing_oil_with_the_same_composition_for_ordinary_use
command(do_not_make_anointing_oil_with_the_same_composition_for_ordinary_use).
command_title(do_not_make_anointing_oil_with_the_same_composition_for_ordinary_use, 'Exodus 30:32-33 - Do not make anointing oil with the same composition for ordinary use.').
normal_obedience(do_not_make_anointing_oil_with_the_same_composition_for_ordinary_use, 'Do not make anointing oil with the same composition for ordinary use.').
concerns(do_not_make_anointing_oil_with_the_same_composition_for_ordinary_use, priestly_holiness).
scripture_reference(do_not_make_anointing_oil_with_the_same_composition_for_ordinary_use, 'Exodus 30:32-33').
study_note(do_not_make_anointing_oil_with_the_same_composition_for_ordinary_use, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: make_the_holy_incense_according_to_torah
command(make_the_holy_incense_according_to_torah).
command_title(make_the_holy_incense_according_to_torah, 'Exodus 30:34-38 - Make the holy incense according to Torah.').
normal_obedience(make_the_holy_incense_according_to_torah, 'Make the holy incense according to Torah.').
concerns(make_the_holy_incense_according_to_torah, priestly_holiness).
scripture_reference(make_the_holy_incense_according_to_torah, 'Exodus 30:34-38').
study_note(make_the_holy_incense_according_to_torah, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: do_not_make_incense_with_the_same_composition_for_ordinary_smelling
command(do_not_make_incense_with_the_same_composition_for_ordinary_smelling).
command_title(do_not_make_incense_with_the_same_composition_for_ordinary_smelling, 'Exodus 30:37-38 - Do not make incense with the same composition for ordinary smelling.').
normal_obedience(do_not_make_incense_with_the_same_composition_for_ordinary_smelling, 'Do not make incense with the same composition for ordinary smelling.').
concerns(do_not_make_incense_with_the_same_composition_for_ordinary_smelling, priestly_holiness).
scripture_reference(do_not_make_incense_with_the_same_composition_for_ordinary_smelling, 'Exodus 30:37-38').
study_note(do_not_make_incense_with_the_same_composition_for_ordinary_smelling, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: do_not_offer_leaven_or_honey_as_fire_offering_on_the_altar
command(do_not_offer_leaven_or_honey_as_fire_offering_on_the_altar).
command_title(do_not_offer_leaven_or_honey_as_fire_offering_on_the_altar, 'Leviticus 2:11 - Do not offer leaven or honey as fire offering on the altar.').
normal_obedience(do_not_offer_leaven_or_honey_as_fire_offering_on_the_altar, 'Do not offer leaven or honey as fire offering on the altar.').
concerns(do_not_offer_leaven_or_honey_as_fire_offering_on_the_altar, priestly_holiness).
scripture_reference(do_not_offer_leaven_or_honey_as_fire_offering_on_the_altar, 'Leviticus 2:11').
study_note(do_not_offer_leaven_or_honey_as_fire_offering_on_the_altar, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: season_every_grain_offering_with_salt
command(season_every_grain_offering_with_salt).
command_title(season_every_grain_offering_with_salt, 'Leviticus 2:13 - Season every grain offering with salt.').
normal_obedience(season_every_grain_offering_with_salt, 'Season every grain offering with salt.').
concerns(season_every_grain_offering_with_salt, priestly_holiness).
scripture_reference(season_every_grain_offering_with_salt, 'Leviticus 2:13').
study_note(season_every_grain_offering_with_salt, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: do_not_let_the_salt_of_the_covenant_be_lacking_from_grain_offerings
command(do_not_let_the_salt_of_the_covenant_be_lacking_from_grain_offerings).
command_title(do_not_let_the_salt_of_the_covenant_be_lacking_from_grain_offerings, 'Leviticus 2:13 - Do not let the salt of the covenant be lacking from grain offerings.').
normal_obedience(do_not_let_the_salt_of_the_covenant_be_lacking_from_grain_offerings, 'Do not let the salt of the covenant be lacking from grain offerings.').
concerns(do_not_let_the_salt_of_the_covenant_be_lacking_from_grain_offerings, priestly_holiness).
scripture_reference(do_not_let_the_salt_of_the_covenant_be_lacking_from_grain_offerings, 'Leviticus 2:13').
study_note(do_not_let_the_salt_of_the_covenant_be_lacking_from_grain_offerings, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: restore_what_was_taken_or_withheld_and_add_the_fifth_in_guilt_cases
command(restore_what_was_taken_or_withheld_and_add_the_fifth_in_guilt_cases).
command_title(restore_what_was_taken_or_withheld_and_add_the_fifth_in_guilt_cases, 'Leviticus 6:1-7 - Restore what was taken or withheld and add the fifth in guilt cases.').
normal_obedience(restore_what_was_taken_or_withheld_and_add_the_fifth_in_guilt_cases, 'Restore what was taken or withheld and add the fifth in guilt cases.').
concerns(restore_what_was_taken_or_withheld_and_add_the_fifth_in_guilt_cases, priestly_holiness).
scripture_reference(restore_what_was_taken_or_withheld_and_add_the_fifth_in_guilt_cases, 'Leviticus 6:1-7').
study_note(restore_what_was_taken_or_withheld_and_add_the_fifth_in_guilt_cases, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: keep_the_altar_fire_burning_continually
command(keep_the_altar_fire_burning_continually).
command_title(keep_the_altar_fire_burning_continually, 'Leviticus 6:12-13 - Keep the altar fire burning continually.').
normal_obedience(keep_the_altar_fire_burning_continually, 'Keep the altar fire burning continually.').
concerns(keep_the_altar_fire_burning_continually, priestly_holiness).
scripture_reference(keep_the_altar_fire_burning_continually, 'Leviticus 6:12-13').
study_note(keep_the_altar_fire_burning_continually, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: do_not_let_the_altar_fire_go_out
command(do_not_let_the_altar_fire_go_out).
command_title(do_not_let_the_altar_fire_go_out, 'Leviticus 6:13 - Do not let the altar fire go out.').
normal_obedience(do_not_let_the_altar_fire_go_out, 'Do not let the altar fire go out.').
concerns(do_not_let_the_altar_fire_go_out, priestly_holiness).
scripture_reference(do_not_let_the_altar_fire_go_out, 'Leviticus 6:13').
study_note(do_not_let_the_altar_fire_go_out, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: priests_eat_certain_grain_offerings_in_a_holy_place
command(priests_eat_certain_grain_offerings_in_a_holy_place).
command_title(priests_eat_certain_grain_offerings_in_a_holy_place, 'Leviticus 6:14-18 - Priests eat certain grain offerings in a holy place.').
normal_obedience(priests_eat_certain_grain_offerings_in_a_holy_place, 'Priests eat certain grain offerings in a holy place.').
concerns(priests_eat_certain_grain_offerings_in_a_holy_place, priestly_holiness).
scripture_reference(priests_eat_certain_grain_offerings_in_a_holy_place, 'Leviticus 6:14-18').
study_note(priests_eat_certain_grain_offerings_in_a_holy_place, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: burn_the_priestly_grain_offering_completely
command(burn_the_priestly_grain_offering_completely).
command_title(burn_the_priestly_grain_offering_completely, 'Leviticus 6:23 - Burn the priestly grain offering completely.').
normal_obedience(burn_the_priestly_grain_offering_completely, 'Burn the priestly grain offering completely.').
concerns(burn_the_priestly_grain_offering_completely, priestly_holiness).
scripture_reference(burn_the_priestly_grain_offering_completely, 'Leviticus 6:23').
study_note(burn_the_priestly_grain_offering_completely, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: eat_the_sin_offering_in_a_holy_place_when_torah_permits
command(eat_the_sin_offering_in_a_holy_place_when_torah_permits).
command_title(eat_the_sin_offering_in_a_holy_place_when_torah_permits, 'Leviticus 6:24-30 - Eat the sin offering in a holy place when Torah permits.').
normal_obedience(eat_the_sin_offering_in_a_holy_place_when_torah_permits, 'Eat the sin offering in a holy place when Torah permits.').
concerns(eat_the_sin_offering_in_a_holy_place_when_torah_permits, priestly_holiness).
scripture_reference(eat_the_sin_offering_in_a_holy_place_when_torah_permits, 'Leviticus 6:24-30').
study_note(eat_the_sin_offering_in_a_holy_place_when_torah_permits, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: eat_the_thanksgiving_peace_offering_the_same_day
command(eat_the_thanksgiving_peace_offering_the_same_day).
command_title(eat_the_thanksgiving_peace_offering_the_same_day, 'Leviticus 7:15 - Eat the thanksgiving peace offering the same day.').
normal_obedience(eat_the_thanksgiving_peace_offering_the_same_day, 'Eat the thanksgiving peace offering the same day.').
concerns(eat_the_thanksgiving_peace_offering_the_same_day, priestly_holiness).
scripture_reference(eat_the_thanksgiving_peace_offering_the_same_day, 'Leviticus 7:15').
study_note(eat_the_thanksgiving_peace_offering_the_same_day, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: do_not_leave_thanksgiving_peace_offering_until_morning
command(do_not_leave_thanksgiving_peace_offering_until_morning).
command_title(do_not_leave_thanksgiving_peace_offering_until_morning, 'Leviticus 7:15 - Do not leave thanksgiving peace offering until morning.').
normal_obedience(do_not_leave_thanksgiving_peace_offering_until_morning, 'Do not leave thanksgiving peace offering until morning.').
concerns(do_not_leave_thanksgiving_peace_offering_until_morning, priestly_holiness).
scripture_reference(do_not_leave_thanksgiving_peace_offering_until_morning, 'Leviticus 7:15').
study_note(do_not_leave_thanksgiving_peace_offering_until_morning, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: do_not_eat_sacrificial_flesh_on_the_third_day
command(do_not_eat_sacrificial_flesh_on_the_third_day).
command_title(do_not_eat_sacrificial_flesh_on_the_third_day, 'Leviticus 7:17-18 - Do not eat sacrificial flesh on the third day.').
normal_obedience(do_not_eat_sacrificial_flesh_on_the_third_day, 'Do not eat sacrificial flesh on the third day.').
concerns(do_not_eat_sacrificial_flesh_on_the_third_day, priestly_holiness).
scripture_reference(do_not_eat_sacrificial_flesh_on_the_third_day, 'Leviticus 7:17-18').
study_note(do_not_eat_sacrificial_flesh_on_the_third_day, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: burn_leftover_sacrificial_flesh_according_to_torah
command(burn_leftover_sacrificial_flesh_according_to_torah).
command_title(burn_leftover_sacrificial_flesh_according_to_torah, 'Leviticus 7:17 - Burn leftover sacrificial flesh according to Torah.').
normal_obedience(burn_leftover_sacrificial_flesh_according_to_torah, 'Burn leftover sacrificial flesh according to Torah.').
concerns(burn_leftover_sacrificial_flesh_according_to_torah, priestly_holiness).
scripture_reference(burn_leftover_sacrificial_flesh_according_to_torah, 'Leviticus 7:17').
study_note(burn_leftover_sacrificial_flesh_according_to_torah, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: do_not_eat_holy_flesh_while_unclean
command(do_not_eat_holy_flesh_while_unclean).
command_title(do_not_eat_holy_flesh_while_unclean, 'Leviticus 7:19-21 - Do not eat holy flesh while unclean.').
normal_obedience(do_not_eat_holy_flesh_while_unclean, 'Do not eat holy flesh while unclean.').
concerns(do_not_eat_holy_flesh_while_unclean, priestly_holiness).
scripture_reference(do_not_eat_holy_flesh_while_unclean, 'Leviticus 7:19-21').
study_note(do_not_eat_holy_flesh_while_unclean, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: do_not_eat_the_fat_of_ox_sheep_or_goat_reserved_by_torah
command(do_not_eat_the_fat_of_ox_sheep_or_goat_reserved_by_torah).
command_title(do_not_eat_the_fat_of_ox_sheep_or_goat_reserved_by_torah, 'Leviticus 7:23 - Do not eat the fat of ox, sheep, or goat reserved by Torah.').
normal_obedience(do_not_eat_the_fat_of_ox_sheep_or_goat_reserved_by_torah, 'Do not eat the fat of ox, sheep, or goat reserved by Torah.').
concerns(do_not_eat_the_fat_of_ox_sheep_or_goat_reserved_by_torah, priestly_holiness).
scripture_reference(do_not_eat_the_fat_of_ox_sheep_or_goat_reserved_by_torah, 'Leviticus 7:23').
study_note(do_not_eat_the_fat_of_ox_sheep_or_goat_reserved_by_torah, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: do_not_eat_blood_2
command(do_not_eat_blood_2).
command_title(do_not_eat_blood_2, 'Leviticus 7:26 - Do not eat blood.').
normal_obedience(do_not_eat_blood_2, 'Do not eat blood.').
concerns(do_not_eat_blood_2, priestly_holiness).
scripture_reference(do_not_eat_blood_2, 'Leviticus 7:26').
scripture_reference(do_not_eat_blood_2, '17:10-14').
study_note(do_not_eat_blood_2, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: the_high_priest_must_not_enter_the_most_holy_place_at_any_time_but_according_t
command(the_high_priest_must_not_enter_the_most_holy_place_at_any_time_but_according_t).
command_title(the_high_priest_must_not_enter_the_most_holy_place_at_any_time_but_according_t, 'Leviticus 16:2 - The high priest must not enter the Most Holy Place at any time, but according to Torah.').
normal_obedience(the_high_priest_must_not_enter_the_most_holy_place_at_any_time_but_according_t, 'The high priest must not enter the Most Holy Place at any time, but according to Torah.').
concerns(the_high_priest_must_not_enter_the_most_holy_place_at_any_time_but_according_t, priestly_holiness).
scripture_reference(the_high_priest_must_not_enter_the_most_holy_place_at_any_time_but_according_t, 'Leviticus 16:2').
study_note(the_high_priest_must_not_enter_the_most_holy_place_at_any_time_but_according_t, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: follow_the_day_of_atonement_sanctuary_service_procedure
command(follow_the_day_of_atonement_sanctuary_service_procedure).
command_title(follow_the_day_of_atonement_sanctuary_service_procedure, 'Leviticus 16 - Follow the Day of Atonement sanctuary service procedure.').
normal_obedience(follow_the_day_of_atonement_sanctuary_service_procedure, 'Follow the Day of Atonement sanctuary service procedure.').
concerns(follow_the_day_of_atonement_sanctuary_service_procedure, priestly_holiness).
scripture_reference(follow_the_day_of_atonement_sanctuary_service_procedure, 'Leviticus 16').
study_note(follow_the_day_of_atonement_sanctuary_service_procedure, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: do_not_slaughter_offerings_outside_the_appointed_place_when_sanctuary_rules_ap
command(do_not_slaughter_offerings_outside_the_appointed_place_when_sanctuary_rules_ap).
command_title(do_not_slaughter_offerings_outside_the_appointed_place_when_sanctuary_rules_ap, 'Leviticus 17:1-9 - Do not slaughter offerings outside the appointed place when sanctuary rules apply.').
normal_obedience(do_not_slaughter_offerings_outside_the_appointed_place_when_sanctuary_rules_ap, 'Do not slaughter offerings outside the appointed place when sanctuary rules apply.').
concerns(do_not_slaughter_offerings_outside_the_appointed_place_when_sanctuary_rules_ap, priestly_holiness).
scripture_reference(do_not_slaughter_offerings_outside_the_appointed_place_when_sanctuary_rules_ap, 'Leviticus 17:1-9').
study_note(do_not_slaughter_offerings_outside_the_appointed_place_when_sanctuary_rules_ap, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: cover_the_blood_of_hunted_clean_bird_or_animal_with_dust
command(cover_the_blood_of_hunted_clean_bird_or_animal_with_dust).
command_title(cover_the_blood_of_hunted_clean_bird_or_animal_with_dust, 'Leviticus 17:13 - Cover the blood of hunted clean bird or animal with dust.').
normal_obedience(cover_the_blood_of_hunted_clean_bird_or_animal_with_dust, 'Cover the blood of hunted clean bird or animal with dust.').
concerns(cover_the_blood_of_hunted_clean_bird_or_animal_with_dust, priestly_holiness).
scripture_reference(cover_the_blood_of_hunted_clean_bird_or_animal_with_dust, 'Leviticus 17:13').
study_note(cover_the_blood_of_hunted_clean_bird_or_animal_with_dust, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: do_not_offer_blemished_animals
command(do_not_offer_blemished_animals).
command_title(do_not_offer_blemished_animals, 'Leviticus 22:20-25 - Do not offer blemished animals.').
normal_obedience(do_not_offer_blemished_animals, 'Do not offer blemished animals.').
concerns(do_not_offer_blemished_animals, priestly_holiness).
scripture_reference(do_not_offer_blemished_animals, 'Leviticus 22:20-25').
study_note(do_not_offer_blemished_animals, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: do_not_slaughter_an_animal_and_its_young_on_the_same_day
command(do_not_slaughter_an_animal_and_its_young_on_the_same_day).
command_title(do_not_slaughter_an_animal_and_its_young_on_the_same_day, 'Leviticus 22:28 - Do not slaughter an animal and its young on the same day.').
normal_obedience(do_not_slaughter_an_animal_and_its_young_on_the_same_day, 'Do not slaughter an animal and its young on the same day.').
concerns(do_not_slaughter_an_animal_and_its_young_on_the_same_day, priestly_holiness).
scripture_reference(do_not_slaughter_an_animal_and_its_young_on_the_same_day, 'Leviticus 22:28').
study_note(do_not_slaughter_an_animal_and_its_young_on_the_same_day, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: bring_firstfruits_to_the_place_yhwh_chooses_and_make_the_declaration
command(bring_firstfruits_to_the_place_yhwh_chooses_and_make_the_declaration).
command_title(bring_firstfruits_to_the_place_yhwh_chooses_and_make_the_declaration, 'Deuteronomy 26:1-11 - Bring firstfruits to the place YHWH chooses and make the declaration.').
normal_obedience(bring_firstfruits_to_the_place_yhwh_chooses_and_make_the_declaration, 'Bring firstfruits to the place YHWH chooses and make the declaration.').
concerns(bring_firstfruits_to_the_place_yhwh_chooses_and_make_the_declaration, priestly_holiness).
scripture_reference(bring_firstfruits_to_the_place_yhwh_chooses_and_make_the_declaration, 'Deuteronomy 26:1-11').
study_note(bring_firstfruits_to_the_place_yhwh_chooses_and_make_the_declaration, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: make_the_tithe_declaration_in_the_third_year
command(make_the_tithe_declaration_in_the_third_year).
command_title(make_the_tithe_declaration_in_the_third_year, 'Deuteronomy 26:12-15 - Make the tithe declaration in the third year.').
normal_obedience(make_the_tithe_declaration_in_the_third_year, 'Make the tithe declaration in the third year.').
concerns(make_the_tithe_declaration_in_the_third_year, priestly_holiness).
scripture_reference(make_the_tithe_declaration_in_the_third_year, 'Deuteronomy 26:12-15').
study_note(make_the_tithe_declaration_in_the_third_year, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: priests_must_be_holy_to_yhwh
command(priests_must_be_holy_to_yhwh).
command_title(priests_must_be_holy_to_yhwh, 'Leviticus 21:6 - Priests must be holy to YHWH.').
normal_obedience(priests_must_be_holy_to_yhwh, 'Priests must be holy to YHWH.').
concerns(priests_must_be_holy_to_yhwh, priestly_holiness).
scripture_reference(priests_must_be_holy_to_yhwh, 'Leviticus 21:6').
study_note(priests_must_be_holy_to_yhwh, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: ordinary_priests_must_not_become_unclean_for_the_dead_except_close_relatives
command(ordinary_priests_must_not_become_unclean_for_the_dead_except_close_relatives).
command_title(ordinary_priests_must_not_become_unclean_for_the_dead_except_close_relatives, 'Leviticus 21:1-4 - Ordinary priests must not become unclean for the dead except close relatives.').
normal_obedience(ordinary_priests_must_not_become_unclean_for_the_dead_except_close_relatives, 'Ordinary priests must not become unclean for the dead except close relatives.').
concerns(ordinary_priests_must_not_become_unclean_for_the_dead_except_close_relatives, priestly_holiness).
scripture_reference(ordinary_priests_must_not_become_unclean_for_the_dead_except_close_relatives, 'Leviticus 21:1-4').
study_note(ordinary_priests_must_not_become_unclean_for_the_dead_except_close_relatives, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: priests_must_not_marry_a_prostitute_profaned_woman_or_divorced_woman
command(priests_must_not_marry_a_prostitute_profaned_woman_or_divorced_woman).
command_title(priests_must_not_marry_a_prostitute_profaned_woman_or_divorced_woman, 'Leviticus 21:7 - Priests must not marry a prostitute, profaned woman, or divorced woman.').
normal_obedience(priests_must_not_marry_a_prostitute_profaned_woman_or_divorced_woman, 'Priests must not marry a prostitute, profaned woman, or divorced woman.').
concerns(priests_must_not_marry_a_prostitute_profaned_woman_or_divorced_woman, priestly_holiness).
scripture_reference(priests_must_not_marry_a_prostitute_profaned_woman_or_divorced_woman, 'Leviticus 21:7').
study_note(priests_must_not_marry_a_prostitute_profaned_woman_or_divorced_woman, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: the_high_priest_must_not_become_unclean_even_for_father_or_mother
command(the_high_priest_must_not_become_unclean_even_for_father_or_mother).
command_title(the_high_priest_must_not_become_unclean_even_for_father_or_mother, 'Leviticus 21:11 - The high priest must not become unclean even for father or mother.').
normal_obedience(the_high_priest_must_not_become_unclean_even_for_father_or_mother, 'The high priest must not become unclean even for father or mother.').
concerns(the_high_priest_must_not_become_unclean_even_for_father_or_mother, priestly_holiness).
scripture_reference(the_high_priest_must_not_become_unclean_even_for_father_or_mother, 'Leviticus 21:11').
study_note(the_high_priest_must_not_become_unclean_even_for_father_or_mother, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: the_high_priest_must_not_leave_the_sanctuary_in_the_stated_case
command(the_high_priest_must_not_leave_the_sanctuary_in_the_stated_case).
command_title(the_high_priest_must_not_leave_the_sanctuary_in_the_stated_case, 'Leviticus 21:12 - The high priest must not leave the sanctuary in the stated case.').
normal_obedience(the_high_priest_must_not_leave_the_sanctuary_in_the_stated_case, 'The high priest must not leave the sanctuary in the stated case.').
concerns(the_high_priest_must_not_leave_the_sanctuary_in_the_stated_case, priestly_holiness).
scripture_reference(the_high_priest_must_not_leave_the_sanctuary_in_the_stated_case, 'Leviticus 21:12').
study_note(the_high_priest_must_not_leave_the_sanctuary_in_the_stated_case, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: the_high_priest_must_marry_a_virgin_of_his_people
command(the_high_priest_must_marry_a_virgin_of_his_people).
command_title(the_high_priest_must_marry_a_virgin_of_his_people, 'Leviticus 21:13-14 - The high priest must marry a virgin of his people.').
normal_obedience(the_high_priest_must_marry_a_virgin_of_his_people, 'The high priest must marry a virgin of his people.').
concerns(the_high_priest_must_marry_a_virgin_of_his_people, priestly_holiness).
scripture_reference(the_high_priest_must_marry_a_virgin_of_his_people, 'Leviticus 21:13-14').
study_note(the_high_priest_must_marry_a_virgin_of_his_people, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: a_priest_with_listed_defect_must_not_approach_to_offer_bread
command(a_priest_with_listed_defect_must_not_approach_to_offer_bread).
command_title(a_priest_with_listed_defect_must_not_approach_to_offer_bread, 'Leviticus 21:16-23 - A priest with listed defect must not approach to offer bread.').
normal_obedience(a_priest_with_listed_defect_must_not_approach_to_offer_bread, 'A priest with listed defect must not approach to offer bread.').
concerns(a_priest_with_listed_defect_must_not_approach_to_offer_bread, priestly_holiness).
scripture_reference(a_priest_with_listed_defect_must_not_approach_to_offer_bread, 'Leviticus 21:16-23').
study_note(a_priest_with_listed_defect_must_not_approach_to_offer_bread, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: priests_who_are_unclean_must_not_eat_holy_things
command(priests_who_are_unclean_must_not_eat_holy_things).
command_title(priests_who_are_unclean_must_not_eat_holy_things, 'Leviticus 22:1-9 - Priests who are unclean must not eat holy things.').
normal_obedience(priests_who_are_unclean_must_not_eat_holy_things, 'Priests who are unclean must not eat holy things.').
concerns(priests_who_are_unclean_must_not_eat_holy_things, priestly_holiness).
scripture_reference(priests_who_are_unclean_must_not_eat_holy_things, 'Leviticus 22:1-9').
study_note(priests_who_are_unclean_must_not_eat_holy_things, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: no_layperson_may_eat_holy_food
command(no_layperson_may_eat_holy_food).
command_title(no_layperson_may_eat_holy_food, 'Leviticus 22:10 - No layperson may eat holy food.').
normal_obedience(no_layperson_may_eat_holy_food, 'No layperson may eat holy food.').
concerns(no_layperson_may_eat_holy_food, priestly_holiness).
scripture_reference(no_layperson_may_eat_holy_food, 'Leviticus 22:10').
study_note(no_layperson_may_eat_holy_food, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: a_priest_s_purchased_servant_may_eat_holy_food
command(a_priest_s_purchased_servant_may_eat_holy_food).
command_title(a_priest_s_purchased_servant_may_eat_holy_food, 'Leviticus 22:11 - A priest''s purchased servant may eat holy food.').
normal_obedience(a_priest_s_purchased_servant_may_eat_holy_food, 'A priest''s purchased servant may eat holy food.').
concerns(a_priest_s_purchased_servant_may_eat_holy_food, priestly_holiness).
scripture_reference(a_priest_s_purchased_servant_may_eat_holy_food, 'Leviticus 22:11').
study_note(a_priest_s_purchased_servant_may_eat_holy_food, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: a_priest_s_daughter_married_to_a_layman_may_not_eat_holy_food
command(a_priest_s_daughter_married_to_a_layman_may_not_eat_holy_food).
command_title(a_priest_s_daughter_married_to_a_layman_may_not_eat_holy_food, 'Leviticus 22:12 - A priest''s daughter married to a layman may not eat holy food.').
normal_obedience(a_priest_s_daughter_married_to_a_layman_may_not_eat_holy_food, 'A priest''s daughter married to a layman may not eat holy food.').
concerns(a_priest_s_daughter_married_to_a_layman_may_not_eat_holy_food, priestly_holiness).
scripture_reference(a_priest_s_daughter_married_to_a_layman_may_not_eat_holy_food, 'Leviticus 22:12').
study_note(a_priest_s_daughter_married_to_a_layman_may_not_eat_holy_food, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: a_widowed_or_divorced_priest_s_daughter_returned_childless_to_her_father_s_hou
command(a_widowed_or_divorced_priest_s_daughter_returned_childless_to_her_father_s_hou).
command_title(a_widowed_or_divorced_priest_s_daughter_returned_childless_to_her_father_s_hou, 'Leviticus 22:13 - A widowed or divorced priest''s daughter returned childless to her father''s house may eat her father''s food.').
normal_obedience(a_widowed_or_divorced_priest_s_daughter_returned_childless_to_her_father_s_hou, 'A widowed or divorced priest''s daughter returned childless to her father''s house may eat her father''s food.').
concerns(a_widowed_or_divorced_priest_s_daughter_returned_childless_to_her_father_s_hou, priestly_holiness).
scripture_reference(a_widowed_or_divorced_priest_s_daughter_returned_childless_to_her_father_s_hou, 'Leviticus 22:13').
study_note(a_widowed_or_divorced_priest_s_daughter_returned_childless_to_her_father_s_hou, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: one_who_eats_holy_food_unintentionally_must_add_a_fifth_and_give_it_to_the_pri
command(one_who_eats_holy_food_unintentionally_must_add_a_fifth_and_give_it_to_the_pri).
command_title(one_who_eats_holy_food_unintentionally_must_add_a_fifth_and_give_it_to_the_pri, 'Leviticus 22:14 - One who eats holy food unintentionally must add a fifth and give it to the priest.').
normal_obedience(one_who_eats_holy_food_unintentionally_must_add_a_fifth_and_give_it_to_the_pri, 'One who eats holy food unintentionally must add a fifth and give it to the priest.').
concerns(one_who_eats_holy_food_unintentionally_must_add_a_fifth_and_give_it_to_the_pri, priestly_holiness).
scripture_reference(one_who_eats_holy_food_unintentionally_must_add_a_fifth_and_give_it_to_the_pri, 'Leviticus 22:14').
study_note(one_who_eats_holy_food_unintentionally_must_add_a_fifth_and_give_it_to_the_pri, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: levites_guard_the_tabernacle_service
command(levites_guard_the_tabernacle_service).
command_title(levites_guard_the_tabernacle_service, 'Numbers 18 - Levites guard the tabernacle service.').
normal_obedience(levites_guard_the_tabernacle_service, 'Levites guard the tabernacle service.').
concerns(levites_guard_the_tabernacle_service, priestly_holiness).
scripture_reference(levites_guard_the_tabernacle_service, 'Numbers 18').
study_note(levites_guard_the_tabernacle_service, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: priests_guard_priesthood_service_and_altar_service
command(priests_guard_priesthood_service_and_altar_service).
command_title(priests_guard_priesthood_service_and_altar_service, 'Numbers 18:5-7 - Priests guard priesthood service and altar service.').
normal_obedience(priests_guard_priesthood_service_and_altar_service, 'Priests guard priesthood service and altar service.').
concerns(priests_guard_priesthood_service_and_altar_service, priestly_holiness).
scripture_reference(priests_guard_priesthood_service_and_altar_service, 'Numbers 18:5-7').
study_note(priests_guard_priesthood_service_and_altar_service, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: levites_receive_the_tithe_for_their_service
command(levites_receive_the_tithe_for_their_service).
command_title(levites_receive_the_tithe_for_their_service, 'Numbers 18:21-24 - Levites receive the tithe for their service.').
normal_obedience(levites_receive_the_tithe_for_their_service, 'Levites receive the tithe for their service.').
concerns(levites_receive_the_tithe_for_their_service, priestly_holiness).
scripture_reference(levites_receive_the_tithe_for_their_service, 'Numbers 18:21-24').
study_note(levites_receive_the_tithe_for_their_service, 'TODO: Verify wording against the written Torah text before final catalog refinement.').

% Command: levites_give_a_tithe_from_the_tithe
command(levites_give_a_tithe_from_the_tithe).
command_title(levites_give_a_tithe_from_the_tithe, 'Numbers 18:26-32 - Levites give a tithe from the tithe.').
normal_obedience(levites_give_a_tithe_from_the_tithe, 'Levites give a tithe from the tithe.').
concerns(levites_give_a_tithe_from_the_tithe, priestly_holiness).
scripture_reference(levites_give_a_tithe_from_the_tithe, 'Numbers 18:26-32').
study_note(levites_give_a_tithe_from_the_tithe, 'TODO: Verify wording against the written Torah text before final catalog refinement.').
