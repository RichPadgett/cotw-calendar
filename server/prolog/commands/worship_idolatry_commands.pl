% =============================================================================
% Command Group: Worship And Idolatry
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

% Command: have_no_other_gods
command(have_no_other_gods).
command_title(have_no_other_gods, 'Exo 20:3 - Have no other gods before YHWH.').
normal_obedience(have_no_other_gods, 'Worship YHWH alone and do not place another god before Him.').
concerns(have_no_other_gods, exclusive_worship).
scripture_reference(have_no_other_gods, 'Exodus 20:3').
scripture_reference(have_no_other_gods, 'Deuteronomy 5:7').
story_reference(have_no_other_gods, 'Joshua 24:14-24', 'Joshua calls Israel to put away other gods and serve YHWH alone.').
story_reference(have_no_other_gods, '1 Kings 18:21-39', 'Elijah confronts divided worship and the people confess that YHWH is Elohim.').
source_term(have_no_other_gods, hebrew, elohim_acherim, 'other gods; the command forbids placing other gods before YHWH').
source_term(have_no_other_gods, hebrew, panim, 'face or presence; the phrase before My face/presence frames exclusive covenant loyalty').
study_note(have_no_other_gods, 'This is a foundation command for covenant loyalty and exclusive worship.').

% Command: do_not_make_idols
command(do_not_make_idols).
command_title(do_not_make_idols, 'Exo 20:4-6 - Do not make idols.').
normal_obedience(do_not_make_idols, 'Do not make carved images for worship or bow down to them.').
concerns(do_not_make_idols, reject_idolatry).
scripture_reference(do_not_make_idols, 'Exodus 20:4-6').
scripture_reference(do_not_make_idols, 'Deuteronomy 5:8-10').
story_reference(do_not_make_idols, 'Exodus 32:1-35', 'The golden calf shows a grave violation of image-making for worship.').
story_reference(do_not_make_idols, '2 Kings 23:4-15', 'Josiah removes and destroys idolatrous objects from worship places.').
source_term(do_not_make_idols, hebrew, pesel, 'carved image or idol made for worship').
source_term(do_not_make_idols, hebrew, temunah, 'form, likeness, or representation; the image category named in the command').
study_note(do_not_make_idols, 'The command guards worship from being redirected through images.').

non_canonical_story_reference(do_not_make_idols, 'Letter of Jeremiah 1:8-16', 'The Letter of Jeremiah argues at length that idols of wood, stone, and precious metal are powerless, cannot speak, move, or protect themselves, and therefore should not be feared or worshiped.').

% Command: do_not_worship_like_nations
command(do_not_worship_like_nations).
command_title(do_not_worship_like_nations, 'Deu 12:29-32 - Do not worship like the nations.').
normal_obedience(do_not_worship_like_nations, 'Do not copy the nations'' worship practices for serving YHWH.').
concerns(do_not_worship_like_nations, reject_idolatry).
scripture_reference(do_not_worship_like_nations, 'Deuteronomy 12:29-32').
story_reference(do_not_worship_like_nations, '2 Kings 17:7-18', 'Israel is judged for walking in the customs of the nations and serving idols.').
story_reference(do_not_worship_like_nations, '2 Kings 21:1-9', 'Manasseh leads Judah into practices like the nations YHWH drove out.').
source_term(do_not_worship_like_nations, hebrew, darash, 'to seek, inquire, or investigate; Deuteronomy warns against inquiring into the nations'' worship').
source_term(do_not_worship_like_nations, hebrew, avad, 'to serve or worship; the command forbids serving YHWH by copied pagan forms').
study_note(do_not_worship_like_nations, 'Torah distinguishes YHWH''s worship from the practices of surrounding nations.').

% Command: destroy_idolatrous_places
command(destroy_idolatrous_places).
command_title(destroy_idolatrous_places, 'Deu 12:2-3 - Destroy idolatrous places.').
normal_obedience(destroy_idolatrous_places, 'Destroy the places and objects of idolatrous worship in the land.').
concerns(destroy_idolatrous_places, reject_idolatry).
scripture_reference(destroy_idolatrous_places, 'Deuteronomy 12:2-3').
story_reference(destroy_idolatrous_places, '2 Kings 18:4', 'Hezekiah removes high places, breaks pillars, cuts down the Asherah, and destroys the bronze serpent.').
story_reference(destroy_idolatrous_places, '2 Kings 23:4-15', 'Josiah destroys idolatrous places and objects throughout his reforms.').
story_reference(destroy_idolatrous_places, '2 Chronicles 34:3-7', 'Josiah purges Judah and Jerusalem of high places, Asherim, carved images, and molten images.').
source_term(destroy_idolatrous_places, hebrew, abad, 'to destroy or cause to perish; the places and objects of idolatry are to be destroyed').
source_term(destroy_idolatrous_places, hebrew, bamah, 'high place, a common site of illicit or idolatrous worship').
source_term(destroy_idolatrous_places, hebrew, asherah, 'Asherah pole or cult object associated with idolatrous worship').
study_note(destroy_idolatrous_places, 'This land-context command removes public infrastructure for idolatry.').

% Command: do_not_listen_to_false_prophet_idolatry
command(do_not_listen_to_false_prophet_idolatry).
command_title(do_not_listen_to_false_prophet_idolatry, 'Deu 13:1-5 - Do not listen to idolatrous false prophets.').
normal_obedience(do_not_listen_to_false_prophet_idolatry, 'Do not follow a prophet or dreamer who leads people after other gods.').
concerns(do_not_listen_to_false_prophet_idolatry, reject_idolatry).
scripture_reference(do_not_listen_to_false_prophet_idolatry, 'Deuteronomy 13:1-5').
story_reference(do_not_listen_to_false_prophet_idolatry, '1 Kings 18:19-40', 'Elijah exposes the prophets of Baal and turns Israel back to YHWH.').
story_reference(do_not_listen_to_false_prophet_idolatry, 'Jeremiah 28:10-17', 'Hananiah falsely prophesies and Jeremiah exposes the false word.').
source_term(do_not_listen_to_false_prophet_idolatry, hebrew, navi, 'prophet; the warned figure may claim prophetic authority while leading toward other gods').
source_term(do_not_listen_to_false_prophet_idolatry, hebrew, chalom, 'dream; Deuteronomy includes a dreamer as a possible false sign-giver').
source_term(do_not_listen_to_false_prophet_idolatry, hebrew, oth, 'sign; even a sign does not authorize following other gods').
study_note(do_not_listen_to_false_prophet_idolatry, 'Signs do not authorize turning away from YHWH.').

% Command: do_not_make_covenant_with_idolatry
command(do_not_make_covenant_with_idolatry).
command_title(do_not_make_covenant_with_idolatry, 'Exo 23:32-33 - Do not covenant with idolatry.').
normal_obedience(do_not_make_covenant_with_idolatry, 'Do not make a covenant with idolatrous peoples or their gods.').
concerns(do_not_make_covenant_with_idolatry, reject_idolatry).
scripture_reference(do_not_make_covenant_with_idolatry, 'Exodus 23:32-33').
scripture_reference(do_not_make_covenant_with_idolatry, 'Deuteronomy 7:1-5').
story_reference(do_not_make_covenant_with_idolatry, 'Joshua 9:14-16', 'Israel makes a covenant with the Gibeonites without asking counsel from YHWH.').
story_reference(do_not_make_covenant_with_idolatry, 'Judges 2:1-3', 'YHWH rebukes Israel for not tearing down the altars of the land and warns of a snare.').
source_term(do_not_make_covenant_with_idolatry, hebrew, berith, 'covenant; the forbidden treaty relationship that would create idolatrous entanglement').
source_term(do_not_make_covenant_with_idolatry, hebrew, moqesh, 'snare or trap; Exodus warns that idolatrous presence will become a snare').
study_note(do_not_make_covenant_with_idolatry, 'The command protects Israel from being drawn into idolatry.').

