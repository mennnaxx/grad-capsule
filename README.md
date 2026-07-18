# Friend's Message Site 

A beautifully designed, interactive time capsule built for my friends to write me letters as I cross the halfway point of my degree. The letters are sealed, safely stored in the cloud, and strictly locked behind a countdown until graduation day in June 2028.

##  Features

- **Interactive 3D Lanyard:** A fully physics-based, draggable 3D student ID card mounted directly onto the page.
- **Ambient Storytelling:** Scroll-triggered chapters with micro-animations and an ambient audio track to set the mood.
- **The Envelope Studio:** A multi-step composer where friends can pick custom envelopes, write letters in handwritten fonts, draw doodles on a canvas, and snap polaroid photos.
- **Time Capsule Lock:** The backend enforces a strict lock on reading the letters until the exact graduation date. 
- **Restricted Access:** The receiver's page (`/letters`) requires a secret passcode to authenticate and fetch the sealed letters.
- **Cloud Attachments:** Photos and doodles are securely uploaded and hosted on Cloudinary.

##  Tech Stack

- **Frontend:** Vanilla JavaScript, HTML5, CSS3, Preact (via ESM), React Three Fiber (for 3D lanyard)
- **Backend:** Node.js, Express.js, JWT Authentication
- **Database:** MongoDB (Mongoose)
- **Storage:** Cloudinary
- **Deployment:** Docker & Docker Compose

*Note: The frontend is entirely bundler-less. It imports dependencies directly from `esm.sh`, meaning there is no build step required for the UI.*

##  Quick Start (Docker)

The easiest way to run the entire stack locally is using Docker Compose. It will spin up a blazing fast Nginx server for the frontend and a Node.js container for the backend API.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/friends-message-site.git
   cd friends-message-site
   ```

2. **Set up environment variables:**
   Create a `.env` file inside the `server/` directory with the following variables:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   ENCRYPTION_KEY=32_character_hex_string_for_crypto
   PASSCODE=your_secret_passcode
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

3. **Spin up the containers:**
   ```bash
   docker-compose up --build -d
   ```

4. **View the App:**
   - Public Landing Page (Write Letters): `http://localhost:3000`
   - Receiver Page (Read Letters): `http://localhost:3000/letters.html`

## Project Structure

- `index.html` & `app.js`: The public-facing site where friends compose and seal their letters.
- `letters.html` & `letters.js`: The private receiver's dashboard, protected by a passcode.
- `lanyard-mount.js`: A self-contained custom element `<lanyard-card>` running its own React root to handle the 3D physics without clashing with the vanilla Preact app.
- `/server`: The Express.js backend API for handling letter encryption, authentication, and Cloudinary uploads.

## Security

All letters are saved in the MongoDB database, and the backend validates the current date against the `unlockAt` date. Even if someone discovers the API endpoints, the server will refuse to return the letter contents before graduation day.
