# PRBook 🏆

**PRBook** is a web-app to track your endurance sports/gym records 🏊🚴🏃🏋️ <br>

**Endurance**- select between swimming/bikeing/running various distances and add your time! <br>

**Gym**- select body part, excercise and add weight/reps/time!

## Instalation

1. Clone project `git clone https://github.com/whit33y/PRBook.git`.

2. Install packages `npm install`.

3. Register/login to Appwrite `Create account or login via Github on https://appwrite.io/`.

4. Create project and database in Appwrite `Create new project, name it and add database in there`.

5. Add collections in Appwrite DB `Add two collections gym_records and running_and_cycling_records`.

6. Add attributes in gym_records: `1. user_id: string required, 2.  weight: double required, 3. body_part: string required, 4. excercise: string required, 5. reps: integer required`.

7. Add attributes in running_and_cycling_records: `1. user_id: string required, 2. distance: double required, 3. record_time: string required, 4. type: integer required`. 

8. Edit environment_edit.ts `Pass your API key, DB id and collection ids to environment_edit.ts and rename it to environment.ts`.

9. Start project `Pass npm start and navigate to http://localhost:4200/ or localhost on different port`.


## Tech/framework

- Angular
- Typescript
- Storybook
- Appwrite
- Prettier

## Screenshots from app

- Web/phone starting page <br>
<img width="1680" alt="Screenshot 2025-03-08 at 19 25 24" src="https://github.com/user-attachments/assets/25ab9ce3-57a5-4f3c-817a-95c78a476e37" />
<img width="365" alt="Screenshot 2025-03-08 at 19 27 36" src="https://github.com/user-attachments/assets/1c9e1408-fa19-45de-940b-12c8ff609ce9" />
- Web/phone login and register page <br>
<img width="1680" alt="Screenshot 2025-03-08 at 19 25 16" src="https://github.com/user-attachments/assets/5497b89d-7e0c-4015-93e3-f93bc5590d10" />
<img width="1680" alt="Screenshot 2025-03-08 at 19 25 34" src="https://github.com/user-attachments/assets/3ed85733-4289-4edb-9189-e806f848b492" />
<img width="365" alt="Screenshot 2025-03-08 at 19 27 42" src="https://github.com/user-attachments/assets/4d212ddd-7954-46d0-b9d6-df786a0b9d48" />
<img width="365" alt="Screenshot 2025-03-08 at 19 27 45" src="https://github.com/user-attachments/assets/d6bdf698-c9a1-4c9c-a95d-7c1ab4f7ae0e" />
- Web/phone home page <br>
<img width="1680" alt="Screenshot 2025-03-08 at 19 25 59" src="https://github.com/user-attachments/assets/eb3d83e7-cb58-405b-a11e-9c5e03c018fa" />
<img width="365" alt="Screenshot 2025-03-08 at 19 27 56" src="https://github.com/user-attachments/assets/d3cfd385-756f-4ae8-95d8-81410290c5fb" />
- Web/phone new record page <br>
<img width="365" alt="Screenshot 2025-03-10 at 19 40 57" src="https://github.com/user-attachments/assets/59b88d28-7368-4167-8ca7-a9dae98df8f5" />
<img width="365" alt="Screenshot 2025-03-10 at 19 40 53" src="https://github.com/user-attachments/assets/9a9d6e25-dc31-428b-9d0a-b09d15cf72a0" />
<img width="1680" alt="Screenshot 2025-03-08 at 19 26 15" src="https://github.com/user-attachments/assets/c19fb020-82f1-4d38-979d-1ad2181dfc23" />
<img width="1680" alt="Screenshot 2025-03-08 at 19 26 09" src="https://github.com/user-attachments/assets/22520e5f-b262-4a34-aa53-6e1aaf4df0cf" />
- Web/phone all time record page <br>
<img width="1680" alt="Screenshot 2025-03-08 at 19 26 25" src="https://github.com/user-attachments/assets/970c6820-d931-4258-b8ba-a4e3ddb58eda" />
<img width="365" alt="Screenshot 2025-03-08 at 19 28 02" src="https://github.com/user-attachments/assets/421cab0f-0d41-4890-bd1e-faa2a9e98261" />
- Web/phone record history page <br>
<img width="1680" alt="Screenshot 2025-03-08 at 19 26 32" src="https://github.com/user-attachments/assets/b19e341a-2375-4b14-9e6a-f41947170eb7" />
<img width="365" alt="Screenshot 2025-03-08 at 19 28 05" src="https://github.com/user-attachments/assets/7b0b4917-fc72-44c6-85da-1f299fd6d200" />


## Contact
Feel free to contact me via github or email `troppout@gmail.com`!