% Command: do_not_practice_divination
command(do_not_practice_divination).
command_title(do_not_practice_divination, 'Deu 18:9-14 - Do not practice divination.').
normal_obedience(do_not_practice_divination, 'Do not practice divination, sorcery, omens, witchcraft, or necromancy.').
concerns(do_not_practice_divination, exclusive_worship).
scripture_reference(do_not_practice_divination, 'Deuteronomy 18:9-14').
story_reference(do_not_practice_divination, '1 Samuel 28:3-20', 'Saul consults a medium, showing a serious violation of this boundary.').
story_reference(do_not_practice_divination, '2 Kings 23:24', 'Josiah removes mediums, spiritists, household gods, idols, and abominations.').
source_term(do_not_practice_divination, hebrew, qesem, 'divination; seeking hidden knowledge or guidance through forbidden means').
source_term(do_not_practice_divination, hebrew, anan, 'to practice soothsaying, cloud-reading, or omen interpretation').
source_term(do_not_practice_divination, hebrew, kashaph, 'to practice sorcery or witchcraft').
study_note(do_not_practice_divination, 'Torah directs dependence away from occult practices and toward YHWH.').

non_canonical_story_reference(do_not_practice_divination, 'Jubilees 12:16-18', 'Abram, while observing the stars to predict the year''s rain, recognizes that all such astrological determination belongs to God alone and abandons the practice, turning instead to prayer.').

% Command: listen_to_prophet_like_moses
command(listen_to_prophet_like_moses).
command_title(listen_to_prophet_like_moses, 'Deu 18:15-19 - Listen to the prophet like Moses.').
normal_obedience(listen_to_prophet_like_moses, 'Listen to the prophet YHWH raises up according to His word.').
concerns(listen_to_prophet_like_moses, exclusive_worship).
scripture_reference(listen_to_prophet_like_moses, 'Deuteronomy 18:15-19').
source_term(listen_to_prophet_like_moses, hebrew, navi, 'prophet; the true prophet YHWH raises up for His people').
source_term(listen_to_prophet_like_moses, hebrew, shama, 'to hear, listen, or obey; the required response to YHWH''s true prophet').
study_note(listen_to_prophet_like_moses, 'This command frames true prophetic authority under YHWH.').

% -----------------------------------------------------------------------------
% Additional Worship And Idolatry Commands
% -----------------------------------------------------------------------------

% Command: do_not_make_gods_of_silver_or_gold_alongside_yhwh
command(do_not_make_gods_of_silver_or_gold_alongside_yhwh).
command_title(do_not_make_gods_of_silver_or_gold_alongside_yhwh, 'Exodus 20:23 - Do not make gods of silver or gold alongside YHWH.').
normal_obedience(do_not_make_gods_of_silver_or_gold_alongside_yhwh, 'Do not make gods of silver or gold alongside YHWH.').
concerns(do_not_make_gods_of_silver_or_gold_alongside_yhwh, reject_idolatry).
scripture_reference(do_not_make_gods_of_silver_or_gold_alongside_yhwh, 'Exodus 20:23').
story_reference(do_not_make_gods_of_silver_or_gold_alongside_yhwh, 'Exodus 32:1-8', 'Israel makes the golden calf and treats a metal image as part of worship after leaving Egypt.').
source_term(do_not_make_gods_of_silver_or_gold_alongside_yhwh, hebrew, kesef, 'silver; one of the named materials for forbidden gods').
source_term(do_not_make_gods_of_silver_or_gold_alongside_yhwh, hebrew, zahav, 'gold; one of the named materials for forbidden gods').
study_note(do_not_make_gods_of_silver_or_gold_alongside_yhwh, 'This command protects exclusive worship by removing practices, objects, covenants, and desires tied to idolatry: Do not make gods of silver or gold alongside YHWH.').

% Command: do_not_mention_the_names_of_other_gods
command(do_not_mention_the_names_of_other_gods).
command_title(do_not_mention_the_names_of_other_gods, 'Exodus 23:13 - Do not mention the names of other gods.').
normal_obedience(do_not_mention_the_names_of_other_gods, 'Do not mention the names of other gods.').
concerns(do_not_mention_the_names_of_other_gods, reject_idolatry).
scripture_reference(do_not_mention_the_names_of_other_gods, 'Exodus 23:13').
story_reference(do_not_mention_the_names_of_other_gods, 'Joshua 23:6-8', 'Joshua warns Israel not to mention, swear by, serve, or bow down to the gods of the nations.').
source_term(do_not_mention_the_names_of_other_gods, hebrew, zakar, 'to mention, remember, or invoke; here other gods'' names are not to be mentioned').
source_term(do_not_mention_the_names_of_other_gods, hebrew, shem, 'name; the named identity of other gods is the object of the warning').
study_note(do_not_mention_the_names_of_other_gods, 'This command protects exclusive worship by removing practices, objects, covenants, and desires tied to idolatry: Do not mention the names of other gods.').

% Command: do_not_cause_the_names_of_other_gods_to_be_heard_from_your_mouth
command(do_not_cause_the_names_of_other_gods_to_be_heard_from_your_mouth).
command_title(do_not_cause_the_names_of_other_gods_to_be_heard_from_your_mouth, 'Exodus 23:13 - Do not cause the names of other gods to be heard from your mouth.').
normal_obedience(do_not_cause_the_names_of_other_gods_to_be_heard_from_your_mouth, 'Do not cause the names of other gods to be heard from your mouth.').
concerns(do_not_cause_the_names_of_other_gods_to_be_heard_from_your_mouth, reject_idolatry).
scripture_reference(do_not_cause_the_names_of_other_gods_to_be_heard_from_your_mouth, 'Exodus 23:13').
story_reference(do_not_cause_the_names_of_other_gods_to_be_heard_from_your_mouth, 'Joshua 23:6-8', 'Joshua warns Israel not to cause allegiance to the gods of the nations through mention, oaths, service, or worship.').
source_term(do_not_cause_the_names_of_other_gods_to_be_heard_from_your_mouth, hebrew, shama, 'to hear or make heard; other gods'' names are not to be heard from the mouth').
source_term(do_not_cause_the_names_of_other_gods_to_be_heard_from_your_mouth, hebrew, peh, 'mouth; the command names speech as the boundary').
study_note(do_not_cause_the_names_of_other_gods_to_be_heard_from_your_mouth, 'This command protects exclusive worship by removing practices, objects, covenants, and desires tied to idolatry: Do not cause the names of other gods to be heard from your mouth.').
command_requirement(do_not_cause_the_names_of_other_gods_to_be_heard_from_your_mouth, 'Applicable in modern times').

% Command: do_not_bow_down_to_other_gods
command(do_not_bow_down_to_other_gods).
command_title(do_not_bow_down_to_other_gods, 'Exodus 20:5 - Do not bow down to other gods.').
normal_obedience(do_not_bow_down_to_other_gods, 'Do not bow down to other gods.').
concerns(do_not_bow_down_to_other_gods, reject_idolatry).
scripture_reference(do_not_bow_down_to_other_gods, 'Exodus 20:5').
scripture_reference(do_not_bow_down_to_other_gods, 'Deuteronomy 5:9').
story_reference(do_not_bow_down_to_other_gods, 'Daniel 3:12-18', 'Hananiah, Mishael, and Azariah refuse to bow to Nebuchadnezzar''s image.').
source_term(do_not_bow_down_to_other_gods, hebrew, shachah, 'to bow down, prostrate, or worship; the bodily worship action forbidden toward other gods').
study_note(do_not_bow_down_to_other_gods, 'This command protects exclusive worship by removing practices, objects, covenants, and desires tied to idolatry: Do not bow down to other gods.').

non_canonical_story_reference(do_not_bow_down_to_other_gods, 'Bel and the Dragon 1:1-22', 'Daniel proves to King Cyrus that the idol Bel does not eat the food offerings by exposing priests secretly consuming them, demonstrating the idol is lifeless and undeserving of worship.').

