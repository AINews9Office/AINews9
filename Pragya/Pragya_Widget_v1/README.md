1. Start FastAPI:
   uvicorn app.main:app --reload

2. Open index.html in a browser.

3. If browser blocks local fetch, serve the folder:
   python -m http.server 8080

4. Browse:
   http://localhost:8080

5. To embed in WordPress:
   - Upload these files to your site or plugin.
   - Change API_BASE in config.js to your deployed API URL.
