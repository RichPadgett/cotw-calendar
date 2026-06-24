# Project File Summary

This is a human-readable map of the current project structure. Generated folders, dependency folders, local environment files, operating-system files, and repetitive content JSON files are summarized instead of listed one by one.

## App Shell

- `app/_layout.tsx` - Expo Router root layout.
- `app/index.tsx` - Main app screen coordinating the Calendar, Timeline, Model Lab, and Commands tabs.
- `app.json` - Expo application configuration.
- `babel.config.js` - Babel configuration for the Expo/React Native build.
- `jest.config.js` - Jest test configuration.
- `package.json` - Frontend package scripts and dependencies.
- `tsconfig.json` - Frontend TypeScript configuration.

## Assets

- `assets/command/icons/*` - Command-category icon images.
- `assets/enoch/icons/*` - Enoch calendar UI icons.
- `assets/enoch/months/*` - Enoch month artwork/assets.
- `assets/images/*` - General app images and tab icons.
- `assets/welcome/*` - Welcome/onboarding imagery.
- `assets/expo.icon/*` - Expo app icon source files.

## Documentation

- `README.md` - Project overview and getting-started notes.
- `AGENTS.md` - Agent/development instructions.
- `docs/install.md` - Installation notes.
- `docs/commands.md` - Torah command reference material.
- `docs/part-time-model.md` - Part Time / variable course duration theory notes.
- `docs/remaining_torah_command_review.txt` - Working review list for remaining Torah command catalog work.
- `docs/YHWH_Perpetual_Calendar_Project_Report.txt` - Earlier project report.
- `docs/project-file-summary.md` - This project map.

## Frontend Configuration And Types

- `src/config/api.ts` - Resolves the API base URL for local/dev/prod environments.
- `src/constants/theme.ts` - Shared colors, spacing, fonts, and layout constants.
- `src/global.css` - Global web styles.
- `src/models/calendar.ts` - Calendar domain models.
- `src/types/assets.d.ts` - Asset import declarations.
- `src/types/calendarContent.ts` - Calendar content data types.
- `src/types/perpetualMarkers.ts` - Perpetual marker data types.

## Frontend Hooks And Utilities

- `src/hooks/useGroupSession.ts` - Tracks group login/admin session state.
- `src/hooks/use-theme.ts` - Reads the current app theme.
- `src/hooks/use-color-scheme.ts` - Native color-scheme hook.
- `src/hooks/use-color-scheme.web.ts` - Web color-scheme hook.
- `src/utils/appDay.ts` - App-day rollover and group-label helpers.
- `src/utils/appDay.test.ts` - Tests for app-day rollover behavior.

## Frontend Screens And Shared UI

- `src/screens/HomeScreen.tsx` - Basic screen wrapper.
- `src/components/app-tabs.tsx` - Native app tab helper.
- `src/components/app-tabs.web.tsx` - Web app tab helper.
- `src/components/animated-icon.tsx` - Native animated splash/icon component.
- `src/components/animated-icon.web.tsx` - Web animated splash/icon component.
- `src/components/external-link.tsx` - External link wrapper.
- `src/components/hint-row.tsx` - Small helper row component.
- `src/components/themed-text.tsx` - Theme-aware text component.
- `src/components/themed-view.tsx` - Theme-aware view component.
- `src/components/ui/collapsible.tsx` - Collapsible content component.
- `src/components/web-badge.tsx` - Web badge component.

## Calendar UI

- `src/components/calendar/AppHeader.tsx` - Main calendar header.
- `src/components/calendar/DayCell.tsx` - Individual calendar day cell.
- `src/components/calendar/DayDetailModal.tsx` - Day detail modal and admin day-content controls.
- `src/components/calendar/HistoryTimelineView.tsx` - Timeline tab UI and editing surface.
- `src/components/calendar/IntercalaryRow.tsx` - Intercalary day row.
- `src/components/calendar/LatestShabbatTeachingPlayer.tsx` - Latest Shabbat teaching media player.
- `src/components/calendar/MonthView.tsx` - Month grid view.
- `src/components/calendar/SabbathWeekRow.tsx` - Sabbath week visual row.
- `src/components/calendar/YearView.tsx` - Full year calendar view.
- `src/components/calendar/YearWheelView.tsx` - Enoch wheel visualization and gesture selection.