% Command: do_not_serve_other_gods
command(do_not_serve_other_gods).
command_title(do_not_serve_other_gods, 'Exodus 20:5 - Do not serve other gods.').
normal_obedience(do_not_serve_other_gods, 'Do not serve other gods.').
concerns(do_not_serve_other_gods, reject_idolatry).
scripture_reference(do_not_serve_other_gods, 'Exodus 20:5').
scripture_reference(do_not_serve_other_gods, 'Deuteronomy 5:9').
story_reference(do_not_serve_other_gods, 'Joshua 24:14-24', 'Joshua charges Israel to serve YHWH in sincerity and put away other gods.').
story_reference(do_not_serve_other_gods, '1 Kings 18:21', 'Elijah confronts Israel for wavering between YHWH and Baal.').
source_term(do_not_serve_other_gods, hebrew, avad, 'to serve, work for, or worship; the service belongs to YHWH, not other gods').
study_note(do_not_serve_other_gods, 'This command protects exclusive worship by removing practices, objects, covenants, and desires tied to idolatry: Do not serve other gods.').

% Command: do_not_make_a_molten_god
command(do_not_make_a_molten_god).
command_title(do_not_make_a_molten_god, 'Exodus 34:17 - Do not make a molten god.').
normal_obedience(do_not_make_a_molten_god, 'Do not make a molten god.').
concerns(do_not_make_a_molten_god, reject_idolatry).
scripture_reference(do_not_make_a_molten_god, 'Exodus 34:17').
story_reference(do_not_make_a_molten_god, 'Exodus 32:4', 'Aaron fashions the golden calf as a molten image.').
source_term(do_not_make_a_molten_god, hebrew, massekah, 'molten image or cast metal idol').
study_note(do_not_make_a_molten_god, 'This command protects exclusive worship by removing practices, objects, covenants, and desires tied to idolatry: Do not make a molten god.').

% Command: do_not_turn_to_idols
command(do_not_turn_to_idols).
command_title(do_not_turn_to_idols, 'Leviticus 19:4 - Do not turn to idols.').
normal_obedience(do_not_turn_to_idols, 'Do not turn to idols.').
concerns(do_not_turn_to_idols, reject_idolatry).
scripture_reference(do_not_turn_to_idols, 'Leviticus 19:4').
story_reference(do_not_turn_to_idols, '1 Samuel 7:3-4', 'Samuel calls Israel to put away foreign gods and serve YHWH only.').
source_term(do_not_turn_to_idols, hebrew, panah, 'to turn or face toward; the command forbids turning toward idols').
source_term(do_not_turn_to_idols, hebrew, elil, 'idol, worthless thing, or false god').
study_note(do_not_turn_to_idols, 'This command protects exclusive worship by removing practices, objects, covenants, and desires tied to idolatry: Do not turn to idols.').

% Command: do_not_make_idols_for_yourselves
command(do_not_make_idols_for_yourselves).
command_title(do_not_make_idols_for_yourselves, 'Leviticus 19:4 - Do not make idols for yourselves.').
normal_obedience(do_not_make_idols_for_yourselves, 'Do not make idols for yourselves.').
concerns(do_not_make_idols_for_yourselves, reject_idolatry).
scripture_reference(do_not_make_idols_for_yourselves, 'Leviticus 19:4').
story_reference(do_not_make_idols_for_yourselves, 'Exodus 32:1-8', 'Israel makes the golden calf and turns aside quickly from the commanded way.').
source_term(do_not_make_idols_for_yourselves, hebrew, elil, 'idol or worthless god; Leviticus 19:4 warns against making idols').
source_term(do_not_make_idols_for_yourselves, hebrew, asah, 'to make or do; the prohibited action is making idols for oneself').
study_note(do_not_make_idols_for_yourselves, 'This command protects exclusive worship by removing practices, objects, covenants, and desires tied to idolatry: Do not make idols for yourselves.').
clarification_note(do_not_make_idols_for_yourselves, 'Exodus 20:4 may relate to this verse in that we should not make any image of things in heaven above, earth below or waters under the earth. Since the preceding verse is about not having Gods before YHWH, An assumption is that these graven images are forbidden for worship.').

% Command: do_not_make_pillars_for_worship
command(do_not_make_pillars_for_worship).
command_title(do_not_make_pillars_for_worship, 'Deuteronomy 16:22 - Do not make pillars for worship.').
normal_obedience(do_not_make_pillars_for_worship, 'Do not make pillars for worship.').
concerns(do_not_make_pillars_for_worship, reject_idolatry).
scripture_reference(do_not_make_pillars_for_worship, 'Deuteronomy 16:22').
story_reference(do_not_make_pillars_for_worship, '2 Kings 18:4', 'Hezekiah removes high places and breaks the pillars during his reforms.').
story_reference(do_not_make_pillars_for_worship, '2 Kings 23:14', 'Josiah breaks pillars and cuts down Asherim in the places of idolatry.').
source_term(do_not_make_pillars_for_worship, hebrew, matstsebah, 'pillar or standing stone used in forbidden worship').
study_note(do_not_make_pillars_for_worship, 'This command protects exclusive worship by removing practices, objects, covenants, and desires tied to idolatry: Do not make pillars for worship.').

% Command: do_not_plant_an_asherah_beside_yhwh_s_altar
command(do_not_plant_an_asherah_beside_yhwh_s_altar).
command_title(do_not_plant_an_asherah_beside_yhwh_s_altar, 'Deuteronomy 16:21 - Do not plant an Asherah beside YHWH''s altar.').
normal_obedience(do_not_plant_an_asherah_beside_yhwh_s_altar, 'Do not plant an Asherah beside YHWH''s altar.').
concerns(do_not_plant_an_asherah_beside_yhwh_s_altar, reject_idolatry).
scripture_reference(do_not_plant_an_asherah_beside_yhwh_s_altar, 'Deuteronomy 16:21').
story_reference(do_not_plant_an_asherah_beside_yhwh_s_altar, '2 Kings 21:7', 'Manasseh sets the carved Asherah image in the house of YHWH, showing the violation.').
story_reference(do_not_plant_an_asherah_beside_yhwh_s_altar, '2 Kings 23:6', 'Josiah removes the Asherah from the house of YHWH.').
source_term(do_not_plant_an_asherah_beside_yhwh_s_altar, hebrew, nata, 'to plant; the command describes setting or planting an Asherah beside the altar').
source_term(do_not_plant_an_asherah_beside_yhwh_s_altar, hebrew, asherah, 'Asherah pole or cult object forbidden beside YHWH''s altar').
source_term(do_not_plant_an_asherah_beside_yhwh_s_altar, hebrew, mizbeach, 'altar; the holy altar boundary must not be mixed with an Asherah').
study_note(do_not_plant_an_asherah_beside_yhwh_s_altar, 'This command protects exclusive worship by removing practices, objects, covenants, and desires tied to idolatry: Do not plant an Asherah beside YHWH''s altar.').

% Command: do_not_set_up_a_sacred_stone_yhwh_hates
command(do_not_set_up_a_sacred_stone_yhwh_hates).
command_title(do_not_set_up_a_sacred_stone_yhwh_hates, 'Deuteronomy 16:22 - Do not set up a sacred stone YHWH hates.').
normal_obedience(do_not_set_up_a_sacred_stone_yhwh_hates, 'Do not set up a sacred stone YHWH hates.').
concerns(do_not_set_up_a_sacred_stone_yhwh_hates, reject_idolatry).
scripture_reference(do_not_set_up_a_sacred_stone_yhwh_hates, 'Deuteronomy 16:22').
story_reference(do_not_set_up_a_sacred_stone_yhwh_hates, '2 Kings 23:14', 'Josiah breaks the pillars connected with idolatrous worship during his reforms.').
source_term(do_not_set_up_a_sacred_stone_yhwh_hates, hebrew, qum, 'to set up or establish; the prohibited action is setting up a pillar').
source_term(do_not_set_up_a_sacred_stone_yhwh_hates, hebrew, matstsebah, 'pillar, standing stone, or sacred stone hated in this worship context').
study_note(do_not_set_up_a_sacred_stone_yhwh_hates, 'This command protects exclusive worship by removing practices, objects, covenants, and desires tied to idolatry: Do not set up a sacred stone YHWH hates.').

