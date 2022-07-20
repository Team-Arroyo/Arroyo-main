# team_4_capstone

## Preparation

### Installing Project Dependencies

| Project Component | Terminal Command | Directory|
|-----------|------------------|----------|
| Front end | `yarn install` | `root/client` |
| Back end | `npm install` | `root/server` |

### Starting up the Project

| Project Component | Terminal Command | Directory|
|-----------|------------------|----------|
| Front & back end | `npm run dev` | `root/server` |
| Front end only | `yarn start` | `root/client` |
| Back end only | `npm start` | `root/server` |

---
## Usage

Below is a picture of the project's user interface:
![User Interface](https://user-images.githubusercontent.com/46408257/179650486-5b81d7e5-0f8c-483c-a1cb-73970a269532.png)

1. **Filter**: Select a date range using the start and end date calendar drop-down menus. To avoid filtering by date range, leave both boxes empty. <br>Clicking the'Search S3' button will trigger the filtering of the log files within the connected AWS S3 bucket. The 'Select' menu will be populated with the names of the files meeting the search criteria.

2. **Select**: Select one, many, or all logs in the list. Once you have made your selections, click the 'Ingest Logs' button.

3. **Ingest Logs** Clicking the 'Ingest Logs' button will trigger the reingestion of the selected logs from S3 back into Elasticsearch.
