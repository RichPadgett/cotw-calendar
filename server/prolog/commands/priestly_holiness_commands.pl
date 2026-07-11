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

% Command: priests_keep_holy_status
command(priests_keep_holy_status).
command_title(priests_keep_holy_status, 'Lev 21 - Priests keep holy status.').
normal_obedience(priests_keep_holy_status, 'Priests keep the holiness requirements given for their service.').
concerns(priests_keep_holy_status, priestly_holiness).
scripture_reference(priests_keep_holy_status, 'Leviticus 21').
story_reference(priests_keep_holy_status, 'Ezekiel 44:15-31', 'Ezekiel describes faithful priestly service and priestly holiness boundaries.').
non_canonical_story_reference(priests_keep_holy_status, 'Sirach 45:6-13', 'Sirach recounts God exalting Aaron, clothing him with glory and the sacred vestments, and setting him apart as holy to minister as priest.').
study_note(priests_keep_holy_status, 'This command applies specifically to priestly role and service.').

command_requirement(priests_keep_holy_status, 'Priests').

% Command: high_priest_keep_special_holiness
command(high_priest_keep_special_holiness).
command_title(high_priest_keep_special_holiness, 'Lev 21:10-15 - High priest keeps special holiness.').
normal_obedience(high_priest_keep_special_holiness, 'The high priest keeps the additional holiness restrictions given in Torah.').
concerns(high_priest_keep_special_holiness, priestly_holiness).
scripture_reference(high_priest_keep_special_holiness, 'Leviticus 21:10-15').
study_note(high_priest_keep_special_holiness, 'The high priest has stricter role-specific commands.').

command_requirement(high_priest_keep_special_holiness, 'High Priest').

% Command: priests_do_not_serve_with_defect
command(priests_do_not_serve_with_defect).
command_title(priests_do_not_serve_with_defect, 'Lev 21:16-24 - Priests with defects do not approach to offer bread.').
normal_obedience(priests_do_not_serve_with_defect, 'Priests with listed defects do not approach to offer the bread of Elohim.').
concerns(priests_do_not_serve_with_defect, priestly_holiness).
scripture_reference(priests_do_not_serve_with_defect, 'Leviticus 21:16-24').
study_note(priests_do_not_serve_with_defect, 'This is a role-specific sanctuary service command.').

command_requirement(priests_do_not_serve_with_defect, 'Priests').

% Command: priests_do_not_eat_holy_things_while_unclean
command(priests_do_not_eat_holy_things_while_unclean).
command_title(priests_do_not_eat_holy_things_while_unclean, 'Lev 22:1-9 - Priests do not eat holy things while unclean.').
normal_obedience(priests_do_not_eat_holy_things_while_unclean, 'Priests who are unclean must not eat holy things until clean.').
concerns(priests_do_not_eat_holy_things_while_unclean, priestly_holiness).
scripture_reference(priests_do_not_eat_holy_things_while_unclean, 'Leviticus 22:1-9').
story_reference(priests_do_not_eat_holy_things_while_unclean, '1 Samuel 21:4-6', 'The priest only gives holy bread after asking about ritual purity.').
study_note(priests_do_not_eat_holy_things_while_unclean, 'Holy portions require priestly purity.').

command_requirement(priests_do_not_eat_holy_things_while_unclean, 'Priests').

% Command: offer_unblemished_animals
command(offer_unblemished_animals).
command_title(offer_unblemished_animals, 'Lev 22:17-25 - Offer unblemished animals.').
normal_obedience(offer_unblemished_animals, 'Do not offer blemished animals; offerings must meet Torah requirements.').
concerns(offer_unblemished_animals, priestly_holiness).
scripture_reference(offer_unblemished_animals, 'Leviticus 22:17-25').
story_reference(offer_unblemished_animals, 'Malachi 1:6-14', 'YHWH rebukes priests for offering blemished sacrifices.').
study_note(offer_unblemished_animals, 'The quality of offerings expresses reverence for YHWH.').

% Command: guard_sanctuary_duties
command(guard_sanctuary_duties).
command_title(guard_sanctuary_duties, 'Num 18 - Guard sanctuary duties.').
normal_obedience(guard_sanctuary_duties, 'Priests and Levites guard their appointed sanctuary duties.').
concerns(guard_sanctuary_duties, priestly_holiness).
scripture_reference(guard_sanctuary_duties, 'Numbers 18').
story_reference(guard_sanctuary_duties, '1 Chronicles 23:28-32', 'The Levites are assigned to assist Aaron''s sons and keep charge of sanctuary service.').
story_reference(guard_sanctuary_duties, '2 Chronicles 29:4-19', 'Hezekiah gathers priests and Levites to cleanse and restore the house of YHWH.').
study_note(guard_sanctuary_duties, 'Sanctuary service has assigned roles and boundaries.').

command_requirement(guard_sanctuary_duties, 'Priests').
command_requirement(guard_sanctuary_duties, 'Levites').

% Command: give_priestly_portions
command(give_priestly_portions).
command_title(give_priestly_portions, 'Num 18 - Give priestly and Levitical portions.').
normal_obedience(give_priestly_portions, 'Give the portions assigned to priests and Levites.').
concerns(give_priestly_portions, priestly_holiness).
scripture_reference(give_priestly_portions, 'Numbers 18').
scripture_reference(give_priestly_portions, 'Deuteronomy 18:1-8').
story_reference(give_priestly_portions, '2 Chronicles 31:4-12', 'Hezekiah commands the people to give the priestly and Levitical portions, and heaps are gathered.').
story_reference(give_priestly_portions, 'Nehemiah 12:44-47', 'Portions for priests and Levites are appointed in Nehemiah''s day.').
study_note(give_priestly_portions, 'Torah provides for priestly and Levitical service through assigned portions.').

% Command: levites_receive_tithe
command(levites_receive_tithe).
command_title(levites_receive_tithe, 'Num 18:21-32 - Levites receive the tithe.').
normal_obedience(levites_receive_tithe, 'Give the tithe assigned to the Levites, and the Levites give a tithe from it.').
concerns(levites_receive_tithe, priestly_holiness).
scripture_reference(levites_receive_tithe, 'Numbers 18:21-32').
story_reference(levites_receive_tithe, 'Nehemiah 13:10-12', 'Nehemiah restores the portions for the Levites so they can return to their service.').
story_reference(levites_receive_tithe, 'Hebrews 7:5', 'The author states that the sons of Levi who receive the priesthood have a commandment in the Law to take tithes from the people.').
non_canonical_story_reference(levites_receive_tithe, 'Tobit 1:6-8', 'Tobit describes journeying alone to Jerusalem for the festivals and giving the firstfruits, tithes, and firstlings to the priests and Levites at the altar.').
study_note(levites_receive_tithe, 'This command belongs to the Levitical support system.').

command_requirement(levites_receive_tithe, 'Levites').

% -----------------------------------------------------------------------------
% Additional Priestly Holiness Commands
% -----------------------------------------------------------------------------