% Command: do_not_inquire_how_the_nations_served_their_gods_in_order_to_do_likewise
command(do_not_inquire_how_the_nations_served_their_gods_in_order_to_do_likewise).
command_title(do_not_inquire_how_the_nations_served_their_gods_in_order_to_do_likewise, 'Deuteronomy 12:30 - Do not inquire how the nations served their gods in order to do likewise.').
normal_obedience(do_not_inquire_how_the_nations_served_their_gods_in_order_to_do_likewise, 'Do not inquire how the nations served their gods in order to do likewise.').
concerns(do_not_inquire_how_the_nations_served_their_gods_in_order_to_do_likewise, reject_idolatry).
scripture_reference(do_not_inquire_how_the_nations_served_their_gods_in_order_to_do_likewise, 'Deuteronomy 12:30').
story_reference(do_not_inquire_how_the_nations_served_their_gods_in_order_to_do_likewise, '2 Kings 17:7-18', 'Israel walks in the customs of the nations and serves idols, bringing judgment.').
story_reference(do_not_inquire_how_the_nations_served_their_gods_in_order_to_do_likewise, '2 Kings 21:1-9', 'Manasseh leads Judah into practices like the nations YHWH drove out.').
source_term(do_not_inquire_how_the_nations_served_their_gods_in_order_to_do_likewise, hebrew, darash, 'to inquire, seek, or investigate; here inquiry aimed at copying pagan worship').
source_term(do_not_inquire_how_the_nations_served_their_gods_in_order_to_do_likewise, hebrew, goyim, 'nations; the surrounding peoples whose worship practices must not be copied').
study_note(do_not_inquire_how_the_nations_served_their_gods_in_order_to_do_likewise, 'This command protects exclusive worship by removing practices, objects, covenants, and desires tied to idolatry: Do not inquire how the nations served their gods in order to do likewise.').

% Command: do_not_add_to_yhwh_s_commands
command(do_not_add_to_yhwh_s_commands).
command_title(do_not_add_to_yhwh_s_commands, 'Deuteronomy 4:2 - Do not add to YHWH''s commands.').
normal_obedience(do_not_add_to_yhwh_s_commands, 'Do not add to YHWH''s commands.').
concerns(do_not_add_to_yhwh_s_commands, reject_idolatry).
scripture_reference(do_not_add_to_yhwh_s_commands, 'Deuteronomy 4:2').
scripture_reference(do_not_add_to_yhwh_s_commands, 'Deuteronomy 12:32').
story_reference(do_not_add_to_yhwh_s_commands, '1 Kings 12:25-33', 'Jeroboam makes calves, appoints non-Levitical priests, and devises a feast from his own heart.').
source_term(do_not_add_to_yhwh_s_commands, hebrew, yasaph, 'to add or increase; the command forbids adding to YHWH''s word').
source_term(do_not_add_to_yhwh_s_commands, hebrew, dabar, 'word, matter, or command; what must not be added to or diminished').
study_note(do_not_add_to_yhwh_s_commands, 'This command protects exclusive worship by removing practices, objects, covenants, and desires tied to idolatry: Do not add to YHWH''s commands.').

% Command: do_not_take_away_from_yhwh_s_commands
command(do_not_take_away_from_yhwh_s_commands).
command_title(do_not_take_away_from_yhwh_s_commands, 'Deuteronomy 4:2 - Do not take away from YHWH''s commands.').
normal_obedience(do_not_take_away_from_yhwh_s_commands, 'Do not take away from YHWH''s commands.').
concerns(do_not_take_away_from_yhwh_s_commands, reject_idolatry).
scripture_reference(do_not_take_away_from_yhwh_s_commands, 'Deuteronomy 4:2').
scripture_reference(do_not_take_away_from_yhwh_s_commands, 'Deuteronomy 12:32').
story_reference(do_not_take_away_from_yhwh_s_commands, '1 Kings 12:25-33', 'Jeroboam replaces YHWH''s appointed worship pattern with his own system.').
source_term(do_not_take_away_from_yhwh_s_commands, hebrew, gara, 'to diminish, subtract, or take away; the command forbids removing from YHWH''s word').
source_term(do_not_take_away_from_yhwh_s_commands, hebrew, mitsvah, 'commandment; the divine command is the protected object').
study_note(do_not_take_away_from_yhwh_s_commands, 'This command protects exclusive worship by removing practices, objects, covenants, and desires tied to idolatry: Do not take away from YHWH''s commands.').

% Command: destroy_idolatrous_altars_pillars_asherim_and_images_in_the_land
command(destroy_idolatrous_altars_pillars_asherim_and_images_in_the_land).
command_title(destroy_idolatrous_altars_pillars_asherim_and_images_in_the_land, 'Deuteronomy 7:5 - Destroy idolatrous altars, pillars, Asherim, and images in the land.').
normal_obedience(destroy_idolatrous_altars_pillars_asherim_and_images_in_the_land, 'Destroy idolatrous altars, pillars, Asherim, and images in the land.').
concerns(destroy_idolatrous_altars_pillars_asherim_and_images_in_the_land, reject_idolatry).
scripture_reference(destroy_idolatrous_altars_pillars_asherim_and_images_in_the_land, 'Deuteronomy 7:5').
scripture_reference(destroy_idolatrous_altars_pillars_asherim_and_images_in_the_land, 'Deuteronomy 12:2-3').
story_reference(destroy_idolatrous_altars_pillars_asherim_and_images_in_the_land, '2 Chronicles 34:3-7', 'Josiah breaks down altars, Asherim, carved images, and molten images in his purge of idolatry.').
story_reference(destroy_idolatrous_altars_pillars_asherim_and_images_in_the_land, '2 Kings 23:4-15', 'Josiah removes and destroys idolatrous objects and places throughout Judah and Bethel.').
source_term(destroy_idolatrous_altars_pillars_asherim_and_images_in_the_land, hebrew, mizbeach, 'altar; idolatrous altars are among the objects to be torn down').
source_term(destroy_idolatrous_altars_pillars_asherim_and_images_in_the_land, hebrew, matstsebah, 'pillar or standing stone connected with forbidden worship').
source_term(destroy_idolatrous_altars_pillars_asherim_and_images_in_the_land, hebrew, pesel, 'carved image or idol included among objects to destroy').
study_note(destroy_idolatrous_altars_pillars_asherim_and_images_in_the_land, 'This command protects exclusive worship by removing practices, objects, covenants, and desires tied to idolatry: Destroy idolatrous altars, pillars, Asherim, and images in the land.').

% Command: do_not_bring_an_abomination_into_your_house
command(do_not_bring_an_abomination_into_your_house).
command_title(do_not_bring_an_abomination_into_your_house, 'Deuteronomy 7:26 - Do not bring an abomination into your house.').
normal_obedience(do_not_bring_an_abomination_into_your_house, 'Do not bring an abomination into your house.').
concerns(do_not_bring_an_abomination_into_your_house, reject_idolatry).
scripture_reference(do_not_bring_an_abomination_into_your_house, 'Deuteronomy 7:26').
story_reference(do_not_bring_an_abomination_into_your_house, 'Joshua 7:1-26', 'Achan takes devoted things from Jericho into his tent, bringing trouble on Israel.').
source_term(do_not_bring_an_abomination_into_your_house, hebrew, toevah, 'abomination or detestable thing; the forbidden object must not be brought into the house').
source_term(do_not_bring_an_abomination_into_your_house, hebrew, cherem, 'devoted thing under destruction; the passage warns against becoming devoted like it').
study_note(do_not_bring_an_abomination_into_your_house, 'This command protects exclusive worship by removing practices, objects, covenants, and desires tied to idolatry: Do not bring an abomination into your house.').

% Command: do_not_desire_silver_or_gold_from_idols
command(do_not_desire_silver_or_gold_from_idols).
command_title(do_not_desire_silver_or_gold_from_idols, 'Deuteronomy 7:25 - Do not desire silver or gold from idols.').
normal_obedience(do_not_desire_silver_or_gold_from_idols, 'Do not desire silver or gold from idols.').
concerns(do_not_desire_silver_or_gold_from_idols, reject_idolatry).
scripture_reference(do_not_desire_silver_or_gold_from_idols, 'Deuteronomy 7:25').
story_reference(do_not_desire_silver_or_gold_from_idols, 'Joshua 7:20-26', 'Achan covets and takes silver, gold, and a garment from what was under the ban.').
source_term(do_not_desire_silver_or_gold_from_idols, hebrew, chamad, 'to desire or covet; the command forbids coveting idol metal').
source_term(do_not_desire_silver_or_gold_from_idols, hebrew, kesef, 'silver; one of the idol materials not to be desired').
source_term(do_not_desire_silver_or_gold_from_idols, hebrew, zahav, 'gold; one of the idol materials not to be desired').
study_note(do_not_desire_silver_or_gold_from_idols, 'This command protects exclusive worship by removing practices, objects, covenants, and desires tied to idolatry: Do not desire silver or gold from idols.').