## Command Study UI

- `src/components/commands/CommandExplorerView.tsx` - Command study browser, study detail pane, contribution forms, voting, and admin review UI.
- `src/components/admin/AdminDayContentForm.tsx` - Admin form for editing calendar day content.

## Calendar Engine

- `src/engine/buildMonth.ts` - Builds Gregorian month node data.
- `src/engine/buildMonth.test.ts` - Tests month building behavior.
- `src/engine/buildEnochYear.ts` - Builds a full Enoch year.
- `src/engine/dateWheel.ts` - Converts day positions into wheel angles/gates.
- `src/engine/enochComputedFeasts.ts` - Computes feast/event overlays.
- `src/engine/enochConstants.ts` - Shared Enoch calendar constants.
- `src/engine/enochFeasts.ts` - Enoch feast/event rules.
- `src/engine/enochMonths.ts` - Enoch month definitions.
- `src/engine/enochRules.ts` - Applies Enoch calendar overlays to date nodes.
- `src/engine/enochRules.test.ts` - Tests calendar overlay rules.
- `src/engine/enochYear.ts` - Calculates Enoch year starts and year lengths.
- `src/engine/enochYearCycle.test.ts` - Tests year-cycle behavior.
- `src/engine/timelineValidation.ts` - Validates timeline entries against calendar dates.
- `src/engine/timelineValidation.test.ts` - Tests timeline validation.
- `src/engine/scratch.ts` - Scratch/helper file.

## Part Time Model Engine

- `src/engine/partTime/constants.ts` - Part Time constants.
- `src/engine/partTime/courseDuration.ts` - Variable course-day duration model normalized to the tropical year.
- `src/engine/partTime/courseDuration.test.ts` - Tests the course duration curve.
- `src/engine/partTime/courseSpeed.ts` - Labels Enoch days by course speed.
- `src/engine/partTime/partCurve.ts` - Day/night part interpolation across the Enoch year.
- `src/engine/partTime/partTimeEngine.ts` - Calculates the current Enoch part-time state.
- `src/engine/partTime/partTimeSeasonAlignment.test.ts` - Tests seasonal alignment around the March 22, 2028 anchor.
- `src/engine/partTime/solarData.ts` - Fetches solar data for the Part Time model.
- `src/engine/partTime/solarGateCourse.ts` - Solar-gate anchored seasonal arc duration model.
- `src/engine/partTime/solarGateCourse.test.ts` - Tests the solar-gate anchored duration model.
- `src/engine/partTime/solarGates.json` - User-provided equinox and solstice timestamps.
- `src/engine/partTime/solarGates.ts` - Reads solar-gate timestamp data.
- `src/engine/partTime/types.ts` - Part Time model types.

## Static Data

- `src/data/historyTimeline.ts` - Frontend timeline range and placeholder/static timeline data.

## Server App

- `server/package.json` - Server package scripts and dependencies.
- `server/tsconfig.json` - Server TypeScript configuration.
- `server/src/index.ts` - Express server entrypoint and route registration.
- `server/src/middleware/logApiRequest.ts` - API request logging middleware.
- `server/src/middleware/requireAdminToken.ts` - Admin-token authorization middleware.

## Server Routes

- `server/src/routes/adminCalendarRoutes.ts` - Admin calendar content routes.
- `server/src/routes/adminFileRoutes.ts` - Admin file-serving routes.
- `server/src/routes/calendarRoutes.ts` - Public calendar content routes.
- `server/src/routes/commandResourceRoutes.ts` - Command resource, contribution, voting, and admin review routes.
- `server/src/routes/groupRoutes.ts` - Group join/login/admin routes.
- `server/src/routes/perpetualMarkerRoutes.ts` - Perpetual marker routes.
- `server/src/routes/solarRoutes.ts` - Solar data routes.
- `server/src/routes/timelineRoutes.ts` - Timeline occurrence routes.

