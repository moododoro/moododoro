# Moododoro Future Issues (Post-MVP)

## [Future] Implement Focus Rooms

**Labels:** future, feature, social, p2

**Description**
Allow users to create and join shareable focus rooms.

Room URLs could look like:

/room/lofi-study  
/room/deep-work

Each room would load:

- background theme
- timer configuration

Users joining the room would share the same focus environment.

---

## [Future] Show Active Users in a Focus Room

**Labels:** future, feature, social, p2

**Description**
Display how many users are currently active in a focus room.

Example UI:

👥 18 people focusing

Possible implementation:

- Supabase Realtime
- Firebase presence tracking
- WebSocket-based presence

Presence should automatically update when users join or leave a room.

---

## [Future] Show User Status in Focus Rooms

**Labels:** future, feature, social, p3

**Description**
Display whether users are currently:

🟢 focusing  
☕ on break

Example UI:

🟢 12 focusing  
☕ 4 on break

This provides light social motivation without requiring user accounts.

---

## [Future] Add Theme Gallery Page

**Labels:** future, feature, p2

**Description**
Create a theme gallery where users can browse and launch shared themes.

Themes may include:

- color palettes
- background images
- YouTube ambience videos

Users should be able to launch a theme with one click.

---

## [Future] Add Random Focus Room Generator

**Labels:** future, feature, good-first-issue

**Description**
Add a button that generates a random focus environment.

The generator should randomly select:

- background color
- ambient YouTube video
- timer configuration

Example button:

🎲 Generate Focus Room

This feature makes the app more fun and shareable.

---

## [Future] Add Ambient Sound Support

**Labels:** future, feature, p2

**Description**
Allow users to play ambient background sounds while focusing.

Examples:

- rain
- forest
- café ambience
- white noise

Sounds should:

- loop continuously
- support volume controls
- work alongside background themes.

---

## [Future] Add Keyboard Shortcuts

**Labels:** future, enhancement, good-first-issue

**Description**
Implement keyboard shortcuts for timer control.

Suggested shortcuts:

Space → Start / Pause  
R → Reset  
S → Skip

Shortcuts should not interfere with text inputs.

---

## [Future] Add Session Completion Counter

**Labels:** future, enhancement

**Description**
Track and display the number of completed Pomodoro sessions during the current session.

Example UI:

✔ 5 sessions completed

This provides simple productivity feedback to users.

---

## [Future] Implement Fullscreen Focus Mode

**Labels:** future, polish

**Description**
Add a fullscreen focus mode that hides UI controls and displays only:

- timer
- background
- minimal controls

This creates a distraction-free environment.

---

## [Future] Improve Mobile Responsiveness

**Labels:** future, polish

**Description**
Improve layout and usability on smaller screens.

Goals:

- maintain readable timer display
- ensure controls remain accessible
- prevent UI overlap with backgrounds.

---

## [Future] Add Background Theme Presets

**Labels:** future, feature, good-first-issue

**Description**
Provide built-in theme presets that users can quickly apply.

Examples:

- Ocean
- Forest
- Sunset
- Night

Each preset should configure background color, image, or video.

---

## [Future] Add Contributor Documentation

**Labels:** future, documentation

**Description**
Create a CONTRIBUTING.md file describing how to:

- run the project locally
- create issues
- submit pull requests
- follow project conventions.

---

## [Future] Add State Machine Diagram to README

**Labels:** future, documentation

**Description**
Add a visual diagram explaining the Pomodoro timer state machine.

Example workflow:

Work → Short Break → Work → Long Break

This will help contributors understand the timer logic.