% Command: do_not_make_a_covenant_with_idolatrous_nations_or_their_gods
command(do_not_make_a_covenant_with_idolatrous_nations_or_their_gods).
command_title(do_not_make_a_covenant_with_idolatrous_nations_or_their_gods, 'Exodus 23:32 - Do not make a covenant with idolatrous nations or their gods.').
normal_obedience(do_not_make_a_covenant_with_idolatrous_nations_or_their_gods, 'Do not make a covenant with idolatrous nations or their gods.').
concerns(do_not_make_a_covenant_with_idolatrous_nations_or_their_gods, reject_idolatry).
scripture_reference(do_not_make_a_covenant_with_idolatrous_nations_or_their_gods, 'Exodus 23:32').
scripture_reference(do_not_make_a_covenant_with_idolatrous_nations_or_their_gods, 'Deuteronomy 7:2').
story_reference(do_not_make_a_covenant_with_idolatrous_nations_or_their_gods, 'Joshua 9:14-16', 'Israel makes a covenant with the Gibeonites without asking counsel from YHWH.').
story_reference(do_not_make_a_covenant_with_idolatrous_nations_or_their_gods, 'Judges 2:1-3', 'YHWH rebukes Israel for making covenants in the land and not tearing down the altars.').
source_term(do_not_make_a_covenant_with_idolatrous_nations_or_their_gods, hebrew, karath_berith, 'to cut a covenant; the idiom used for making a treaty or covenant').
source_term(do_not_make_a_covenant_with_idolatrous_nations_or_their_gods, hebrew, elohim, 'gods; the covenant prohibition includes their gods, not only the peoples').
study_note(do_not_make_a_covenant_with_idolatrous_nations_or_their_gods, 'This command protects exclusive worship by removing practices, objects, covenants, and desires tied to idolatry: Do not make a covenant with idolatrous nations or their gods.').

% Command: do_not_show_mercy_to_the_idolatrous_nations_in_the_land_when_commanded_to_disp
command(do_not_show_mercy_to_the_idolatrous_nations_in_the_land_when_commanded_to_disp).
command_title(do_not_show_mercy_to_the_idolatrous_nations_in_the_land_when_commanded_to_disp, 'Deuteronomy 7:2 - Do not show mercy to the idolatrous nations in the land when commanded to dispossess them.').
normal_obedience(do_not_show_mercy_to_the_idolatrous_nations_in_the_land_when_commanded_to_disp, 'Do not show mercy to the idolatrous nations in the land when commanded to dispossess them.').
concerns(do_not_show_mercy_to_the_idolatrous_nations_in_the_land_when_commanded_to_disp, reject_idolatry).
scripture_reference(do_not_show_mercy_to_the_idolatrous_nations_in_the_land_when_commanded_to_disp, 'Deuteronomy 7:2').
story_reference(do_not_show_mercy_to_the_idolatrous_nations_in_the_land_when_commanded_to_disp, 'Judges 1:27-36', 'Several tribes do not drive out the inhabitants of the land, leaving them as forced labor or neighbors.').
story_reference(do_not_show_mercy_to_the_idolatrous_nations_in_the_land_when_commanded_to_disp, 'Judges 2:1-3', 'YHWH rebukes Israel for not obeying the land-command boundaries.').
source_term(do_not_show_mercy_to_the_idolatrous_nations_in_the_land_when_commanded_to_disp, hebrew, chanan, 'to show favor, grace, or mercy; here forbidden in the stated conquest judgment context').
source_term(do_not_show_mercy_to_the_idolatrous_nations_in_the_land_when_commanded_to_disp, hebrew, charam, 'to devote to destruction under the specific land-command judgment context').
study_note(do_not_show_mercy_to_the_idolatrous_nations_in_the_land_when_commanded_to_disp, 'This command protects exclusive worship by removing practices, objects, covenants, and desires tied to idolatry: Do not show mercy to the idolatrous nations in the land when commanded to dispossess them.').

% Command: do_not_intermarry_with_the_idolatrous_nations_listed_in_the_land_context
command(do_not_intermarry_with_the_idolatrous_nations_listed_in_the_land_context).
command_title(do_not_intermarry_with_the_idolatrous_nations_listed_in_the_land_context, 'Deuteronomy 7:3 - Do not intermarry with the idolatrous nations listed in the land context.').
normal_obedience(do_not_intermarry_with_the_idolatrous_nations_listed_in_the_land_context, 'Do not intermarry with the idolatrous nations listed in the land context.').
concerns(do_not_intermarry_with_the_idolatrous_nations_listed_in_the_land_context, reject_idolatry).
scripture_reference(do_not_intermarry_with_the_idolatrous_nations_listed_in_the_land_context, 'Deuteronomy 7:3').
story_reference(do_not_intermarry_with_the_idolatrous_nations_listed_in_the_land_context, 'Judges 3:5-7', 'Israel dwells among the nations, takes their daughters and gives their daughters, and serves their gods.').
story_reference(do_not_intermarry_with_the_idolatrous_nations_listed_in_the_land_context, '1 Kings 11:1-8', 'Solomon loves many foreign women, and his wives turn his heart after other gods.').
source_term(do_not_intermarry_with_the_idolatrous_nations_listed_in_the_land_context, hebrew, chathan, 'to intermarry or make marriage alliance; Deuteronomy 7 warns against idolatrous intermarriage').
source_term(do_not_intermarry_with_the_idolatrous_nations_listed_in_the_land_context, hebrew, sur, 'to turn aside; the stated danger is turning children away from following YHWH').
study_note(do_not_intermarry_with_the_idolatrous_nations_listed_in_the_land_context, 'This command protects exclusive worship by removing practices, objects, covenants, and desires tied to idolatry: Do not intermarry with the idolatrous nations listed in the land context.').
study_note(do_not_intermarry_with_the_idolatrous_nations_listed_in_the_land_context, 'Interesting recent  studies are regarding Ruth (Moabite) and Bathsheeba''s husband (Hitite). Both of these cases would have been a clear breaking of Torah, but scripture indicated both Ruth and Uriah  had been grafted into Israel thus not guilty of breaking this command.').

% Command: test_a_prophet_by_whether_his_word_comes_to_pass_and_whether_he_turns_people_f
command(test_a_prophet_by_whether_his_word_comes_to_pass_and_whether_he_turns_people_f).
command_title(test_a_prophet_by_whether_his_word_comes_to_pass_and_whether_he_turns_people_f, 'Deuteronomy 13:1-5 - Test a prophet by whether his word comes to pass and whether he turns people from YHWH.').
normal_obedience(test_a_prophet_by_whether_his_word_comes_to_pass_and_whether_he_turns_people_f, 'Test a prophet by whether his word comes to pass and whether he turns people from YHWH.').
concerns(test_a_prophet_by_whether_his_word_comes_to_pass_and_whether_he_turns_people_f, reject_idolatry).
scripture_reference(test_a_prophet_by_whether_his_word_comes_to_pass_and_whether_he_turns_people_f, 'Deuteronomy 13:1-5').
scripture_reference(test_a_prophet_by_whether_his_word_comes_to_pass_and_whether_he_turns_people_f, 'Deuteronomy 18:20-22').
story_reference(test_a_prophet_by_whether_his_word_comes_to_pass_and_whether_he_turns_people_f, 'Jeremiah 28:10-17', 'Hananiah speaks falsely in YHWH''s name, and Jeremiah exposes the false word.').
story_reference(test_a_prophet_by_whether_his_word_comes_to_pass_and_whether_he_turns_people_f, '1 Kings 13:11-26', 'A prophet is deceived by a false word and dies for disobeying YHWH''s command.').
source_term(test_a_prophet_by_whether_his_word_comes_to_pass_and_whether_he_turns_people_f, hebrew, bo, 'to come or come to pass; Deuteronomy 18 tests whether the word happens').
source_term(test_a_prophet_by_whether_his_word_comes_to_pass_and_whether_he_turns_people_f, hebrew, sur, 'to turn aside; Deuteronomy 13 rejects a sign-giver who turns people toward other gods').
study_note(test_a_prophet_by_whether_his_word_comes_to_pass_and_whether_he_turns_people_f, 'This command protects exclusive worship by removing practices, objects, covenants, and desires tied to idolatry: Test a prophet by whether his word comes to pass and whether he turns people from YHWH.').

