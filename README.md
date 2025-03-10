# PRBook 🏆

**PRBook** is a web-app to track your endurance sports/gym records 🏊🚴🏃🏼‍♂️🏋️ <br>

**Endurance** - Select between swimming, biking, and running various distances, then add your time! <br>

**Gym** - Select a body part, exercise, and add weight/reps/time!

## Installation

1. Clone the project:
   ```sh
   git clone https://github.com/whit33y/PRBook.git
   ```
2. Install packages:
   ```sh
   npm install
   ```
3. Register/login to Appwrite:
   - Create an account or login via GitHub on [Appwrite](https://appwrite.io/).
4. Create a project and database in Appwrite:
   - Create a new project, name it, and add a database.
5. Add collections in Appwrite DB:
   - Create two collections: `gym_records` and `running_and_cycling_records`.
6. Add attributes to `gym_records`:
   - `user_id`: string (required)
   - `weight`: double (required)
   - `body_part`: string (required)
   - `exercise`: string (required)
   - `reps`: integer (required)
7. Add attributes to `running_and_cycling_records`:
   - `user_id`: string (required)
   - `distance`: double (required)
   - `record_time`: string (required)
   - `type`: integer (required)
8. Edit `environment_edit.ts`:
   - Pass your API key, DB ID, and collection IDs, then rename it to `environment.ts`.
9. Start the project:
   ```sh
   npm start
   ```
   - Navigate to `http://localhost:4200/` or another port if applicable.

## Tech/Framework

- Angular
- TypeScript
- Storybook
- Appwrite
- Prettier

## Screenshots from the App

### Web/Phone Starting Page
<p align="center">
  <img src="https://github.com/user-attachments/assets/25ab9ce3-57a5-4f3c-817a-95c78a476e37" width="800" />
  <img src="https://github.com/user-attachments/assets/1c9e1408-fa19-45de-940b-12c8ff609ce9" width="365" />
</p>

### Web/Phone Login and Register Page
<p align="center">
  <img src="https://github.com/user-attachments/assets/5497b89d-7e0c-4015-93e3-f93bc5590d10" width="800" />
  <img src="https://github.com/user-attachments/assets/3ed85733-4289-4edb-9189-e806f848b492" width="800" />
  <img src="https://github.com/user-attachments/assets/4d212ddd-7954-46d0-b9d6-df786a0b9d48" width="365" />
  <img src="https://github.com/user-attachments/assets/d6bdf698-c9a1-4c9c-a95d-7c1ab4f7ae0e" width="365" />
</p>

### Web/Phone Home Page
<p align="center">
  <img src="https://github.com/user-attachments/assets/eb3d83e7-cb58-405b-a11e-9c5e03c018fa" width="800" />
  <img src="https://github.com/user-attachments/assets/d3cfd385-756f-4ae8-95d8-81410290c5fb" width="365" />
</p>

### Web/Phone New Record Page
<p align="center">
  <img src="https://github.com/user-attachments/assets/59b88d28-7368-4167-8ca7-a9dae98df8f5" width="365" />
  <img src="https://github.com/user-attachments/assets/9a9d6e25-dc31-428b-9d0a-b09d15cf72a0" width="365" />
  <img src="https://github.com/user-attachments/assets/c19fb020-82f1-4d38-979d-1ad2181dfc23" width="800" />
  <img src="https://github.com/user-attachments/assets/22520e5f-b262-4a34-aa53-6e1aaf4df0cf" width="800" />
</p>

### Web/Phone All-Time Record Page
<p align="center">
  <img src="https://github.com/user-attachments/assets/970c6820-d931-4258-b8ba-a4e3ddb58eda" width="800" />
  <img src="https://github.com/user-attachments/assets/421cab0f-0d41-4890-bd1e-faa2a9e98261" width="365" />
</p>

### Web/Phone Record History Page
<p align="center">
  <img src="https://github.com/user-attachments/assets/b19e341a-2375-4b14-9e6a-f41947170eb7" width="800" />
  <img src="https://github.com/user-attachments/assets/7b0b4917-fc72-44c6-85da-1f299fd6d200" width="365" />
</p>

## Contact
Feel free to contact me via GitHub or email: `troppout@gmail.com`