% Command: build_the_sanctuary_according_to_the_pattern_shown
command(build_the_sanctuary_according_to_the_pattern_shown).
command_title(build_the_sanctuary_according_to_the_pattern_shown, 'Exodus 25:8-9 - Build the sanctuary according to the pattern shown.').
normal_obedience(build_the_sanctuary_according_to_the_pattern_shown, 'Build the sanctuary according to the pattern shown.').
concerns(build_the_sanctuary_according_to_the_pattern_shown, priestly_holiness).
scripture_reference(build_the_sanctuary_according_to_the_pattern_shown, 'Exodus 25:8-9').
story_reference(build_the_sanctuary_according_to_the_pattern_shown, 'Exodus 39:32-43', 'The tabernacle work is completed according to all that YHWH commanded Moses.').
story_reference(build_the_sanctuary_according_to_the_pattern_shown, 'Exodus 40:16-33', 'Moses sets up the tabernacle according to YHWH''s command.').
study_note(build_the_sanctuary_according_to_the_pattern_shown, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: Build the sanctuary according to the pattern shown.').

% Command: make_the_ark_according_to_torah_instructions
command(make_the_ark_according_to_torah_instructions).
command_title(make_the_ark_according_to_torah_instructions, 'Exodus 25:10-22 - Make the ark according to Torah instructions.').
normal_obedience(make_the_ark_according_to_torah_instructions, 'Make the ark according to Torah instructions.').
concerns(make_the_ark_according_to_torah_instructions, priestly_holiness).
scripture_reference(make_the_ark_according_to_torah_instructions, 'Exodus 25:10-22').
story_reference(make_the_ark_according_to_torah_instructions, 'Exodus 37:1-9', 'Bezalel makes the ark, mercy seat, and cherubim according to the pattern.').
study_note(make_the_ark_according_to_torah_instructions, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: Make the ark according to Torah instructions.').

% Command: make_the_table_lampstand_altar_curtains_and_court_according_to_the_pattern
command(make_the_table_lampstand_altar_curtains_and_court_according_to_the_pattern).
command_title(make_the_table_lampstand_altar_curtains_and_court_according_to_the_pattern, 'Exodus 25-27 - Make the table, lampstand, altar, curtains, and court according to the pattern.').
normal_obedience(make_the_table_lampstand_altar_curtains_and_court_according_to_the_pattern, 'Make the table, lampstand, altar, curtains, and court according to the pattern.').
concerns(make_the_table_lampstand_altar_curtains_and_court_according_to_the_pattern, priestly_holiness).
scripture_reference(make_the_table_lampstand_altar_curtains_and_court_according_to_the_pattern, 'Exodus 25-27').
story_reference(make_the_table_lampstand_altar_curtains_and_court_according_to_the_pattern, 'Exodus 36:8-38', 'The craftsmen make the tabernacle curtains, coverings, boards, bars, veil, and screen.').
story_reference(make_the_table_lampstand_altar_curtains_and_court_according_to_the_pattern, 'Exodus 37:10-29', 'The table, lampstand, altars, anointing oil, and incense are made.').
story_reference(make_the_table_lampstand_altar_curtains_and_court_according_to_the_pattern, 'Exodus 38:1-20', 'The altar, basin, and court are made according to the instructions.').
study_note(make_the_table_lampstand_altar_curtains_and_court_according_to_the_pattern, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: Make the table, lampstand, altar, curtains, and court according to the pattern.').

% Command: keep_the_lamp_burning_with_pure_beaten_olive_oil
command(keep_the_lamp_burning_with_pure_beaten_olive_oil).
command_title(keep_the_lamp_burning_with_pure_beaten_olive_oil, 'Exodus 27:20-21 - Keep the lamp burning with pure beaten olive oil.').
normal_obedience(keep_the_lamp_burning_with_pure_beaten_olive_oil, 'Keep the lamp burning with pure beaten olive oil.').
concerns(keep_the_lamp_burning_with_pure_beaten_olive_oil, priestly_holiness).
scripture_reference(keep_the_lamp_burning_with_pure_beaten_olive_oil, 'Exodus 27:20-21').
story_reference(keep_the_lamp_burning_with_pure_beaten_olive_oil, '1 Samuel 3:3', 'The lamp of Elohim is still burning in the temple area before Samuel hears YHWH.').
story_reference(keep_the_lamp_burning_with_pure_beaten_olive_oil, '2 Chronicles 13:11', 'Abijah says the priests burn offerings and set the lampstand in order every evening.').
study_note(keep_the_lamp_burning_with_pure_beaten_olive_oil, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: Keep the lamp burning with pure beaten olive oil.').

% Command: make_priestly_garments_for_glory_and_beauty
command(make_priestly_garments_for_glory_and_beauty).
command_title(make_priestly_garments_for_glory_and_beauty, 'Exodus 28 - Make priestly garments for glory and beauty.').
normal_obedience(make_priestly_garments_for_glory_and_beauty, 'Make priestly garments for glory and beauty.').
concerns(make_priestly_garments_for_glory_and_beauty, priestly_holiness).
scripture_reference(make_priestly_garments_for_glory_and_beauty, 'Exodus 28').
story_reference(make_priestly_garments_for_glory_and_beauty, 'Exodus 39:1-31', 'The priestly garments are made as YHWH commanded Moses.').
study_note(make_priestly_garments_for_glory_and_beauty, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: Make priestly garments for glory and beauty.').

% Command: consecrate_aaron_and_his_sons_according_to_torah
command(consecrate_aaron_and_his_sons_according_to_torah).
command_title(consecrate_aaron_and_his_sons_according_to_torah, 'Exodus 29 - Consecrate Aaron and his sons according to Torah.').
normal_obedience(consecrate_aaron_and_his_sons_according_to_torah, 'Consecrate Aaron and his sons according to Torah.').
concerns(consecrate_aaron_and_his_sons_according_to_torah, priestly_holiness).
scripture_reference(consecrate_aaron_and_his_sons_according_to_torah, 'Exodus 29').
story_reference(consecrate_aaron_and_his_sons_according_to_torah, 'Leviticus 8:1-36', 'Moses consecrates Aaron and his sons according to YHWH''s command.').
study_note(consecrate_aaron_and_his_sons_according_to_torah, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: Consecrate Aaron and his sons according to Torah.').

% Command: offer_the_daily_continual_offering_morning_and_evening
command(offer_the_daily_continual_offering_morning_and_evening).
command_title(offer_the_daily_continual_offering_morning_and_evening, 'Exodus 29:38-42 - Offer the daily continual offering morning and evening.').
normal_obedience(offer_the_daily_continual_offering_morning_and_evening, 'Offer the daily continual offering morning and evening.').
concerns(offer_the_daily_continual_offering_morning_and_evening, priestly_holiness).
scripture_reference(offer_the_daily_continual_offering_morning_and_evening, 'Exodus 29:38-42').
scripture_reference(offer_the_daily_continual_offering_morning_and_evening, 'Numbers 28:1-8').
story_reference(offer_the_daily_continual_offering_morning_and_evening, '1 Chronicles 16:39-40', 'Priests are appointed to offer burnt offerings continually morning and evening.').
story_reference(offer_the_daily_continual_offering_morning_and_evening, 'Ezra 3:3-5', 'The returned exiles offer burnt offerings morning and evening.').
study_note(offer_the_daily_continual_offering_morning_and_evening, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: Offer the daily continual offering morning and evening.').

% Command: make_the_incense_altar
command(make_the_incense_altar).
command_title(make_the_incense_altar, 'Exodus 30:1-10 - Make the incense altar.').
normal_obedience(make_the_incense_altar, 'Make the incense altar.').
concerns(make_the_incense_altar, priestly_holiness).
scripture_reference(make_the_incense_altar, 'Exodus 30:1-10').
story_reference(make_the_incense_altar, 'Exodus 37:25-29', 'The incense altar, anointing oil, and incense are made.').
story_reference(make_the_incense_altar, 'Luke 1:9-11', 'Zechariah enters the temple to burn incense at the altar of incense, and an angel appears standing at the right side of that altar.').
study_note(make_the_incense_altar, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: Make the incense altar.').
command_requirement(make_the_incense_altar, 'Tabernacle Builders').

% Command: do_not_offer_strange_incense_on_the_incense_altar
command(do_not_offer_strange_incense_on_the_incense_altar).
command_title(do_not_offer_strange_incense_on_the_incense_altar, 'Exodus 30:9 - Do not offer strange incense on the incense altar.').
normal_obedience(do_not_offer_strange_incense_on_the_incense_altar, 'Do not offer strange incense on the incense altar.').
concerns(do_not_offer_strange_incense_on_the_incense_altar, priestly_holiness).
scripture_reference(do_not_offer_strange_incense_on_the_incense_altar, 'Exodus 30:9').
story_reference(do_not_offer_strange_incense_on_the_incense_altar, 'Leviticus 10:1-2', 'Nadab and Abihu offer unauthorized fire before YHWH and die before Him.').
study_note(do_not_offer_strange_incense_on_the_incense_altar, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: Do not offer strange incense on the incense altar.').

% Command: do_not_offer_burnt_offering_or_grain_offering_on_the_incense_altar
command(do_not_offer_burnt_offering_or_grain_offering_on_the_incense_altar).
command_title(do_not_offer_burnt_offering_or_grain_offering_on_the_incense_altar, 'Exodus 30:9 - Do not offer burnt offering or grain offering on the incense altar.').
normal_obedience(do_not_offer_burnt_offering_or_grain_offering_on_the_incense_altar, 'Do not offer burnt offering or grain offering on the incense altar.').
concerns(do_not_offer_burnt_offering_or_grain_offering_on_the_incense_altar, priestly_holiness).
scripture_reference(do_not_offer_burnt_offering_or_grain_offering_on_the_incense_altar, 'Exodus 30:9').
story_reference(do_not_offer_burnt_offering_or_grain_offering_on_the_incense_altar, '2 Chronicles 26:16-21', 'Uzziah enters the temple to burn incense and is resisted by the priests before becoming leprous.').
study_note(do_not_offer_burnt_offering_or_grain_offering_on_the_incense_altar, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: Do not offer burnt offering or grain offering on the incense altar.').

% Command: make_the_bronze_laver_for_washing
command(make_the_bronze_laver_for_washing).
command_title(make_the_bronze_laver_for_washing, 'Exodus 30:17-21 - Make the bronze laver for washing.').
normal_obedience(make_the_bronze_laver_for_washing, 'Make the bronze laver for washing.').
concerns(make_the_bronze_laver_for_washing, priestly_holiness).
scripture_reference(make_the_bronze_laver_for_washing, 'Exodus 30:17-21').
story_reference(make_the_bronze_laver_for_washing, 'Exodus 38:8', 'The bronze basin and its stand are made from the mirrors of the serving women.').
study_note(make_the_bronze_laver_for_washing, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: Make the bronze laver for washing.').
normal_obedience(make_the_bronze_laver_for_washing, 'Tabernacle Builders').
command_requirement(make_the_bronze_laver_for_washing, 'Tabernacle Builders').

% Command: priests_must_wash_hands_and_feet_before_service
command(priests_must_wash_hands_and_feet_before_service).
command_title(priests_must_wash_hands_and_feet_before_service, 'Exodus 30:19-21 - Priests must wash hands and feet before service.').
normal_obedience(priests_must_wash_hands_and_feet_before_service, 'Priests must wash hands and feet before service.').
concerns(priests_must_wash_hands_and_feet_before_service, priestly_holiness).
scripture_reference(priests_must_wash_hands_and_feet_before_service, 'Exodus 30:19-21').
story_reference(priests_must_wash_hands_and_feet_before_service, 'Exodus 40:30-32', 'Moses, Aaron, and Aaron''s sons wash at the basin when entering the tent or approaching the altar.').
study_note(priests_must_wash_hands_and_feet_before_service, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: Priests must wash hands and feet before service.').

command_requirement(priests_must_wash_hands_and_feet_before_service, 'Priests').

% Command: make_the_anointing_oil_according_to_torah
command(make_the_anointing_oil_according_to_torah).
command_title(make_the_anointing_oil_according_to_torah, 'Exodus 30:22-33 - Make the anointing oil according to Torah.').
normal_obedience(make_the_anointing_oil_according_to_torah, 'Make the anointing oil according to Torah.').
concerns(make_the_anointing_oil_according_to_torah, priestly_holiness).
scripture_reference(make_the_anointing_oil_according_to_torah, 'Exodus 30:22-33').
story_reference(make_the_anointing_oil_according_to_torah, 'Exodus 37:29', 'The holy anointing oil is made by a perfumer as part of the tabernacle work.').
study_note(make_the_anointing_oil_according_to_torah, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: Make the anointing oil according to Torah.').

% Command: do_not_pour_holy_anointing_oil_on_ordinary_flesh
command(do_not_pour_holy_anointing_oil_on_ordinary_flesh).
command_title(do_not_pour_holy_anointing_oil_on_ordinary_flesh, 'Exodus 30:32 - Do not pour holy anointing oil on ordinary flesh.').
normal_obedience(do_not_pour_holy_anointing_oil_on_ordinary_flesh, 'Do not pour holy anointing oil on ordinary flesh.').
concerns(do_not_pour_holy_anointing_oil_on_ordinary_flesh, priestly_holiness).
scripture_reference(do_not_pour_holy_anointing_oil_on_ordinary_flesh, 'Exodus 30:32').
source_term(do_not_pour_holy_anointing_oil_on_ordinary_flesh, hebrew, shemen_mishchah, 'anointing oil; the holy oil reserved for sanctuary consecration').
source_term(do_not_pour_holy_anointing_oil_on_ordinary_flesh, hebrew, basar_adam, 'human or ordinary flesh; the forbidden recipient of the holy anointing oil').
study_note(do_not_pour_holy_anointing_oil_on_ordinary_flesh, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: Do not pour holy anointing oil on ordinary flesh.').

% Command: do_not_make_anointing_oil_with_the_same_composition_for_ordinary_use
command(do_not_make_anointing_oil_with_the_same_composition_for_ordinary_use).
command_title(do_not_make_anointing_oil_with_the_same_composition_for_ordinary_use, 'Exodus 30:32-33 - Do not make anointing oil with the same composition for ordinary use.').
normal_obedience(do_not_make_anointing_oil_with_the_same_composition_for_ordinary_use, 'Do not make anointing oil with the same composition for ordinary use.').
concerns(do_not_make_anointing_oil_with_the_same_composition_for_ordinary_use, priestly_holiness).
scripture_reference(do_not_make_anointing_oil_with_the_same_composition_for_ordinary_use, 'Exodus 30:32-33').
source_term(do_not_make_anointing_oil_with_the_same_composition_for_ordinary_use, hebrew, matkoneth, 'composition, measure, or recipe; the holy oil formula must not be copied for ordinary use').
source_term(do_not_make_anointing_oil_with_the_same_composition_for_ordinary_use, hebrew, qodesh, 'holy or set apart; the oil is holy and restricted to sanctuary purpose').
study_note(do_not_make_anointing_oil_with_the_same_composition_for_ordinary_use, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: Do not make anointing oil with the same composition for ordinary use.').

% Command: make_the_holy_incense_according_to_torah
command(make_the_holy_incense_according_to_torah).
command_title(make_the_holy_incense_according_to_torah, 'Exodus 30:34-38 - Make the holy incense according to Torah.').
normal_obedience(make_the_holy_incense_according_to_torah, 'Make the holy incense according to Torah.').
concerns(make_the_holy_incense_according_to_torah, priestly_holiness).
scripture_reference(make_the_holy_incense_according_to_torah, 'Exodus 30:34-38').
source_term(make_the_holy_incense_according_to_torah, hebrew, qetoreth, 'incense; the holy incense made according to the specified formula').
source_term(make_the_holy_incense_according_to_torah, hebrew, rokeach, 'perfumer or compounder; the incense is made as the work of a perfumer').
study_note(make_the_holy_incense_according_to_torah, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: Make the holy incense according to Torah.').

% Command: do_not_make_incense_with_the_same_composition_for_ordinary_smelling
command(do_not_make_incense_with_the_same_composition_for_ordinary_smelling).
command_title(do_not_make_incense_with_the_same_composition_for_ordinary_smelling, 'Exodus 30:37-38 - Do not make incense with the same composition for ordinary smelling.').
normal_obedience(do_not_make_incense_with_the_same_composition_for_ordinary_smelling, 'Do not make incense with the same composition for ordinary smelling.').
concerns(do_not_make_incense_with_the_same_composition_for_ordinary_smelling, priestly_holiness).
scripture_reference(do_not_make_incense_with_the_same_composition_for_ordinary_smelling, 'Exodus 30:37-38').
source_term(do_not_make_incense_with_the_same_composition_for_ordinary_smelling, hebrew, matkoneth, 'composition or recipe; the holy incense formula must not be duplicated for ordinary smelling').
source_term(do_not_make_incense_with_the_same_composition_for_ordinary_smelling, hebrew, reyach, 'smell or fragrance; the forbidden ordinary use is smelling the copied incense').
study_note(do_not_make_incense_with_the_same_composition_for_ordinary_smelling, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: Do not make incense with the same composition for ordinary smelling.').

% Command: do_not_offer_leaven_or_honey_as_fire_offering_on_the_altar
command(do_not_offer_leaven_or_honey_as_fire_offering_on_the_altar).
command_title(do_not_offer_leaven_or_honey_as_fire_offering_on_the_altar, 'Leviticus 2:11 - Do not offer leaven or honey as fire offering on the altar.').
normal_obedience(do_not_offer_leaven_or_honey_as_fire_offering_on_the_altar, 'Do not offer leaven or honey as fire offering on the altar.').
concerns(do_not_offer_leaven_or_honey_as_fire_offering_on_the_altar, priestly_holiness).
scripture_reference(do_not_offer_leaven_or_honey_as_fire_offering_on_the_altar, 'Leviticus 2:11').
source_term(do_not_offer_leaven_or_honey_as_fire_offering_on_the_altar, hebrew, seor, 'leaven; forbidden as a fire offering on the altar in Leviticus 2:11').
source_term(do_not_offer_leaven_or_honey_as_fire_offering_on_the_altar, hebrew, debash, 'honey; forbidden as a fire offering on the altar in Leviticus 2:11').
source_term(do_not_offer_leaven_or_honey_as_fire_offering_on_the_altar, hebrew, ishsheh, 'fire offering or offering made by fire; the offering category in view').
study_note(do_not_offer_leaven_or_honey_as_fire_offering_on_the_altar, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: Do not offer leaven or honey as fire offering on the altar.').

% Command: season_every_grain_offering_with_salt
command(season_every_grain_offering_with_salt).
command_title(season_every_grain_offering_with_salt, 'Leviticus 2:13 - Season every grain offering with salt.').
normal_obedience(season_every_grain_offering_with_salt, 'Season every grain offering with salt.').
concerns(season_every_grain_offering_with_salt, priestly_holiness).
scripture_reference(season_every_grain_offering_with_salt, 'Leviticus 2:13').
source_term(season_every_grain_offering_with_salt, hebrew, melach, 'salt; every grain offering is seasoned with salt').
source_term(season_every_grain_offering_with_salt, hebrew, minchah, 'grain offering or tribute offering; the offering seasoned with salt').
study_note(season_every_grain_offering_with_salt, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: Season every grain offering with salt.').

% Command: do_not_let_the_salt_of_the_covenant_be_lacking_from_grain_offerings
command(do_not_let_the_salt_of_the_covenant_be_lacking_from_grain_offerings).
command_title(do_not_let_the_salt_of_the_covenant_be_lacking_from_grain_offerings, 'Leviticus 2:13 - Do not let the salt of the covenant be lacking from grain offerings.').
normal_obedience(do_not_let_the_salt_of_the_covenant_be_lacking_from_grain_offerings, 'Do not let the salt of the covenant be lacking from grain offerings.').
concerns(do_not_let_the_salt_of_the_covenant_be_lacking_from_grain_offerings, priestly_holiness).
scripture_reference(do_not_let_the_salt_of_the_covenant_be_lacking_from_grain_offerings, 'Leviticus 2:13').
source_term(do_not_let_the_salt_of_the_covenant_be_lacking_from_grain_offerings, hebrew, melach_berith, 'salt of the covenant; the required covenant sign in grain offerings').
source_term(do_not_let_the_salt_of_the_covenant_be_lacking_from_grain_offerings, hebrew, shabath, 'to cease or be lacking; the salt must not be left out or absent').
study_note(do_not_let_the_salt_of_the_covenant_be_lacking_from_grain_offerings, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: Do not let the salt of the covenant be lacking from grain offerings.').

% Command: restore_what_was_taken_or_withheld_and_add_the_fifth_in_guilt_cases
command(restore_what_was_taken_or_withheld_and_add_the_fifth_in_guilt_cases).
command_title(restore_what_was_taken_or_withheld_and_add_the_fifth_in_guilt_cases, 'Leviticus 6:1-7 - Restore what was taken or withheld and add the fifth in guilt cases.').
normal_obedience(restore_what_was_taken_or_withheld_and_add_the_fifth_in_guilt_cases, 'Restore what was taken or withheld and add the fifth in guilt cases.').
concerns(restore_what_was_taken_or_withheld_and_add_the_fifth_in_guilt_cases, priestly_holiness).
scripture_reference(restore_what_was_taken_or_withheld_and_add_the_fifth_in_guilt_cases, 'Leviticus 6:1-7').
source_term(restore_what_was_taken_or_withheld_and_add_the_fifth_in_guilt_cases, hebrew, shalam, 'to repay, restore, or make whole in restitution').
source_term(restore_what_was_taken_or_withheld_and_add_the_fifth_in_guilt_cases, hebrew, chamishit, 'a fifth part added to restitution in the guilt case').
study_note(restore_what_was_taken_or_withheld_and_add_the_fifth_in_guilt_cases, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: Restore what was taken or withheld and add the fifth in guilt cases.').

% Command: keep_the_altar_fire_burning_continually
command(keep_the_altar_fire_burning_continually).
command_title(keep_the_altar_fire_burning_continually, 'Leviticus 6:12-13 - Keep the altar fire burning continually.').
normal_obedience(keep_the_altar_fire_burning_continually, 'Keep the altar fire burning continually.').
concerns(keep_the_altar_fire_burning_continually, priestly_holiness).
scripture_reference(keep_the_altar_fire_burning_continually, 'Leviticus 6:12-13').
source_term(keep_the_altar_fire_burning_continually, hebrew, esh, 'fire; the altar fire must keep burning').
source_term(keep_the_altar_fire_burning_continually, hebrew, tamid, 'continual or regular; the fire is kept burning continually').
source_term(keep_the_altar_fire_burning_continually, hebrew, mizbeach, 'altar; the place where the fire is maintained').
study_note(keep_the_altar_fire_burning_continually, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: Keep the altar fire burning continually.').

% Command: do_not_let_the_altar_fire_go_out
command(do_not_let_the_altar_fire_go_out).
command_title(do_not_let_the_altar_fire_go_out, 'Leviticus 6:13 - Do not let the altar fire go out.').
normal_obedience(do_not_let_the_altar_fire_go_out, 'Do not let the altar fire go out.').
concerns(do_not_let_the_altar_fire_go_out, priestly_holiness).
scripture_reference(do_not_let_the_altar_fire_go_out, 'Leviticus 6:13').
source_term(do_not_let_the_altar_fire_go_out, hebrew, kabah, 'to quench, go out, or be extinguished; the altar fire must not go out').
source_term(do_not_let_the_altar_fire_go_out, hebrew, esh, 'fire; the altar fire is the object of the prohibition').
study_note(do_not_let_the_altar_fire_go_out, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: Do not let the altar fire go out.').

% Command: priests_eat_certain_grain_offerings_in_a_holy_place
command(priests_eat_certain_grain_offerings_in_a_holy_place).
command_title(priests_eat_certain_grain_offerings_in_a_holy_place, 'Leviticus 6:14-18 - Priests eat certain grain offerings in a holy place.').
normal_obedience(priests_eat_certain_grain_offerings_in_a_holy_place, 'Priests eat certain grain offerings in a holy place.').
concerns(priests_eat_certain_grain_offerings_in_a_holy_place, priestly_holiness).
scripture_reference(priests_eat_certain_grain_offerings_in_a_holy_place, 'Leviticus 6:14-18').
source_term(priests_eat_certain_grain_offerings_in_a_holy_place, hebrew, matsah, 'unleavened bread; the grain offering remainder is eaten unleavened').
source_term(priests_eat_certain_grain_offerings_in_a_holy_place, hebrew, maqom_qadosh, 'holy place; the location where the priests eat the offering').
study_note(priests_eat_certain_grain_offerings_in_a_holy_place, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: Priests eat certain grain offerings in a holy place.').

command_requirement(priests_eat_certain_grain_offerings_in_a_holy_place, 'Priests').

% Command: burn_the_priestly_grain_offering_completely
command(burn_the_priestly_grain_offering_completely).
command_title(burn_the_priestly_grain_offering_completely, 'Leviticus 6:23 - Burn the priestly grain offering completely.').
normal_obedience(burn_the_priestly_grain_offering_completely, 'Burn the priestly grain offering completely.').
concerns(burn_the_priestly_grain_offering_completely, priestly_holiness).
scripture_reference(burn_the_priestly_grain_offering_completely, 'Leviticus 6:23').
source_term(burn_the_priestly_grain_offering_completely, hebrew, kalil, 'whole or entirely; the priestly grain offering is wholly burned').
source_term(burn_the_priestly_grain_offering_completely, hebrew, qatar, 'to burn as incense or make smoke on the altar').
study_note(burn_the_priestly_grain_offering_completely, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: Burn the priestly grain offering completely.').

% Command: eat_the_sin_offering_in_a_holy_place_when_torah_permits
command(eat_the_sin_offering_in_a_holy_place_when_torah_permits).
command_title(eat_the_sin_offering_in_a_holy_place_when_torah_permits, 'Leviticus 6:24-30 - Eat the sin offering in a holy place when Torah permits.').
normal_obedience(eat_the_sin_offering_in_a_holy_place_when_torah_permits, 'Eat the sin offering in a holy place when Torah permits.').
concerns(eat_the_sin_offering_in_a_holy_place_when_torah_permits, priestly_holiness).
scripture_reference(eat_the_sin_offering_in_a_holy_place_when_torah_permits, 'Leviticus 6:24-30').
source_term(eat_the_sin_offering_in_a_holy_place_when_torah_permits, hebrew, chattat, 'sin offering or purification offering; the offering eaten when Torah permits').
source_term(eat_the_sin_offering_in_a_holy_place_when_torah_permits, hebrew, qodesh_qodashim, 'most holy thing; the status of the sin offering portion').
study_note(eat_the_sin_offering_in_a_holy_place_when_torah_permits, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: Eat the sin offering in a holy place when Torah permits.').

% Command: eat_the_thanksgiving_peace_offering_the_same_day
command(eat_the_thanksgiving_peace_offering_the_same_day).
command_title(eat_the_thanksgiving_peace_offering_the_same_day, 'Leviticus 7:15 - Eat the thanksgiving peace offering the same day.').
normal_obedience(eat_the_thanksgiving_peace_offering_the_same_day, 'Eat the thanksgiving peace offering the same day.').
concerns(eat_the_thanksgiving_peace_offering_the_same_day, priestly_holiness).
scripture_reference(eat_the_thanksgiving_peace_offering_the_same_day, 'Leviticus 7:15').
source_term(eat_the_thanksgiving_peace_offering_the_same_day, hebrew, todah, 'thanksgiving; the peace offering type that must be eaten the same day').
source_term(eat_the_thanksgiving_peace_offering_the_same_day, hebrew, zebach_shelamim, 'peace-offering sacrifice; the offering category in Leviticus 7').
study_note(eat_the_thanksgiving_peace_offering_the_same_day, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: Eat the thanksgiving peace offering the same day.').

% Command: do_not_leave_thanksgiving_peace_offering_until_morning
command(do_not_leave_thanksgiving_peace_offering_until_morning).
command_title(do_not_leave_thanksgiving_peace_offering_until_morning, 'Leviticus 7:15 - Do not leave thanksgiving peace offering until morning.').
normal_obedience(do_not_leave_thanksgiving_peace_offering_until_morning, 'Do not leave thanksgiving peace offering until morning.').
concerns(do_not_leave_thanksgiving_peace_offering_until_morning, priestly_holiness).
scripture_reference(do_not_leave_thanksgiving_peace_offering_until_morning, 'Leviticus 7:15').
source_term(do_not_leave_thanksgiving_peace_offering_until_morning, hebrew, yathar, 'to remain or be left over; thanksgiving peace offering flesh must not remain until morning').
source_term(do_not_leave_thanksgiving_peace_offering_until_morning, hebrew, boqer, 'morning; the boundary by which it must not remain').
study_note(do_not_leave_thanksgiving_peace_offering_until_morning, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: Do not leave thanksgiving peace offering until morning.').

% Command: do_not_eat_sacrificial_flesh_on_the_third_day
command(do_not_eat_sacrificial_flesh_on_the_third_day).
command_title(do_not_eat_sacrificial_flesh_on_the_third_day, 'Leviticus 7:17-18 - Do not eat sacrificial flesh on the third day.').
normal_obedience(do_not_eat_sacrificial_flesh_on_the_third_day, 'Do not eat sacrificial flesh on the third day.').
concerns(do_not_eat_sacrificial_flesh_on_the_third_day, priestly_holiness).
scripture_reference(do_not_eat_sacrificial_flesh_on_the_third_day, 'Leviticus 7:17-18').
source_term(do_not_eat_sacrificial_flesh_on_the_third_day, hebrew, shelishi, 'third; the day on which sacrificial flesh must not be eaten').
source_term(do_not_eat_sacrificial_flesh_on_the_third_day, hebrew, piggul, 'rejected, foul, or invalid sacrificial flesh when eaten beyond the permitted time').
study_note(do_not_eat_sacrificial_flesh_on_the_third_day, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: Do not eat sacrificial flesh on the third day.').

% Command: burn_leftover_sacrificial_flesh_according_to_torah
command(burn_leftover_sacrificial_flesh_according_to_torah).
command_title(burn_leftover_sacrificial_flesh_according_to_torah, 'Leviticus 7:17 - Burn leftover sacrificial flesh according to Torah.').
normal_obedience(burn_leftover_sacrificial_flesh_according_to_torah, 'Burn leftover sacrificial flesh according to Torah.').
concerns(burn_leftover_sacrificial_flesh_according_to_torah, priestly_holiness).
scripture_reference(burn_leftover_sacrificial_flesh_according_to_torah, 'Leviticus 7:17').
source_term(burn_leftover_sacrificial_flesh_according_to_torah, hebrew, saraph, 'to burn; leftover sacrificial flesh is burned with fire').
source_term(burn_leftover_sacrificial_flesh_according_to_torah, hebrew, nothar, 'leftover or remaining sacrificial flesh beyond its permitted time').
study_note(burn_leftover_sacrificial_flesh_according_to_torah, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: Burn leftover sacrificial flesh according to Torah.').

% Command: do_not_eat_holy_flesh_while_unclean
command(do_not_eat_holy_flesh_while_unclean).
command_title(do_not_eat_holy_flesh_while_unclean, 'Leviticus 7:19-21 - Do not eat holy flesh while unclean.').
normal_obedience(do_not_eat_holy_flesh_while_unclean, 'Do not eat holy flesh while unclean.').
concerns(do_not_eat_holy_flesh_while_unclean, priestly_holiness).
scripture_reference(do_not_eat_holy_flesh_while_unclean, 'Leviticus 7:19-21').
source_term(do_not_eat_holy_flesh_while_unclean, hebrew, basar_qodesh, 'holy flesh or consecrated sacrificial meat').
source_term(do_not_eat_holy_flesh_while_unclean, hebrew, tumah, 'uncleanness or impurity; the state that bars eating holy flesh').
study_note(do_not_eat_holy_flesh_while_unclean, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: Do not eat holy flesh while unclean.').

% Command: do_not_eat_the_fat_of_ox_sheep_or_goat_reserved_by_torah
command(do_not_eat_the_fat_of_ox_sheep_or_goat_reserved_by_torah).
command_title(do_not_eat_the_fat_of_ox_sheep_or_goat_reserved_by_torah, 'Leviticus 7:23 - Do not eat the fat of ox, sheep, or goat reserved by Torah.').
normal_obedience(do_not_eat_the_fat_of_ox_sheep_or_goat_reserved_by_torah, 'Do not eat the fat of ox, sheep, or goat reserved by Torah.').
concerns(do_not_eat_the_fat_of_ox_sheep_or_goat_reserved_by_torah, priestly_holiness).
scripture_reference(do_not_eat_the_fat_of_ox_sheep_or_goat_reserved_by_torah, 'Leviticus 7:23').
source_term(do_not_eat_the_fat_of_ox_sheep_or_goat_reserved_by_torah, hebrew, chelev, 'fat, especially the reserved sacrificial fat that belongs on the altar').
source_term(do_not_eat_the_fat_of_ox_sheep_or_goat_reserved_by_torah, hebrew, shor_keseb_ez, 'ox, sheep, or goat; the named animals whose fat is restricted').
study_note(do_not_eat_the_fat_of_ox_sheep_or_goat_reserved_by_torah, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: Do not eat the fat of ox, sheep, or goat reserved by Torah.').

% Command: the_high_priest_must_not_enter_the_most_holy_place_at_any_time_but_according_t
command(the_high_priest_must_not_enter_the_most_holy_place_at_any_time_but_according_t).
command_title(the_high_priest_must_not_enter_the_most_holy_place_at_any_time_but_according_t, 'Leviticus 16:2 - The high priest must not enter the Most Holy Place at any time, but according to Torah.').
normal_obedience(the_high_priest_must_not_enter_the_most_holy_place_at_any_time_but_according_t, 'The high priest must not enter the Most Holy Place at any time, but according to Torah.').
concerns(the_high_priest_must_not_enter_the_most_holy_place_at_any_time_but_according_t, priestly_holiness).
scripture_reference(the_high_priest_must_not_enter_the_most_holy_place_at_any_time_but_according_t, 'Leviticus 16:2').
source_term(the_high_priest_must_not_enter_the_most_holy_place_at_any_time_but_according_t, hebrew, qodesh, 'holy place; Leviticus 16 restricts entry into the holy place behind the veil').
source_term(the_high_priest_must_not_enter_the_most_holy_place_at_any_time_but_according_t, hebrew, paroketh, 'veil or curtain; the boundary before the mercy seat').
source_term(the_high_priest_must_not_enter_the_most_holy_place_at_any_time_but_according_t, hebrew, kapporeth, 'mercy seat or atonement cover; the object before which unauthorized entry is forbidden').
study_note(the_high_priest_must_not_enter_the_most_holy_place_at_any_time_but_according_t, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: The high priest must not enter the Most Holy Place at any time, but according to Torah.').

story_reference(the_high_priest_must_not_enter_the_most_holy_place_at_any_time_but_according_t, 'Hebrews 9:7', 'The author notes that only the high priest enters the second, inner room, and only once a year, taking blood to offer for himself and the sins of the people.').

command_requirement(the_high_priest_must_not_enter_the_most_holy_place_at_any_time_but_according_t, 'High Priest').

% Command: follow_the_day_of_atonement_sanctuary_service_procedure
command(follow_the_day_of_atonement_sanctuary_service_procedure).
command_title(follow_the_day_of_atonement_sanctuary_service_procedure, 'Leviticus 16 - Follow the Day of Atonement sanctuary service procedure.').
normal_obedience(follow_the_day_of_atonement_sanctuary_service_procedure, 'Follow the Day of Atonement sanctuary service procedure.').
concerns(follow_the_day_of_atonement_sanctuary_service_procedure, priestly_holiness).
scripture_reference(follow_the_day_of_atonement_sanctuary_service_procedure, 'Leviticus 16').
source_term(follow_the_day_of_atonement_sanctuary_service_procedure, hebrew, kippurim, 'atonements; Leviticus 16 gives the sanctuary service for the Day of Atonement').
source_term(follow_the_day_of_atonement_sanctuary_service_procedure, hebrew, seir_lazazel, 'goat for Azazel; part of the Atonement service procedure').
study_note(follow_the_day_of_atonement_sanctuary_service_procedure, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: Follow the Day of Atonement sanctuary service procedure.').

% Command: do_not_slaughter_offerings_outside_the_appointed_place_when_sanctuary_rules_ap
command(do_not_slaughter_offerings_outside_the_appointed_place_when_sanctuary_rules_ap).
command_title(do_not_slaughter_offerings_outside_the_appointed_place_when_sanctuary_rules_ap, 'Leviticus 17:1-9 - Do not slaughter offerings outside the appointed place when sanctuary rules apply.').
normal_obedience(do_not_slaughter_offerings_outside_the_appointed_place_when_sanctuary_rules_ap, 'Do not slaughter offerings outside the appointed place when sanctuary rules apply.').
concerns(do_not_slaughter_offerings_outside_the_appointed_place_when_sanctuary_rules_ap, priestly_holiness).
scripture_reference(do_not_slaughter_offerings_outside_the_appointed_place_when_sanctuary_rules_ap, 'Leviticus 17:1-9').
source_term(do_not_slaughter_offerings_outside_the_appointed_place_when_sanctuary_rules_ap, hebrew, shachat, 'to slaughter; the sanctuary rule governs where offerings are slaughtered').
source_term(do_not_slaughter_offerings_outside_the_appointed_place_when_sanctuary_rules_ap, hebrew, petach_ohel_moed, 'entrance of the tent of meeting; the appointed place in Leviticus 17').
study_note(do_not_slaughter_offerings_outside_the_appointed_place_when_sanctuary_rules_ap, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: Do not slaughter offerings outside the appointed place when sanctuary rules apply.').

% Command: cover_the_blood_of_hunted_clean_bird_or_animal_with_dust
command(cover_the_blood_of_hunted_clean_bird_or_animal_with_dust).
command_title(cover_the_blood_of_hunted_clean_bird_or_animal_with_dust, 'Leviticus 17:13 - Cover the blood of hunted clean bird or animal with dust.').
normal_obedience(cover_the_blood_of_hunted_clean_bird_or_animal_with_dust, 'Cover the blood of hunted clean bird or animal with dust.').
concerns(cover_the_blood_of_hunted_clean_bird_or_animal_with_dust, priestly_holiness).
scripture_reference(cover_the_blood_of_hunted_clean_bird_or_animal_with_dust, 'Leviticus 17:13').
source_term(cover_the_blood_of_hunted_clean_bird_or_animal_with_dust, hebrew, kisah, 'to cover; the hunter covers the blood with dust').
source_term(cover_the_blood_of_hunted_clean_bird_or_animal_with_dust, hebrew, aphar, 'dust or dry earth used to cover the blood').
source_term(cover_the_blood_of_hunted_clean_bird_or_animal_with_dust, hebrew, dam, 'blood; the life-bearing blood that must be covered').
study_note(cover_the_blood_of_hunted_clean_bird_or_animal_with_dust, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: Cover the blood of hunted clean bird or animal with dust.').

% Command: do_not_offer_blemished_animals
command(do_not_offer_blemished_animals).
command_title(do_not_offer_blemished_animals, 'Leviticus 22:20-25 - Do not offer blemished animals.').
normal_obedience(do_not_offer_blemished_animals, 'Do not offer blemished animals.').
concerns(do_not_offer_blemished_animals, priestly_holiness).
scripture_reference(do_not_offer_blemished_animals, 'Leviticus 22:20-25').
source_term(do_not_offer_blemished_animals, hebrew, mum, 'blemish or defect; an animal with a blemish must not be offered').
source_term(do_not_offer_blemished_animals, hebrew, tamim, 'complete, whole, or unblemished; the required offering condition').
study_note(do_not_offer_blemished_animals, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: Do not offer blemished animals.').
command_requirement(do_not_offer_blemished_animals, 'Priests').
command_requirement(do_not_offer_blemished_animals, 'Tabernacle or Temple').

% Command: do_not_slaughter_an_animal_and_its_young_on_the_same_day
command(do_not_slaughter_an_animal_and_its_young_on_the_same_day).
command_title(do_not_slaughter_an_animal_and_its_young_on_the_same_day, 'Leviticus 22:28 - Do not slaughter an animal and its young on the same day.').
normal_obedience(do_not_slaughter_an_animal_and_its_young_on_the_same_day, 'Do not slaughter an animal and its young on the same day.').
concerns(do_not_slaughter_an_animal_and_its_young_on_the_same_day, priestly_holiness).
scripture_reference(do_not_slaughter_an_animal_and_its_young_on_the_same_day, 'Leviticus 22:28').
source_term(do_not_slaughter_an_animal_and_its_young_on_the_same_day, hebrew, oto_ve_et_beno, 'it and its son/young; the animal and its offspring named in the prohibition').
source_term(do_not_slaughter_an_animal_and_its_young_on_the_same_day, hebrew, yom_echad, 'one day or same day; the time boundary of the prohibition').
study_note(do_not_slaughter_an_animal_and_its_young_on_the_same_day, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: Do not slaughter an animal and its young on the same day.').

% Command: bring_firstfruits_to_the_place_yhwh_chooses_and_make_the_declaration
command(bring_firstfruits_to_the_place_yhwh_chooses_and_make_the_declaration).
command_title(bring_firstfruits_to_the_place_yhwh_chooses_and_make_the_declaration, 'Deuteronomy 26:1-11 - Bring firstfruits to the place YHWH chooses and make the declaration.').
normal_obedience(bring_firstfruits_to_the_place_yhwh_chooses_and_make_the_declaration, 'Bring firstfruits to the place YHWH chooses and make the declaration.').
concerns(bring_firstfruits_to_the_place_yhwh_chooses_and_make_the_declaration, priestly_holiness).
scripture_reference(bring_firstfruits_to_the_place_yhwh_chooses_and_make_the_declaration, 'Deuteronomy 26:1-11').
source_term(bring_firstfruits_to_the_place_yhwh_chooses_and_make_the_declaration, hebrew, reshith, 'first or first portion brought from the fruit of the land').
source_term(bring_firstfruits_to_the_place_yhwh_chooses_and_make_the_declaration, hebrew, tene, 'basket; the firstfruits are placed in a basket and brought').
source_term(bring_firstfruits_to_the_place_yhwh_chooses_and_make_the_declaration, hebrew, nagad, 'to declare or tell; the worshiper makes the firstfruits declaration').
study_note(bring_firstfruits_to_the_place_yhwh_chooses_and_make_the_declaration, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: Bring firstfruits to the place YHWH chooses and make the declaration.').

% Command: make_the_tithe_declaration_in_the_third_year
command(make_the_tithe_declaration_in_the_third_year).
command_title(make_the_tithe_declaration_in_the_third_year, 'Deuteronomy 26:12-15 - Make the tithe declaration in the third year.').
normal_obedience(make_the_tithe_declaration_in_the_third_year, 'Make the tithe declaration in the third year.').
concerns(make_the_tithe_declaration_in_the_third_year, priestly_holiness).
scripture_reference(make_the_tithe_declaration_in_the_third_year, 'Deuteronomy 26:12-15').
source_term(make_the_tithe_declaration_in_the_third_year, hebrew, maaser, 'tithe or tenth portion; the third-year tithe is the subject of the declaration').
source_term(make_the_tithe_declaration_in_the_third_year, hebrew, biar, 'to remove or clear out; the tithe is removed from the house and given as commanded').
study_note(make_the_tithe_declaration_in_the_third_year, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: Make the tithe declaration in the third year.').

% Command: priests_must_be_holy_to_yhwh
command(priests_must_be_holy_to_yhwh).
command_title(priests_must_be_holy_to_yhwh, 'Leviticus 21:6 - Priests must be holy to YHWH.').
normal_obedience(priests_must_be_holy_to_yhwh, 'Priests must be holy to YHWH.').
concerns(priests_must_be_holy_to_yhwh, priestly_holiness).
scripture_reference(priests_must_be_holy_to_yhwh, 'Leviticus 21:6').
source_term(priests_must_be_holy_to_yhwh, hebrew, qadosh, 'holy or set apart; the required status of priests to YHWH').
source_term(priests_must_be_holy_to_yhwh, hebrew, lechem_elohim, 'bread/food of God; the offerings the priests present in their holy role').
study_note(priests_must_be_holy_to_yhwh, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: Priests must be holy to YHWH.').

command_requirement(priests_must_be_holy_to_yhwh, 'Priests').

% Command: ordinary_priests_must_not_become_unclean_for_the_dead_except_close_relatives
command(ordinary_priests_must_not_become_unclean_for_the_dead_except_close_relatives).
command_title(ordinary_priests_must_not_become_unclean_for_the_dead_except_close_relatives, 'Leviticus 21:1-4 - Ordinary priests must not become unclean for the dead except close relatives.').
normal_obedience(ordinary_priests_must_not_become_unclean_for_the_dead_except_close_relatives, 'Ordinary priests must not become unclean for the dead except close relatives.').
concerns(ordinary_priests_must_not_become_unclean_for_the_dead_except_close_relatives, priestly_holiness).
scripture_reference(ordinary_priests_must_not_become_unclean_for_the_dead_except_close_relatives, 'Leviticus 21:1-4').
source_term(ordinary_priests_must_not_become_unclean_for_the_dead_except_close_relatives, hebrew, tame, 'to become unclean; ordinary priests have restricted corpse impurity contact').
source_term(ordinary_priests_must_not_become_unclean_for_the_dead_except_close_relatives, hebrew, nefesh, 'person or dead body in this context; the corpse-related impurity object').
source_term(ordinary_priests_must_not_become_unclean_for_the_dead_except_close_relatives, hebrew, sheer, 'close flesh-relative; the exception category for ordinary priests').
study_note(ordinary_priests_must_not_become_unclean_for_the_dead_except_close_relatives, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: Ordinary priests must not become unclean for the dead except close relatives.').
command_requirement(ordinary_priests_must_not_become_unclean_for_the_dead_except_close_relatives, 'Priests').

% Command: priests_must_not_marry_a_prostitute_profaned_woman_or_divorced_woman
command(priests_must_not_marry_a_prostitute_profaned_woman_or_divorced_woman).
command_title(priests_must_not_marry_a_prostitute_profaned_woman_or_divorced_woman, 'Leviticus 21:7 - Priests must not marry a prostitute, profaned woman, or divorced woman.').
normal_obedience(priests_must_not_marry_a_prostitute_profaned_woman_or_divorced_woman, 'Priests must not marry a prostitute, profaned woman, or divorced woman.').
concerns(priests_must_not_marry_a_prostitute_profaned_woman_or_divorced_woman, priestly_holiness).
scripture_reference(priests_must_not_marry_a_prostitute_profaned_woman_or_divorced_woman, 'Leviticus 21:7').
source_term(priests_must_not_marry_a_prostitute_profaned_woman_or_divorced_woman, hebrew, zonah, 'prostitute or sexually immoral woman; one forbidden as a priestly wife').
source_term(priests_must_not_marry_a_prostitute_profaned_woman_or_divorced_woman, hebrew, chalalah, 'profaned woman; one forbidden as a priestly wife').
source_term(priests_must_not_marry_a_prostitute_profaned_woman_or_divorced_woman, hebrew, gerushah, 'divorced woman; one forbidden as a priestly wife').
study_note(priests_must_not_marry_a_prostitute_profaned_woman_or_divorced_woman, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: Priests must not marry a prostitute, profaned woman, or divorced woman.').

command_requirement(priests_must_not_marry_a_prostitute_profaned_woman_or_divorced_woman, 'Priests').

% Command: the_high_priest_must_not_become_unclean_even_for_father_or_mother
command(the_high_priest_must_not_become_unclean_even_for_father_or_mother).
command_title(the_high_priest_must_not_become_unclean_even_for_father_or_mother, 'Leviticus 21:11 - The high priest must not become unclean even for father or mother.').
normal_obedience(the_high_priest_must_not_become_unclean_even_for_father_or_mother, 'The high priest must not become unclean even for father or mother.').
concerns(the_high_priest_must_not_become_unclean_even_for_father_or_mother, priestly_holiness).
scripture_reference(the_high_priest_must_not_become_unclean_even_for_father_or_mother, 'Leviticus 21:11').
source_term(the_high_priest_must_not_become_unclean_even_for_father_or_mother, hebrew, kohen_gadol, 'high priest or great priest; the stricter priestly role in view').
source_term(the_high_priest_must_not_become_unclean_even_for_father_or_mother, hebrew, tame, 'to become unclean; the high priest must not incur corpse impurity even for parents').
study_note(the_high_priest_must_not_become_unclean_even_for_father_or_mother, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: The high priest must not become unclean even for father or mother.').

command_requirement(the_high_priest_must_not_become_unclean_even_for_father_or_mother, 'High Priest').

% Command: the_high_priest_must_not_leave_the_sanctuary_in_the_stated_case
command(the_high_priest_must_not_leave_the_sanctuary_in_the_stated_case).
command_title(the_high_priest_must_not_leave_the_sanctuary_in_the_stated_case, 'Leviticus 21:12 - The high priest must not leave the sanctuary in the stated case.').
normal_obedience(the_high_priest_must_not_leave_the_sanctuary_in_the_stated_case, 'The high priest must not leave the sanctuary in the stated case.').
concerns(the_high_priest_must_not_leave_the_sanctuary_in_the_stated_case, priestly_holiness).
scripture_reference(the_high_priest_must_not_leave_the_sanctuary_in_the_stated_case, 'Leviticus 21:12').
source_term(the_high_priest_must_not_leave_the_sanctuary_in_the_stated_case, hebrew, miqdash, 'sanctuary; the place the high priest must not leave in the stated case').
source_term(the_high_priest_must_not_leave_the_sanctuary_in_the_stated_case, hebrew, nezer, 'consecration or crown; the anointing consecration of his God is upon him').
study_note(the_high_priest_must_not_leave_the_sanctuary_in_the_stated_case, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: The high priest must not leave the sanctuary in the stated case.').

command_requirement(the_high_priest_must_not_leave_the_sanctuary_in_the_stated_case, 'High Priest').

% Command: the_high_priest_must_marry_a_virgin_of_his_people
command(the_high_priest_must_marry_a_virgin_of_his_people).
command_title(the_high_priest_must_marry_a_virgin_of_his_people, 'Leviticus 21:13-14 - The high priest must marry a virgin of his people.').
normal_obedience(the_high_priest_must_marry_a_virgin_of_his_people, 'The high priest must marry a virgin of his people.').
concerns(the_high_priest_must_marry_a_virgin_of_his_people, priestly_holiness).
scripture_reference(the_high_priest_must_marry_a_virgin_of_his_people, 'Leviticus 21:13-14').
source_term(the_high_priest_must_marry_a_virgin_of_his_people, hebrew, betulah, 'virgin; the required wife category for the high priest').
source_term(the_high_priest_must_marry_a_virgin_of_his_people, hebrew, am, 'people; the wife is from his own people').
study_note(the_high_priest_must_marry_a_virgin_of_his_people, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: The high priest must marry a virgin of his people.').

command_requirement(the_high_priest_must_marry_a_virgin_of_his_people, 'High Priest').

% Command: a_priest_with_listed_defect_must_not_approach_to_offer_bread
command(a_priest_with_listed_defect_must_not_approach_to_offer_bread).
command_title(a_priest_with_listed_defect_must_not_approach_to_offer_bread, 'Leviticus 21:16-23 - A priest with listed defect must not approach to offer bread.').
normal_obedience(a_priest_with_listed_defect_must_not_approach_to_offer_bread, 'A priest with listed defect must not approach to offer bread.').
concerns(a_priest_with_listed_defect_must_not_approach_to_offer_bread, priestly_holiness).
scripture_reference(a_priest_with_listed_defect_must_not_approach_to_offer_bread, 'Leviticus 21:16-23').
source_term(a_priest_with_listed_defect_must_not_approach_to_offer_bread, hebrew, mum, 'blemish or physical defect; a listed defect restricts altar approach').
source_term(a_priest_with_listed_defect_must_not_approach_to_offer_bread, hebrew, qarab, 'to approach or draw near; the restricted action for a blemished priest').
source_term(a_priest_with_listed_defect_must_not_approach_to_offer_bread, hebrew, lechem_elohim, 'bread/food of God; the offering service the priest with defect must not approach to present').
study_note(a_priest_with_listed_defect_must_not_approach_to_offer_bread, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: A priest with listed defect must not approach to offer bread.').

command_requirement(a_priest_with_listed_defect_must_not_approach_to_offer_bread, 'Priests').

% Command: priests_who_are_unclean_must_not_eat_holy_things
command(priests_who_are_unclean_must_not_eat_holy_things).
command_title(priests_who_are_unclean_must_not_eat_holy_things, 'Leviticus 22:1-9 - Priests who are unclean must not eat holy things.').
normal_obedience(priests_who_are_unclean_must_not_eat_holy_things, 'Priests who are unclean must not eat holy things.').
concerns(priests_who_are_unclean_must_not_eat_holy_things, priestly_holiness).
scripture_reference(priests_who_are_unclean_must_not_eat_holy_things, 'Leviticus 22:1-9').
source_term(priests_who_are_unclean_must_not_eat_holy_things, hebrew, tame, 'unclean; the priestly state that bars eating holy things').
source_term(priests_who_are_unclean_must_not_eat_holy_things, hebrew, qodesh, 'holy thing; the consecrated food the unclean priest must not eat').
study_note(priests_who_are_unclean_must_not_eat_holy_things, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: Priests who are unclean must not eat holy things.').

command_requirement(priests_who_are_unclean_must_not_eat_holy_things, 'Priests').

% Command: no_layperson_may_eat_holy_food
command(no_layperson_may_eat_holy_food).
command_title(no_layperson_may_eat_holy_food, 'Leviticus 22:10 - No layperson may eat holy food.').
normal_obedience(no_layperson_may_eat_holy_food, 'No layperson may eat holy food.').
concerns(no_layperson_may_eat_holy_food, priestly_holiness).
scripture_reference(no_layperson_may_eat_holy_food, 'Leviticus 22:10').
source_term(no_layperson_may_eat_holy_food, hebrew, zar, 'stranger, outsider, or layperson; one outside the priestly household boundary').
source_term(no_layperson_may_eat_holy_food, hebrew, qodesh, 'holy food or holy thing reserved by Torah').
study_note(no_layperson_may_eat_holy_food, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: No layperson may eat holy food.').

% Command: a_priest_s_purchased_servant_may_eat_holy_food
command(a_priest_s_purchased_servant_may_eat_holy_food).
command_title(a_priest_s_purchased_servant_may_eat_holy_food, 'Leviticus 22:11 - A priest''s purchased servant may eat holy food.').
normal_obedience(a_priest_s_purchased_servant_may_eat_holy_food, 'A priest''s purchased servant may eat holy food.').
concerns(a_priest_s_purchased_servant_may_eat_holy_food, priestly_holiness).
scripture_reference(a_priest_s_purchased_servant_may_eat_holy_food, 'Leviticus 22:11').
source_term(a_priest_s_purchased_servant_may_eat_holy_food, hebrew, qinyan_kesef, 'purchase of silver or purchased person; the servant included in the priestly household food boundary').
source_term(a_priest_s_purchased_servant_may_eat_holy_food, hebrew, nephesh, 'person; the purchased household person who may eat').
study_note(a_priest_s_purchased_servant_may_eat_holy_food, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: A priest''s purchased servant may eat holy food.').

% Command: a_priest_s_daughter_married_to_a_layman_may_not_eat_holy_food
command(a_priest_s_daughter_married_to_a_layman_may_not_eat_holy_food).
command_title(a_priest_s_daughter_married_to_a_layman_may_not_eat_holy_food, 'Leviticus 22:12 - A priest''s daughter married to a layman may not eat holy food.').
normal_obedience(a_priest_s_daughter_married_to_a_layman_may_not_eat_holy_food, 'A priest''s daughter married to a layman may not eat holy food.').
concerns(a_priest_s_daughter_married_to_a_layman_may_not_eat_holy_food, priestly_holiness).
scripture_reference(a_priest_s_daughter_married_to_a_layman_may_not_eat_holy_food, 'Leviticus 22:12').
source_term(a_priest_s_daughter_married_to_a_layman_may_not_eat_holy_food, hebrew, bath_kohen, 'daughter of a priest; the person whose food access changes by marriage').
source_term(a_priest_s_daughter_married_to_a_layman_may_not_eat_holy_food, hebrew, ish_zar, 'layman or outsider man; the husband outside the priestly household boundary').
study_note(a_priest_s_daughter_married_to_a_layman_may_not_eat_holy_food, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: A priest''s daughter married to a layman may not eat holy food.').

% Command: a_widowed_or_divorced_priest_s_daughter_returned_childless_to_her_father_s_hou
command(a_widowed_or_divorced_priest_s_daughter_returned_childless_to_her_father_s_hou).
command_title(a_widowed_or_divorced_priest_s_daughter_returned_childless_to_her_father_s_hou, 'Leviticus 22:13 - A widowed or divorced priest''s daughter returned childless to her father''s house may eat her father''s food.').
normal_obedience(a_widowed_or_divorced_priest_s_daughter_returned_childless_to_her_father_s_hou, 'A widowed or divorced priest''s daughter returned childless to her father''s house may eat her father''s food.').
concerns(a_widowed_or_divorced_priest_s_daughter_returned_childless_to_her_father_s_hou, priestly_holiness).
scripture_reference(a_widowed_or_divorced_priest_s_daughter_returned_childless_to_her_father_s_hou, 'Leviticus 22:13').
source_term(a_widowed_or_divorced_priest_s_daughter_returned_childless_to_her_father_s_hou, hebrew, almanah, 'widow; one return condition named for the priest''s daughter').
source_term(a_widowed_or_divorced_priest_s_daughter_returned_childless_to_her_father_s_hou, hebrew, gerushah, 'divorced woman; one return condition named for the priest''s daughter').
source_term(a_widowed_or_divorced_priest_s_daughter_returned_childless_to_her_father_s_hou, hebrew, zera, 'seed or offspring; the verse specifies she returns without offspring').
study_note(a_widowed_or_divorced_priest_s_daughter_returned_childless_to_her_father_s_hou, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: A widowed or divorced priest''s daughter returned childless to her father''s house may eat her father''s food.').

% Command: one_who_eats_holy_food_unintentionally_must_add_a_fifth_and_give_it_to_the_pri
command(one_who_eats_holy_food_unintentionally_must_add_a_fifth_and_give_it_to_the_pri).
command_title(one_who_eats_holy_food_unintentionally_must_add_a_fifth_and_give_it_to_the_pri, 'Leviticus 22:14 - One who eats holy food unintentionally must add a fifth and give it to the priest.').
normal_obedience(one_who_eats_holy_food_unintentionally_must_add_a_fifth_and_give_it_to_the_pri, 'One who eats holy food unintentionally must add a fifth and give it to the priest.').
concerns(one_who_eats_holy_food_unintentionally_must_add_a_fifth_and_give_it_to_the_pri, priestly_holiness).
scripture_reference(one_who_eats_holy_food_unintentionally_must_add_a_fifth_and_give_it_to_the_pri, 'Leviticus 22:14').
source_term(one_who_eats_holy_food_unintentionally_must_add_a_fifth_and_give_it_to_the_pri, hebrew, shegagah, 'unintentional error; the context for mistakenly eating holy food').
source_term(one_who_eats_holy_food_unintentionally_must_add_a_fifth_and_give_it_to_the_pri, hebrew, chamishit, 'fifth part added in restitution').
study_note(one_who_eats_holy_food_unintentionally_must_add_a_fifth_and_give_it_to_the_pri, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: One who eats holy food unintentionally must add a fifth and give it to the priest.').

% Command: levites_guard_the_tabernacle_service
command(levites_guard_the_tabernacle_service).
command_title(levites_guard_the_tabernacle_service, 'Numbers 18 - Levites guard the tabernacle service.').
normal_obedience(levites_guard_the_tabernacle_service, 'Levites guard the tabernacle service.').
concerns(levites_guard_the_tabernacle_service, priestly_holiness).
scripture_reference(levites_guard_the_tabernacle_service, 'Numbers 18').
source_term(levites_guard_the_tabernacle_service, hebrew, shamar, 'to guard, keep, or watch; Levites guard tabernacle service').
source_term(levites_guard_the_tabernacle_service, hebrew, avodah, 'service or work; the Levitical work of the tent').
study_note(levites_guard_the_tabernacle_service, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: Levites guard the tabernacle service.').

command_requirement(levites_guard_the_tabernacle_service, 'Levites').

% Command: priests_guard_priesthood_service_and_altar_service
command(priests_guard_priesthood_service_and_altar_service).
command_title(priests_guard_priesthood_service_and_altar_service, 'Numbers 18:5-7 - Priests guard priesthood service and altar service.').
normal_obedience(priests_guard_priesthood_service_and_altar_service, 'Priests guard priesthood service and altar service.').
concerns(priests_guard_priesthood_service_and_altar_service, priestly_holiness).
scripture_reference(priests_guard_priesthood_service_and_altar_service, 'Numbers 18:5-7').
source_term(priests_guard_priesthood_service_and_altar_service, hebrew, mishmereth, 'guard duty, charge, or responsibility; the priestly service is guarded').
source_term(priests_guard_priesthood_service_and_altar_service, hebrew, kehunah, 'priesthood or priestly office; the service guarded by priests').
source_term(priests_guard_priesthood_service_and_altar_service, hebrew, mizbeach, 'altar; one of the priestly service boundaries').
study_note(priests_guard_priesthood_service_and_altar_service, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: Priests guard priesthood service and altar service.').

command_requirement(priests_guard_priesthood_service_and_altar_service, 'Priests').

% Command: levites_receive_the_tithe_for_their_service
command(levites_receive_the_tithe_for_their_service).
command_title(levites_receive_the_tithe_for_their_service, 'Numbers 18:21-24 - Levites receive the tithe for their service.').
normal_obedience(levites_receive_the_tithe_for_their_service, 'Levites receive the tithe for their service.').
concerns(levites_receive_the_tithe_for_their_service, priestly_holiness).
scripture_reference(levites_receive_the_tithe_for_their_service, 'Numbers 18:21-24').
source_term(levites_receive_the_tithe_for_their_service, hebrew, maaser, 'tithe or tenth portion received by Levites for their service').
source_term(levites_receive_the_tithe_for_their_service, hebrew, cheleq, 'portion or share; the tithe functions as the Levites'' portion').
study_note(levites_receive_the_tithe_for_their_service, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: Levites receive the tithe for their service.').

story_reference(levites_receive_the_tithe_for_their_service, 'Hebrews 7:5', 'The author states that the sons of Levi who receive the priesthood have a commandment in the Law to take tithes from the people.').

command_requirement(levites_receive_the_tithe_for_their_service, 'Levites').

% Command: levites_give_a_tithe_from_the_tithe
command(levites_give_a_tithe_from_the_tithe).
command_title(levites_give_a_tithe_from_the_tithe, 'Numbers 18:26-32 - Levites give a tithe from the tithe.').
normal_obedience(levites_give_a_tithe_from_the_tithe, 'Levites give a tithe from the tithe.').
concerns(levites_give_a_tithe_from_the_tithe, priestly_holiness).
scripture_reference(levites_give_a_tithe_from_the_tithe, 'Numbers 18:26-32').
source_term(levites_give_a_tithe_from_the_tithe, hebrew, maaser_min_hamaaser, 'tithe from the tithe; the portion Levites give from what they receive').
source_term(levites_give_a_tithe_from_the_tithe, hebrew, terumah, 'contribution or offering lifted up; the Levites give YHWH''s contribution from the tithe').
study_note(levites_give_a_tithe_from_the_tithe, 'This command belongs to priestly and sanctuary service, where access, offerings, portions, and holiness are ordered by Torah: Levites give a tithe from the tithe.').

command_requirement(levites_give_a_tithe_from_the_tithe, 'Levites').

% -----------------------------------------------------------------------------
% Source Term Supplements For Priestly And Sanctuary Commands
% -----------------------------------------------------------------------------

source_term(priests_keep_holy_status, hebrew, qadosh, 'holy, set apart').
source_term(priests_keep_holy_status, hebrew, kohen, 'priest').
source_term(priests_keep_holy_status, hebrew, lechem_elohim, 'bread/food of God; priestly offering service context').

source_term(high_priest_keep_special_holiness, hebrew, kohen_gadol, 'high priest, great priest').
source_term(high_priest_keep_special_holiness, hebrew, nezer, 'consecration, crown, sign of dedication').
source_term(high_priest_keep_special_holiness, hebrew, qodesh, 'holiness, holy thing/place').

source_term(priests_do_not_serve_with_defect, hebrew, mum, 'blemish, defect').
source_term(priests_do_not_serve_with_defect, hebrew, qarab, 'approach, draw near for service').
source_term(priests_do_not_serve_with_defect, hebrew, lechem_elohim, 'bread/food of God; priestly offering service context').

source_term(priests_do_not_eat_holy_things_while_unclean, hebrew, tame, 'unclean').
source_term(priests_do_not_eat_holy_things_while_unclean, hebrew, qodesh, 'holy thing').
source_term(priests_do_not_eat_holy_things_while_unclean, hebrew, nephesh, 'person, life').

source_term(offer_unblemished_animals, hebrew, tamim, 'whole, complete, without blemish').
source_term(offer_unblemished_animals, hebrew, mum, 'blemish, defect').
source_term(offer_unblemished_animals, hebrew, ratson, 'acceptance, favor').

source_term(guard_sanctuary_duties, hebrew, shamar, 'guard, keep, watch').
source_term(guard_sanctuary_duties, hebrew, mishmereth, 'guard duty, charge, responsibility').
source_term(guard_sanctuary_duties, hebrew, miqdash, 'sanctuary').

source_term(give_priestly_portions, hebrew, mattanah, 'gift, assigned portion').
source_term(give_priestly_portions, hebrew, terumah, 'contribution, lifted offering').
source_term(give_priestly_portions, hebrew, kohen, 'priest').

source_term(levites_receive_tithe, hebrew, levi, 'Levite').
source_term(levites_receive_tithe, hebrew, maaser, 'tithe, tenth portion').
source_term(levites_receive_tithe, hebrew, avodah, 'service, work').

source_term(build_the_sanctuary_according_to_the_pattern_shown, hebrew, mishkan, 'tabernacle, dwelling place').
source_term(build_the_sanctuary_according_to_the_pattern_shown, hebrew, tavnith, 'pattern, model shown').
source_term(build_the_sanctuary_according_to_the_pattern_shown, hebrew, miqdash, 'sanctuary').

source_term(make_the_ark_according_to_torah_instructions, hebrew, aron, 'ark, chest').
source_term(make_the_ark_according_to_torah_instructions, hebrew, eduth, 'testimony').
source_term(make_the_ark_according_to_torah_instructions, hebrew, kapporeth, 'atonement cover, mercy seat').

source_term(make_the_table_lampstand_altar_curtains_and_court_according_to_the_pattern, hebrew, shulchan, 'table').
source_term(make_the_table_lampstand_altar_curtains_and_court_according_to_the_pattern, hebrew, menorah, 'lampstand').
source_term(make_the_table_lampstand_altar_curtains_and_court_according_to_the_pattern, hebrew, mizbeach, 'altar').

source_term(keep_the_lamp_burning_with_pure_beaten_olive_oil, hebrew, ner, 'lamp').
source_term(keep_the_lamp_burning_with_pure_beaten_olive_oil, hebrew, shemen_zayith_zakh, 'pure olive oil').
source_term(keep_the_lamp_burning_with_pure_beaten_olive_oil, hebrew, tamid, 'continual, regular').

source_term(make_priestly_garments_for_glory_and_beauty, hebrew, bigde_qodesh, 'holy garments').
source_term(make_priestly_garments_for_glory_and_beauty, hebrew, kavod, 'glory, honor').
source_term(make_priestly_garments_for_glory_and_beauty, hebrew, tipharah, 'beauty, splendor').

source_term(consecrate_aaron_and_his_sons_according_to_torah, hebrew, qadash, 'consecrate, make holy').
source_term(consecrate_aaron_and_his_sons_according_to_torah, hebrew, male_yad, 'fill the hand; ordination idiom').
source_term(consecrate_aaron_and_his_sons_according_to_torah, hebrew, kohen, 'priest').

source_term(offer_the_daily_continual_offering_morning_and_evening, hebrew, olat_tamid, 'continual burnt offering').
source_term(offer_the_daily_continual_offering_morning_and_evening, hebrew, boqer, 'morning').
source_term(offer_the_daily_continual_offering_morning_and_evening, hebrew, ereb, 'evening').

source_term(make_the_incense_altar, hebrew, mizbach_qetoreth, 'incense altar').
source_term(make_the_incense_altar, hebrew, zahav, 'gold').
source_term(make_the_incense_altar, hebrew, qatar, 'burn incense, make smoke').

source_term(do_not_offer_strange_incense_on_the_incense_altar, hebrew, qetoreth_zarah, 'strange or unauthorized incense').
source_term(do_not_offer_strange_incense_on_the_incense_altar, hebrew, zar, 'strange, unauthorized, outside').

source_term(do_not_offer_burnt_offering_or_grain_offering_on_the_incense_altar, hebrew, olah, 'burnt offering').
source_term(do_not_offer_burnt_offering_or_grain_offering_on_the_incense_altar, hebrew, minchah, 'grain offering').
source_term(do_not_offer_burnt_offering_or_grain_offering_on_the_incense_altar, hebrew, nesek, 'drink offering').

source_term(make_the_bronze_laver_for_washing, hebrew, kiyyor, 'laver, basin').
source_term(make_the_bronze_laver_for_washing, hebrew, nechosheth, 'bronze, copper').
source_term(make_the_bronze_laver_for_washing, hebrew, rachats, 'wash, bathe').

source_term(priests_must_wash_hands_and_feet_before_service, hebrew, rachats, 'wash').
source_term(priests_must_wash_hands_and_feet_before_service, hebrew, yad_regel, 'hands and feet').
source_term(priests_must_wash_hands_and_feet_before_service, hebrew, ohel_moed, 'tent of meeting').

source_term(make_the_anointing_oil_according_to_torah, hebrew, shemen_mishchah, 'anointing oil').
source_term(make_the_anointing_oil_according_to_torah, hebrew, rokeach, 'perfumer, compounder').
source_term(make_the_anointing_oil_according_to_torah, hebrew, qodesh, 'holy, set apart').