% Command: do_not_fear_a_false_prophet
command(do_not_fear_a_false_prophet).
command_title(do_not_fear_a_false_prophet, 'Deuteronomy 18:22 - Do not fear a false prophet.').
normal_obedience(do_not_fear_a_false_prophet, 'Do not fear a false prophet.').
concerns(do_not_fear_a_false_prophet, reject_idolatry).
scripture_reference(do_not_fear_a_false_prophet, 'Deuteronomy 18:22').
story_reference(do_not_fear_a_false_prophet, 'Jeremiah 28:10-17', 'Jeremiah does not yield to Hananiah''s false prophecy and declares YHWH''s judgment on him.').
source_term(do_not_fear_a_false_prophet, hebrew, gur, 'to fear, be afraid of, or stand in dread; the people must not fear the false prophet').
study_note(do_not_fear_a_false_prophet, 'This command protects exclusive worship by removing practices, objects, covenants, and desires tied to idolatry: Do not fear a false prophet.').

% Command: do_not_prophesy_falsely_in_yhwh_s_name
command(do_not_prophesy_falsely_in_yhwh_s_name).
command_title(do_not_prophesy_falsely_in_yhwh_s_name, 'Deuteronomy 18:20 - Do not prophesy falsely in YHWH''s Name.').
normal_obedience(do_not_prophesy_falsely_in_yhwh_s_name, 'Do not prophesy falsely in YHWH''s Name.').
concerns(do_not_prophesy_falsely_in_yhwh_s_name, reject_idolatry).
scripture_reference(do_not_prophesy_falsely_in_yhwh_s_name, 'Deuteronomy 18:20').
story_reference(do_not_prophesy_falsely_in_yhwh_s_name, 'Jeremiah 28:10-17', 'Hananiah falsely prophesies peace in YHWH''s name and dies that same year.').
source_term(do_not_prophesy_falsely_in_yhwh_s_name, hebrew, zadon, 'presumption or arrogance; Deuteronomy 18 describes presumptuous speech in YHWH''s name').
source_term(do_not_prophesy_falsely_in_yhwh_s_name, hebrew, dabar, 'word or speech; the prophet must not speak a word YHWH did not command').
study_note(do_not_prophesy_falsely_in_yhwh_s_name, 'This command protects exclusive worship by removing practices, objects, covenants, and desires tied to idolatry: Do not prophesy falsely in YHWH''s Name.').

% Command: do_not_prophesy_in_the_name_of_other_gods
command(do_not_prophesy_in_the_name_of_other_gods).
command_title(do_not_prophesy_in_the_name_of_other_gods, 'Deuteronomy 18:20 - Do not prophesy in the name of other gods.').
normal_obedience(do_not_prophesy_in_the_name_of_other_gods, 'Do not prophesy in the name of other gods.').
concerns(do_not_prophesy_in_the_name_of_other_gods, reject_idolatry).
scripture_reference(do_not_prophesy_in_the_name_of_other_gods, 'Deuteronomy 18:20').
story_reference(do_not_prophesy_in_the_name_of_other_gods, '1 Kings 18:19-40', 'Elijah confronts the prophets of Baal and exposes the false worship system they serve.').
source_term(do_not_prophesy_in_the_name_of_other_gods, hebrew, shem, 'name; the forbidden prophecy is spoken in another god''s name').
source_term(do_not_prophesy_in_the_name_of_other_gods, hebrew, elohim_acherim, 'other gods; the authority invoked by the forbidden prophet').
study_note(do_not_prophesy_in_the_name_of_other_gods, 'This command protects exclusive worship by removing practices, objects, covenants, and desires tied to idolatry: Do not prophesy in the name of other gods.').

% Command: do_not_listen_to_one_who_secretly_entices_you_to_serve_other_gods
command(do_not_listen_to_one_who_secretly_entices_you_to_serve_other_gods).
command_title(do_not_listen_to_one_who_secretly_entices_you_to_serve_other_gods, 'Deuteronomy 13:6-11 - Do not listen to one who secretly entices you to serve other gods.').
normal_obedience(do_not_listen_to_one_who_secretly_entices_you_to_serve_other_gods, 'Do not listen to one who secretly entices you to serve other gods.').
concerns(do_not_listen_to_one_who_secretly_entices_you_to_serve_other_gods, reject_idolatry).
scripture_reference(do_not_listen_to_one_who_secretly_entices_you_to_serve_other_gods, 'Deuteronomy 13:6-11').
source_term(do_not_listen_to_one_who_secretly_entices_you_to_serve_other_gods, hebrew, suth, 'to entice, incite, or persuade secretly toward idolatry').
source_term(do_not_listen_to_one_who_secretly_entices_you_to_serve_other_gods, hebrew, shama, 'to listen, hear, or obey; the command forbids listening to the enticer').
study_note(do_not_listen_to_one_who_secretly_entices_you_to_serve_other_gods, 'This command protects exclusive worship by removing practices, objects, covenants, and desires tied to idolatry: Do not listen to one who secretly entices you to serve other gods.').

% Command: do_not_spare_or_conceal_the_enticer_to_idolatry
command(do_not_spare_or_conceal_the_enticer_to_idolatry).
command_title(do_not_spare_or_conceal_the_enticer_to_idolatry, 'Deuteronomy 13:8 - Do not spare or conceal the enticer to idolatry.').
normal_obedience(do_not_spare_or_conceal_the_enticer_to_idolatry, 'Do not spare or conceal the enticer to idolatry.').
concerns(do_not_spare_or_conceal_the_enticer_to_idolatry, reject_idolatry).
scripture_reference(do_not_spare_or_conceal_the_enticer_to_idolatry, 'Deuteronomy 13:8').
source_term(do_not_spare_or_conceal_the_enticer_to_idolatry, hebrew, chus, 'to pity or spare; the text says not to pity the idolatrous enticer').
source_term(do_not_spare_or_conceal_the_enticer_to_idolatry, hebrew, kasah, 'to cover or conceal; the enticer must not be hidden or protected').
study_note(do_not_spare_or_conceal_the_enticer_to_idolatry, 'This command protects exclusive worship by removing practices, objects, covenants, and desires tied to idolatry: Do not spare or conceal the enticer to idolatry.').

% Command: investigate_the_idolatrous_city_matter_carefully
command(investigate_the_idolatrous_city_matter_carefully).
command_title(investigate_the_idolatrous_city_matter_carefully, 'Deuteronomy 13:12-18 - Investigate the idolatrous city matter carefully.').
normal_obedience(investigate_the_idolatrous_city_matter_carefully, 'Investigate the idolatrous city matter carefully.').
concerns(investigate_the_idolatrous_city_matter_carefully, reject_idolatry).
scripture_reference(investigate_the_idolatrous_city_matter_carefully, 'Deuteronomy 13:12-18').
source_term(investigate_the_idolatrous_city_matter_carefully, hebrew, darash, 'to inquire or investigate; the city matter must be examined carefully').
source_term(investigate_the_idolatrous_city_matter_carefully, hebrew, chaqar, 'to search out or examine; part of the careful investigation language').
study_note(investigate_the_idolatrous_city_matter_carefully, 'This command protects exclusive worship by removing practices, objects, covenants, and desires tied to idolatry: Investigate the idolatrous city matter carefully.').

