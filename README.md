# PRBook 🏆

**PRBook** is a web-app to track your endurance sports/gym records 🏊🚴🏃🏋️ <br>

**Endurance**- select between swimming/bikeing/running various distances and add your time! <br>

**Gym**- select body part, excercise and add weight/reps/time!

## Instalation

Clone project `git clone https://github.com/whit33y/PRBook.git`.

Install packages `npm install`.

Register/login to Appwrite `Create account or login via Github`.

Create project and database in Appwrite `Create new project, name it and add database in there`.

Add collections in Appwrite DB `Add two collections gym_records and running_and_cycling_records`.

Add attributes in gym_records: `1. user_id: string required, 2.  weight: double required, 3. body_part: string required, 4. excercise: string required, 5. reps: integer required`.

Add attributes in running_and_cycling_records: `1. user_id: string required, 2. distance: double required, 3. record_time: string required, 4. type: integer required`. 

Edit environment_edit.ts `Pass your API key, DB id and collection ids to environment_edit.ts and rename it to environment.ts`.

Start project `Pass npm start and navigate to http://localhost:4200/ or localhost on different port`.


## Tech/framework

- Angular
- Typescript
- Storybook
- Appwrite
- Prettier

## Screenshots from app

Soon...

## Contact
Feel free to contact me via github or email `troppout@gmail.com`!