## Server Services And Data

- `server/src/data/calendarContent.ts` - Static calendar content fallback data.
- `server/src/data/dayContent.ts` - Static day-content fallback data.
- `server/src/services/calendarContentStore.ts` - File-backed calendar day content storage.
- `server/src/services/calendarNoticeIndex.ts` - Calendar notice index maintenance.
- `server/src/services/commandContributionStore.ts` - File-backed command contribution, voting, approval, and Prolog promotion storage.
- `server/src/services/groupStore.ts` - Group membership/admin-token storage.
- `server/src/services/perpetualMarkerStore.ts` - Writable perpetual marker store.
- `server/src/services/perpetualMarkers.ts` - Read-only perpetual marker helper.
- `server/src/services/prologCommandResource.ts` - Prolog command API bridge.
- `server/src/services/solar/SolarService.ts` - Solar data cache/service.
- `server/src/services/timelineOccurrenceStore.ts` - Timeline occurrence persistence.
- `server/src/types/calendarContent.ts` - Server calendar content types.
- `server/src/types/perpetualMarkers.ts` - Server perpetual marker types.

## Server Content Data

- `server/content/groups/church-of-the-word/group.json` - Group/admin metadata for the Church of the Word group.
- `server/content/groups/church-of-the-word/command-contributions.json` - Pending/approved command contribution data.
- `server/content/groups/church-of-the-word/days/**` - File-backed calendar content by Enoch year/month/day.
- `server/content/groups/church-of-the-word/notices/**` - Year-level notice index data.
- `server/content/system/perpetualMarkers.json` - Shared perpetual marker data.
- `server/content/system/solar/**` - Cached solar data.

## Prolog Knowledge Base

- `server/prolog/api.pl` - JSON-oriented API predicates for command resources.
- `server/prolog/commands.pl` - Loads all command category files.
- `server/prolog/main.pl` - Main Prolog entrypoint.
- `server/prolog/facts/great_commands.pl` - Great-command fact definitions.
- `server/prolog/rules/catalog.pl` - Catalog/category/applicability rules.
- `server/prolog/rules/embodiment.pl` - Command embodiment rules.
- `server/prolog/commands/clean_purity_commands.pl` - Clean/purity command catalog.
- `server/prolog/commands/day_of_atonement_commands.pl` - Day of Atonement command catalog.
- `server/prolog/commands/family_household_commands.pl` - Family/household command catalog.
- `server/prolog/commands/firstfruits_omer_commands.pl` - Firstfruits/Omer command catalog.
- `server/prolog/commands/foundation_commands.pl` - Foundational command catalog.
- `server/prolog/commands/general_torah_review_commands.pl` - General Torah review command catalog.
- `server/prolog/commands/justice_neighbor_commands.pl` - Justice/neighbor command catalog.
- `server/prolog/commands/leadership_warfare_commands.pl` - Leadership/warfare command catalog.
- `server/prolog/commands/name_vows_remembrance_commands.pl` - Name/vows/remembrance command catalog.
- `server/prolog/commands/offerings_commands.pl` - Offering command catalog.
- `server/prolog/commands/passover_unleavened_bread_commands.pl` - Passover/Unleavened Bread command catalog.
- `server/prolog/commands/priestly_holiness_commands.pl` - Priestly holiness command catalog.
- `server/prolog/commands/property_economics_land_commands.pl` - Property/economics/land command catalog.
- `server/prolog/commands/shavuot_commands.pl` - Shavuot command catalog.
- `server/prolog/commands/tabernacles_commands.pl` - Tabernacles command catalog.
- `server/prolog/commands/text_specific_detail_commands.pl` - Text-specific detail command catalog.
- `server/prolog/commands/trumpets_commands.pl` - Trumpets command catalog.
- `server/prolog/commands/worship_idolatry_commands.pl` - Worship/idolatry command catalog.

## Scripts

- `scripts/reset-project.js` - Expo starter reset helper.