% Command: do_not_rebuild_an_idolatrous_city_placed_under_destruction
command(do_not_rebuild_an_idolatrous_city_placed_under_destruction).
command_title(do_not_rebuild_an_idolatrous_city_placed_under_destruction, 'Deuteronomy 13:16 - Do not rebuild an idolatrous city placed under destruction.').
normal_obedience(do_not_rebuild_an_idolatrous_city_placed_under_destruction, 'Do not rebuild an idolatrous city placed under destruction.').
concerns(do_not_rebuild_an_idolatrous_city_placed_under_destruction, reject_idolatry).
scripture_reference(do_not_rebuild_an_idolatrous_city_placed_under_destruction, 'Deuteronomy 13:16').
source_term(do_not_rebuild_an_idolatrous_city_placed_under_destruction, hebrew, banah, 'to build or rebuild; the destroyed idolatrous city must not be rebuilt').
source_term(do_not_rebuild_an_idolatrous_city_placed_under_destruction, hebrew, tel, 'heap or ruin mound; the city is to remain a ruin heap').
study_note(do_not_rebuild_an_idolatrous_city_placed_under_destruction, 'This command protects exclusive worship by removing practices, objects, covenants, and desires tied to idolatry: Do not rebuild an idolatrous city placed under destruction.').

% Command: do_not_let_anything_devoted_from_that_city_cling_to_your_hand
command(do_not_let_anything_devoted_from_that_city_cling_to_your_hand).
command_title(do_not_let_anything_devoted_from_that_city_cling_to_your_hand, 'Deuteronomy 13:17 - Do not let anything devoted from that city cling to your hand.').
normal_obedience(do_not_let_anything_devoted_from_that_city_cling_to_your_hand, 'Do not let anything devoted from that city cling to your hand.').
concerns(do_not_let_anything_devoted_from_that_city_cling_to_your_hand, reject_idolatry).
scripture_reference(do_not_let_anything_devoted_from_that_city_cling_to_your_hand, 'Deuteronomy 13:17').
story_reference(do_not_let_anything_devoted_from_that_city_cling_to_your_hand, 'Joshua 7:1-26', 'Achan keeps devoted things from Jericho, and Israel suffers defeat until the matter is judged.').
source_term(do_not_let_anything_devoted_from_that_city_cling_to_your_hand, hebrew, cherem, 'devoted thing under destruction; nothing from the judged city may cling to the hand').
source_term(do_not_let_anything_devoted_from_that_city_cling_to_your_hand, hebrew, dabaq, 'to cling, stick, or adhere; the forbidden devoted thing must not remain with the person').
study_note(do_not_let_anything_devoted_from_that_city_cling_to_your_hand, 'This command protects exclusive worship by removing practices, objects, covenants, and desires tied to idolatry: Do not let anything devoted from that city cling to your hand.').

% Command: do_not_practice_soothsaying_or_cloud_reading
command(do_not_practice_soothsaying_or_cloud_reading).
command_title(do_not_practice_soothsaying_or_cloud_reading, 'Deuteronomy 18:10 - Do not practice soothsaying or cloud-reading.').
normal_obedience(do_not_practice_soothsaying_or_cloud_reading, 'Do not practice soothsaying or cloud-reading.').
concerns(do_not_practice_soothsaying_or_cloud_reading, reject_idolatry).
scripture_reference(do_not_practice_soothsaying_or_cloud_reading, 'Deuteronomy 18:10').
story_reference(do_not_practice_soothsaying_or_cloud_reading, '2 Kings 21:6', 'Manasseh practices soothsaying and omens as part of his rebellion.').
story_reference(do_not_practice_soothsaying_or_cloud_reading, '2 Kings 23:24', 'Josiah removes occult practitioners and abominations from the land.').
source_term(do_not_practice_soothsaying_or_cloud_reading, hebrew, anan, 'to practice soothsaying, cloud-reading, or omen interpretation').
study_note(do_not_practice_soothsaying_or_cloud_reading, 'This command protects exclusive worship by removing practices, objects, covenants, and desires tied to idolatry: Do not practice soothsaying or cloud-reading.').

% Command: do_not_practice_omen_reading
command(do_not_practice_omen_reading).
command_title(do_not_practice_omen_reading, 'Deuteronomy 18:10 - Do not practice omen-reading.').
normal_obedience(do_not_practice_omen_reading, 'Do not practice omen-reading.').
concerns(do_not_practice_omen_reading, reject_idolatry).
scripture_reference(do_not_practice_omen_reading, 'Deuteronomy 18:10').
story_reference(do_not_practice_omen_reading, '2 Kings 21:6', 'Manasseh practices omens and related occult acts.').
story_reference(do_not_practice_omen_reading, '2 Kings 23:24', 'Josiah removes occult practices and abominations from Judah and Jerusalem.').
source_term(do_not_practice_omen_reading, hebrew, nachash, 'to practice divination or observe omens; the omen-reading term in Deuteronomy 18').
study_note(do_not_practice_omen_reading, 'This command protects exclusive worship by removing practices, objects, covenants, and desires tied to idolatry: Do not practice omen-reading.').

% Command: do_not_practice_sorcery
command(do_not_practice_sorcery).
command_title(do_not_practice_sorcery, 'Deuteronomy 18:10 - Do not practice sorcery.').
normal_obedience(do_not_practice_sorcery, 'Do not practice sorcery.').
concerns(do_not_practice_sorcery, reject_idolatry).
scripture_reference(do_not_practice_sorcery, 'Deuteronomy 18:10').
story_reference(do_not_practice_sorcery, '2 Kings 21:6', 'Manasseh practices witchcraft and other occult acts in Judah.').
story_reference(do_not_practice_sorcery, '2 Chronicles 33:6', 'Manasseh uses witchcraft, divination, and sorcery, doing much evil before YHWH.').
source_term(do_not_practice_sorcery, hebrew, kashaph, 'to practice sorcery or witchcraft').
study_note(do_not_practice_sorcery, 'Deuteronomy strictly prohibits doing anything that has to do with sorcery, divination, or witchcraft.').

non_canonical_story_reference(do_not_practice_sorcery, '1 Enoch 8:3', 'The fallen Watchers teach humanity forbidden arts including enchantments, root-cuttings, and sorcery, corrupting the earth.').

% Command: do_not_cast_spells
command(do_not_cast_spells).
command_title(do_not_cast_spells, 'Deuteronomy 18:11 - Do not cast spells.').
normal_obedience(do_not_cast_spells, 'Do not cast spells.').
concerns(do_not_cast_spells, reject_idolatry).
scripture_reference(do_not_cast_spells, 'Deuteronomy 18:11').
story_reference(do_not_cast_spells, '2 Chronicles 33:6', 'Manasseh practices sorcery and related occult acts, provoking YHWH.').
source_term(do_not_cast_spells, hebrew, chabar, 'to charm, bind with spells, or join by enchantment; the charm/spell language of Deuteronomy 18:11').
study_note(do_not_cast_spells, 'Charmers, mediums, spirits, wizards, and necromancers are treated as abominations that YHWH''s people must avoid.').

% Command: do_not_consult_a_medium
command(do_not_consult_a_medium).
command_title(do_not_consult_a_medium, 'Deuteronomy 18:11 - Do not consult a medium.').
normal_obedience(do_not_consult_a_medium, 'Do not consult a medium.').
concerns(do_not_consult_a_medium, reject_idolatry).
scripture_reference(do_not_consult_a_medium, 'Deuteronomy 18:11').
story_reference(do_not_consult_a_medium, '1 Samuel 28:3-20', 'Saul consults a medium at Endor after YHWH does not answer him.').
story_reference(do_not_consult_a_medium, '2 Kings 23:24', 'Josiah removes mediums and spiritists from the land.').
source_term(do_not_consult_a_medium, hebrew, ob, 'medium or necromantic spirit; one of the forbidden sources of guidance').
study_note(do_not_consult_a_medium, 'This is an abomination to YHWH.').

% Command: do_not_consult_a_spiritist
command(do_not_consult_a_spiritist).
command_title(do_not_consult_a_spiritist, 'Deuteronomy 18:11 - Do not consult a spiritist.').
normal_obedience(do_not_consult_a_spiritist, 'Do not consult a spiritist.').
concerns(do_not_consult_a_spiritist, reject_idolatry).
scripture_reference(do_not_consult_a_spiritist, 'Deuteronomy 18:11').
story_reference(do_not_consult_a_spiritist, '1 Samuel 28:3-20', 'Saul seeks forbidden guidance through a medium, showing the danger of spiritist consultation.').
story_reference(do_not_consult_a_spiritist, '2 Kings 23:24', 'Josiah removes spiritists as part of restoring Torah obedience.').
source_term(do_not_consult_a_spiritist, hebrew, yiddeoni, 'spiritist, familiar-spirit practitioner, or knowing one named in occult prohibitions').
study_note(do_not_consult_a_spiritist, 'This is an abomination to YHWH.').

