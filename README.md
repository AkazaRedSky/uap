# PROJECT UAP

an Application for Game Purchasing~

## Changelogs

### 1.1 - the Limit Update (12-05-2023)

#### Addition and Changes
  
- Link to the Github Pages.

#### Fixes

- Fixed Admin user cannot purchase an application.
- Fixed Image Optimization (25% less size).

#### Removed

Most of the changes were due to the database-heavy algorithm that needs to be simplified in order to prevent limits from firebase (as a user using all available features takes about 40% limit capacity)

- Removed Logging for Purchasing (will be added back in 1.2 using new algorithm).
- Removed Logging for Admin Activities
- Removed email verification for user purchase (Now user just need to log-in).
- Removed ability for Admin to manipulate File Storage.
- Removed Global Event Modifier (Event now defined per application, takes about 50% less fetching).
- Removed User ability to increase application popularity by purchasing it.

### 1.0 - Grand Release (09-05-2023)

#### Addition and Changes

- User now increase application popularity by purchasing it.
- User can now download application they purchased.
- User can now see their balance below their profile picture.
- User can no longer login using their email and instead must use their Username.
- Welcome, (User) now shows their Real Name instead of their Username.
- Admin can Add, Modify, and Delete Global Event and its modifier.
- Application now uses Event Modifier when purchasing.
- Admin can now Modify the File Storage.

#### Fixes

- Fixed non-logged in user able to purchase an application.
- Fixed Image appeared incorrectly (weird aspect ratio).
- Fixed Application Details page shows incorrect images/
- (Temporarily) Fixed Link Pathing bug caused by Next/Link dynamic routing bugs (Link in Dynamic pages will always ignore their params).

#### Removed

- Removed the unused SuperAdmin userType.
- Removed the Publisher userType, all changes will now be made by Admin.
- Removed Captcha, as it's currently unnecessary.
- Removed the Sidebar, all previous sidebar button now integrated in the top Navbar.