% Command: do_not_inquire_of_the_dead
command(do_not_inquire_of_the_dead).
command_title(do_not_inquire_of_the_dead, 'Deuteronomy 18:11 - Do not inquire of the dead.').
normal_obedience(do_not_inquire_of_the_dead, 'Do not inquire of the dead.').
concerns(do_not_inquire_of_the_dead, reject_idolatry).
scripture_reference(do_not_inquire_of_the_dead, 'Deuteronomy 18:11').
story_reference(do_not_inquire_of_the_dead, '1 Samuel 28:3-20', 'Saul seeks a word from Samuel through the medium at Endor.').
source_term(do_not_inquire_of_the_dead, hebrew, darash, 'to seek or inquire; here seeking forbidden guidance from the dead').
source_term(do_not_inquire_of_the_dead, hebrew, meth, 'dead person or dead; the forbidden source of inquiry').
study_note(do_not_inquire_of_the_dead, 'This is an abomination to YHWH.').

% Command: do_not_turn_to_mediums_or_spiritists
command(do_not_turn_to_mediums_or_spiritists).
command_title(do_not_turn_to_mediums_or_spiritists, 'Leviticus 19:31 - Do not turn to mediums or spiritists.').
normal_obedience(do_not_turn_to_mediums_or_spiritists, 'Do not turn to mediums or spiritists.').
concerns(do_not_turn_to_mediums_or_spiritists, reject_idolatry).
scripture_reference(do_not_turn_to_mediums_or_spiritists, 'Leviticus 19:31').
story_reference(do_not_turn_to_mediums_or_spiritists, '1 Samuel 28:3-20', 'Saul turns to a medium in disobedience and receives a word of judgment.').
story_reference(do_not_turn_to_mediums_or_spiritists, '2 Kings 23:24', 'Josiah removes mediums and spiritists while restoring the words of the Torah.').
source_term(do_not_turn_to_mediums_or_spiritists, hebrew, panah, 'to turn toward; Leviticus forbids turning to mediums and spiritists').
source_term(do_not_turn_to_mediums_or_spiritists, hebrew, ob, 'medium or necromantic practitioner').
source_term(do_not_turn_to_mediums_or_spiritists, hebrew, yiddeoni, 'spiritist or familiar-spirit practitioner').
study_note(do_not_turn_to_mediums_or_spiritists, 'This is an abomination to YHWH.').

% Command: do_not_make_baldness_between_your_eyes_for_the_dead
command(do_not_make_baldness_between_your_eyes_for_the_dead).
command_title(do_not_make_baldness_between_your_eyes_for_the_dead, 'Deuteronomy 14:1 - Do not make baldness between your eyes for the dead.').
normal_obedience(do_not_make_baldness_between_your_eyes_for_the_dead, 'Do not make baldness between your eyes for the dead.').
concerns(do_not_make_baldness_between_your_eyes_for_the_dead, reject_idolatry).
scripture_reference(do_not_make_baldness_between_your_eyes_for_the_dead, 'Deuteronomy 14:1').
source_term(do_not_make_baldness_between_your_eyes_for_the_dead, hebrew, qorchah, 'baldness or a bald place, here made between the eyes for the dead').
source_term(do_not_make_baldness_between_your_eyes_for_the_dead, hebrew, meth, 'dead person or dead body; the command limits mourning practice for the dead').
study_note(do_not_make_baldness_between_your_eyes_for_the_dead, 'This command protects exclusive worship by removing practices, objects, covenants, and desires tied to idolatry: Do not make baldness between your eyes for the dead.').

% Command: do_not_cut_the_flesh_for_the_dead
command(do_not_cut_the_flesh_for_the_dead).
command_title(do_not_cut_the_flesh_for_the_dead, 'Leviticus 19:28 - Do not cut the flesh for the dead.').
normal_obedience(do_not_cut_the_flesh_for_the_dead, 'Do not cut the flesh for the dead.').
concerns(do_not_cut_the_flesh_for_the_dead, reject_idolatry).
scripture_reference(do_not_cut_the_flesh_for_the_dead, 'Leviticus 19:28').
scripture_reference(do_not_cut_the_flesh_for_the_dead, 'Deuteronomy 14:1').
source_term(do_not_cut_the_flesh_for_the_dead, hebrew, seret, 'a cut, incision, or gash; Leviticus 19:28 forbids cuttings in the flesh for the dead').
source_term(do_not_cut_the_flesh_for_the_dead, hebrew, nephesh, 'life, soul, or person; in this context the cuttings are connected with the dead person').
study_note(do_not_cut_the_flesh_for_the_dead, 'This command protects exclusive worship by removing practices, objects, covenants, and desires tied to idolatry: Do not cut the flesh for the dead.').

% Command: do_not_make_tattoo_marks_on_yourself
command(do_not_make_tattoo_marks_on_yourself).
command_title(do_not_make_tattoo_marks_on_yourself, 'Leviticus 19:28 - Do not make tattoo marks on yourself.').
normal_obedience(do_not_make_tattoo_marks_on_yourself, 'Do not make tattoo marks on yourself.').
concerns(do_not_make_tattoo_marks_on_yourself, reject_idolatry).
scripture_reference(do_not_make_tattoo_marks_on_yourself, 'Leviticus 19:28').
source_term(do_not_make_tattoo_marks_on_yourself, hebrew, kethobeth, 'writing, inscription, or mark; paired with qa_aqa in the tattoo-mark command').
source_term(do_not_make_tattoo_marks_on_yourself, hebrew, qa_aqa, 'incised or tattooed mark; Leviticus 19:28 forbids making this mark on oneself').
study_note(do_not_make_tattoo_marks_on_yourself, 'This command protects exclusive worship by removing practices, objects, covenants, and desires tied to idolatry: Do not make tattoo marks on yourself.').

% Command: priests_must_not_make_baldness_shave_edges_of_beard_or_cut_flesh_for_the_dead
command(priests_must_not_make_baldness_shave_edges_of_beard_or_cut_flesh_for_the_dead).
command_title(priests_must_not_make_baldness_shave_edges_of_beard_or_cut_flesh_for_the_dead, 'Leviticus 21:5 - Priests must not make baldness, shave edges of beard, or cut flesh for the dead.').
normal_obedience(priests_must_not_make_baldness_shave_edges_of_beard_or_cut_flesh_for_the_dead, 'Priests must not make baldness, shave edges of beard, or cut flesh for the dead.').
concerns(priests_must_not_make_baldness_shave_edges_of_beard_or_cut_flesh_for_the_dead, reject_idolatry).
scripture_reference(priests_must_not_make_baldness_shave_edges_of_beard_or_cut_flesh_for_the_dead, 'Leviticus 21:5').
source_term(priests_must_not_make_baldness_shave_edges_of_beard_or_cut_flesh_for_the_dead, hebrew, qorchah, 'baldness or a bald spot; priests must not make baldness on the head').
source_term(priests_must_not_make_baldness_shave_edges_of_beard_or_cut_flesh_for_the_dead, hebrew, peah, 'edge, corner, or side; used of the edge of the beard in the priestly command').
source_term(priests_must_not_make_baldness_shave_edges_of_beard_or_cut_flesh_for_the_dead, hebrew, zaqan, 'beard; the priestly command names the beard edge').
source_term(priests_must_not_make_baldness_shave_edges_of_beard_or_cut_flesh_for_the_dead, hebrew, seret, 'cut or incision; priests must not cut their flesh in this mourning context').
study_note(priests_must_not_make_baldness_shave_edges_of_beard_or_cut_flesh_for_the_dead, 'This command protects exclusive worship by removing practices, objects, covenants, and desires tied to idolatry: Priests must not make baldness, shave edges of beard, or cut flesh for the dead.').
command_requirement(priests_must_not_make_baldness_shave_edges_of_beard_or_cut_flesh_for_the_dead, 'Priest').
